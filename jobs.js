/* =====================================
   NITYASAM AGRICULTURE HUB
   JOBS PAGE JS
   PART 1
===================================== */


/* =========================
   PAGE LOADER
========================= */

document.addEventListener("DOMContentLoaded", function () {

    setTimeout(function () {

        const loader = document.getElementById("jobs-loader");
        const content = document.getElementById("jobs-content");

        if (loader) {
            loader.style.display = "none";
        }

        if (content) {
            content.style.display = "block";
        }

        loadJobs();

    }, 1800);

});


/* =========================
   LOAD JOBS
========================= */

function loadJobs() {

    const jobsList = document.getElementById("jobsList");

    if (!jobsList) {
        return;
    }

    /*
       Jobs saved by Admin Panel
       will be read from localStorage.
    */

    let jobs = [];

    try {

        jobs = JSON.parse(
            localStorage.getItem("nityasam_Jobs")
        ) || [];

    } catch (error) {

        console.error(
            "Unable to load jobs:",
            error
        );

        jobs = [];

    }


    displayJobs(jobs);

}
/* =========================
   DISPLAY JOBS
========================= */

function displayJobs(jobs) {

    const jobsList = document.getElementById("jobsList");

    if (!jobsList) {
        return;
    }

    jobsList.innerHTML = "";


    /* NO JOBS */

    if (!Array.isArray(jobs) || jobs.length === 0) {

        jobsList.innerHTML = `
            <div class="jobs-empty">

                <div class="jobs-empty-icon">
                    💼
                </div>

                <h3>
                    No Jobs Available
                </h3>

                <p>
                    New agriculture job opportunities
                    will appear here soon.
                </p>

            </div>
        `;

        return;
    }


    /* JOB CARDS */

    jobs.forEach(function (job) {

        const card = document.createElement("div");

        card.className = "public-job-card";


        const title =
            job.title ||
            job.jobTitle ||
            "Agriculture Job";


        const company =
            job.company ||
            job.companyName ||
            "Agriculture Company";


        const location =
            job.location ||
            "Location not specified";


        const type =
            job.type ||
            job.jobType ||
            "Job";


        const salary =
            job.salary ||
            "Salary not specified";


        const description =
            job.description ||
            "No description available.";


        card.innerHTML = `

            <h3>
                ${escapeJobText(title)}
            </h3>

            <div class="public-job-company">
                🏢 ${escapeJobText(company)}
            </div>

            <div class="public-job-location">
                📍 ${escapeJobText(location)}
            </div>

            <div class="public-job-type">
                💼 ${escapeJobText(type)}
            </div>

            <div class="public-job-salary">
                💰 ${escapeJobText(salary)}
            </div>

            <p class="public-job-description">
                ${escapeJobText(description)}
            </p>

        `;


        jobsList.appendChild(card);

    });

}
/* =========================
   SEARCH JOBS
========================= */

function searchJobs() {

    const searchInput =
        document.getElementById("jobSearch");

    const jobsList =
        document.getElementById("jobsList");

    if (!searchInput || !jobsList) {
        return;
    }

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    let jobs = [];

    try {

        jobs = JSON.parse(
            localStorage.getItem("nityasam_Jobs")
        ) || [];

    } catch (error) {

        console.error(
            "Search error:",
            error
        );

        return;
    }


    if (searchText === "") {

        displayJobs(jobs);

        return;
    }


    const filteredJobs = jobs.filter(function (job) {

        const searchableText = [

            job.title,
            job.jobTitle,

            job.company,
            job.companyName,

            job.location,

            job.type,
            job.jobType,

            job.salary,

            job.description

        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


        return searchableText.includes(searchText);

    });


    if (filteredJobs.length === 0) {

        jobsList.innerHTML = `

            <div class="jobs-empty">

                <div class="jobs-empty-icon">
                    🔎
                </div>

                <h3>
                    No Matching Jobs
                </h3>

                <p>
                    Try searching with another
                    job title, company or location.
                </p>

            </div>

        `;

        return;
    }


    displayJobs(filteredJobs);

}
/* =========================
   SEARCH EVENT
========================= */

const jobSearch =
    document.getElementById("jobSearch");

if (jobSearch) {

    jobSearch.addEventListener(
        "input",
        searchJobs
    );

}


/* =========================
   SCROLL TO JOBS
========================= */

function scrollToJobs() {

    const section =
        document.getElementById("jobs-section");

    if (section) {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================
   SAFE TEXT
========================= */

function escapeJobText(text) {

    return String(text ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
