document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENTS
  ===================================================== */

  const sidebar = document.getElementById("adminSidebar");
  const overlay = document.getElementById("adminSidebarOverlay");
  const menuBtn = document.getElementById("adminMenuBtn");

  const pageTitle = document.getElementById("adminPageTitle");

  const notificationPopup =
    document.getElementById("adminNotificationPopup");

  const notificationBtn =
    document.getElementById("adminNotificationBtn");

  const closeNotificationPopup =
    document.getElementById("closeAdminNotificationPopup");

  const logoutBtn =
    document.getElementById("adminLogoutBtn");

  const detailModal =
    document.getElementById("adminDetailModal");

  const detailModalTitle =
    document.getElementById("adminDetailModalTitle");

  const detailModalContent =
    document.getElementById("adminDetailModalContent");

  const closeDetailModal =
    document.getElementById("closeAdminDetailModal");


  /* =====================================================
     SECTION TITLES
  ===================================================== */

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


  /* =====================================================
     OPEN SECTION
  ===================================================== */

  function openSection(sectionName) {

    const sections =
      document.querySelectorAll(".admin-section");

    const navItems =
      document.querySelectorAll(".admin-nav-item");

    sections.forEach(section => {
      section.classList.remove("active");
    });

    navItems.forEach(item => {
      item.classList.remove("active");
    });


    const targetSection =
      document.getElementById(
        `admin-section-${sectionName}`
      );

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
        sectionTitles[sectionName] ||
        "Command Center";
    }


    /* Mobile close */

    sidebar?.classList.remove("open");
    overlay?.classList.remove("active");


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =====================================================
     SIDEBAR NAVIGATION
  ===================================================== */

  document
    .querySelectorAll(".admin-nav-item")
    .forEach(item => {

      item.addEventListener("click", () => {

        const section =
          item.dataset.section;

        if (section) {
          openSection(section);
        }

      });

    });


  /* =====================================================
     INTERNAL SECTION BUTTONS
  ===================================================== */

  document
    .querySelectorAll("[data-section-link]")
    .forEach(button => {

      button.addEventListener("click", event => {

        event.preventDefault();

        const section =
          button.dataset.sectionLink;

        if (section) {
          openSection(section);
        }

      });

    });


  /* =====================================================
     MOBILE MENU
  ===================================================== */

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


  /* =====================================================
     NOTIFICATION POPUP
  ===================================================== */

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


    clearTimeout(window.adminNotificationTimer);

    window.adminNotificationTimer =
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


  /* =====================================================
     DETAIL MODAL
  ===================================================== */

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


  /* ESC CLOSE */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeModal();
    }

  });


  /* =====================================================
     ADMIN DETAIL BUTTONS
  ===================================================== */

  document.addEventListener("click", event => {

    const button =
      event.target.closest(
        "[data-admin-detail]"
      );

    if (!button) return;


    const title =
      button.dataset.title ||
      "Details";


    const content =
      button.dataset.content ||
      "<p>No additional information available.</p>";


    openDetailModal(
      title,
      content
    );

  });


  /* =====================================================
     USER SEARCH
  ===================================================== */

  const userSearch =
    document.getElementById("userSearch");

  if (userSearch) {

    userSearch.addEventListener(
      "input",
      () => {

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
              row.textContent
                .toLowerCase();


            row.style.display =
              text.includes(search)
                ? ""
                : "none";

          });

      }
    );

  }


  /* =====================================================
     OWNER SEARCH
  ===================================================== */

  const ownerSearch =
    document.getElementById("ownerSearch");

  if (ownerSearch) {

    ownerSearch.addEventListener(
      "input",
      () => {

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
              row.textContent
                .toLowerCase();


            row.style.display =
              text.includes(search)
                ? ""
                : "none";

          });

      }
    );

  }


  /* =====================================================
     VEHICLE FILTER
  ===================================================== */

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
        button.dataset.vehicleFilter;


      document
        .querySelectorAll(
          ".admin-vehicle-card"
        )
        .forEach(card => {

          const status =
            (
              card.dataset.status ||
              ""
            ).toLowerCase();


          if (
            filter === "all" ||
            status === filter
          ) {

            card.style.display = "";

          } else {

            card.style.display = "none";

          }

        });

    });

  });


  /* =====================================================
     BOOKING FILTER
  ===================================================== */

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
        button.dataset.bookingFilter;


      document
        .querySelectorAll(
          "#adminBookingsTable tbody tr"
        )
        .forEach(row => {

          const status =
            (
              row.dataset.status ||
              row.textContent ||
              ""
            ).toLowerCase();


          if (
            filter === "all" ||
            status.includes(filter)
          ) {

            row.style.display = "";

          } else {

            row.style.display = "none";

          }

        });

    });

  });


  /* =====================================================
     SUPPORT FILTER
  ===================================================== */

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
        button.dataset.supportFilter;


      document
        .querySelectorAll(
          ".support-case"
        )
        .forEach(card => {

          const status =
            (
              card.dataset.status ||
              ""
            ).toLowerCase();


          if (
            filter === "all" ||
            status === filter
          ) {

            card.style.display = "";

          } else {

            card.style.display = "none";

          }

        });

    });

  });


  /* =====================================================
     REVENUE PERIOD
  ===================================================== */

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

        showNotification(
          "Chart Updated",
          `Revenue period changed to last ${revenuePeriod.value} days.`
        );

      }
    );

  }


  /* =====================================================
     NOTIFICATION BROADCAST
  ===================================================== */

  const notificationForm =
    document.getElementById(
      "adminNotificationForm"
    );


  function renderNotificationHistory() {

    const container =
      document.getElementById(
        "adminNotificationHistory"
      );

    if (!container) return;


    let notifications = [];

    try {

      notifications =
        JSON.parse(
          localStorage.getItem(
            "rentoride_admin_notifications"
          ) || "[]"
        );

    } catch {

      notifications = [];

    }


    if (!notifications.length) {

      container.innerHTML = `
        <div class="admin-empty">
          No notifications sent yet.
        </div>
      `;

      return;

    }


    container.innerHTML =
      notifications
        .map(notification => {

          return `
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
          `;

        })
        .join("");

  }


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


        const notification = {

          audience,
          title,
          message,

          time:
            new Date()
              .toLocaleString(
                "en-IN"
              )

        };


        let oldNotifications = [];

        try {

          oldNotifications =
            JSON.parse(
              localStorage.getItem(
                "rentoride_admin_notifications"
              ) || "[]"
            );

        } catch {

          oldNotifications = [];

        }


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


  /* =====================================================
     PLATFORM SETTINGS
  ===================================================== */

  const saveSettings =
    document.getElementById(
      "saveAdminSettings"
    );


  if (saveSettings) {

    saveSettings.addEventListener(
      "click",
      () => {

        const settings = {

          commission:
            document.getElementById(
              "platformCommissionRate"
            )?.value || 10,

          minimumWithdrawal:
            document.getElementById(
              "minimumWithdrawal"
            )?.value || 500,

          deliveryCharge:
            document.getElementById(
              "defaultDeliveryCharge"
            )?.value || 100,

          allowBookings:
            document.getElementById(
              "allowBookings"
            )?.checked ?? true,

          maintenanceMode:
            document.getElementById(
              "maintenanceMode"
            )?.checked ?? false

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


  /* =====================================================
     LOAD SETTINGS
  ===================================================== */

  function loadSettings() {

    let saved;

    try {

      saved =
        JSON.parse(
          localStorage.getItem(
            "rentoride_admin_settings"
          ) || "null"
        );

    } catch {

      saved = null;

    }


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


    if (
      commission &&
      saved.commission !== undefined
    ) {
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


  /* =====================================================
     ACTIVITY LOG
  ===================================================== */

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
                Platform operational.
              </p>

              <p>
                <strong>Security:</strong>
                No critical security events detected.
              </p>

            </div>
          `
        );

      }
    );

  }


  /* =====================================================
     SECURITY BUTTON
  ===================================================== */

  const securityBtn =
    document.getElementById(
      "adminSecurityBtn"
    );


  if (securityBtn) {

    securityBtn.addEventListener(
      "click",
      () => {

        openDetailModal(
          "Security Settings",
          `
            <div class="admin-log-content">

              <p>
                <strong>Admin Protection</strong>
              </p>

              <p>
                Security controls will be connected
                with Supabase authentication later.
              </p>

              <p>
                For now your admin interface is running
                in local dashboard mode.
              </p>

            </div>
          `
        );

      }
    );

  }


  /* =====================================================
     NOTIFICATION HISTORY LOAD
  ===================================================== */

  renderNotificationHistory();


  /* =====================================================
     ADMIN NAME
  ===================================================== */

  const savedAdminName =
    localStorage.getItem(
      "rentoride_admin_name"
    );


  if (savedAdminName) {

    const nameElements = [

      document.getElementById(
        "adminName"
      ),

      document.getElementById(
        "adminHeaderName"
      ),

      document.getElementById(
        "welcomeAdminName"
      )

    ];


    nameElements.forEach(element => {

      if (element) {
        element.textContent =
          savedAdminName;
      }

    });


    const firstLetter =
      savedAdminName
        .charAt(0)
        .toUpperCase();


    const avatarElements = [

      document.getElementById(
        "adminAvatar"
      ),

      document.getElementById(
        "adminHeaderAvatar"
      )

    ];


    avatarElements.forEach(element => {

      if (element) {
        element.textContent =
          firstLetter;
      }

    });

  }


  /* =====================================================
     LOGOUT
  ===================================================== */

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
          Abhi local admin session clear.
          Supabase connect hone ke baad
          yahin supabase.auth.signOut()
          add karenge.
        */

        localStorage.removeItem(
          "rentoride_admin_logged_in"
        );


        window.location.href =
          "login.html";

      }
    );

  }


  /* =====================================================
     HELPERS
  ===================================================== */

  function escapeHTML(value) {

    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  loadSettings();

  openSection("overview");


  console.log(
    "RentoRide Admin Dashboard JS loaded successfully."
  );

});
