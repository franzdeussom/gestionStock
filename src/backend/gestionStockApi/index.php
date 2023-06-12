<?php
header('Access-Control-Allow-Origin: *');
include("fonction.php");
include("bdConnect.php");

if(isset($_POST['connect']) && !empty($_POST['connect']))
{
    http_response_code(200);
    $fonction = new Fonction($bd);

    $obj = json_decode($_POST['connect']);

    $mdp = $fonction->mdpExist($obj->mdpUser);
    $email = $fonction->mailExist($obj->emailUser);  
    try {

        if($mdp === 0  || $email === 0)
        {
            $response = [
                'message' => 'echec de transmission',
                'valide' => false
            ];
        }
        else{
            $response = [
               'message' => 'transmission reussi',
               'valide' => true
            ];
        }
       echo json_encode($response);

    } catch (PDOException $e) {
        die('erreur l\'hors de la transmission'.$e->getMessage());
    } 
    }
    else{
        http_response_code(404);
       echo json_encode([]);
    }

?>