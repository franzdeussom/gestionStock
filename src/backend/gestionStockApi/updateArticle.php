<?php
 header('Access-Control-Allow-Origin: *');
 include('fonction.php');
 include('bdConnect.php');
 
 $getData = file_get_contents('php://input');

 if(isset($getData) && !empty($getData))
 {
    http_response_code(200);
    $obj = json_decode($getData);
 }else{
    http_response_code(402);
    return;
 }

 $fonction = new Fonction($bd);
 $ifUpdate = $fonction->updateArticle($obj->idArticle, $obj->nomArticle, $obj->qteCritique, $obj->type, $obj->prixAchat, $obj->idCommande);

 if($ifUpdate)
 {
    $response = [
        'update' => true,
        'message' => 'operation to update article success'
    ];
    echo json_encode($response);
 }else{
    echo json_encode([]);
 }
?>