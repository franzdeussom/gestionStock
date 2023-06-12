export class DemandeConge{
    constructor(
        public idConge?: any,
        public motif?: string,
        public dateDepart?: string,
        public dateRetour?: string,
        public heureRetour?: string,
        public heureDepart?: string,
        //optionals
        public nom?: string,
        public prenom?: string,
        public poste?: string,
        public role?: string,

        public id_employe?:any,
        public idUser?: any //foreign key
    ){

    }
}