<?php
    require('headers.php');
    include('fonction.php');

    $getData = file_get_contents('php://input');

    if(isset($getData) && !empty($getData)){
        $data = json_decode($getData);
        $fonction = new Fonction();
    }else{
        http_response_code(501);
        return;
    }

    $isDone = $fonction->updateEmpruntStatut($data);

    if($isDone){
        $resp = json_encode([
            'done'=> true
        ]);
        echo $resp;
    }else{
        echo json_encode([]);
    }


?>