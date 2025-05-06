<?php
///////////////////////////////////////////////////////
////////////// Zakladni nastaveni webu ////////////////
///////////////////////////////////////////////////////

////// nastaveni pristupu k databazi ///////

    // prihlasovaci udaje k databazi
    define("DB_SERVER","localhost");
    define("DB_NAME","zat");
    define("DB_USER","root");
    define("DB_PASS","");

    // definice konkretnich nazvu tabulek
    define("TABLE_DILO", "dilo");
    define("TABLE_PUJCUJICI","pujcujici");
    define("TABLE_STAV","stav");
    define("TABLE_TYP_NOSICE","nosic");
    define("TABLE_VYPUJCKA","vypujcka");

    ///// vsechny stranky webu ////////

    // pripona souboru
    $phpExtension = ".inc.php";

    // dostupne stranky webu
    define("WEB_PAGES", [
        'test' => "test".$phpExtension,
        'rest_api' => "rest_api".$phpExtension
    ]);

    // defaultni/vychozi stranka webu
    define("WEB_PAGE_DEFAULT_KEY", 'rest_api');
?>