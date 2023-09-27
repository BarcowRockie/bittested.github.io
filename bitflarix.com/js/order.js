const pair = document.getElementById("info-pair").innerText;
var coins = pair.split('>');
let wallet = coins[0];
let send = document.getElementById("info-quantity");
let receive = document.getElementById("info-receive");
let text1 = `${send.innerText} ${coins[0]}`;
let text2 = `${receive.innerText} ${coins[1]}`;
send.innerText = text1;
receive.innerText = text2;
let admin_value = document.getElementById('wallet-admin-value').innerText;
let admin_title = document.getElementById('title-wallet');
admin_title.innerText = 'Pay ' + coins[0] + ' at the wallet:';

const divButton = document.getElementById('copy');
divButton.addEventListener('click', function () {
    const input = document.createElement('input');
    input.setAttribute('value', admin_value);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
});
