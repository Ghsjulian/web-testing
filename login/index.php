<?php
/*===================================*/
require "../config/header.php";
require_once "../database/database.php";
require_once "./function.php";
$message = "";
$status = "";
$token = "";
$user_role = "";
$DB = new database();
$url = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "POST") {
  $data = json_decode(file_get_contents("php://input"), true);
  #  echo json_encode($data);
  $email = $data["email"];
  $password = $data["password"];
  $login = login($email, $password, $DB);
  echo json_encode($login);
} else {
  echo json_encode([
    "status" => "failed",
    "message" => "POST Request Available Only !",
  ]);
}

?>
