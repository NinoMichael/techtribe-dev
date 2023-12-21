'use strict'

const surf = document.getElementById('surf');
const rates = ["rate1", "rate2", "rate3", "rate4", "rate5", "rate6"].map(function(id) {
    return document.getElementById(id);
});
const rateContainer = document.getElementById('rate_container'); 
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const toggles = document.querySelectorAll('.toggle');

document.addEventListener('DOMContentLoaded', function() {
    surf.addEventListener('click', function () {
        window.location.href = "login.html"
    })
})

let i = 0;

next.addEventListener('click', function() {
    carouselAvis(1);
});

prev.addEventListener('click', function() {
   carouselAvis(-1);
});

function carouselAvis(v) {
    i += v;

    if (i < 0) {
        i = rates.length - 1;
    } else if (i >= rates.length) {
        i = 0;
    }

    const rateWidth = 200 / rates.length;
    const rateTranslate = rateWidth * -1 * i;
    rateContainer.style.transform = `translateX(${rateTranslate}%)`
}

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active');
    })
});








