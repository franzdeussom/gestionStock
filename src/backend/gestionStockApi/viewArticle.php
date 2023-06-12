<?php 
header('Access-Control-Allow-Origin: *');
include('fonction.php');
include('bdConnect.php');

$fonction = new Fonction($bd);
$GET = $fonction->viewArticles();
if(!empty($GET)){

    http_response_code(200);
    json_encode($GET);

}else{
    http_response_code(404);

    $GET = array();
     json_encode($GET);
}





?>