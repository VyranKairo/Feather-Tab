(() => {
  const savedTheme = localStorage.getItem("appTheme") || "dark";
  const savedBg = localStorage.getItem("customBg");
  const savedTitle = localStorage.getItem("tabTitle");
  const savedIcon = localStorage.getItem("tabIcon");

  if (savedTitle) document.title = savedTitle;

  if (savedIcon) {
    const iconEl = document.getElementById("appIcon");
    if (iconEl) iconEl.href = savedIcon;
  }

  if (savedTheme === "light") {
    document.documentElement.classList.add("light-mode");
  }

  if (savedBg) {
    const style = document.createElement("style");
    style.id = "sync-bg-style";
    style.textContent = `body { background-image: url("${savedBg}") !important; }`;
    document.head.appendChild(style);
  }
})();
