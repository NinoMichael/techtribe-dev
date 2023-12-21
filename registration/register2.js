'use strict';

const body = document.body;
const closeIcon = document.querySelector('i');
const steps = document.querySelectorAll('.step');
const stepLine = document.getElementById('step-line');
const stepForm = document.getElementById('stepform');
const form = document.getElementById('myForm');
const box = document.getElementsByTagName('input');
const next = document.getElementById('next');

document.addEventListener('DOMContentLoaded', function() {
    const warning = document.createElement('p');
    warning.style.color = "rgb(179, 21, 21)";
    warning.style.fontSize = "0.85em";
    warning.style.textAlign = "center";
    warning.style.marginTop = "0px";

// Bouton pour annulation de l'inscription
    closeIcon.addEventListener('click', function() {
        Swal.fire({
            text : "Souhaitez-vous annuler votre inscription ?",
            icon : "info",
            width : "30%",
            showDenyButton : true,
            denyButtonText : "Non",
            denyButtonColor : "rgb(163, 163, 163)",
            confirmButtonText : "Oui",
            confirmButtonColor : "rgb(51, 14, 99)",
            customClass : {
                popup : "custom-dialog",
            }
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.href = "index.html";
            }
        });
    });
    
    next.addEventListener('click', function() {
            if(box[0].checked ||box[1].checked || box[2].checked || box[3].checked) {
                stepLine.style.width = "100%";
                steps[2].classList.add('active');
                stepLine.style.setProperty('--before-width', '0%')
                window.location.href = "register3.html";
            } else {
                warning.textContent = "Veuiller sélectionnner une option";
                stepForm.insertBefore(warning, form);
            }
    });
});


