<?php
/*===================================*/
require "../config/header.php";
require_once "../database/database.php";
$DB = new Database();
$url = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "GET") {
  $sql = "SELECT * FROM users";
  $data = $DB->Select_All($sql);
  if ($data) {
    echo json_encode([
      "status" => "success",
      "data" => $data,
      "message" => "User Found !",
    ]);
  } else {
    echo json_encode([
      "status" => "failed",
      "message" => "No User Found !",
    ]);
  }
} else {
  echo json_encode([
    "status" => "failed",
    "message" => "GET Request Available Only !",
  ]);
}

?>
