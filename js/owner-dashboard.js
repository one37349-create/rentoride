/* =========================================================
   RentoRide — Owner Dashboard JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".dashboard-section");

  const sidebar = document.querySelector(".sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const menuBtn = document.querySelector(".menu-btn");

  const notificationBtn = document.querySelector(".notification-btn");
  const notificationPopup = document.querySelector(".notification-popup");

  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector(".modal-close");
  const modalOverlay = document.querySelector(".modal-overlay");

  const bookingFilters = document.querySelectorAll(".booking-filter");

  /* =======================================================
     SECTION NAVIGATION
     ======================================================= */

  navItems.forEach((item) => {

    item.addEventListener("click", () => {

      const target = item.dataset.section;

      if (!target) return;

      /* Remove active from navigation */
      navItems.forEach((nav) => {
        nav.classList.remove("active");
      });

      /* Add active */
      item.classList.add("active");

      /* Hide all sections */
      sections.forEach((section) => {
        section.classList.remove("active");
      });

      /* Show selected section */
      const targetSection =
        document.getElementById(target);

      if (targetSection) {
        targetSection.classList.add("active");
      }

      /* Close mobile sidebar */
      closeSidebar();

      /* Scroll top */
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     MOBILE SIDEBAR
     ======================================================= */

  function openSidebar() {

    if (sidebar) {
      sidebar.classList.add("open");
    }

    if (sidebarOverlay) {
      sidebarOverlay.classList.add("show");
    }

  }

  function closeSidebar() {

    if (sidebar) {
      sidebar.classList.remove("open");
    }

    if (sidebarOverlay) {
      sidebarOverlay.classList.remove("show");
    }

  }

  if (menuBtn) {
    menuBtn.addEventListener("click", openSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener(
      "click",
      closeSidebar
    );
  }


  /* =======================================================
     NOTIFICATION POPUP
     ======================================================= */

  if (notificationBtn) {

    notificationBtn.addEventListener("click", () => {

      if (!notificationPopup) return;

      notificationPopup.classList.toggle("show");

    });

  }


  /* Close notification */

  const notificationClose =
    document.querySelector(
      ".notification-popup > button"
    );

  if (notificationClose) {

    notificationClose.addEventListener(
      "click",
      () => {

        notificationPopup.classList.remove("show");

      }
    );

  }


  /* =======================================================
     MODAL FUNCTIONS
     ======================================================= */

  function openModal() {

    if (!modal) return;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

  }


  function closeModal() {

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";

  }


  if (modalClose) {
    modalClose.addEventListener(
      "click",
      closeModal
    );
  }


  if (modalOverlay) {
    modalOverlay.addEventListener(
      "click",
      closeModal
    );
  }


  /* ESC key */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      closeModal();
      closeSidebar();

      if (notificationPopup) {
        notificationPopup.classList.remove("show");
      }

    }

  });


  /* =======================================================
     OPEN MODAL BUTTONS
     ======================================================= */

  const modalOpenButtons =
    document.querySelectorAll(
      "[data-open-modal]"
    );

  modalOpenButtons.forEach((button) => {

    button.addEventListener(
      "click",
      openModal
    );

  });


  /* =======================================================
     BOOKING FILTER
     ======================================================= */

  bookingFilters.forEach((filter) => {

    filter.addEventListener("click", () => {

      bookingFilters.forEach((item) => {
        item.classList.remove("active");
      });

      filter.classList.add("active");

      const selectedFilter =
        filter.dataset.filter || "all";

      filterBookings(selectedFilter);

    });

  });


  function filterBookings(filter) {

    const bookings =
      document.querySelectorAll(
        ".booking-row"
      );

    bookings.forEach((booking) => {

      if (filter === "all") {

        booking.style.display = "";

        return;

      }

      const status =
        booking.dataset.status;

      if (status === filter) {

        booking.style.display = "";

      } else {

        booking.style.display = "none";

      }

    });

  }


  /* =======================================================
     ACCEPT / REJECT BOOKING
     ======================================================= */

  document.addEventListener(
    "click",
    (event) => {

      const acceptButton =
        event.target.closest(".accept-btn");

      const rejectButton =
        event.target.closest(".reject-btn");


      /* ACCEPT */

      if (acceptButton) {

        const booking =
          acceptButton.closest(".booking-row");

        if (!booking) return;

        booking.dataset.status = "confirmed";

        const status =
          booking.querySelector(
            ".booking-status"
          );

        if (status) {

          status.textContent =
            "Confirmed";

          status.classList.remove(
            "status-pending"
          );

          status.classList.add(
            "status-confirmed"
          );

        }

        acceptButton.remove();

        showToast(
          "Booking confirmed successfully."
        );

      }


      /* REJECT */

      if (rejectButton) {

        const booking =
          rejectButton.closest(".booking-row");

        if (!booking) return;

        booking.dataset.status = "rejected";

        const status =
          booking.querySelector(
            ".booking-status"
          );

        if (status) {

          status.textContent =
            "Rejected";

          status.classList.remove(
            "status-pending"
          );

          status.classList.add(
            "status-rejected"
          );

        }

        rejectButton.remove();

        showToast(
          "Booking rejected."
        );

      }

    }
  );


  /* =======================================================
     TOAST
     ======================================================= */

  function showToast(message) {

    let toast =
      document.querySelector(
        ".rr-toast"
      );

    if (!toast) {

      toast =
        document.createElement("div");

      toast.className =
        "rr-toast";

      document.body.appendChild(toast);

      toast.style.position = "fixed";
      toast.style.bottom = "25px";
      toast.style.right = "25px";
      toast.style.zIndex = "9999";
      toast.style.padding = "14px 18px";
      toast.style.borderRadius = "12px";
      toast.style.background = "#171717";
      toast.style.color = "#ffffff";
      toast.style.border =
        "1px solid rgba(255,210,31,.35)";
      toast.style.boxShadow =
        "0 15px 40px rgba(0,0,0,.5)";
      toast.style.fontSize = "12px";

    }

    toast.textContent = message;

    toast.style.display = "block";

    clearTimeout(
      window.rrToastTimer
    );

    window.rrToastTimer =
      setTimeout(() => {

        toast.style.display =
          "none";

      }, 3000);

  }


  /* =======================================================
     SOUND SELECTION
     ======================================================= */

  const soundOptions =
    document.querySelectorAll(
      ".sound-option input"
    );

  soundOptions.forEach((radio) => {

    radio.addEventListener(
      "change",
      () => {

        if (!radio.checked) return;

        localStorage.setItem(
          "rentoRideNotificationSound",
          radio.value
        );

        showToast(
          "Notification sound saved."
        );

      }
    );

  });


  /* =======================================================
     LOAD SAVED SOUND
     ======================================================= */

  const savedSound =
    localStorage.getItem(
      "rentoRideNotificationSound"
    );

  if (savedSound) {

    const savedRadio =
      document.querySelector(
        `.sound-option input[value="${savedSound}"]`
      );

    if (savedRadio) {
      savedRadio.checked = true;
    }

  }


  /* =======================================================
     SOUND PREVIEW
     ======================================================= */

  const soundPreviewButtons =
    document.querySelectorAll(
      ".sound-preview"
    );

  soundPreviewButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          const option =
            button.closest(
              ".sound-option"
            );

          if (!option) return;

          const radio =
            option.querySelector(
              "input"
            );

          if (!radio) return;

          playNotificationSound(
            radio.value
          );

        }
      );

    }
  );


  function playNotificationSound(
    soundName
  ) {

    /*
      Actual audio files backend/frontend
      integration ke time add karenge.

      Abhi browser beep preview.
    */

    try {

      const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!AudioContext) return;

      const audioContext =
        new AudioContext();

      const oscillator =
        audioContext.createOscillator();

      const gain =
        audioContext.createGain();

      oscillator.type =
        soundName === "classic"
          ? "sine"
          : "triangle";

      oscillator.frequency.value =
        soundName === "classic"
          ? 700
          : 900;

      gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.15,
        audioContext.currentTime + 0.02
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.35
      );

      oscillator.connect(gain);
      gain.connect(
        audioContext.destination
      );

      oscillator.start();

      oscillator.stop(
        audioContext.currentTime + 0.35
      );

    } catch (error) {

      console.log(
        "Sound preview unavailable."
      );

    }

  }


  /* =======================================================
     NOTIFICATION SETTINGS
     ======================================================= */

  const notificationSwitches =
    document.querySelectorAll(
      ".setting-row input[type='checkbox']"
    );

  notificationSwitches.forEach(
    (checkbox, index) => {

      const key =
        `rentoRideNotificationSetting_${index}`;

      const saved =
        localStorage.getItem(key);

      if (saved !== null) {

        checkbox.checked =
          saved === "true";

      }

      checkbox.addEventListener(
        "change",
        () => {

          localStorage.setItem(
            key,
            checkbox.checked
          );

          showToast(
            checkbox.checked
              ? "Notification setting enabled."
              : "Notification setting disabled."
          );

        }
      );

    }
  );


  /* =======================================================
     SAVE BUTTONS
     ======================================================= */

  const saveButtons =
    document.querySelectorAll(
      ".save-btn, .save-settings-btn"
    );

  saveButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        showToast(
          "Settings saved successfully."
        );

      }
    );

  });


  /* =======================================================
     WITHDRAW BUTTON
     ======================================================= */

  const withdrawButton =
    document.querySelector(
      ".withdraw-btn"
    );

  if (withdrawButton) {

    withdrawButton.addEventListener(
      "click",
      () => {

        openModal();

      }
    );

  }


  /* =======================================================
     ADD BANK ACCOUNT
     ======================================================= */

  const addBankButton =
    document.querySelector(
      "[data-add-bank]"
    );

  if (addBankButton) {

    addBankButton.addEventListener(
      "click",
      () => {

        openModal();

      }
    );

  }


  /* =======================================================
     LOGOUT
     ======================================================= */

  const logoutButton =
    document.querySelector(
      ".logout-btn"
    );

  if (logoutButton) {

    logoutButton.addEventListener(
      "click",
      () => {

        const confirmed =
          confirm(
            "Are you sure you want to logout?"
          );

        if (!confirmed) return;

        /*
          Supabase logout yaha baad mein
          connect karenge.
        */

        localStorage.removeItem(
          "rentoRideNotificationSound"
        );

        showToast(
          "Logging out..."
        );

      }
    );

  }


  /* =======================================================
     BACK HOME
     ======================================================= */

  const backHome =
    document.querySelector(
      ".back-home"
    );

  if (backHome) {

    backHome.addEventListener(
      "click",
      () => {

        window.location.href =
          "index.html";

      }
    );

  }


  /* =======================================================
     CLOSE NOTIFICATION WHEN CLICKING OUTSIDE
     ======================================================= */

  document.addEventListener(
    "click",
    (event) => {

      if (!notificationPopup ||
          !notificationBtn) {
        return;
      }

      const clickedInsidePopup =
        notificationPopup.contains(
          event.target
        );

      const clickedButton =
        notificationBtn.contains(
          event.target
        );

      if (
        !clickedInsidePopup &&
        !clickedButton
      ) {

        notificationPopup.classList.remove(
          "show"
        );

      }

    }
  );


  /* =======================================================
     INITIAL PAGE
     ======================================================= */

  const defaultSection =
    document.querySelector(
      ".dashboard-section.active"
    );

  if (!defaultSection &&
      sections.length > 0) {

    sections[0].classList.add(
      "active"
    );

  }


  console.log(
    "RentoRide Owner Dashboard loaded successfully."
  );

});
