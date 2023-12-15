$(document).ready(function () {
    if (localStorage['receiptData'] === undefined || localStorage['receiptData'] === null) {
        window.close();
    }
    else {

        var gatePassObj = JSON.parse(localStorage.getItem('receiptData'));
        $("#receiptid").html(gatePassObj.receiptid);
        $("#receiptdate").html(gatePassObj.date);
        $("#receiptname").html(gatePassObj.name);
        $("#receiptmobile").html(gatePassObj.mobile);
        $("#receipttype").html(gatePassObj.type);
        $("#referenceNo").html(gatePassObj.referenceno);
        $("#receiptremark").html(gatePassObj.remark);

        window.print();
        localStorage.removeItem("receiptData");        
    }
});