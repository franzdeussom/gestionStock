<?php 
header('Access-Control-Allow-Origin: *');
include('fonction.php');
include('bdConnect.php');


    if(isset($_POST['informationUser']) && !empty($_POST['informationUser']))
    {
         http_response_code(200);
         $fonction = new Fonction($bd);

         $obj = json_decode($_POST['informationUser']);

         $email = $fonction->mailExist($obj->emailUser); 
         
         $tel = $fonction->telExist($obj->telUser); 
       
         $mdp = $fonction->mdpExist($obj->mdpUser);
         
         try {
     
            if($email === 1 || $tel === 1 || $mdp === 1)
            {

               $response = [
                
                  'message' => 'l\'une des information fournie existe deja!',
                  'valide' => false
                   
               ];
            } 
            else{
               
               $fonction->addUsers($obj->nomUser, $obj->prenomUser, $obj->emailUser ,
                $obj->telUser , $obj->cniUser , $obj->mdpUser);

                $response = [
                  
                  'message' => 'enregistrement reussi!',
                  'valide' => true
                  
                ];
               
            }

           echo json_encode($response);

         } catch (PDOException $e) {

            die('nous n\'avons pas pu traiter vos donnee'.$e->getMessage());
         }
        
    }
    else{
         
         http_response_code(404);
        echo json_encode([]);
    }

?>