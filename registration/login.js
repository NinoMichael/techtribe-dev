
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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

const body = document.body;
const image = document.getElementById('imagetech');
const image1 = document.getElementById('imagetech1');
const image2 = document.getElementById('imagetech2');
const image3 = document.getElementById('imagetech3');
const images = document.querySelectorAll('#image_container img');
const lead = document.getElementById('lead');
const icon = document.getElementById('iconPwd');
const form = document.getElementById('myForm');
const bouton = document.getElementById('signin');
const inputs = document.getElementsByTagName('input');
const linkGoogle = document.getElementById('google');
const linkGithub = document.getElementById('github');

const imgs = [image1, image2, image3];
let i = 0;

// Carousel d'images
let intervalle = setInterval(defile, 20000);
function defile() {
    i++;
    changeImage();
}

function changeImage() {
    if (i > imgs.length - 1) {
        i = 0;
    } 
    else if (i < 0) {
        i = imgs.length - 1;
    }
    imgs[i].style.transform = `translateX(${-i * 80}vh)`;
}

// Evénement pour faire basculer les icônes pour le mot de passe
icon.addEventListener('click', function() {
    showIcon(inputs[1], "300px", "580px", "300px", "580px", icon);
});

function showIcon(champ, positionY, positionX, newPositionY, newPositionX, icone) {
    const newIcon = document.createElement('i');
    newIcon.className = "fa fa-eye-slash";
    newIcon.style.position = "absolute";
    newIcon.style.top = positionY;
    newIcon.style.left = positionX;
    newIcon.style.color = "rgba(90, 88, 88, 0.808)";
    newIcon.style.cursor = "pointer";
    
    if(champ.type === "password") {
       icone.style.opacity = "0";
       newIcon.style.top = newPositionY;
       newIcon.style.left = newPositionX;
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

//Redirection du bouton "Se connecter"
bouton.addEventListener('click', function() {
    if(inputs[0].value == "" || inputs[1].value == "") {
        lead.textContent = "* Veuillez remplir le champ d'identifiant";
        lead.style.color = "rgb(179, 21, 21)";
        lead.style.fontSize = "0.9em";
    } else if (!/@gmail.com$/.test(inputs[0].value)) {
        lead.textContent = "* L'adresse e-mail doit contenir @gmail.com";
        lead.style.color = "rgb(179, 21, 21)";
        lead.style.fontSize = "0.9em";
    } else if (inputs[1].value.length <= 6) {
        lead.textContent = "* Le mot de passe doit contenir 6 caractères minimum";
        lead.style.color = "rgb(179, 21, 21)";
        lead.style.fontSize = "0.9em";
    } else {
    const email = inputs[0].value;
    const mdp = inputs[1].value;

    signInWithEmailAndPassword(auth, email, mdp)
  .then((userCredential) => {
    // Connexion établie
    const user = userCredential.user;
    console.log("CONNECTE");
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
           text : "Connexion réussie",
           icon : "success",
           customClass : {
              popup : "custom-dialog",
           },
        }).then((result) => {
            if(result.isConfirmed) {
                form.reset();
            }
        });
    }, 1500);
  })

  .catch((error) => {
    // Connexion non-établie
    const errorCode = error.code;
    const errorMessage = error.message;
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
           text : "Adresse e-mail ou mot de passe incorrect. Veuillez réessayer",
           icon : "error",
           customClass : {
              popup : "custom-dialog",
           },
        }).then((result) => {
            if(result.isConfirmed) {
            }
        });
    }, 500)
  });

    }

});

linkGoogle.addEventListener('click', function(e) {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.languageCode = 'it';


signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
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
           text : "Connexion réussie",
           icon : "success",
           customClass : {
              popup : "custom-dialog",
           },
        }).then((result) => {
            if(result.isConfirmed) {
                form.reset();
            }
        });
    }, 1500);

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
});

linkGithub.addEventListener('click', function() {
   const provider = new GithubAuthProvider();
   provider.addScope('repo');
   signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
    const credential = GithubAuthProvider.credentialFromError(error);
    })
});







