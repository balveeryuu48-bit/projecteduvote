<?php
session_start();
include "koneksi.php";

$role = $_POST['role'] ?? '';

if ($role === "pemilih") {
  $nis = $_POST['nis'] ?? '';

  $q = mysqli_query($conn, "SELECT * FROM pemilih WHERE nis='$nis'");
  if (mysqli_num_rows($q) > 0) {
    $_SESSION['pemilih'] = $nis;
    header("Location: ../dashboard-pemilih.html");
    exit;
  } else {
    echo "NIS tidak terdaftar";
  }

} elseif ($role === "admin") {
  $u = $_POST['username'] ?? '';
  $p = md5($_POST['password'] ?? '');

  $q = mysqli_query($conn,
    "SELECT * FROM admin WHERE username='$u' AND password='$p'");

  if (mysqli_num_rows($q) > 0) {
    $_SESSION['admin'] = $u;
    header("Location: ../admin-dashboard.html");
    exit;
  } else {
    echo "Username atau password salah";
  }
}
