<?php

    header('Content-Type: application/json');
    include '../db.php';

    $id = $_GET['id'];
    $status = $_GET['status'];

    $stmt = $pdo->prepare("SELECT * FROM categories WHERE id = ? AND status = ?");
    $stmt->execute([$id, $status]);
    $categories = $stmt->fetch(PDO::FETCH_ASSOC);


    echo json_encode([
        'status' => true,
        'data' => $categories
    ]);