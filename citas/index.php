<?php
require_once('../src/utils/constantes.php');

require_once('./restFull.php');
$url = $IS_PROD ?  $URL_PROD : $URL_TEST; 
header('Access-Control-Allow-Origin: '.$url);
header("Access-Control-Allow-Headers: X-type");
// file_exists(__DIR__ . '/includes/archivo.php')
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