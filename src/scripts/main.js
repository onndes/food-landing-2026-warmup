// Burger
const menu = document.querySelector('.header__container-actions');
const burger = document.querySelector('.header__burger');

const openBurger = () => {
  menu.classList.toggle('header__container-actions--opened');
  burger.classList.toggle('header__burger--opened');
};
burger.addEventListener('click', openBurger);
