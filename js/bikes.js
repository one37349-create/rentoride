/* =========================================================
   RentoRide — Bikes Page JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const bikeGrid = document.getElementById("bikeGrid");
  const bikeCards = Array.from(document.querySelectorAll(".bike-card"));

  const bikeSearch = document.getElementById("bikeSearch");
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");

  const sortBy = document.getElementById("sortBy");

  const filterToggle = document.getElementById("filterToggle");
  const filterSidebar = document.getElementById("filterSidebar");

  const clearFilters = document.getElementById("clearFilters");
  const resetSearch = document.getElementById("resetSearch");

  const availableOnly = document.getElementById("availableOnly");

  const bikeCount = document.getElementById("bikeCount");
  const noResults = document.getElementById("noResults");


  /* =========================================================
     FILTER TOGGLE
     ========================================================= */

  if (filterToggle && filterSidebar) {

    filterToggle.addEventListener("click", () => {

      filterSidebar.classList.toggle("open");
      filterToggle.classList.toggle("open");

    });

  }


  /* =========================================================
     CHECKBOX HELPERS
     ========================================================= */

  function getCheckedValues(name) {

    return Array.from(
      document.querySelectorAll(`input[name="${name}"]:checked`)
    ).map(input => input.value);

  }


  /* =========================================================
     BIKE FILTER
     ========================================================= */

  function filterBikes() {

    const searchText =
      bikeSearch.value.trim().toLowerCase();

    const maxPrice =
      Number(priceRange.value);

    const selectedTypes =
      getCheckedValues("bikeType");

    const selectedFuel =
      getCheckedValues("fuelType");

    const selectedRatings =
      getCheckedValues("rating");

    const onlyAvailable =
      availableOnly.checked;


    let visibleCards = [];


    bikeCards.forEach(card => {

      const name =
        (card.dataset.name || "").toLowerCase();

      const type =
        card.dataset.type || "";

      const fuel =
        card.dataset.fuel || "";

      const price =
        Number(card.dataset.price || 0);

      const rating =
        Number(card.dataset.rating || 0);

      const isAvailable =
        card.dataset.available === "true";


      /* SEARCH */

      const matchesSearch =
        !searchText ||
        name.includes(searchText);


      /* BIKE TYPE */

      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes("all") ||
        selectedTypes.includes(type);


      /* FUEL */

      const matchesFuel =
        selectedFuel.length === 0 ||
        selectedFuel.includes("all") ||
        selectedFuel.includes(fuel);


      /* PRICE */

      const matchesPrice =
        price <= maxPrice;


      /* RATING */

      let matchesRating = true;

      if (selectedRatings.length > 0) {

        matchesRating =
          selectedRatings.some(minRating => {

            return rating >= Number(minRating);

          });

      }


      /* AVAILABILITY */

      const matchesAvailability =
        !onlyAvailable ||
        isAvailable;


      /* FINAL RESULT */

      const show =
        matchesSearch &&
        matchesType &&
        matchesFuel &&
        matchesPrice &&
        matchesRating &&
        matchesAvailability;


      if (show) {

        card.style.display = "";

        visibleCards.push(card);

      } else {

        card.style.display = "none";

      }

    });


    updateCount(visibleCards.length);

    noResults.style.display =
      visibleCards.length === 0
        ? "block"
        : "none";

  }


  /* =========================================================
     COUNT
     ========================================================= */

  function updateCount(count) {

    bikeCount.textContent =
      `${count} Bike${count === 1 ? "" : "s"}`;

  }


  /* =========================================================
     PRICE RANGE
     ========================================================= */

  function updatePriceText() {

    const value =
      Number(priceRange.value);

    if (value >= Number(priceRange.max)) {

      priceValue.textContent = "₹2000+";

    } else {

      priceValue.textContent = `₹${value}`;

    }

  }


  priceRange.addEventListener(
    "input",
    () => {

      updatePriceText();
      filterBikes();

    }
  );


  /* =========================================================
     SEARCH
     ========================================================= */

  bikeSearch.addEventListener(
    "input",
    filterBikes
  );


  /* =========================================================
     BIKE TYPE
     ========================================================= */

  document
    .querySelectorAll('input[name="bikeType"]')
    .forEach(input => {

      input.addEventListener("change", () => {

        const all =
          document.querySelector(
            'input[name="bikeType"][value="all"]'
          );

        const specific =
          document.querySelectorAll(
            'input[name="bikeType"]:not([value="all"]):checked'
          );


        if (input.value === "all" && input.checked) {

          document
            .querySelectorAll(
              'input[name="bikeType"]:not([value="all"])'
            )
            .forEach(item => {
              item.checked = false;
            });

        }


        if (input.value !== "all" && input.checked) {

          all.checked = false;

        }


        if (specific.length === 0) {

          all.checked = true;

        }


        filterBikes();

      });

    });


  /* =========================================================
     FUEL TYPE
     ========================================================= */

  document
    .querySelectorAll('input[name="fuelType"]')
    .forEach(input => {

      input.addEventListener("change", () => {

        const all =
          document.querySelector(
            'input[name="fuelType"][value="all"]'
          );

        const specific =
          document.querySelectorAll(
            'input[name="fuelType"]:not([value="all"]):checked'
          );


        if (input.value === "all" && input.checked) {

          document
            .querySelectorAll(
              'input[name="fuelType"]:not([value="all"])'
            )
            .forEach(item => {
              item.checked = false;
            });

        }


        if (input.value !== "all" && input.checked) {

          all.checked = false;

        }


        if (specific.length === 0) {

          all.checked = true;

        }


        filterBikes();

      });

    });


  /* =========================================================
     RATING
     ========================================================= */

  document
    .querySelectorAll('input[name="rating"]')
    .forEach(input => {

      input.addEventListener(
        "change",
        filterBikes
      );

    });


  /* =========================================================
     AVAILABILITY
     ========================================================= */

  availableOnly.addEventListener(
    "change",
    filterBikes
  );


  /* =========================================================
     SORT
     ========================================================= */

  sortBy.addEventListener("change", () => {

    const cards =
      Array.from(
        bikeGrid.querySelectorAll(".bike-card")
      );


    const sort =
      sortBy.value;


    cards.sort((a, b) => {

      const priceA =
        Number(a.dataset.price || 0);

      const priceB =
        Number(b.dataset.price || 0);

      const ratingA =
        Number(a.dataset.rating || 0);

      const ratingB =
        Number(b.dataset.rating || 0);


      if (sort === "priceLow") {

        return priceA - priceB;

      }


      if (sort === "priceHigh") {

        return priceB - priceA;

      }


      if (sort === "rating") {

        return ratingB - ratingA;

      }


      return 0;

    });


    cards.forEach(card => {

      bikeGrid.appendChild(card);

    });

  });


  /* =========================================================
     FAVORITE BUTTON
     ========================================================= */

  document
    .querySelectorAll(".favorite")
    .forEach(button => {

      button.addEventListener("click", () => {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {

          button.textContent = "♥";

        } else {

          button.textContent = "♡";

        }

      });

    });


  /* =========================================================
     CLEAR FILTERS
     ========================================================= */

  function resetFilters() {

    /* Search */

    bikeSearch.value = "";


    /* Price */

    priceRange.value =
      priceRange.max;

    updatePriceText();


    /* Bike Type */

    document
      .querySelectorAll('input[name="bikeType"]')
      .forEach(input => {

        input.checked =
          input.value === "all";

      });


    /* Fuel */

    document
      .querySelectorAll('input[name="fuelType"]')
      .forEach(input => {

        input.checked =
          input.value === "all";

      });


    /* Rating */

    document
      .querySelectorAll('input[name="rating"]')
      .forEach(input => {

        input.checked = false;

      });


    /* Availability */

    availableOnly.checked = true;


    /* Sort */

    sortBy.value = "popular";


    /* Show cards */

    bikeCards.forEach(card => {

      card.style.display = "";

    });


    updateCount(bikeCards.length);

    noResults.style.display = "none";


    /* Reset original order */

    bikeCards.forEach(card => {

      bikeGrid.appendChild(card);

    });

  }


  clearFilters.addEventListener(
    "click",
    resetFilters
  );


  resetSearch.addEventListener(
    "click",
    resetFilters
  );


  /* =========================================================
     INITIAL LOAD
     ========================================================= */

  updatePriceText();

  filterBikes();

});
