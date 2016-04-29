<?php
/**
 * Created by PhpStorm.
 * User: Valik
 * Date: 25.08.2015
 * Time: 22:13
 */
session_start();

if ($_SESSION['p'] != 'tests') {
    $piclist = '';
    if ($handle = opendir($_SESSION['p'])) {
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                $temp = explode('.', $entry);
                $s = sizeof($temp) - 1;
                if ($temp[$s] == 'jpg' || $temp[$s] == 'jpeg' || $temp[$s] == 'png' || $temp[$s] == 'gif' || $temp[$s] == 'bmp') {
                    $piclist .= '<div class="av_img">'.
                                    '<div class="av_img_name">'.$entry.'</div>'.
                                    '<div class="av_img_path">'.$_SESSION['p'].'</div>'.
                                '</div>';
                }
            }
        }
        closedir($handle);
    }
    print $piclist;
} else {
    print 'none';
}