<?php
// ---- Povolení CORS
// Enable CORS for all domains (*); you can restrict this to specific domains as needed.
header("Access-Control-Allow-Origin: *");
// Allow the POST method.
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow specific headers. You can adjust this based on your needs.
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// header("Access-Control-Allow-Headers: *");
header("Referrer-Policy: origin");
// Check if it's a preflight OPTIONS request and respond accordingly
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Max-Age: 3600");
    header("Content-Length: 0");
    header("Content-Type: text/plain");
    exit;
}

// --- Zpracovní požadavku
// Check for the incoming request method.
if (in_array($_SERVER["REQUEST_METHOD"], ["GET", "POST", "PUT", "DELETE"])) {
    // hlavicka odpovedi
    header('Content-Type: application/json; charset=utf-8');
    require_once("settings.inc.php");
    require_once("MyDatabase.class.php");
    require_once("template.lib.php");
    $myDB = new MyDatabase();
    
    // metoda
    $method = $_SERVER['REQUEST_METHOD'];
    // Get the path
    $path = $_SERVER['REQUEST_URI'];
    $parts = explode("/", $path);
    $keyName = $parts[3];
    $id = -1;
    if (count($parts) >= 5) {
        $id = $parts[4];
    }

    // Get the JSON data from the request body
    $json_data = file_get_contents('php://input');
    
    //////////////////////////////////////////////

    
    $data = array();
    if ($method === 'GET') {
        $data = specifyDataType($keyName, $id, $myDB);

        if (count($data) == 0) {
            http_response_code(204);
        }
        echo json_encode($data);
    } elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"));
        addToDatabase($keyName, $data, $myDB);
    } elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents("php://input"));
        updateDatabase($keyName, $data, $myDB);
    } elseif ($method === 'DELETE') {
        $data = $parts[4];
        deleteFromDatabase($keyName, $data, $myDB);
    } else {
        http_response_code(405); // Method Not Allowed
        echo json_encode(["message" => "Method not allowed"]);
    }
} else {
    // Handle other request methods or provide an error response.
    http_response_code(405); // Method Not Allowed
    echo "Method Not Allowed";
}


/*---------------------GET functions---------------------- */
function specifyDataType($keyName, $id, $db)
{
    $resultData = array();
    if ($keyName == 'dila') {
        $dila = $db->getAllDila();
        $resultData = createDiloTemplate($dila);
    } else if ($keyName == 'dilo') {
        $dilo = $db->getDilo($id);
        $resultData = createDiloTemplate($dilo);
    } else if ($keyName == 'users') {
        $users = $db->getAllUsers();
        $resultData = createUserTemplate($users);
    } else if ($keyName == 'user') {
        $user = $db->getUser($id);
        $resultData = createUserTemplate($user);
    } else if ($keyName == 'borrows') {
        $vypujcky = $db->getAllBorrows();
        $resultData = createBorrowsTemplate($vypujcky);
    } else if ($keyName == 'borrow') {
        $vypujcky = $db->getBorrow($id);
        $resultData = createBorrowsTemplate($vypujcky);
    } else if ($keyName == 'typNosice') {
        $nosicTypes = $db->getNosicTypes();
        $resultData = createNosicTypeTemplate($nosicTypes);
    } else if ($keyName == 'borrowsBasicInfo') {
        $vypujcky = $db->getBorrowsBasicInfo($id);
        $resultData = createBorrowsBasicInfoTemplate($vypujcky);
    } else if ($keyName == 'states') {
        $states = $db->getAllStates();
        $resultData = createStatesTemplate($states);
    }
    
    return $resultData;
}


/*---------------------POST functions---------------------- */
function addToDatabase($keyName, $data, $db) {
    if ($keyName == 'user') {
        addUser($data, $db);
    } else if ($keyName == 'borrows') {
        addBorrow($data, $db);
    } else if ($keyName == 'dilo') {
        addDilo($data, $db);
    }
}

function addUser($data, $db) {
    $jmeno = $data->jmeno;
    $prijmeni = $data->prijmeni;
    $prezdivka = $data->prezdivka;
    $telefon = $data->telefon;
    $email = $data->email;
    
    $db->addNewUser($jmeno, $prijmeni, $prezdivka, $telefon, $email);
}

function addBorrow($data, $db) {
    $dilo_id = $data->dilo_id;
    $pujcujici_id = $data->pujcujici_id;
    $stav_id = $data->stav_id;
    $dat_zapujceni = $data->dat_zapujceni;
    $dat_vraceni_plan = $data->dat_vraceni_plan;

    $db->addNewBorrow($dilo_id, $pujcujici_id, $stav_id, $dat_zapujceni, $dat_vraceni_plan);
}

function addDilo($data, $db) {
    $nazev = $data->nazev;
    $autor = $data->autor;
    $nosic_id = $data->nosic_id;
    $dat_porizeni = $data->dat_porizeni;
    $delka = $data->delka;
    $popis = $data->popis;

    $db->addNewDilo($nazev, $autor, $nosic_id, $dat_porizeni, $delka, $popis);
}

/*---------------------PUT functions---------------------- */
function updateDatabase($keyName, $data, $db) {
    if ($keyName == 'users') {
        updateUser($data, $db);
    } elseif ($keyName == 'borrows') {
        updateBorrow($data, $db);
    } else if ($keyName == 'dilo') {
        updateDilo($data, $db);
    }
}

function updateUser($data, $db) {
    $pujcujici_id = $data->pujcujici_id;
    $jmeno = $data->jmeno;
    $prijmeni = $data->prijmeni;
    $prezdivka = $data->prezdivka;
    $telefon = $data->telefon;
    $email = $data->email;
    
    $db->updateUser($pujcujici_id, $jmeno, $prijmeni, $prezdivka, $telefon, $email);
}

function updateBorrow($data, $db) {
    $vypujcka_id = $data->vypujcka_id;
    $dilo_id = $data->dilo_id;
    $pujcujici_id = $data->pujcujici_id;
    $stav_id = $data->stav_id;
    $dat_zapujceni = $data->dat_zapujceni;
    $dat_vraceni_plan = $data->dat_vraceni_plan;
    $dat_vraceni = $data->dat_vraceni;

    $db->updateBorrow($vypujcka_id, $dilo_id, $pujcujici_id, $stav_id, $dat_zapujceni, $dat_vraceni_plan, $dat_vraceni);
}

function updateDilo($data, $db) {
    $dilo_id = $data->dilo_id;
    $nazev = $data->nazev;
    $autor = $data->autor;
    $nosic_id = $data->nosic_id;
    $dat_porizeni = $data->dat_porizeni;
    $delka = $data->delka;
    $popis = $data->popis;
    
    $db->updateDilo($dilo_id, $nazev, $autor, $nosic_id, $dat_porizeni, $delka, $popis);
}

/*---------------------DELETE functions---------------------- */
function deleteFromDatabase ($keyName, $id, $db) {
    if ($keyName == 'users') {
        $db->deleteFromTable(TABLE_PUJCUJICI, "`pujcujici`.`pujcujici_id`='$id'");
    } else if ($keyName == 'dilo') {
        $db->deleteFromTable(TABLE_DILO, "`dilo`.`dilo_id`='$id'");
    }
}
