/**
 * Created by Valik on 31.08.2015.
 */

var id_counter = 1;

$(function() {
    $('#tabs').tabs();
    $('.tab').resizable({
        start: function(e, ui) { },
        resize: function(e, ui) {
            //ResizeActTab();
            ResizeActIframe();
        },
        stop: function(e, ui) { }
    });
    $('.tab').load(function() {
        //ResizeActTab();
    });
});

function InitDroppable(){
    $('.droppable').droppable({
        //activeClass: 'ui-state-hover',
        //accept: '.component',
        tolerance: 'pointer',

        drop: function(event, ui) {
            if (!ui.draggable.hasClass("dropped"))
            {
                var elem = ui.draggable.find('.draggable').clone();
                var newX = ui.offset.left - $(this).offset().left;
                var newY = ui.offset.top - $(this).offset().top;

                $(this).prepend(elem
                    .removeClass('add_element fl ml20')
                    .addClass('dropped custom')
                    .draggable({cancel : false, containment:'parent'})
                    .css({ position:'absolute', top: newY + 43, left: newX, zIndex: 1 })
                    .attr('id', elem.attr('id') + '_' + id_counter))
                ;
                id_counter++;
            }

            // aktualisiere Tree
            CreateTree(getSelectedTabId());
        }
    });
}
$(document).ready(function() {
    InitDroppable();
});

// Drag Button
$(function() {
    $('#add_button').draggable({
        cancel: false,
        helper: function() {
            return $(this).find('.draggable').clone().addClass('wd_button').appendTo($('#' + getSelectedTabId()).find('.droppable'));
        },
        cursor: 'move',
        containment: "document"
    });
});
// Drag Radio Button
$(function() {
    $('#add_radio').draggable({
        cancel: false,
        helper: function() {
            return $(this).find('.draggable').clone().addClass('wd_radio').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 1
            });
        },
        cursor: 'move',
        containment: "document"
    });
});
// Drag Checkbox
$(function() {
    $('#add_checkbox').draggable({
        cancel: false,
        helper: function() {
            return $(this).find('.draggable').clone().addClass('wd_checkbox').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 1
            });
        },
        cursor: 'move',
        containment: "document"
    });
});
// Drag Input
$(function() {
    $('#add_input').draggable({
        cancel: false,
        helper: function() {
            return $(this).find('.draggable').clone().addClass('wd_input').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 1
            });
        },
        cursor: 'move',
        containment: "document"
    });
});
// Drag Dropdown
$(function() {
    $('#add_dropdown').draggable({
        cancel: false,
        helper: function() {
            return $(this).find('.draggable').clone().addClass('wd_dropdown').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 1
            });
        },
        cursor: 'move',
        containment: "document"
    });
});
// Drag Table
$(function() {
    $('#add_table').draggable({
        cancel: false,
        helper: function() {
            return $(this).find('.draggable').clone().removeClass('add_element fl ml20').addClass('wd_table').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 1
            });
        },
        cursor: 'move',
        containment: "document"
    });
});



// Alle Tabs als eine .html speichern
$(document).on('click', '.SaveTabButton', function() {
    var file_content = '';
    var title = 'platzhaltetitel';
    var script_content = $('#script-content').html();
    var css_content = $('#css-content').html();
    var dom_content = '';

    script_content += ''+
        '$(document).on("mousedown", ".tab-background", function (e) { e.preventDefault(); console.log("noclick"); });' +
        '$(".unclickable").onmousedown = new function () { return false; console.log("noclick"); };';

    // css_content bauen
    css_content += ''+
        'body { margin:0; }'+
        '.tab_in_popup { position: absolute; left:100px; top:100px; }'+
        '.overflow-visibility { overflow: hidden; }'+
        '.i_line { width: 100%; line-height: 16px; font-size: 14px; }'+
        '.active { font-weight: bold; }'+
        '.invisButton { background: transparent !important; border: 1px solid red !important; opacity: 0; filter: alpha(opacity=0); }'+
        '.invisBorder { border: 0px solid; }'+
        '.Clear { clear:both; }'+
        '#Test { width: 100%; }';

    // dom_content bauen
    var tc = 0;
    var firsttabiframe = '';
    $('#tabs').tabs('option', 'active', tc);
    $('.tab').each(function() {
        // style of element, nur erste index anzeigen
        var soe = 'display:none;'; // sichtbarkeit von element
        if (tc == 0) soe = '';
        var add_class = '';

        // prüfen ob Anweisungen hinzugefügt werden müssen
        var instructions = '';
        switch ($('input[name="ShowInTabs"]:checked').val()) {
            case "0":
                css_content += '.Instructions { width: 20%; height: 100%; left: 80%; z-index: 99; background: #cbcccc; opacity: 0.7; }'+
                               '.tab { position: absolute; top: 0; left:0; width: 1280px; height:960px; }';
                break;
            case "1": // all
                if ($('input[name="InPos"]:checked').val() == 1) { // links
                    css_content += '.Instructions { position:absolute; width: 20%; height: 100%; left: 0; z-index: 99; background: #cbcccc; opacity: 0.7; }'+
                                   '.tab { position: absolute; top: 0; left: 20%; width: 1280px; height: 960px; }';
                } else { // rechts
                    css_content += '.Instructions { position:absolute; width: 20%; height: 100%; left: 80%; z-index: 99; background: #cbcccc; opacity: 0.7; }'+
                                   '.tab { position: absolute; top: 0; left: 0; width: 1280px; height: 960px; }';
                }

                // Instructions einfügen
                var eachcounter = 0;
                instructions += '<div id="tabs-' + (tc + 1) + '-instructions" class="Instructions" style="' + soe + '">';
                $('.instruction_area').each(function() {
                    eachcounter++;
                    if (eachcounter == (tc + 1)) {
                        instructions += '<div class="i_line active">' + $(this).find('textarea').val() + '</div>';
                    } else {
                        instructions += '<div class="i_line">' + $(this).find('textarea').val() + '</div>';
                    }
                });
                instructions += '</div>';
                break;
            case "2": // single
                // Instructions einfügen
                instructions += '';
                break;
        }
        dom_content += instructions;

        // tabcontent hinzufügen
        var backupsource = '', backupwidth = 0, backupheight = 0;

        if ($('#' + getSelectedTabId() + '-bg').length) {
            add_class = 'bg_image';
            // attr=src des bildes backuppen
            backupsource = $('#' + getSelectedTabId() + '-bg').attr('src');
            backupwidth = $('#' + getSelectedTabId() + '-bg').width();
            backupheight = $('#' + getSelectedTabId() + '-bg').height();
            var newsource = $('#' + getSelectedTabId() + '-bg').attr('alt');
            $('#' + getSelectedTabId() + '-bg').attr('src', newsource);
        } else if ($('#' + getSelectedTabId() + '-html-bg').length) {
            if (tc == 0) firsttabiframe = 'body-overflow';
            add_class = 'bg_iframe';
            // attr=src des iframe backuppen
            backupsource = $('#' + getSelectedTabId() + '-html-bg').attr('src');
            backupwidth = $('#' + getSelectedTabId() + '-html-bg').width();
            backupheight = $('#' + getSelectedTabId() + '-html-bg').height();
            var newsource_html = $('#' + getSelectedTabId() + '-html-bg').attr('alt');
            $('#' + getSelectedTabId() + '-html-bg').css({width:'100%', height:'100%'});
            $('#' + getSelectedTabId() + '-html-bg').attr('src', newsource_html);
        }

        // dom content anfügen
        dom_content += '<div id="tabs-' + (tc + 1) + '" class="tab ' + add_class + '" style="width:' + backupwidth + 'px; height:' + backupheight + 'px; ' + soe + '">';
        dom_content += $(this).find('.tab-background').html()+$(this).find('.droppable').html();
        dom_content += '</div><!--<div class="Clear"></div>-->';

        // attr=src recovern
        if ($('#' + getSelectedTabId() + '-bg').length) {
            $('#' + getSelectedTabId() + '-bg').attr('src', backupsource);
        } else if ($('#' + getSelectedTabId() + '-html-bg').length) {
            $('#' + getSelectedTabId() + '-html-bg').css({width:backupwidth, height:backupheight});
            $('#' + getSelectedTabId() + '-html-bg').attr('src', backupsource);
        }

        // tab hochzählen
        tc++;
        $('#tabs').tabs('option', 'active', tc);
    });


    // Dateiinhalt fertig bauen
    file_content = '<!DOCTYPE html>' +
        '<html lang="de">' +
        '<head>' +
        '<meta charset="utf-8" />' +
        '<title>' + title + '</title>' +
        '<script type="text/javascript" src="jquery-2.1.4.min.js"></script>' +
        '<script type="text/javascript" src="jquery-ui.min.js"></script>' +
        '<script type="text/javascript">' +
        script_content +
        '</script>' +
        '<style>' +
        css_content +
        '</style>' +
        '</head>' +
        '<body class="' + firsttabiframe + '">' +
        dom_content +
        '</body>' +
        '</html>';


    saveAs(
        new Blob(
            [file_content],
            {type: 'application/xhtml+xml;charset=' + document.characterSet}
        ),
        ($('#html-filename').val() || $('#html-filename').attr('placeholder')) + '.html');
});


// Funktion im Panel ob Ein Bild in den Hintergrund geladen werden soll oder eine Url
function ChoosePattern() {
    if (document.getElementById('pattern_pic').checked) {
        document.getElementById('pattern_handler_pic').style.display = 'block';
        document.getElementById('pattern_handler_off').style.display = 'none';
        //document.getElementById('pattern_handler_url').style.display = 'none';
    } else if (document.getElementById('pattern_off').checked) {
        document.getElementById('pattern_handler_pic').style.display = 'none';
        document.getElementById('pattern_handler_off').style.display = 'block';
        //document.getElementById('pattern_handler_url').style.display = 'none';
    } else {
        document.getElementById('pattern_handler_pic').style.display = 'none';
        document.getElementById('pattern_handler_off').style.display = 'none';
        //document.getElementById('pattern_handler_url').style.display = 'block';
    }
}
// Funktion um ein Bild in den Hintergrund des aktiven Tabs zu laden
$(document).ready(function() {
    $("#pattern_pic").prop("checked", true);
    $("#pattern_off").prop("checked", false);
    $('#i_file').change( function(event) {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        debug(tmppath);
        var imgname = $('#i_file').val();

        // Platzhalter einfügen
        $('#' + getSelectedTabId()).find('.tab-background').html('');
        $('#' + getSelectedTabId())
            .find('.tab-background')
            .append('<img id="' + getSelectedTabId() + '-bg" src="" alt="" width="" style="display:none; position:absolute; left: 0; top: 0px; z-index: 1;" />');

        $('#file_for_pattern').val($('#i_file').val());

        $('#' + getSelectedTabId() + '-bg')
            .fadeIn("fast")
            .attr('src', URL.createObjectURL(event.target.files[0]))
            .attr('alt', imgname);

        $('#' + getSelectedTabId() + '-bg').load(function() {
            var width = $('#' + getSelectedTabId() + '-bg').width();
            var height = $('#' + getSelectedTabId() + '-bg').height();
            $('#' + getSelectedTabId()).css({'width':width});
            $('#' + getSelectedTabId()).css({'height':height});
            debug(width + ' ' + height);
        });
    });
});
// Funktion um eine HTML in den Hintergrund des aktiven Tabs zu laden
$(document).ready(function() {
    $('#i_html_file').change( function(event) {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        debug(tmppath);
        var imgname = $('#i_html_file').val();

        // Platzhalter einfügen, vorher Hintergrund leeren
        $('#' + getSelectedTabId()).find('.tab-background').html('');
        $('#' + getSelectedTabId())
            .find('.tab-background')
            .append('<iframe id="' + getSelectedTabId() + '-html-bg" src="" style="display:none; position:absolute; left: 0; top: 0px; z-index: 1;"></iframe>');

        $('#file_html_for_pattern').val($('#i_html_file').val());

        // Bild in Platzhalter einfügen
        $('#' + getSelectedTabId() + '-html-bg')
            .fadeIn("fast")
            .attr('src', URL.createObjectURL(event.target.files[0]))
            .attr('alt', imgname);

        $('#' + getSelectedTabId() + '-html-bg').load(function() {
            var width = $('#' + getSelectedTabId()).find('.droppable').width();
            var height = $('#' + getSelectedTabId()).find('.droppable').height();
            debug(width + ' ' + height);
            $('#' + getSelectedTabId() + '-html-bg').attr('width', width);
            $('#' + getSelectedTabId() + '-html-bg').attr('height', height);
        });
    });
});
// Funktion um eine URL in den Hintergrund des aktiven Tabs zu Laden
$(document).on('click', '#url_for_pattern_load', function(e) {
    var site = $('#url_for_pattern').val();
    $('#' + getSelectedTabId()).append('<object data="' + site + '" />');
});


// Hierarchiefunktion
function CreateTree(tabid) {
    $('#TreeStructure').html('');
    var id = tabid; // tabs-1

    // TravelTree(root) rekursiv ausführen und in $('#TreeStructure') printen
    TravelTree($('#' + tabid));
}
function TravelTree(child) {
    child.children().each(function(){
        //debug($(this));
        $('#TreeStructure').append('<div class="TreeItem">' + $(this).text() + '</div><div class="Clear">');
    });
}
// Funktion zum Verändern der Größe des Aktuellen Elements
$(document).on('click', '.ActElemSetWH', function() {
    ApplyNewWidthAndHeight();
});
function ApplyNewWidthAndHeight () {
    var act_elem = $('#' + $('#ActElement').text());
    act_elem.width($('#elem_width').val());
    act_elem.height($('#elem_height').val());
}
// Funktion um ein Tab im editor hinzuzufügen
$(document).on('click', '.AddTab', function() {
    // Anzahl Tabs berechnen
    var num_tabs = $('#tabs ul li').length + 1;
    // Tab in den Edito hinzufügen
    $("div#tabs ul").append('<li><a href="#tabs-' + num_tabs + '">index_' + num_tabs + '</a></li>');
    $("div#tabs-body").append('<div id="tabs-' + num_tabs + '" class="tab">' +
                                  '<div class="tab-background"></div>' +
                                  '<div class="droppable ui-droppable"></div>' +
                              '</div>');

    $("div#tabs").tabs("refresh");
    $('.tab').resizable();
    InitDroppable();
    // Anweisungszeile im Anweisungsfenster hinzufügen
    $(".InstructionsConfigBody").append(
                            '<div class="tabs-' + num_tabs + '-instructions instruction_area fl bb">' +
                            '<div class="labeling">index-' + num_tabs + '</div>' +
                                '<textarea placeholder="Anweisung eintragen" class="fl"></textarea>' +
                            '</div><div class="Clear"></div>');
});
// Funktion um ein Tag im editor zu entfernen
$(document).on('click', '.RemoveTab', function() {
    // todo: nicht fertig
    $('#' + getSelectedTabId()).remove();
    $('#' + getSelectedTabId() +'-instructions').remove();
    $('#tabs').tabs();
});

// Funktion zum Selektieren von Elementen
$(document).on('click', '.tab', function(e) {
    if($(e.target).is('.custom')) {
        $('#ActElement').html($(e.target).attr('id'));
        $('#ElementConfigItemName').html($(e.target).attr('id'));
        var act_elem = $('#' + $('#ActElement').text());
        $('#elem_width').val(act_elem.width());
        $('#elem_height').val(act_elem.height());
    } else {
        e.preventDefault();
    }
});

// Funktion für das ConfigPopUp, .custom öffnen, .closeConfig schließen
$(document).on('click', '.custom', function() {
    var l = $(this).offset().left;
    var t = $(this).offset().top + $(this).height() + 5;

    //Test für %
    $('#Panel-Elements-Bot-Bar').html('left: ' + l + ' top: ' + t);

    //-----

    $('#ElementConfig').css({left: l, top: t});

    $('#ElementConfig')
        .html('<div class="col100"><div id="ElementConfigItemName" class="col50"></div><button class="RemoveElement">remove</button><button class="CloseConfig">x</button></div>' +
              '<div class="Clear"></div>' +
              '<div>' +
                  '<div class="col100 ConfigHeaderLine">Funktionen</div>' +
              '</div>' +
              '<div class="Clear"></div>' +
              '<div>' +
                  '<select class="chooseFunction col90" onchange="ShowParametersForDelay(this.value)">' +
                      '<option value="0">- Bitte w&auml;hlen -</option>' +
                      '<option value="1">delay(sec, return)</option>' +
                      '<option value="2">delayPopup(sec, return)</option>' +
                  '</select>' +
              '</div>' +
              '<div class="Clear"></div>' +
              '<div id="Parameter">' +
              '</div>'+
              '<div class="Clear"></div>'+
              '<div id="Styles">' +
                  '<div class="col100 ConfigHeaderLine">Styles</div><div class="Clear"></div>' +
                  '<label class="col50">Unsichtbar</label><input type="checkbox" id="InvisItem" onchange="CheckForInvis();"/><div class="Clear"></div>' +
                  '<label class="col50">Unsichtbarer Rand</label><input type="checkbox" id="InvisItemBorder" onchange="CheckForInvisBorder();"/><div class="Clear"></div>' +
              '</div>'+
              '<div class="Clear"></div>');
    ($('#ElementConfig').css('display') == 'none') ? $('#ElementConfig').show('fast') : $('#ElementConfig').hide('fast');
});
$(document).on('click', '.CloseConfig', function() {
    $('#ElementConfig').hide();
});
$(document).on('click', '.RemoveElement', function() {
    var elemname = $(this).parent().find('#ElementConfigItemName').html();
    $('#' + elemname).remove();
    $('#ElementConfig').hide();
});

// Funktion zur Einstellung der Parameter
function ShowParametersForDelay(val) {
    var relTo = '<select class="chooseTabToLink col40" id="LinkTo">';

    var tc = 0;
    $('.tab').each(function() {
        tc++;
        var selected = '';
        var cache = getSelectedTabId().split('-');
        if (parseInt(cache[1]) == parseInt(tc - 1)) selected = 'selected="selected"';

        relTo += '<option value="tabs-' + tc + '"' + selected + '>index-' + tc + '</option>';
    });
    relTo += '</select>';

    var outTo = '<select class="chooseElemToOut col40" id="ReturnTo">'+
                    '<option value="0">- none -</option>';
    $('.custom').each(function() {
        outTo += '<option value="' + $(this).attr('id') + '">' + $(this).attr('id') + '</option>';
    });
    outTo += '</select>';


    switch (val) {
        case "0":
            $('#Parameter').html('');
            break;
        case "1":
            $('#Parameter').html('<div class="col100 ConfigHeaderLine">Parameter</div><div class="Clear"></div>' +
                                 '<label class="col50">Verz&ouml;gerung</label><input type="text" id="DelayTime" class="col40" placeholder="0.0"/><div class="Clear"></div>' +
                                 '<label class="col50">Ausgabe</label><input type="text" id="ReturnValue" class="col40" placeholder="MusterAusgabe" /><div class="Clear"></div>' +
                                 '<label class="col50">Ausgabe zu Element</label>' + outTo + '<div class="Clear"></div>' +
                                 '<label class="col50">Weiterleiten auf</label>' + relTo + '<div class="Clear"></div>' +
                                 '<button onclick="addFunction(1)">Funktion zuweisen</button>');
            break;
        case "2":
            $('#Parameter').html('<div class="col100 ConfigHeaderLine">Parameter</div><div class="Clear"></div>' +
                                 '<label class="col50">Verz&ouml;gerung</label><input type="text" id="DelayTime" class="col40" placeholder="0.0"/><div class="Clear"></div>' +
                                 '<label class="col50">Ausgabe</label><input type="text" id="ReturnValue" class="col40" placeholder="MusterAusgabe" /><div class="Clear"></div>' +
                                 '<label class="col50">Ausgabe zu Element</label>' + outTo + '<div class="Clear"></div>' +
                                 '<label class="col50">Weiterleiten auf</label>' + relTo + '<div class="Clear"></div>' +
                                 '<label class="col50">FixedPos</label>' +
                                     '<div class="col40">' +
                                         '<input type="checkbox" id="FixedPos" class="" onchange="CheckForPos();"/>' +
                                         '<div class="col100">' +
                                             '<label class="FixedPosFields">x</label><input type="number" id="fixedPosX" class="FixedPosFields" value="0" />' +
                                             '<label class="FixedPosFields">y</label><input type="number" id="fixedPosY" class="FixedPosFields" value="0" /><div class="Clear"></div>' +
                                         '</div>' +
                                     '</div>' +
                                 '<button onclick="addFunction(2)">Funktion zuweisen</button>');
            break;
        case "3":
            $('#Parameter').html('');
            break;
    }
}

function addFunction(type) {
    var act_elem = $('#' + $('#ActElement').text());
    var delayTime = $('#ElementConfig').parent().find('#DelayTime').val() || $('#ElementConfig').parent().find('#DelayTime').attr('placeholder');
    var returnValue = $('#ElementConfig').parent().find('#ReturnValue').val() || $('#ElementConfig').parent().find('#ReturnValue').attr('placeholder');
    var returnTo = $('#ElementConfig').parent().find('#ReturnTo').val() || $('#ElementConfig').parent().find('#ReturnTo').attr('placeholder');
    var linkFr = getSelectedTabId();
    var linkTo = $('#ElementConfig').parent().find('#LinkTo').val() || $('#ElementConfig').parent().find('#LinkTo').attr('placeholder');

    //debug('delay: ' + delayTime + ' return: ' + returnValue + ' from ' + linkFr + ' to ' + linkTo);

    switch (type) {
        case 0:
            act_elem.attr("onclick", "debug('nothing to do')");
            break;
        case 1:
            act_elem.attr("onclick", "LoadNextSite(" + delayTime + ", '" + returnValue + "', '" + returnTo + "', '" + linkFr + "', '" + linkTo + "')");
            break;
        case 2:
            act_elem.attr("onclick", "LoadNextSitePopUp(" + delayTime + ", '" + returnValue + "', '" + returnTo + "', '" + linkFr + "', '" + linkTo + "')");
            break;
        case 3:
            act_elem.attr("onclick", "debug('non type 3')");
            break;
    }
}

function CheckForInvis() {
    if (document.getElementById('InvisItem').checked) {
        var act_elem = $('#' + $('#ActElement').text());
        act_elem.addClass('invisButton');
    } else {
        var act_elem = $('#' + $('#ActElement').text());
        act_elem.removeClass('invisButton');
    }
}
function CheckForInvisBorder() {
    if (document.getElementById('InvisItemBorder').checked) {
        var act_elem = $('#' + $('#ActElement').text());
        act_elem.addClass('invisBorder');
    } else {
        var act_elem = $('#' + $('#ActElement').text());
        act_elem.removeClass('invisBorder');
    }
}
function CheckForPos() {
    (document.getElementById('FixedPos').checked) ? $('.FixedPosFields').show() : $('.FixedPosFields').hide();
}

// Funktion für das InstructionsConfigPopUp, .EditInstructions öffnen, .CloseInstructionsConfig schließen
$(document).on('click', '.EditInstructions', function() {
    ($('#InstructionsConfig').css('display') == 'none') ? $('#InstructionsConfig').show('fast') : $('#InstructionsConfig').hide('fast');
});
$(document).on('click', '.CloseInstructionsConfig', function() {
    $('#InstructionsConfig').hide();
});

// Hilfsfunktionen
// Konsolenausgabe
function debug(str) { console.log(str); }

// Getter für aktuelle Tab-ID z.b.: tab-1
function getSelectedTabId () {
    return $("#tabs .ui-tabs-panel:visible").attr("id");
}
function ResizeActTab () {
    var width = $('#' + getSelectedTabId()).width();
    var height = $('#' + getSelectedTabId()).height();
    $('#' + getSelectedTabId()).find('.droppable').css('width', width);
    $('#' + getSelectedTabId()).find('.droppable').css('height', height);
}
function ResizeActIframe () {
    var width = $('#' + getSelectedTabId()).find('.droppable').width();
    var height = $('#' + getSelectedTabId()).find('.droppable').height();
    $('#' + getSelectedTabId() + '-html-bg').attr('width', width);
    $('#' + getSelectedTabId() + '-html-bg').attr('height', height);
}








// Test Buttons --------------------------------------------------------------------------------------------------------
// form action attribut ändern
$(document).on('click', '.EditActionAttr', function() {
    $('#form-test').attr('action', 'http://www.ttv-oberlauda.de');
});
// checken ob form schon vorhanden ist
$(document).on('click', '.TestFormExists', function() {
    debug(document.forms.length);
    if (document.forms.length == 0) alert('no forms!');
});
// aktuellen tab auslesen
$(document).on('click', '.TestActTab', function() {
    debug(getSelectedTabId() + ' TEST: ' + ($('#html-filename').val() || $('#html-filename').attr('placeholder')));
});
// javascript dynamisch hinzufügen
$(document).on('click', '.TestAddJS', function(e) {
    debug($('#jquery-content').html());
    /*
    $('#script-content')
        .append("function delay(sec)" +
        "{"+
        "sleep(sec*1000);"+
        "alert('done');"+
        "}");
        */
});