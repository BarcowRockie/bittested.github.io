
if (document.getElementsByClassName('buy-and-sell-js-block').length) {
    var interrelation = 0;
    GetInterrelation();
    document.getElementById("Send").value = 0.0;
    document.getElementById("Receive").value = 0.0;
    document.getElementById("Pair").value = `USDT>BTC`;
    document.getElementById("email").value = ``;
    document.getElementById("wallet").value = ``;
    document.getElementById("telegram").value = ``;

    $(document).on('click', '.open-dropdowm', function () {
        $('.dropdown-menu').css('height', '0');
        $(this).closest('.wrap-dropdown').find('.dropdown-menu').css('height', '200px');
    });
    $(document).on('click', '.revert-currencies', function () {
        let idFrom = $('.code-1').attr('data-id');
        let idTo = $('.code-2').attr('data-id');
        let imageFrom = $('.code-1').prev().attr('src');
        let imageTo = $('.code-2').prev().attr('src');
        let textFrom = $('.code-1').text();
        let textTo = $('.code-2').text();
        $('.code-1').attr('data-id', idTo);
        $('.code-1').text(textTo);
        $('.code-1').prev().attr('src', imageTo);

        $('.code-2').attr('data-id', idFrom);
        $('.code-2').text(textFrom);
        $('.code-2').prev().attr('src', imageFrom);

        let sendValue = $('#Send').val();
        let receiveValue = $('#Receive').val();
        $('#Send').val(receiveValue);
        $('#Receive').val(sendValue);
        interrelation = 1 / interrelation;
        SetPair();
    });

    $('.dropdown-1 div[data-id]').click(function () {
        let coinCode = $(this).attr('data-id');

        if (coinCode === $('.code-2').attr('data-id')) {
            $('.code-2').attr('data-id', $('.code-1').attr('data-id'));
            $('.code-2').text($('.code-1').attr('data-id'));
            $('.code-2').prev().attr('src', $('.code-1').prev().attr('src'));
            $('#valueTo').val($('#valueFrom').val());
        }

        $(this).closest('.dropdown-menu').css('height', '0');

        $('.code-1').attr('data-id', $(this).attr('data-id'));
        $('.code-1').text($(this).attr('data-id'));
        $('.code-1').prev().attr('src', $(this).find('img').attr('src'));

        GetInterrelation();
        SetPair();
    });

    $('.dropdown-2 div[data-id]').click(function () {
        let coinCode = $(this).attr('data-id');

        if (coinCode === $('.code-1').attr('data-id')) {
            $('.code-1').attr('data-id', $('.code-2').attr('data-id'));
            $('.code-1').text($('.code-2').attr('data-id'));
            $('.code-1').prev().attr('src', $('.code-2').prev().attr('src'));
            $('#valueFrom').val($('#valueTo').val());
        }

        $(this).closest('.dropdown-menu').css('height', '0');

        $('.code-2').attr('data-id', $(this).attr('data-id'));
        $('.code-2').text($(this).attr('data-id'));
        $('.code-2').prev().attr('src', $(this).find('img').attr('src'));

        GetInterrelation();
        SetPair();
    });

    $("#Send").change(function () {
        getPrice();
    }).keyup(function () {
        getPrice();
    });

    $("#Receive").change(function () {
        getPrice(true);
    }).keyup(function () {
        getPrice(true);
    });


    if (typeof valueFromValue !== "undefined") {
        getPrice();
    } else {
        getPrice();
    }

    if (document.getElementsByClassName('calc').length) {
        let num1 = (Math.floor(Math.random() * 11));
        let num2 = (Math.floor(Math.random() * 11));
        var sum = num1 + num2;

        document.querySelector('.num1').innerHTML = num1;
        document.querySelector('.num2').innerHTML = num2;
        SetPair();
        getPrice();
    }

    function SetPair() {
        let coin1 = document.getElementById("code-1").innerHTML;
        let coin2 = document.getElementById("code-2").innerHTML;
        document.getElementById("Pair").value = `${coin1}>${coin2}`;
    }
    function GetInterrelation() {
        let firstCoin = document.getElementById("code-1").innerHTML;
        let secondCoin = document.getElementById("code-2").innerHTML;
        $.ajax({
            url: `SelectPair`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ firstCoin: firstCoin, secondCoin: secondCoin }),
            async: false,
            success: function (response) {
                interrelation = parseFloat(response.price);
                getPrice();
            },
            error: function (error) {
                console.error("Error:", error);
            }
        });
    }

    function getPrice(revertCalc = false) {
        if (!revertCalc) {
            document.getElementById("Receive").value = document.getElementById('Send').value * interrelation;
        }
        else {
            document.getElementById("Send").value = document.getElementById('Receive').value * (1 / interrelation);
        }
    }

}
