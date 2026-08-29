/* =========================================
   NITYASAM AGRI HUB
   PROFESSIONAL INTERNSHIP PAGE
========================================= */


let internships = [];


/* ================= LOAD DATA ================= */

function loadInternships() {

    try {

        const saved =
            localStorage.getItem("nityasam_internships");

        if (saved) {

            const parsed =
                JSON.parse(saved);

            if (Array.isArray(parsed)) {

                internships = parsed;

            }

        }

    } catch (error) {

        console.error(
            "Unable to load internships:",
            error
        );

        internships = [];

    }

}


/* ================= ESCAPE HTML ================= */

function escapeHTML(text) {

    return String(text ?? "")

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* ================= MENU ================= */

function toggleMenu() {

    const menu =
        document.getElementById("mobileMenu");

    if (menu) {

        menu.classList.toggle("show");

    }

}


/* ================= RENDER ================= */

function renderInternships() {

    const grid =
        document.getElementById(
            "internshipGrid"
        );

    const empty =
        document.getElementById(
            "emptyState"
        );

    const resultCount =
        document.getElementById(
            "resultCount"
        );

    const heroCount =
        document.getElementById(
            "heroInternshipCount"
        );

    const search =
        document.getElementById(
            "searchInput"
        );

    const duration =
        document.getElementById(
            "durationFilter"
        );


    if (!grid) {

        return;

    }


    const searchText =
        search
            ? search.value
                .trim()
                .toLowerCase()
            : "";


    const durationText =
        duration
            ? duration.value
            : "";


    const filtered =
        internships.filter(
            function (item) {

                const searchable = (

                    (item.title || "") +
                    " " +
                    (item.company || "") +
                    " " +
                    (item.location || "") +
                    " " +
                    (item.description || "")

                ).toLowerCase();


                const matchesSearch =
                    searchable.includes(
                        searchText
                    );


                const matchesDuration =
                    !durationText ||
                    item.duration === durationText;


                return (
                    matchesSearch &&
                    matchesDuration
                );

            }
        );


    if (heroCount) {

        heroCount.textContent =
            internships.length;

    }


    if (resultCount) {

        resultCount.textContent =
            filtered.length +
            (
                filtered.length === 1
                    ? " internship"
                    : " internships"
            );

    }


    if (filtered.length === 0) {

        grid.innerHTML = "";

        if (empty) {

            empty.style.display = "block";

        }

        return;

    }


    if (empty) {

        empty.style.display = "none";

    }


    grid.innerHTML =
        filtered.map(
            function (item) {

                const safeId =
                    Number(item.id);


                return `

                    <article class="internship-card">

                        <div class="card-top">

                            <div class="card-icon">
                                🎓
                            </div>

                            <div>

                                <h3 class="card-title">
                                    ${escapeHTML(item.title)}
                                </h3>

                                <div class="card-company">
                                    🏢
                                    ${escapeHTML(item.company)}
                                </div>

                            </div>

                        </div>


                        <div class="card-location">

                            📍
                            ${escapeHTML(item.location)}

                        </div>


                        <div class="card-info">

                            <span class="info-pill">

                                ⏱️
                                ${escapeHTML(item.duration)}

                            </span>


                            ${
                                item.stipend
                                ? `
                                    <span class="info-pill">

                                        💰
                                        ${escapeHTML(item.stipend)}

                                    </span>
                                  `
                                : ""
                            }

                        </div>


                        ${
                            item.description
                            ? `
                                <p class="card-description">

                                    ${escapeHTML(
                                        item.description
                                    )}

                                </p>
                              `
                            : ""
                        }


                        <div class="card-actions">

                            <button
                                class="view-btn"
                                onclick="viewInternship(${safeId})">

                                📄 View Details

                            </button>


                            <button
                                class="apply-btn"
                                onclick="applyForInternship(${safeId})">

                                🚀 Apply Now

                            </button>

                        </div>

                    </article>

                `;

            }
        ).join("");

}


/* ================= VIEW DETAILS ================= */

function viewInternship(id) {

    const item =
        internships.find(
            function (internship) {

                return Number(internship.id) ===
                    Number(id);

            }
        );


    if (!item) {

        return;

    }


    document.getElementById(
        "modalTitle"
    ).textContent =
        item.title || "Internship";


    document.getElementById(
        "modalCompany"
    ).textContent =
        "🏢 " + (item.company || "Organization");


    document.getElementById(
        "modalLocation"
    ).textContent =
        item.location || "Not specified";


    document.getElementById(
        "modalStipend"
    ).textContent =
        item.stipend || "Not specified";


    document.getElementById(
        "modalDuration"
    ).textContent =
        item.duration || "";


    document.getElementById(
        "modalDuration2"
    ).textContent =
        item.duration || "Not specified";


    document.getElementById(
        "modalDescription"
    ).textContent =
        item.description ||
        "No additional description provided.";


    const applyButton =
        document.getElementById(
            "modalApplyButton"
        );


    if (applyButton) {

        applyButton.onclick =
            function () {

                applyForInternship(item.id);

            };

    }


    const modal =
        document.getElementById(
            "internshipModal"
        );


    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }

}


/* ================= CLOSE MODAL ================= */

function closeInternshipModal() {

    const modal =
        document.getElementById(
            "internshipModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }


    document.body.style.overflow =
        "";

}


/* ================= APPLY ================= */

function applyForInternship(id) {

    const item =
        internships.find(
            function (internship) {

                return Number(internship.id) ===
                    Number(id);

            }
        );


    if (!item) {

        return;

    }


    /*
       TEMPORARY APPLICATION SYSTEM

       Later we can connect this button
       with a proper application form /
       Google Form / backend.
    */


    const message =

        "Internship Application\n\n" +

        "Position: " +
        (item.title || "") +

        "\nOrganization: " +
        (item.company || "") +

        "\n\nApplication system will be connected soon.";


    alert(message);

}


/* ================= CLEAR FILTER ================= */

function clearFilters() {

    const search =
        document.getElementById(
            "searchInput"
        );

    const duration =
        document.getElementById(
            "durationFilter"
        );


    if (search) {

        search.value = "";

    }


    if (duration) {

        duration.value = "";

    }


    renderInternships();

}


/* ================= ESC KEY ================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeInternshipModal();

        }

    }
);


/* ================= INITIALIZE ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadInternships();

        renderInternships();

    }
) 