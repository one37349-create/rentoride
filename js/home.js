/* =========================================================
   RENTORIDE HOME PAGE
   ========================================================= */

/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}


/* Close mobile menu after clicking a link */

if (navMenu) {
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}


/* ================= SEARCH BIKES ================= */

const searchBikeBtn = document.getElementById("searchBikeBtn");

if (searchBikeBtn) {
  searchBikeBtn.addEventListener("click", () => {

    const locationInput =
      document.getElementById("location");

    const pickupDate =
      document.getElementById("pickupDate");

    const bikeType =
      document.getElementById("bikeType");


    const locationValue =
      locationInput ? locationInput.value.trim() : "";

    const dateValue =
      pickupDate ? pickupDate.value : "";

    const bikeTypeValue =
      bikeType ? bikeType.value : "";


    /*
      Search page ke liye values URL me bhej rahe hain.
      Jab bikes.html ready hoga, wahi values use karke
      actual Supabase filtering connect karenge.
    */

    const params = new URLSearchParams();


    if (locationValue) {
      params.set("location", locationValue);
    }


    if (dateValue) {
      params.set("date", dateValue);
    }


    if (bikeTypeValue) {
      params.set("type", bikeTypeValue);
    }


    window.location.href =
      "bikes.html" +
      (params.toString()
        ? "?" + params.toString()
        : "");

  });
}


/* ================= MINIMUM DATE ================= */

const pickupDateInput =
  document.getElementById("pickupDate");

if (pickupDateInput) {

  const today =
    new Date().toISOString().split("T")[0];

  pickupDateInput.min = today;

}


/* ================= FAQ ================= */

/*
  FAQ <details> browser ke native system se
  already open/close hota hai.
*/


/* ================= SCROLL ANIMATION ================= */

const animatedElements =
  document.querySelectorAll(
    ".info-card, .bike-card, .why-card, .step, .support-card"
  );


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  animatedElements.forEach((element) => {

    observer.observe(element);

  });

}


/* ================= CONSOLE ================= */

console.log("RentoRide Home Page Loaded Successfully");
