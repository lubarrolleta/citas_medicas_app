<?php
require_once('./restFull.php');
require_once('../src/utils/constantes.php');

// header('Content-Type: text/html');
$url = $IS_PROD ?  $URL_PROD : $URL_TEST; 

header('Access-Control-Allow-Origin: '.$url);
header("Access-Control-Allow-Headers: X-type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

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