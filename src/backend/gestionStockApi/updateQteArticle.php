<?php 
header('Access-Control-Allow-Origin: *');
include('fonction.php');
include('bdConnect.php');
$fonction = new Fonction($bd);
if(isset($_POST['updateQteArticle']) && !empty($_POST['updateQteArticle']))
{
  $fonction->updateQte($qte,$id);
  http_response_code(200);
}
else{
    http_response_code(404);
    return;
}

?>