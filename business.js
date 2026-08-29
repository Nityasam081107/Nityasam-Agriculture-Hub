/* =========================================================
   NITYASAM AGRICULTURE HUB
   BUSINESS PORTAL - COMPLETE JS
========================================================= */


/* =========================
   BUSINESS PAGE LOADER
========================= */

window.addEventListener("load", function(){

    setTimeout(function(){

        const loader =
            document.getElementById("business-loader");

        const content =
            document.getElementById("business-content");

        if(loader){
            loader.style.display = "none";
        }

        if(content){
            content.style.display = "block";
        }

    }, 2500);

});


/* =========================
   HERO BUTTON
========================= */

function scrollToBusinessServices(){

    const services =
        document.getElementById("business-services");

    if(services){

        services.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    }

}


/* =========================
   SERVICE BUTTONS
========================= */

document
.querySelectorAll(".business-service-card button")
.forEach(function(button){

    button.addEventListener("click", function(){

        const card =
            this.closest(".business-service-card");

        const title =
            card.querySelector("h3");

        if(title){

            alert(
                "💼 " +
                title.innerText +
                "\n\nThis section will be available soon."
            );

        }

    });

});


/* =========================
   NAVBAR ACTIVE LINK
========================= */

const navLinks =
    document.querySelectorAll(".business-navbar a");

navLinks.forEach(function(link){

    link.addEventListener("click", function(){

        navLinks.forEach(function(item){

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});


/* =========================
   CONSOLE
========================= */

console.log("💼 Nityasam Agriculture Hub");
console.log("Business Portal Loaded Successfully");
console.log("Designed & Developed by Tirth Barot");