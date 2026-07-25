let doctors = [];

let searchInput = document.getElementById("searchInput");
let specializationFilter = document.getElementById("specializationFilter");
let sortDoctors = document.getElementById("sortDoctors");

let doctorList = document.getElementById("doctorList");
let doctorCount = document.getElementById("doctorCount");
let averageRating = document.getElementById("avgRatingText");

let loadingState = document.getElementById("loadingState");
let emptyState = document.getElementById("emptyState");

function showLoading() {
  loadingState.classList.remove("d-none");
  doctorList.classList.add("d-none");
  emptyState.classList.add("d-none");
}

function hideLoading() {
  loadingState.classList.add("d-none");
}

function showEmptyState() {
  emptyState.classList.remove("d-none");
  doctorList.classList.add("d-none");
}

function showDoctors() {
  emptyState.classList.add("d-none");
  doctorList.classList.remove("d-none");
}

function updateStatistics(list) {
  doctorCount.textContent =
    list.length + " Doctor" + (list.length != 1 ? "s" : "") + " Found";

  if (list.length == 0) {
    averageRating.textContent = "";
    return;
  }

  let totalRating = 0;

  for (let i = 0; i < list.length; i++) {
    totalRating += Number(list[i].rating);
  }

  let average = (totalRating / list.length).toFixed(1);

  averageRating.textContent = "Average Rating ⭐ " + average;
}

async function fetchDoctors() {
  showLoading();

  const response = await fetch("./data/doctors.json");

  doctors = await response.json();

  applyFilters();

  hideLoading();
}

function filterDoctors() {
  let searchValue = searchInput.value.toLowerCase().trim();

  let specialization = specializationFilter.value;

  let filteredDoctors = doctors.filter(function (doctor) {
    let matchName = doctor.name.toLowerCase().includes(searchValue);

    let matchSpecialization =
      specialization == "" || doctor.specialization == specialization;

    return matchName && matchSpecialization;
  });

  return filteredDoctors;
}

function sortDoctorList(list) {
  let sortedDoctors = [...list];

  if (sortDoctors.value == "rating-desc") {
    sortedDoctors.sort(function (a, b) {
      return b.rating - a.rating;
    });
  } else if (sortDoctors.value == "exp-desc") {
    sortedDoctors.sort(function (a, b) {
      return b.experience - a.experience;
    });
  } else {
    sortedDoctors.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  return sortedDoctors;
}

function createDoctorCard(doctor) {
  return `
    <div class="col-md-6 col-lg-4">

      <article class="card h-100 shadow-sm border-0 doctor-card">

        <div class="card-body text-center">

          <img
            src="${doctor.image || "images/default-avatar.png"}"
            class="doctor-img rounded-circle mb-3"
            alt="${doctor.name}">

          <h3 class="h5 fw-bold">${doctor.name}</h3>

          <p class="text-primary fw-semibold">
            ${doctor.specialization}
          </p>

          <p class="text-muted small">
            ${doctor.biography || "No biography available."}
          </p>

          <div class="d-flex justify-content-center gap-3 mb-3">

            <span>
              <i class="fa-solid fa-star text-warning"></i>
              ${doctor.rating}
            </span>

            <span>
              <i class="fa-solid fa-briefcase text-primary"></i>
              ${doctor.experience} Years
            </span>

          </div>

          <div class="d-flex flex-column gap-2">

           

         
          </div>

        </div>

      </article>

    </div>
  `;
}

function renderDoctors(list) {
  updateStatistics(list);

  if (list.length == 0) {
    showEmptyState();
    doctorList.innerHTML = "";
    return;
  }

  showDoctors();

  let cards = "";

  for (let i = 0; i < list.length; i++) {
    cards += createDoctorCard(list[i]);
  }

  doctorList.innerHTML = cards;
}

function applyFilters() {
  let filteredDoctors = filterDoctors();

  let sortedDoctors = sortDoctorList(filteredDoctors);

  renderDoctors(sortedDoctors);
}

function setupEventListeners() {
  searchInput.addEventListener("input", applyFilters);

  specializationFilter.addEventListener("change", applyFilters);

  sortDoctors.addEventListener("change", applyFilters);
}

async function init() {
  setupEventListeners();

  await fetchDoctors();
}

document.addEventListener("DOMContentLoaded", init);