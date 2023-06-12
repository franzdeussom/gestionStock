export class Presence{
    constructor(
            public id?: any,
            public idUser?: any, //foreign key
            public dateDay?:string,
            public heureArrive?:string,
            public heureDepart?:string,
            public statut?: string,
            public idEmploye?: any, 
            //optional
            public nom?: string,
            public prenom?: string,
            public poste?:string,
            public role?:string,
    ){}
}