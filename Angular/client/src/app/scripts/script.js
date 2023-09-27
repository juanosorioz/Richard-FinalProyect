import card from '../scripts/scripts.js';



const card = document.querySelector('.card');
const loginRegister = document.querySelector('.login-register');
const registerLogin = document.querySelector('.register-login');

registerLogin.addEventListener('click', ()=> {
    card.classList.add('active');
});

loginRegister.addEventListener('click', ()=> {
    card.classList.remove('active');
});