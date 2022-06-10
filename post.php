<?php
    
    // For testing the error
    ini_set('display_errors', 1); 
    error_reporting(E_ALL);
    
    /* Note */
    // You cannot open a file over HTTP and expect it to be written. 
    // Instead you need to open it using the local path.
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
        $ourFileHandle = fopen($route, 'w') or die("can't open file");
        fwrite($ourFileHandle,  $_POST["content"]);
        fclose($ourFileHandle);
    }   else{
        echo "It is empty";
    }     
?>
