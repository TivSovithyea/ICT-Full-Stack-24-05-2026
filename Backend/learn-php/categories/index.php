<?php

    header('Content-Type: application/json');
    include '../db.php';

    $stmt = $pdo->query("SELECT * FROM categories");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode([
        'status' => true,
        'data' => $categories
    ]);