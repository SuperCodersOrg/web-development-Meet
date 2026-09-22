const tasksContainer = document.getElementById("tasks-container");
const addTaskBtn = document.getElementById("add-task-btn");

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", addTask);
}

loadTasks();

function loadTasks(e) {
  if (e) e.preventDefault();
  fetch("http://localhost:3370/addtask")
    .then((res) => res.json())
    .then((data) => {
      tasksContainer.innerHTML = "";
      if (Array.isArray(data)) {
        data.forEach((task) => renderTask(task));
      }
    })
    .catch((err) => console.error("Error loading tasks:", err));
}

function addTask(e) {
  if (e) e.preventDefault();
  const titleBox = document.getElementById("title-box");
  const descBox = document.getElementById("description-box");

  const titleVal = titleBox.value.trim();
  const descVal = descBox.value.trim();

  if (!titleVal || !descVal) {
    alert("plz fill both inputs!");
    return;
  }

  const newTask = {
    id: "task_" + Date.now(),
    title: titleVal,
    description: descVal,
    date: new Date().toLocaleString(),
    isDone: false,
    isDeleted: false,
  };

  fetch("http://localhost:3370/addbtn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  })
    .then((res) => res.json())
    .then(() => {
      renderTask(newTask);
      titleBox.value = "";
      descBox.value = "";
    })
    .catch((err) => console.error("Error adding task:", err));
}

function renderTask(task) {
  const card = document.createElement("div");
  card.id = task.id;

  if (task.isDone) {
    card.className = "border border-green-400 p-4 bg-green-200 rounded-xl shadow-sm transition-all";
  } else {
    card.className = "border border-blue-200 p-4 bg-blue-100 rounded-xl shadow-sm transition-all";
  }

  const btnText = task.isDone ? "Done" : "Undone";
  const btnColor = task.isDone ? "bg-green-600" : "bg-red-600";

  card.innerHTML = `
    <div class="flex flex-col gap-2">
      <p id="title-${task.id}" class="text-xl font-bold bg-blue-600 text-white text-center p-1 rounded">${task.title}</p>
      <p id="desc-${task.id}" class="bg-white p-2 rounded text-gray-800">${task.description}</p>
      <p class="text-xs text-gray-500">${task.date}</p>
      <div class="flex gap-2 mt-2">
        <button onclick="handleDelete('${task.id}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded cursor-pointer">DELETE</button>
        <button onclick="handleEdit('${task.id}')" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded cursor-pointer">EDIT</button>
        <button id="btn-${task.id}" onclick="handleToggle('${task.id}')" class="${btnColor} text-white px-3 py-1.5 rounded cursor-pointer font-bold">${btnText}</button>
      </div>
    </div>
  `;

  tasksContainer.appendChild(card);
}


function handleDelete(id) {
  fetch("http://localhost:3370/task/delete/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      const card = document.getElementById(id);
      if (card) {
        card.remove();
      }
    })
    .catch((err) => console.error("Delete failed:", err));
}

function handleToggle(id) {
  const card = document.getElementById(id);
  const btn = document.getElementById("btn-" + id);

  const isCurrentlyDone = btn.innerText.trim() === "Done";
  const nextStatus = !isCurrentlyDone;

  fetch("http://localhost:3370/task/status/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDone: nextStatus }),
  })
    .then((res) => res.json())
    .then(() => {
      if (nextStatus) {
        card.className = "border border-green-400 p-4 bg-green-200 rounded-xl shadow-sm transition-all";
        btn.innerText = "Done";
        btn.className = "bg-green-600 text-white px-3 py-1.5 rounded cursor-pointer font-bold";
      } else {
        card.className = "border border-blue-200 p-4 bg-blue-100 rounded-xl shadow-sm transition-all";
        btn.innerText = "Undone";
        btn.className = "bg-red-600 text-white px-3 py-1.5 rounded cursor-pointer font-bold";
      }
    })
    .catch((err) => console.error("Toggle failed:", err));
}

function handleEdit(id) {
  const titleEl = document.getElementById("title-" + id);
  const descEl = document.getElementById("desc-" + id);

  const newTitle = prompt("New title :", titleEl.innerText);
  if (!newTitle || newTitle.trim() === "") return;

  const newDesc = prompt("New description :", descEl.innerText);
  if (!newDesc || newDesc.trim() === "") return;

  fetch("http://localhost:3370/task/edit/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newTitle.trim(),
      description: newDesc.trim(),
    }),
  })
    .then((res) => res.json())
    .then(() => {
      titleEl.innerText = newTitle.trim();
      descEl.innerText = newDesc.trim();
    })
    .catch((err) => console.error("Edit failed:", err));
}