const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority");
const submitBtn = document.getElementById("submit-btn");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const currentTime = document.getElementById("current-time");
const deadlineInput = document.getElementById("deadline-input"); // tambahkan ini

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

  const span = document.createElement("span");
  span.textContent = taskText;

  // tambahkan label deadline jika ada
  if (deadline) {
    span.textContent += ` (Deadline: ${deadline})`;

    const today = new Date().toISOString().split("T")[0];
    if (deadline < today) {
      const overdueLabel = document.createElement("span");
      overdueLabel.textContent = " Overdue";
      overdueLabel.style.color = "red";
      overdueLabel.style.fontWeight = "bold";
      span.appendChild(overdueLabel);
    }
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      li.classList.add("done");
      doneList.appendChild(li);
    }
  });

  li.appendChild(span);
  li.appendChild(checkbox);
  todoList.appendChild(li);

  taskInput.value = "";
  deadlineInput.value = "";
});

deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
});
