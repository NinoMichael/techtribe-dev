'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, updatePassword} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABkdP81SincIZSm5eJleaWSyjHc3Jknww",
  authDomain: "techtribe-d17ca.firebaseapp.com",
  projectId: "techtribe-d17ca",
  storageBucket: "techtribe-d17ca.appspot.com",
  messagingSenderId: "538579981859",
  appId: "1:538579981859:web:1143634c8a3aa4755b4396",
  measurementId: "G-ZHD0227CMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
console.log(auth)

const inputs = document.getElementsByTagName('input');
const step = document.getElementById('step');
const form = document.getElementById('myForm');
const btn = document.getElementById('btn');

const warning = document.createElement('p');
warning.style.color = "rgb(179, 21, 21)";
warning.style.fontSize = "0.75em";
warning.style.textAlign = "left";
warning.style.marginTop = "-20px";
warning.style.marginBottom = "10px";

btn.addEventListener('click', function() {
    if(inputs[0].value == "" || inputs[1].value == "") {
        warning.textContent = "* Veuillez remplir le formulaire";
        warning.style.textAlign = "center";
        myForm.insertBefore(warning, inputs[0]);
    } else if(inputs[0].value != inputs[1].value) {
        warning.textContent = "* Mot de passe invalide";
        warning.style.textAlign = "center";
        myForm.insertBefore(warning, inputs[0]);
    } else if (inputs[1].value.length <= 6) {
        warning.textContent = "* Le mot de passe doit contenir 6 caractères minimum";
        warning.style.textAlign = "center";
        myForm.insertBefore(warning, inputs[0]);
    } else {
        window.location.href = "login.html";
    }
});