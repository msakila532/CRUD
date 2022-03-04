?<?php
  require 'config.php';
    $id  = $_POST["id"];
    $post = $_POST;
    $sql = "UPDATE tblproduct SET  quantity = ".$post['quantity']." 
        WHERE id = '".$id."'";
    $result = $mysqli->query($sql);
    $data = $result->fetch_assoc();
  echo json_encode($data);
?>

