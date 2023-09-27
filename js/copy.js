const titleWalletImg = document.querySelector('.title-wallet .img');
const walletAdmin = document.querySelector('.wallet-admin');

if (titleWalletImg && walletAdmin) {
    titleWalletImg.addEventListener('click', () => {
        titleWalletImg.style.background = 'silver';
        navigator.clipboard.writeText(walletAdmin.textContent);
    });
}
