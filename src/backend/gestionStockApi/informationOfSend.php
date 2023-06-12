<?php 
header('Access-Control-Allow-Origin: *');
include('fonction.php');
include('bdConnect.php');

$fonction = new Fonction($bd);
$informtionOfSend = $fonction->giveInformationUsersSend();

 echo json_encode($informtionOfSend);


?>