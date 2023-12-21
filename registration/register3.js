'use strict';

const body = document.body;
const stepForm = document.getElementById('stepform');
const closeIcon = document.querySelector('i');
const form = document.getElementById('myForm');
const input = document.querySelector('input[type = "checkbox"]');
const next = document.getElementById('next');

document.addEventListener('DOMContentLoaded', function() {
    next.addEventListener('click', function() {
        if(input.checked) {
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
                   text : "Inscription réussie",
                   icon : "success",
                   customClass : {
                      popup : "custom-dialog",
                   },
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.href = "login.html";
                    }
                });
            }, 5000);
        }
    });

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
}); 