<?php
/**
 * Created by PhpStorm.
 * User: Valik
 * Date: 25.08.2015
 * Time: 22:13
 */
session_start();

if ($_SESSION['p'] != 'tests') {
    $out = CheckActualFolder($_SESSION['p']);
    print $out;


    /*
    $dirs = array_filter(glob($_SESSION['p'].'/*'), 'is_dir');
    //print_r( $dirs);

    $ziplist = '';
    if ($handle = opendir($_SESSION['p'])) {
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                $ziplist .= '<div class="av_img"><div class="av_img_name">'.$entry.'</div><div class="av_img_folder">'.$_SESSION['p'].'</div></div>';
            }
        }
        closedir($handle);
    }
    print $ziplist;
    */
} else {
    print 'none';
}



function CheckActualFolder($folder, $lvl = '') {
    $lvl .= '>';
    $dirs = array_filter(glob($folder.'/*'), 'is_dir');
    $output = '';
    if (isset($dirs) && $dirs > 0) {
        foreach ($dirs AS $dir) {
            $temp = explode('/', $dir);
            $output .= '<div class="av_zip">'.
                           '<div class="av_zip_folder">'.
                               '<div class="av_zip_folder_main">'.
                                   $lvl.$temp[sizeof($temp)-1].
                               '</div>'.
                               CheckActualFolder($folder.'/'.$temp[sizeof($temp)-1], $lvl).
                               CheckActualFolderForFiles($folder.'/'.$temp[sizeof($temp)-1], $lvl).
                           '</div>'.
                       '</div>';
        }
    }
    return $output;
}
function CheckActualFolderForFiles($folder, $lvl)
{
    $files = array_filter(glob($folder . '/*'), 'is_file');
    $output = '';
    if (isset($files) && $files > 0) {
        foreach ($files AS $file) {
            $temp = explode('/', $file);
            $output .= '<div class="av_zip_file">'.
                           '<div class="av_zip_file_name">'.$lvl.$temp[sizeof($temp) - 1].'</div>'.
                           '<div class="av_zip_file_path">'.$folder.'</div>'.
                       '</div>';
        }
    }
    return $output;
}