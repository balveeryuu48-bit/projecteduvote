<?php
include "koneksi.php";

$q = mysqli_query($conn,
  "SELECT kandidat.nama, COUNT(voting.id) AS total
   FROM kandidat
   LEFT JOIN voting ON kandidat.id = voting.kandidat_id
   GROUP BY kandidat.id");

$data = [];
while ($row = mysqli_fetch_assoc($q)) {
  $data[] = $row;
}

echo json_encode($data);
