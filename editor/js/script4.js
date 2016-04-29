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


$(function() {
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
                    .addClass('dropped custom')
                    .draggable({cancel : false, containment:'parent'})
                    .css({position:'absolute', top: newY + 43, left: newX, zIndex: 5 })
                    .attr('id', elem.attr('id') + '_' + id_counter));
                id_counter++;
            }

            // aktualisiere Tree
            CreateTree(getSelectedTabId());
        }
    });
});

// Drag Button
$(function() {
    $('#add_button').draggable({
        cancel: false,
        helper: function() {
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_button').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 5
            });
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
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_radio').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 5
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
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_checkbox').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 5
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
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_input').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 5
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
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_dropdown').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 5
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
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_table').appendTo($('#' + getSelectedTabId()).find('.droppable')).css({
                'zIndex': 5
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
    var css_content = '';
    var dom_content = '';

    // css_content bauen
    css_content += ''+
        '.tab { float: left; width: 1280px; height:960px; }' +
        '.invisButton { background: transparent !important; border: 1px solid red !important; opacity: 0; filter: alpha(opacity=0); }' +
        '.Clear { clear:both; }';

    // dom_content bauen
    var tc = 0;
    $('#tabs').tabs('option', 'active', tc);
    $('.tab').each(function() {
        // style of element, nur erste index anzeigen
        var soe = 'display:none;';
        if (tc == 0) soe = '';

        // attr=src des bildes backuppen
        var backupsource = '', backupwidth = 0, backupheight = 0;
        backupsource = $(this).find('img:first').attr('src');
        backupwidth  = $(this).find('img:first').width();
        backupheight = $(this).find('img:first').height();
        var newsource = $(this).find('img:first').attr('alt');
        $(this).find('img:first').attr('src', newsource);

        // attr=src des iframe backuppen
        var backup_html_source = '', backup_html_width = 0, backup_html_height = 0;
        backup_html_source = $('#' + getSelectedTabId() + '-html-bg').attr('src');
        backup_html_width  = $('#' + getSelectedTabId() + '-html-bg').width();
        backup_html_height = $('#' + getSelectedTabId() + '-html-bg').height();
        var newsource_html = $('#' + getSelectedTabId() + '-html-bg').attr('alt');
        $('#' + getSelectedTabId() + '-html-bg').attr('src', newsource_html);

        // domcontent anfügen
        dom_content += '<div id="tabs-' + (tc + 1) + '" class="tab" style="width:' + backupwidth + 'px; height:' + backupheight + 'px; ' + soe + '">' +
                           $(this).html() +
                       '</div><!--<div class="Clear"></div>-->';

        // attr=src recovern
        $(this).find('img:first').attr('src', backupsource);
        $('#' + getSelectedTabId() + '-html-bg').attr('src', backup_html_source);

        // tab hochzählen
        tc++;
        $('#tabs').tabs('option', 'active', tc);
    });

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
        '<body>' +
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
    $('#i_file').change( function(event) {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        var imgname = $('#i_file').val();

        $('#file_for_pattern').val($('#i_file').val());

        $('#' + getSelectedTabId() + '-bg')
            .fadeIn("fast")
            .attr('src', URL.createObjectURL(event.target.files[0]))
            .attr('alt', imgname);

        $('#' + getSelectedTabId() + '-bg').load(function() {
            var width = $(this).width();
            var height = $(this).height();

            $('#' + getSelectedTabId()).width(width);
            $('#' + getSelectedTabId()).height(height);
        });
    });
});
// Funktion um ein Bild in den Hintergrund des aktiven Tabs zu laden
$(document).ready(function() {
    $('#i_html_file').change( function(event) {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        var imgname = $('#i_html_file').val();

        $('#file_html_for_pattern').val($('#i_html_file').val());


        $('#' + getSelectedTabId() + '-html-bg')
            .fadeIn("fast")
            .attr('src', URL.createObjectURL(event.target.files[0]))
            .attr('alt', imgname);
        /*
        var file = event.target.files[0];

        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) { $('#' + getSelectedTabId() + '-html-bg').html(evt.target.result); }
            reader.onerror = debug('error reading file');
        }
        */

        $('#' + getSelectedTabId() + '-html-bg').load(function() {
            var width = $('#' + getSelectedTabId()).width();
            var height = $('#' + getSelectedTabId()).height();

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
    var act_elem = $('#' + $('#ActElement').text());
    act_elem.width($('#elem_width').val());
    act_elem.height($('#elem_height').val());
});
$(document).on('click', '.AddTab', function() {
    var num_tabs = $('#tabs ul li').length + 1;
    $("div#tabs ul").append('<li><a href="#tabs-' + num_tabs + '">index_' + num_tabs + '</a></li>');
    $("div#tabs").append('<div id="tabs-' + num_tabs + '" class="tab droppable">' +
                            '<img id="tabs-' + num_tabs + '-bg" src="" alt="" width="" style="display:none; position:absolute; left: 0; top: 45px; z-index: 1;" />' +
                           '</div>');

    $("div#tabs").tabs("refresh");
    $('.tab').resizable();
});
$(document).on('click', '.RemoveTab', function() {

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
    $('#ElementConfig').css({left: l, top: t});

    $('#ElementConfig')
        .html('<div class="col100"><div id="ElementConfigItemName" class="col90"></div><button class="CloseConfig">x</button></div>' +
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
              '</div>'+
              '<div class="Clear"></div>');
    $('#ElementConfig').show();
});
$(document).on('click', '.CloseConfig', function() {
    $('#ElementConfig').hide();
});

// Funktion zur Einstellung der Parameter
function ShowParametersForDelay(val) {
    switch (val) {
        case "0":
            $('#Parameter').html('');
            break;
        case "1":
            $('#Parameter').html('<div class="col100 ConfigHeaderLine">Parameter</div><div class="Clear"></div>' +
                                 '<label class="col50">Verz&ouml;gerung</label><input type="text" id="DelayTime" class="col40" placeholder="0.0"/><div class="Clear"></div>' +
                                 '<label class="col50">Ausgabe</label><input type="text" id="ReturnValue" class="col40" placeholder="Platzhalter123" /><div class="Clear"></div>' +
                                 '<label class="col50">Ausgabe zu Element</label><input type="text" id="ReturnTo" class="col40" placeholder="drag_input_1" /><div class="Clear"></div>' +
                                 '<label class="col50">Weiterleiten auf</label><input type="text" id="LinkTo" class="col40" placeholder="tabs-x" /><div class="Clear"></div>' +
                                 '<button onclick="addFunction(1)">Funktion zuweisen</button>');
            break;
        case "2":
            $('#Parameter').html('<div class="col100 ConfigHeaderLine">Parameter</div><div class="Clear"></div>' +
                                 '<label class="col50">Verz&ouml;gerung</label><input type="text" id="DelayTime" class="col40" placeholder="0.0"/><div class="Clear"></div>' +
                                 '<label class="col50">Ausgabe</label><input type="text" id="ReturnValue" class="col40" placeholder="Platzhalter123" /><div class="Clear"></div>' +
                                 '<label class="col50">Ausgabe zu Element</label><input type="text" id="ReturnTo" class="col40" placeholder="drag_input_1" /><div class="Clear"></div>' +
                                 '<label class="col50">Weiterleiten auf</label><input type="text" id="LinkTo" class="col40" placeholder="tabs-x" /><div class="Clear"></div>' +
                                 '<button onclick="addFunction(2)">Funktion zuweisen</button>');
            break;
        case "3":
            $('#Parameter').html('<div class="col100 ConfigHeaderLine">Parameter</div><div class="Clear"></div>' +
                                 '<label class="col50">Verz&ouml;gerung</label><input type="text" id="DelayTime" class="col40" placeholder="0.0"/><div class="Clear"></div>' +
                                 '<label class="col50">Ausgabe</label><input type="text" id="ReturnValue" class="col40" placeholder="Platzhalter123" /><div class="Clear"></div>' +
                                 '<label class="col50">Ausgabe zu Element</label><input type="text" id="ReturnTo" class="col40" placeholder="drag_input_1" /><div class="Clear"></div>' +
                                 '<label class="col50">Weiterleiten auf</label><input type="text" id="LinkTo" class="col40" placeholder="tabs-x" /><div class="Clear"></div>' +
                                 '<button onclick="addFunction(3)">Funktion zuweisen</button>');
            break;
    }
}

function addFunction(type) {
    var act_elem = $('#' + $('#ActElement').text());
    var delayTime = $('#ElementConfig').parent().find('#DelayTime').val();
    var returnValue = $('#ElementConfig').parent().find('#ReturnValue').val();
    var returnTo = $('#ElementConfig').parent().find('#ReturnToValue').val();
    var linkFr = getSelectedTabId();
    var linkTo = $('#ElementConfig').parent().find('#LinkTo').val();

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


// Hilfsfunktionen
// Konsolenausgabe
function debug(str) { console.log(str); }

// Getter für aktuelle Tab-ID z.b.: tab-1
function getSelectedTabId() {
    return $("#tabs .ui-tabs-panel:visible").attr("id");
}
function ResizeActTab() {
    var width = $('#' + getSelectedTabId()).width();
    var height = $('#' + getSelectedTabId()).height();
    $('#' + getSelectedTabId()).find('.droppable').css('width', width);
    $('#' + getSelectedTabId()).find('.droppable').css('height', height);
}
function ResizeActIframe () {
    var width = $('#' + getSelectedTabId()).width();
    var height = $('#' + getSelectedTabId()).height();
    $('#' + getSelectedTabId() + '-html-bg').attr('width', width);
    $('#' + getSelectedTabId() + '-html-bg').attr('height', height);
}
$(window).scroll(function() {
    $('#Panel-Elements-Bot-Debug').css({ bottom: 30 });
    $('#Panel-Elements-Bot-Bar').css({ bottom: 0 });
    $('#Panel-Editor-Footer').css({ bottom: 0 });
    debug( $(window).height());
});









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










