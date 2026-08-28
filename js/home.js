/* =====================================================
   RENTORIDE BIKES PAGE
===================================================== */


/* ================= MOBILE MENU ================= */

const menuToggle =
  document.getElementById("menuToggle");

const navMenu =
  document.getElementById("navMenu");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

  });

}


/* ================= FILTER TOGGLE ================= */

const filterToggle =
  document.getElementById("filterToggle");

const filterBox =
  document.getElementById("filterBox");

const filterArrow =
  document.getElementById("filterArrow");


if (filterToggle && filterBox) {

  filterToggle.addEventListener("click", () => {

    filterBox.classList.toggle("filter-closed");

    if (
      filterBox.classList.contains("filter-closed")
    ) {

      filterArrow.textContent = "▶";

    } else {

      filterArrow.textContent = "▼";

    }

  });

}


/* ================= ELEMENTS ================= */

const bikeGrid =
  document.getElementById("bikeGrid");

const bikeCards =
  Array.from(
    document.querySelectorAll(".bike-card")
  );

const bikeSearch =
  document.getElementById("bikeSearch");

const priceRange =
  document.getElementById("priceRange");

const priceValue =
  document.getElementById("priceValue");

const availableOnly =
  document.getElementById("availableOnly");

const sortSelect =
  document.getElementById("sortSelect");

const bikeCount =
  document.getElementById("bikeCount");

const noResults =
  document.getElementById("noResults");

const locationInput =
  document.getElementById("locationInput");

const locationTitle =
  document.getElementById("locationTitle");

const searchBtn =
  document.getElementById("searchBtn");

const clearFilters =
  document.getElementById("clearFilters");


let selectedRating = 0;


/* ================= PRICE ================= */

function updatePriceText() {

  if (!priceRange || !priceValue) {
    return;
  }

  const value =
    Number(priceRange.value);

  if (value >= 2000) {

    priceValue.textContent =
      "₹2000+";

  } else {

    priceValue.textContent =
      `₹${value}`;

  }

}


/* ================= CHECKBOX HELPER ================= */

function getSelectedValues(name) {

  const checkboxes =
    Array.from(
      document.querySelectorAll(
        `input[name="${name}"]`
      )
    );

  const allCheckbox =
    checkboxes.find(
      checkbox =>
        checkbox.value === "all"
    );

  const selected =
    checkboxes
      .filter(
        checkbox =>
          checkbox.checked &&
          checkbox.value !== "all"
      )
      .map(
        checkbox =>
          checkbox.value
      );


  if (
    !selected.length ||
    (allCheckbox && allCheckbox.checked)
  ) {

    return [];

  }

  return selected;

}


/* ================= BIKE FILTER ================= */

function filterBikes() {

  const searchText =
    bikeSearch
      ? bikeSearch.value
          .toLowerCase()
          .trim()
      : "";


  const maxPrice =
    priceRange
      ? Number(priceRange.value)
      : 2000;


  const selectedTypes =
    getSelectedValues("bikeType");


  const selectedFuel =
    getSelectedValues("fuelType");


  const onlyAvailable =
    availableOnly
      ? availableOnly.checked
      : false;


  let visibleCount = 0;


  bikeCards.forEach(card => {

    const name =
      (card.dataset.name || "")
        .toLowerCase();


    const type =
      card.dataset.type || "";


    const fuel =
      card.dataset.fuel || "";


    const price =
      Number(
        card.dataset.price || 0
      );


    const rating =
      Number(
        card.dataset.rating || 0
      );


    const available =
      card.dataset.available === "true";


    let show = true;


    /* SEARCH */

    if (
      searchText &&
      !name.includes(searchText)
    ) {

      show = false;

    }


    /* PRICE */

    if (price > maxPrice) {

      show = false;

    }


    /* BIKE TYPE */

    if (
      selectedTypes.length &&
      !selectedTypes.includes(type)
    ) {

      show = false;

    }


    /* FUEL */

    if (
      selectedFuel.length &&
      !selectedFuel.includes(fuel)
    ) {

      show = false;

    }


    /* RATING */

    if (rating < selectedRating) {

      show = false;

    }


    /* AVAILABILITY */

    if (
      onlyAvailable &&
      !available
    ) {

      show = false;

    }


    card.style.display =
      show ? "" : "none";


    if (show) {

      visibleCount++;

    }

  });


  /* COUNT */

  if (bikeCount) {

    bikeCount.textContent =
      `${visibleCount} Bikes available`;

  }


  /* NO RESULTS */

  if (noResults) {

    noResults.classList.toggle(
      "show",
      visibleCount === 0
    );

  }

}


/* ================= BIKE TYPE ================= */

document
  .querySelectorAll(
    'input[name="bikeType"]'
  )
  .forEach(checkbox => {

    checkbox.addEventListener(
      "change",
      () => {

        const all =
          document.querySelector(
            'input[name="bikeType"][value="all"]'
          );


        if (
          checkbox.value === "all" &&
          checkbox.checked
        ) {

          document
            .querySelectorAll(
              'input[name="bikeType"]'
            )
            .forEach(item => {

              if (item !== checkbox) {

                item.checked = false;

              }

            });

        }


        if (
          checkbox.value !== "all" &&
          checkbox.checked
        ) {

          if (all) {

            all.checked = false;

          }

        }


        const anySelected =
          Array.from(
            document.querySelectorAll(
              'input[name="bikeType"]'
            )
          )
          .some(
            item =>
              item.value !== "all" &&
              item.checked
          );


        if (
          !anySelected &&
          all
        ) {

          all.checked = true;

        }


        filterBikes();

      }
    );

  });


/* ================= FUEL ================= */

document
  .querySelectorAll(
    'input[name="fuelType"]'
  )
  .forEach(checkbox => {

    checkbox.addEventListener(
      "change",
      () => {

        const all =
          document.querySelector(
            'input[name="fuelType"][value="all"]'
          );


        if (
          checkbox.value === "all" &&
          checkbox.checked
        ) {

          document
            .querySelectorAll(
              'input[name="fuelType"]'
            )
            .forEach(item => {

              if (item !== checkbox) {

                item.checked = false;

              }

            });

        }


        if (
          checkbox.value !== "all" &&
          checkbox.checked
        ) {

          if (all) {

            all.checked = false;

          }

        }


        const anySelected =
          Array.from(
            document.querySelectorAll(
              'input[name="fuelType"]'
            )
          )
          .some(
            item =>
              item.value !== "all" &&
              item.checked
          );


        if (
          !anySelected &&
          all
        ) {

          all.checked = true;

        }


        filterBikes();

      }
    );

  });


/* ================= SEARCH FILTER ================= */

if (bikeSearch) {

  bikeSearch.addEventListener(
    "input",
    filterBikes
  );

}


/* ================= PRICE FILTER ================= */

if (priceRange) {

  priceRange.addEventListener(
    "input",
    () => {

      updatePriceText();

      filterBikes();

    }
  );

}


/* ================= AVAILABILITY ================= */

if (availableOnly) {

  availableOnly.addEventListener(
    "change",
    filterBikes
  );

}


/* ================= RATING ================= */

document
  .querySelectorAll(".rating-filter")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".rating-filter"
          )
          .forEach(btn => {

            btn.classList.remove(
              "active"
            );

          });


        button.classList.add(
          "active"
        );


        selectedRating =
          Number(
            button.dataset.rating
          );


        filterBikes();

      }
    );

  });


/* ================= SORT ================= */

if (sortSelect && bikeGrid) {

  sortSelect.addEventListener(
    "change",
    () => {

      const cards =
        Array.from(
          document.querySelectorAll(
            ".bike-card"
          )
        );


      cards.sort((a, b) => {

        const priceA =
          Number(
            a.dataset.price || 0
          );

        const priceB =
          Number(
            b.dataset.price || 0
          );


        const ratingA =
          Number(
            a.dataset.rating || 0
          );

        const ratingB =
          Number(
            b.dataset.rating || 0
          );


        if (
          sortSelect.value === "priceLow"
        ) {

          return priceA - priceB;

        }


        if (
          sortSelect.value === "priceHigh"
        ) {

          return priceB - priceA;

        }


        if (
          sortSelect.value === "rating"
        ) {

          return ratingB - ratingA;

        }


        return 0;

      });


      cards.forEach(card => {

        bikeGrid.appendChild(card);

      });


      filterBikes();

    }
  );

}


/* ================= SEARCH BUTTON ================= */

if (searchBtn) {

  searchBtn.addEventListener(
    "click",
    () => {

      const location =
        locationInput
          ? locationInput.value.trim()
          : "";


      if (
        location &&
        locationTitle
      ) {

        locationTitle.textContent =
          location.split(",")[0];

      }


      filterBikes();


      const listing =
        document.querySelector(
          ".listing-section"
        );


      if (listing) {

        listing.scrollIntoView({
          behavior: "smooth"
        });

      }

    }
  );

}


/* ================= CLEAR FILTERS ================= */

if (clearFilters) {

  clearFilters.addEventListener(
    "click",
    () => {


      /* SEARCH */

      if (bikeSearch) {

        bikeSearch.value = "";

      }


      /* PRICE */

      if (priceRange) {

        priceRange.value = "2000";

      }


      updatePriceText();


      /* BIKE TYPE */

      document
        .querySelectorAll(
          'input[name="bikeType"]'
        )
        .forEach(item => {

          item.checked =
            item.value === "all";

        });


      /* FUEL */

      document
        .querySelectorAll(
          'input[name="fuelType"]'
        )
        .forEach(item => {

          item.checked =
            item.value === "all";

        });


      /* RATING */

      selectedRating = 0;


      document
        .querySelectorAll(
          ".rating-filter"
        )
        .forEach(button => {

          button.classList.remove(
            "active"
          );


          if (
            button.dataset.rating === "0"
          ) {

            button.classList.add(
              "active"
            );

          }

        });


      /* AVAILABILITY */

      if (availableOnly) {

        availableOnly.checked = true;

      }


      filterBikes();

    }
  );

}


/* ================= FAVORITES ================= */

document
  .querySelectorAll(".favorite")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        button.classList.toggle(
          "liked"
        );


        button.textContent =
          button.classList.contains("liked")
            ? "♥"
            : "♡";

      }
    );

  });


/* ================= URL DATA ================= */

const urlParams =
  new URLSearchParams(
    window.location.search
  );


const urlLocation =
  urlParams.get("location");


const urlDate =
  urlParams.get("date");


const urlTime =
  urlParams.get("time");


if (
  urlLocation &&
  locationInput
) {

  locationInput.value =
    urlLocation;


  if (locationTitle) {

    locationTitle.textContent =
      urlLocation.split(",")[0];

  }

}


const pickupDate =
  document.getElementById(
    "pickupDate"
  );


const pickupTime =
  document.getElementById(
    "pickupTime"
  );


if (
  urlDate &&
  pickupDate
) {

  pickupDate.value =
    urlDate;

}


if (
  urlTime &&
  pickupTime
) {

  pickupTime.value =
    urlTime;

}


/* ================= DATE ================= */

if (pickupDate) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  pickupDate.min =
    today;

}


/* ================= INITIAL ================= */

updatePriceText();

filterBikes();


console.log(
  "RentoRide Bikes Page Ready"
);
