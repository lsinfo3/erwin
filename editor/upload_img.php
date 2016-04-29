<?php
/**
 * Created by PhpStorm.
 * User: Valik
 * Date: 25.08.2015
 * Time: 22:13
 */
session_start();

require "classes/class.upload.php";

if (isset($_SESSION['p']) && $_SESSION['p'] != 'tests')
{
    $folder = $_SESSION['p'];
    echo 'if != tests: '.$folder;
} else {
    $_SESSION['p'] .= '/'.time();
    $folder = $_SESSION['p'];
    mkdir($folder, 0777);
    echo 'else = tests: '.$folder;
}

// Bild Hochladen:
if (isset($_FILES['img_file']) && $_FILES['img_file']['name'] != '') {
    $handle = new Upload($_FILES['img_file']);

    if ($handle->uploaded) {
        $files = array();
        $handle->Process($folder);

        // we check if everything went OK
        if ($handle->processed) {
            $files['full'] = $handle->file_dst_name;
            echo("Datei wurde erfolgreich hochgeladen.");
        } else {
            // one error occured
            echo("Datei konnte nicht hochgeladen werden.");
        }

        // we delete the temporary files
        $handle->Clean();
    } else {
        // Fehler Upload hat nicht geklappt
        echo("Datei konnte nicht hochgeladen werden.");
    }
}