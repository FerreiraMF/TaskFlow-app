const inputTask = document.querySelector("#input-task");

const buttonTask = document.querySelector("#add-task");

const buttonAllFilter = document.querySelector("#all-task");
const buttonPendingFilter = document.querySelector("#pending-task");
const buttonCompletedFilter = document.querySelector("#completed-task");

let tasks = [];

let currentFilter = "all";

const taskListElement = document.querySelector(".task-list");

function addTask() {
  const task = inputTask.value.trim();

  if (task === "") {
    alert("Descreva a tarefa!");
    return;
  }

  const newTask = {
    id: crypto.randomUUID(),
    title: task,
    completed: false,
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();

  inputTask.value = "";
  inputTask.focus();
}

function renderTasks() {
  taskListElement.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "pending") {
    filteredTasks = tasks.filter(function (task) {
      return task.completed === false;
    });
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(function (task) {
      return task.completed === true;
    });
  }

  filteredTasks.forEach(function (task) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;

      saveTasks();
      renderTasks();
    });

    const taskCard = document.createElement("div");
    taskCard.className = "task-card";
    const taskTitle = document.createElement("span");
    taskTitle.className = "task-title";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";

    const editButton = document.createElement("button");
    editButton.className = "edit-button";

    checkbox.checked = task.completed;
    taskTitle.innerText = task.title;
    deleteButton.innerText = "Excluir";
    editButton.innerText = "Editar";
    if (task.completed) {
      taskTitle.classList.add("completed");
    }

    taskCard.append(checkbox);
    taskCard.append(taskTitle);
    taskCard.appendChild(editButton);
    taskCard.appendChild(deleteButton);

    taskListElement.appendChild(taskCard);

    deleteButton.addEventListener("click", function () {
      const taskIndex = tasks.findIndex(function (currentTask) {
        return currentTask.id === task.id;
      });

      tasks.splice(taskIndex, 1);

      saveTasks();
      renderTasks();
    });

    editButton.addEventListener("click", function () {
      const newTitle = prompt("Editar tarefa: ", task.title);

      if (newTitle === null || newTitle.trim() === "") {
        return;
      }

      task.title = newTitle.trim();

      saveTasks();
      renderTasks();
    });
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks !== null) {
    tasks = JSON.parse(savedTasks);
  }
}

buttonTask.addEventListener("click", addTask);

buttonPendingFilter.addEventListener("click", function () {
  currentFilter = "pending";
  renderTasks();
  console.log(currentFilter);
});

buttonAllFilter.addEventListener("click", function () {
  currentFilter = "all";
  renderTasks();
  console.log(currentFilter);
});

buttonCompletedFilter.addEventListener("click", function () {
  currentFilter = "completed";
  renderTasks();
  console.log(currentFilter);
});

loadTasks();
renderTasks();
