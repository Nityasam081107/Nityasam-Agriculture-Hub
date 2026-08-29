/* ===========================
   FARMER PAGE LOADER
=========================== */

window.addEventListener("load", function () {

    setTimeout(function () {

        const loader = document.getElementById("farmer-loader");
        const content = document.getElementById("farmer-content");

        if (loader) {
            loader.style.display = "none";
        }

        if (content) {
            content.style.display = "block";
        }

    }, 2500);

});


/* ===========================
   SMOOTH SCROLL
=========================== */

function scrollToCrop() {

    const crop = document.getElementById("crop");

    if (crop) {

        crop.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ===========================
   CROP BUTTONS
=========================== */

document.querySelectorAll(".crop-card button").forEach(function(button){

    button.addEventListener("click", function(){

        alert("🌾 Crop details will be available soon.");

    });

});


/* ===========================
   SERVICE CARDS
=========================== */

document.querySelectorAll(".service-card").forEach(function(card){

    card.addEventListener("click", function(){

        const title = this.querySelector("h3").innerText;

        alert("Opening " + title + "... (Coming Soon)");

    });

});


/* ===========================
   NAVBAR ACTIVE EFFECT
=========================== */

const navLinks = document.querySelectorAll(".farmer-navbar a");

navLinks.forEach(function(link){

    link.addEventListener("click", function(){

        navLinks.forEach(function(item){
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


/* ===========================
   PAGE READY
=========================== */

console.log("🌾 Farmer Portal Loaded Successfully");
console.log("Nityasam Agriculture Hub");
console.log("Designed & Developed by Tirth Barot");
