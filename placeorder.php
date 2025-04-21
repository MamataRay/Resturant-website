<?php
// Database connection
$servername = 'localhost';
$username = 'root';
$password = 'mamataray@0987';
$database = 'pbl';

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection Failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['name'], $_POST['number'], $_POST['email'], $_POST['message'])) {
        $name = $_POST['name'];
        $number = $_POST['number'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        $sql = "INSERT INTO reg (name, number, email, message) VALUES ('$name', '$number', '$email', '$message')";

        if ($conn->query($sql)) {
            echo "<script>alert('Submitted'); window.location.href='index.html';</script>";
            exit;
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo "All fields are required.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact</title>
    <link rel="stylesheet" href="order.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<section class="home" id="home">
    <nav>
        <div class="logo">
            <h1>Dine <span> with us</span></h1>
        </div>
        <ul>
            <li><a href="index.html">home</a></li>
            <li><a href="veg.html">Veg</a></li>
            <li><a href="non-veg.html">Non-Veg </a></li>
            <li><a href="ice_cream.html">Ice-Cream</a></li>
            <li><a href="milkshake.html">Milkshakes</a></li>
            <li><a href="juices.html">Juices</a></li>
            <li><a href="cakes.html">Cakes</a></li>
            <li><a href="contact.php">Contact</a></li>
        </ul>
        <div class="social">
            <a href="#"><i class="fa fa-instagram"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a> 
            <a href="#"><i class="fa fa-facebook"></i></a>
        </div>
    </nav>

    <div class="container">  
        <div class="panel contact">
            <form action="" method="post">
                <h3>Place Your Order</h3>
                <div class="from-group">
                    <input type="text" name="name" id="txtName" placeholder="Your Name" required>
                </div>
                <div class="from-group">
                    <input type="text" name="number" id="numPhone" placeholder="Your Number" required>
                </div>
                <div class="from-group">
                    <input type="email" name="email" id="txtMail" placeholder="Your Email id" required>
                </div>
                <div class="from-group">
                    <textarea name="message" id="txtMsg" cols="42" rows="4" placeholder="Message" required></textarea>
                </div>
                <div class="from-group">
                    <button class="btn-send" type="submit">Place order</button>
                </div>
            </form>
        </div>
    </div> 
</section>
</body>
</html>
