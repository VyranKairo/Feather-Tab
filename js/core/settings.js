(function () {
  const settingsModal = document.getElementById("settingsModal");
  const settingsTriggerBtn = document.getElementById("settingsTriggerBtn");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Inputs
  const themeDarkBtn = document.getElementById("themeDarkBtn");
  const themeLightBtn = document.getElementById("themeLightBtn");
  const frostedGlassToggle = document.getElementById("frostedGlassToggle");
  const bgUploadInput = document.getElementById("bgUploadInput");
  const resetBgBtn = document.getElementById("resetBgBtn");

  // GIF & Toast Elements
  const gifConfirmModal = document.getElementById("gifConfirmModal");
  const confirmGifBtn = document.getElementById("confirmGifBtn");
  const cancelGifBtn = document.getElementById("cancelGifBtn");
  const wallpaperToast = document.getElementById("wallpaperToast");

  // Clock Settings Elements
  const swatches = document.querySelectorAll("#clockColorSwatches .swatch");
  const clockHexInput = document.getElementById("clockHexInput");
  const clockOpacityInput = document.getElementById("clockOpacityInput");

  // Search Settings Elements
  const searchSwatches = document.querySelectorAll(
    "#searchColorSwatches .swatch",
  );
  const searchHexInput = document.getElementById("searchHexInput");
  const searchBgOpacityInput = document.getElementById("searchBgOpacityInput");

  // Advanced Tab Elements
  const appIcon = document.getElementById("appIcon");
  const tabTitleInput = document.getElementById("tabTitleInput");
  const tabIconUrlInput = document.getElementById("tabIconUrlInput");
  const tabIconFileInput = document.getElementById("tabIconFileInput");
  const resetTabInfoBtn = document.getElementById("resetTabInfoBtn");

  // Targets
  const clockContainer = document.querySelector(".clock-container");
  const searchInputElem = document.getElementById("searchInput");
  const inputContainerElem = document.querySelector(".input-container");

  let pendingFile = null;
  let toastTimeout = null;

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, duration = 0) {
    if (!wallpaperToast) return;
    wallpaperToast.textContent = message;
    wallpaperToast.classList.add("show");
    if (toastTimeout) clearTimeout(toastTimeout);
    if (duration > 0) {
      toastTimeout = setTimeout(() => {
        wallpaperToast.classList.remove("show");
      }, duration);
    }
  }

  // --- TAB NAVIGATION ---
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const targetTab = document.getElementById(btn.dataset.tab);
      if (targetTab) targetTab.classList.add("active");
    });
  });

  if (settingsTriggerBtn && settingsModal) {
    settingsTriggerBtn.addEventListener("click", () =>
      settingsModal.showModal(),
    );
  }
  if (closeSettingsBtn && settingsModal) {
    closeSettingsBtn.addEventListener("click", () => settingsModal.close());
  }

  // --- THEME MODE (LIGHT / DARK) ---
  function setTheme(mode) {
    if (mode === "light") {
      document.body.classList.add("light-mode");
      document.documentElement.classList.add("light-mode");
      if (themeLightBtn) themeLightBtn.classList.add("active");
      if (themeDarkBtn) themeDarkBtn.classList.remove("active");

      const savedColor = localStorage.getItem("clockColor");
      if (savedColor) {
        updateClockColor(savedColor);
      } else if (clockContainer) {
        clockContainer.style.color = "#1a1a1a";
        if (clockHexInput) clockHexInput.value = "1A1A1A";
      }
    } else {
      document.body.classList.remove("light-mode");
      document.documentElement.classList.remove("light-mode");
      if (themeDarkBtn) themeDarkBtn.classList.add("active");
      if (themeLightBtn) themeLightBtn.classList.remove("active");

      const savedColor = localStorage.getItem("clockColor");
      if (savedColor) {
        updateClockColor(savedColor);
      } else if (clockContainer) {
        clockContainer.style.color = "#ffffff";
        if (clockHexInput) clockHexInput.value = "FFFFFF";
      }
    }
    localStorage.setItem("appTheme", mode);
    updateWidgetBackgrounds();
  }

  if (themeDarkBtn)
    themeDarkBtn.addEventListener("click", () => setTheme("dark"));
  if (themeLightBtn)
    themeLightBtn.addEventListener("click", () => setTheme("light"));

  // --- WEBP CONVERSION & WALLPAPER SAVING ---
  function processAndApplyWallpaper(file) {
    showToast("Changing wallpaper...");

    const isGif =
      file.type === "image/gif" || file.name.toLowerCase().endsWith(".gif");

    if (isGif) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        document.body.style.backgroundImage = `url("${dataUrl}")`;
        localStorage.setItem("customBg", dataUrl);
        showToast("Done! Reload the tab to take effects if necessary.", 4000);
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          const webpDataUrl = canvas.toDataURL("image/webp", 0.9);
          document.body.style.backgroundImage = `url("${webpDataUrl}")`;
          localStorage.setItem("customBg", webpDataUrl);
          showToast("Done! Reload the tab to take effects if necessary.", 4000);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // --- BACKGROUND UPLOAD HANDLERS ---
  if (bgUploadInput) {
    bgUploadInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const isGif =
        file.type === "image/gif" || file.name.toLowerCase().endsWith(".gif");
      if (isGif) {
        pendingFile = file;
        if (gifConfirmModal) gifConfirmModal.showModal();
      } else {
        processAndApplyWallpaper(file);
      }
      bgUploadInput.value = "";
    });
  }

  if (confirmGifBtn) {
    confirmGifBtn.addEventListener("click", () => {
      if (gifConfirmModal) gifConfirmModal.close();
      if (pendingFile) {
        processAndApplyWallpaper(pendingFile);
        pendingFile = null;
      }
    });
  }

  if (cancelGifBtn) {
    cancelGifBtn.addEventListener("click", () => {
      if (gifConfirmModal) gifConfirmModal.close();
      pendingFile = null;
    });
  }

  if (resetBgBtn) {
    resetBgBtn.addEventListener("click", () => {
      const confirmReset = window.confirm(
        "This will instantly remove your current wallpaper and reset to the default. Do you wish to continue?",
      );

      if (confirmReset) {
        document.body.style.backgroundImage = "";
        localStorage.removeItem("customBg");
        const syncStyle = document.getElementById("sync-bg-style");
        if (syncStyle) syncStyle.remove();

        showToast("Done! Wallpaper reset to default.", 4000);
      }
    });
  }

  // --- CUSTOM CLOCK COLOR PICKER ---
  function updateClockColor(hexColor) {
    const cleanHex = hexColor.replace("#", "");
    if (cleanHex.length === 6) {
      const fullHex = `#${cleanHex}`;
      if (clockContainer) clockContainer.style.color = fullHex;
      if (clockHexInput) clockHexInput.value = cleanHex.toUpperCase();
      localStorage.setItem("clockColor", fullHex);

      swatches.forEach((swatch) => {
        if (swatch.dataset.color.toLowerCase() === fullHex.toLowerCase()) {
          swatch.classList.add("active");
        } else {
          swatch.classList.remove("active");
        }
      });
    }
  }

  swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      updateClockColor(swatch.dataset.color);
    });
  });

  if (clockHexInput) {
    clockHexInput.addEventListener("input", (e) => {
      const val = e.target.value.replace(/[^0-9A-Fa-f]/g, "");
      e.target.value = val;
      if (val.length === 6) {
        updateClockColor(`#${val}`);
      }
    });
  }

  if (clockOpacityInput) {
    clockOpacityInput.addEventListener("input", (e) => {
      if (clockContainer) clockContainer.style.opacity = e.target.value;
      localStorage.setItem("clockOpacity", e.target.value);
    });
  }

  // --- CUSTOM SEARCH COLOR PICKER ---
  function updateSearchColor(hexColor) {
    const cleanHex = hexColor.replace("#", "");
    if (cleanHex.length === 6) {
      const fullHex = `#${cleanHex}`;
      if (searchInputElem) searchInputElem.style.color = fullHex;
      if (searchHexInput) searchHexInput.value = cleanHex.toUpperCase();
      localStorage.setItem("searchTextColor", fullHex);

      searchSwatches.forEach((swatch) => {
        if (swatch.dataset.color.toLowerCase() === fullHex.toLowerCase()) {
          swatch.classList.add("active");
        } else {
          swatch.classList.remove("active");
        }
      });
    }
  }

  searchSwatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      updateSearchColor(swatch.dataset.color);
    });
  });

  if (searchHexInput) {
    searchHexInput.addEventListener("input", (e) => {
      const val = e.target.value.replace(/[^0-9A-Fa-f]/g, "");
      e.target.value = val;
      if (val.length === 6) {
        updateSearchColor(`#${val}`);
      }
    });
  }

  // --- INDIVIDUAL WIDGET TRANSPARENCY & GLASSMORPHISM ---
  function updateWidgetBackgrounds() {
    const isGlass = frostedGlassToggle ? frostedGlassToggle.checked : true;
    const isLight = document.body.classList.contains("light-mode");
    const searchAlpha = searchBgOpacityInput
      ? searchBgOpacityInput.value
      : "0.4";

    const widgets = [{ element: inputContainerElem, alpha: searchAlpha }];

    widgets.forEach(({ element, alpha }) => {
      if (!element) return;
      if (isGlass) {
        element.classList.remove("no-glass");
        element.style.backgroundColor = isLight
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(0, 0, 0, ${alpha})`;
      } else {
        element.classList.add("no-glass");
      }
    });
  }

  if (frostedGlassToggle) {
    frostedGlassToggle.addEventListener("change", (e) => {
      localStorage.setItem("frostedGlass", e.target.checked);
      updateWidgetBackgrounds();
    });
  }

  if (searchBgOpacityInput) {
    searchBgOpacityInput.addEventListener("input", (e) => {
      localStorage.setItem("searchAlpha", e.target.value);
      updateWidgetBackgrounds();
    });
  }

  // --- ADVANCED TAB ---
  if (tabTitleInput) {
    tabTitleInput.addEventListener("input", (e) => {
      const newTitle = e.target.value.trim() || "Feather Tab";
      document.title = newTitle;
      localStorage.setItem("tabTitle", newTitle);
    });
  }

  if (tabIconUrlInput) {
    tabIconUrlInput.addEventListener("input", (e) => {
      const url = e.target.value.trim() || "assets/icon/feather.png";
      if (appIcon) appIcon.href = url;
      localStorage.setItem("tabIcon", url);
    });
  }

  if (tabIconFileInput) {
    tabIconFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgUrl = event.target.result;
          if (appIcon) appIcon.href = imgUrl;
          if (tabIconUrlInput) tabIconUrlInput.value = imgUrl;
          localStorage.setItem("tabIcon", imgUrl);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (resetTabInfoBtn) {
    resetTabInfoBtn.addEventListener("click", () => {
      document.title = "Feather Tab";
      if (appIcon) appIcon.href = "assets/icon/feather.webp";
      if (tabTitleInput) tabTitleInput.value = "";
      if (tabIconUrlInput) tabIconUrlInput.value = "";
      localStorage.removeItem("tabTitle");
      localStorage.removeItem("tabIcon");
    });
  }

  // --- INITIALIZE SAVED PREFERENCES ---
  function initSettings() {
    const savedTheme = localStorage.getItem("appTheme") || "dark";
    setTheme(savedTheme);

    const savedBg = localStorage.getItem("customBg");
    if (savedBg) document.body.style.backgroundImage = `url("${savedBg}")`;

    const savedClockColor = localStorage.getItem("clockColor");
    if (savedClockColor) updateClockColor(savedClockColor);

    const savedClockOpacity = localStorage.getItem("clockOpacity");
    if (savedClockOpacity && clockContainer && clockOpacityInput) {
      clockContainer.style.opacity = savedClockOpacity;
      clockOpacityInput.value = savedClockOpacity;
    }

    const savedSearchColor = localStorage.getItem("searchTextColor");
    if (savedSearchColor) updateSearchColor(savedSearchColor);

    const savedGlass = localStorage.getItem("frostedGlass");
    if (savedGlass !== null && frostedGlassToggle) {
      frostedGlassToggle.checked = savedGlass === "true";
    }

    const savedSearchAlpha = localStorage.getItem("searchAlpha");
    if (savedSearchAlpha !== null && searchBgOpacityInput) {
      searchBgOpacityInput.value = savedSearchAlpha;
    }

    updateWidgetBackgrounds();

    // Advanced Settings
    const savedTitle = localStorage.getItem("tabTitle");
    if (savedTitle) {
      document.title = savedTitle;
      if (tabTitleInput) tabTitleInput.value = savedTitle;
    }

    const savedIcon = localStorage.getItem("tabIcon");
    if (savedIcon) {
      if (appIcon) appIcon.href = savedIcon;
      if (tabIconUrlInput) tabIconUrlInput.value = savedIcon;
    }

    requestAnimationFrame(() => {
      if (inputContainerElem) inputContainerElem.classList.add("is-loaded");
    });
  }

  initSettings();
})();
