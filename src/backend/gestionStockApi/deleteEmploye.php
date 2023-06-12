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
$type = 'SYSTEM_USER';

if($obj->typeUser === $type)
{
  $isDel = $fonction->deleteUser($obj->data->idUser);
  if($isDel)
  {
    $response = [
      'drop' => true,
      'message' => 'drop user succeful'
    ];
    echo json_encode($response);
  }else{
    echo json_encode([]);
  }
}else{
 
  $isDel = $fonction->deleteEmploye($obj->data->id_employe);
  if($isDel)
  {
    $response = [
      'drop' => true,
      'message' => 'drop user succeful'
    ];
    echo json_encode($response);
  }else{
    echo json_encode([]);
  }
}

?>