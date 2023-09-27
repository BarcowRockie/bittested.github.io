document.addEventListener("DOMContentLoaded", function () {

    var submitButton = document.getElementById("submit-button");
    var form = document.getElementById("form");

    var email = document.getElementById("email");
    var telegram = document.getElementById("telegram");
    var wallet = document.getElementById("wallet");
    var send = document.getElementById("Send");
    var sendBlock = document.getElementById("dropdownitem1");
    let amount = 9.9;

    submitButton.addEventListener("click", function () {
        var isValid = true;

        if (send.value <= amount) {
            isValid = false;
            sendBlock.style = "border: 1px solid #E71E1E;";
        }
        else {
            sendBlock.style = "border: 1px solid #FFFFFF;";
        }

        if (telegram.value === "") {
            isValid = false;
            telegram.style = "border: 1px solid #E71E1E;";
        }
        else {
            telegram.style = "border: 1px solid #FFFFFF;";
        }

        if (wallet.value.trim() === "") {
            isValid = false;
            wallet.style = "border: 1px solid #E71E1E;";
        }
        else {
            wallet.style = "border: 1px solid #FFFFFF;";
        }

        if (email.value.trim() === "") {
            isValid = false;
            email.style = "border: 1px solid #E71E1E;";
        }
        else {
            email.style = "border: 1px solid #FFFFFF;";
        }

        if (isValid) {
            form.submit();
        }
    });

    $('.dropdown-1 div[data-id]').click(function () {
        GetAmout();
    });
    $('.dropdown-2 div[data-id]').click(function () {
        GetAmout();
    });
    $(document).on('click', '.revert-currencies', function () {
        GetAmout();
    });

    function GetAmout() {
        let firstCoin = document.getElementById("code-1").innerHTML;
        
        $.ajax({
            url: `GetMin`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ Name: firstCoin}),
            async: false,
            success: function (response) {
                amount = response.amount;
            },
            error: function (error) {
                console.error("Error:", error);
            }
        });
    }
});
