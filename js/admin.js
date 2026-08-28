/* =========================================================
   RENTORIDE ADMIN DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const navItems = document.querySelectorAll(".admin-nav-item");
  const sections = document.querySelectorAll(".admin-section");

  const pageTitle = document.getElementById("pageTitle");

  const menuBtn = document.getElementById("adminMenuBtn");
  const sidebar = document.getElementById("adminSidebar");
  const sidebarOverlay = document.getElementById("adminSidebarOverlay");

  const logoutBtn = document.getElementById("adminLogoutBtn");

  const notificationBtn =
    document.getElementById("adminNotificationBtn");

  const notificationPopup =
    document.getElementById("adminNotificationPopup");

  const closeNotification =
    document.getElementById("closeAdminNotificationPopup");


  /* =======================================================
     SECTION TITLES
  ======================================================= */

  const sectionTitles = {
    overview: "Dashboard",
    users: "Users",
    vehicles: "Vehicles",
    bookings: "Bookings",
    verification: "Verification",
    earnings: "Finance & Earnings",
    analytics: "Analytics",
    notifications: "Notifications",
    support: "Support",
    settings: "System Settings"
  };


  /* =======================================================
     SHOW SECTION
  ======================================================= */

  function showSection(sectionName) {

    sections.forEach(section => {
      section.classList.remove("active");
    });

    navItems.forEach(item => {
      item.classList.remove("active");
    });

    const targetSection =
      document.getElementById(`section-${sectionName}`);

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
        sectionTitles[sectionName] || "Admin Dashboard";
    }

    /* Close mobile sidebar */

    if (sidebar) {
      sidebar.classList.remove("open");
    }

    if (sidebarOverlay) {
      sidebarOverlay.classList.remove("active");
    }

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
        item.dataset.section;

      if (!sectionName) return;

      showSection(sectionName);

    });

  });


  /* =======================================================
     DATA-SECTION LINKS
  ======================================================= */

  document.querySelectorAll("[data-section-link]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const sectionName =
          button.dataset.sectionLink;

        if (sectionName) {
          showSection(sectionName);
        }

      });

    });


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {

      sidebar.classList.toggle("open");

      if (sidebarOverlay) {
        sidebarOverlay.classList.toggle("active");
      }

    });

  }


  if (sidebarOverlay) {

    sidebarOverlay.addEventListener("click", () => {

      sidebar.classList.remove("open");
      sidebarOverlay.classList.remove("active");

    });

  }


  /* =======================================================
     LOGOUT
  ======================================================= */

  if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

      const confirmLogout =
        confirm("Are you sure you want to logout?");

      if (!confirmLogout) return;

      try {

        /*
          Supabase logout.
          Agar supabaseClient available hai
          toh signOut chalega.
        */

        if (
          typeof supabaseClient !== "undefined" &&
          supabaseClient?.auth
        ) {

          await supabaseClient.auth.signOut();

        }

      } catch (error) {

        console.error(
          "Logout error:",
          error
        );

      }

      window.location.href = "login.html";

    });

  }


  /* =======================================================
     NOTIFICATION BUTTON
  ======================================================= */

  if (notificationBtn) {

    notificationBtn.addEventListener("click", () => {

      showAdminNotification(
        "Admin Notifications",
        "No new system notifications."
      );

    });

  }


  /* =======================================================
     NOTIFICATION POPUP
  ======================================================= */

  function showAdminNotification(title, message) {

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

    }, 4500);

  }


  if (closeNotification) {

    closeNotification.addEventListener("click", () => {

      notificationPopup.classList.remove("show");

    });

  }


  /* =======================================================
     VEHICLE FILTER
  ======================================================= */

  const vehicleFilters =
    document.querySelectorAll(".admin-filter");

  vehicleFilters.forEach(filter => {

    filter.addEventListener("click", () => {

      vehicleFilters.forEach(btn => {
        btn.classList.remove("active");
      });

      filter.classList.add("active");

      const filterValue =
        filter.dataset.filter;

      filterVehicleCards(filterValue);

    });

  });


  function filterVehicleCards(filterValue) {

    const cards =
      document.querySelectorAll(
        ".admin-vehicle-card"
      );

    if (!cards.length) return;

    cards.forEach(card => {

      const cardStatus =
        card.dataset.status;

      if (
        filterValue === "all" ||
        !filterValue ||
        cardStatus === filterValue
      ) {

        card.style.display = "";

      } else {

        card.style.display = "none";

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

      const filterValue =
        filter.dataset.bookingFilter;

      filterBookings(filterValue);

    });

  });


  function filterBookings(filterValue) {

    const bookings =
      document.querySelectorAll(
        ".admin-booking-card"
      );

    if (!bookings.length) return;

    bookings.forEach(booking => {

      const status =
        booking.dataset.status;

      if (
        filterValue === "all" ||
        !filterValue ||
        status === filterValue
      ) {

        booking.style.display = "";

      } else {

        booking.style.display = "none";

      }

    });

  }


  /* =======================================================
     VERIFICATION FILTER
  ======================================================= */

  const verificationFilters =
    document.querySelectorAll(
      ".verification-filter"
    );

  verificationFilters.forEach(filter => {

    filter.addEventListener("click", () => {

      verificationFilters.forEach(btn => {
        btn.classList.remove("active");
      });

      filter.classList.add("active");

      const value =
        filter.dataset.verificationFilter;

      const items =
        document.querySelectorAll(
          ".verification-admin-card"
        );

      items.forEach(item => {

        const status =
          item.dataset.status;

        if (
          value === "all" ||
          !value ||
          status === value
        ) {

          item.style.display = "";

        } else {

          item.style.display = "none";

        }

      });

    });

  });


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

      const value =
        filter.dataset.supportFilter;

      const tickets =
        document.querySelectorAll(
          ".support-ticket"
        );

      tickets.forEach(ticket => {

        const status =
          ticket.dataset.status;

        if (
          value === "all" ||
          !value ||
          status === value
        ) {

          ticket.style.display = "";

        } else {

          ticket.style.display = "none";

        }

      });

    });

  });


  /* =======================================================
     GLOBAL ADMIN SEARCH
  ======================================================= */

  const searchInputs =
    document.querySelectorAll(
      ".admin-search"
    );

  searchInputs.forEach(input => {

    input.addEventListener("input", () => {

      const search =
        input.value.toLowerCase().trim();

      const container =
        input.closest(".admin-panel, .admin-section");

      if (!container) return;

      const searchableItems =
        container.querySelectorAll(
          ".admin-search-item, " +
          ".admin-user-card, " +
          ".admin-vehicle-card, " +
          ".admin-booking-card, " +
          ".support-ticket"
        );

      searchableItems.forEach(item => {

        const text =
          item.textContent.toLowerCase();

        item.style.display =
          text.includes(search)
            ? ""
            : "none";

      });

    });

  });


  /* =======================================================
     MODAL SYSTEM
  ======================================================= */

  function openModal(modalId) {

    const modal =
      document.getElementById(modalId);

    if (!modal) return;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

  }


  function closeModal(modalId) {

    const modal =
      document.getElementById(modalId);

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

  }


  /* OPEN MODAL BUTTONS */

  document.querySelectorAll("[data-open-modal]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const modalId =
          button.dataset.openModal;

        openModal(modalId);

      });

    });


  /* CLOSE MODAL BUTTONS */

  document.querySelectorAll("[data-close-modal]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const modalId =
          button.dataset.closeModal;

        closeModal(modalId);

      });

    });


  /* CLICK OUTSIDE */

  document.querySelectorAll(".admin-modal")
    .forEach(modal => {

      const overlay =
        modal.querySelector(
          ".admin-modal-overlay"
        );

      if (!overlay) return;

      overlay.addEventListener("click", () => {

        modal.classList.remove("active");

        document.body.style.overflow = "";

      });

    });


  /* ESCAPE KEY */

  document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    document.querySelectorAll(
      ".admin-modal.active"
    ).forEach(modal => {

      modal.classList.remove("active");

    });

    document.body.style.overflow = "";

  });


  /* =======================================================
     ADMIN ACTION BUTTONS
  ======================================================= */

  document.addEventListener("click", event => {

    const button =
      event.target.closest(
        "[data-admin-action]"
      );

    if (!button) return;

    const action =
      button.dataset.adminAction;

    switch (action) {

      case "approve":

        handleAdminAction(
          button,
          "Approved successfully."
        );

        break;


      case "reject":

        handleAdminAction(
          button,
          "Rejected successfully."
        );

        break;


      case "suspend":

        handleAdminAction(
          button,
          "Account suspended."
        );

        break;


      case "activate":

        handleAdminAction(
          button,
          "Account activated."
        );

        break;


      case "delete":

        if (
          confirm(
            "Are you sure you want to delete this item?"
          )
        ) {

          handleAdminAction(
            button,
            "Item deleted."
          );

        }

        break;


      default:

        console.log(
          "Admin action:",
          action
        );

    }

  });


  function handleAdminAction(button, message) {

    const card =
      button.closest(
        ".admin-search-item, " +
        ".admin-user-card, " +
        ".admin-vehicle-card, " +
        ".admin-booking-card, " +
        ".verification-admin-card, " +
        ".support-ticket"
      );

    if (card) {

      card.classList.add("admin-action-complete");

    }

    showAdminNotification(
      "RentoRide Admin",
      message
    );

  }


  /* =======================================================
     SETTINGS TOGGLES
  ======================================================= */

  const settingInputs =
    document.querySelectorAll(
      ".admin-setting-toggle input, " +
      ".admin-settings-grid input[type='checkbox']"
    );

  settingInputs.forEach(input => {

    input.addEventListener("change", () => {

      console.log(
        "Setting changed:",
        input.id,
        input.checked
      );

    });

  });


  /* =======================================================
     SAVE SETTINGS
  ======================================================= */

  const saveSettingsBtn =
    document.getElementById(
      "saveAdminSettingsBtn"
    );

  if (saveSettingsBtn) {

    saveSettingsBtn.addEventListener("click", () => {

      showAdminNotification(
        "Settings Saved",
        "Your admin settings have been updated."
      );

    });

  }


  /* =======================================================
     SEND NOTIFICATION
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

        const title =
          document.getElementById(
            "adminNotificationTitle"
          )?.value.trim();

        const message =
          document.getElementById(
            "adminNotificationMessage"
          )?.value.trim();

        if (!title || !message) {

          alert(
            "Please enter notification title and message."
          );

          return;

        }

        showAdminNotification(
          "Notification Sent",
          "Your notification has been prepared successfully."
        );

        notificationForm.reset();

      }
    );

  }


  /* =======================================================
     REFRESH DASHBOARD
  ======================================================= */

  const refreshBtn =
    document.getElementById(
      "refreshAdminDashboard"
    );

  if (refreshBtn) {

    refreshBtn.addEventListener("click", () => {

      refreshBtn.disabled = true;

      const originalText =
        refreshBtn.textContent;

      refreshBtn.textContent =
        "Refreshing...";

      setTimeout(() => {

        refreshBtn.disabled = false;

        refreshBtn.textContent =
          originalText;

        showAdminNotification(
          "Dashboard Updated",
          "Latest dashboard information loaded."
        );

      }, 700);

    });

  }


  /* =======================================================
     DATE / TIME
  ======================================================= */

  function updateAdminTime() {

    const timeElement =
      document.getElementById(
        "adminCurrentTime"
      );

    if (!timeElement) return;

    const now = new Date();

    timeElement.textContent =
      now.toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }
      );

  }

  updateAdminTime();

  setInterval(
    updateAdminTime,
    60000
  );


  /* =======================================================
     ACTIVE NAV ON PAGE LOAD
  ======================================================= */

  const activeNav =
    document.querySelector(
      ".admin-nav-item.active"
    );

  if (activeNav) {

    const sectionName =
      activeNav.dataset.section;

    if (
      pageTitle &&
      sectionName
    ) {

      pageTitle.textContent =
        sectionTitles[sectionName] ||
        "Admin Dashboard";

    }

  }


  /* =======================================================
     PREVENT DOUBLE SUBMIT
  ======================================================= */

  document.querySelectorAll("form")
    .forEach(form => {

      form.addEventListener(
        "submit",
        () => {

          const submitButton =
            form.querySelector(
              "button[type='submit']"
            );

          if (!submitButton) return;

          setTimeout(() => {

            submitButton.disabled = false;

          }, 1500);

        }
      );

    });


  /* =======================================================
     INITIAL LOG
  ======================================================= */

  console.log(
    "RentoRide Admin Dashboard initialized."
  );

});
