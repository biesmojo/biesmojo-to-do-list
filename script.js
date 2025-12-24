const taskInput = document.getElementById("task-input");
const deadLineInput = document.getElementById("deadline-input");
const prioritySelect = document.getElementById("priority");
const submitBtn = document.getElementById("submit-btn");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const deleteBtn =document.getElementById("delete-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const currentTime = document.getElementById("current-time");

function updateTime() {
  const now = new Date();
  currentTime.textContent = `Hari: ${now.toLocaleDateString('id-ID', { weekday: 'long' })}, Tanggal: ${now.toLocaleDateString('id-ID')}`;
}
updateTime();

submitBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const deadLine = deadLineInput.value;
  const priority = prioritySelect.value;

  if (!taskText) return;

  const li = document.createElement("li");
  li.classList.add(priority);
  
  const span = document.createElement("span"); span.textContent = `${taskText} ${deadLine ? "(Deadline: " + deadLine + ")" : ""
  `;

  // cek overdue
  if (deadLine) {
    const today = new Date().toISOString().split("T")[0];
    if (deadLine < today) {
      const overdueLabel = document.createElement("span");
      overdueLabel.textContent = " Overdue";
      overdueLabel.style.color = "red";
      span.appendChild(overdueLabel);
    }
  }
      
  li.querySelector("input").addEventListener("change", function () {
    if (this.checked) {
      li.classList.add("done");
      doneList.appendChild(li);
    }
  });

  todoList.appendChild(li);
  taskInput.value = "";
});

deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
});
