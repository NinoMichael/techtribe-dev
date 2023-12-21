// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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

const body = document.body;
const form = document.getElementById('myForm');
const inputs = document.getElementsByTagName('input');
const steps = document.querySelectorAll('.step');
const stepLine = document.getElementById('step-line');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const icon1 = document.getElementById('iconPwd1');
const icon2 = document.getElementById('iconPwd2');

document.addEventListener('DOMContentLoaded', function() {    
    // Redirection du bouton "Retour"
prev.addEventListener('click', function () {
    window.location.href = "index.html";
});

// Configuration de la date de naissance avec FlatPickr
const showDate = flatpickr("#naissance", {
    dateFormat: "d-m-Y",
    enableTime: false,
    onClose: function (selectedDates, dateStr, instance) {

      document.getElementById("naissance").value = dateStr;
    },
  });

  document.getElementById("calendarIcon").addEventListener("click", function () {
    showDate.open();
    document.getElementById("calendarIcon").addEventListener("click", function () {
      showDate.close();
    });
  });

const warning = document.createElement('p');
warning.style.color = "rgb(179, 21, 21)";
warning.style.fontSize = "0.75em";
warning.style.textAlign = "left";
warning.style.marginTop = "0px";

// Gestionnaire d'erreur venant de l'utilisateur et redirection du bouton "Suivant"
next.addEventListener('click', function(e){
    if(inputs[0].value =="" || inputs[1].value == "" || inputs[2].value =="" && inputs[3].value == "" || inputs[4].value =="" || inputs[5].value =="" || inputs[6].value =="") {
        warning.textContent = "* Veuillez remplir le formulaire";
        warning.style.textAlign = "center";
        icon1.style.bottom = "215px";
        icon2.style.bottom = "170px";
        form.insertBefore(warning, inputs[0]);
    } else if (/\d/.test(inputs[0].value)){
        warning.textContent = "* Le champ-ci ne doit pas contenir de chiffre";
        form.insertBefore(warning, inputs[1]);
        icon1.style.bottom = "215px";
        icon2.style.bottom = "170px";
    } else if (/\d/.test(inputs[1])) {
        warning.textContent = "* Le champ-ci ne doit pas contenir de chiffre";
        form.insertBefore(warning, inputs[1]);
        icon1.style.bottom = "215px";
        icon2.style.bottom = "170px";
    } else if (inputs[5].value == inputs[0].value) {
        warning.textContent = "* Votre mot de passe ne doit pas être votre nom";
        form.insertBefore(warning, inputs[6]);
        icon1.style.bottom = "215px";
        icon2.style.bottom = "170px";
    } else if (inputs[5].value == inputs[1].value) {
        warning.textContent = "* Votre mot de passe ne doit pas être votre prénom";
        form.insertBefore(warning, inputs[6]);
        icon1.style.bottom = "215px";
        icon2.style.bottom = "170px";
    } else if (!/^.+@gmail.com$/.test(inputs[3].value)){
        warning.textContent = "* L'adresse e-mail doit contenir @gmail.com";
        form.insertBefore(warning, inputs[4]);
        icon1.style.bottom = "215px";
        icon2.style.bottom = "170px";
    } else if (inputs[5].value !== inputs[6].value) {
        warning.textContent = "* Mot de passe invalide";
        form.insertBefore(warning, inputs[6]);
        icon1.style.bottom = "260px";
        icon2.style.bottom = "175px";
    } else if (inputs[5].value.length <= 6) {
        warning.textContent = "* Le mot de passe doit contenir 6 caractères au minimum";
        form.insertBefore(warning, inputs[6]);
        icon1.style.bottom = "260px";
        icon2.style.bottom = "175px";
    } else {
        const email = inputs[3].value;
        const mdp = inputs[6].value;

        createUserWithEmailAndPassword(auth, email, mdp).then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });

          window.location.href = "../registration/register2.html"
}

// Evénéments pour faire basculer les icônes pour le mot de passe
icon1.addEventListener('click', function() {
    showIcon(inputs[5], "330px", "325px", "385px", "335px", icon1);
});

icon2.addEventListener('click', function(){
    showIcon(inputs[6], "325px", "400px", "435px", "335px", icon2);
});

function showIcon(champ, positionY, positionX, newPositionY, newPositionX, icone) {
    const newIcon = document.createElement('i');
    newIcon.className = "fa fa-eye-slash";
    newIcon.style.position = "absolute";
    newIcon.style.top = positionY;
    newIcon.style.right = positionX;
    newIcon.style.color = "rgba(90, 88, 88, 0.808)";
    newIcon.style.cursor = "pointer";
    
    if(champ.type === "password") {
       icone.style.opacity = "0";
       newIcon.style.top = newPositionY;
       newIcon.style.right = newPositionX;
       champ.type = "text";
       body.appendChild(newIcon);
       
       newIcon.addEventListener('mouseenter', function() {
            newIcon.style.color = "rgba(66, 66, 66, 0.808)";
       });

       newIcon.addEventListener('mouseleave', function() {
            newIcon.style.color = "rgba(90, 88, 88, 0.808)";
       })

       newIcon.addEventListener('click', function() {
           if(champ.type !== "password") {
            champ.type = "password";
            newIcon.remove();
            icone.style.opacity = "1";
           }
       });
    } 
}

});
});














