<?php
    require('headers.php');
    include('fonction.php');

    $getData = file_get_contents('php://input');

    if(isset($getData) && !empty($getData)){
        $data = json_decode($getData);
        $fonction = new Fonction();
        /*
            $date = date(d/m/Y);
            $tmp = explode('/', $date);
            $build = ''.$tmp[0].$tmp[1].$tmp[2];
            $currentDate = (int) $build; 
        */
    }else{
        http_response_code(501);
        return;
    }

    $userCredentials = $fonction->login($data->email, $data->mdp);

    if(count($userCredentials) > 0){
        if($userCredentials[0]['role'] === 'developper'){
            $resp = json_encode([
                'isValid'=> true,
                'data'=> $userCredentials
            ]);
            echo $resp;
        }else{
            $endValidty = $userCredentials[0]['endValidity'];
            $currentDate = date("Y/m/d");
            if($currentDate <= $endValidty){
                $resp = json_encode([
                    'isValid'=> true,
                    'data'=> $userCredentials
                ]);
                echo $resp;
            }else{
                $resp = json_encode([
                    'isValid'=>false,
                    'data'=> [''],
                    'message'=> "Votre abonement ou contrat d'utilisation de cette application a expiré en ce jour du " . date('Y/m/d') . ' à 00h 00min '
                ]);
                echo $resp;
            }
        }     

    }else{
            $resp = json_encode([]);
            echo $resp;
    }

?>