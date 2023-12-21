'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuration de Firebase
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

const step = document.getElementById("step");
const email = document.getElementById("myEmail");
const form = document.getElementById("myForm");
const button = document.getElementById("btn");

const warning = document.createElement('p');
warning.style.color = "rgb(179, 21, 21)";
warning.style.fontSize = "0.75em";
warning.style.textAlign = "left";
warning.style.marginTop = "-20px";
warning.style.marginBottom = "10px";

button.addEventListener('click', function() {
    if(email.value == "") {
        warning.textContent = "* Veuillez entrer votre e-mail";
        warning.style.textAlign = "center";
        step.insertBefore(warning, form);
    } else {
        const content = email.value;
        sendPasswordResetEmail(auth, content)
      .then(() => {
        // Password reset email sent!
        Swal.fire({
          html : '<i class="fa fa-spinner fa-spin fa-3x" style = "color : white; margin-top : 20px"></i>',
          showConfirmButton : false,
          allowOutsideClick : false,
          customClass : {
              popup : "loading-content",
          },
          onBeforeOpen : () => {
              Swal.showLoading();
          },
      });

      setTimeout(() => {
          Swal.close();
          Swal.fire({
             text : "Un e-mail vous a été envoyé sur votre adresse pour réinitialiser votre mot de passe. Veuillez vérifier votre boite e-mail",
             icon : "success",
             customClass : {
                popup : "custom-dialog",
             },
          }).then((result) => {
              if(result.isConfirmed) {
              }
          });
      }, 500);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      }

});

