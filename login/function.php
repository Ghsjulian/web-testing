<?php
require "../config/jwt.php";
function login($email, $password, $db)
{
  $status = "";
  $message = "";
  $user_email = trim($email);
  $user_pass = trim($password);
  $enc_password = sha1($user_pass);
  if ($user_email && $password) {
    $sql = "SELECT email,password FROM users WHERE email='$user_email' AND password='$enc_password'";
    $query = $db->__LOGIN__($sql);
    if ($query) {
      $status = "success";
      $message = "Login Successfully";
    } else {
      $status = "failed";
      $message = "Login Failed, Invalid Credentials";
    }
  } else {
    $status = "failed";
    $message = "All Fields Are Required!";
  }
  return [
    "status" => $status,
    "message" => $message,
  ];
}

?>
