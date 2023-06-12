export enum CREDENTIAL{
    ADMIN_ROLE = 'ADMINISTRATOR',
    CASHIER_ROLE = 'CASHIER',
    DIRECTOR_ROLE = 'DIRECTOR',
    STOCKEEPER_ROLE = 'MAGAZINIER',
    DEVELOPPER_ROLE = 'developper',

    ADMIN_HOME_ROUTE = 'admin/employes',
    DIRECTOR_HOME_ROUTE = 'home/dashboard',
    STOCKEEPER_HOME_ROUTE = 'magazinier/dashboard',
    CASHIER_HOME_ROUTE = 'cashier/etablir-commande',
    DEVELOPPER_HOME_ROUTE  = 'developper/setting',

    NAVIGATE_TO_LOGIN = 'login'
}