const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority");
const submitBtn = document.getElementById("submit-btn");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const currentTime = document.getElementById("current-time");
const deadlineInput = document.getElementById("deadline-input");

function formatTanggalIndonesia(dateStr) {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const [year, month, day] = dateStr.split("-");
  return `${day} ${bulan[parseInt(month) - 1]} ${year}`;
}

function updateTime() {
  const now = new Date();
  const hari = now.toLocaleDateString('id-ID', { weekday: 'long' });
  const tanggal = now.toISOString().split("T")[0];
  currentTime.textContent = `Hari: ${hari}, Tanggal: ${formatTanggalIndonesia(tanggal)}`;
}
updateTime();

submitBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  const deadline = deadlineInput.value;

  if (!taskText) return;

  const li = document.createElement("li");
  li.classList.add("task-item", priority);

  const contentDiv = document.createElement("div");
  contentDiv.className = "task-content";

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const deadlineSpan = document.createElement("span");
  deadlineSpan.className = "deadline-text";
  deadlineSpan.textContent = deadline ? `(Deadline: ${formatTanggalIndonesia(deadline)})` : "";

  contentDiv.appendChild(taskSpan);
  contentDiv.appendChild(deadlineSpan);

  const rightSide = document.createElement("div");
  rightSide.style.display = "flex";
  rightSide.style.alignItems = "center";

  if (deadline) {
    const today = new Date().toISOString().split("T")[0];
    if (deadline < today) {
      const overdueLabel = document.createElement("span");
      overdueLabel.className = "overdue-label";
      overdueLabel.textContent = "Overdue";
      rightSide.appendChild(overdueLabel);
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

  rightSide.appendChild(checkbox);

  li.appendChild(contentDiv);
  li.appendChild(rightSide);
  todoList.appendChild(li);

  taskInput.value = "";
  deadlineInput.value = "";
});

deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
});
