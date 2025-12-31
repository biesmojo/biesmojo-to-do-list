const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority");
const submitBtn = document.getElementById("submit-btn");
const overdueTodoList = document.getElementById("overdue-todo-list");
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

  // Simpan deadline sebagai atribut data untuk referensi nanti (opsional)
  if (deadline) li.dataset.deadline = deadline; // REVISI: menyimpan deadline

  const contentDiv = document.createElement("div");
  contentDiv.className = "task-content";

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const deadlineSpan = document.createElement("span");
  deadlineSpan.className = "deadline-text";
  deadlineSpan.textContent = deadline ? `(Deadline: ${formatTanggalIndonesia(deadline)})` : "";

  contentDiv.appendChild(taskSpan);
  contentDiv.appendChild(deadlineSpan);

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "task-actions";

  let isOverdue = false; // REVISI: flag untuk menandai overdue

  if (deadline) {
    const today = new Date().toISOString().split("T")[0];
    if (deadline < today) {
      isOverdue = true; // REVISI: set flag overdue
      const overdueLabel = document.createElement("span");
      overdueLabel.className = "overdue-label";
      overdueLabel.textContent = "Overdue";
      actionsDiv.appendChild(overdueLabel);
      li.classList.add("overdue"); // REVISI: tambahkan kelas visual jika perlu
    }
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      li.classList.add("done");
      doneList.appendChild(li);
    }
  });

  actionsDiv.appendChild(deleteBtn);
  actionsDiv.appendChild(checkbox);

  li.appendChild(contentDiv);
  li.appendChild(actionsDiv);

  // REVISI: jika overdue, tambahkan ke overdueTodoList; jika tidak, ke todoList
  if (isOverdue) {
    overdueTodoList.appendChild(li); // REVISI
  } else {
    todoList.appendChild(li);
  }

  taskInput.value = "";
  deadlineInput.value = "";
});

deleteAllBtn.addEventListener("click", () => {
  overdueTodoList.innerHTML = "";
  todoList.innerHTML = "";
  doneList.innerHTML = "";
});
