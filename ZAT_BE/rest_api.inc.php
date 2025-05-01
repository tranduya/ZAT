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
// Check for the incoming request method (POST).
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
    $userId = -1;
    $userPwd = '';
    if (count($parts) >= 5) {
        $userId = $parts[4];
    }
    
    if (count($parts) == 6) {
        $userPwd = $parts[5];
    }

    // Get the JSON data from the request body
    $json_data = file_get_contents('php://input');
    
    //////////////////////////////////////////////

    
    $data = array();
    if ($method === 'GET') {
        $data = specifyDataType($keyName, $userId, $myDB, $userPwd);

        if (count($data) == 0) {
            http_response_code(401);
        }
        echo json_encode($data);
    } elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"));
        // addToDatabase($keyName, $data, $myDB);
    } elseif ($method === 'PUT') {
        $userId = json_decode(file_get_contents("php://input"));
        // updateDatabase($keyName, $userId, $myDB);
    } elseif ($method === 'DELETE') {
        $data = $parts[4];
        // deleteFromDatabase($keyName, $data, $myDB);
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
function specifyDataType($keyName, $userId, $db, $userPwd)
{
    $resultData = array();
    if ($keyName == 'games') {
        $games = $db->mergeArrays($db->getAllGames(), $db->getAllGamesDetails(), 'polozka_id');
        $resultData = createGameTemplate($games);
    } else if ($keyName == 'gameRents') {
        $rents = $db->getAllRents();
        $resultData = createGameRentTemplate($rents);
    } else if ($keyName == 'category') {
        $categories = $db->getAllCategories();
        $resultData = createCategoryTemplate($categories);
    } else if ($keyName == 'users') {
        $users = $db->getAllUsers();
        $resultData = createUserTemplate($users);
    } else if ($keyName == 'user') {
        $user = $db->getUser($userId);
        $resultData = createUserTemplate($user);
    } elseif ($keyName == 'roles') {
        $roles = $db->getAllRoles();
        $resultData = createRoleTemplate($roles);
    } elseif ($keyName == 'auth') {
        $user = $db->getUserNickAndPwd($userId);
        $oneUser = $user[0];
        //authorization
        if (!password_verify($userPwd, $oneUser["heslo"])) {
            return [];
        }

        $resultData = createUserTemplate($user);
    } else if ($keyName == 'borrows') {
        $vypujcky = $db->getAllUserBorrows($userId);
        $resultData = createBorrowsTemplate($vypujcky);
    } else if ($keyName == 'allBorrows') {
        $vypujcky = $db->getAllBorrows();
        $resultData = createBorrowsTemplate($vypujcky);
    } else if ($keyName == 'borrowsBasicInfo') {
        $vypujcky = $db->getBorrowsBasicInfo();
        $resultData = createBorrowsBasicInfoTemplate($vypujcky);
    } else if ($keyName == 'states') {
        $states = $db->getAllStates();
        $resultData = createStatesTemplate($states);
    }
    
    return $resultData;
}


/*---------------------POST functions---------------------- */

/*---------------------PUT functions---------------------- */


/*---------------------DELETE functions---------------------- */
