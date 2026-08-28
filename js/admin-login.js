```javascript
/* =========================================================
   RentoRide ADMIN LOGIN
   js/admin-login.js
   ========================================================= */

/*
  IMPORTANT:
  - admin.html ko direct open karne par bhi security check
    admin-dashboard.js mein lagana zaroori hai.
  - profiles table:
      id   -> auth.users.id
      role -> "admin"
*/


// =========================================================
// SUPABASE CONFIG
// =========================================================

// Agar tumhare project mein Supabase already kisi common JS
// file se initialize ho raha hai, toh yahan duplicate client
// mat banana.

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";


// Supabase library check
if (
  typeof supabase === "undefined" ||
  !supabase.createClient
) {
  console.error(
    "Supabase JS library load nahi hui."
  );
}


// Client create
const supabaseClient =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );


// =========================================================
// DOM
// =========================================================

const loginForm =
  document.getElementById("adminLoginForm");

const emailInput =
  document.getElementById("adminEmail");

const passwordInput =
  document.getElementById("adminPassword");

const rememberInput =
  document.getElementById("rememberAdmin");

const loginButton =
  document.getElementById("adminLoginBtn");

const errorMessage =
  document.getElementById("adminLoginError");

const successMessage =
  document.getElementById("adminLoginSuccess");

const passwordToggle =
  document.getElementById("adminPasswordToggle");


// =========================================================
// MESSAGE HELPERS
// =========================================================

function showError(message) {

  if (!errorMessage) return;

  errorMessage.textContent = message;

  errorMessage.classList.add("show");

  if (successMessage) {
    successMessage.classList.remove("show");
  }
}


function showSuccess(message) {

  if (!successMessage) return;

  successMessage.textContent = message;

  successMessage.classList.add("show");

  if (errorMessage) {
    errorMessage.classList.remove("show");
  }
}


function clearMessages() {

  if (errorMessage) {
    errorMessage.classList.remove("show");
    errorMessage.textContent = "";
  }

  if (successMessage) {
    successMessage.classList.remove("show");
    successMessage.textContent = "";
  }
}


// =========================================================
// BUTTON LOADING
// =========================================================

function setLoading(isLoading) {

  if (!loginButton) return;

  loginButton.disabled = isLoading;

  loginButton.classList.toggle(
    "loading",
    isLoading
  );
}


// =========================================================
// PASSWORD SHOW / HIDE
// =========================================================

if (passwordToggle && passwordInput) {

  passwordToggle.addEventListener(
    "click",
    function () {

      const isPassword =
        passwordInput.type === "password";

      passwordInput.type =
        isPassword
          ? "text"
          : "password";

      passwordToggle.textContent =
        isPassword
          ? "🙈"
          : "👁";

      passwordToggle.setAttribute(
        "aria-label",
        isPassword
          ? "Hide password"
          : "Show password"
      );
    }
  );
}


// =========================================================
// CHECK CURRENT SESSION
// =========================================================

async function checkExistingAdminSession() {

  try {

    const {
      data: {
        session
      }
    } =
      await supabaseClient.auth.getSession();


    if (!session) {
      return;
    }


    const isAdmin =
      await checkAdminRole(
        session.user.id
      );


    if (isAdmin) {

      window.location.replace(
        "admin.html"
      );

    } else {

      await supabaseClient.auth.signOut();

    }

  } catch (error) {

    console.error(
      "Session check error:",
      error
    );

  }
}


// =========================================================
// CHECK ADMIN ROLE
// =========================================================

async function checkAdminRole(userId) {

  if (!userId) {
    return false;
  }


  try {

    const {
      data,
      error
    } =
      await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();


    if (error) {

      console.error(
        "Admin role query error:",
        error
      );

      return false;
    }


    if (!data) {
      return false;
    }


    return (
      String(data.role)
        .toLowerCase()
        .trim()
      === "admin"
    );


  } catch (error) {

    console.error(
      "Admin role check failed:",
      error
    );

    return false;
  }
}


// =========================================================
// ADMIN LOGIN
// =========================================================

async function adminLogin() {

  clearMessages();


  const email =
    emailInput
      ? emailInput.value.trim()
      : "";

  const password =
    passwordInput
      ? passwordInput.value
      : "";


  // -------------------------------------------------------
  // VALIDATION
  // -------------------------------------------------------

  if (!email) {

    showError(
      "Admin email enter karo."
    );

    if (emailInput) {
      emailInput.focus();
    }

    return;
  }


  if (!password) {

    showError(
      "Password enter karo."
    );

    if (passwordInput) {
      passwordInput.focus();
    }

    return;
  }


  setLoading(true);


  try {

    // -----------------------------------------------------
    // SUPABASE AUTH LOGIN
    // -----------------------------------------------------

    const {
      data,
      error
    } =
      await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });


    if (error) {

      console.error(
        "Supabase login error:",
        error
      );

      showError(
        "Email ya password incorrect hai."
      );

      setLoading(false);

      return;
    }


    if (!data || !data.user) {

      showError(
        "Login complete nahi ho saka."
      );

      setLoading(false);

      return;
    }


    // -----------------------------------------------------
    // ADMIN ROLE CHECK
    // -----------------------------------------------------

    const isAdmin =
      await checkAdminRole(
        data.user.id
      );


    // -----------------------------------------------------
    // NOT ADMIN
    // -----------------------------------------------------

    if (!isAdmin) {

      await supabaseClient.auth.signOut();


      showError(
        "Access denied. Ye account administrator nahi hai."
      );


      setLoading(false);

      return;
    }


    // -----------------------------------------------------
    // REMEMBER ADMIN
    // -----------------------------------------------------

    if (
      rememberInput &&
      rememberInput.checked
    ) {

      localStorage.setItem(
        "rentoride_admin_remember",
        "true"
      );

    } else {

      localStorage.removeItem(
        "rentoride_admin_remember"
      );
    }


    // -----------------------------------------------------
    // SUCCESS
    // -----------------------------------------------------

    showSuccess(
      "Admin authentication successful. Opening Command Center..."
    );


    // Small delay so user sees success
    setTimeout(
      function () {

        window.location.replace(
          "admin.html"
        );

      },
      700
    );


  } catch (error) {

    console.error(
      "Admin login failed:",
      error
    );

    showError(
      "Something went wrong. Please try again."
    );

    setLoading(false);

  }

}


// =========================================================
// FORM SUBMIT
// =========================================================

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      adminLogin();

    }
  );

}


// =========================================================
// ENTER KEY SUPPORT
// =========================================================

if (passwordInput) {

  passwordInput.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();

        if (loginForm) {
          loginForm.requestSubmit();
        }

      }

    }
  );

}


// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    checkExistingAdminSession();

  }
);


// =========================================================
// SECURITY NOTE
// =========================================================
//
// Frontend role-check alone is NOT enough.
//
// Supabase RLS policies must also protect admin-only
// database operations.
//
// Example concept:
//
// profiles.role = "admin"
//
// And admin dashboard queries should have appropriate
// Row Level Security policies.
//
// =========================================================
```
