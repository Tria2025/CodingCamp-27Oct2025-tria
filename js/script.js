// Array untuk menyimpan semua todo
let todos = [];

// 🔄 Fungsi untuk menampilkan todo ke tabel
function renderTodos(list = todos) {
  const tbody = document.getElementById("todo-body");
  tbody.innerHTML = ""; // Bersihkan isi tabel terlebih dahulu

  // Jika belum ada todo
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">No task found 😴</td></tr>`;
    return;
  }

  // Looping setiap todo dan tampilkan ke tabel
  list.forEach((todo, index) => {
    const row = document.createElement("tr");

    // Isi baris tabel dengan data todo
    row.innerHTML = `
      <td class="${todo.completed ? "completed" : ""}">${todo.task}</td>
      <td>${todo.dueDate}</td>
      <td>${todo.completed ? "✅ Done" : "⏳ Pending"}</td>
      <td>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTodo(${index})">✖</button>
      </td>
    `;

    // Tambahkan baris ke tabel
    tbody.appendChild(row);
  });
}

// ➕ Fungsi menambah todo baru
function addTodo() {
  const taskInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("todo-date");

  const task = taskInput.value.trim();
  const date = dateInput.value;

  // Validasi input (tidak boleh kosong)
  if (!task || !date) {
    alert("Form validation failed. Please check your inputs.");
    return;
  }

  // Tambahkan todo baru ke array
  todos.push({ task, dueDate: date, completed: false });

  // Kosongkan input setelah menambah
  taskInput.value = "";
  dateInput.value = "";

  // Render ulang tabel todo
  renderTodos();
}

// ❌ Fungsi menghapus todo berdasarkan index
function deleteTodo(index) {
  todos.splice(index, 1); // Hapus 1 data sesuai index
  renderTodos(); // Perbarui tampilan
}

// ✅ Fungsi ubah status todo (selesai/belum)
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed; // Toggle status
  renderTodos(); // Tampilkan ulang daftar
}

// 🔍 Tombol Filter dan Clear All
// Event tombol "Add"
document.getElementById("add-btn").addEventListener("click", addTodo);

// Event tombol "Clear All" (hapus semua todo)
document.getElementById("clear-all-btn").addEventListener("click", () => {
  if (confirm("Clear all tasks?")) {
    todos = []; // Kosongkan array todos
    renderTodos(); // Tampilkan pesan kosong
  }
});

// Event tombol "Filter" berdasarkan tanggal
document.getElementById("filter-btn").addEventListener("click", () => {
  const filterDate = prompt("Enter date to filter (YYYY-MM-DD):");

  // Jika tidak ada input filter, tampilkan semua todo
  if (!filterDate) renderTodos();
  else {
    // Filter todo berdasarkan tanggal yang dimasukkan
    const filtered = todos.filter(t => t.dueDate === filterDate);
    renderTodos(filtered);
  }
});

// 🌙☀️ Fitur Ganti Tema (Dark / Light Mode)
const themeToggle = document.getElementById("theme-toggle");

// Cek apakah sebelumnya user memilih dark mode
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark"); // Tambahkan kelas 'dark' ke body
  themeToggle.textContent = "☀️"; // Ubah ikon tombol ke matahari
}

// Event klik tombol theme toggle
themeToggle.addEventListener("click", () => {
  // Toggle class 'dark' pada body
  document.body.classList.toggle("dark");

  // Cek apakah saat ini mode-nya dark
  const isDark = document.body.classList.contains("dark");

  // Ubah ikon tombol sesuai mode
  themeToggle.textContent = isDark ? "☀️" : "🌙";

  // Simpan preferensi ke localStorage
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// 🚀 Render awal saat halaman dimuat
renderTodos();
