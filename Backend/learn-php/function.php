<?php

    function greet($name) {
        return "Hello, $name";
    }

    echo greet("Dara");

    function checkGender($gender = null) {
        if($gender === true) {
            return "Male";
        } else if($gender === false) {
            return "Female";
        } else {
            return "N/A";
        }
    }
    echo "<br>";
    echo checkGender();
    echo "<br>";
    echo checkGender(true);