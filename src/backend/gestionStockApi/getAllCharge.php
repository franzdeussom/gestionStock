<?php
    require('headers.php');
    include('fonction.php');

    
    $fonction = new Fonction();
    $listPerte = $fonction->getAllPerte();
     
     echo json_encode($listPerte);

?>