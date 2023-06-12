<?php 
require('headers.php');
include('fonction.php');

$getData = file_get_contents('php://input');
if(isset($getData) && !empty($getData))
{ 
    http_response_code(200);
    $obj = json_decode($getData);
    
}else{
    http_response_code(403);
    return;
}

    $fonction = new Fonction();

    $isDone = $fonction->createSanction($obj);

if($isDone){
    $response = [
        'add' => true,
        'message' => 'add to database success'
    ];
    echo json_encode($response);
}else{
    echo json_encode([]);
}

?>