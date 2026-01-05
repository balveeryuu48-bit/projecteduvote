<?php
$conn = mysqli_connect("localhost", "root", "", "evoting");
if (!$conn) {
  die("Koneksi gagal");
}
