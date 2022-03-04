?<?php
  require 'config.php';
    $id  = $_POST["id"];
    $post = $_POST;
    $sql = "UPDATE tblproduct SET name = '".$post['name']."'
        ,code = '".$post['code']."'  ,price = ".$post['price']."  ,quantity = ".$post['quantity']." 
        WHERE id = '".$id."'";
    $result = $mysqli->query($sql);
    $sql = "SELECT * FROM tblproduct WHERE id = '".$id."'"; 
    $result = $mysqli->query($sql);
    $data = $result->fetch_assoc();
  echo json_encode($data);
?>