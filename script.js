addBtn = document.getElementById("add-btn");
modal = document.querySelector(".modals");
modalContent = document.querySelector(".modal-content");
habitForm = document.getElementById("habit-form");
habitNameInput = document.getElementById("habit-name");
habitContainer = document.querySelector(".habit-container");

addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

habitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = habitNameInput.value;
  let category = document.getElementById("category").value;

  if (name.trim() !== "") {
    createhabitcard(name, category);
  }

  habitNameInput.value = "";
  modal.style.display = "none";
});

function createhabitcard(name, category) {
  let html = `
    <div class="habit-card">
      <div class="habit-top">
        <h3>${name}</h3>
        <span class="category">${category}</span>
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
        <span class="streak">Streak :</span>
        <div class="actions">
          <button class="edit"><img width="25" src="edit.png" alt=""></button>
          <button class="delete"><img width="25" src="delete.png" alt=""></button>
        </div>
      </div>
    </div>`;

  habitContainer.insertAdjacentHTML("beforeend", html);
}
