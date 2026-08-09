<?php

    $host = "localhost";
    $db = "inventory_system";
    $username = "root";
    $password = "vithyeaxD";

    try {

        $pdo = new PDO("mysql: host=$host;dbname=$db", $username, $password);
        $pdo->setAttribute(PDO:: ATTR_ERRMODE, PDO:: ERRMODE_EXCEPTION);

        // echo "Connected Successfully";

    } catch(PDOException $e) {
        echo "Connection Failed" . $e->getMessage();
    }