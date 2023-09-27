const registerBtn = document.querySelector('.reg-btn');

let maskOptions = {
    mask: '00.00.0000',
    lazy: false
}

$(document).on('input paste', 'input#pass', function (e) {
    let reg = /[а-яА-ЯёЁ]/g;

    if (this.value.search(reg) !=  -1) {
        this.value  =  this.value.replace(reg, '');
    }
});

const drobdown = document.querySelector('.dropdown'),
    drobdownMenu = document.querySelector('.dropdown-menu'),
    dropdownContetn = document.querySelectorAll('.dropdown-menu div span'),
    nameCountry = document.querySelector('.name-country');

if (registerBtn) {
    document.querySelector('#date').addEventListener('focus', () => {
        let mask = new IMask(date, maskOptions);
    });

    registerBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const password = document.querySelector('#pass'),
            passwordRepeat = document.querySelector('#repeat-pass'),
            date = document.querySelector('#date'),
            validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            validText = /^[A-Za-z]+$/;
        let email = document.querySelector('#email'),
            nameUser = document.querySelector('#name'),
            secondNameUser = document.querySelector('#last-name'),
            telegram = document.querySelector('#telegram'),
            // telegramValid = /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/,
            form = document.querySelector('form'),
            checkbox = document.querySelector('#checkbox');

        let days = +date.value.slice(0,2),
            month = +date.value.slice(3,6),
            year = +date.value.slice(6,12);

        let i = 0;

        if (date.value.replace('_', '').length != 10 ||  days > 31 ||  month > 12 || 1955 > year || year > 2014) {
            date.classList.add('errors');
            i++;
        } else {
            date.classList.remove('errors');
        }

        // if (date.value.replace('_', '').length < 10) {
        //     date.classList.add('errors');
        //     i++;
        // } else {
        //     date.classList.remove('errors');
        // }

        if (nameUser.value.match(validText) && nameUser.value.length > 3) {
            nameUser.classList.remove('errors');
        } else {
            nameUser.classList.add('errors');
            i++;
        }

        if (email.value.match(validEmail)) {
            email.classList.remove('errors');
        } else {
            email.classList.add('errors');
            i++;
        }

        if (secondNameUser.value.match(validText) && secondNameUser.value.length > 3) {
            secondNameUser.classList.remove('errors');
        } else {
            secondNameUser.classList.add('errors');
            i++;
        }

        if (telegram.value.length > 4) {
            telegram.classList.remove('errors');
        } else {
            telegram.classList.add('errors');
            i++;
        }

        if (password.value.length < 1) {
            password.classList.add('errors');
            i++;
        } else {
            password.classList.remove('errors');
        }

        if (passwordRepeat.value != password.value || !passwordRepeat.value) {
            passwordRepeat.classList.add('errors');
            i++;
        } else {
            passwordRepeat.classList.remove('errors');

        }

        if(nameCountry.textContent == 'Citizenship'){
            drobdown.classList.add('errors');
            i++;
        } else {
            drobdown.classList.remove('errors');
        }

        if (checkbox.checked) {
            checkbox.classList.remove('errors');

            if (i == 0) {
                $.ajax({
                    url: "/check-data?email=" + email.value + "&ref=" + $('#referral').val(),
                    dataType: "json",
                    success: function (data) {
                        let refCheck = data['ref'];
                        let emailCheck = data['email'];

                        if (emailCheck == '1') {
                            email.classList.add('errors');
                        } else {
                            email.classList.remove('errors');
                        }

                        if (refCheck == '0') {
                            $('#referral').addClass('errors');
                        } else {
                            $('#referral').removeClass('errors');
                        }

                        if (emailCheck == '0' && refCheck == '1') {
                            document.getElementById("sign-up-form").submit();
                        }
                    },
                });
            }
        } else {
            checkbox.classList.add('errors');
        }
    });
}

if (drobdown && !document.getElementsByClassName('exchange').length) {
    drobdown.addEventListener('click', () => {
        if (drobdownMenu.style.height == '200px') {
            drobdownMenu.style.height = '0px';
        } else {
            drobdownMenu.style.height = '200px';
            dropdownContetn.forEach(itemContent => {
                itemContent.addEventListener('click', (e) => {
                    console.log(e.target.innerHTML);
                    nameCountry.innerHTML = e.target.innerHTML;
                    $('#country').val(e.target.innerHTML);
                    drobdownMenu.style.height = '0px';
                });
            })
        };
    });
}
