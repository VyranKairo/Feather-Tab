const DEFAULT_SITES = [
  { title: "YouTube", url: "https://www.youtube.com", icon: "" },
  { title: "Facebook", url: "https://www.facebook.com", icon: "" },
  { title: "Gmail", url: "https://mail.google.com", icon: "" },
  { title: "Instagram", url: "https://www.instagram.com", icon: "" },
];

let topSites =
  JSON.parse(localStorage.getItem("dashboard_topsites")) || DEFAULT_SITES;

const grid = document.getElementById("topsiteGrid");
const modal = document.getElementById("addSiteModal");
const form = document.getElementById("addSiteForm");
const closeModalBtn = document.getElementById("closeModalBtn");

function getFaviconUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
      parsedUrl.origin,
    )}&size=64`;
  } catch (e) {
    return "";
  }
}

function renderTopSites() {
  if (!grid) return;
  grid.innerHTML = "";

  topSites.forEach((site, index) => {
    const tile = document.createElement("a");
    tile.href = site.url;
    tile.className = "topsite-tile";

    const iconSrc = getFaviconUrl(site.url);

    tile.innerHTML = `
      <button
        class="topsite-remove"
        data-index="${index}"
        title="Remove"
      >✕</button>

      <div class="topsite-icon">
        <img
          src="${iconSrc}"
          alt="${site.title}"
          onerror="this.style.display='none'"
        />
      </div>

      <span class="topsite-title">${site.title}</span>
    `;

    grid.appendChild(tile);
  });

  const addButton = document.createElement("button");
  addButton.className = "topsite-tile topsite-add";
  addButton.innerHTML = `
    <div class="topsite-icon">
      <span class="add-plus">+</span>
    </div>
    <span class="topsite-title">Add shortcut</span>
  `;

  addButton.addEventListener("click", () => {
    if (modal) modal.showModal();
  });

  grid.appendChild(addButton);
}

if (grid) {
  grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("topsite-remove")) {
      e.preventDefault();
      e.stopPropagation();

      const index = parseInt(e.target.dataset.index, 10);

      if (!Number.isNaN(index)) {
        topSites.splice(index, 1);
        saveAndRender();
      }
    }
  });
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("siteTitle");
    const urlInput = document.getElementById("siteUrl");

    const title = titleInput ? titleInput.value.trim() : "";
    let url = urlInput ? urlInput.value.trim() : "";

    if (!url) return;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    topSites.push({
      title,
      url,
      icon: "",
    });

    saveAndRender();

    form.reset();
    if (modal) modal.close();
  });
}

if (closeModalBtn && modal) {
  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });
}

function saveAndRender() {
  localStorage.setItem("dashboard_topsites", JSON.stringify(topSites));
  renderTopSites();
}

renderTopSites();
