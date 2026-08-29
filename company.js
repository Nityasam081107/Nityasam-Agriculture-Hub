/* =========================================
   NITYASAM AGRI HUB
   COMPANY PAGE - FINAL JAVASCRIPT
========================================= */


/* =========================================
   PAGE LOADER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loader =
        document.getElementById("companyLoader");

    const content =
        document.getElementById("companyContent");

    const fill =
        document.getElementById("companyLoaderFill");


    if (fill) {
        fill.style.width = "100%";
    }


    setTimeout(function () {

        if (loader) {
            loader.classList.add("hidden");
        }

        if (content) {
            content.classList.add("loaded");
        }

    }, 700);

});


/* =========================================
   GET ELEMENT
========================================= */

function companyElement(id) {

    return document.getElementById(id);

}


/* =========================================
   SCROLL TO SERVICES
========================================= */

function scrollToCompanyServices() {

    const section =
        companyElement("companyServices");


    if (!section) {
        return;
    }


    section.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* =========================================
   HERO EXPLORE BUTTON
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const exploreButton =
        companyElement("companyExploreBtn");


    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            scrollToCompanyServices
        );

    }

});


/* =========================================
   MOBILE MENU
========================================= */

function toggleCompanyMenu() {

    const menu =
        companyElement("companyMobileMenu");

    const button =
        companyElement("companyMenuBtn");


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
   MOBILE MENU BUTTON
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const button =
        companyElement("companyMenuBtn");


    if (button) {

        button.addEventListener(
            "click",
            toggleCompanyMenu
        );

    }

});


/* =========================================
   SEARCH + FILTER
========================================= */

function filterCompanyServices() {

    const searchInput =
        companyElement("companySearch");

    const categorySelect =
        companyElement("companyCategory");

    const cards =
        document.querySelectorAll(
            ".company-service-card"
        );

    const emptyState =
        companyElement("companyEmptyState");


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


    let visibleCount = 0;


    cards.forEach(function (card) {

        const titleElement =
            card.querySelector("h3");

        const textElement =
            card.querySelector("p");

        const category =
            card.getAttribute(
                "data-category"
            );


        const title =
            titleElement
                ? titleElement.textContent.toLowerCase()
                : "";


        const description =
            textElement
                ? textElement.textContent.toLowerCase()
                : "";


        const matchesSearch =
            !searchText ||

            title.includes(searchText) ||

            description.includes(searchText) ||

            category
                .toLowerCase()
                .includes(searchText);


        const matchesCategory =
            selectedCategory === "All" ||

            category === selectedCategory;


        const shouldShow =
            matchesSearch &&
            matchesCategory;


        if (shouldShow) {

            card.style.display = "";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    if (emptyState) {

        emptyState.style.display =
            visibleCount === 0
                ? "block"
                : "none";

    }

}


/* =========================================
   SEARCH INPUT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const search =
        companyElement("companySearch");


    if (search) {

        search.addEventListener(
            "input",
            filterCompanyServices
        );

    }

});


/* =========================================
   CATEGORY SELECT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const category =
        companyElement("companyCategory");


    if (category) {

        category.addEventListener(
            "change",
            filterCompanyServices
        );

    }

});


/* =========================================
   CLEAR FILTER
========================================= */

function clearCompanyFilters() {

    const search =
        companyElement("companySearch");

    const category =
        companyElement("companyCategory");


    if (search) {
        search.value = "";
    }


    if (category) {
        category.value = "All";
    }


    filterCompanyServices();

}


/* =========================================
   CLEAR BUTTON
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const button =
        companyElement("companyClearBtn");


    if (button) {

        button.addEventListener(
            "click",
            clearCompanyFilters
        );

    }

});


/* =========================================
   SHOW ALL BUTTON
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const button =
        companyElement("companyShowAllBtn");


    if (button) {

        button.addEventListener(
            "click",
            clearCompanyFilters
        );

    }

});


/* =========================================
   MODAL
========================================= */

function openCompanyModal(
    title,
    icon
) {

    const modal =
        companyElement("companyModal");

    const modalTitle =
        companyElement("companyModalTitle");

    const modalIcon =
        companyElement("companyModalIcon");

    const modalText =
        companyElement("companyModalText");


    if (!modal) {
        return;
    }


    if (modalTitle) {

        modalTitle.textContent =
            title;

    }


    if (modalIcon) {

        modalIcon.textContent =
            icon || "🏢";

    }


    if (modalText) {

        modalText.textContent =
            "This section is being prepared for Nityasam AGRI HUB. More information and features will be available soon.";

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
   CLOSE MODAL
========================================= */

function closeCompanyModal() {

    const modal =
        companyElement("companyModal");


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
   COMING SOON BUTTONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const buttons =
        document.querySelectorAll(
            ".company-coming-btn"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const title =
                    button.getAttribute(
                        "data-title"
                    );


                let icon = "🏢";


                if (
                    title ===
                    "Government Opportunities"
                ) {

                    icon = "🏛️";

                }

                else if (
                    title ===
                    "Company Products"
                ) {

                    icon = "📦";

                }

                else if (
                    title ===
                    "Farmer Connection"
                ) {

                    icon = "🌾";

                }

                else if (
                    title ===
                    "Company Network"
                ) {

                    icon = "🤝";

                }


                openCompanyModal(
                    title,
                    icon
                );

            }
        );

    });

});


/* =========================================
   MODAL CLOSE BUTTONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const closeButton =
        companyElement("companyModalClose");

    const doneButton =
        companyElement("companyModalDone");

    const overlay =
        companyElement("companyModalOverlay");


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeCompanyModal
        );

    }


    if (doneButton) {

        doneButton.addEventListener(
            "click",
            closeCompanyModal
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCompanyModal
        );

    }

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCompanyModal();

        }

    }
);


/* =========================================
   CLOSE MOBILE MENU AFTER LINK CLICK
========================================= */

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                "#companyMobileMenu a"
            );


        if (!link) {
            return;
        }


        const menu =
            companyElement(
                "companyMobileMenu"
            );

        const button =
            companyElement(
                "companyMenuBtn"
            );


        if (menu) {

            menu.classList.remove(
                "show"
            );

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
   RESIZE HANDLER
========================================= */

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 800) {

            const menu =
                companyElement(
                    "companyMobileMenu"
                );

            const button =
                companyElement(
                    "companyMenuBtn"
                );


            if (menu) {

                menu.classList.remove(
                    "show"
                );

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


/* =========================================
   INITIAL FILTER
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        filterCompanyServices();

    }
);