/**
 * Created by Valik on 31.08.2015.
 */

var id_counter = 1;

$(function() {
    $('#tabs').tabs();
});


$(function() {
    /*
     $('.draggable').draggable({
     cancel : false,
     helper: function() {
     return $(this).clone().appendTo('.droppable').css({
     'zIndex': 5
     });
     },
     cursor: 'move',
     containment: "document"
     });
     */

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
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_button').appendTo('.droppable').css({
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
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_radio').appendTo('.droppable').css({
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
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_checkbox').appendTo('.droppable').css({
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
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_input').appendTo('.droppable').css({
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
            return $(this).find('.draggable').clone().removeClass('add_element').addClass('wd_dropdown').appendTo('.droppable').css({
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
    css_content += '.tab{ float: left; width: 1280px; height:960px; }' +
        '.Clear{ clear:both; }';

    // dom_content bauen
    var tc = 0;
    $('#tabs').tabs('option', 'active', tc);
    $('.tab').each(function() {
        // style of element, nur erste index anzeigen
        var soe = 'display:none;';
        if (tc == 0) soe = '';

        // attr=src backuppen
        var backupsource = '';
        var backupwidth = 0;
        var backupheight = 0;
        backupsource = $(this).find('img:first').attr('src');
        backupwidth  = $(this).find('img:first').width();
        backupheight = $(this).find('img:first').height();
        //debug('doing tab: ' + $(this) + ' ' + backupsource + ' ' + backupwidth + ' ' + backupheight );

        var newsource = $(this).find('img:first').attr('alt');
        $(this).find('img:first').attr('src', newsource);

        // domcontent anfügen
        dom_content += '<div id="tabs-' + (tc + 1) + '" class="tab" style="width:' + backupwidth + 'px; height:' + backupheight + 'px; ' + soe + '">' +
                        $(this).html() +
                       '</div><div class="Clear"></div>';

        // attr=src recovern
        $(this).find('img:first').attr('src', backupsource);

        tc++;
        $('#tabs').tabs('option', 'active', tc);
    });

    file_content = '<!DOCTYPE html>' +
        '<html lang="de">' +
        '<head>' +
        '<meta charset="utf-8" />' +
        '<title>' + title + '</title>' +
        '<script type="text/javascript" src="jquery-2.1.4.min.js"></script>' +
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
        document.getElementById('pattern_handler_url').style.display = 'none';
    } else {
        document.getElementById('pattern_handler_pic').style.display = 'none';
        document.getElementById('pattern_handler_url').style.display = 'block';
    }
}
// Funktion um eine URL in den Hintergrund des aktiven Tabs zu Laden
$(document).on('click', '#url_for_pattern_load', function(e) {
    var site = $('#url_for_pattern').val();
    $('#' + getSelectedTabId()).append('<object data="' + site + '" />');
});
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
$(document).on('click', '.TestElemWH', function() {
    var act_elem = $('#' + $('#ActElement').text());
    act_elem.width($('#elem_width').val());
    act_elem.height($('#elem_height').val());
});

// Hilfsfunktionen
// Konsolenausgabe
function debug(str) { console.log(str); }

// Getter für aktuelle Tab-ID z.b.: tab-1
function getSelectedTabId() {
    return $("#tabs .ui-tabs-panel:visible").attr("id");
}


// Funktion zum Selektieren von Elementen
$(document).on('click', '.tab', function(e) {
    if($(e.target).is('.custom')) {
        $('#ActElement').html($(e.target).attr('id'));
        var act_elem = $('#' + $('#ActElement').text());
        $('#elem_width').val(act_elem.width());
        $('#elem_height').val(act_elem.height());
    } else {
        e.preventDefault();
    }
});

// Funktion für das ConfigPopUp
$(document).on('click', '.custom', function() {
    var l = $(this).offset().left;
    var t = $(this).offset().top + $(this).height() + 5;
    $('#ElementConfig').css({left: l, top: t});

    $('#ElementConfig')
        .html('<div>Funktionen</div>' +
                  '<div class="Clear"></div>' +
                  '<div>' +
                      '<select class="chooseFunction" onchange="ShowParametersForDelay(this.value)">' +
                          '<option value="0">- Bitte w&auml;hlen -</option>' +
                          '<option value="1">delay(sec, return)</option>' +
                          '<option value="2">delayPopup(sec, return)</option>' +
                      '</select>' +
                  '</div><div class="Clear"></div>' +
                  '<div id="Parameter">' +
                  '</div><div class="Clear"></div>' +
                  '<div>Style</div><div class="Clear"></div>' +
                  '<div>' +
                      '<input id="ResizeActElem" type="checkbox" onchange="ToggleResizable()"/>' +
                      '<label>Resizeable</label>' +
                  '</div>')
    $('#ElementConfig').show();
});

// Funktion zur Einstellung der Parameter
function ShowParametersForDelay(val) {
    switch (val) {
        case "0":
            $('#Parameter').html('');
            break;
        case "1":
            $('#Parameter').html('<label>Verz&ouml;gerung</label><input type="text" id="DelayTime" value="0.0"/><div class="Clear"></div>' +
                                 '<label>Return</label><input type="text" id="ReturnValue" value="Platzhalter123" /><div class="Clear"></div>' +
                                 '<label>Weiterleiten auf:</label><input type="text" id="LinkTo" value="tabs-x" /><div class="Clear"></div>' +
                                 '<button onclick="addFunction(1)">Funktion zuweisen</button>');
            break;
        case "2":
            $('#Parameter').html('<label>Verz&ouml;gerung</label><input type="text" id="DelayTime" value="0.0"/><div class="Clear"></div>' +
                                '<label>Return</label><input type="text" id="ReturnValue" value="Platzhalter123" /><div class="Clear"></div>' +
                                '<label>Weiterleiten auf:</label><input type="text" id="LinkTo" value="tabs-x" /><div class="Clear"></div>' +
                                '<button onclick="addFunction(2)">Funktion zuweisen</button>');
            break;
        case "3":
            $('#Parameter').html('<label>Verz&ouml;gerung</label><input type="text" id="DelayTime" value="0.0"/><div class="Clear"></div>' +
                                '<label>Return</label><input type="text" id="ReturnValue" value="Platzhalter123" /><div class="Clear"></div>' +
                                '<label>Weiterleiten auf:</label><input type="text" id="LinkTo" value="tabs-x" /><div class="Clear"></div>' +
                                '<button onclick="addFunction(3)">Funktion zuweisen</button>');
            break;
    }
}
// Funktion zum Aktivieren/Deaktivieren der Resizable option
function ToggleResizable(type) {
    var act_elem = $('#' + $('#ActElement').text());
    //act_elem.resizable();
    /*
    if (document.getElementById('ResizeActElem').checked) {
        act_elem.addClass('resizeTrue');
    } else {
        act_elem.removeClass('resizeTrue');333
    }
    */
}
function addFunction(type) {
    var act_elem = $('#' + $('#ActElement').text());
    var delayTime = $('#ElementConfig').parent().find('#DelayTime').val();
    var returnValue = $('#ElementConfig').parent().find('#ReturnValue').val();
    var linkFr = getSelectedTabId();
    var linkTo = $('#ElementConfig').parent().find('#LinkTo').val();

    //debug('delay: ' + delayTime + ' return: ' + returnValue + ' from ' + linkFr + ' to ' + linkTo);

    switch (type) {
        case 0:
            act_elem.attr("onclick", "debug('nothing to do')");
            break;
        case 1:
            act_elem.attr("onclick", "LoadNextSite(" + delayTime + ", '" + returnValue + "', '" + linkFr + "', '" + linkTo + "')");
            break;
        case 2:
            act_elem.attr("onclick", "LoadNextSitePopUp(" + delayTime + ", '" + returnValue + "', '" + linkFr + "', '" + linkTo + "')");
            break;
        case 3:
            act_elem.attr("onclick", "debug('non type 3')");
            break;
    }
}






// ***Funktionen zur Weiterleitung auf nächste Seite, bzw. Öffnen eines PopUps
// ***Kann hier dann entfernt werden und muss nur in der Ausgabedatei enthalten sein
function LoadNextSite(delay, response, from, to) {
    if ($('#Mode').val() !== 'editor')
    {
        debug('delay: ' + delay + ' return: ' + response + ' from ' + from + ' to ' + to);
        $('#' + from).hide();
        $('#' + to).show();
    }
    else
    {
        debug('in editor mode 1');
    }
}
function LoadNextSitePopUp(delay, response, from, to) {
    if ($('#Mode').val() !== 'editor')
    {
        debug('delay: ' + delay + ' return: ' + response + ' from ' + from + ' to ' + to);
        $('#' + from).hide();
        $('#' + to).show();
    }
    else
    {
        debug('in editor mode 2');
    }
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










