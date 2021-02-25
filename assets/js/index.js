const myRegExp = /\w/;
let isValid = false;
let num = 0;

// Поле ввода
const inputTaskElem = document.querySelector('input[name="task"]');
inputTaskElem.oninput = onInputHandler;

// Кнопка добавления
const createTaskButtonElem = document.getElementById("createTaskButton");
createTaskButtonElem.addEventListener("click", onCreateTask);

// Кнопка удаления
const deleteTaskButtonElem = document.getElementById("deleteTaskButton");
deleteTaskButtonElem.addEventListener("click", onDeleteTask);

// Список задач
const tasksListElem = document.getElementById("tasksList");

// Действие при нажатии Добавить
function onCreateTask(event) {
  addTaskInput(inputTaskElem.value);
  inputTaskElem.value = "";
}

// Действие при нажатии Удалить
function onDeleteTask(event) {
  console.log(event);
  document.querySelectorAll('.task-selected').forEach(e => e.remove());
}

// Считывание таска и добавление в список
function addTaskInput(value) {
  if (value) {
    num++;

    // Создание элемента LI
    const li = document.createElement("li");
    const liClass = "task-item-" + num;
    li.setAttribute("id", liClass);
    li.classList.add("task-item");

    // Создание LABEL
    const task = document.createElement("label");

    // Наполнение текстом
    task.innerHTML =
      '<input type="checkbox" id="task-checkbox" onClick="itemSelected(\''+liClass+'\')" class="task-checkbox"><span class="task-text">' +
      value +
      "</span>";

    // Добавление времени
    task.append(addTimeTask());

    // Добавляем всё в тег LI
    li.appendChild(task);

    // Добавляем все в список UL
    tasksListElem.appendChild(li);
  }
  return;
}

// Время добавления
function addTimeTask() {
  const timeElement = document.createElement("span");
  timeElement.classList.add("task-time");
  const time = new Date();
  timeElement.textContent =
    time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  return timeElement;
}

// Валидация
function onInputHandler(event) {
  isValid = myRegExp.test(this.value);
  if (isValid) {
    this.classList.remove("invalid_style");
    this.classList.add("valid_style");
  } else {
    this.classList.add("invalid_style");
    this.classList.remove("valid_style");
  }
}

function itemSelected(classname) {
  console.log('Clicked an item with ID=' + classname);
  const element = document.getElementById(classname);
  if (element.classList.contains("task-selected")) {
    element.classList.remove("task-selected");
  } else {
    element.classList.add("task-selected");
  }
}