```javascript
/* =========================================================
   RentoRide ADMIN DASHBOARD
   File: js/admin.js

   SECURITY:
   Login required + profiles.role must be "admin"
   ========================================================= */

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// =========================================================
// PAGE ELEMENTS
// =========================================================

const sidebar = document.getElementById("adminSidebar");
const overlay = document.getElementById("adminSidebarOverlay");
const menuBtn = document.getElementById("adminMenuBtn");

const pageTitle = document.getElementById("adminPageTitle");

const logoutBtn = document.getElementById("adminLogoutBtn");


// =========================================================
// SECTION TITLES
// =========================================================

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


// =========================================================
// SECURITY CHECK
// =========================================================

async function checkAdminAccess() {

  try {

    const {
      data: { session },
      error
    } = await supabaseClient.auth.getSession();


    if (error) {
      console.error("Session error:", error);
      redirectToLogin();
      return false;
    }


    // No login
    if (!session || !session.user) {

      redirectToLogin();
      return false;
    }


    const userId = session.user.id;


    // Check profile role
    const {
      data: profile,
      error: profileError
    } = await supabaseClient
      .from("profiles")
      .select("role, name, email, phone")
      .eq("id", userId)
      .maybeSingle();


    if (profileError) {

      console.error(
        "Profile security check failed:",
        profileError
      );

      await supabaseClient.auth.signOut();

      redirectToLogin();

      return false;
    }


    // Profile missing
    if (!profile) {

      await supabaseClient.auth.signOut();

      redirectToLogin();

      return false;
    }


    // NOT ADMIN
    if (
      String(profile.role || "")
        .trim()
        .toLowerCase() !== "admin"
    ) {

      alert(
        "Access denied. Administrator permission required."
      );

      await supabaseClient.auth.signOut();

      redirectToLogin();

      return false;
    }


    // ADMIN VERIFIED
    setAdminProfile(profile);

    console.log(
      "RentoRide Admin authenticated."
    );

    return true;


  } catch (error) {

    console.error(
      "Admin security error:",
      error
    );

    redirectToLogin();

    return false;
  }
}


// =========================================================
// REDIRECT LOGIN
// =========================================================

function redirectToLogin() {

  // Prevent endless redirect
  if (
    !window.location.pathname.endsWith(
      "admin-login.html"
    )
  ) {

    window.location.replace(
      "admin-login.html"
    );
  }
}


// =========================================================
// ADMIN PROFILE
// =========================================================

function setAdminProfile(profile) {

  const name =
    profile.name ||
    "Administrator";

  const email =
    profile.email ||
    "Admin Account";


  // Sidebar
  const adminName =
    document.getElementById("adminName");

  if (adminName) {
    adminName.textContent = name;
  }


  // Header
  const adminHeaderName =
    document.getElementById("adminHeaderName");

  if (adminHeaderName) {
    adminHeaderName.textContent = name;
  }


  // Welcome
  const welcomeAdminName =
    document.getElementById("welcomeAdminName");

  if (welcomeAdminName) {
    welcomeAdminName.textContent = name;
  }


  // Avatar
  const firstLetter =
    name.charAt(0).toUpperCase();


  const adminAvatar =
    document.getElementById("adminAvatar");

  const adminHeaderAvatar =
    document.getElementById(
      "adminHeaderAvatar"
    );


  if (adminAvatar) {
    adminAvatar.textContent = firstLetter;
  }


  if (adminHeaderAvatar) {
    adminHeaderAvatar.textContent = firstLetter;
  }
}


// =========================================================
// SIDEBAR
// =========================================================

function openSidebar() {

  if (sidebar) {
    sidebar.classList.add("open");
  }

  if (overlay) {
    overlay.classList.add("active");
  }
}


function closeSidebar() {

  if (sidebar) {
    sidebar.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("active");
  }
}


if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    openSidebar
  );
}


if (overlay) {

  overlay.addEventListener(
    "click",
    closeSidebar
  );
}


// =========================================================
// SHOW SECTION
// =========================================================

function showSection(sectionName) {

  const sections =
    document.querySelectorAll(
      ".admin-section"
    );


  const navItems =
    document.querySelectorAll(
      ".admin-nav-item"
    );


  // Remove active sections
  sections.forEach(
    section => {

      section.classList.remove(
        "active"
      );

    }
  );


  // Remove active nav
  navItems.forEach(
    item => {

      item.classList.remove(
        "active"
      );

    }
  );


  // Target section
  const target =
    document.getElementById(
      "admin-section-" +
      sectionName
    );


  if (target) {

    target.classList.add(
      "active"
    );
  }


  // Target navigation
  const nav =
    document.querySelector(
      `.admin-nav-item[data-section="${sectionName}"]`
    );


  if (nav) {

    nav.classList.add(
      "active"
    );
  }


  // Change title
  if (pageTitle) {

    pageTitle.textContent =
      sectionTitles[sectionName] ||
      "Command Center";
  }


  // Close mobile menu
  closeSidebar();


  // Update URL without reload
  try {

    history.replaceState(
      null,
      "",
      "#" + sectionName
    );

  } catch (error) {

    console.log(
      "URL update skipped."
    );
  }


  // Load section data
  loadSectionData(
    sectionName
  );
}


// =========================================================
// NAVIGATION BUTTONS
// =========================================================

document.addEventListener(
  "click",
  function (event) {

    const navButton =
      event.target.closest(
        ".admin-nav-item"
      );


    if (navButton) {

      const section =
        navButton.dataset.section;


      if (section) {

        event.preventDefault();

        showSection(section);
      }

      return;
    }


    // Buttons containing data-section-link
    const sectionLink =
      event.target.closest(
        "[data-section-link]"
      );


    if (sectionLink) {

      const section =
        sectionLink.dataset.sectionLink;


      if (section) {

        event.preventDefault();

        showSection(section);
      }

    }

  }
);


// =========================================================
// BOOKING FILTERS
// =========================================================

document.addEventListener(
  "click",
  function (event) {

    const filter =
      event.target.closest(
        ".admin-booking-filter"
      );


    if (!filter) return;


    document
      .querySelectorAll(
        ".admin-booking-filter"
      )
      .forEach(
        button =>
          button.classList.remove(
            "active"
          )
      );


    filter.classList.add(
      "active"
    );


    const status =
      filter.dataset.bookingFilter;


    loadBookings(
      status || "all"
    );

  }
);


// =========================================================
// VEHICLE FILTERS
// =========================================================

document.addEventListener(
  "click",
  function (event) {

    const filter =
      event.target.closest(
        ".admin-filter"
      );


    if (!filter) return;


    // Only vehicle filters
    if (
      !filter.hasAttribute(
        "data-vehicle-filter"
      )
    ) return;


    document
      .querySelectorAll(
        "[data-vehicle-filter]"
      )
      .forEach(
        button =>
          button.classList.remove(
            "active"
          )
      );


    filter.classList.add(
      "active"
    );


    loadVehicles(
      filter.dataset.vehicleFilter ||
      "all"
    );

  }
);


// =========================================================
// SUPPORT FILTERS
// =========================================================

document.addEventListener(
  "click",
  function (event) {

    const filter =
      event.target.closest(
        ".support-filter"
      );


    if (!filter) return;


    document
      .querySelectorAll(
        ".support-filter"
      )
      .forEach(
        button =>
          button.classList.remove(
            "active"
          )
      );


    filter.classList.add(
      "active"
    );

  }
);


// =========================================================
// LOAD SECTION DATA
// =========================================================

async function loadSectionData(
  section
) {

  try {

    switch (section) {

      case "overview":
        await loadDashboardStats();
        break;

      case "users":
        await loadUsers();
        break;

      case "owners":
        await loadOwners();
        break;

      case "vehicles":
        await loadVehicles("all");
        break;

      case "verification":
        await loadVerification();
        break;

      case "bookings":
        await loadBookings("all");
        break;

      case "finance":
        await loadFinance();
        break;

      case "analytics":
        loadAnalytics();
        break;

      case "support":
        loadSupport();
        break;

      case "notifications":
        loadNotificationHistory();
        break;

      case "settings":
        loadSettings();
        break;

    }

  } catch (error) {

    console.error(
      "Section loading error:",
      error
    );
  }
}


// =========================================================
// DASHBOARD STATS
// =========================================================

async function loadDashboardStats() {

  // Users
  const usersResult =
    await supabaseClient
      .from("profiles")
      .select("id", {
        count: "exact",
        head: true
      });


  setText(
    "adminTotalUsers",
    usersResult.count || 0
  );


  // Owners
  const ownersResult =
    await supabaseClient
      .from("profiles")
      .select("id", {
        count: "exact",
        head: true
      })
      .eq("role", "owner");


  setText(
    "adminTotalOwners",
    ownersResult.count || 0
  );


  // Vehicles
  const vehiclesResult =
    await supabaseClient
      .from("bikes")
      .select("id", {
        count: "exact",
        head: true
      });


  setText(
    "adminTotalVehicles",
    vehiclesResult.count || 0
  );


  // Bookings
  const bookingsResult =
    await supabaseClient
      .from("bookings")
      .select("id", {
        count: "exact",
        head: true
      });


  setText(
    "adminTotalBookings",
    bookingsResult.count || 0
  );
}


// =========================================================
// USERS
// =========================================================

async function loadUsers() {

  const container =
    document.getElementById(
      "usersTable"
    );


  if (!container) return;


  container.innerHTML =
    `<div class="admin-table-empty">
      Loading users...
    </div>`;


  const {
    data,
    error
  } =
    await supabaseClient
      .from("profiles")
      .select("*")
      .neq("role", "admin")
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(
      "Users error:",
      error
    );

    container.innerHTML =
      `<div class="admin-table-empty">
        Unable to load users.
      </div>`;

    return;
  }


  if (!data || data.length === 0) {

    container.innerHTML =
      `<div class="admin-table-empty">
        No users found.
      </div>`;

    return;
  }


  container.innerHTML =
    data.map(
      user => `
        <div class="admin-simple-row">

          <div>
            <strong>
              ${escapeHTML(
                user.name || "User"
              )}
            </strong>

            <small>
              ${escapeHTML(
                user.email || "—"
              )}
            </small>
          </div>

          <span>
            ${escapeHTML(
              user.role || "customer"
            )}
          </span>

        </div>
      `
    ).join("");

}


// =========================================================
// OWNERS
// =========================================================

async function loadOwners() {

  const container =
    document.getElementById(
      "ownersTable"
    );


  if (!container) return;


  container.innerHTML =
    `<div class="admin-table-empty">
      Loading owners...
    </div>`;


  const {
    data,
    error
  } =
    await supabaseClient
      .from("profiles")
      .select("*")
      .eq("role", "owner")
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(
      "Owners error:",
      error
    );

    container.innerHTML =
      `<div class="admin-table-empty">
        Unable to load owners.
      </div>`;

    return;
  }


  if (!data || data.length === 0) {

    container.innerHTML =
      `<div class="admin-table-empty">
        No owners found.
      </div>`;

    return;
  }


  container.innerHTML =
    data.map(
      owner => `
        <div class="admin-simple-row">

          <div>
            <strong>
              ${escapeHTML(
                owner.name || "Owner"
              )}
            </strong>

            <small>
              ${escapeHTML(
                owner.email || "—"
              )}
            </small>
          </div>

          <span class="status-approved">
            OWNER
          </span>

        </div>
      `
    ).join("");

}


// =========================================================
// VEHICLES
// =========================================================

async function loadVehicles(
  filter = "all"
) {

  const container =
    document.getElementById(
      "adminVehicleList"
    );


  if (!container) return;


  container.innerHTML =
    `<div class="admin-large-empty">
      <div>🏍</div>
      <h3>Loading vehicles...</h3>
    </div>`;


  let query =
    supabaseClient
      .from("bikes")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (
    filter !== "all"
  ) {

    query =
      query.eq(
        "status",
        filter
      );
  }


  const {
    data,
    error
  } = await query;


  if (error) {

    console.error(
      "Vehicles error:",
      error
    );

    container.innerHTML =
      `<div class="admin-large-empty">
        <div>⚠️</div>
        <h3>Unable to load vehicles</h3>
      </div>`;

    return;
  }


  if (!data || data.length === 0) {

    container.innerHTML =
      `<div class="admin-large-empty">
        <div>🏍</div>
        <h3>No vehicles found</h3>
        <p>Vehicle listings will appear here.</p>
      </div>`;

    return;
  }


  container.innerHTML =
    data.map(
      vehicle => `

        <div class="admin-vehicle-card">

          <div class="vehicle-admin-image">
            ${
              vehicle.image_url
                ? `<img
                    src="${escapeAttribute(
                      vehicle.image_url
                    )}"
                    alt="Vehicle"
                  >`
                : "🏍"
            }
          </div>

          <div class="vehicle-admin-info">

            <h3>
              ${escapeHTML(
                vehicle.bike_name ||
                "Vehicle"
              )}
            </h3>

            <p>
              ${escapeHTML(
                vehicle.brand ||
                "—"
              )}
            </p>

            <span>
              ₹${escapeHTML(
                String(
                  vehicle.price_per_day ||
                  0
                )
              )}/day
            </span>

          </div>

          <button
            class="admin-outline-btn"
            data-vehicle-id="${escapeAttribute(
              String(vehicle.id)
            )}"
          >
            Review
          </button>

        </div>

      `
    ).join("");

}


// =========================================================
// BOOKINGS
// =========================================================

async function loadBookings(
  status = "all"
) {

  const container =
    document.getElementById(
      "adminBookingsTable"
    );


  if (!container) return;


  container.innerHTML =
    `<div class="admin-table-empty">
      Loading bookings...
    </div>`;


  let query =
    supabaseClient
      .from("bookings")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (
    status !== "all"
  ) {

    query =
      query.eq(
        "status",
        status
      );
  }


  const {
    data,
    error
  } = await query;


  if (error) {

    console.error(
      "Bookings error:",
      error
    );

    container.innerHTML =
      `<div class="admin-table-empty">
        Unable to load bookings.
      </div>`;

    return;
  }


  if (!data || data.length === 0) {

    container.innerHTML =
      `<div class="admin-table-empty">
        No bookings found.
      </div>`;

    return;
  }


  container.innerHTML =
    data.map(
      booking => `

        <div class="admin-simple-row">

          <div>

            <strong>
              Booking #${escapeHTML(
                String(booking.id)
              )}
            </strong>

            <small>
              ${escapeHTML(
                booking.start_date ||
                "—"
              )}
              →
              ${escapeHTML(
                booking.end_date ||
                "—"
              )}
            </small>

          </div>

          <span>
            ${escapeHTML(
              booking.status ||
              "pending"
            )}
          </span>

          <strong>
            ₹${escapeHTML(
              String(
                booking.amount ||
                0
              )
            )}
          </strong>

        </div>

      `
    ).join("");

}


// =========================================================
// VERIFICATION
// =========================================================

async function loadVerification() {

  const container =
    document.getElementById(
      "adminVerificationList"
    );


  if (!container) return;


  container.innerHTML =
    `<div class="admin-large-empty">
      <div>🛡</div>
      <h3>Loading verification...</h3>
    </div>`;


  /*
    Verification columns/table tumhare actual
    database schema ke according connect karenge.

    Abhi page safely load hoga.
  */


  container.innerHTML =
    `<div class="admin-large-empty">
      <div>🛡</div>
      <h3>Verification Center Ready</h3>
      <p>
        Pending verification requests will appear here.
      </p>
    </div>`;

}


// =========================================================
// FINANCE
// =========================================================

async function loadFinance() {

  setText(
    "grossBookingValue",
    "₹0"
  );

  setText(
    "platformCommission",
    "₹0"
  );

  setText(
    "ownerPayouts",
    "₹0"
  );

  setText(
    "totalRefunds",
    "₹0"
  );

}


// =========================================================
// ANALYTICS
// =========================================================

function loadAnalytics() {

  const charts =
    document.querySelectorAll(
      ".analytics-chart"
    );


  charts.forEach(
    chart => {

      chart.innerHTML =
        "Analytics data will appear here.";

    }
  );

}


// =========================================================
// SUPPORT
// =========================================================

function loadSupport() {

  const container =
    document.getElementById(
      "supportCaseList"
    );


  if (!container) return;


  container.innerHTML =
    `<div class="admin-large-empty">
      <div>🚨</div>
      <h3>No support cases</h3>
      <p>
        Customer complaints will appear here.
      </p>
    </div>`;

}


// =========================================================
// NOTIFICATION HISTORY
// =========================================================

function loadNotificationHistory() {

  const container =
    document.getElementById(
      "adminNotificationHistory"
    );


  if (!container) return;


  container.innerHTML =
    `<div class="admin-empty">
      No notifications sent yet.
    </div>`;

}


// =========================================================
// SETTINGS
// =========================================================

function loadSettings() {

  const savedCommission =
    localStorage.getItem(
      "rentoride_admin_commission"
    );


  const savedWithdrawal =
    localStorage.getItem(
      "rentoride_min_withdrawal"
    );


  const commissionInput =
    document.getElementById(
      "platformCommissionRate"
    );


  const withdrawalInput =
    document.getElementById(
      "minimumWithdrawal"
    );


  if (
    commissionInput &&
    savedCommission !== null
  ) {

    commissionInput.value =
      savedCommission;
  }


  if (
    withdrawalInput &&
    savedWithdrawal !== null
  ) {

    withdrawalInput.value =
      savedWithdrawal;
  }

}


// =========================================================
// SAVE SETTINGS
// =========================================================

const saveSettings =
  document.getElementById(
    "saveAdminSettings"
  );


if (saveSettings) {

  saveSettings.addEventListener(
    "click",
    function () {

      const commission =
        document.getElementById(
          "platformCommissionRate"
        )?.value || 10;


      const withdrawal =
        document.getElementById(
          "minimumWithdrawal"
        )?.value || 500;


      localStorage.setItem(
        "rentoride_admin_commission",
        commission
      );


      localStorage.setItem(
        "rentoride_min_withdrawal",
        withdrawal
      );


      showAdminPopup(
        "Settings Saved",
        "Platform settings saved successfully."
      );

    }
  );

}


// =========================================================
// LOGOUT
// =========================================================

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    async function () {

      const confirmed =
        confirm(
          "Logout from Admin Command Center?"
        );


      if (!confirmed) return;


      try {

        await supabaseClient.auth.signOut();

      } catch (error) {

        console.error(
          "Logout error:",
          error
        );

      }


      window.location.replace(
        "admin-login.html"
      );

    }
  );

}


// =========================================================
// NOTIFICATION POPUP
// =========================================================

function showAdminPopup(
  title,
  message
) {

  const popup =
    document.getElementById(
      "adminNotificationPopup"
    );


  if (!popup) return;


  const popupTitle =
    document.getElementById(
      "adminPopupTitle"
    );


  const popupMessage =
    document.getElementById(
      "adminPopupMessage"
    );


  if (popupTitle) {
    popupTitle.textContent =
      title;
  }


  if (popupMessage) {
    popupMessage.textContent =
      message;
  }


  popup.classList.add(
    "show"
  );


  setTimeout(
    function () {

      popup.classList.remove(
        "show"
      );

    },
    4000
  );

}


// =========================================================
// CLOSE POPUP
// =========================================================

const closePopup =
  document.getElementById(
    "closeAdminNotificationPopup"
  );


if (closePopup) {

  closePopup.addEventListener(
    "click",
    function () {

      const popup =
        document.getElementById(
          "adminNotificationPopup"
        );


      if (popup) {

        popup.classList.remove(
          "show"
        );

      }

    }
  );

}


// =========================================================
// SEARCH USERS
// =========================================================

const userSearch =
  document.getElementById(
    "userSearch"
  );


if (userSearch) {

  userSearch.addEventListener(
    "input",
    function () {

      const value =
        this.value
          .toLowerCase()
          .trim();


      document
        .querySelectorAll(
          "#usersTable .admin-simple-row"
        )
        .forEach(
          row => {

            row.style.display =
              row.textContent
                .toLowerCase()
                .includes(value)
                  ? ""
                  : "none";

          }
        );

    }
  );

}


// =========================================================
// SEARCH OWNERS
// =========================================================

const ownerSearch =
  document.getElementById(
    "ownerSearch"
  );


if (ownerSearch) {

  ownerSearch.addEventListener(
    "input",
    function () {

      const value =
        this.value
          .toLowerCase()
          .trim();


      document
        .querySelectorAll(
          "#ownersTable .admin-simple-row"
        )
        .forEach(
          row => {

            row.style.display =
              row.textContent
                .toLowerCase()
                .includes(value)
                  ? ""
                  : "none";

          }
        );

    }
  );

}


// =========================================================
// HEADER NOTIFICATION
// =========================================================

const notificationBtn =
  document.getElementById(
    "adminNotificationBtn"
  );


if (notificationBtn) {

  notificationBtn.addEventListener(
    "click",
    function () {

      showSection(
        "notifications"
      );

    }
  );

}


// =========================================================
// QUICK INITIALIZATION
// =========================================================

function setText(
  id,
  value
) {

  const element =
    document.getElementById(id);


  if (element) {

    element.textContent =
      value;

  }

}


// =========================================================
// HTML SECURITY
// =========================================================

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

  return escapeHTML(value);

}


// =========================================================
// URL HASH NAVIGATION
// =========================================================

function loadHashSection() {

  const hash =
    window.location.hash
      .replace("#", "")
      .trim();


  if (
    hash &&
    sectionTitles[hash]
  ) {

    showSection(hash);

  } else {

    showSection(
      "overview"
    );

  }

}


// =========================================================
// AUTH STATE LISTENER
// =========================================================

supabaseClient.auth.onAuthStateChange(
  async function (
    event,
    session
  ) {

    if (
      event === "SIGNED_OUT"
    ) {

      redirectToLogin();

      return;
    }


    if (
      event === "SIGNED_IN" &&
      session
    ) {

      await checkAdminAccess();

    }

  }
);


// =========================================================
// START
// =========================================================

document.addEventListener(
  "DOMContentLoaded",
  async function () {

    // IMPORTANT:
    // Security check first.
    const isAdmin =
      await checkAdminAccess();


    if (!isAdmin) {
      return;
    }


    // Dashboard only after admin verified
    loadHashSection();


    // Initial stats
    await loadDashboardStats();

  }
);
```
