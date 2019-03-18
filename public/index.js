/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable semi */
// ///////popup//////////////

// declare default vars
const popUpLayer = document.getElementById('pop-up-layer');
const popUpLayer2 = document.getElementById('pop-up-layer-2');
const closeModal = document.getElementById('close-pop-up');
// const closeModalSubmitted = document.getElementById('email-submitted');

// nav-bar button
const subBtn = document.getElementById('sub-btn');

subBtn.addEventListener('click', () => {
  popUpLayer.style.display = 'flex';
});

// footer link click makes the popup appear
subBtn.addEventListener('click', () => {
  popUpLayer2.style.display = 'flex';
});

// close model click makes the popup disappear
closeModal.addEventListener('click', () => {
  popUpLayer.style.display = 'none';
});

// close model click makes the popup disappear
closeModal.addEventListener('click', () => {
  popUpLayer2.style.display = 'none';
});

let popUpSeconds = 120;

// trigger popup after seconds variable
const popUpFun = window.setInterval(() => {
  popUpLayer.style.display = 'flex';

  window.clearInterval(popUpFun);
}, popUpSeconds * 3000);

// function validEmail(email) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// }

// const email = document.getElementById('email');
// const subscribeBtn = document.getElementById('subscribe-email-btn');

// subscribeBtn.addEventListener('click', (e) => {
//   if (!validEmail(e.value)) {
//     alert('Please enter a valid email address.');
//   }
// })

function validateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(inputText.value.match(mailformat)) {
    document.pop-up-form.from.focus();
    return true;
  } else {
    alert("You have entered an invalid email address!");
    document.pop-up-form.from.focus();
    return false;
  }
};
// /////////////////

// vars
'use strict'
const testim = document.getElementById('testim')
const testimDots = Array.prototype.slice.call(document.getElementById('testim-dots').children)
const testimContent = Array.prototype.slice.call(document.getElementById('testim-content').children)
const testimLeftArrow = document.getElementById('left-arrow')
const testimRightArrow = document.getElementById('right-arrow')

const testimSpeed = 5500
const ignoreTouch = 30

let currentSlide = 0
let currentActive = 0

let testimTimer = null
let	touchStartPos = null
let	touchEndPos = null
let	touchPosDiff = null

window.onload = () => {
  // Testim Script
  const playSlide = (slide) => {
    for (let k = 0; k < testimDots.length; k += 1) {
      testimContent[k].classList.remove('active');
      testimContent[k].classList.remove('inactive');
      testimDots[k].classList.remove('active');
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0
    }

    if (currentActive !== currentSlide) {
      testimContent[currentActive].classList.add('inactive')
    }

    testimContent[slide].classList.add('active')
    testimDots[slide].classList.add('active')
    currentActive = currentSlide
    clearTimeout(testimTimer)

    testimTimer = setTimeout(() => {
      playSlide(currentSlide += 1);
    }, testimSpeed)
  }

  testimLeftArrow.addEventListener('click', () => {
    playSlide(currentSlide -= 1);
  })

  testimRightArrow.addEventListener('click', () => {
    playSlide(currentSlide += 1);
  })

  for (let l = 0; l < testimDots.length; l += 1) {
    // eslint-disable-next-line no-loop-func
    testimDots[l].addEventListener('click', function() {
      playSlide(currentSlide = testimDots.indexOf(this));
    })
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break
      case 38:
        testimRightArrow.click();
        break
      case 39:
        testimRightArrow.click();
        break

      default:
        break
    }
  })

  testim.addEventListener('touchstart', (e) => {
    touchStartPos = e.changedTouches[0].clientX;
  })

  testim.addEventListener('touchend', (e) => {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);


    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    }
  })
}
