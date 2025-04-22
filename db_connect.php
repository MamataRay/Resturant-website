<?php
$servername='localhost';
$username='root';
$password='mamataray@0987';
$database='pbl';

$conn = new mysqli($servername,$username,$password,$database);

if($conn->connect_error){
    die("Connection Failed: " . $conn->connect_error);
}
?>