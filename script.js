// DECLARATIONS OF ALL VARIABLES AND DOC SELECTORS

let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".closeForm");

const form = document.querySelector("form");

const imageUrlInput = form.querySelector(
  "input[placeholder='https://example.com/photo.jpg']",
);
const fullNameInput = form.querySelector(
  "input[placeholder='Enter full name']",
);
const homeTownInput = form.querySelector(
  "input[placeholder='Enter home town']",
);
const purposeInput = form.querySelector(
  "input[placeholder='e.g., Quick appointment note']",
);

const categoryRadios = form.querySelectorAll("input[name='category']");

let submitBtn = document.querySelector(".submit-btn");

const stack = document.querySelector(".stack");

// MAIN CODE

function saveToLocalStorage(obj) {
  if (!localStorage.getItem("tasks")) {
    let oldTasks = [];
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  } else {
    let oldTasks = localStorage.getItem("tasks");
    oldTasks = JSON.parse(oldTasks);
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  }
}

addNote.addEventListener("click", () => {
  formContainer.style.display = "initial";
});

closeForm.addEventListener("click", () => {
  formContainer.style.display = "none";
});

form.addEventListener("submit", (det) => {
  det.preventDefault();

  const imageUrl = imageUrlInput.value.trim();
  const fullName = fullNameInput.value.trim();
  const homeTown = homeTownInput.value.trim();
  const purpose = purposeInput.value.trim();

  if (imageUrl === "") {
    alert("Please enter an Image URL.");
    return;
  }

  if (fullName === "") {
    alert("Please enter your Full Name.");
    return;
  }

  if (homeTown === "") {
    alert("Please enter your Home Town.");
    return;
  }

  if (purpose === "") {
    alert("Please enter the Purpose.");
    return;
  }

  let selected = false;
  categoryRadios.forEach((cat) => {
    if (cat.checked) {
      selected = cat.value;
    }
  });

  if (!selected) {
    alert("Please select a category");
    return;
  }

  saveToLocalStorage({
    imageUrl,
    fullName,
    homeTown,
    purpose,
    selected,
  });

  form.reset();
  formContainer.style.display = "none";
  showCards();
});

function showCards() {
  stack.innerHTML = "";

  let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (allTasks.length === 0) {
    const emptyMsg = document.createElement("h2");
    emptyMsg.classList.add(".empty-msg");
    emptyMsg.innerText = "No Notes Yet";

    const Instruct1 = document.createElement("h3");
    Instruct1.classList.add(".empty-msg");
    Instruct1.innerText = "Click + button to";

    const Instruct2 = document.createElement("h3");
    Instruct2.classList.add(".empty-msg");
    Instruct2.innerText = "create your first note";

    stack.appendChild(emptyMsg);
    stack.appendChild(Instruct1);
    stack.appendChild(Instruct2);
    return;
  }

  allTasks.reverse().forEach(function (task) {
    // Create card container
    const card = document.createElement("div");
    card.classList.add("card");

    // Avatar image
    const avatar = document.createElement("img");
    avatar.src = task.imageUrl;
    avatar.alt = "profile";
    avatar.classList.add("avatar");

    avatar.onerror = function () {
      this.onerror = null;
      this.src = "avatar.jpg";
    };

    card.appendChild(avatar);

    // Name
    const name = document.createElement("h2");
    name.textContent = task.fullName;
    card.appendChild(name);

    // Info: Home town
    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");

    const hometownLabel = document.createElement("span");
    hometownLabel.textContent = "Home town :";
    const hometownValue = document.createElement("span");
    hometownValue.textContent = task.homeTown;

    hometownInfo.appendChild(hometownLabel);
    hometownInfo.appendChild(hometownValue);
    card.appendChild(hometownInfo);

    // Info: Bookings
    const bookingsInfo = document.createElement("div");
    bookingsInfo.classList.add("info");

    const bookingsLabel = document.createElement("span");
    bookingsLabel.textContent = "Purpose :";
    const bookingsValue = document.createElement("span");
    bookingsValue.textContent = task.purpose;

    bookingsInfo.appendChild(bookingsLabel);
    bookingsInfo.appendChild(bookingsValue);
    card.appendChild(bookingsInfo);

    // Buttons container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    // Call button
    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

    // Message button
    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);

    card.appendChild(buttonsDiv);

    stack.appendChild(card); 
  });

  updateStack();
}

showCards();


function updateStack() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    if (index < 3) {
      card.style.zIndex = 3 - index;

      card.style.transform = `translateY(${index * 10}px)
        scale(${1 - index * 0.02})`;

      card.style.opacity = 1 - index * 0.02;
    } else {
      card.style.opacity = 0;

      card.style.zIndex = 0;

      card.style.transform = "translateY(0)";
    }
  });
}

upBtn.addEventListener("click", () => {
  let lastChild = stack.lastElementChild;
  if (lastChild) {
    stack.insertBefore(lastChild, stack.firstElementChild);
    updateStack();
  }
});

downBtn.addEventListener("click", () => {
  const firstChild = stack.firstElementChild;
  if (firstChild) {
    stack.appendChild(firstChild);
    updateStack();
  }
});
