<?php 
header('Access-Control-Allow-Origin: *');
include('fonction.php');
include('bdConnect.php');

$fonction = new Fonction($bd);
$GET = $fonction->viewUsers();

 json_encode($GET);


?>