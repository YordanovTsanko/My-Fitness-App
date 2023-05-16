const loginForm = document.getElementById('login');
const emailInputG = loginForm.elements.emailLogin;
const passwordInputG = loginForm.elements.passwordLogin;

function addEvent(el, event, callback) {
  if ('addEventListener' in el) {
    el.addEventListener(event, callback, false);
  } else {
    el['e' + event + callback] = callback;
    el[event + callback] = function () {
      el['e' + event + callback](window.event);
    };
    el.attachEvent('on' + event, el[event + callback])
  }
}

(function () {
  const registerBtn = document.getElementById('registerBTN');
  const loginBtn = document.getElementById('loginBTN');
  const flipBoxInner = document.getElementsByClassName('flip-box-inner')[0]
  const bothSectionRemFP = document.getElementsByClassName('rs-remFP');

  registerBtn.addEventListener('click', () => {
    console.log(degHelperJS)
    flipBoxInner.style.transform = `rotateY(${degHelperJS}deg)`
  })
  loginBtn.addEventListener('click', () => {
    flipBoxInner.style.transform = `rotateY(${degJS}deg)`
  })
  if (window.innerWidth <= 401) {
    bothSectionRemFP[0].classList.add('col-12', 'mb-2');
    bothSectionRemFP[1].classList.add('col-12');
  } else {
    bothSectionRemFP[0].classList.remove('col-12', 'mb-2');
    bothSectionRemFP[1].classList.remove('col-12');
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 401) {
      bothSectionRemFP[0].classList.add('col-12', 'mb-2');
      bothSectionRemFP[1].classList.add('col-12');
    } else {
      bothSectionRemFP[0].classList.remove('col-12', 'mb-2');
      bothSectionRemFP[1].classList.remove('col-12');
    }
  })
}())