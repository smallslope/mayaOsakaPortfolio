
var halfLitreStats = {
    ml: "500ml",
    cashAmount: "£1.50",
    pointsAmount: "10"
}
var litreStats = {
    ml: "1000ml",
    cashAmount: "£2.50",
    pointsAmount: "15"
}

function selectSize(event, size){
    var sizeSelectionPage;
    var paymentPage;
    var activeConfig;
    sizeSelectionPage = document.getElementsByClassName("sizeSelectionPage")[0].style.display = "none";
    paymentPage = document.getElementsByClassName("paymentPage")[0].style.display = "flex";
    if (size == "500ml"){
        activeConfig = halfLitreStats;
        document.getElementsByClassName("drinkSize")[0].innerHTML = activeConfig.ml;
        document.getElementsByClassName("cashCost")[0].innerHTML = activeConfig.cashAmount;
        document.getElementsByClassName("pointsCost")[0].innerHTML = activeConfig.pointsAmount;
    } else if (size == "1000ml"){
        activeConfig = litreStats;
        document.getElementsByClassName("drinkSize")[0].innerHTML = activeConfig.ml;
        document.getElementsByClassName("cashCost")[0].innerHTML = activeConfig.cashAmount;
        document.getElementsByClassName("pointsCost")[0].innerHTML = activeConfig.pointsAmount;
    }
}
function backTo_sizeSelectionPage(){
    var sizeSelectionPage;
    var paymentPage;

    paymentPage = document.getElementsByClassName("paymentPage")[0].style.display = "none";
    sizeSelectionPage = document.getElementsByClassName("sizeSelectionPage")[0].style.display = "flex";
}

var paymentType;

function selectPaymentMethod(paymentMethod){
    paymentType = paymentMethod;
    document.getElementsByClassName("paymentPage")[0].style.display = "none";
    document.getElementsByClassName("dispenserInfoPage")[0].style.display = "flex";
}

function displayPaymentPage(){
    if (paymentType == "cash"){
        document.getElementsByClassName("dispenserInfoPage")[0].style.display = "none";
        document.getElementsByClassName("cashPaymentPage")[0].style.display = "flex";
    }
    else if(paymentType == "points"){
        document.getElementsByClassName("dispenserInfoPage")[0].style.display = "none";
        document.getElementsByClassName("pointsPaymentPage")[0].style.display = "flex";
    }
}

function displayThankYouPage(paymentPageType){
    if(paymentPageType == "pointsPaymentPage"){
        document.getElementsByClassName("pointsPaymentPage")[0].style.display = "none";
        document.getElementsByClassName("thankYouPage")[0].style.display = "flex";
    }
    else if(paymentPageType == "cashPaymentPage"){
        document.getElementsByClassName("cashPaymentPage")[0].style.display = "none";
        document.getElementsByClassName("thankYouPage")[0].style.display = "flex";
    }

}