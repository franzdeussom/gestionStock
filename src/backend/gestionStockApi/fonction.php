<?php 
    require('connectDB.php');

/**
 * 
 */
class Fonction
{
	private $_bd;
    private $gain;
    private $VenteTotal;

	function __construct()
	{
        global $conn;

        $this->VenteTotal = 0;
        $this->gain = 0;
		$this->setDb($conn);
	}

    //api login.php (systemUsers)
    function login($email, $mdp): array{
        $query = $this->_bd->prepare("SELECT * FROM gestionStock.users WHERE users.email =:email AND mdp =:mdp");
        $query->execute([
            ':email'=> $email,
            ':mdp'=> $mdp
        ]);

        $result = $query->fetchAll();
        $nbr_elment= count($result);

        return $nbr_elment > 0 ? $result : [];
    }


    //dev api updateEndValidity.php (dev)

    function updateValidity($endDate): bool{
            $query = $this->_bd->prepare("UPDATE gestionStock.users SET users.endValidity = :endDate");
            $query->execute([
                ':endDate'=>$endDate
            ]);
        return $query ? true : false;
    }


    //director api postMapping getAllEmploye.php
    //param id => get systemUsers without the person who make the request

    function getAllEmployee(): array{
        $query = $this->_bd->prepare("SELECT employe.id_employe, employe.nom,
                                             employe.prenom, employe.poste, employe.email,
                                             employe.tel, employe.cni, 
                                             employe.profilUrl
                                             FROM gestionStock.employe");
        $query->execute();

        $rslt = $query->fetchAll();
        $nbr_elment = count($rslt);

        return $nbr_elment > 0 ? $rslt : [];
    }


    function deleteUser($idUser): bool
    {
        $query = $this->_bd->prepare("DELETE FROM gestionStock.users WHERE users.idUser = :id" );
        $query->execute([
            ':id'=> $idUser
        ]);

        return $query ? true:false;
    }

    function deleteEmploye($id_Employ): bool
    {
       $query = $this->_bd->prepare("DELETE FROM gestionStock.employe WHERE employe.id_employe = :id" );
       $query->execute([
           ':id'=> $id_Employ
       ]);

       return $query ? true:false;
    }


    function updateEmploye($employe): bool
    {
        $query = $this->_bd->prepare(" UPDATE gestionStock.employe SET
                                                                 employe.nom = :nom, 
                                                                 employe.prenom = :prenom,
                                                                 employe.email = :email,
                                                                 employe.tel= :tel,
                                                                 employe.cni = :cni,
                                                                 employe.profilUrl = :profilUrl 
                                                             WHERE 
                                                             employe.id_employe = :id ");
        $query->execute([
            ':nom'=> $employe->nom,
            ':prenom'=>$employe->prenom,
            ':email'=>$employe->email,
            ':tel'=>$employe->tel,
            ':cni'=>$employe->cni,
            ':profilUrl'=>$employe->profilUrl,
            ':id'=>$employe->id_employe
        ]);
        return $query ? true : false;
    }


    function updateUser($user)
    {
        $query = $this->_bd->prepare("UPDATE gestionStock.users 
                                      SET users.mdp = :mdp 
                                WHERE users.idUser = :id ");
        $query->execute([
                ':mdp'=> $user->mdp,
                ':id'=>  $user->idUser
        ]);
        
        return $query ? true:false;
    }

    function add_fich_pre($idUser,$dateDAy,$heureArrive,$heureDepart,$statut,$idEmploye): bool
    {
      
          $query = $this->_bd->prepare("INSERT INTO gestionStock.fiche_pre_abs(idUser,dateDay,heureArrive,heureDepart,statut,idEmploye)
          VALUE(:idUser,:dateDay,:heureArrive,:heureDepart,:statut, :idEmploye)");
          $query->execute(array(
            'idUser' => $idUser,
            'dateDay' => $dateDAy,
            'heureArrive' => $heureArrive,
            'heureDepart' => $heureDepart,
            'statut' => $statut,
            'idEmploye' => $idEmploye
          ));
          return $query ? true : false;
    }

    function addUsers($newUser): bool{
     $query = $this->_bd->prepare("INSERT INTO gestionStock.users(nom, prenom, email, tel, cni, mdp, role, generatedBy, endValidity)
                                VALUES(:nomUser,:prenomUser,:emailUser,:telUser,:cniUser,:mdpUser, :Rols, :generatedBy, :endValidity)
        ");
    	$query->execute(array(
            'nomUser' => $newUser->nom,
            'prenomUser' => $newUser->prenom,
            'emailUser' => $newUser->email,
            'telUser' => $newUser->tel,
            'cniUser' => $newUser->cni,
            'mdpUser' => $newUser->mdp,
            'Rols' => $newUser->role,
            'generatedBy'=> $newUser->generatedBy,
            'endValidity' => $newUser->endValidity
    	));

        return $query ? true:false;
    }

    function getAllSytemUsers($id): array{
        $query = $this->_bd->prepare("SELECT * FROM gestionStock.users WHERE users.idUser <> :id AND users.role <> 'developper' AND users.role <> 'ADMINISTRATOR' ");
        $query->execute([
            ':id'=> $id
        ]);

        $rslt = $query->fetchAll();
        $row = count($rslt);

        return $row > 0 ? $rslt : [];
    }

    function addEmploye($employe){
        $query = $this->_bd->prepare("INSERT INTO gestionStock.employe(id_user,nom,prenom, poste, email,tel,cni,profilUrl)
        VALUE(:idUser,:nom,:prenom, :poste ,:email,:tel,:cni,:profilUrl)");
        $query->execute(array(
        'idUser' => $employe->idUser,
        'nom' => $employe->nom,
        'prenom' => $employe->prenom,
        ':poste' => $employe->poste,
        'email' => $employe->email,
        'tel' => $employe->tel,
        'cni' => $employe->cni,
        'profilUrl' => $employe->profilUrl
        ));

        return $query;
    }

    //api conge do an holliday Request
    function doHollidaysRequest($request): bool{

        $query = $this->_bd->prepare('INSERT INTO gestionStock.conge(idUser, id_employe, motif, date_dep, heure_dep, date_ret, heur_ret, statut)
                                      VALUES(:idUser,
                                             :id_employe,
                                             :motif,
                                             :dateDep,
                                             :heure_dep,
                                             :dateRet,
                                             :heureRet,
                                             :statut
                                            )
                                    ');
        $query->execute([
            ':idUser'=> $request->idUser,
            ':id_employe'=>$request->id_employe,
            ':motif'=> $request->motif,
            ':dateDep'=> $request->dateDepart,
            ':heure_dep'=>$request->heureDepart,
            ':dateRet'=>$request->dateRetour,
            ':heureRet'=>$request->heureRetour,
            ':statut'=>$request->statut
        ]);

        return $query ? true: false;
    }


    function deleteHolidays($id){
        $query = $this->_bd->prepare("DELETE FROM gestionStock.conge WHERE conge.idConge = :id");
        $query->execute([
           ':id'=>$id
        ]);
        return $query ? true:false;
    }


    function getAllHollidaysRequestUsers(){
        $query = $this->_bd->prepare('SELECT
                                             users.nom,
                                             users.prenom,
                                             users.role,
                                             
                                             conge.idConge,
                                             conge.motif,
                                             conge.date_dep as dateDepart,
                                             conge.date_ret as dateRetour
                                      FROM 
                                            gestionStock.users,
                                            gestionStock.conge
                                         WHERE 
                                             conge.idUser = users.idUser 
                                             ');
     $query->execute();
     $result = $query->fetchAll();

     return count($result) > 0 ? $result : [];
    }

    function getAllHollidaysRequestEmploye(){
        $query = $this->_bd->prepare('SELECT
                                             employe.nom,
                                             employe.prenom,
                                             employe.poste,
                                             
                                             conge.idConge,
                                             conge.motif,
                                             conge.date_dep as dateDepart,
                                             conge.date_ret as dateRetour
                                      FROM 
                                            gestionStock.employe,
                                            gestionStock.conge
                                         WHERE 
                                             conge.id_employe = employe.id_employe 
                                             ');
     $query->execute();
     $result = $query->fetchAll();

     return count($result) > 0 ? $result : [];
    }


    function createNewType($dataType): bool{
        $query = $this->_bd->prepare("INSERT INTO gestionStock.type_article(
                                                    libelle,
                                                    qteCritique,
                                                    prixUnitaire,
                                                    dateCreation
                                    )
        VALUES(:nom, :qteCritique, :prix, :dateCreation)
       ");

       $query->execute(array(
       ':nom' => $dataType->libelle,
       ':qteCritique' => $dataType->qteCritique,
       ':prix' =>$dataType->prixUnitaire,
       ':dateCreation'=>$dataType->dateCreation
        ));

        return $query ? true:false;
    }

    function getTypeArticle(): array{
            $query = $this->_bd->prepare("SELECT * FROM gestionStock.type_article ORDER BY type_article.id DESC");
            $query->execute();
            $result = $query->fetchAll();

            return count($result) > 0 ? $result:[];
    }

    function updateTypeArticle($newType): bool{
             $query = $this->_bd->prepare("UPDATE gestionStock.type_article 
                                           SET type_article.libelle = :nom,
                                               type_article.qteCritique = :qteCritique,
                                               type_article.prixUnitaire = :prix,
                                               type_article.dateCreation = :dateCreation
                                            WHERE type_article.id = :id     
                                        ");
        $query->execute([
            ':nom' => $newType->libelle,
            ':qteCritique' => $newType->qteCritique,
            ':prix' =>$newType->prixUnitaire,
            ':dateCreation'=>$newType->dateCreation,
            ':id'=> $newType->id
        ]);

        return $query ? true:false;
    }

    function addArticles($article, $date): bool{
      $query = $this->_bd->prepare("INSERT INTO gestionStock.articles(
                                                    nomArticle,
                                                    qteCourrante,
                                                    coutTotal,
                                                    idRefType,
                                                    dateCreation
                                    )
        VALUES(:nom, :qteCourrante, :coutTotal, :idType, :dateCreation)
       ");

       $query->execute([
        ':nom' => $article->nomArticle,
        ':qteCourrante' => $article->qteCourrante,
        ':coutTotal'=>$article->coutTotal,
        ':idType'=>$article->idRefType,
        ':dateCreation'=>$date
        ]
        );

        return $query ? true:false;
    }

    function getArticle(): array{
        $query = $this->_bd->prepare("SELECT articles.idArticle, 
                                            articles.nomArticle,
                                            articles.qteCourrante,
                                            articles.coutTotal,
                                            articles.dateCreation,
                                            articles.idRefType,
                                            type_article.qteCritique,      
                                            type_article.prixUnitaire,
                                            type_article.libelle as nomType

                                            FROM gestionStock.articles
                                                 INNER JOIN gestionStock.type_article 
                                                    ON articles.idRefType = type_article.id 
                                            ORDER BY articles.idArticle DESC
                                    ");

        $query->execute();
        $result = $query->fetchAll();

        return count($result) > 0 ? $result:[];
    }

  function updateArticleQte($article): bool{
        $query = $this->_bd->prepare("UPDATE gestionStock.articles 
                                      SET articles.qteCourrante = (articles.qteCourrante + :qty),
                                          articles.coutTotal = :cout

                                        WHERE articles.idArticle = :id     
                                        ");
        $query->execute([
            ':qty'=> $article->qteCourrante,
            ':cout'=> $article->coutTotal,
            ':id'=> $article->idArticle
        ]);

        return $query ? true:false;
    }


    function createNewVente($vente): bool{
        $query = $this->_bd->prepare("INSERT INTO gestionStock.articlevendue
                                                  (
                                                    articlevendue.idUser,
                                                    articlevendue.qteVendu,
                                                    articlevendue.prixVente,
                                                    articlevendue.montantVente,
                                                    articlevendue.marge,
                                                    articlevendue.dates,
                                                    articlevendue.heure,
                                                    articlevendue.idArticle)
                                        VALUES(
                                                :idUser,
                                                :qte,
                                                :prixVente,
                                                :montantVente,
                                                :marge,
                                                :dateVente,
                                                :heure,
                                                :idArticle 
                                                )
                                    ");

        $query->execute([
            ':idUser' =>$vente->idUser,
            ':qte' =>$vente->qteVendue,
            ':prixVente' =>$vente->prixVente,
            ':montantVente' => $vente->totalAPayer,
            ':marge' => $vente->marge,
            ':dateVente' => date("Y/m/d"),
            ':heure'=> date('H:i'),
            ':idArticle' => $vente->idArticle
        ]);

        //update qty database

        $otherUpdate = $this->_bd->prepare("UPDATE gestionStock.articles 
                                            SET articles.qteCourrante = (SELECT articles.qteCourrante FROM gestionStock.articles WHERE idArticle = :idArticle) - :qteVendue

                                            WHERE articles.idArticle = :idArticle");
        $otherUpdate->execute([
            ':qteVendue'=>$vente->qteVendue,
            ':idArticle'=>$vente->idArticle

        ]);
        
        return ($query && $otherUpdate) ? true:false;
    }

    
    function createNewEmprunt($emprunt): bool{
                    $query = $this->_bd->prepare("INSERT INTO gestionStock.emprunt
                                                  (
                                                    emprunt.qte,
                                                    emprunt.prixVente,
                                                    emprunt.netAPayer,
                                                    emprunt.date,
                                                    emprunt.statut,
                                                    emprunt.idUser,
                                                    emprunt.idArticle,
                                                    emprunt.idRefArticle,
                                                    emprunt.id_employe
                                                    )
                                        VALUES(
                                                :qte,
                                                :prixVente,
                                                :netAPayer,
                                                :dateVente,
                                                :statut,
                                                :idUser,
                                                :idArticle,
                                                :idRefArticle,
                                                :id_employe
                                                )
                                    ");

        $query->execute([
            ':qte' =>$emprunt->qte,
            ':prixVente' =>$emprunt->prixVente,
            ':netAPayer' => $emprunt->netAPayer,
            ':dateVente' => date('d/m/Y'),
            ':statut' => $emprunt->statut,
            ':idUser' =>$emprunt->idUser,
            ':idArticle' => $emprunt->idArticle,
            ':idRefArticle' => $emprunt->idRefArticle,
            ':id_employe' => $emprunt->id_employe
        ]);

        $otherUpdate = $this->_bd->prepare("UPDATE gestionStock.articles 
                                            SET articles.qteCourrante = (SELECT articles.qteCourrante FROM gestionStock.articles WHERE idArticle = :idArticle) - :qteVendue
                                            WHERE articles.idArticle = :idArticle");
        $otherUpdate->execute([
            ':qteVendue'=>$emprunt->qte,
            ':idArticle'=>$emprunt->idArticle

        ]);
        
        return ($query && $otherUpdate) ? true:false;

    }

    function getAllEmprunt(): array{
        $userEmprunts = $this->_bd->prepare("SELECT 
                                            emprunt.id, 
                                            emprunt.qte, 
                                            emprunt.prixVente, 
                                            emprunt.netAPayer,
                                            emprunt.date, 
                                            emprunt.statut, 
                                            users.nom, 
                                            users.prenom, 
                                            users.role,
                                            articles.nomArticle, 
                                            type_article.libelle as 'nomType',
                                            type_article.prixUnitaire
                                         FROM 
                                         gestionStock.emprunt, 
                                         gestionStock.articles,
                                         gestionStock.type_article, 
                                         gestionStock.users
                                         WHERE users.idUser = emprunt.idUser 
                                            AND articles.idArticle = emprunt.idArticle
                                             AND type_article.id = emprunt.idRefArticle
                                    ");
        $userEmprunts->execute();
        $employeEmprunts = $this->_bd->prepare("SELECT 
                                            emprunt.id, 
                                            emprunt.qte, 
                                            emprunt.prixVente, 
                                            emprunt.netAPayer,
                                            emprunt.date, 
                                            emprunt.statut, 
                                            employe.nom, 
                                            employe.prenom, 
                                            employe.poste,
                                            articles.nomArticle, 
                                            type_article.libelle as 'nomType',
                                            type_article.prixUnitaire
                                         FROM 
                                         gestionStock.emprunt, 
                                         gestionStock.articles,
                                         gestionStock.type_article, 
                                         gestionStock.employe
                                         WHERE employe.id_employe = emprunt.id_employe
                                            AND articles.idArticle = emprunt.idArticle
                                             AND type_article.id = emprunt.idRefArticle
                                             ");
        $employeEmprunts->execute();

        $tabAllEmprunt = array();


        $employeRslt = $employeEmprunts->fetchAll();

        $empTabEmprunt = count($employeRslt) > 0 ? $employeRslt : [];

        array_push($tabAllEmprunt, $empTabEmprunt);

        $userRslt = $userEmprunts->fetchAll();
        $usersTabEmprunt = count($userRslt) > 0 ? $userRslt:[];

        array_push($tabAllEmprunt, $usersTabEmprunt);

        return $tabAllEmprunt;
    }

    function deleteEmprunt($id): bool{
        $query = $this->_bd->prepare("DELETE FROM gestionStock.emprunt WHERE emprunt.id = :id");
        $query->execute([
           ':id'=>$id
        ]);
        return $query ? true:false;
    }

   function updateEmpruntStatut($obj){
      $query = $this->_bd->prepare("UPDATE gestionStock.emprunt 
                                    SET emprunt.statut = :statut 
                                    WHERE emprunt.id = :id");
      $query->execute([
            ':statut'=>$obj->statut,
            ':id'=> $obj->id
      ]);
        
      return $query ? true:false;
    }

    function createSanction($sanction){
        $query = $this->_bd->prepare("INSERT INTO gestionStock.sanction(
                                              idUser,
                                              id_employe,
                                              motif,
                                              amande,
                                              dates)
                                         VALUE (
                                                :idUser,
                                                :id_employe,
                                                :motif,
                                                :amande,
                                                :dates)
                                ");
     $query->execute([
            ':idUser'=> $sanction->idUser,
            ':id_employe'=> $sanction->id_employe,
            ':motif'=> $sanction->motif,
            ':amande'=> $sanction->amande,
            ':dates'=> $sanction->dates
       ]);

       return $query ? true:false;
    }
    
    function getAllSanction(){
        $query = $this->_bd->prepare("SELECT 
                                            users.nom,
                                            users.prenom,
                                            users.role,
                                            users.idUser,
                                            sanction.id,
                                            sanction.motif,
                                            sanction.amande,
                                            sanction.dates
                                        FROM 
                                        gestionStock.users,
                                        gestionStock.sanction
                                            WHERE users.idUser = sanction.idUser 
                                            ORDER BY sanction.id DESC
                                            ");
        $query->execute();
        $requesteUsers = $query->fetchAll(PDO::FETCH_ASSOC);


        $queryEmploye = $this->_bd->prepare("SELECT employe.nom,
                                                    employe.prenom,
                                                    employe.poste,
                                                    employe.id_employe,
                                                    sanction.id,
                                                    sanction.motif,
                                                    sanction.amande,
                                                    sanction.dates 
                                            FROM
                                             gestionStock.employe,
                                             gestionStock.sanction
                                                WHERE employe.id_employe = sanction.id_employe 
                                                    ORDER BY sanction.id DESC
                                                    ");

        $queryEmploye->execute();
        $requesteEmploye = $queryEmploye->fetchAll(PDO::FETCH_ASSOC);

        $rsltEmplye = count($requesteEmploye) > 0 ? $requesteEmploye : [];
        $rsltUser = count($requesteUsers) > 0 ? $requesteUsers: [];

        $reslt = array(); 

        array_push($reslt, $rsltEmplye);
        array_push($reslt, $rsltUser);

        return $reslt;
    }

    function deleteSanction($sanctionID){
        $query = $this->_bd->prepare("DELETE FROM gestionStock.sanction WHERE sanction.id = :id");
        $query->execute([
           ':id'=>$sanctionID
        ]);
        return $query ? true:false;
    }

    //perte ********************************
    
    function addPerte($perte): bool{
        if(!is_null($perte->idArticle)){
          $query = $this->_bd->prepare("INSERT INTO 
                                                gestionStock.perte(
                                                    motif,
                                                    prix,
                                                    qte,
                                                    dates,
                                                    idArticle)
                                             VALUES(
                                                  :motif,
                                                  :prix,
                                                  :qte,
                                                  :dates,
                                                  :idArticle)                                               
                                    ");
         $query->execute([
                ':motif'=> $perte->motif,
                ':prix'=> $perte->prix,
                ':qte'=> $perte->qte,
                ':dates'=> $perte->dates,
                ':idArticle'=> $perte->idArticle
         ]);

                $otherUpdate = $this->_bd->prepare("UPDATE gestionStock.articles 
                                            SET articles.qteCourrante = (SELECT articles.qteCourrante FROM gestionStock.articles WHERE idArticle = :idArticle) - :qtePerdu
                                            WHERE articles.idArticle = :idArticle");
                $otherUpdate->execute([
                    ':qtePerdu'=>$perte->qte,
                    ':idArticle'=>$perte->idArticle
                ]);
        
         return ($query && $otherUpdate) ? true:false;

        }else{
                $query = $this->_bd->prepare("INSERT INTO 
                                                gestionStock.perte(
                                                    motif,
                                                    prix,
                                                    qte,
                                                    dates,
                                                    idArticle)
                                             VALUES(
                                                  :motif,
                                                  :prix,
                                                  :qte,
                                                  :dates,
                                                  :idArticle)                                               
                                    ");
                $query->execute([
                        ':motif'=> $perte->motif,
                        ':prix'=> $perte->prix,
                        ':qte'=> $perte->qte,
                        ':dates'=> $perte->dates,
                        ':idArticle'=> $perte->idArticle
                ]);

             return $query ? true:false;
        }
    

    }

    function getAllPerte(): array{
        $query = $this->_bd->prepare("SELECT 
                                            perte.id,
                                            perte.motif,
                                            perte.qte,
                                            perte.prix,
                                            perte.dates,
                                            perte.idArticle,
                                            articles.nomArticle
                                            FROM 
                                                gestionStock.perte, gestionStock.articles

                                                WHERE 
                                                    perte.id = perte.id
                                                    AND
                                                    (perte.idArticle = articles.idArticle OR perte.idArticle IS NOT null)
                                                    ORDER BY perte.id DESC
                                            ");
        $query->execute();
        $queryRslt = $query->fetchAll();
        $tab = count($queryRslt) > 0 ? $queryRslt:[];

        $subQuery = $this->_bd->prepare("SELECT
                                                perte.id,
                                                perte.motif,
                                                perte.prix,
                                                perte.dates
                                                FROM 
                                                gestionStock.perte where perte.qte IS NULL;
                                                ORDER BY perte.id DESC
                                            ");

        $subQuery->execute();
        $subQueryRslt = $subQuery->fetchAll();
        $tabSub = count($subQueryRslt) > 0 ? $subQueryRslt:[];

        $rslt = array();
        array_push($rslt, $tab);
        array_push($rslt, $tabSub);

        return $rslt;  
    }

    //******************** */

    //rapport ******************************   

    function getRapportVente(): array {
        $query = $this->_bd->prepare("SELECT										
											users.nom,
                                            users.prenom,
                                            users.role,
                                            type_article.libelle as 'nomType',
                                            type_article.prixUnitaire,
                                            articles.nomArticle,
                                            articlevendue.qteVendu as 'qteVendue',
                                            articlevendue.prixVente,
                                            articlevendue.marge,
                                            articlevendue.montantVente,
                                            articlevendue.heure,
                                            articlevendue.dates 

                                      FROM gestionStock.users,
                                           gestionStock.articles, gestionStock.articlevendue, gestionStock.type_article

                                        WHERE articles.idArticle = articlevendue.idArticle
                                         AND   articles.idRefType = type_article.id
                                         AND articlevendue.idUser = users.idUser 
                                         ORDER BY articlevendue.idVente DESC
                                         ");
        $query->execute();
        $response = $query->fetchAll(PDO::FETCH_ASSOC);

        return count($response) > 0 ? $response:[];
    }

    function getVenteJour(){
            $query = $this->_bd->prepare("SELECT										
											users.nom,
                                            users.prenom,
                                            users.role,
                                            type_article.libelle as 'nomType',
                                            type_article.prixUnitaire,
                                            articles.nomArticle,
                                            articlevendue.idVente,
                                            articlevendue.qteVendu as 'qteVendue',
                                            articlevendue.prixVente,
                                            articlevendue.marge,
                                            articlevendue.montantVente,
                                            articlevendue.heure,
                                            articlevendue.dates 

                                      FROM gestionStock.users,
                                           gestionStock.articles, gestionStock.articlevendue, gestionStock.type_article

                                        WHERE articles.idArticle = articlevendue.idArticle
                                         AND   articles.idRefType = type_article.id
                                         AND articlevendue.idUser = users.idUser 
                                         AND articlevendue.dates = :dateJour
                                         ORDER BY articlevendue.idVente DESC
                                           ");
        $query->execute([
                ':dateJour'=> date('Y/m/d')
        ]);
        
        $response = $query->fetchAll(PDO::FETCH_ASSOC);

        return count($response) > 0 ? $response:[];
    }


    function getRapportPresenceEmploye(): array {

        $query = $this->_bd->prepare("SELECT fiche_pre_abs.id,
                                             fiche_pre_abs.idEmploye as id_employe,
                                             fiche_pre_abs.dateDay,
                                             fiche_pre_abs.statut,
                                             fiche_pre_abs.heureDepart,
                                             fiche_pre_abs.heureArrive,
                                             employe.nom,
                                             employe.prenom,
                                             employe.poste
                                             FROM 
                                                gestionStock.fiche_pre_abs, 
                                                gestionStock.employe
                                                WHERE fiche_pre_abs.idEmploye = employe.id_employe 
                                                ORDER BY fiche_pre_abs.id DESC 
                                            
                                            ");
        $query->execute();
        $requeste = $query->fetchAll(PDO::FETCH_ASSOC);

        return count($requeste) > 0 ? $requeste:[];
    }

    function getRapportPresenceUsers(){
             $query = $this->_bd->prepare("SELECT fiche_pre_abs.id,
                                             fiche_pre_abs.idUser,
                                             fiche_pre_abs.dateDay,
                                             fiche_pre_abs.statut,
                                             fiche_pre_abs.heureDepart,
                                             fiche_pre_abs.heureArrive,
                                             users.nom,
                                             users.prenom,
                                             users.role
                                             FROM 
                                                gestionStock.fiche_pre_abs, 
                                                gestionStock.users
                                                WHERE fiche_pre_abs.idUser = users.idUser 
                                                ORDER BY fiche_pre_abs.id DESC 
                                            
                                            ");
        $query->execute();
        $requeste = $query->fetchAll(PDO::FETCH_ASSOC);

        return count($requeste) > 0 ? $requeste:[];
    }

    function getRapportStat(): array {  

        $this->getSumGainVente();

        $response = [
            'coutsStockActuel'=> $this->getCoutStock(),
            'montantEmprunt'=> $this->getSumEmprunt(),
            'coutVente'=> $this->VenteTotal,
            'gain'=> $this->gain,
            'coutCharge'=> $this->getSumPerte()

        ];

        return $response;
    }


            private function getSumPerte(): int{
                $queryArticle = $this->_bd->prepare("SELECT 
                                                    IFNULL(SUM(perte.qte * perte.prix), 0) as perteArticle
                                                    FROM gestionStock.perte 
                                                    WHERE perte.idArticle IS NOT NULL 
                                                   " );
                $queryArticle->execute();

                $rslt = $queryArticle->fetch(PDO::FETCH_ASSOC);
                $prixArticle = count($rslt) > 0 || isset($rslt['perteArticle']) ? $rslt['perteArticle'] : 0;



                $queryDivers = $this->_bd->prepare("SELECT 
                                                    IFNULL(SUM(perte.prix), 0) as perteDivers
                                                    FROM gestionStock.perte
                                                        WHERE perte.idArticle IS NULL 
                                                ");
                $queryDivers->execute();

                $rsltDivers = $queryDivers->fetch(PDO::FETCH_ASSOC);
                $prixDivers = count($rsltDivers) > 0 || isset($rslt['perteDivers']) ? $rsltDivers['perteDivers'] : 0;
                
                return $prixArticle + $prixDivers;

            }

            private function getSumEmprunt(): int{

                $query = $this->_bd->prepare("SELECT 
                                                    IFNULL(SUM(emprunt.netAPayer),0) as montantEmprunt
                                                    FROM gestionStock.emprunt 
                                                        WHERE emprunt.statut = 'NON REGLE' 
                                            " );
                $query->execute();

                $rslt = $query->fetch(PDO::FETCH_ASSOC);
                
                return (count($rslt) > 0 || isset($rslt['montantEmprunt'])) ? $rslt['montantEmprunt'] : 0;
            }

            private function getSumGainVente(){
                $query = $this->_bd->prepare("SELECT iFNULL(SUM(articlevendue.montantVente), 0) as coutVente,
                                                        IFNULL(SUM(articlevendue.marge), 0) as gain
                                                         FROM gestionStock.articlevendue 
                                              ");
                $query->execute();

                 $queryEmpruntRegle = $this->_bd->prepare("SELECT 
                                                    IFNULL(SUM(emprunt.prixVente),0) as empruntRegle
                                                    FROM gestionStock.emprunt 
                                                        WHERE emprunt.statut = 'REGLE' 
                                                         ");
                $queryEmpruntRegle->execute();
                $rslt = $queryEmpruntRegle->fetch(PDO::FETCH_ASSOC);

                $empruntRegle = (count($rslt) > 0 || is_numeric($rslt['empruntRegle'])) ? $rslt['empruntRegle'] : 0;

                $rslt = $query->fetchAll();
                    if(count($rslt) > 0){
                        foreach($rslt as $i){
                            $this->VenteTotal =(is_numeric($i['coutVente']) && !is_null($i['coutVente'])) ? ((int) $i['coutVente']) : 0;
                            $this->gain = (is_numeric($i['gain']) && !is_null($i['gain'])) ? ((int) $i['gain']) : 0;

                        }

                        $this->gain = $this->gain + $empruntRegle;
                    }
            }


            private function getCoutStock(): int {
                $query = $this->_bd->prepare("SELECT 
                                                IFNULL(SUM(articles.qteCourrante * type_article.prixUnitaire), 0) as 'coutsStockActuel' 
                                                FROM gestionStock.articles, gestionStock.type_article
                                             WHERE articles.idRefType = type_article.id");
                $query->execute();

                $rslt = $query->fetch(PDO::FETCH_ASSOC);
                
                return (count($rslt) > 0 || isset($rslt['coutsStockActuel'])) ? $rslt['coutsStockActuel'] : 0;
            }






    
    function addClients($nomClient, $cniClient, $telClient)
    {
        $query = $this->_bd->prepare("INSERT INTO clients(nomClient, cniClient, telClient) VALUES(:nomClient,:cniClient,:telClient)");
        $query->execute(array( 
        'nomClient' => $nomClient,
        'cniClient' => $cniClient,
        'telClient' => $telClient
        ));
        //$idClient = $this->_bd->lastInsertId();
    }


    function addEmprunt($idClient, $nomClient, $nomArticle, $qteEMprunte, $prixVente, $montantTotal)
    {
        $query = $this->_bd->prepare("INSERT INTO emprunt(idClient,nomClient,nomArticle,qteEmprunte,prixVente,montantTotal) 
        VALUE(:idClient,:nomClient,:nomArticle,:qteEmprunte,:prixVente,:montantTotal)");
        $query->execute(array(
            'idClient' => $idClient,
            'nomClient' => $nomClient,
            'nomArticle' => $nomArticle,
            'qteEmprunte' => $qteEMprunte,
            'prixVente' => $prixVente,
            'montantTotal' => $montantTotal
        ));
    }

    function viewUsers()
    {
        $query = $this->_bd->prepare("SELECT idUser,nomUser,prenomUser,emailUser,telUser,cniUser FROM users");
        $query->execute();
        $requeste = $query->fetchAll(PDO::FETCH_ASSOC);
        return $requeste;
    }

     function viewArticles()
    {
        $query = $this->_bd->prepare("SELECT idArticle,nomArticle,qteInit,prixAchat,qteCritique,type FROM articles");
        $query->execute();
        $requeste = $query->fetchAll(PDO::FETCH_ASSOC);
        return $requeste;
    }

    function viewClients()
    {
        $query = $this->_bd->prepare("SELECT idClient,nomClient,cniClient,telClient FROM clients");
        $query->execute();
        $requeste = $query->fetchAll(PDO::FETCH_ASSOC);
        return $requeste;
    }

    function alerteArticle()
    {
        $query = $this->_bd->prepare("SELECT nomArticle, qteInit FROM articles WHERE qteInit = qteCritique");
        $query->execute();
        $requeste = $query->fetchAll(PDO::FETCH_ASSOC);
        return $requeste;
    }

    function getQteCommande($idCommande)
    {
        $query = $this->_bd->prepare("SELECT qteArticle FROM commande 
        WHERE idCommande = $idCommande");
        $query->execute();
        $q = $query->fetchColumn();
        return $q;
    }

    function updateQteArticle($qte,$idCommande)
    {
        echo'' .$qte.$idCommande;
         $this->_bd->exec("UPDATE articles as a SET a.qteInit = $qte
          WHERE a.idArticle = (SELECT c.idCommande FROM commande as c
         WHERE c.idCommande = a.idArticle and c.idCommande = $idCommande)");
    }

    function updateMontantTotal($avance,$id)
    {
      $this->_bd->exec("UPDATE emprunt SET montantTotal =(montantTotal - $avance) WHERE idEmprunt = $id");
    }


    function deleteArticle($id)
    {
        $this->_bd->exec('DELETE FROM articles WHERE idArticle ='.$id);
    }

    function deleteClient($id)
    {
        $this->_bd->exec('DELETE FROM clients WHERE idClient ='.$id);
    }


    function giveInformationUsersSend(){
        $query = $this->_bd->prepare("SELECT a.nomArticleVendu as nom_article, a.qteVendu as quantite,a.marge as marge,a.dates as date_vente,a.heure as heure,
        (select u.nomUser from users as u
        where u.idUser = a.idArticleVendu ) as nom_vendeur,
        (select c.nomClient from clients as c
        where c.idClient = a.idArticleVendu) as nom_client
         FROM articlevendue as a");
        $query->execute();
        $response = $query->fetchAll();
        return $response;
    }

    function giveInformationEmprunt()
    {
        $query = $this->_bd->prepare("SELECT e.nomArticle as nom_article, e.qteEmprunte as quantite, e.prixVente as prix_vente, e.montantTotal as net_a_payer, 
        e.date as date_emprunt, e.heure as heure, 
        (SELECT c.nomClient from clients as c
         WHERE c.idClient = e.idEmprunt) as nom_client
        FROM emprunt as e");
        $query->execute();
        $response = $query->fetchAll();
        return $response;
    }

    function montantTotal($id)
    {
     $query = $this->_bd->exec("UPDATE emprunt set montantTotal = (prixVente*qteEmprunte) where  idEmprunt = $id");
     return $query;
    }

    function mailExist($emailUser){
        $query = $this->_bd->prepare("SELECT emailUser FROM users where emailUser = :emailUser");
        $query->execute(array(
         'emailUser' => $emailUser
        ));
        $response = $query->rowCount();
        return $response;
    }

     function mdpExist($mdpUser){
        $query = $this->_bd->prepare("SELECT mdpUser FROM users where mdpUser = :mdpUser");
        $query->execute(array(
         'mdpUser' => $mdpUser
        ));
        $response = $query->rowCount();
        return $response;
    }

     function telExist($telUser){
        $query = $this->_bd->prepare("SELECT telUser FROM users where telUser = :telUser");
        $query->execute(array(
         'telUser' => $telUser
        ));
        $response = $query->rowCount();
        return $response;
    }

   
	function setDb($bd)
	{
		$this->_bd = $bd;
	}
}

?>