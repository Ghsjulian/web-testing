<?php
/*===================================*/
require "../config/header.php";
require_once "../database/database.php";

$DB = new Database();
$url = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "POST") {
  $data = json_decode(file_get_contents("php://input"), true);
  $name = trim($data["name"]);
  $email = trim($data["email"]);
  $passw = trim($data["password"]);
  $enc_password = sha1($passw);
  $status = trim($data["status"]);
  if ($name && $email && $passw && $status) {
    //$sql = "INSERT INTO users('user_name','user_email','user_password','user_status')VALUES('$name','$email','$enc_password','$status')";
    $sql = "INSERT INTO `users`(`user_name`, `user_email`, `user_password`, `user_status`) VALUES ('$name','$email','$enc_password','$status')";
    $query = $DB->Insert($sql);
    if ($query) {
      echo json_encode([
        "status" => "success",
        "message" => "User Added Successfully !",
      ]);
    } else {
      echo json_encode([
        "status" => "failed",
        "message" => "User Not Inserted !",
      ]);
    }
  } else {
    echo json_encode([
      "status" => "failed",
      "message" => "All Fields Are Required !",
    ]);
  }
} else {
  echo json_encode([
    "status" => "failed",
    "message" => "POST Request Available Only !",
  ]);
}

?>
