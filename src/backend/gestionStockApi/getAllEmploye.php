<?php
    require('headers.php');
    include('fonction.php');

    $getData = file_get_contents('php://input');

    if(isset($getData) && !empty($getData)){
        $data = json_decode($getData);
        $fonction = new Fonction();
    }else{
        http_response_code(501);
        return;
    }
    $response = array();

     $listUsers = $fonction->getAllSytemUsers($data->id);
     $listEmploye = $fonction->getAllEmployee();

     array_push($response, $listUsers);
     array_push($response, $listEmploye);

     echo json_encode($response);



?>