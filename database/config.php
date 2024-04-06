<?php
function conn(){
  $host = "localhost";
  $user = "root";
  $password = "";
  $databbase = "mydata";
  $conn = new mysqli($host, $user, $password,$databbase);
  if($conn->connect_error){
    return $conn->connect_error;
  } else {
  return $conn;
  }
}
?>
