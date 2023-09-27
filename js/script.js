const btnMenu = document.querySelector('.burger-icon'),
    mobileMenu = document.querySelector('.mobile-menu'),
    closeBtnMenu = document.querySelector('.close');

if (document.getElementsByClassName('dashboard').length) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    function getRandomFloat(min, max) {
        const str = (Math.random() * (max - min) + min).toFixed(3);
        return parseFloat(str);
    }

    function GenerateTransactions() {
        let currency = transactions[getRandomInt(0, transactions.length)];
        let img = currency.img;
        let code = currency.code;
        let amountFrom = getRandomFloat(currency.minMax.min, currency.minMax.max);

        let amountTo = (amountFrom * courses[code]).toFixed(3);

        $(".block-transaction").prepend(`
            <div class="block" style="display: none">
                <div class="name">
                    <img src="${img}" alt="">
                    <p>${code}</p>
                </div>
    
                <div class="price-red">
                    <p>-${amountFrom} ${code}</p>
                </div>
    
                <div class="price-green">
                    <p>
                        +${amountTo} USDT
                    </p>
                </div>
            </div>
        `);

        $(".block-transaction .block:first").fadeIn();

        if ($(".block-transaction .block").length > 10) {
            $(".block-transaction .block:last").fadeOut();

            setTimeout(function () {
                $(".block-transaction .block:last").remove();
            }, 1000)
        }
    }

    for (let i = 0; i <= 4; i++) GenerateTransactions();

    setTimeout(function () {
        GenerateTransactions();
    }, 1500);

    setInterval(GenerateTransactions, getRandomInt(3000, 10000));

    function changeAmount0() {
        let block = $('#total-reserves');
        let change = 30;
        let value = parseInt(block.attr('data-value')) + change;

        block.attr('data-value', value);
        block.text('$ ' + (parseInt(block.attr('data-value'))).toLocaleString('eu') + '.00');
    }

    function changeAmount1() {
        let block = $('#amount-of-transactions');
        let change = 52;
        let value = parseInt(block.attr('data-value')) + change;

        block.attr('data-value', value);
        block.text('$ ' + (parseInt(block.attr('data-value'))).toLocaleString('eu') + '.00');
    }

    function changeAmount2() {
        let block = $('#saved-for-our-customers');
        let change = 4;
        let value = parseInt(block.attr('data-value')) + change;

        block.attr('data-value', value);
        block.text('$ ' + (parseInt(block.attr('data-value'))).toLocaleString('eu') + '.00');
    }

    setInterval(changeAmount0, 300000); // 5 [300000] minutes 30$
    setInterval(changeAmount1, 180000); // 3 [180000] minutes 52$
    setInterval(changeAmount2, 180000); // 3 [180000] minutes 4$
}
