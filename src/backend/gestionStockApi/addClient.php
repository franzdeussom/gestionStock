<?php 
header('Access-Control-Allow-Origin: *');
include('fonction.php');
include('bdConnect.php');

if(isset($_POST['addClient']) && !empty($_POST['addClient']))
{ 
    http_response_code(200);
    $fonction = new Fonction($bd);
    $obj = json_decode($_POST['addClient']);
    try {
        $query = $fonction->addClients($obj->nomClient,$obj->cniClient,$obj->telClient);
        $response = [
            '' => $query,
            'success' => true
        ];
    } catch (PDOException $e) {
        $response = [
            'success' => false,
            'message' =>file_put_contents('errorlog.txt',$e.getMessage())
        ];
    }
    json_encode($response);
}
else{
    http_response_code(302);
    return;
}


?>