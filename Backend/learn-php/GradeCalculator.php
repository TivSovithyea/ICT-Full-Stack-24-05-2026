<?php

    $score = $_GET["score"]; // Super Global
    $name = $_GET["name"];

    echo "$name, ";

    if($score <= 100 && $score >= 90) {
        echo "Grade A";
    } else if($score < 90 && $score >= 80) {
        echo "Grade B";
    } else if($score < 80 && $score >= 70) {
        echo "Grade C";
    } else if($score < 70 && $score >= 60) {
        echo "Grade D";
    } else if($score < 60 && $score >= 50) {
        echo "Grade E";
    } else if($score < 50 && $score >= 0) {
        echo "Grade F";
    } else {
        echo "Invalid Score";
    }