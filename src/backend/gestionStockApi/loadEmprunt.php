<?php
    require('headers.php');
    include('fonction.php');

    
    $fonction = new Fonction();
    $listEmprunt = $fonction->getAllEmprunt();
     
     echo json_encode($listEmprunt);

?>