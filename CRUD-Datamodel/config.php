<?php
define (DB_USER, "developer");
define (DB_PASSWORD, "test@123");
define (DB_DATABASE, "testdb");
define (DB_HOST, "localhost");
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
?> 