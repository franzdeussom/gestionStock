<?php
    require('headers.php');
    include('fonction.php');

    
    $fonction = new Fonction();
    $listVente = $fonction->getVenteJour();
     
     echo json_encode($listVente);

?>