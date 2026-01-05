<?php
session_start();

if (!isset($_SESSION['pemilih']) && !isset($_SESSION['admin'])) {
  header("Location: ../login.html");
  exit;
}
