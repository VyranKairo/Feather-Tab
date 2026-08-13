document.addEventListener("DOMContentLoaded", () => {
  // 1. Make body visible immediately!
  document.body.classList.add("loaded");

  const pickerBtn = document.getElementById("pickerBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const currentEngineIcon = document.getElementById("currentEngineIcon");

  let currentEngine = "google";

  const engines = {
    google: {
      icon: "assets/icon/google.webp",
      url: "https://www.google.com/search?q=",
    },
    brave: {
      icon: "assets/icon/brave.webp",
      url: "https://search.brave.com/search?q=",
    },
    duckduckgo: {
      icon: "assets/icon/duckduckgo.webp",
      url: "https://duckduckgo.com/?q=",
    },
    bing: {
      icon: "assets/icon/bing.webp",
      url: "https://www.bing.com/search?q=",
    },
  };

  function setEngine(engineKey) {
    if (!engines[engineKey]) return;
    currentEngine = engineKey;
    currentEngineIcon.src = engines[engineKey].icon;
    currentEngineIcon.alt = engineKey;
  }

  // 2. Load saved engine synchronously on startup
  const savedEngine = localStorage.getItem("savedEngine");
  if (savedEngine && engines[savedEngine]) {
    setEngine(savedEngine);
  }

  // Toggle dropdown
  pickerBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  // Close dropdown on outside click
  document.addEventListener("click", (event) => {
    if (
      !dropdownMenu.contains(event.target) &&
      !pickerBtn.contains(event.target)
    ) {
      dropdownMenu.classList.remove("active");
    }
  });

  // Select engine & save choice
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", () => {
      const selected = item.dataset.engine;
      setEngine(selected);
      localStorage.setItem("savedEngine", selected);
      dropdownMenu.classList.remove("active");
    });
  });

  function executeSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    const baseUrl = engines[currentEngine].url;
    window.location.href = baseUrl + encodeURIComponent(query);
  }

  searchBtn.addEventListener("click", executeSearch);

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      executeSearch();
    }
  });
});
