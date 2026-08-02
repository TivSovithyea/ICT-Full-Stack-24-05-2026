<?php

    $fruits = ["Apple", "Banana", "Mango"];

    foreach($fruits as $fruit) {
        echo $fruit . "<br>";
    }

    $employee = [
        "name" => "Seyha",
        "position" => "Programmer"
    ];

    echo "<br>";

    foreach($employee as $key => $value) {
        echo $key . ": " . $value . "<br>";
    }