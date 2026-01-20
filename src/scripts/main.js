// Burger
const menu = document.querySelector('.header__container-actions');
const burger = document.querySelector('.header__burger');

const openBurger = () => {
  menu.classList.toggle('header__container-actions--opened');
  burger.classList.toggle('header__burger--opened');
};
burger.addEventListener('click', openBurger);

// Select
const select = document.querySelector('.analytics-select');
const trigger = select.querySelector('.analytics-select__trigger');
const options = select.querySelectorAll('.analytics-select__option');

trigger.addEventListener('click', () => {
  select.classList.toggle('analytics-select--open');
});

options.forEach((option) => {
  option.addEventListener('click', () => {
    trigger.textContent = option.textContent;
    select.classList.remove('analytics-select--open');
  });
});

document.addEventListener('click', (e) => {
  if (!select.contains(e.target)) {
    select.classList.remove('analytics-select--open');
  }
});
