/* =========================================================
   RentoRide Admin Dashboard
   FRONTEND NAVIGATION + BUTTON CONTROLS
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
  const overlay = document.getElementById("adminSidebarOverlay");

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
     SHOW SECTION
  ======================================================= */

  function showSection(sectionName) {

    if (!sectionName) return;

    const targetSection =
      document.getElementById(
        "admin-section-" + sectionName
      );

    if (!targetSection) {
      console.warn(
        "Section not found:",
        sectionName
      );
      return;
    }

    /* Hide all sections */

    sections.forEach(section => {
      section.classList.remove("active");
    });

    /* Show selected section */

    targetSection.classList.add("active");


    /* Update navigation */

    navItems.forEach(item => {

      if (item.dataset.section === sectionName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }

    });


    /* Update title */

    if (pageTitle) {
      pageTitle.textContent =
        sectionTitles[sectionName] ||
        "Admin Dashboard";
    }


    /* Close mobile sidebar */

    if (sidebar) {
      sidebar.classList.remove("open");
    }

    if (overlay) {
      overlay.classList.remove("active");
    }


    /* Scroll top */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =======================================================
     SIDEBAR NAVIGATION
  ======================================================= */

  navItems.forEach(item => {

    item.addEventListener("click", () => {

      const sectionName =
        item.getAttribute("data-section");

      showSection(sectionName);

    });

  });


  /* =======================================================
     VIEW ALL / QUICK ACTION BUTTONS
  ======================================================= */

  document
    .querySelectorAll("[data-section-link]")
    .forEach(button => {

      button.addEventListener("click", event => {

        event.preventDefault();

        const sectionName =
          button.getAttribute("data-section-link");

        showSection(sectionName);

      });

    });


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {

      sidebar.classList.toggle("open");

      if (overlay) {
        overlay.classList.toggle("active");
      }

    });

  }


  /* =======================================================
     MOBILE OVERLAY
  ======================================================= */

  if (overlay) {

    overlay.addEventListener("click", () => {

      sidebar.classList.remove("open");
      overlay.classList.remove("active");

    });

  }


  /* =======================================================
     NOTIFICATION POPUP
  ======================================================= */

  function showNotification(title, message) {

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
      titleElement.textContent =
        title || "System Notification";
    }

    if (messageElement) {
      messageElement.textContent =
        message || "You have a new notification.";
    }

    notificationPopup.classList.add("show");

    setTimeout(() => {

      notificationPopup.classList.remove("show");

    }, 5000);

  }


  /* =======================================================
     NOTIFICATION BUTTON
  ======================================================= */

  if (notificationBtn) {

    notificationBtn.addEventListener("click", () => {

      showNotification(
        "Notifications",
        "Your RentoRide notification center is ready."
      );

    });

  }


  /* =======================================================
     CLOSE NOTIFICATION
  ======================================================= */

  if (closeNotificationPopup) {

    closeNotificationPopup.addEventListener(
      "click",
      () => {

        notificationPopup.classList.remove("show");

      }
    );

  }


  /* =======================================================
     DETAIL MODAL
  ======================================================= */

  function openDetailModal(title, content) {

    if (!detailModal) return;

    const titleElement =
      document.getElementById(
        "adminDetailModalTitle"
      );

    const contentElement =
      document.getElementById(
        "adminDetailModalContent"
      );

    if (titleElement) {
      titleElement.textContent = title;
    }

    if (contentElement) {
      contentElement.innerHTML = content;
    }

    detailModal.classList.add("show");

  }


  /* =======================================================
     CLOSE DETAIL MODAL
  ======================================================= */

  function closeModal() {

    if (!detailModal) return;

    detailModal.classList.remove("show");

  }


  if (closeDetailModal) {

    closeDetailModal.addEventListener(
      "click",
      closeModal
    );

  }


  if (detailModal) {

    const modalOverlay =
      detailModal.querySelector(
        ".admin-modal-overlay"
      );

    if (modalOverlay) {

      modalOverlay.addEventListener(
        "click",
        closeModal
      );

    }

  }


  /* =======================================================
     VEHICLE FILTERS
  ======================================================= */

  const vehicleFilters =
    document.querySelectorAll(
      "[data-vehicle-filter]"
    );

  vehicleFilters.forEach(button => {

    button.addEventListener("click", () => {

      vehicleFilters.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter =
        button.getAttribute(
          "data-vehicle-filter"
        );

      console.log(
        "Vehicle filter:",
        filter
      );

    });

  });


  /* =======================================================
     BOOKING FILTERS
  ======================================================= */

  const bookingFilters =
    document.querySelectorAll(
      ".admin-booking-filter"
    );

  bookingFilters.forEach(button => {

    button.addEventListener("click", () => {

      bookingFilters.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter =
        button.getAttribute(
          "data-booking-filter"
        );

      console.log(
        "Booking filter:",
        filter
      );

    });

  });


  /* =======================================================
     SUPPORT FILTERS
  ======================================================= */

  const supportFilters =
    document.querySelectorAll(
      ".support-filter"
    );

  supportFilters.forEach(button => {

    button.addEventListener("click", () => {

      supportFilters.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter =
        button.getAttribute(
          "data-support-filter"
        );

      console.log(
        "Support filter:",
        filter
      );

    });

  });


  /* =======================================================
     USER SEARCH
  ======================================================= */

  const userSearch =
    document.getElementById("userSearch");

  if (userSearch) {

    userSearch.addEventListener(
      "input",
      () => {

        console.log(
          "Searching users:",
          userSearch.value
        );

      }
    );

  }


  /* =======================================================
     OWNER SEARCH
  ======================================================= */

  const ownerSearch =
    document.getElementById("ownerSearch");

  if (ownerSearch) {

    ownerSearch.addEventListener(
      "input",
      () => {

        console.log(
          "Searching owners:",
          ownerSearch.value
        );

      }
    );

  }


  /* =======================================================
     REVENUE PERIOD
  ======================================================= */

  const revenuePeriod =
    document.getElementById("revenuePeriod");

  if (revenuePeriod) {

    revenuePeriod.addEventListener(
      "change",
      () => {

        console.log(
          "Revenue period:",
          revenuePeriod.value
        );

        showNotification(
          "Revenue Analytics",
          "Showing revenue data for the selected period."
        );

      }
    );

  }


  /* =======================================================
     SEND ADMIN NOTIFICATION
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
          )?.value;

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


        console.log({
          audience,
          title,
          message
        });


        showNotification(
          "Notification Sent",
          "Your notification has been prepared successfully."
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
      () => {

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

        const allowBookings =
          document.getElementById(
            "allowBookings"
          )?.checked;

        const maintenanceMode =
          document.getElementById(
            "maintenanceMode"
          )?.checked;


        console.log({
          commission,
          minimumWithdrawal,
          deliveryCharge,
          allowBookings,
          maintenanceMode
        });


        showNotification(
          "Settings Saved",
          "Platform settings have been saved."
        );

      }
    );

  }


  /* =======================================================
     SECURITY BUTTONS
  ======================================================= */

  const securityBtn =
    document.getElementById(
      "adminSecurityBtn"
    );

  if (securityBtn) {

    securityBtn.addEventListener(
      "click",
      () => {

        openDetailModal(
          "Admin Security",
          `
            <div class="admin-modal-message">
              <h3>Security Center</h3>
              <p>
                Admin security controls will be connected
                to Supabase authentication later.
              </p>
            </div>
          `
        );

      }
    );

  }


  /* =======================================================
     ACTIVITY LOG
  ======================================================= */

  const activityLogBtn =
    document.getElementById(
      "adminActivityLogBtn"
    );

  if (activityLogBtn) {

    activityLogBtn.addEventListener(
      "click",
      () => {

        openDetailModal(
          "Admin Activity Log",
          `
            <div class="admin-modal-message">
              <h3>Activity Log</h3>
              <p>
                Admin actions will appear here after
                Supabase logging is connected.
              </p>
            </div>
          `
        );

      }
    );

  }


  /* =======================================================
     LOGOUT
  ======================================================= */

  if (logoutBtn) {

    logoutBtn.addEventListener(
      "click",
      () => {

        const confirmLogout =
          confirm(
            "Are you sure you want to logout?"
          );

        if (!confirmLogout) return;

        /*
          Supabase logout will be connected later.
        */

        window.location.href =
          "login.html";

      }
    );

  }


  /* =======================================================
     INITIALIZE
  ======================================================= */

  showSection("overview");


  console.log(
    "RentoRide Admin Dashboard initialized successfully."
  );

});
