<?php
 require 'config.php';
    $id  = $_POST["id"];
    $sql = "DELETE FROM tblproduct WHERE id = '".$id."'";
    $result = $mysqli->query($sql);
    echo json_encode([$id]);
?>