<?php
    
    // For testing the error
    ini_set('display_errors', 1); 
    error_reporting(E_ALL);
    
    $destination_dir = $_SERVER['DOCUMENT_ROOT'];
    if ( isset( $_POST['content'] ) ) { 
        /* Note */
        // Since you are running XAMPP, then you need to make sure 
        // that your web server gets the write permission to the specific path 
        // you are trying to create new files in and\or edit existing files.
        // As a result, you need to give the web the authority for the file.
        // <Solved> In the terminal, key 
        // "sudo chmod -R 777 /Applications/XAMPP/xamppfiles/htdocs/Practice/File/"
        $route = $destination_dir.'/Practice/File/'.$_POST['ID'].'.txt';
        file_put_contents($route, str_replace("</div>", "", file_get_contents($route)));
        $ourFileHandle = fopen($route, 'a') or die("can't open file");
        fwrite($ourFileHandle,  $_POST["content"] );
        fclose($ourFileHandle);
    }   
?>