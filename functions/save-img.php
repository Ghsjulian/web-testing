<?php
require "./config/header.php";
require "./functions/save-image.php";
$requestMethod = $_SERVER["REQUEST_METHOD"];

$data = json_decode(file_get_contents("php://input"), true);
$img = $data["image"];
$image_name = md5(uniqid(rand(), true)) . ".jpg";
save_image($img,$image_name);
echo json_encode([
  "message" => "Uploaded",
]);
// $len = strlen($image_name);
// echo json_encode([
//   "data" => $img,
//   "img_name" => $image_name,
//   "len"=>$len
// ]);

/*
$image_name = md5(uniqid(rand(), true)).'.jpg';
$image_destination = 'images/'.$image_name;
*/
?>
