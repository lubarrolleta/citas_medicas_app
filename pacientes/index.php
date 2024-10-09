<?php
require_once('./restFull.php');
// header('Content-Type: text/html');
header('Access-Control-Allow-Origin: http://localhost');
header("Access-Control-Allow-Headers: X-type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

// $nombre = $_GET['nombre'];
$restFull = new RestFull;
$request = $_SERVER['REQUEST_METHOD'];
// var_dump($request);

 
try {
    //code...
    $restFull->$request();
} catch (\Throwable $th) {
    //throw $th;
    echo $th;
}