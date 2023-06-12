<?php
 require('headers.php');
 include('connectDB.php');
 include('fonction.php');

$getData = file_get_contents('php://input');

if(isset($getData) && !empty($getData))
{
    http_response_code(200);
    $obj = json_decode($getData);
}else{
    http_response_code(402);
    return;
}

$fonction = new Fonction();
$listEmploye = array();
$listEmploye = $obj;

foreach($listEmploye as $value){

 $isDone = $fonction->add_fich_pre($value->idUser, $value->dateDay, null, null, $value->statut, $value->idEmploye);

}


if($isDone)
{
    $response = [
        'add' => true,
        'message' => 'add of presence fiche success'
    ];
    echo json_encode($response);
}
else{
    echo json_encode([]);
}
?>