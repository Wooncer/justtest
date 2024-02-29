const calendar = document.querySelector(".calendar");
const calendarHeader = calendar.querySelector(".calendar-header");
const monthYear = calendarHeader.querySelector(".month-year");
const prevMonthBtn = calendarHeader.querySelector(".prev-month");
const nextMonthBtn = calendarHeader.querySelector(".next-month");
const calendarWeekdays = calendar.querySelector(".calendar-weekdays");
const calendarDays = calendar.querySelector(".calendar-days");

let currentDate = new Date();

function updateCalendar() {
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const dayOfWeek = firstDayOfMonth.getDay();

  monthYear.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  calendarDays.innerHTML = "";

  for (let i = dayOfWeek - 1; i >= 0; i--) {
    const day = document.createElement("div");
    day.textContent = daysInPreviousMonth - i;
    day.classList.add("previous-month", "inactive");
    calendarDays.appendChild(day);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.textContent = i;
    if (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()) {
      day.classList.add("today");
    }
    calendarDays.appendChild(day);
  }

  const remainingDays = 42 - (dayOfWeek + daysInMonth);
  for (let i = 1; i <= remainingDays; i++) {
    const day = document.createElement("div");
    day.textContent = i;
    day.classList.add("next-month", "inactive");
    calendarDays.appendChild(day);
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

updateCalendar();

calendarDays.addEventListener("click", (e) => {
  if (!e.target.matches(".calendar-days div") || e.target.classList.contains("inactive")) return;

  const selectedDate = e.target.textContent;
  const selectedMonth = currentDate.getMonth() + 1;
  const selectedYear = currentDate.getFullYear();

  const confirmation = confirm(`Вы выбрали дату: ${selectedDate}-${selectedMonth}-${selectedYear}. Подтвердите выбор?`);
  if (confirmation) {
    // Здесь можно добавить логику передачи выбранной даты в бота
    console.log(`Дата: ${selectedDate}-${selectedMonth}-${selectedYear}`);
  }
});
