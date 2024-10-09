<?php
require_once('./restFull.php');
// header('Content-Type: text/html');
header('Access-Control-Allow-Origin: http://localhost');
header("Access-Control-Allow-Headers: X-type");

// $nombre = $_GET['nombre'];
$restFull = new RestFull;
$request = $_SERVER['REQUEST_METHOD'];
if(!empty($_POST)){
    // var_dump($_POST);
}
// var_dump($_SERVER['REQUEST_METHOD']);
// $x_type;
// if(isset(getallheaders()["x-type"])){
//     $x_type = getallheaders()["x-type"];
// }
 
try {
    //code...
    $restFull->$request();
} catch (\Throwable $th) {
    //throw $th;
    echo $th;
}
// echo "";
// echo $request;
// $conexxion = new Connection()