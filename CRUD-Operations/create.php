<?php
require 'config.php';
  $post = $_POST;
  $sql = "INSERT INTO tblproduct (name,code,price,quantity,image) 
	         VALUES ('".$post['name']."','".$post['code']."',".$post['price'].",".$post['quantity'].",'image/Watch.jpg')";
  $result = $mysqli->query($sql);
  $sql = "SELECT * FROM tblproduct Order by id desc LIMIT 1"; 
  $result = $mysqli->query($sql);
  $data = $result->fetch_assoc();
  echo json_encode($data);


?>