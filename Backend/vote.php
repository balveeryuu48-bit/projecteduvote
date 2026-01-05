<?php
session_start();
include "koneksi.php";

if (!isset($_SESSION['pemilih'])) {
  die("Akses ditolak");
}

$nis = $_SESSION['pemilih'];
$kandidat = $_POST['kandidat'] ?? '';

// CEK SUDAH VOTE ATAU BELUM
$cek = mysqli_query($conn, "SELECT * FROM voting WHERE nis='$nis'");
if (mysqli_num_rows($cek) > 0) {
  die("Anda sudah melakukan voting");
}

// SIMPAN VOTING
mysqli_query($conn,
  "INSERT INTO voting (nis, kandidat_id)
   VALUES ('$nis', '$kandidat')");

header("Location: ../hasil.html");
exit;
