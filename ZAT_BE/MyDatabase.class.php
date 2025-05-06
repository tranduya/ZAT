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


    ///////////////////  KONEC: Obecne funkce  ////////////////////////////////////////////

    ///////////////////  Konkretni funkce  ////////////////////////////////////////////

    /**
     * Ziskani zaznamu vsech uzivatelu aplikace.
     *
     * @return array    Pole se vsemi uzivateli.
     */
    public function getAllUsers()
    {
        return $this->selectFromTable(TABLE_PUJCUJICI);
    }

    public function getUser($pujcujiciId) {
        // ziskam vsechny uzivatele z DB razene dle ID a vratim je
        $fromStatement = "pujcujici_id, jmeno, prijmeni, prezdivka, telefon, email";
        $whereStatement = "`pujcujici`.`pujcujici_id`= $pujcujiciId";
        return $this->selectFromTable(TABLE_PUJCUJICI, $fromStatement, $whereStatement);
    }

    public function addNewUser(string $jmeno, string $prijmeni, string $prezdivka, string $telefon, string $email) {
        $insertStatement = "jmeno, prijmeni, prezdivka, telefon, email";
        $insertValues = "'$jmeno', '$prijmeni', '$prezdivka', '$telefon', '$email'";
        return $this->insertIntoTable(TABLE_PUJCUJICI, $insertStatement, $insertValues);
    }

    public function updateUser(int $pujcujiciId, string $jmeno, string $prijmeni, string $prezdivka, string $telefon, string $email)
    {
        // slozim cast s hodnotami
        $updateStatementWithValues = "`jmeno`='$jmeno', `prijmeni`='$prijmeni', `prezdivka`='$prezdivka', `telefon`='$telefon', `email`='$email'";
        // podminka
        $whereStatement = "`pujcujici`.`pujcujici_id`=$pujcujiciId";
        // provedu update
        return $this->updateInTable(TABLE_PUJCUJICI, $updateStatementWithValues, $whereStatement);
    }

    // ------------------------------------------------------------------------------

    public function getAllDila() {
        return $this->selectFromTable(TABLE_DILO);
    }

    public function getDilo($diloId) {
        $fromStatement = "dilo_id, nosic_id, nazev, autor, dat_porizeni, delka, popis";
        $whereStatement = "dilo`.`dilo_id`= $diloId";
        return $this->selectFromTable(TABLE_DILO, $fromStatement, $whereStatement);
    }

    public function addNewDilo(string $nazev, string $autor, int $nosic_id, string $dat_porizeni,
     string $delka, string $popis) {
        $insertStatement = "nosic_id, nazev, autor, dat_porizeni, delka, popis";
        $insertValues = "'$nosic_id', '$nazev', '$autor', '$dat_porizeni', '$delka', '$popis'";
        return $this->insertIntoTable(TABLE_DILO, $insertStatement, $insertValues);
    }

    public function updateDilo(int $dilo_id, string $nazev, string $autor, int $nosic_id,
     string $dat_porizeni, string $delka, string $popis) {
        $updateStatementWithValues = "`nosic_id`='$nosic_id', `nazev`='$nazev', `autor`='$autor',
        `dat_porizeni`='$dat_porizeni', `delka`='$delka', `popis`='$popis'";
        $whereStatement = "`dilo`.`dilo_id`=$dilo_id";

        return $this->updateInTable(TABLE_DILO, $updateStatementWithValues, $whereStatement);
     }

    // ------------------------------------------------------------------------------
    public function getNosicTypes() {
        return $this->selectFromTable(TABLE_TYP_NOSICE);
    }
    
    // ------------------------------------------------------------------------------
    public function getAllStates() {
        $fromStatement = "stav_id, nazev_stavu";
        return $this->selectFromTable(TABLE_STAV, $fromStatement);
    }
    
    // ------------------------------------------------------------------------------
    public function getAllBorrows() {
        $fromStatement = "v.vypujcka_id, v.stav_id, v.dat_zapujceni, v.dat_vraceni_plan, v.dat_vraceni,
            v.dilo_id, v.pujcujici_id, d.nazev, d.nosic_id, p.prezdivka";
        $tableName = "zat.vypujcka v JOIN zat.dilo d ON v.dilo_id = d.dilo_id JOIN
            zat.pujcujici p ON v.pujcujici_id = p.pujcujici_id";

        return $this->selectFromTable($tableName, $fromStatement);
    }

    public function getBorrow(int $vypujckaId) {
        $fromStatement = "*";
        $whereStatement = "`vypujcka.`vypujcka_id`=$vypujckaId";

        return $this->selectFromTable(TABLE_VYPUJCKA, $fromStatement, $whereStatement);
    }

    public function getBorrowsBasicInfo($diloId) {
        $fromStatement = "vypujcka.vypujcka_id, vypujcka.stav_id, vypujcka.dat_vraceni_plan,
        pujcujici.prezdivka";

    $whereStatement = "vypujcka.dilo_id = " . intval($diloId) . " AND vypujcka.stav_id = 1";

    return $this->selectFromTable(
        "vypujcka 
         JOIN pujcujici ON pujcujici.pujcujici_id = vypujcka.pujcujici_id",
        $fromStatement,
        $whereStatement
    );
    }

    public function addNewBorrow(int $dilo_id, int $pujcujici_id, int $stav_id, string $dat_zapujceni, string $dat_vraceni_plan) {
        $insertStatement = "dilo_id, pujcujici_id, stav_id, dat_zapujceni, dat_vraceni_plan";
        $insertValues = "'$dilo_id', '$pujcujici_id', '$stav_id', '$dat_zapujceni', '$dat_vraceni_plan'";

        return $this->insertIntoTable(TABLE_VYPUJCKA, $insertStatement, $insertValues);
    }

    public function updateBorrow(int $vypujcka_id, int $dilo_id, int $pujcujici_id, int $stav_id, string $dat_zapujceni,
        string $dat_vraceni_plan, string|null $dat_vraceni) {
        if ($dat_vraceni != null) {
            $updateStatementWithValues = "`dilo_id`='$dilo_id', `pujcujici_id`='$pujcujici_id', `stav_id`='$stav_id',
            `dat_zapujceni`='$dat_zapujceni', `dat_vraceni_plan`='$dat_vraceni_plan', `dat_vraceni`='$dat_vraceni'";
        } else {
            $updateStatementWithValues = "`dilo_id`='$dilo_id', `pujcujici_id`='$pujcujici_id', `stav_id`='$stav_id',
            `dat_zapujceni`='$dat_zapujceni', `dat_vraceni_plan`='$dat_vraceni_plan', `dat_vraceni`=null";
        }


        $whereStatement = "`vypujcka`.`vypujcka_id`=$vypujcka_id";

        return $this->updateInTable(TABLE_VYPUJCKA, $updateStatementWithValues, $whereStatement);
    }


    ///////////////////  KONEC: Konkretni funkce  ////////////////////////////////////////////

}
