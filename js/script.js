'use strict'

let Slider = (function(){
    let slidesRow = document.querySelector('.slider__slides');
    let slides = document.querySelectorAll('.slider__slide');
    let controls = document.querySelectorAll('.controls__control');
    let buttonNext = document.querySelector('.slider__next');
    let buttonPrev = document.querySelector('.slider__prev');
    let slideWidth = getCoords(slides[0]).right - getCoords(slides[0]).left;
    let index = 1;
    let sliderCounterCurrent = document.querySelector('.slider__counter-current');
    let sliderCounterAll = document.querySelector('.slider__counter-all');
    
    function getCoords(elem) {
      const box = elem.getBoundingClientRect();
    
    return {
      top: box.top + elem.offsetTop,
      right: box.right + elem.offsetLeft,
      bottom: box.bottom + elem.offsetTop,
      left: box.left + elem.offsetLeft
    }
  }
    
    function activeControlButton() {
      let nextActiveControll = document.querySelector(`.controls__control[data-index='${index}']`);
      let currentActiveControll = document.querySelector('.controls__control_active');
  
      currentActiveControll.classList.remove('controls__control_active');
      nextActiveControll.classList.add('controls__control_active');
    }
    
    function updateSliderCounter() {
      sliderCounterAll.innerHTML = slides.length;
      sliderCounterCurrent.innerHTML = index;
    }
    
    updateSliderCounter();
    
    function updateSlider() {
      let slideIndex = +this.dataset.index;
  
      slidesRow.style.transform = "translateX("+ ((slideIndex===1) ? 0 : -(slideWidth) * (slideIndex-1)) +"px)";
      index = slideIndex;
      activeControlButton();
      updateSliderCounter();
    }
    
    function prevSlideButton() {
      if(index === 1) return;
      slidesRow.style.transform = "translateX("+ -((slideWidth*(index -1)) - slideWidth) +"px)";
      index--;
      activeControlButton();
      updateSliderCounter();
    }
    
    function nextSlideButton() {
      if(index === slides.length) return;
      slidesRow.style.transform = "translateX("+ -(slideWidth)*(index)  +"px)";
      index++;
      activeControlButton();
      updateSliderCounter();
    }
    
    return {
      controls: controls,
      buttonPrev: buttonPrev,
      buttonNext: buttonNext,
      updateSlider: updateSlider,
      prevSlideButton: prevSlideButton,
      nextSlideButton: nextSlideButton
    }
    
  })();
  
  Slider.controls.forEach(function(control) {
    control.addEventListener('click', Slider.updateSlider);
  });
  
  Slider.buttonPrev.addEventListener('click', Slider.prevSlideButton);
  Slider.buttonNext.addEventListener('click', Slider.nextSlideButton);