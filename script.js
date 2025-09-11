// selectors
const addBtn = document.getElementById("add-btn");
const modal = document.querySelector(".modals");
const modalContent = document.querySelector(".modal-content");
const habitForm = document.getElementById("habit-form");
const habitNameInput = document.getElementById("habit-name");
const habitContainer = document.querySelector(".habit-container");
const addlabel = document.getElementById("label1");
const categorySelect = document.getElementById("category");

let editingCard = null;

// LocalStorage setup

const storageKey = "trackify001";
let habits = [];

// --------------------- STORAGE FUNCTIONS ---------------------

function savehabits() {
  localStorage.setItem(storageKey, JSON.stringify(habits));
}

function loadhabits() {
  const raw = localStorage.getItem(storageKey);
  if (raw) {
    habits = JSON.parse(raw);
  } else {
    habits = [];
  }
}

// --------------------- UI FUNCTIONS ---------------------

function checkHabits() {
  if (habitContainer.children.length === 0) {
    addBtn.classList.remove("floating");
    addlabel.style.display = "block";
  } else {
    addBtn.classList.add("floating");
    addlabel.style.display = "none";
  }
}

function createhabitcard(habit) {
  let html = `
    <div class="habit-card" data-id="${habit.id}">
      <div class="habit-top">
        <h3>${habit.name}</h3>
        <span class="category">${habit.category}</span>
      </div>
      <div class="habit-days">
        <button class="day">M</button>
        <button class="day">T</button>
        <button class="day">W</button>
        <button class="day">T</button>
        <button class="day">F</button>
        <button class="day">S</button>
        <button class="day">S</button>
      </div>
      <div class="progress-bar">
        <div class="progress"></div>
      </div>
      <div class="habit-bottom">
        <span class="streak">Streak : 0</span>
        <div class="actions">
          <button class="edit"><img width="25" src="edit.png" alt=""></button>
          <button class="delete"><img width="25" src="delete.png" alt=""></button>
        </div>
      </div>
    </div>`;

  habitContainer.insertAdjacentHTML("beforeend", html);
  checkHabits();
}

// --------------------- EVENT HANDLERS ---------------------

// open modal
addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// form submit (add or edit habit)
habitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = habitNameInput.value;
  let category = categorySelect.value;

  if (name === "") return;

  if (editingCard) {
    // update existing card
    const id = editingCard.dataset.id;
    const habit = habits.find((h) => h.id === id);
    habit.name = name;
    habit.category = category;

    editingCard.querySelector("h3").textContent = name;
    editingCard.querySelector(".category").textContent = category;

    editingCard = null; // reset editing
  } else {
    // create new habit
    const habit = {
      id: Date.now().toString(),
      name: name,
      category: category,
      days: [false, false, false, false, false, false, false],
    };

    habits.push(habit);
    createhabitcard(habit);
  }

  savehabits();
  habitForm.reset();
  modal.style.display = "none";
  checkHabits();
});

// edit / delete
habitContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".habit-card");
  if (!card) return;

  if (e.target.closest(".delete")) {
    const id = card.dataset.id;
    habits = habits.filter((h) => h.id !== id);
    card.remove();
    savehabits();
    checkHabits();
  } else if (e.target.closest(".edit")) {
    editingCard = card;

    habitNameInput.value = card.querySelector("h3").textContent;
    categorySelect.value = card.querySelector(".category").textContent;
    modal.style.display = "flex";

   modal.querySelector("h2").textContent = "Edit Habit";
   document.getElementById("submit-btn").textContent = "Edit";
  }


});

// day click
habitContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("day")) {
    e.target.classList.toggle("completed");
    updateProgress(e.target.closest(".habit-card"));
  }
});

function updateProgress(card) {
  const days = card.querySelectorAll(".day");
  const completed = card.querySelectorAll(".day.completed");
  const progress = card.querySelector(".progress");

  progress.style.width = `${(completed.length / days.length) * 100}%`;
  card.querySelector(".streak").textContent = `Streak : ${completed.length}`;
}

// --------------------- INIT ---------------------

loadhabits();
habits.forEach((habit) => createhabitcard(habit));
checkHabits();
