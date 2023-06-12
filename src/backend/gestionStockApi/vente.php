<?php 
require('headers.php');
include('fonction.php');

$getData = file_get_contents('php://input');

if(isset($getData) && !empty($getData))
{
  http_response_code(200);
  $article = json_decode($getData);

}
else{
  http_response_code(402);
  return;
}

$fonction = new Fonction();
$isDone = $fonction->createNewVente($article);

if($isDone)
{
  $response = [
    'drop' => true, 
    'message' => 'operation of drop article success'
  ];
  echo json_encode($response);
}else{
  echo json_encode([]);
}

?>