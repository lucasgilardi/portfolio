/*Menu*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if(navToggle){
    navToggle.addEventListener("click", ()=>{
        navMenu.classList.add("show-menu");
    })
}

if(navClose){
    navClose.addEventListener("click",()=>{
        navMenu.classList.remove("show-menu");
    })
}

/*Remove menu mobile*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction(){
    constMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
}
navLink.forEach(n => n.addEventListener("click", linkAction));

/*Accordion*/
const skillsContent = document.getElementsByClassName("skills__content");
const skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills(){
    let itemClass = this.parentNode.className;

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = "skills__content skills__close";
    }
    if(itemClass === "skills__content skills__close"){
        this.parentNode.className = "skills__content skills__open";
    }
}

skillsHeader.forEach((el)=>{
    el.addEventListener("click", toggleSkills);
})

/*Qualification tabs*/
const tabs = document.querySelectorAll("[data-target");
const tabContents = document.querySelectorAll("[data-content");
tabs.forEach(tab =>{
    tab.addEventListener("click", ()=>{
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove("qualification__active");
        });
        target.classList.add("qualification__active");
        tab.forEach(tab =>{
            tab.classList.remove("qualification__active");
        });
        tab.classList.add("qualification__active");
    });
});

/*Services*/
const modalViews = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function(modalClick){
    modalViews[modalClick].classList.add("active-modal");
}

modalBtns.forEach((modalBtn, i) =>{
    modalBtn.addEventListener("click", () =>{
        modal(i);
    });
});
modalCloses.forEach((modalClose) =>{
    modalClose.addEventListener("click", () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove("active-modal");
        });
    });
});

/*Portfolio swiper*/
let swiper = new Swiper(".portfolio__container",{
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickeable: true,
    },
});

/*Scroll sections*/
const sections = document.querySelectorAll("section[id");

function scrollActive(){
    const scrollY = window.pageYOffset;
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(".nav__menu a[href*="+ sectionId + "]").classList.add("active-link");
        }else{
            document.querySelector(".nav__menu a[href*="+ sectionId + "]").classList.remove("active-link");
        }
    })
}
window.addEventListener("scroll", scrollActive);

/*Background header*/ 
function scrollHeader(){
    const nav = document.getElementById("header");
    if(this.scrollY >= 80) nav.classList.add("scroll-header"); else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*Scroll up*/ 
function scrollUp(){
    const scrollUp = document.getElementById("scroll-up");
    if(this.scrollY >= 560) scrollUp.classList.add("show-scroll"); else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*Dark / ligth theme*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme){
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () =>{
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
})

/*Form*/
const form = document.getElementById("form");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const response = document.getElementById("response");

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const nombreValue = nombre.value.trim();
    const emailValue = email.value.trim();
    const mensajeValue = mensaje.value.trim();

    if(nombreValue === ''){
        setError(nombre, 'Por favor indica tu nombre.');
    }else{
        setSuccess(nombre);
    }

    if(emailValue === ''){
        setError(email, 'Por favor indica tu email.');
    }else if (!isValidEmail(emailValue)){
        setError(email, 'Por favor ingrese un email válido.');
    }else{
        setSuccess(email);
    }

    if (mensajeValue === ''){
        setError(mensaje, 'Por favor ingrese su consulta.');
    }else{
        setSuccess(mensaje);
    }
}

form.addEventListener('submit', e =>{
    e.preventDefault();
    validateInputs();

    fetch("https://formsubmit.co/ajax/lcsgilardi@gmail.com",{
        method:'POST',
        body:new FormData(e.target)
    })
    .then(res => res.ok ? res.json():Promise.reject(res))
    .then(json => {
        console.log(json);
        response.innerHTML = `<p>${json.message}</p>`
        form.reset();
    })
    .catch(err => {
        console.log(err);
        let message = err.statusText || "Ocurrió un error, intenta nuevamente";
        response.innerHTML = `<p>Error ${err.status}: ${message}</p>`
    })
    .finally(() => setTimeout(() =>{
        response.innerHTML = "";
    }, 3000))
})