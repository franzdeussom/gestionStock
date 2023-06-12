<?php
    require('headers.php');
    include('fonction.php');

    
    $fonction = new Fonction();
    $listEmployeConge = $fonction->getAllHollidaysRequestUsers();
    $listUserConge = $fonction->getAllHollidaysRequestEmploye();

    $response = array();
    array_push($response, $listEmployeConge);
    array_push($response, $listUserConge);

     echo json_encode($response);

?>