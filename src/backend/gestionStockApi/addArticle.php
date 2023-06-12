<?php 
require('headers.php');
include('fonction.php');
include('connectDB.php');

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
$newDate = date('m/d/Y');

$ifADD = $fonction->addArticles($obj, $newDate);

if($ifADD){
    $response = [
        'add' => true,
        'message' => 'add to article success'
    ];
    echo json_encode($response);
}else{
    echo json_encode([]);
}

?>