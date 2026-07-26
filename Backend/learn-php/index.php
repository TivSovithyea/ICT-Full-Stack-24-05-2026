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
        $age = 17;
        $height = 1.70;
        $isVote = false;

        echo "<h1>Hello World!</h1>";

        echo "Hello $name, $name is $age years old. His height is" . number_format($height, 2) . "<br>";

        echo "Welcome to ICT";

        echo "<br>";

        if($age >= 18) {
            echo "$name can vote!";
        } else {
            echo "$name can't vote, Please try again next year!";
        }
    ?>

    <h1>This is from HTML</h1>

    <?php

        echo "This is from PHP";

    ?>
</body>
</html>