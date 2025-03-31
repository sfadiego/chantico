<?php

namespace App\Utils;

class Utils
{
    public static function getDateAsString(string $date)
    {
        $day = date('j', strtotime($date));
        $year = date('Y', strtotime($date));
        $month = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        $month = $month[(date('m', strtotime($date)) * 1) - 1];

        return $day.' de '.$month.' del '.$year;
    }
}
