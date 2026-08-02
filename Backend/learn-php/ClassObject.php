<?php

    class Car {
        public $brand;
        protected $color;

        public function __construct()
        {
            $this->brand = "N/A";
            $this->color = "N/A";
        }

        public function setColor($color) {
            $this->color = $color;
        }

        public function getColor() {
            return $this->color;
        }
    }

    $car1 = new Car();
    $car1->brand = "Toyota";
    $car1->setColor("Red");
    echo $car1->brand;
    echo $car1->getColor();
    echo "<br>";

    $car2 = new Car();
    $car2->brand = "BMW";
    echo $car2->brand;
    echo $car2->getColor();
    echo "<br>";

    $car3 = new Car();
    echo $car3->brand;
    echo $car3->getColor();
