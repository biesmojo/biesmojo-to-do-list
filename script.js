const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority");
const submitBtn = document.getElementById("submit-btn");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const currentTime = document.getElementById("current-time");
const deadlineInput = document.getElementById("deadline-input");

function updateTime() {
  const now = new Date();
  currentTime.textContent = `Hari: ${now.toLocaleDateString('id-ID', { weekday: 'long' })}, Tanggal: ${now.toLocaleDateString('id-ID')}`;
}
updateTime();

submitBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  const deadline = deadlineInput.value;

  if (!taskText) return;

  const li = document.createElement("li");
  li.classList.add(priority);

  // container isi tugas
  const taskContainer = document.createElement("div");
  taskContainer.style.display = "inline-block";

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  if (deadline) {
    taskSpan.textContent += ` (Deadline: ${deadline})`;

    const today = new Date().toISOString().split("T")[0];
    if (deadline < today) {
      const overdueLabel = document.createElement("span");
      overdueLabel.textContent = " Overdue";
      overdueLabel.style.color = "red";
      overdueLabel.style.fontWeight = "bold";
      overdueLabel.style.marginLeft = "8px";
      taskSpan.appendChild(overdueLabel);
    }
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.marginLeft = "12px";
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      li.classList.add("done");
      doneList.appendChild(li);
    }
  });

  taskContainer.appendChild(taskSpan);
  li.appendChild(taskContainer);
  li.appendChild(checkbox);
  todoList.appendChild(li);

  taskInput.value = "";
  deadlineInput.value = "";
});

deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
});
