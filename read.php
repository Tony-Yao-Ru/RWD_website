<?php

$destination_dir = $_SERVER['DOCUMENT_ROOT'];

foreach (glob($destination_dir.'/Practice/File/*.txt') as $file) {
    $file_handle = fopen($file, "r");
    while (!feof($file_handle)) {
        $line = fgets($file_handle)."<br/>";
        echo $line;
    }
    fclose($file_handle);
}
?>
