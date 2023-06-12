export class SystemUser{
    constructor(
        public idUser?:string,
        public email?:string,
        public mdp?:string,
        public nom?:string,
        public prenom?:string,
        public tel?: string,
        public cni?: string,
        public role?: string,
        public endValidity?: string,
        public generatedBy?: string
    ){ }
 }