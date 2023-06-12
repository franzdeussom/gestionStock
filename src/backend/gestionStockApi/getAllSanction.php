<?php
    require('headers.php');
    include('fonction.php');

    
    $fonction = new Fonction();
    $listSanction = $fonction->getAllSanction();
     
     echo json_encode($listSanction);

?>