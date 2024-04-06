<?php
#require "config/header.php";
require "./database/database.php";

$db = new Database;
print_r($db->check());
?>
