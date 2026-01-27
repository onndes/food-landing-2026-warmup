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

// Comments Progress Line
const comments = document.querySelector('.comments');
const track = comments.querySelector('.comments__track');
const container = comments.querySelector('.comments__container');
const progressLine = comments.querySelector('.comments__progress-line');

const getCSSVarPx = (name, el = comments) =>
  parseFloat(getComputedStyle(el).getPropertyValue(name));

const getParametersData = () => {
  const activeCard = comments.querySelector('.comments-card--active');
  if (!activeCard) return null;

  return {
    containerWidth: getCSSVarPx('--container'),
    cardPadding: getCSSVarPx('--card-padding'),
    paddingHorizontalDesktop: getCSSVarPx('--padding-horizontal-desktop'),
    cardWidth: activeCard.getBoundingClientRect().width,
    trackPaddingLeft:
      track.getBoundingClientRect().left -
      container.getBoundingClientRect().left,
    viewportWidth: document.documentElement.clientWidth,
  };
};

const updateProgressLine = () => {
  const data = getParametersData();
  if (!data) return;

  const {
    containerWidth,
    cardPadding,
    paddingHorizontalDesktop,
    cardWidth,
    trackPaddingLeft,
    viewportWidth,
  } = data;

  const fullWidth =
    viewportWidth < containerWidth ? viewportWidth : containerWidth;

  const left = Math.abs(trackPaddingLeft) + cardWidth + cardPadding * 3;
  const width =
    fullWidth - cardWidth - cardPadding * 3 - paddingHorizontalDesktop;

  progressLine.style.left = `${left}px`;
  progressLine.style.width = `${width}px`;
};
console.log(getCSSVarPx('--container'));
const checkDesktop = () => document.documentElement.clientWidth > 1024;

checkDesktop() && updateProgressLine();

window.addEventListener('resize', () => {
  if (checkDesktop()) {
    updateProgressLine();
  } else {
    progressLine.style.removeProperty('left');
    progressLine.style.removeProperty('width');
  }
});
