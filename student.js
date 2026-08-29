/* =========================
   STUDENT PAGE LOADER
========================= */

window.addEventListener("load", function () {

    setTimeout(function () {

        const loader = document.getElementById("student-loader");
        const content = document.getElementById("student-content");

        if (loader) {
            loader.style.display = "none";
        }

        if (content) {
            content.style.display = "block";
        }

    }, 2500);

});


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================
   START LEARNING
========================= */

function scrollToStudy() {

    const section = document.getElementById("study");

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================
   EXPLORE FEATURES
========================= */

function scrollToFeatures() {

    const section = document.querySelector(".student-services");

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================
   NOTES
========================= */

function openNotes() {

    alert(
        "📚 Study Notes section is coming soon!"
    );

}


/* =========================
   MCQ
========================= */

function openMCQ() {

    alert(
        "📝 MCQ Practice section is coming soon!"
    );

}


/* =========================
   ICAR PG
========================= */

function openICAR() {

    alert(
        "🎯 ICAR PG Preparation section is coming soon!"
    );

}


/* =========================
   PREVIOUS PAPERS
========================= */

function openPapers() {

    alert(
        "📖 Previous Papers section is coming soon!"
    );

}


/* =========================
   CONSOLE
========================= */

console.log("🎓 Nityasam Agriculture Hub - Student Portal");
console.log("Designed & Developed by Tirth Barot");
