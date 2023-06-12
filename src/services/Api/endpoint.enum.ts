export enum Endpoint{
        login = 'login',

        //employe
        LOAD_ALL_EMPLOYE = 'getAllEmploye',
        UPDATE_EMPLOYE  = 'updateEmploye',
        DELETE_EMPLOYE  = 'deleteEmploye',
        REGISTER_EMPLOYE = 'addEmploye',
        REGISTER_USER = 'registerUser',
        SAVE_PRENSENCE_EMPLOYE = 'addFichePresence',
        UPDATE_USER_PASSWORD = 'updateUser',

        //conge
       CREATE_HOLIDAY = 'doHollidaysRequest',
       CONFIRM_HOLIDAY_REQUEST = 'confirmConge',
       GET_HOLIDAY_REQUEST = 'getAllEmployeConge',
       DELETE_HOLIDAY_REQUEST = 'deleteDemandeConge',

       //article
       ADD_ARTICLE = 'addArticle',
       UPDATE_ARTICLE = 'updateArticle',
       UPDATE_ARTICLE_QTY = 'updateArticleQte',
       NEW_VENTE_REQUEST = 'vente',
       SAVE_EMPRUNT = 'saveEmprunt',
       LOAD_EMPRUNT = 'loadEmprunt',
       UPDATE_EMPRUNT_STATUT = 'updateEmpruntStatut',
       DELETE_EMPRUNT = 'deleteEmprunt',

       LOAD_ALL_ARTICLE = 'getArticle',
                //newTypeArticle api,
                CREATE_TYPE_ARTICLE= 'createNewTypeArticle',
                LOAD_ALL_TYPE = 'getTypeOfArticle',
                UPDATE_TYPE_ARTICLE  = 'updateTypeArticle',
       DEV_UPDATE_VALIDITY = 'updateEndValidity',

       //sanction

       CREATE_SANCTION = 'newSanction',
       DELETE_SANCTION = 'deleteSanction',
       LOAD_ALL_SANCTION = 'getAllSanction',

       //charge
       CREATE_CHARGE = 'addPerte',
       LOAD_CHARGE = 'getAllCharge',

       RAPPORT_VENTE = 'rapportVente',
       RAPPORT_VENTE_JOUR= 'rapportVenteJour',
       RAPPORT_PRESENCE = 'rapportPresence',


       STATS_CHARTS = 'stats' 

}