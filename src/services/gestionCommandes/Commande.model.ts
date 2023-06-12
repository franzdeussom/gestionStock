import { Article } from './../gestionArticle/article.model';
export class Commande{
    constructor(
        public id?: any,
        public dateVente?: any,
        public quantity?: any,
        public statut?: any,
        public PID?: any,
        public senderID?: any,
        public typeArticle?: any,
        public nom?: any,
        public prixVente?: any,
        public totalAPayer?: any

    ){}
}