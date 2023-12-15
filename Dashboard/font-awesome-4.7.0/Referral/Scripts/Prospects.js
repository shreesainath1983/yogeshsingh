function submitReferralSMS() {
    alert('Hi');
    var anchorWF;
    var Prospectnm;
    var mobileNo;
    
    anchorWF = document.getElementById("anchorWF");
        anchorWF.setAttribute('href', "");

        mobileNo = document.getElementById("Mobile1").value;
        WhtsappText = "Dear Ganesh Devotee, Our Bappa Nalasoparyacha Yuvraj got nominated in My Mahanagar Eco-Friendly Ganapati Competition 2018 hence request you to please click below URL and vote for our Bappa." + "<br/>" + "http://www.mymahanagar.com/eco-friendly-bappa-contest/shree-sainath-mitra-mandal-make-a-15-ft-eco-friendly-ganesh-idols/29044/";

        anchorWF.setAttribute('href', "https://api.whatsapp.com/send?phone=91" + mobileNo + "&text=" + WhtsappText);
        

}