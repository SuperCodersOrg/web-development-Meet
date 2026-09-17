let j = 0;

let icon1 = document.createElement("div");
icon1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-check-icon lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>`;

let icon2 = document.createElement("div");
icon2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;

const tasksContainer = document.getElementById("tasks-container");
const addTaskBtn = document.getElementById("add-task-btn");

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", addTask);
}

let tasks = getlocal();
for (let i = 0; i < tasks.length; i++) {
  displaytask(tasks[i].title, tasks[i].description);
}

function savelocal(task) {
 // localStorage.setItem("tasks", JSON.stringify(tasks));
  fetch("http://localhost:3370/addbtn",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(task)
  })
  .then((response)=>{
    if(!response.ok){
        throw new Error(`HTTP error:${response.status}`);
    }return response.json();
  }).catch((error)=>{
     console.error("Submission failed:", error);
  })
}

function getlocal() {
  let taskstring = localStorage.getItem("tasks");
  if (taskstring == null) return [];
  return JSON.parse(taskstring);
}

function addTask() {
  let titlebox = document.getElementById("title-box");
  let descriptionbox = document.getElementById("description-box");
  let titleboxvalue = titlebox.value;
  let descriptionboxvalue = descriptionbox.value;
  titlebox.value = "";
  descriptionbox.value = "";

  if (!titleboxvalue.trim() || !descriptionboxvalue.trim()) {
    Swal.fire({
      icon: "error",
      title: "Warning",
      text: "Something went wrong!",
      footer: '<a href="#">Input Box Cannot Be Empty</a>',
    });
    return;
  }

  displaytask(titleboxvalue.trim(), descriptionboxvalue.trim());
  let task = { title: titleboxvalue, description: descriptionboxvalue };
  tasks.push(task);
  savelocal(task);
}

function displaytask(titlevalue, descriptionvalue) {
  let index = j++;
  let newtask = document.createElement("div");
  newtask.classList = "border border-blue-200 p-4 bg-blue-100 rounded-lg shadow-sm transition-all";

  let id = new Date().getTime() + "-" + Math.floor(Math.random() * 1000);
  let date = new Date().toLocaleString();
  newtask.id = id;

  let btnid2 = "btn2-" + id;

  newtask.innerHTML = `
    <div class="flex flex-col gap-2">
      <p class="text-xl font-bold bg-blue-600 text-center text-white py-1 px-3 rounded">${titlevalue}</p>
      <p class="text-base text-gray-800 bg-white p-2 rounded border border-gray-200">${descriptionvalue}</p>
      <p class="text-xs text-gray-500 font-medium">${date}</p>
      <div class="flex items-center gap-3 mt-1">
        <button class="rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium text-sm px-4 py-2 cursor-pointer transition-all" onclick="deletetask('${id}', ${index})">DELETE</button>
        <button id="${btnid2}" class="bg-blue-600 text-white border rounded-lg p-2 flex items-center justify-center cursor-pointer transition-all" onclick="changeicon('${id}','${btnid2}')">${icon1.innerHTML}</button>
      </div>
    </div>`;

  tasksContainer.appendChild(newtask);
}

function deletetask(id, index) {
  let task = document.getElementById(id);
  task.remove();
  tasks.splice(index, 1);
  savelocal(tasks);
}

function change(id, btnid) {
  let task = document.getElementById(id);
  let button = document.getElementById(btnid);
  if (button.innerText == "Undone") {
    task.classList.remove("bg-blue-100", "bg-red-200");
    task.classList.add("bg-green-200");
    button.innerText = "Done";
    button.classList.remove("bg-red-600");
    button.classList.add("bg-green-600");
  } else {
    task.classList.remove("bg-green-200");
    task.classList.add("bg-red-200");
    button.innerText = "Undone";
    button.classList.remove("bg-green-600");
    button.classList.add("bg-red-600");
  }
}

function changeicon(id, btnid) {
  let task = document.getElementById(id);
  let button = document.getElementById(btnid);

  if (task.classList.contains("bg-green-200")) {
    task.classList.remove("bg-green-200");
    task.classList.add("bg-red-200");
    button.innerHTML = icon2.innerHTML;
    button.classList.remove("bg-green-600");
    button.classList.add("bg-red-600");
  } else {
    task.classList.remove("bg-red-200", "bg-blue-100");
    task.classList.add("bg-green-200");
    button.innerHTML = icon1.innerHTML;
    button.classList.remove("bg-red-600");
    button.classList.add("bg-green-600");
  }
}