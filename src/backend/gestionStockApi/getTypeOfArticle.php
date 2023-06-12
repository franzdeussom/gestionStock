<?php
    require('headers.php');
    include('fonction.php');

    
    $fonction = new Fonction();
    $listType = $fonction->getTypeArticle();
     
     echo json_encode($listType);



?>