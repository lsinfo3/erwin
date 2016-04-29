<?php
/**
 * Created by PhpStorm.
 * User: Valik
 * Date: 25.08.2015
 * Time: 22:13
 */
session_start();

$_SESSION['p'] = 'tests';

?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8" />
    <title>sth</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="description" content="" />
    <meta http-equiv="keywords" content="" />
    <meta http-equiv="date" content="2012-05-01T08:00:00+02:00" />
    <meta name="robots" content="noindex, nofollow" />


    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css" />
    <link rel="stylesheet" type="text/css" href="css/main10.css" />


    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/script10.js"></script>
    <script type="text/javascript" src="js/dragndrop10.js"></script>
    <script type="text/javascript" src="js/saveindex10.js"></script>
    <script type="text/javascript" src="js/FileSaver.min.js"></script>


    <script id="script-content">
        function LoadNextSite(delayTime,returnValue,returnTo,linkFr,linkTo,fp,fpx,fpy,customUrl,modUrl,loadAnim) {
            if ($('#Mode').val() !== 'editor') {
                if (loadAnim == 1) $("#Test, .tab>input").css("cursor", "wait");
                setTimeout(function () {
                    if (linkTo != -1) {
                        // ---von aktionen
                        $('#' + linkFr + '-instructions').hide();
                        $('#' + linkFr).hide();

                        // Ausgabe zu Element
                        if (returnTo != -1) $('#' + returnTo).val(returnValue);

                        // ---nach aktionen
                        $('#' + linkTo + '-instructions').show();
                        $('#' + linkTo).show();

                        // URL ggf anpassen
                        //if (modUrl != -1) window.history.replaceState('', '', modUrl);

                        // falls IFrame-BG im nächsten Schritt, dann scrollen entfernen, sonst wieder hinzufügen
                        ($('#' + linkTo).hasClass('bg-iframe')) ? $('body').addClass('overflow-visibility') : $('body').removeClass('overflow-visibility');
                    } else {
                        document.location.href = customUrl;
                    }
                    if (loadAnim == 1) $("#Test, .tab>input").css("cursor", "default");
                }, delayTime * 1000);
            } else {
                debug('in editor mode, fkt 1');
            }
        }
        function LoadNextSitePopUp(delayTime,returnValue,returnTo,linkFr,linkTo,fp,fpx,fpy,customUrl,modUrl,loadAnim) {
            if ($('#Mode').val() !== 'editor') {
                if (loadAnim == 1) $("#Test, .tab>input").css("cursor", "wait");
                setTimeout(function () {
                    if (linkTo != -1) {
                        // ---von aktionen
                        $('#' + linkFr + '-instructions').hide();
                        // bei PopUp zu PopUp, from verstecken
                        if($('#' + linkFr).hasClass('tab_in_popup')) {
                            $('#' + linkFr).hide();
                        } else { // sonst, hintergrund unklickbar machen
                            $('#' + linkFr).addClass('unclickable');
                        }

                        // Ausgabe zu Element
                        if (returnTo != -1) $('#' + returnTo).val(returnValue);

                        // ---nach aktionen
                        $('#' + linkTo + '-instructions').show();
                        $('#' + linkTo).addClass('tab_in_popup');
                        $('#' + linkTo).show();
                        // URL ggf anpassen
                        //if (modUrl != -1) window.history.replaceState('', '', modUrl);

                        // falls Popup feste Position hat, einstellen
                        if (fp != -1) {
                            $('#' + linkTo).css({ left:fpx+'px', top:fpy+'px'});
                        } else {
                            $('#' + linkTo).draggable();
                        }

                        // falls IFrame-BG im nächsten Schritt, dann scrollen entfernen, sonst wieder hinzufügen
                        ($('#' + linkTo).hasClass('bg-iframe')) ? $('body').addClass('overflow-visibility') : $('body').removeClass('overflow-visibility');
                    } else {
                        document.location.href = customUrl;
                    }
                    if (loadAnim == 1) $("#Test, .tab>input").css("cursor", "default");
                }, delayTime * 1000);
            } else {
                debug('in editor mode, fkt 2');
            }
        }
        function LoadNextSiteOnChange(delayTime,returnValue,returnTo,linkFr,linkTo,fp,fpx,fpy,customUrl,modUrl,loadAnim,element,target) {
            if ($('#Mode').val() !== 'editor') {
                if ($('#'+element).val().toLowerCase() == target.toLowerCase()) {
                    if (loadAnim == 1) $("#Test, .tab>input").css("cursor", "wait");
                    setTimeout(function () {
                        if (linkTo != -1) {
                            // ---von aktionen
                            $('#' + linkFr + '-instructions').hide();
                            $('#' + linkFr).hide();

                            // Ausgabe zu Element
                            if (returnTo != -1) $('#' + returnTo).val(returnValue);

                            // ---nach aktionen
                            $('#' + linkTo + '-instructions').show();
                            $('#' + linkTo).show();

                            // URL ggf anpassen
                            //if (modUrl != -1) window.history.replaceState('', '', modUrl);

                            // falls IFrame-BG im nächsten Schritt, dann scrollen entfernen, sonst wieder hinzufügen
                            ($('#' + linkTo).hasClass('bg-iframe')) ? $('body').addClass('overflow-visibility') : $('body').removeClass('overflow-visibility');
                        } else {
                            document.location.href = customUrl;
                        }
                        if (loadAnim == 1) $("#Test, .tab>input").css("cursor", "default");
                    }, delayTime * 1000);
                } else {
                    console.log('not matching');
                }
            } else {
                debug('in editor mode, fkt 3');
            }
        }
        function debug(str) { console.log(str); }

    </script>

    <style id="css-content">

    </style>
</head>


<body>

    <div id="Panel-Header">
        <div class="logo">
          <!--  <img id="" class="fl" src="uploads/i3logo_schatten.jpg" alt="" width="" style="width: 40px; height:40px;" /> -->
            <div class="fl" style="width:159px;">Mock Up Delays</div>
        </div>
    </div>

    <div id="Panel-Elements-Wrapper">
        <div id="Panel-Elements-Top-Bar">
            <div id="Element_Choices" class="br">Elements</div>
            <div id="Background_Choices">Backgrounds</div>
        </div>

        <div id="Panel-Elements">
            <div id="Panel-Elements-Items">
                <div class="fl labeling bb" style="width:199px;">Elements</div>

                <div id="add_button" class="add_element br">
                    <div class="elem_labeling">Button</div>
                    <input type="button" id="drag_button" class="draggable fl ml20" value="button" />
                </div>

                <div id="add_radio" class="add_element">
                    <div class="elem_labeling">Radio</div>
                    <input type="radio" id="drag_radio" class="draggable fl ml20" />
                    <label for="drag_radio fl">radio</label>
                </div>

                <div id="add_checkbox" class="add_element br">
                    <div class="elem_labeling">Checkbox</div>
                    <input type="checkbox" id="drag_checkbox" class="draggable fl ml20" />
                    <label for="drag_checkbox fl">check</label>
                </div>

                <div id="add_input" class="add_element">
                    <div class="elem_labeling">Input</div>
                    <input type="text" id="drag_input" class="draggable fl ml20" style="width:50px;" />
                </div>

                <div id="add_dropdown" class="add_element br">
                    <div class="elem_labeling">Dropdown</div>
                    <select id="drag_dropdown" class="draggable fl ml20" style="width:50px;">

                    </select>
                </div>

                <div id="add_table" class="add_element">
                    <div class="elem_labeling">Table</div>
                    <div class="ml20">table img</div>
                </div>
            </div>


            <div id="Panel-Elements-BG">
                <div class="fl labeling bb" style="width:199px;">Backgrounds</div>

                <div class="fl labeling" style="width:199px;"><input id="pattern_pic" type="radio" name="Pattern" onClick="ChoosePattern()" value="true" checked="checked">Pictures</input></div>
                <div id="pattern_handler_img">
                    <form id="img_form" name="img_form" enctype="multipart/form-data" method="post" action="upload_img.php">
                        <input type="file" id="img_file" name="img_file" />
                        <input type="button" name="action_img" id="action_img" value="Upload" onclick="redirectImg()"/>
                        <iframe id='img_frame' name='img_frame' src=""></iframe>
                    </form>
                    <div class="Clear"></div>
                    <input type="button" name="refresh_img" id="refresh_img" value="Refresh" />
                    <div id="available_img">
                        none
                    </div>
                </div>
                <div class="Clear"></div>

                <div class="fl labeling bt" style="width:199px;"><input id="pattern_off" type="radio" name="Pattern" onClick="ChoosePattern()" value="false">HTMLs</input></div>
                <div id="pattern_handler_zip">
                    <form id="zip_form" name="zip_form" enctype="multipart/form-data" method="post" action="upload_zip.php">
                        <input type="file" name="zip_file" id="zip_file" />
                        <input type="button" name="action_zip" id="action_zip" value="Upload" onclick="redirectZip()"/>
                        <iframe id='zip_frame' name='zip_frame' src=""></iframe>
                    </form>
                    <div class="Clear"></div>
                    <input type="button" name="refresh_zip" id="refresh_zip" value="Refresh" />
                    <div id="available_zip">
                        none
                    </div>
                </div>
                <div class="Clear"></div>
            </div>
        </div>

        <div id="Panel-Elements-Instructions">
            <div class="fl labeling bb" style="width:199px;">Instructions</div>
            <div class="fl labeling" style="width:199px;">
                <input type="radio" id="NoInTab" name="ShowInTabs" class="fl" value="0" checked="checked" />
                <label for="NoInTab" class="labeling fl">none</label>
            </div>
            <div class="fl labeling" style="width:199px;">
                <input type="radio" id="AllInTab" name="ShowInTabs" class="fl" value="1"/>
                <label for="AllInTab" class="labeling fl">all per tab</label>
            </div>
            <div class="fl labeling" style="width:199px;">
                <input type="radio" id="SingleInTab" name="ShowInTabs" class="fl" value="2" disabled/>
                <label for="SingleInTab" class="labeling fl">single per tab</label>
            </div>
            <div class="fl labeling" style="width:199px;">
                <input type="radio" id="InPosL" name="InPos" class="fl" value="1" checked="checked" />
                <label for="InPosL" class="labeling fl">left side</label>
                <input type="radio" id="InPosR" name="InPos" class="fl" value="2" />
                <label for="InPosR" class="labeling fl">right side</label>
            </div>
            <div class="fl" style="width:199px;">
                <div class="EditInstructions">edit instructions</div>
            </div>
        </div>

        <!--
        <div id="Panel-Elements-Bot-Debug">
            <input type="button" value="actionTest" class="EditActionAttr"/>
            <input type="button" value="TestForms" class="TestFormExists"/>
            <div class="Clear"></div>
            <input type="button" value="TestTab" class="TestActTab"/>
            <input type="button" value="TestAddJS" class="TestAddJS"/>
        </div>
        -->

        <div id="Panel-Elements-Bot-Bar">

        </div>
    </div>

    <div id="Panel-Editor-Header">
        <div class="fl">
            <div id="ActElement">Choose an element</div>
            <div id="ActElementOptions">Width <input type="number" id="elem_width" /> Height <input type="number" id="elem_height" /></div>
            <div class="fl"><input type="button" value="Go" class="ActElemSetWH"/></div>
            <div id="EditorTools">
                <button class="AddTab">+Step</button>
                <!--<button class="RemoveTab">- Tab</button>-->
            </div>
        </div>

        <div class="fr">
            <div class="fl labeling mr5">Save File</div>
            <div class="fl">
                <input type="text" class="filename" id="html-filename" placeholder="index" />.html
            </div>
            <div class="fl">
                <input type="button" value="Go" class="SaveTabButton" />
                <input type="hidden" id="Mode" value="editor" />
            </div>
        </div>
    </div>

    <div id="Panel-Editor">
        <div id="Panel-MockUp">
            <div id="tabs">
                <ul id="tabs-header">
                    <li><a href="#tabs-1">Step_1</a></li>
                    <li><a href="#tabs-2">Step_2</a></li>
                    <li><a href="#tabs-3">Step_3</a></li>
                </ul>

                <div id="tabs-body">
                    <div id="tabs-1" class="tab">
                        <div class="tab-background"></div>
                        <div class="droppable"></div>
                    </div>

                    <div id="tabs-2" class="tab">
                        <div class="tab-background"></div>
                        <div class="droppable"></div>
                    </div>

                    <div id="tabs-3" class="tab">
                        <div class="tab-background"></div>
                        <div class="droppable"></div>
                    </div>
                </div>
            </div>
            <div class="Clear"></div>
        </div>
    </div>

    <div id="Panel-Editor-Footer">
        <p style="margin: 0px; padding: 0px 15px 0px 15px; line-height: 29px;">
       <!--     LS3 - <a href="http://www3.informatik.uni-wuerzburg.de/">Chair of Communication Networks</a>
            - Am Hubland, 97074 Würzburg, Tel. +49-(0)-931-31-86631, Fax +49-(0)-931-31-86632 -->
        </p>
    </div>

    <!-- Absolut positionierte Elemente -->
    <div id="ElementConfig"></div>
    <div id="InstructionsConfig">
        <div class="InstructionsConfigHeadline" style="width: 100%;">
            <div class="fl">Instructions</div>
            <div class="fr"><button class="CloseInstructionsConfig">x</button></div>
        </div>
        <div class="Clear"></div>
        <div class="InstructionsConfigBody bt">
            <div class="tabs-1-instructions instruction_area fl bb">
                <div class="labeling">Step-1</div>
                <textarea placeholder="give an instruction here" class="fl"></textarea>
            </div>
            <div class="Clear"></div>
            <div class="tabs-2-instructions instruction_area fl bb">
                <div class="labeling">Step-2</div>
                <textarea placeholder="give an instruction here" class="fl"></textarea>
            </div>
            <div class="Clear"></div>
            <div class="tabs-3-instructions instruction_area fl bb">
                <div class="labeling">Step-3</div>
                <textarea placeholder="give an instruction here" class="fl"></textarea>
            </div>
            <div class="Clear"></div>
        </div>
    </div>

    <!-- Versteckte Elemente für dynamisch hinzugefügtes JS -->
    <div id="HiddenScript"></div>
</body>
