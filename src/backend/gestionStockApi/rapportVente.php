<?php
    require('headers.php');
    include('fonction.php');

    
    $fonction = new Fonction();
    $listType = $fonction->getRapportVente();
     
     echo json_encode($listType);

?>