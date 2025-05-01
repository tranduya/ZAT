<?php
//////////////////////////////////////////////////////////////
////////////// Vlastni trida pro praci s databazi ////////////////
//////////////////////////////////////////////////////////////

/**
 * Vlastni trida spravujici databazi.
 */
class MyDatabase
{

    /** @var PDO $pdo  PDO objekt pro praci s databazi. */
    private $pdo;

    /**
     * MyDatabase constructor.
     * Inicializace pripojeni k databazi a pokud ma byt spravovano prihlaseni uzivatele,
     * tak i vlastni objekt pro spravu session.
     * Pozn.: v samostatne praci by sprava prihlaseni uzivatele mela byt v samostatne tride.
     * Pozn.2: take je mozne do samostatne tridy vytahnout konkretni funkce pro praci s databazi.
     */
    public function __construct()
    {
        // inicialilzuju pripojeni k databazi - informace beru ze settings
        $this->pdo = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $this->pdo->exec("set names utf8");
        // nastavení PDO error módu na výjimku, tj. každá chyba při práci s PDO bude výjimkou
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }


    ///////////////////  Obecne funkce  ////////////////////////////////////////////

    /**
     *  Provede dotaz a bud vrati ziskana data, nebo pri chybe ji vypise a vrati null.
     *  Varianta, pokud je pouzit PDO::ERRMODE_EXCEPTION
     *
     *  @param string $dotaz        SQL dotaz.
     *  @return PDOStatement|null    Vysledek dotazu.
     */
    private function executeQuery(string $dotaz)
    {
        // vykonam dotaz
        try {
            $res = $this->pdo->query($dotaz);
            return $res;
        } catch (PDOException $ex) {
            echo "Nastala výjimka: " . $ex->getCode() . "<br>"
                . "Text: " . $ex->getMessage();
            return null;
        }
    }

    /**
     * Jednoduche cteni z prislusne DB tabulky.
     *
     * @param string $tableName         Nazev tabulky.
     * @param string $whereStatement    Pripadne omezeni na ziskani radek tabulky. Default "".
     * @param string $orderByStatement  Pripadne razeni ziskanych radek tabulky. Default "".
     * @return array                    Vraci pole ziskanych radek tabulky.
     */
    public function selectFromTable(string $tableName, string $fromStatement = "", string $whereStatement = "", string $orderByStatement = ""): array
    {
        // slozim dotaz
        $q = "SELECT " . (($fromStatement == "") ? '*' : $fromStatement)
            . " FROM " . $tableName
            . (($whereStatement == "") ? "" : " WHERE $whereStatement")
            . (($orderByStatement == "") ? "" : " ORDER BY $orderByStatement");
        // provedu ho a vratim vysledek
        $obj = $this->executeQuery($q);
        // pokud je null, tak vratim prazdne pole
        if ($obj == null) {
            return [];
        }
        // prevedu vsechny ziskane radky tabulky na pole
        return $obj->fetchAll();
    }

    /**
     * Jednoduche vlozeni do prislusne tabulky.
     *
     * @param string $tableName         Nazev tabulky.
     * @param string $insertStatement   Text s nazvy sloupcu pro insert.
     * @param string $insertValues      Text s hodnotami pro prislusne sloupce.
     * @return bool                     Vlozeno v poradku?
     */
    public function insertIntoTable(string $tableName, string $insertStatement, string $insertValues): bool
    {
        // slozim dotaz
        $q = "INSERT INTO $tableName($insertStatement) VALUES ($insertValues)";
        // provedu ho a vratim uspesnost vlozeni
        $obj = $this->executeQuery($q);
        // pokud ($obj == null), tak vratim false
        return ($obj != null);
    }

    /**
     * Jednoducha uprava radku databazove tabulky.
     *
     * @param string $tableName                     Nazev tabulky.
     * @param string $updateStatementWithValues     Cela cast updatu s hodnotami.
     * @param string $whereStatement                Cela cast pro WHERE.
     * @return bool                                 Upraveno v poradku?
     */
    public function updateInTable(string $tableName, string $updateStatementWithValues, string $whereStatement): bool
    {
        // slozim dotaz
        $q = "UPDATE `$tableName` SET $updateStatementWithValues WHERE $whereStatement";
        // provedu ho a vratim vysledek
        $obj = $this->executeQuery($q);
        // pokud ($obj == null), tak vratim false
        return ($obj != null);
    }

    /**
     * Dle zadane podminky maze radky v prislusne tabulce.
     *
     * @param string $tableName         Nazev tabulky.
     * @param string $whereStatement    Podminka mazani.
     * @return bool
     */
    public function deleteFromTable(string $tableName, string $whereStatement): bool
    {
        // slozim dotaz
        $q = "DELETE FROM $tableName WHERE $whereStatement";
        // provedu ho a vratim vysledek
        $obj = $this->executeQuery($q);
        // pokud ($obj == null), tak vratim false
        return ($obj != null);
    }

    /**
     * Spoji 2 pole do jednoho dle predaneho id
     * 
     * @param $array1 Prvni pole
     * @param $array2 Druhe pole
     * @param $idField Podle ceho to ma byt spojovano
     */
    // public function mergeArrays($array1, $array2, $idField)
    // {
    //     $mergedArray = array();

    //     foreach ($array1 as $item) {
    //         $id = $item[$idField];
    //         $mergedArray[$id] = $item;
    //     }

    //     foreach ($array2 as $item) {
    //         $id = $item[$idField];
    //         if (array_key_exists($id, $mergedArray)) {
    //             // Merge the data based on the common id
    //             $mergedArray[$id] = array_merge($mergedArray[$id], $item);
    //         } else {
    //             continue;
    //         }
    //     }

    //     return array_values($mergedArray);
    // }


    ///////////////////  KONEC: Obecne funkce  ////////////////////////////////////////////

    ///////////////////  Konkretni funkce  ////////////////////////////////////////////

    /**
     * Ziskani zaznamu vsech uzivatelu aplikace.
     *
     * @return array    Pole se vsemi uzivateli.
     */
    public function getAllUsers()
    {
        // ziskam vsechny uzivatele z DB razene dle ID a vratim je
        $fromStatement = "pujcujici_id, prezdivka, jmeno, prijmeni, telefon, email";
        return $this->selectFromTable(TABLE_PUJCUJICI, $fromStatement);
    }

    public function getUser($pujcujici_id) {
        // ziskam vsechny uzivatele z DB razene dle ID a vratim je
        $fromStatement = "pujcujici_id, jmeno, prijmeni, prezdivka, telefon, email";
        $whereStatement = "`pujcujici`.`pujcujici_id`= $pujcujici_id";
        return $this->selectFromTable(TABLE_PUJCUJICI, $fromStatement, $whereStatement);
    }

    public function addNewUser (string $jmeno, string $prijmeni, string $prezdivka, string $telefon, string $email) {
        $insertStatement = "jmeno, prijmeni, prezdivka, telefon, email";
        $insertValues = "'$jmeno', '$prijmeni', '$prezdivka', '$telefon', '$email'";
        return $this->insertIntoTable(TABLE_PUJCUJICI, $insertStatement, $insertValues);
    }

    public function updateUser(int $pujcujici_id, string $jmeno, string $prijmeni, string $prezdivka, string $telefon, string $email)
    {
        // slozim cast s hodnotami
        $updateStatementWithValues = "`jmeno`='$jmeno', `prijmeni`='$prijmeni', `prezdivka`='$prezdivka', `telefon`='$telefon', `email`='$email'";
        // podminka
        $whereStatement = "`pujcujici`.`pujcujici_id`=$pujcujici_id";
        // provedu update
        return $this->updateInTable(TABLE_PUJCUJICI, $updateStatementWithValues, $whereStatement);
    }


    ///////////////////  KONEC: Konkretni funkce  ////////////////////////////////////////////

}
