addBtn = document.getElementById("add-btn");
modal = document.querySelector(".modals");
modalContent = document.querySelector(".modal-content");
habitForm = document.getElementById("habit-form");
habitNameInput = document.getElementById("habit-name");
habitContainer = document.querySelector(".habit-container");
addlabel = document.getElementById("label1");
categorySelect = document.getElementById("category");

let editingCard = null;

checkHabits();

addBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

habitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = habitNameInput.value;
    let category = document.getElementById("category").value;

    if (name === "") return;

    if (editingCard) {
        // update existing card
        editingCard.querySelector("h3").textContent = name;
        editingCard.querySelector(".category").textContent = category;
        editingCard = null; // reset editing
    } else {
        // create new card
        createhabitcard(name, category);
    }

    habitForm.reset();
    modal.style.display = "none";

    checkHabits();

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
    
    checkHabits();
  }
  
  function checkHabits() {
   if (habitContainer.children.length === 0) {
     addBtn.classList.remove("floating"); 
     addlabel.style.display = "block";   
   } else {
     addBtn.classList.add("floating"); 
     addlabel.style.display = "none";  
   }
 }

habitContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".habit-card");
    if (e.target.closest(".delete")) {
        card.remove();
        checkHabits();
    }
    else if (e.target.closest(".edit")) {
        editingCard = card;
         

        habitNameInput.value = card.querySelector("h3").textContent;
        categorySelect.value = card.querySelector(".category").textContent;
        modal.style.display = "flex";

        modal.querySelector("h2").textContent = "Edit Habit";
       document.getElementById("submit-btn").textContent = "Edit";

    }
});

habitContainer.addEventListener("click", (e)=>{
  if(e.target.classList.contains("day")){
     e.target.classList.toggle("completed");
     updateProgress(e.target.closest(".habit-card"));
  }
})

function updateProgress(card){
   const days = card.querySelectorAll(".day");
   const completed = card.querySelectorAll(".day.completed"); 
   const progress = card.querySelector(".progress");

   progress.style.width = `${(completed.length / days.length) * 100}%`;

   card.querySelector(".streak").textContent = `Streak : ${completed.length}`;

}













