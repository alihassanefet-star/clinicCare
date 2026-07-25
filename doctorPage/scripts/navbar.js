document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadComponent("navbarContainer", "components/navbar.html"),
    loadComponent("footerContainer", "components/footer.html"),
  ]);

  highlightActiveLink();
  updateFooterYear();
});

async function loadComponent(elementId, filepath) {
  const container = document.getElementById(elementId);

  if (!container) return false;

  try {
    const response = await fetch(filepath);

    if (!response.ok) {
      throw new Error(`Failed to load ${filepath}`);
    }

    container.innerHTML = await response.text();
    return true;
  } catch (error) {
    console.error(`Error loading ${filepath}:`, error);
    return false;
  }
}

function highlightActiveLink() {
  let currentPage = window.location.pathname.split("/").pop();

  if (!currentPage) {
    currentPage = "home.html";
  }

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    const page = href.split("/").pop();

    if (page === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function updateFooterYear() {
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}