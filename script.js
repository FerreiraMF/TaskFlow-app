const inputTask = document.querySelector("#input-task");

const buttonTask = document.querySelector("#add-task");

const tasks = [];

const taskListElement = document.querySelector(".task-list");

function addTask() {
  const task = inputTask.value.trim();

  if (task === "") {
    alert("Descreva a tarefa!");
    return;
  }

  const newTask = {
    title: task,
    completed: false,
  };

  tasks.push(newTask);
  renderTasks();

  inputTask.value = "";
  inputTask.focus();
}

function renderTasks() {
  taskListElement.innerHTML = "";

  tasks.forEach(function (task) {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";

    taskCard.innerText = task.title;

    taskListElement.appendChild(taskCard);
  });
}

buttonTask.addEventListener("click", addTask);
