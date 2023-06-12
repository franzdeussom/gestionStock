<?php 
require('headers.php');
include('fonction.php');

$getData = file_get_contents('php://input');
if(isset($getData) && !empty($getData))
{ 
    $obj = json_decode($getData);
    
}else{
    http_response_code(403);
    return;
}


    if($obj->role === 'ADMINISTRATOR'){
         $fonction = new Fonction();
         http_response_code(200);
        echo  json_encode($fonction->getRapportStat());
    }else{
            http_response_code(501);
            echo json_encode([]);
    }

?>