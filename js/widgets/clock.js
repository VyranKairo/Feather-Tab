const day = document.getElementById("day");
const date = document.getElementById("date");
const time = document.getElementById("time");

function updateDay() {
  if (day) {
    day.textContent = new Date()
      .toLocaleDateString("en-GB", { weekday: "long" })
      .toUpperCase();
  }
}

function updateDate() {
  if (date) {
    const d = new Date();
    const dayNum = d.getDate();
    const month = d.toLocaleDateString("en-GB", { month: "long" });
    const year = d.getFullYear();
    date.textContent = `${dayNum} ${month} ${year}.`;
  }
}

function updateTime() {
  if (time) {
    time.textContent =
      " - " +
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " -";
  }
}

function updateClock() {
  updateDay();
  updateDate();
  updateTime();
}

updateClock();

const msUntilNextMinute =
  (60 - new Date().getSeconds()) * 1000 - new Date().getMilliseconds();

setTimeout(() => {
  updateClock();
  setInterval(updateClock, 60000);
}, msUntilNextMinute);
