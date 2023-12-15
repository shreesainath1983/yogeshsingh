const userLocalData=localStorage['userCredential']
if (userLocalData === undefined || userLocalData === null ) {
    $('#loginForm').show()
    $('#alreadyLoginForm').hide()
}
else {
    $('#loginForm').hide()
    $('#alreadyLoginForm').show()
    $('#alreadyUserName').html(JSON.parse(localStorage.getItem('userCredential')).name)
}

$('#btnContinue').click(function (e) {
    window.location='formEntry.html';
})

$('#btnReLogin').click(function (e) {
    localStorage.removeItem("userCredential");
    location.reload()
})

$('#btnLogin').click(function (e) {
    addremoveLoad(true, $('#divForm'));

    var user = $('#inputUser').val();
    var password = $('#inputPassword').val();
   
    if (user.trim() == '') {
        $('#inputUser').css('border-color', 'red');
        alert("Enter username");
        addremoveLoad(false, $('#divForm'));
    } else if (password == '') {
        $('#inputPassword').css('border-color', 'red');
        alert("Enter password");
        addremoveLoad(false, $('#divForm'));
    }
    else {
        $('#inputUser').val('')
        $('#inputPassword').val('')
        const userData=userCredentials.filter((d)=>d.username===user && d.pass===password)
        console.log(userData);
        if(userData.length===0){
            alert('Enter valid credentials')
        }else{
            localStorage.setItem("userCredential", JSON.stringify(userData[0]));
            window.location='formEntry.html';
        }
    }
});

function addremoveLoad(addFlag, contID) {
    if (addFlag) {
        var loadDiv = '<span><i class="fa fa-spin fa-refresh fa-3x" style="color: #565656;position: absolute;top: 45%;right: 45%;"></i></span>';
        $("#btnLogin").attr("disabled", "disabled");
        $("#inputUser").attr("disabled", "disabled");
        $("#inputPassword").attr("disabled", "disabled");
        $('.removeSpan').remove();
        $(contID).append(loadDiv);
    }
    else {
        $("#btnLogin").removeAttr("disabled");
        $("#inputUser").removeAttr("disabled");
        $("#inputPassword").removeAttr("disabled");
        $(contID).find('span > .fa-refresh').remove();
    }
}