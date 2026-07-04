

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        target.scrollIntoView({
            behavior: "smooth"
        });

    });
});




const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(pageYOffset >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") == "#" + current){
            link.classList.add("active");
        }

    });

});




const revealElements = document.querySelectorAll(
".home-content,.about-content,.skill-card,.project-card,form"
);

function reveal(){

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(el=>{

        const top = el.getBoundingClientRect().top;

        if(top < trigger){
            el.classList.add("show");
        }

    });

}

window.addEventListener("scroll", reveal);

reveal();




const title = document.querySelector(".home-content h2");

const text = "Frontend Web Developer";

let index = 0;

function typing(){

    if(index <= text.length){

        title.textContent = text.slice(0,index);

        index++;

        setTimeout(typing,120);

    }

}

title.textContent="";

typing();




const form = document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value.trim();

    const email = form.querySelector('input[type="email"]').value.trim();

    if(name==="" || email===""){

        alert("Please fill all required fields.");

        return;

    }

    alert("Thank you! Your message has been submitted.");

    form.reset();

});




const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.bottom="20px";
topBtn.style.right="20px";
topBtn.style.width="45px";
topBtn.style.height="45px";
topBtn.style.border="none";
topBtn.style.borderRadius="50%";
topBtn.style.background="#38bdf8";
topBtn.style.color="white";
topBtn.style.fontSize="22px";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.boxShadow="0 5px 10px rgba(0,0,0,.3)";

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});




revealElements.forEach(el=>{

    el.style.opacity="0";

    el.style.transform="translateY(50px)";

    el.style.transition=".8s";

});

document.addEventListener("scroll",()=>{

    revealElements.forEach(el=>{

        const pos=el.getBoundingClientRect().top;

        if(pos<window.innerHeight-100){

            el.style.opacity="1";

            el.style.transform="translateY(0)";

        }

    });

});