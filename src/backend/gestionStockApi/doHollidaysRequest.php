<?php
    require('headers.php');
    include('fonction.php');

    $getData = file_get_contents('php://input');

    if(isset($getData) && !empty($getData))
    {
      $obj = json_decode($getData);
      $fonction = new Fonction();
    }else{
      http_response_code(403);
      return;
    }

   $isDone = $fonction->doHollidaysRequest($obj);

   if($isDone){
        $response = [
            'done'=>true,
            'message'=> 'any add'
        ];
        echo  json_encode($response);
   }else{
        echo json_encode([]);
   }
?>