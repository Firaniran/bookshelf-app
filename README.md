Isi dari dokumen:

Starter project untuk tugas akhir kelas Belajar Membuat Front-End Web untuk Pemula.

Atribut Penting:
data-testid: Jangan diubah/hapus. Boleh tambahkan atribut lain seperti class selama data-testid tetap utuh.

Atribut Buku:

data-bookid: ID masing-masing buku.

data-testid:

bookItem: Kontainer data buku.

bookItemTitle: Judul buku.

bookItemAuthor: Penulis buku.

bookItemYear: Tahun rilis buku.

bookItemIsCompleteButton: Tombol mengubah status selesai/belum selesai.

bookItemDeleteButton: Tombol hapus buku.

bookItemEditButton: Tombol edit data buku.

Template Buku:
html
<div data-bookid="{{ ID_buku }}" data-testid="bookItem">
  <h3 data-testid="bookItemTitle">{{ judul_buku }}</h3>
  <p data-testid="bookItemAuthor">Penulis: {{ penulis_buku }}</p>
  <p data-testid="bookItemYear">Tahun: {{ tahun_rilis_buku }}</p>
  <div>
    <button data-testid="bookItemIsCompleteButton">{{ tombol_untuk_ubah_kondisi }}</button>
    <button data-testid="bookItemDeleteButton">{{ tombol_untuk_hapus }}</button>
    <button data-testid="bookItemEditButton">{{ tombol_untuk_edit }}</button>
  </div>
</div>
Selamat berkarya dan sukses selalu!
