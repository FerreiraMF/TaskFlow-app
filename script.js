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
    const taskContent = document.createElement("div");
    taskContent.className = "task-content";
    const taskTitle = document.createElement("span");
    taskTitle.className = "task-title";

    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";
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
      taskCard.classList.add("task-completed");
    }

    taskContent.append(checkbox);
    taskContent.append(taskTitle);
    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    taskCard.appendChild(taskContent);
    taskCard.appendChild(taskActions);

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

function setActiveFilter(activebutton) {
  buttonPendingFilter.classList.remove("active");
  buttonAllFilter.classList.remove("active");
  buttonCompletedFilter.classList.remove("active");

  activebutton.classList.add("active");
}

buttonTask.addEventListener("click", addTask);

buttonPendingFilter.addEventListener("click", function () {
  currentFilter = "pending";
  renderTasks();
  setActiveFilter(buttonPendingFilter);
});

buttonAllFilter.addEventListener("click", function () {
  currentFilter = "all";
  renderTasks();
  setActiveFilter(buttonAllFilter);
});

buttonCompletedFilter.addEventListener("click", function () {
  currentFilter = "completed";
  renderTasks();
  setActiveFilter(buttonCompletedFilter);
});

loadTasks();
renderTasks();
setActiveFilter(buttonAllFilter);
