// !=------------------------------------------------------------=
// !=------------- Burger --------------=
// !=------------------------------------------------------------=

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

// !=------------------------------------------------------------=
// !=--------- Comments Progress Line ---------=
// !=------------------------------------------------------------=
const comments = document.querySelector('.comments');
const track = comments.querySelector('.comments__track');
const container = comments.querySelector('.comments__container');
const progressLine = comments.querySelector('.comments__progress-line');
const progressFill = comments.querySelector('.comments__progress-fill');
const slides = comments.querySelectorAll('.comments-card-wrap');
let currentIndex = 0;

const getCSSVarPx = (name, el = comments) =>
  parseFloat(getComputedStyle(el).getPropertyValue(name));

const checkDesktop = () => document.documentElement.clientWidth > 1024;

const getParametersData = () => {
  const activeCard = comments.querySelector('.comments-card--active');
  if (!activeCard) return null;
  return {
    containerWidth: getCSSVarPx('--container'),
    cardPadding: getCSSVarPx('--card-padding'),
    paddingHorizontalDesktop: getCSSVarPx('--padding-horizontal-desktop'),
    cardWidth: activeCard.getBoundingClientRect().width,
    trackPaddingLeft: parseFloat(window.getComputedStyle(track).paddingLeft),
    viewportWidth: document.documentElement.clientWidth,
    countSlides: slides.length,
  };
};

const setProgressLinePosition = () => {
  if (!checkDesktop()) return;
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

const updateProgressFill = () => {
  const sizeFillOneSlide = 100 / getParametersData().countSlides;
  progressFill.style.width = `${(currentIndex + 1) * sizeFillOneSlide}%`;
};

checkDesktop() && setProgressLinePosition();
updateProgressFill();

window.addEventListener('resize', () => {
  if (checkDesktop()) {
    setProgressLinePosition();
  } else {
    progressLine.style.removeProperty('left');
    progressLine.style.removeProperty('width');
  }
});

// !=------------------------------------------------------------=
// !=--------- Comments Slider ---------=
// !=------------------------------------------------------------=

const updateSlider = () => {
  const slideWidth = slides[0].getBoundingClientRect().width;

  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  slides.forEach((slide, i) => {
    const card = slide.querySelector('.comments-card');
    card.classList.toggle('comments-card--active', i === currentIndex);
  });

  setProgressLinePosition();
};

let startX = 0;
let currentTranslate = 0;
let isDragging = false;

const getSlideStep = () => {
  const slide = slides[0];
  // ? If margin is needed in the future, uncomment below
  // const styles = getComputedStyle(slide);
  // const margin = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  // return slide.getBoundingClientRect().width + margin;
  return slide.getBoundingClientRect().width;
};

track.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  startX = e.clientX;
  isDragging = true;
  track.style.transition = 'none';
  track.setPointerCapture(e.pointerId);
});

track.addEventListener('pointermove', (e) => {
  if (!isDragging) return;

  const diff = e.clientX - startX;
  const step = getSlideStep();
  currentTranslate = -currentIndex * step + diff;
  track.style.transform = `translateX(${currentTranslate}px)`;
});

track.addEventListener('pointerup', (e) => {
  if (!isDragging) return;

  isDragging = false;
  track.releasePointerCapture(e.pointerId);
  track.style.transition = 'transform 0.4s ease';

  const step = getSlideStep();
  const movedBy = currentTranslate + currentIndex * step;

  if (movedBy < -step / 4 && currentIndex < slides.length - 1) {
    currentIndex++;
  }

  if (movedBy > step / 4 && currentIndex > 0) {
    currentIndex--;
  }

  updateSlider();
  updateProgressFill();
});

track.addEventListener('pointercancel', () => {
  isDragging = false;
  updateSlider();
});
