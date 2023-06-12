<?php
require('headers.php');
include('fonction.php');

$fonction = new Fonction();

$emloye = $fonction->getRapportPresenceEmploye();
$user = $fonction->getRapportPresenceUsers();

 $final = array();

  array_push($final, $emloye);
  array_push($final, $user);

  echo json_encode($final);
?>