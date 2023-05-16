document.addEventListener('DOMContentLoaded', function () {
  //Scrolling Animations
  const OpaObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-show');
        observer.unobserve(entry.target);
      }
    });
  });
  function opacityEach(item) {
    OpaObserver.observe(item);
  }
  const opacityText = document.querySelectorAll('.opacity-animation-text');
  const opacityImg = document.querySelectorAll('.img-set-why');
  const containerHowSmall = document.querySelectorAll('.container-how-small');
  opacityText.forEach(opacityEach);
  opacityImg.forEach(opacityEach);
  containerHowSmall.forEach(opacityEach);

  const liObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in-p-li');
        observer.unobserve(entry.target);
      }
    });
  });
  function leftOpacityEach(item) {
    liObserver.observe(item);
  }
  const predimstvaLis = document.querySelectorAll('.predimstva-ul li');
  const opacitySmallHeaders = document.querySelectorAll('.underline-why');
  const slideToRightPlusOpacity = document.querySelectorAll('.slide-to-right');
  predimstvaLis.forEach(leftOpacityEach);
  opacitySmallHeaders.forEach(leftOpacityEach);
  slideToRightPlusOpacity.forEach(leftOpacityEach);

  //BOUNCING ANIMATION 1234
  function animateBounce() {
    const stepRounds = document.querySelectorAll('.step-round');
    const stepCount = stepRounds.length;
    const animateStepRound = (stepRound, delay) => {
      setTimeout(() => {
        stepRound.style.animation = 'jump 0.5s infinite alternate';
        stepRound.addEventListener('animationend', () => {
          stepRound.style.animation = '';
        });
      }, delay);
    }
    let delay = 0;
    for (let i = 0; i < stepCount; i++) {
      animateStepRound(stepRounds[i], delay);
      delay += 750;

    }
  }
  animateBounce();

  ///////////////////////////////////////home mn RESPONSIVE
  const responseTextHead = document.querySelectorAll('.response-text-header')
  const mainBookingSection = document.getElementById('main-booking-section');

  function handleViewportWidth() {
    const viewportWidth = window.innerWidth;
    const topText = responseTextHead[0]
    const midText = responseTextHead[1]
    const lastTest = responseTextHead[2]
    const ulMain = document.querySelector('.options-service ul')
    const supporterResponse = document.querySelector('.opacity-background')
    if (mainBookingSection.children.length == 2) {
      if (viewportWidth < 767) {
        topText.textContent = 'S.O.S България'
        lastTest.textContent = 'Може да направите запитване онлайн чрез нашия уебсайт или да се свържете с нас по телефона. Нашите оператори ще бъдат на разположение, за да ви предоставят необходимата помощ при избора на подходящата услуга и да ви предоставят информация относно цените и условията на услугата.';
        lastTest.classList.remove('head-title-text')
        lastTest.classList.add('head-title-text_color_support')
        topText.classList.add('head-title-text')
        topText.classList.remove('head-title-text_color_support')
        supporterResponse.prepend(topText)
        topText.after(midText)
      } else {
        topText.textContent = 'Може да направите запитване онлайн чрез нашия уебсайт или да се свържете с нас по телефона. Нашите оператори ще бъдат на разположение, за да ви предоставят необходимата помощ при избора на подходящата услуга и да ви предоставят информация относно цените и условията на услугата.';
        lastTest.textContent = 'S.O.S България'
        lastTest.after(midText);
        ulMain.after(topText)
        lastTest.classList.add('head-title-text');
        lastTest.classList.remove('head-title-text_color_support');
        topText.classList.remove('head-title-text')
        topText.classList.add('head-title-text_color_support')
      }
    }
  }
  handleViewportWidth();
  window.addEventListener('resize', handleViewportWidth);
  //////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////some fybc///////////////////////////////////////////////////


  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  //quote
  //Quote form submit 
  const quoteForm = document.getElementById('form-quote');
  const quoteFormBtn = document.getElementById('get-quote-btn');
  const quoteInputs = quoteForm.querySelectorAll('input')
  const quoteOption = quoteForm.querySelector('select')

  ////////////////EMPTY STRING HANDLER//////////////////

  quoteFormBtn.addEventListener('click', isEpmtyHandler)
  function isEpmtyHandler() {
    var make = document.getElementById('make-booking').value
    var model = document.getElementById('model-booking').value
    const errorElement = document.querySelector('.booking-form__container > div > p');
    const errorDiv = document.createElement('div');
    const error = document.createElement('p');
    errorDiv.classList.add('alert', 'alert-danger');
    error.style.marginBottom = '0';
    errorDiv.appendChild(error)

    if (make === '' || model === '') {
      if (errorElement) {
        errorElement.textContent = 'Моля попълнете полетата';
      } else {
        error.textContent = 'Моля попълнете полетата';
        document.getElementsByClassName('booking-form__title')[0].after(errorDiv);
      }
      return;
    }
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
        if (permissionStatus.state === 'denied' || permissionStatus.state === 'prompt') {
          if (errorElement) {
            errorElement.textContent = 'Моля позволете вашата локация за да продължите';
          } else {
            error.textContent = 'Моля позволете вашата локация за да продължите';
            document.getElementsByClassName('booking-form__title')[0].after(errorDiv);
          }
        }
      });
    } else {
      // Geolocation is not supported by the browser
      // You can continue with your code that uses geolocation
    }
  }
  ///////////////////////////
  quoteForm.addEventListener('submit', async function (event) {
    var addressInput = document.getElementById('address-input');
    var addressInputPick = document.getElementById('address-pick');
    var addressInputDrop = document.getElementById('address-drop');


    event.preventDefault();
    let newBody = {
      make: quoteInputs[1].value,
      model: quoteInputs[2].value,
      option: quoteOption.value,
      pickUp: quoteInputs[3].value,
      dropOff: quoteInputs[4].value,
      lat: 0,
      long: 0,
    };

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      })
      newBody.lat = position.coords.latitude;
      newBody.long = position.coords.longitude;
      addressInputPick.disabled = false;
      addressInputDrop.disabled = false;
      addressInput.disabled = true;
    } catch (error) {
      console.error(error);
      return;
    }

    try {
      const response = await fetch(`/quote?id=${'someID'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBody)
      });

      if (response.ok) {
        const dataJson = await response.json();
        window.location.href = `/quote?id=${dataJson._id}`;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error(error);
      // Handle any errors that may have occurred during the fetch request
    }
  });



  const findBookingForm = document.getElementById('find-booking-index-form')
  //Find Booking
  findBookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();;
    const inputBookingNumber = findBookingForm.querySelectorAll("input")[0];
    const inputBookingEmail = findBookingForm.querySelectorAll("input")[1];
    const quoteNumberFindValue = inputBookingNumber.value.toUpperCase();
    const quoteEmailFindValue = inputBookingEmail.value;
    const sendData = { quoteNumberFindValue: quoteNumberFindValue, quoteEmailFindValue: quoteEmailFindValue };
    const p = document.createElement("p");
    const existingP = findBookingForm.querySelector('p');
    //Моля попълнете полетата if empty
    if (quoteNumberFindValue === '' || quoteEmailFindValue === '') {
      if (!existingP) {
        p.textContent = 'Моля попълнете полетата';
        p.classList.add("text-center");
        findBookingForm.insertBefore(p, findBookingForm.firstChild);
      } else {
        existingP.textContent = 'Моля попълнете полетата'
      }
      return
    }
    try {
      const response = await fetch(`/manage-booking/booking/${quoteNumberFindValue}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
      });
      const json = await response.json();
      if (json.orderID === undefined) {
        if (!existingP) {
          p.textContent = json.text;
          p.classList.add("text-center");
          findBookingForm.insertBefore(p, findBookingForm.firstChild);
        } else if (existingP.textContent = 'Моля попълнете полетата') {
          existingP.textContent = json.text
        }
      } else {
        window.location.href = `/manage-booking/booking/${json.orderID}`;
      }


    } catch (error) {
      console.error(error);
    }
  });


  //Contact me form submit
  const contactMeForm = document.getElementById('form-contact-index');
  const contactInputs = contactMeForm.querySelectorAll("input");
  const contactTextarea = contactMeForm.querySelectorAll("textarea");

  contactMeForm.addEventListener('submit', async (e) => {
    const bodyArr = [];
    e.preventDefault()
    contactInputs.forEach(input => bodyArr.push(input.value))
    contactTextarea.forEach(textarea => bodyArr.push(textarea.value))
    try {
      postData('/send-msg', bodyArr)
    } catch (e) {
      console.log(e)
    }

  })
})

