<?php
require('headers.php');
include("fonction.php");
include("connectDB.php");

$getData = file_get_contents('php://input');

if(isset($getData) && !empty($getData))
{
    $obj = json_decode($getData);

    $fonction = new Fonction();
    $addSuccess = $fonction->addEmploye($obj);

        if($addSuccess)
        {
            http_response_code(200);
            $response = [
                'valide' => true,
                'message' => 'add to employe succeful'
            ];

           echo json_encode($response);
            
        }
        else{
            http_response_code(502);
            echo json_encode([]);
        }

}else{
    http_response_code(501);
    return;
}

?>