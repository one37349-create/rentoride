```javascript
/* =========================================================
   RentoRide ADMIN DASHBOARD
   js/admin.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const navItems = document.querySelectorAll(".admin-nav-item");
  const sections = document.querySelectorAll(".admin-section");

  const pageTitle = document.getElementById("adminPageTitle");

  const menuBtn = document.getElementById("adminMenuBtn");
  const sidebar = document.getElementById("adminSidebar");
  const sidebarOverlay = document.getElementById("adminSidebarOverlay");

  const logoutBtn = document.getElementById("adminLogoutBtn");

  const notificationBtn =
    document.getElementById("adminNotificationBtn");

  const notificationPopup =
    document.getElementById("adminNotificationPopup");

  const closeNotificationPopup =
    document.getElementById("closeAdminNotificationPopup");

  const detailModal =
    document.getElementById("adminDetailModal");

  const closeDetailModal =
    document.getElementById("closeAdminDetailModal");


  /* =======================================================
     SECTION TITLES
  ======================================================= */

  const sectionTitles = {
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


  /* =======================================================
     OPEN SECTION
  ======================================================= */

  function openSection(sectionName) {

    if (!sectionName) return;

    const targetSection =
      document.getElementById(
        `admin-section-${sectionName}`
      );

    if (!targetSection) {
      console.warn(
        "Admin section not found:",
        sectionName
      );
      return;
    }


    /* Hide all sections */

    sections.forEach(section => {
      section.classList.remove("active");
    });


    /* Remove active from all nav */

    navItems.forEach(item => {
      item.classList.remove("active");
    });


    /* Show selected section */

    targetSection.classList.add("active");


    /* Activate matching nav */

    const activeNav =
      document.querySelector(
        `.admin-nav-item[data-section="${sectionName}"]`
      );

    if (activeNav) {
      activeNav.classList.add("active");
    }


    /* Change page title */

    if (pageTitle) {
      pageTitle.textContent =
        sectionTitles[sectionName] ||
        "Command Center";
    }


    /* Close mobile sidebar */

    closeSidebar();


    /* Scroll page to top */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    /* Save current section */

    try {
      localStorage.setItem(
        "rentoride_admin_section",
        sectionName
      );
    } catch (error) {
      console.warn("LocalStorage unavailable");
    }
  }


  /* =======================================================
     LEFT SIDEBAR NAVIGATION
  ======================================================= */

  navItems.forEach(item => {

    item.addEventListener("click", event => {

      event.preventDefault();

      const section =
        item.getAttribute("data-section");

      openSection(section);

    });

  });


  /* =======================================================
     ALL data-section-link BUTTONS
  ======================================================= */

  document.addEventListener("click", event => {

    const button =
      event.target.closest("[data-section-link]");

    if (!button) return;

    event.preventDefault();

    const section =
      button.getAttribute("data-section-link");

    openSection(section);

  });


  /* =======================================================
     MOBILE SIDEBAR
  ======================================================= */

  function openSidebar() {

    if (sidebar) {
      sidebar.classList.add("open");
    }

    if (sidebarOverlay) {
      sidebarOverlay.classList.add("active");
    }

    document.body.classList.add("sidebar-open");
  }


  function closeSidebar() {

    if (sidebar) {
      sidebar.classList.remove("open");
    }

    if (sidebarOverlay) {
      sidebarOverlay.classList.remove("active");
    }

    document.body.classList.remove("sidebar-open");
  }


  if (menuBtn) {
    menuBtn.addEventListener("click", event => {

      event.preventDefault();

      if (
        sidebar &&
        sidebar.classList.contains("open")
      ) {
        closeSidebar();
      } else {
        openSidebar();
      }

    });
  }


  if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
      "click",
      closeSidebar
    );

  }


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeSidebar();

      closeDetailModalFunction();

      closeNotification();

    }

  });


  /* =======================================================
     NOTIFICATION POPUP
  ======================================================= */

  function showNotification(
    title = "System Notification",
    message = "You have a new notification."
  ) {

    if (!notificationPopup) return;

    const titleElement =
      document.getElementById(
        "adminPopupTitle"
      );

    const messageElement =
      document.getElementById(
        "adminPopupMessage"
      );

    if (titleElement) {
      titleElement.textContent = title;
    }

    if (messageElement) {
      messageElement.textContent = message;
    }

    notificationPopup.classList.add("show");

    setTimeout(() => {
      notificationPopup.classList.remove("show");
    }, 5000);

  }


  function closeNotification() {

    if (notificationPopup) {
      notificationPopup.classList.remove("show");
    }

  }


  if (notificationBtn) {

    notificationBtn.addEventListener(
      "click",
      event => {

        event.preventDefault();

        showNotification(
          "Admin Notifications",
          "No new system notifications."
        );

      }
    );

  }


  if (closeNotificationPopup) {

    closeNotificationPopup.addEventListener(
      "click",
      closeNotification
    );

  }


  /* =======================================================
     DETAIL MODAL
  ======================================================= */

  function openDetailModal(
    title = "Details",
    content = ""
  ) {

    if (!detailModal) return;

    const modalTitle =
      document.getElementById(
        "adminDetailModalTitle"
      );

    const modalContent =
      document.getElementById(
        "adminDetailModalContent"
      );

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalContent) {
      modalContent.innerHTML = content;
    }

    detailModal.classList.add("active");

    document.body.classList.add("modal-open");

  }


  function closeDetailModalFunction() {

    if (!detailModal) return;

    detailModal.classList.remove("active");

    document.body.classList.remove("modal-open");

  }


  if (closeDetailModal) {

    closeDetailModal.addEventListener(
      "click",
      closeDetailModalFunction
    );

  }


  if (detailModal) {

    const overlay =
      detailModal.querySelector(
        ".admin-modal-overlay"
      );

    if (overlay) {

      overlay.addEventListener(
        "click",
        closeDetailModalFunction
      );

    }

  }


  /* =======================================================
     VEHICLE FILTERS
  ======================================================= */

  const vehicleFilters =
    document.querySelectorAll(
      ".admin-filter"
    );

  vehicleFilters.forEach(filter => {

    filter.addEventListener("click", () => {

      vehicleFilters.forEach(item => {
        item.classList.remove("active");
      });

      filter.classList.add("active");

      const status =
        filter.getAttribute(
          "data-vehicle-filter"
        );

      filterVehicleCards(status);

    });

  });


  function filterVehicleCards(status) {

    const cards =
      document.querySelectorAll(
        "#adminVehicleList [data-status]"
      );

    cards.forEach(card => {

      if (
        status === "all" ||
        card.getAttribute("data-status") === status
      ) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }

    });

  }


  /* =======================================================
     BOOKING FILTERS
  ======================================================= */

  const bookingFilters =
    document.querySelectorAll(
      ".admin-booking-filter"
    );

  bookingFilters.forEach(filter => {

    filter.addEventListener("click", () => {

      bookingFilters.forEach(item => {
        item.classList.remove("active");
      });

      filter.classList.add("active");

      const status =
        filter.getAttribute(
          "data-booking-filter"
        );

      filterBookingRows(status);

    });

  });


  function filterBookingRows(status) {

    const rows =
      document.querySelectorAll(
        "#adminBookingsTable [data-status]"
      );

    rows.forEach(row => {

      if (
        status === "all" ||
        row.getAttribute("data-status") === status
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }

    });

  }


  /* =======================================================
     SUPPORT FILTERS
  ======================================================= */

  const supportFilters =
    document.querySelectorAll(
      ".support-filter"
    );

  supportFilters.forEach(filter => {

    filter.addEventListener("click", () => {

      supportFilters.forEach(item => {
        item.classList.remove("active");
      });

      filter.classList.add("active");

      const status =
        filter.getAttribute(
          "data-support-filter"
        );

      filterSupportCases(status);

    });

  });


  function filterSupportCases(status) {

    const cases =
      document.querySelectorAll(
        "#supportCaseList [data-status]"
      );

    cases.forEach(item => {

      if (
        status === "all" ||
        item.getAttribute("data-status") === status
      ) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }

    });

  }


  /* =======================================================
     USER SEARCH
  ======================================================= */

  const userSearch =
    document.getElementById(
      "userSearch"
    );

  if (userSearch) {

    userSearch.addEventListener(
      "input",
      () => {

        const query =
          userSearch.value
            .trim()
            .toLowerCase();

        searchTable(
          "usersTable",
          query
        );

      }
    );

  }


  /* =======================================================
     OWNER SEARCH
  ======================================================= */

  const ownerSearch =
    document.getElementById(
      "ownerSearch"
    );

  if (ownerSearch) {

    ownerSearch.addEventListener(
      "input",
      () => {

        const query =
          ownerSearch.value
            .trim()
            .toLowerCase();

        searchTable(
          "ownersTable",
          query
        );

      }
    );

  }


  function searchTable(
    tableId,
    query
  ) {

    const container =
      document.getElementById(tableId);

    if (!container) return;

    const rows =
      container.querySelectorAll(
        "tr, [data-searchable]"
      );

    rows.forEach(row => {

      const text =
        row.textContent
          .toLowerCase();

      row.style.display =
        text.includes(query)
          ? ""
          : "none";

    });

  }


  /* =======================================================
     REVENUE PERIOD
  ======================================================= */

  const revenuePeriod =
    document.getElementById(
      "revenuePeriod"
    );

  if (revenuePeriod) {

    revenuePeriod.addEventListener(
      "change",
      () => {

        const days =
          revenuePeriod.value;

        showNotification(
          "Revenue Period Updated",
          `Showing revenue data for the last ${days} days.`
        );

        renderDemoChart(days);

      }
    );

  }


  /* =======================================================
     DEMO REVENUE CHART
     UI ONLY — SUPABASE LATER
  ======================================================= */

  function renderDemoChart(days) {

    const chart =
      document.getElementById(
        "revenueChart"
      );

    if (!chart) return;

    chart.innerHTML = `
      <div class="chart-placeholder">
        Revenue analytics
        <br>
        <strong>Last ${days} Days</strong>
        <br>
        <small>Live Supabase data will appear here.</small>
      </div>
    `;

  }


  /* =======================================================
     ADMIN NOTIFICATION FORM
  ======================================================= */

  const notificationForm =
    document.getElementById(
      "adminNotificationForm"
    );

  if (notificationForm) {

    notificationForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const audience =
          document.getElementById(
            "notificationAudience"
          )?.value || "all";

        const title =
          document.getElementById(
            "notificationTitle"
          )?.value.trim();

        const message =
          document.getElementById(
            "notificationMessage"
          )?.value.trim();


        if (!title || !message) {

          showNotification(
            "Missing Information",
            "Please enter notification title and message."
          );

          return;

        }


        showNotification(
          "Notification Ready",
          `Notification prepared for ${audience}.`
        );


        notificationForm.reset();

      }
    );

  }


  /* =======================================================
     SAVE PLATFORM SETTINGS
  ======================================================= */

  const saveSettings =
    document.getElementById(
      "saveAdminSettings"
    );

  if (saveSettings) {

    saveSettings.addEventListener(
      "click",
      event => {

        event.preventDefault();


        const commission =
          document.getElementById(
            "platformCommissionRate"
          )?.value;

        const minimumWithdrawal =
          document.getElementById(
            "minimumWithdrawal"
          )?.value;

        const deliveryCharge =
          document.getElementById(
            "defaultDeliveryCharge"
          )?.value;


        const settings = {
          commission,
          minimumWithdrawal,
          deliveryCharge,
          allowBookings:
            document.getElementById(
              "allowBookings"
            )?.checked ?? true,
          maintenanceMode:
            document.getElementById(
              "maintenanceMode"
            )?.checked ?? false
        };


        try {

          localStorage.setItem(
            "rentoride_admin_settings",
            JSON.stringify(settings)
          );

        } catch (error) {
          console.warn(
            "Unable to save settings."
          );
        }


        showNotification(
          "Settings Saved",
          "RentoRide platform settings have been saved."
        );

      }
    );

  }


  /* =======================================================
     LOAD SAVED SETTINGS
  ======================================================= */

  function loadAdminSettings() {

    try {

      const saved =
        localStorage.getItem(
          "rentoride_admin_settings"
        );

      if (!saved) return;

      const settings =
        JSON.parse(saved);


      const commission =
        document.getElementById(
          "platformCommissionRate"
        );

      const minimumWithdrawal =
        document.getElementById(
          "minimumWithdrawal"
        );

      const deliveryCharge =
        document.getElementById(
          "defaultDeliveryCharge"
        );

      const allowBookings =
        document.getElementById(
          "allowBookings"
        );

      const maintenanceMode =
        document.getElementById(
          "maintenanceMode"
        );


      if (commission && settings.commission !== undefined) {
        commission.value =
          settings.commission;
      }

      if (
        minimumWithdrawal &&
        settings.minimumWithdrawal !== undefined
      ) {
        minimumWithdrawal.value =
          settings.minimumWithdrawal;
      }

      if (
        deliveryCharge &&
        settings.deliveryCharge !== undefined
      ) {
        deliveryCharge.value =
          settings.deliveryCharge;
      }

      if (
        allowBookings &&
        settings.allowBookings !== undefined
      ) {
        allowBookings.checked =
          settings.allowBookings;
      }

      if (
        maintenanceMode &&
        settings.maintenanceMode !== undefined
      ) {
        maintenanceMode.checked =
          settings.maintenanceMode;
      }

    } catch (error) {

      console.warn(
        "Unable to load admin settings."
      );

    }

  }


  /* =======================================================
     LOGOUT
  ======================================================= */

  if (logoutBtn) {

    logoutBtn.addEventListener(
      "click",
      async event => {

        event.preventDefault();


        const confirmed =
          confirm(
            "Are you sure you want to logout?"
          );

        if (!confirmed) return;


        /*
         * Supabase logout can be connected here.
         * For now this safely clears the local admin session.
         */

        try {

          localStorage.removeItem(
            "rentoride_admin_section"
          );

          localStorage.removeItem(
            "rentoride_admin_settings"
          );

        } catch (error) {}


        window.location.href =
          "login.html";

      }
    );

  }


  /* =======================================================
     LOAD ADMIN NAME
  ======================================================= */

  function loadAdminProfile() {

    let name = "Administrator";

    try {

      const savedName =
        localStorage.getItem(
          "rentoride_admin_name"
        );

      if (savedName) {
        name = savedName;
      }

    } catch (error) {}


    const elements = [
      document.getElementById("adminName"),
      document.getElementById("adminHeaderName"),
      document.getElementById("welcomeAdminName")
    ];


    elements.forEach(element => {

      if (element) {
        element.textContent = name;
      }

    });


    const firstLetter =
      name.charAt(0).toUpperCase();


    const avatars = [
      document.getElementById("adminAvatar"),
      document.getElementById("adminHeaderAvatar")
    ];


    avatars.forEach(avatar => {

      if (avatar) {
        avatar.textContent =
          firstLetter || "A";
      }

    });

  }


  /* =======================================================
     INITIALIZE
  ======================================================= */

  loadAdminSettings();

  loadAdminProfile();


  let savedSection = "overview";

  try {

    savedSection =
      localStorage.getItem(
        "rentoride_admin_section"
      ) || "overview";

  } catch (error) {}


  openSection(savedSection);


  /* =======================================================
     GLOBAL DEBUG MESSAGE
  ======================================================= */

  console.log(
    "RentoRide Admin Dashboard loaded successfully."
  );

});
```
