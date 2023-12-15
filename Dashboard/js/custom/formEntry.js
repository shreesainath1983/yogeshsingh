const userLocalData=localStorage['userCredential']
var getDateString = function (date, format) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    getPaddedComp = function (comp) {
        return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
    },
    formattedDate = format,
    o = {
        "y+": date.getFullYear(), // year
        "M+": months[date.getMonth()], //month
        "d+": getPaddedComp(date.getDate()), //day
        "h+": getPaddedComp((date.getHours() > 12) ? date.getHours() % 12 : date.getHours()), //hour
        "H+": getPaddedComp(date.getHours()), //hour
        "m+": getPaddedComp(date.getMinutes()), //minute
        "s+": getPaddedComp(date.getSeconds()), //second
        "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
        "b+": (date.getHours() >= 12) ? 'PM' : 'AM'
    };

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            formattedDate = formattedDate.replace(RegExp.$1, o[k]);
        }
    }
    return formattedDate;
};
$('#txtDate').val(getDateString(new Date(), "d-M-y"));
const setReceiptID=(userObj)=>{
    const fulldate=new Date()
    const date=fulldate.getDate(), month=fulldate.getMonth()+1,year=fulldate.getFullYear()
    const IDPrefix=date.toString() + month.toString() + year.toString()+'-'+userObj.id;
    let receiptID=''
    let userFormData=localStorage['userFormData']
    if (userFormData === undefined || userFormData === null ) {
        receiptID =IDPrefix+'-1'
    }else{
        let formData = JSON.parse(localStorage.getItem('userFormData'))
        let sortedData=formData.sort((a, b) => {
            return Number(b.index) - Number(a.index);
        });
        receiptID =IDPrefix+'-'+(sortedData[0].index+1).toString()
    }
    $('#receiptID').html(receiptID)
}
if (userLocalData === undefined || userLocalData === null ) {
    window.location='login.html';
}
else {
    const userObj=JSON.parse(localStorage.getItem('userCredential'))
    $('#lblUserName').html(userObj.name)
    let userFormData=localStorage['userFormData']
    setReceiptID(userObj)

    $('#btnLogout').click(function (e) {
        localStorage.removeItem("userCredential");
        localStorage.removeItem("userFormData");
        localStorage.removeItem("receiptData");
        window.location='login.html';
    })
    
    function validateMobileNumber(phoneNumber) {
        var mobileNumberPattern = /^[0-9]{10}$/;
        return mobileNumberPattern.test(phoneNumber);
      }
    
    $('#btnSubmit').click(function (e) {
            var receiptid = $('#receiptID').html();        
            var date = $('#txtDate').val();
            var name = $('#txtName').val();
            var mobile = $('#txtMobile').val();
            var type = $('#txtType').val();
            var referenceno = $('#txtEpic').val();
            var address = $('#txtAddress').val();
            var remark = $('#txtRemark').val();
    
            $('#txtDate').css('border-color', '#ced4da');
            $('#txtName').css('border-color', '#ced4da');
            $('#txtMobile').css('border-color', '#ced4da');
            $('#txtType').css('border-color', '#ced4da');
            $('#txtEpic').css('border-color', '#ced4da');
            $('#txtAddress').css('border-color', '#ced4da');
            $('#txtRemark').css('border-color', '#ced4da');
    
            if (date == '') {
                $('#txtDate').css('border-color', 'red');
                alert("Enter proper Date");
                addremoveLoad(false, $('#divForm'));
            } else if (name == '') {
                $('#txtName').css('border-color', 'red');
                alert("Enter proper Name");
                addremoveLoad(false, $('#divForm'));
            } else if (mobile == '' || !validateMobileNumber(mobile)) {
                $('#txtMobile').css('border-color', 'red');
                alert("Enter 10 digit Mobile number");
                addremoveLoad(false, $('#divForm'));
            } else{
                const dataObj={
                    index:parseInt(receiptid.split('-')[2]),
                    receiptid,
                    date,
                    name,
                    mobile,
                    type,
                    referenceno,
                    address,
                    remark,
                    entryby:userObj.name,
                    timestamp:new Date().getTime()
                }
                let allData;
                userFormData=localStorage['userFormData']
                if (userFormData === undefined || userFormData === null ) { 
                    allData=[]
                }else{
                    allData = JSON.parse(localStorage.getItem('userFormData'))
                }
                allData.push(dataObj)
                localStorage.setItem("userFormData", JSON.stringify(allData));
                console.log(allData);                
                alert('submit')
                setReceiptID(userObj)
            }
    })

    const loadData=()=>{
        userFormData=localStorage['userFormData']
        if (userFormData === undefined || userFormData === null ) {    
            //no data found
        }else{        
            let repObj = JSON.parse(localStorage.getItem('userFormData'))
            let sortedData=repObj.sort((a, b) => {
                return Number(b.index) - Number(a.index);
            });
            if (sortedData.length > 0) {
                let trData=''
                for (var i = 0; i < sortedData.length; i++) {
                    trData += '<tr rowid="' + sortedData[i].index + '">' +
                                '<td><button class="btn btn-primary printReceipt"><i class="fa fa-print margin-rg"></i>Print</button></td>' +
                                '<td><button class="btn btn-success whatsappReceipt"><i class="fa fa-whatsapp"></i></button></td>' +
                                '<td>' + sortedData[i].receiptid + '</td>' +
                                '<td>' + sortedData[i].name + '</td>' +
                                '<td>' + sortedData[i].mobile + '</td>' +
                                '<td>' + sortedData[i].type + '</td>' +
                                '<td>' + repObj[i].referenceno + '</td>' +
                                '<td>' + repObj[i].address + '</td>' +
                                '<td>' + repObj[i].remark + '</td>' +                                
                                '<td>' + repObj[i].entryby + '</td>' +
                                '<td>' + repObj[i].date + '</td>' +
                            '</tr>';                    
                }
                $("#tblReceipt tbody").html(trData);
                $("#totalSummary").html('Total entries: '+ sortedData.length);                
            }
            else {
                $("#totalSummary").html('Total entries: 0');
                $("#tblReceipt tbody").html("");
            }
        }
    }
    loadData()

    $("[id*=divReceipt]").on('click', '.printReceipt', function () {
        userFormData=localStorage['userFormData']
        if (userFormData === undefined || userFormData === null ) {    
            alert('Something went wrong, unable to find data. Please refresh and try again!')
        }else{        
            let rowid = $(this).closest('tr').attr('rowid');
            let repObj = JSON.parse(localStorage.getItem('userFormData'))
            const receiptData = repObj.filter((d)=>d.index.toString()===rowid)
            if(receiptData.length===0){
                alert('Something went wrong, unable to find data. Please refresh and try again!')
            } else {
                localStorage.setItem("receiptData", JSON.stringify(receiptData[0]));
                window.open('receipt.html', '_blank');
            }
        }
    });

    function ExportData()
    {
        userFormData=localStorage['userFormData']
        if (userFormData === undefined || userFormData === null ) { 
            alert('No data to download')
        }else{
            let allData = JSON.parse(localStorage.getItem('userFormData'))
            // Convert JSON data to CSV
            let csvData = jsonToCsv(allData); // Add .items.data
            // Create a CSV file and allow the user to download it
            let blob = new Blob([csvData], { type: 'text/csv' });
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            const userObj=JSON.parse(localStorage.getItem('userCredential'))
            a.download = userObj.name.replace(' ','-')+'-'+(new Date().getTime()).toString()+'.csv';
            document.body.appendChild(a);
            a.click();
        }
     }
    function jsonToCsv(jsonData) {
        let csv = '';
        // Get the headers
        let headers = Object.keys(jsonData[0]);
        csv += headers.join(',') + '\n';
        // Add the data
        jsonData.forEach(function (row) {
            let data = headers.map(header => JSON.stringify(row[header])).join(','); // Add JSON.stringify statement
            csv += data + '\n';
        });
        return csv;
    }
     $('#btnDownload').click(function (e){
        ExportData()
     })

     $("[id*=divReceipt]").on('click', '.whatsappReceipt', function () {
        userFormData=localStorage['userFormData']
        if (userFormData === undefined || userFormData === null ) {    
            alert('Something went wrong, unable to find data. Please refresh and try again!')
        }else{        
            let rowid = $(this).closest('tr').attr('rowid');
            let repObj = JSON.parse(localStorage.getItem('userFormData'))
            const receiptData = repObj.filter((d)=>d.index.toString()===rowid)
            if(receiptData.length===0){
                alert('Something went wrong, unable to find data. Please refresh and try again!')
            } else {            
                window.open('https://api.whatsapp.com/send?phone=91'+receiptData[0].mobile+'&text=Hi '+receiptData[0].name+', Your application for '+receiptData[0].type+' is submitted successfully. Reference/EPIC ID: '+receiptData[0].referenceno+'. Please check attached acknowledgement file for more details. From Yogesh Singh - Jilha Mahamantri, BJP (Vasai-Virar)')
            }
        }
    });
     
}