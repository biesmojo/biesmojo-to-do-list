const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority");
const submitBtn = document.getElementById("submit-btn");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const currentTime = document.getElementById("current-time");

function updateTime() {
  const now = new Date();
  currentTime.textContent = `Hari: ${now.toLocaleDateString('id-ID', { weekday: 'long' })}, Tanggal: ${now.toLocaleDateString('id-ID')}`;
}
updateTime();

submitBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (!taskText) return;

  const li = document.createElement("li");
  li.classList.add(priority);
  li.innerHTML = `
    <span>${taskText}</span>
    <input type="checkbox" />
  `;

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
