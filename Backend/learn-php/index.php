<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php

        $name = "Dara";
        $age = -17;
        $height = 1.70;
        $isVote = false;
        $gender = false; // true = Male, false = Female

        echo "<h1>Hello World!</h1>";

        echo "Hello $name, $name is $age years old. His height is" . number_format($height, 2) . "<br>";

        echo "Welcome to ICT";

        echo "<br>";

        if($age >= 18) {
            echo "$name can vote!";
        } else if($age > 0) {
            echo "$name can't vote, Please try again next year!";
        } else {
            echo "Invalid age!";
        }

        echo "<br>";
        echo $gender ? "Male" : "Female"; // Ternary Operators


        // Excercise :

        /*

            Calculate Grade by score:

            Score <= 100 && Score >= 90     => Grade A
            Score < 90 && Score >= 80       => Grade B
            Score < 80 && Score >= 70       => Grade C
            Score < 70 && Score >= 60       => Grade D
            Score < 60 && Score >= 50       => Grade E
            Score < 50 && Score >= 0        => Grade F
            Score < 0                       => Invalid Score

        */
    ?>

    <h1>This is from HTML</h1>

    <?php

        echo "This is from PHP";

    ?>
</body>
</html>