<?php 
require('headers.php');
include('fonction.php');

$getData = file_get_contents('php://input');

if(isset($getData) && !empty($getData))
{
  http_response_code(200);
  $obj = json_decode($getData);

}
else{
  http_response_code(402);
  return;
}

$fonction = new Fonction();
$isDel = $fonction->deleteSanction($obj->id);

if($isDel)
{
  $response = [
    'drop' => true, 
    'message' => 'operation success'
  ];
  echo json_encode($response);
}else{
  echo json_encode([]);
}

?>