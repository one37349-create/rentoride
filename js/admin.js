/* =========================================================
   RentoRide Admin Dashboard
   File: js/admin.js
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
     NAVIGATION
  ======================================================= */

  function openSection(sectionName) {

    sections.forEach(section => {
      section.classList.remove("active");
    });

    navItems.forEach(item => {
      item.classList.remove("active");
    });

    const targetSection =
      document.getElementById(`admin-section-${sectionName}`);

    const targetNav =
      document.querySelector(
        `.admin-nav-item[data-section="${sectionName}"]`
      );

    if (targetSection) {
      targetSection.classList.add("active");
    }

    if (targetNav) {
      targetNav.classList.add("active");
    }

    if (pageTitle) {
      pageTitle.textContent =
        sectionTitles[sectionName] || "Command Center";
    }

    /* Close mobile menu */

    if (sidebar) {
      sidebar.classList.remove("open");
    }

    if (overlay) {
      overlay.classList.remove("active");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  navItems.forEach(item => {

    item.addEventListener("click", () => {

      const section =
        item.getAttribute("data-section");

      if (section) {
        openSection(section);
      }

    });

  });


  /* =======================================================
     INTERNAL SECTION LINKS
  ======================================================= */

  document
    .querySelectorAll("[data-section-link]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const section =
          button.getAttribute("data-section-link");

        if (section) {
          openSection(section);
        }

      });

    });


  /* =======================================================
     MOBILE SIDEBAR
  ======================================================= */

  if (menuBtn) {

    menuBtn.addEventListener("click", () => {

      sidebar?.classList.add("open");
      overlay?.classList.add("active");

    });

  }


  if (overlay) {

    overlay.addEventListener("click", () => {

      sidebar?.classList.remove("open");
      overlay.classList.remove("active");

    });

  }


  /* =======================================================
     NOTIFICATION POPUP
  ======================================================= */

  function showNotification(title, message) {

    if (!notificationPopup) return;

    const titleElement =
      document.getElementById("adminPopupTitle");

    const messageElement =
      document.getElementById("adminPopupMessage");

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


  if (notificationBtn) {

    notificationBtn.addEventListener("click", () => {

      openSection("notifications");

    });

  }


  if (closeNotificationPopup) {

    closeNotificationPopup.addEventListener(
      "click",
      () => {
        notificationPopup?.classList.remove("show");
      }
    );

  }


  /* =======================================================
     ADMIN NAME
  ======================================================= */

  const savedAdminName =
    localStorage.getItem("rentoride_admin_name");

  if (savedAdminName) {

    const nameElements = [
      document.getElementById("adminName"),
      document.getElementById("adminHeaderName"),
      document.getElementById("welcomeAdminName")
    ];

    nameElements.forEach(element => {

      if (element) {
        element.textContent = savedAdminName;
      }

    });

    const firstLetter =
      savedAdminName.charAt(0).toUpperCase();

    const avatarElements = [
      document.getElementById("adminAvatar"),
      document.getElementById("adminHeaderAvatar")
    ];

    avatarElements.forEach(element => {

      if (element) {
        element.textContent = firstLetter;
      }

    });

  }


  /* =======================================================
     LOGOUT
  ======================================================= */

  if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

      const confirmLogout =
        confirm("Are you sure you want to logout?");

      if (!confirmLogout) return;

      localStorage.removeItem("rentoride_admin_name");
      localStorage.removeItem("rentoride_admin_logged_in");

      window.location.href = "login.html";

    });

  }


  /* =======================================================
     VEHICLE FILTER
  ======================================================= */

  const vehicleFilters =
    document.querySelectorAll(
      ".admin-filter[data-vehicle-filter]"
    );

  vehicleFilters.forEach(filter => {

    filter.addEventListener("click", () => {

      vehicleFilters.forEach(btn => {
        btn.classList.remove("active");
      });

      filter.classList.add("active");

      const status =
        filter.getAttribute("data-vehicle-filter");

      filterVehicles(status);

    });

  });


  function filterVehicles(status) {

    const vehicles =
      document.querySelectorAll(
        ".admin-vehicle-card"
      );

    if (!vehicles.length) return;

    vehicles.forEach(vehicle => {

      const vehicleStatus =
        vehicle.dataset.status;

      if (status === "all") {

        vehicle.style.display = "";

      } else if (vehicleStatus === status) {

        vehicle.style.display = "";

      } else {

        vehicle.style.display = "none";

      }

    });

  }


  /* =======================================================
     BOOKING FILTER
  ======================================================= */

  const bookingFilters =
    document.querySelectorAll(
      ".admin-booking-filter"
    );

  bookingFilters.forEach(filter => {

    filter.addEventListener("click", () => {

      bookingFilters.forEach(btn => {
        btn.classList.remove("active");
      });

      filter.classList.add("active");

      const status =
        filter.getAttribute("data-booking-filter");

      filterBookings(status);

    });

  });


  function filterBookings(status) {

    const bookings =
      document.querySelectorAll(
        ".admin-booking-row"
      );

    if (!bookings.length) return;

    bookings.forEach(booking => {

      const bookingStatus =
        booking.dataset.status;

      if (status === "all") {

        booking.style.display = "";

      } else if (bookingStatus === status) {

        booking.style.display = "";

      } else {

        booking.style.display = "none";

      }

    });

  }


  /* =======================================================
     SUPPORT FILTER
  ======================================================= */

  const supportFilters =
    document.querySelectorAll(
      ".support-filter"
    );

  supportFilters.forEach(filter => {

    filter.addEventListener("click", () => {

      supportFilters.forEach(btn => {
        btn.classList.remove("active");
      });

      filter.classList.add("active");

      const status =
        filter.getAttribute("data-support-filter");

      filterSupportCases(status);

    });

  });


  function filterSupportCases(status) {

    const cases =
      document.querySelectorAll(
        ".support-case"
      );

    if (!cases.length) return;

    cases.forEach(item => {

      const caseStatus =
        item.dataset.status;

      if (status === "all") {

        item.style.display = "";

      } else if (caseStatus === status) {

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
    document.getElementById("userSearch");

  if (userSearch) {

    userSearch.addEventListener("input", () => {

      const search =
        userSearch.value
          .toLowerCase()
          .trim();

      document
        .querySelectorAll(
          "#usersTable tbody tr"
        )
        .forEach(row => {

          const text =
            row.textContent.toLowerCase();

          row.style.display =
            text.includes(search)
              ? ""
              : "none";

        });

    });

  }


  /* =======================================================
     OWNER SEARCH
  ======================================================= */

  const ownerSearch =
    document.getElementById("ownerSearch");

  if (ownerSearch) {

    ownerSearch.addEventListener("input", () => {

      const search =
        ownerSearch.value
          .toLowerCase()
          .trim();

      document
        .querySelectorAll(
          "#ownersTable tbody tr"
        )
        .forEach(row => {

          const text =
            row.textContent.toLowerCase();

          row.style.display =
            text.includes(search)
              ? ""
              : "none";

        });

    });

  }


  /* =======================================================
     DETAIL MODAL
  ======================================================= */

  const detailModal =
    document.getElementById("adminDetailModal");

  const detailModalTitle =
    document.getElementById(
      "adminDetailModalTitle"
    );

  const detailModalContent =
    document.getElementById(
      "adminDetailModalContent"
    );

  const closeDetailModal =
    document.getElementById(
      "closeAdminDetailModal"
    );


  function openDetailModal(title, content) {

    if (!detailModal) return;

    if (detailModalTitle) {
      detailModalTitle.textContent = title;
    }

    if (detailModalContent) {
      detailModalContent.innerHTML = content;
    }

    detailModal.classList.add("show");

  }


  function closeModal() {

    detailModal?.classList.remove("show");

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

    modalOverlay?.addEventListener(
      "click",
      closeModal
    );

  }


  /* =======================================================
     QUICK DETAIL BUTTONS
  ======================================================= */

  document.addEventListener("click", event => {

    const button =
      event.target.closest(
        "[data-admin-detail]"
      );

    if (!button) return;

    const type =
      button.dataset.adminDetail;

    const title =
      button.dataset.title || "Details";

    const content =
      button.dataset.content ||
      "<p>No additional information available.</p>";

    openDetailModal(
      title,
      content
    );

  });


  /* =======================================================
     NOTIFICATION BROADCAST
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


        const notification = {

          audience,
          title,
          message,

          time:
            new Date().toLocaleString()

        };


        const oldNotifications =
          JSON.parse(
            localStorage.getItem(
              "rentoride_admin_notifications"
            ) || "[]"
          );


        oldNotifications.unshift(
          notification
        );


        localStorage.setItem(
          "rentoride_admin_notifications",
          JSON.stringify(
            oldNotifications.slice(0, 20)
          )
        );


        notificationForm.reset();

        showNotification(
          "Notification Sent",
          `Notification sent successfully to ${audience}.`
        );

        renderNotificationHistory();

      }
    );

  }


  /* =======================================================
     NOTIFICATION HISTORY
  ======================================================= */

  function renderNotificationHistory() {

    const container =
      document.getElementById(
        "adminNotificationHistory"
      );

    if (!container) return;

    const notifications =
      JSON.parse(
        localStorage.getItem(
          "rentoride_admin_notifications"
        ) || "[]"
      );


    if (!notifications.length) {

      container.innerHTML = `
        <div class="admin-empty">
          No notifications sent yet.
        </div>
      `;

      return;

    }


    container.innerHTML =
      notifications.map(notification => `

        <div class="admin-notification-item">

          <div>
            <strong>
              ${escapeHTML(notification.title)}
            </strong>

            <p>
              ${escapeHTML(notification.message)}
            </p>

            <small>
              To: ${escapeHTML(notification.audience)}
              • ${escapeHTML(notification.time)}
            </small>
          </div>

        </div>

      `).join("");

  }


  /* =======================================================
     PLATFORM SETTINGS
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


        const settings = {

          commission,
          minimumWithdrawal,
          deliveryCharge,
          allowBookings,
          maintenanceMode

        };


        localStorage.setItem(
          "rentoride_admin_settings",
          JSON.stringify(settings)
        );


        showNotification(
          "Settings Saved",
          "RentoRide platform settings have been updated."
        );

      }
    );

  }


  /* =======================================================
     LOAD SETTINGS
  ======================================================= */

  function loadSettings() {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "rentoride_admin_settings"
        ) || "null"
      );

    if (!saved) return;


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


    if (commission && saved.commission !== undefined) {
      commission.value =
        saved.commission;
    }

    if (
      minimumWithdrawal &&
      saved.minimumWithdrawal !== undefined
    ) {
      minimumWithdrawal.value =
        saved.minimumWithdrawal;
    }

    if (
      deliveryCharge &&
      saved.deliveryCharge !== undefined
    ) {
      deliveryCharge.value =
        saved.deliveryCharge;
    }

    if (
      allowBookings &&
      saved.allowBookings !== undefined
    ) {
      allowBookings.checked =
        saved.allowBookings;
    }

    if (
      maintenanceMode &&
      saved.maintenanceMode !== undefined
    ) {
      maintenanceMode.checked =
        saved.maintenanceMode;
    }

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

        console.log(
          "Revenue period:",
          revenuePeriod.value
        );

        /*
          Later Supabase se actual revenue
          chart yaha load karenge.
        */

      }
    );

  }


  /* =======================================================
     ADMIN ACTIVITY LOG
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
            <div class="admin-log-content">

              <p>
                <strong>System:</strong>
                Admin dashboard opened.
              </p>

              <p>
                <strong>Status:</strong>
                System operational.
              </p>

              <p>
                <strong>Time:</strong>
                ${new Date().toLocaleString()}
              </p>

            </div>
          `
        );

      }
    );

  }


  /* =======================================================
     SECURITY SETTINGS
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
            <div>

              <p>
                Admin security controls will be connected
                with Supabase authentication.
              </p>

              <br>

              <p>
                <strong>Recommended:</strong>
                Enable secure authentication,
                session protection and admin role verification.
              </p>

            </div>
          `
        );

      }
    );

  }


  /* =======================================================
     DASHBOARD DEMO COUNTERS
  ======================================================= */

  function loadDemoStats() {

    const stats = {

      users: 0,
      owners: 0,
      vehicles: 0,
      bookings: 0,
      activeRentals: 0,
      revenue: 0,
      pendingVehicles: 0,
      pendingVerification: 0,
      pendingWithdrawals: 0,
      supportCases: 0

    };


    setText(
      "adminTotalUsers",
      stats.users
    );

    setText(
      "adminTotalOwners",
      stats.owners
    );

    setText(
      "adminTotalVehicles",
      stats.vehicles
    );

    setText(
      "adminTotalBookings",
      stats.bookings
    );

    setText(
      "adminActiveRentals",
      stats.activeRentals
    );

    setText(
      "adminPlatformRevenue",
      `₹${stats.revenue}`
    );

    setText(
      "pendingVehicleApprovals",
      stats.pendingVehicles
    );

    setText(
      "pendingVerifications",
      stats.pendingVerification
    );

    setText(
      "pendingWithdrawals",
      `₹${stats.pendingWithdrawals}`
    );

    setText(
      "openSupportCases",
      stats.supportCases
    );

  }


  /* =======================================================
     HELPERS
  ======================================================= */

  function setText(id, value) {

    const element =
      document.getElementById(id);

    if (element) {
      element.textContent = value;
    }

  }


  function escapeHTML(value) {

    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  /* =======================================================
     INITIALIZE
  ======================================================= */

  loadDemoStats();

  loadSettings();

  renderNotificationHistory();


  /* =======================================================
     SYSTEM ONLINE
  ======================================================= */

  console.log(
    "RentoRide Admin Command Center initialized."
  );

});
