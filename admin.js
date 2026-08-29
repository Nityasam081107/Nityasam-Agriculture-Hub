/* =========================================
   NITYASAM AGRI HUB
   ADMIN PANEL - JAVASCRIPT
   PART 1
========================================= */


/* =========================================
   GLOBAL DATA
========================================= */

let jobs = [];

let internships = [];


/* =========================================
   LOAD DATA FROM LOCAL STORAGE
========================================= */

function loadData() {

    try {

        const savedJobs =
            localStorage.getItem("nityasam_jobs");

        const savedInternships =
            localStorage.getItem("nityasam_internships");


        if (savedJobs) {

            const parsedJobs =
                JSON.parse(savedJobs);

            if (Array.isArray(parsedJobs)) {

                jobs = parsedJobs;

            }

        }


        if (savedInternships) {

            const parsedInternships =
                JSON.parse(savedInternships);

            if (Array.isArray(parsedInternships)) {

                internships = parsedInternships;

            }

        }

    } catch (error) {

        console.error(
            "Error loading admin data:",
            error
        );

        jobs = [];
        internships = [];

    }

}


/* =========================================
   SAVE JOBS
========================================= */

function saveJobs() {

    try {

        localStorage.setItem(
            "nityasam_jobs",
            JSON.stringify(jobs)
        );

    } catch (error) {

        console.error(
            "Error saving jobs:",
            error
        );

    }

}


/* =========================================
   SAVE INTERNSHIPS
========================================= */

function saveInternships() {

    try {

        localStorage.setItem(
            "nityasam_internships",
            JSON.stringify(internships)
        );

    } catch (error) {

        console.error(
            "Error saving internships:",
            error
        );

    }

}


/* =========================================
   SAFE TEXT
========================================= */

function escapeHTML(text) {

    return String(text ?? "")

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================
   GET ELEMENT VALUE
========================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    if (!element) {

        return "";

    }

    return element.value.trim();

}


/* =========================================
   SET ELEMENT VALUE
========================================= */

function setValue(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.value = value ?? "";

    }

}


/* =========================================
   CLEAR JOB FORM
========================================= */

function clearJobForm() {

    setValue("job-title", "");

    setValue("job-company", "");

    setValue("job-location", "");

    setValue("job-salary", "");

    setValue("job-type", "");

    setValue("job-description", "");

}


/* =========================================
   CLEAR INTERNSHIP FORM
========================================= */

function clearInternshipForm() {

    setValue("internship-title", "");

    setValue("internship-company", "");

    setValue("internship-location", "");

    setValue("internship-duration", "");

    setValue("internship-type", "");

    setValue("internship-description", "");

}


/* =========================================
   JOB FORM VALIDATION
========================================= */

function validateJobForm() {

    const title =
        getValue("job-title");

    const company =
        getValue("job-company");

    const location =
        getValue("job-location");

    const type =
        getValue("job-type");


    if (
        !title ||
        !company ||
        !location ||
        !type
    ) {

        alert(
            "Please fill Job Title, Company, Location and Job Type."
        );

        return false;

    }


    return true;

}


/* =========================================
   INTERNSHIP FORM VALIDATION
========================================= */

function validateInternshipForm() {

    const title =
        getValue("internship-title");

    const company =
        getValue("internship-company");

    const location =
        getValue("internship-location");

    const type =
        getValue("internship-type");


    if (
        !title ||
        !company ||
        !location ||
        !type
    ) {

        alert(
            "Please fill Internship Title, Company, Location and Internship Type."
        );

        return false;

    }


    return true;

}
/* =========================================
   JOB SYSTEM
   PART 2
========================================= */

let editingJobId = null;


/* =========================================
   JOB FORM
========================================= */

const jobForm =
    document.getElementById("jobForm");


if (jobForm) {

    jobForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                getValue("jobTitle");

            const company =
                getValue("jobCompany");

            const location =
                getValue("jobLocation");

            const salary =
                getValue("jobSalary");

            const type =
                getValue("jobType");

            const description =
                getValue("jobDescription");


            if (
                !title ||
                !company ||
                !location ||
                !type
            ) {

                alert(
                    "Please fill all required Job details."
                );

                return;

            }


            /* EDIT EXISTING JOB */

            if (editingJobId !== null) {

                const index =
                    jobs.findIndex(
                        function (job) {

                            return job.id === editingJobId;

                        }
                    );


                if (index !== -1) {

                    jobs[index].title =
                        title;

                    jobs[index].company =
                        company;

                    jobs[index].location =
                        location;

                    jobs[index].salary =
                        salary;

                    jobs[index].type =
                        type;

                    jobs[index].description =
                        description;

                }


                saveJobs();

                renderJobs();

                updateDashboard();

                clearJobForm();


                editingJobId = null;


                document.getElementById(
                    "jobSubmitBtn"
                ).textContent =
                    "🚀 Publish Job";


                alert(
                    "✅ Job updated successfully!"
                );

                return;

            }


            /* ADD NEW JOB */

            const newJob = {

                id: Date.now(),

                title: title,

                company: company,

                location: location,

                salary: salary,

                type: type,

                description: description,

                createdAt:
                    new Date().toISOString()

            };


            jobs.push(newJob);


            saveJobs();

            renderJobs();

            updateDashboard();

            clearJobForm();


            alert(
                "✅ Job published successfully!"
            );

        }
    );

}


/* =========================================
   RENDER JOBS
========================================= */

function renderJobs() {

    const container =
        document.getElementById(
            "jobsList"
        );


    const count =
        document.getElementById(
            "jobCount"
        );


    const search =
        document.getElementById(
            "jobSearch"
        );


    if (!container) {

        return;

    }


    const searchText =
        search
            ? search.value
                .trim()
                .toLowerCase()
            : "";


    const filteredJobs =
        jobs.filter(
            function (job) {

                const searchableText = (

                    job.title +
                    " " +
                    job.company +
                    " " +
                    job.location +
                    " " +
                    job.type

                ).toLowerCase();


                return searchableText.includes(
                    searchText
                );

            }
        );


    if (count) {

        count.textContent =
            jobs.length +
            (
                jobs.length === 1
                    ? " job published"
                    : " jobs published"
            );

    }


    if (
        filteredJobs.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    📭 No jobs found
                </h3>

                <p>
                    Add a new job using the form above.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        filteredJobs
            .map(
                function (job) {

                    return `

                        <div class="job-item">

                            <h3>
                                ${escapeHTML(job.title)}
                            </h3>


                            <p class="company">
                                🏢
                                ${escapeHTML(job.company)}
                            </p>


                            <p class="location">
                                📍
                                ${escapeHTML(job.location)}
                            </p>


                            <p>
                                💼
                                ${escapeHTML(job.type)}
                            </p>


                            ${
                                job.salary
                                ? `
                                    <p>
                                        💰
                                        ${escapeHTML(job.salary)}
                                    </p>
                                  `
                                : ""
                            }


                            ${
                                job.description
                                ? `
                                    <p class="description">
                                        ${escapeHTML(
                                            job.description
                                        )}
                                    </p>
                                  `
                                : ""
                            }


                            <div class="item-actions">

                                <button
                                    class="edit-btn"
                                    onclick="editJob(${job.id})"
                                >
                                    ✏️ Edit
                                </button>


                                <button
                                    class="delete-btn"
                                    onclick="deleteJob(${job.id})"
                                >
                                    🗑️ Delete
                                </button>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}
/* =========================================
   JOB EDIT / DELETE
   PART 3
========================================= */


/* EDIT JOB */

function editJob(id) {

    const job =
        jobs.find(function (item) {

            return item.id === id;

        });


    if (!job) {

        return;

    }


    setValue(
        "jobTitle",
        job.title
    );

    setValue(
        "jobCompany",
        job.company
    );

    setValue(
        "jobLocation",
        job.location
    );

    setValue(
        "jobSalary",
        job.salary
    );

    setValue(
        "jobType",
        job.type
    );

    setValue(
        "jobDescription",
        job.description
    );


    editingJobId = id;


    const submitButton =
        document.getElementById(
            "jobSubmitBtn"
        );


    if (submitButton) {

        submitButton.textContent =
            "✏️ Update Job";

    }


    const jobsSection =
        document.getElementById(
            "jobsSection"
        );


    if (jobsSection) {

        jobsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* DELETE JOB */

function deleteJob(id) {

    const job =
        jobs.find(function (item) {

            return item.id === id;

        });


    if (!job) {

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this job?"
        );


    if (!confirmDelete) {

        return;

    }


    jobs =
        jobs.filter(function (item) {

            return item.id !== id;

        });


    saveJobs();

    renderJobs();

    updateDashboard();


    if (editingJobId === id) {

        editingJobId = null;

        clearJobForm();


        const submitButton =
            document.getElementById(
                "jobSubmitBtn"
            );


        if (submitButton) {

            submitButton.textContent =
                "🚀 Publish Job";

        }

    }


    alert(
        "🗑️ Job deleted successfully!"
    );

}
/* =========================================
   INTERNSHIP SYSTEM
   PART 4
========================================= */

let editingInternshipId = null;


/* =========================================
   INTERNSHIP FORM
========================================= */

const internshipForm =
    document.getElementById("internshipForm");


if (internshipForm) {

    internshipForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                getValue("internshipTitle");

            const company =
                getValue("internshipCompany");

            const location =
                getValue("internshipLocation");

            const stipend =
                getValue("internshipStipend");

            const duration =
                getValue("internshipDuration");

            const description =
                getValue("internshipDescription");


            if (
                !title ||
                !company ||
                !location ||
                !duration
            ) {

                alert(
                    "Please fill all required Internship details."
                );

                return;

            }


            /* EDIT EXISTING INTERNSHIP */

            if (editingInternshipId !== null) {

                const index =
                    internships.findIndex(
                        function (item) {

                            return item.id ===
                                editingInternshipId;

                        }
                    );


                if (index !== -1) {

                    internships[index].title =
                        title;

                    internships[index].company =
                        company;

                    internships[index].location =
                        location;

                    internships[index].stipend =
                        stipend;

                    internships[index].duration =
                        duration;

                    internships[index].description =
                        description;

                }


                saveInternships();

                renderInternships();

                updateDashboard();

                clearInternshipForm();


                editingInternshipId = null;


                document.getElementById(
                    "internshipSubmitBtn"
                ).textContent =
                    "🚀 Publish Internship";


                alert(
                    "✅ Internship updated successfully!"
                );

                return;

            }


            /* ADD NEW INTERNSHIP */

            const newInternship = {

                id: Date.now(),

                title: title,

                company: company,

                location: location,

                stipend: stipend,

                duration: duration,

                description: description,

                createdAt:
                    new Date().toISOString()

            };


            internships.push(
                newInternship
            );


            saveInternships();

            renderInternships();

            updateDashboard();

            clearInternshipForm();


            alert(
                "✅ Internship published successfully!"
            );

        }
    );

}


/* =========================================
   RENDER INTERNSHIPS
========================================= */

function renderInternships() {

    const container =
        document.getElementById(
            "internshipsList"
        );


    const count =
        document.getElementById(
            "internshipCount"
        );


    const search =
        document.getElementById(
            "internshipSearch"
        );


    if (!container) {

        return;

    }


    const searchText =
        search
            ? search.value
                .trim()
                .toLowerCase()
            : "";


    const filteredInternships =
        internships.filter(
            function (item) {

                const searchableText = (

                    item.title +
                    " " +
                    item.company +
                    " " +
                    item.location +
                    " " +
                    item.duration

                ).toLowerCase();


                return searchableText.includes(
                    searchText
                );

            }
        );


    if (count) {

        count.textContent =
            internships.length +
            (
                internships.length === 1
                    ? " internship published"
                    : " internships published"
            );

    }


    if (
        filteredInternships.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    📭 No internships found
                </h3>

                <p>
                    Add a new internship using the form above.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        filteredInternships
            .map(
                function (item) {

                    return `

                        <div class="internship-item">

                            <h3>
                                ${escapeHTML(item.title)}
                            </h3>


                            <p class="company">
                                🏢
                                ${escapeHTML(item.company)}
                            </p>


                            <p class="location">
                                📍
                                ${escapeHTML(item.location)}
                            </p>


                            <p>
                                ⏱️
                                ${escapeHTML(item.duration)}
                            </p>


                            ${
                                item.stipend
                                ? `
                                    <p>
                                        💰
                                        ${escapeHTML(item.stipend)}
                                    </p>
                                  `
                                : ""
                            }


                            ${
                                item.description
                                ? `
                                    <p class="description">
                                        ${escapeHTML(
                                            item.description
                                        )}
                                    </p>
                                  `
                                : ""
                            }


                            <div class="item-actions">

                                <button
                                    class="edit-btn"
                                    onclick="editInternship(${item.id})"
                                >
                                    ✏️ Edit
                                </button>


                                <button
                                    class="delete-btn"
                                    onclick="deleteInternship(${item.id})"
                                >
                                    🗑️ Delete
                                </button>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}
/* =========================================
   INTERNSHIP EDIT / DELETE
   PART 5
========================================= */


/* EDIT INTERNSHIP */

function editInternship(id) {

    const item =
        internships.find(function (internship) {

            return internship.id === id;

        });


    if (!item) {
        return;
    }


    setValue(
        "internshipTitle",
        item.title
    );

    setValue(
        "internshipCompany",
        item.company
    );

    setValue(
        "internshipLocation",
        item.location
    );

    setValue(
        "internshipStipend",
        item.stipend
    );

    setValue(
        "internshipDuration",
        item.duration
    );

    setValue(
        "internshipDescription",
        item.description
    );


    editingInternshipId = id;


    const button =
        document.getElementById(
            "internshipSubmitBtn"
        );


    if (button) {

        button.textContent =
            "✏️ Update Internship";

    }


    const section =
        document.getElementById(
            "internshipsSection"
        );


    if (section) {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* DELETE INTERNSHIP */

function deleteInternship(id) {

    const item =
        internships.find(function (internship) {

            return internship.id === id;

        });


    if (!item) {
        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this internship?"
        );


    if (!confirmDelete) {
        return;
    }


    internships =
        internships.filter(function (internship) {

            return internship.id !== id;

        });


    saveInternships();

    renderInternships();

    updateDashboard();


    if (editingInternshipId === id) {

        editingInternshipId = null;

        clearInternshipForm();


        const button =
            document.getElementById(
                "internshipSubmitBtn"
            );


        if (button) {

            button.textContent =
                "🚀 Publish Internship";

        }

    }


    alert(
        "🗑️ Internship deleted successfully!"
    );

}
/* =========================================
   SIDEBAR
========================================= */

function toggleSidebar() {

    const sidebar =
        document.getElementById("adminSidebar");


    if (!sidebar) {
        return;
    }


    sidebar.classList.toggle(
        "sidebar-hidden"
    );

}


/* =========================================
   SECTION SWITCH
========================================= */

function showSection(
    sectionName,
    button
) {

    const sections =
        document.querySelectorAll(
            ".admin-section"
        );


    sections.forEach(
        function (section) {

            section.classList.remove(
                "active-section"
            );

        }
    );


    const target =
        document.getElementById(
            sectionName + "Section"
        );


    if (target) {

        target.classList.add(
            "active-section"
        );

    }


    const buttons =
        document.querySelectorAll(
            ".sidebar-btn"
        );


    buttons.forEach(
        function (item) {

            item.classList.remove(
                "active"
            );

        }
    );


    if (button) {

        button.classList.add(
            "active"
        );

    }

}


/* =========================================
   DASHBOARD COUNTS
========================================= */

function updateDashboard() {

    const jobCount =
        document.getElementById(
            "dashboardJobCount"
        );


    const internshipCount =
        document.getElementById(
            "dashboardInternshipCount"
        );


    if (jobCount) {

        jobCount.textContent =
            jobs.length;

    }


    if (internshipCount) {

        internshipCount.textContent =
            internships.length;

    }

}


/* =========================================
   INITIALIZE ADMIN PANEL
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadData();

        renderJobs();

        renderInternships();

        updateDashboard();

    }
);