<?php
    require('headers.php');
    include('fonction.php');

    
    $fonction = new Fonction();
    $listType = $fonction->getArticle();
     
     echo json_encode($listType);

?>