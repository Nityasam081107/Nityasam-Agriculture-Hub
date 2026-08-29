/* =========================================
   NITYASAM AGRI HUB
   STUDY MATERIAL - FINAL JAVASCRIPT
========================================= */


/* =========================================
   STUDY MATERIAL DATA
========================================= */

const studyMaterials = [

    {
        id: 1,
        title: "Basics of Agronomy",
        category: "Agronomy",
        icon: "🌾",
        level: "Beginner",
        description:
            "Learn the fundamentals of crop production, crop management and important agricultural practices."
    },

    {
        id: 2,
        title: "Horticulture Fundamentals",
        category: "Horticulture",
        icon: "🍅",
        level: "Beginner",
        description:
            "Explore fruit, vegetable, flower and horticultural crop production basics."
    },

    {
        id: 3,
        title: "Soil Science Basics",
        category: "Soil Science",
        icon: "🌱",
        level: "Beginner",
        description:
            "Understand soil properties, soil fertility, nutrients and basic soil management."
    },

    {
        id: 4,
        title: "Plant Protection Basics",
        category: "Plant Protection",
        icon: "🦠",
        level: "Beginner",
        description:
            "Learn about common plant diseases, pests, symptoms and basic crop protection methods."
    },

    {
        id: 5,
        title: "Agricultural Economics",
        category: "Agricultural Economics",
        icon: "📈",
        level: "Beginner",
        description:
            "Understand agricultural markets, costs, farm management and basic economic concepts."
    },

    {
        id: 6,
        title: "Agricultural Engineering",
        category: "Engineering",
        icon: "🚜",
        level: "Beginner",
        description:
            "Explore agricultural machinery, farm equipment, irrigation and basic farm engineering."
    },

    {
        id: 7,
        title: "Organic Farming",
        category: "Organic Farming",
        icon: "🌿",
        level: "Beginner",
        description:
            "Learn the fundamentals of organic farming, natural inputs and sustainable agriculture."
    },

    {
        id: 8,
        title: "General Agriculture Guide",
        category: "Agronomy",
        icon: "📚",
        level: "Beginner",
        description:
            "A useful introduction to important agriculture concepts, terminology and farming practices."
    }

];


/* =========================================
   GET ELEMENT
========================================= */

function studyElement(id) {

    return document.getElementById(id);

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeStudyHTML(text) {

    return String(text ?? "")

        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   RENDER MATERIALS
========================================= */

function renderStudyMaterials(list) {

    const grid =
        studyElement("studyMaterialGrid");

    const emptyState =
        studyElement("studyEmptyState");

    const resultCount =
        studyElement("studyResultCount");


    if (!grid) {
        return;
    }


    if (resultCount) {

        resultCount.textContent =
            list.length +
            (
                list.length === 1
                    ? " Material"
                    : " Materials"
            );

    }


    if (list.length === 0) {

        grid.innerHTML = "";

        if (emptyState) {
            emptyState.style.display = "block";
        }

        return;

    }


    if (emptyState) {
        emptyState.style.display = "none";
    }


    grid.innerHTML =
        list.map(function (item) {

            return `

                <article class="study-card">

                    <div class="study-card-icon">
                        ${escapeStudyHTML(item.icon)}
                    </div>


                    <div class="study-card-content">

                        <span class="study-card-category">
                            ${escapeStudyHTML(item.category)}
                        </span>


                        <h3>
                            ${escapeStudyHTML(item.title)}
                        </h3>


                        <p>
                            ${escapeStudyHTML(item.description)}
                        </p>


                        <div class="study-card-footer">

                            <span>
                                📖 ${escapeStudyHTML(item.level)}
                            </span>


                            <button
                                type="button"
                                class="study-view-btn"
                                data-study-id="${item.id}"
                            >
                                View Material →
                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


/* =========================================
   FILTER MATERIALS
========================================= */

function filterStudyMaterials() {

    const searchInput =
        studyElement("studySearch");

    const categorySelect =
        studyElement("studyCategory");


    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedCategory =
        categorySelect
            ? categorySelect.value
            : "All";


    const filtered =
        studyMaterials.filter(function (item) {

            const matchesSearch =

                item.title
                    .toLowerCase()
                    .includes(searchText)

                ||

                item.category
                    .toLowerCase()
                    .includes(searchText)

                ||

                item.description
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =

                selectedCategory === "All"

                ||

                item.category ===
                    selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    renderStudyMaterials(filtered);

}


/* =========================================
   CLEAR FILTERS
========================================= */

function clearStudyFilters() {

    const searchInput =
        studyElement("studySearch");

    const categorySelect =
        studyElement("studyCategory");


    if (searchInput) {
        searchInput.value = "";
    }


    if (categorySelect) {
        categorySelect.value = "All";
    }


    renderStudyMaterials(
        studyMaterials
    );

}


/* =========================================
   OPEN STUDY MATERIAL
========================================= */

function openStudyMaterial(id) {

    const material =
        studyMaterials.find(function (item) {

            return item.id === Number(id);

        });


    if (!material) {
        return;
    }


    const modal =
        studyElement("studyModal");

    const title =
        studyElement("studyModalTitle");

    const category =
        studyElement("studyModalCategory");

    const description =
        studyElement("studyModalDescription");

    const icon =
        studyElement("studyModalIcon");


    if (!modal) {
        return;
    }


    if (title) {
        title.textContent =
            material.title;
    }


    if (category) {
        category.textContent =
            material.category.toUpperCase();
    }


    if (description) {
        description.textContent =
            material.description;
    }


    if (icon) {
        icon.textContent =
            material.icon;
    }


    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CLOSE STUDY MATERIAL
========================================= */

function closeStudyMaterial() {

    const modal =
        studyElement("studyModal");


    if (!modal) {
        return;
    }


    modal.classList.remove("show");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================
   SCROLL TO MATERIALS
========================================= */

function scrollToMaterials() {

    const target =
        studyElement("studyMaterials");


    if (!target) {
        return;
    }


    target.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* =========================================
   MOBILE MENU
========================================= */

function toggleStudyMenu() {

    const menu =
        studyElement("studyMobileMenu");

    const button =
        studyElement("studyMenuBtn");


    if (!menu) {
        return;
    }


    const isOpen =
        menu.classList.toggle("show");


    if (button) {

        button.textContent =
            isOpen ? "✕" : "☰";


        button.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }

}


/* =========================================
   MATERIAL CARD CLICK
========================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".study-view-btn"
            );


        if (!button) {
            return;
        }


        const id =
            button.getAttribute(
                "data-study-id"
            );


        openStudyMaterial(id);

    }
);


/* =========================================
   DOM READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* INITIAL MATERIALS */

        renderStudyMaterials(
            studyMaterials
        );


        /* SEARCH */

        const search =
            studyElement("studySearch");


        if (search) {

            search.addEventListener(
                "input",
                filterStudyMaterials
            );

        }


        /* CATEGORY */

        const category =
            studyElement("studyCategory");


        if (category) {

            category.addEventListener(
                "change",
                filterStudyMaterials
            );

        }


        /* CLEAR */

        const clearButton =
            studyElement("studyClear");


        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearStudyFilters
            );

        }


        /* HERO BUTTON */

        const exploreButton =
            studyElement("exploreStudyBtn");


        if (exploreButton) {

            exploreButton.addEventListener(
                "click",
                scrollToMaterials
            );

        }


        /* MOBILE MENU */

        const menuButton =
            studyElement("studyMenuBtn");


        if (menuButton) {

            menuButton.addEventListener(
                "click",
                toggleStudyMenu
            );

        }


        /* MODAL CLOSE */

        const modalClose =
            studyElement("studyModalClose");


        const modalDone =
            studyElement("studyModalDone");


        const modalOverlay =
            studyElement("studyModalOverlay");


        if (modalClose) {

            modalClose.addEventListener(
                "click",
                closeStudyMaterial
            );

        }


        if (modalDone) {

            modalDone.addEventListener(
                "click",
                closeStudyMaterial
            );

        }


        if (modalOverlay) {

            modalOverlay.addEventListener(
                "click",
                closeStudyMaterial
            );

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeStudyMaterial();

        }

    }
);


/* =========================================
   CLOSE MOBILE MENU ON LINK CLICK
========================================= */

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                "#studyMobileMenu a"
            );


        if (!link) {
            return;
        }


        const menu =
            studyElement(
                "studyMobileMenu"
            );

        const button =
            studyElement(
                "studyMenuBtn"
            );


        if (menu) {
            menu.classList.remove("show");
        }


        if (button) {

            button.textContent =
                "☰";

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 800) {

            const menu =
                studyElement(
                    "studyMobileMenu"
                );

            const button =
                studyElement(
                    "studyMenuBtn"
                );


            if (menu) {
                menu.classList.remove("show");
            }


            if (button) {

                button.textContent =
                    "☰";

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);