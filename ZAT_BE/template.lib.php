<?php
function createDiloTemplate($dbData)
{
    $jsonData = array();
    foreach ($dbData as $data) {
        $jsonData[] = array(
            'dilo_id' => $data['dilo_id'],
            'nosic_id' => $data['typ_nosice_id'],
            'nazev' => $data['nazev'],
            'autor' => $data['autor'],
            'dat_porizeni' => $data['dat_porizeni'],
            'delka' => $data['delka'],
            'popis' => $data['popis']
        );
    }
    
    return $jsonData;
}

function createUserTemplate($dbData) {
    $jsonData = array();
    foreach ($dbData as $data) {
        $jsonData[] = array(
            'pujcujici_id' => $data['pujcujici_id'],
            'prezdivka' => $data['prezdivka'],
            'jmeno' => $data['jmeno'],
            'prijmeni' => $data['prijmeni'],
            'telefon' => $data['telefon'],
            'email' => $data['email'],
        );
    }
    
    return $jsonData;
}

function createBorrowsTemplate($dbData) {
    $jsonData = array();
    foreach ($dbData as $data) {
        $jsonData[] = array(
            'vypujcka_id' => $data['vypujcka_id'],
            'polozka_id' => $data['polozka_id'],
            'objednava_pujcujici_id' => $data['objednava_pujcujici_id'],
            'resi_pujcujici_id' => $data['resi_pujcujici_id'],
            'stav_id' => $data['stav_id'],
            'dat_zapujceni' => $data['dat_zapujceni'],
            'dat_navraceni' => $data['dat_navraceni_plan'],
            'dat_vraceno' => $data['dat_navraceni'],
            'cena_zalohy' => $data['cena_zalohy'],
            'cena_vypujcky' => $data['cena_vypujcky']
        );
    }
    return $jsonData;
}

function createBorrowsBasicInfoTemplate($dbData) {
    $jsonData = array();
    foreach ($dbData as $data) {
        $jsonData[] = array(
            'vypujcka_id' => $data['vypujcka_id'],
            'prezdivka' => $data['prezdivka'],
            'stav_id' => $data['stav_id'],
            'dat_vraceni_plan' => $data['dat_vraceni_plan']
        );
    }
    return $jsonData;
}

function createStatesTemplate($dbData) {
    $jsonData = array();
    foreach ($dbData as $data) {
        $jsonData[] = array(
            'stav_id' => $data['stav_id'],
            'nazev_stavu' => $data['nazev_stavu']
        );
    }
    return $jsonData;
}

function createNosicTypeTemplate($dbData) {
    $jsonData = array();
    foreach ($dbData as $data) {
        $jsonData[] = array (
            'nosic_id' => $data['typ_nosice_id'],
            'nazev' => $data['nazev_typu_nosice']
        );
    }
    return $jsonData;
}
?>