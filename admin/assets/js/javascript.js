document.addEventListener("DOMContentLoaded", initApp);

let chartSuara; // global chart instance

function initApp() {
  loadTotalPemilih();
  loadSuaraMasuk();
  loadProfilSekolah();
  loadKandidat();
  loadChart();
  loadWaktu();
}

// ============================
// PROFIL SEKOLAH
// ============================
function loadProfilSekolah() {
  const data = JSON.parse(localStorage.getItem("profilSekolah")) || {
    nama: "-",
    npsn: "-",
    jenjang: "-",
    status: "-",
    kepala: "-",
    operator: "-",
    tahun: "-",
    email: "-",
    telepon: "-",
    website: "-",
    alamat: "-",
    logo: "img/default-logo.png",
  };
  localStorage.setItem("profilSekolah", JSON.stringify(data));

  // Update halaman
  const fields = [
    "namaSekolah",
    "npsn",
    "jenjang",
    "statusSekolah",
    "kepalaSekolah",
    "operatorSekolah",
    "tahunBerdiri",
    "emailSekolah",
    "teleponSekolah",
    "websiteSekolah",
    "alamatSekolah",
  ];
  fields.forEach((id) => {
    if (document.getElementById(id)) {
      const key = id.replace("Sekolah", "").toLowerCase();
      document.getElementById(id).innerText = data[key] || "-";
    }
  });

  // Update modal
  const modalFields = [
    "editNamaSekolah",
    "editNpsn",
    "editJenjang",
    "editStatus",
    "editKepalaSekolah",
    "editOperator",
    "editTahunBerdiri",
    "editEmail",
    "editTelepon",
    "editWebsite",
    "editAlamat",
  ];
  modalFields.forEach((id) => {
    if (document.getElementById(id)) {
      const key = id.replace("edit", "").toLowerCase();
      document.getElementById(id).value = data[key] || "";
    }
  });

  // Preview logo di modal
  if (document.getElementById("previewLogo"))
    document.getElementById("previewLogo").src =
      data.logo || "img/default-logo.png";

  // Sidebar logo & nama
  updateSidebarLogo(data.logo, data.nama);
}

document.getElementById("editLogo").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("previewLogo").src = e.target.result;
      updateSidebarLogo(e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

function simpanProfil() {
  const logoFile = document.getElementById("editLogo").files[0];
  const saveDataToLocal = (logo) => {
    const data = {
      nama: document.getElementById("editNamaSekolah").value,
      npsn: document.getElementById("editNpsn").value,
      jenjang: document.getElementById("editJenjang").value,
      status: document.getElementById("editStatus").value,
      kepala: document.getElementById("editKepalaSekolah").value,
      operator: document.getElementById("editOperator").value,
      tahun: document.getElementById("editTahunBerdiri").value,
      email: document.getElementById("editEmail").value,
      telepon: document.getElementById("editTelepon").value,
      website: document.getElementById("editWebsite").value,
      alamat: document.getElementById("editAlamat").value,
      logo: logo || document.getElementById("previewLogo").src,
    };
    localStorage.setItem("profilSekolah", JSON.stringify(data));
    loadProfilSekolah();
    bootstrap.Modal.getInstance(
      document.getElementById("modalEditProfil")
    ).hide();
    alert("Profil sekolah berhasil diperbarui!");
  };
  if (logoFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      saveDataToLocal(e.target.result);
    };
    reader.readAsDataURL(logoFile);
  } else saveDataToLocal();
}

function hapusProfil() {
  if (!confirm("Yakin ingin menghapus profil sekolah?")) return;
  localStorage.removeItem("profilSekolah");
  loadProfilSekolah();
  bootstrap.Modal.getInstance(
    document.getElementById("modalEditProfil")
  ).hide();
}

function updateSidebarLogo(logo, nama) {
  if (document.getElementById("sidebarLogo"))
    document.getElementById("sidebarLogo").src = logo || "img/default-logo.png";
  if (document.getElementById("sidebarNamaSekolah"))
    document.getElementById("sidebarNamaSekolah").innerText =
      nama || "Memuat...";
}
