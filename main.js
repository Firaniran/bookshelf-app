// Fungsi untuk menambahkan atau memperbarui buku ke daftar
function addBookToList(book) {
  if (!book.title || !book.author || !book.year) {
    alert("Semua data buku harus diisi!"); // Validasi input
    return;
  }

  // Cari elemen buku berdasarkan ID
  const existingBookElement = document.querySelector(`[data-bookid="${book.id}"]`);
  if (existingBookElement) {
    // Perbarui data elemen yang sudah ada
    existingBookElement.querySelector("[data-testid='bookItemTitle']").textContent = book.title;
    existingBookElement.querySelector("[data-testid='bookItemAuthor']").textContent = "Penulis: " + book.author;
    existingBookElement.querySelector("[data-testid='bookItemYear']").textContent = "Tahun: " + book.year;

    const isCompleteButton = existingBookElement.querySelector("[data-testid='bookItemIsCompleteButton']");
    isCompleteButton.textContent = book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca";

    // Pindahkan buku ke daftar baru jika status selesai berubah
    const targetList = book.isComplete
      ? document.getElementById("completeBookList")
      : document.getElementById("incompleteBookList");
    if (existingBookElement.parentElement !== targetList) {
      targetList.appendChild(existingBookElement);
    }

    return; // Hentikan, buku lama diperbarui
  }

  // Tambahkan elemen buku baru
  const bookElement = document.createElement("div");
  bookElement.setAttribute("data-bookid", book.id);
  bookElement.setAttribute("data-testid", "bookItem");

  // Teks tombol berdasarkan status
  const buttonLabel = book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca";

  bookElement.innerHTML = `
    <h3 data-testid="bookItemTitle">${book.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
    <p data-testid="bookItemYear">Tahun: ${book.year}</p>
    <div>
      <button data-testid="bookItemIsCompleteButton">${buttonLabel}</button>
      <button data-testid="bookItemDeleteButton">Hapus Buku</button>
      <button data-testid="bookItemEditButton">Edit Buku</button>
    </div>
  `;

  const targetList = book.isComplete
    ? document.getElementById("completeBookList")
    : document.getElementById("incompleteBookList");
  targetList.appendChild(bookElement);
}

// Tangani form tambah buku baru
document.getElementById("bookForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah reload halaman

  // Ambil data dari form
  const bookTitle = document.getElementById("bookFormTitle").value;
  const bookAuthor = document.getElementById("bookFormAuthor").value;
  const bookYear = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;
  const isNotComplete = document.getElementById("bookFormIsNotComplete").checked;

  // Validasi input
  if (!bookTitle || !bookAuthor || !bookYear) {
    alert("Semua data buku harus diisi!");
    return;
  }

  if (isComplete && isNotComplete) {
    alert("Pilih salah satu: Selesai dibaca atau Belum selesai dibaca.");
    return;
  }

  if (!isComplete && !isNotComplete) {
    alert("Anda harus memilih salah satu status rak buku.");
    return;
  }

  // Buat data buku baru
  const bookId = new Date().getTime().toString(); // ID unik
  const bookData = {
    id: bookId,
    title: bookTitle,
    author: bookAuthor,
    year: bookYear,
    isComplete: isComplete,
  };

  // Tambahkan buku ke daftar
  addBookToList(bookData);

  // Reset form
  document.getElementById("bookForm").reset();
  alert("Buku berhasil ditambahkan!");
});

// Tangani form pencarian buku
document.getElementById("searchBook").addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah reload halaman

  // Ambil data dari input pencarian
  const searchQuery = document.getElementById("searchBookTitle").value.trim().toLowerCase();

  // Validasi input pencarian
  if (!searchQuery) {
    alert("Masukkan judul buku yang ingin dicari!");
    return;
  }

  // Cari semua elemen buku di daftar
  const allBooks = document.querySelectorAll("[data-testid='bookItem']");
  let found = false; // Untuk menandai apakah ada buku yang cocok

  // Loop untuk mencocokkan judul buku
  allBooks.forEach((book) => {
    const titleElement = book.querySelector("[data-testid='bookItemTitle']");
    const bookTitle = titleElement.textContent.toLowerCase();

    if (bookTitle.includes(searchQuery)) {
      // Jika ditemukan, tampilkan buku dan scroll ke elemen tersebut
      book.style.display = "block";
      book.scrollIntoView({ behavior: "smooth", block: "center" });
      found = true;
    } else {
      // Sembunyikan buku yang tidak cocok
      book.style.display = "none";
    }
  });

  // Jika tidak ada buku yang cocok
  if (!found) {
    alert("Buku dengan judul yang dicari tidak ditemukan.");
    // Tampilkan kembali semua buku agar tidak hilang permanen
    allBooks.forEach((book) => {
      book.style.display = "block";
    });
  }
});

// Tangani tombol Edit Buku
document.addEventListener("click", function (event) {
  if (event.target.dataset.testid === "bookItemEditButton") {
    const bookItem = event.target.closest("[data-testid='bookItem']");
    const bookId = bookItem.getAttribute("data-bookid");
    const bookTitleElement = bookItem.querySelector("[data-testid='bookItemTitle']");
    const bookAuthorElement = bookItem.querySelector("[data-testid='bookItemAuthor']");
    const bookYearElement = bookItem.querySelector("[data-testid='bookItemYear']");
    const isCompleteButton = bookItem.querySelector("[data-testid='bookItemIsCompleteButton']");

    // Tampilkan modal edit buku
    const modal = document.getElementById("editModal");
    modal.classList.add("show");

    // Isi form modal dengan data buku
    document.getElementById("editBookFormTitle").value = bookTitleElement.textContent.trim();
    document.getElementById("editBookFormAuthor").value = bookAuthorElement.textContent.replace("Penulis: ", "").trim();
    document.getElementById("editBookFormYear").value = bookYearElement.textContent.replace("Tahun: ", "").trim();
    document.getElementById("editBookFormIsComplete").checked =
      isCompleteButton.textContent.trim() === "Selesai dibaca";

    // Tangani klik tombol simpan perubahan di modal
    const editBookForm = document.getElementById("editBookForm");
    editBookForm.onsubmit = function (e) {
      e.preventDefault();

      // Ambil data baru dari form modal
      const updatedTitle = document.getElementById("editBookFormTitle").value.trim();
      const updatedAuthor = document.getElementById("editBookFormAuthor").value.trim();
      const updatedYear = document.getElementById("editBookFormYear").value.trim();
      const updatedIsComplete = document.getElementById("editBookFormIsComplete").checked;

      // Validasi input
      if (!updatedTitle || !updatedAuthor || !updatedYear) {
        alert("Semua kolom harus diisi!");
        return;
      }

      // Perbarui elemen pada daftar buku
      bookTitleElement.textContent = updatedTitle;
      bookAuthorElement.textContent = "Penulis: " + updatedAuthor;
      bookYearElement.textContent = "Tahun: " + updatedYear;
      isCompleteButton.textContent = updatedIsComplete ? "Belum selesai dibaca" : "Selesai dibaca";

      // Pindahkan buku jika status selesai berubah
      const targetList = updatedIsComplete
        ? document.getElementById("completeBookList")
        : document.getElementById("incompleteBookList");
      if (bookItem.parentElement !== targetList) {
        targetList.appendChild(bookItem);
      }

      // Sembunyikan modal
      modal.classList.remove("show");
      alert("Buku berhasil diperbarui!");
    };

    // Tangani tombol close di modal
    const closeModal = document.querySelector(".close");
    closeModal.onclick = function () {
      modal.classList.remove("show");
    };

    // Tangani klik di luar modal untuk menutup modal
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.classList.remove("show");
      }
    };
  }
});

// Tangani tombol Hapus Buku
document.addEventListener("click", function (event) {
  if (event.target.dataset.testid === "bookItemDeleteButton") {
    const bookItem = event.target.closest("[data-testid='bookItem']");
    if (bookItem) {
      bookItem.remove(); // Hapus elemen buku dari daftar
      alert("Buku berhasil dihapus!");
    }
  }
});

// Tangani tombol Selesai/Belum Selesai Dibaca
document.addEventListener("click", function (event) {
  if (event.target.dataset.testid === "bookItemIsCompleteButton") {
    const bookItem = event.target.closest("[data-testid='bookItem']");
    if (bookItem) {
      const isComplete = event.target.textContent === "Selesai dibaca";

      // Tentukan daftar tujuan
      const targetList = isComplete
        ? document.getElementById("incompleteBookList")
        : document.getElementById("completeBookList");

      // Pindahkan buku ke daftar tujuan
      if (bookItem.parentElement !== targetList) {
        targetList.appendChild(bookItem);
      }

      // Perbarui teks tombol
      event.target.textContent = isComplete ? "Belum selesai dibaca" : "Selesai dibaca";
      alert(`Buku berhasil dipindahkan ke daftar ${isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}!`);
    }
  }
});