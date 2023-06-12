<?php
require('headers.php');
include('fonction.php');
include('connectDB.php');

$getData = file_get_contents('php://input');

if(isset($getData) && !empty($getData))
{
    http_response_code(200);
    $obj = json_decode($getData);
}
else{
    http_response_code(403);
   
    return;
}

$typeUser = 'SYSTEM_USER';
$fonction = new Fonction();

if($obj->typeUser === $typeUser)
 {

$ifUpdate = $fonction->updateUser($obj->data);

    if($ifUpdate)
    {
        $response = [

            'valide' => true,
            'message' => 'update of user succeful'
        ];
        echo json_encode($response);
    }else{
        
        echo json_encode([]);

    }
}else{
   
$ifUpdate = $fonction->updateEmploye($obj->data);

    if($ifUpdate)
    {
        $response = [
            'valide' => true,
            'message' => 'update of user succeful'
        ];
        echo json_encode($response);
    }else{

        
        echo json_encode([]);

    }
}
?>