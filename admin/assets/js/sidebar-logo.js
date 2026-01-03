// ============================
// SIDEBAR LOGO TERPISAH
// ============================

// Fungsi untuk menampilkan logo di sidebar
function tampilkanLogoSidebar() {
  const logo = localStorage.getItem("sidebarLogo") || "img/default-logo.png";
  const sidebarLogo = document.getElementById("sidebarLogo");
  if (sidebarLogo) sidebarLogo.src = logo;

  const sidebarNama = document.getElementById("sidebarNamaSekolah");
  const nama = localStorage.getItem("sidebarNama") || "Memuat...";
  if (sidebarNama) sidebarNama.innerText = nama;
}

// Fungsi untuk menyimpan logo baru dari form/modal
function simpanLogoSidebar(inputFileId, previewId) {
  const fileInput = document.getElementById(inputFileId);
  if (!fileInput) return;

  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const logoData = e.target.result;

      // Update preview di modal/form
      const preview = document.getElementById(previewId);
      if (preview) preview.src = logoData;

      // Simpan ke localStorage
      localStorage.setItem("sidebarLogo", logoData);

      // Update langsung di sidebar
      tampilkanLogoSidebar();
    };
    reader.readAsDataURL(file);
  });
}

// Panggil saat halaman dimuat
document.addEventListener("DOMContentLoaded", tampilkanLogoSidebar);
