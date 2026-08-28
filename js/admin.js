document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".admin-nav-item");
    const sections = document.querySelectorAll(".admin-section");
    const title = document.getElementById("adminPageTitle");

    const titles = {
        overview: "Command Center",
        users: "Users",
        owners: "Owners",
        vehicles: "Vehicles",
        verification: "Verification Center",
        bookings: "Bookings",
        finance: "Finance Center",
        analytics: "Analytics",
        support: "Support & Complaints",
        notifications: "Notifications",
        settings: "Platform Settings"
    };

    function openSection(name) {

        console.log("Opening section:", name);

        // Hide every section
        sections.forEach(function (section) {
            section.classList.remove("active");
        });

        // Remove active from every button
        buttons.forEach(function (button) {
            button.classList.remove("active");
        });

        // Find requested section
        const target = document.getElementById(
            "admin-section-" + name
        );

        if (!target) {
            console.error(
                "Section not found: admin-section-" + name
            );
            return;
        }

        // Show section
        target.classList.add("active");

        // Activate clicked button
        buttons.forEach(function (button) {

            if (button.dataset.section === name) {
                button.classList.add("active");
            }

        });

        // Change heading
        if (title) {
            title.textContent =
                titles[name] || "Admin Dashboard";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // Sidebar buttons
    buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const section =
                button.getAttribute("data-section");

            openSection(section);

        });

    });


    // Buttons like View All / Quick Actions
    document.querySelectorAll(
        "[data-section-link]"
    ).forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const section =
                button.getAttribute("data-section-link");

            openSection(section);

        });

    });


    // Start with Command Center
    openSection("overview");

});
