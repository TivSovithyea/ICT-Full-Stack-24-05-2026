<?php

    // Index Array

    $fruits = ["Apple", "Banana", "Mango"];

    echo $fruits[1];

    // Associative Array

    $employee = [
        "name" => "Seyha",
        "position" => "Programmer"
    ];

    echo "<br>";

    echo $employee['name'] . " " . $employee['position'];


    // Multidimentional Array

    $employees = [
        [
            "name" => "Dara",
            "age" => 25
        ],
        [
            "name" => "SreyMom",
            "age" => 30
        ]
    ];

    echo "<br>";

    echo "Name: " . $employees[1]['name'] . ", Age: " . $employees[1]['age'];

    echo "<br>Total Employees: " . count($employees);

    array_push($employees, $employee);

    echo "<br>";

    echo '<pre>';
    var_dump($employees);
    echo "</pre>";