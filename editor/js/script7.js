/**
 * Created by Valik on 31.08.2015.
 */


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
            .append('<img id="' + getSelectedTabId() + '-bg" class="tab-background" src="" alt="" width="" style="display:none; position:absolute; left: 0; top: 0px; z-index: 1;" />');

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
            debug('picture width and height: ' + width + ' ' + height);
        });
    });
});
// Funktion um eine HTML in den Hintergrund des aktiven Tabs zu laden
$(document).ready(function() {
    $('#i_html_file').change( function(event) {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        debug('temporary path: ' + tmppath);
        var imgname = $('#i_html_file').val();

        // Platzhalter einfügen, vorher Hintergrund leeren
        $('#' + getSelectedTabId()).find('.tab-background').html('');
        $('#' + getSelectedTabId())
            .find('.tab-background')
            .append('<iframe id="' + getSelectedTabId() + '-html-bg" class="tab-background" src="" style="display:none; position:absolute; left: 0; top: 0px; z-index: 1;" onclick="return false;"></iframe>');

        $('#file_html_for_pattern').val($('#i_html_file').val());

        // Bild in Platzhalter einfügen
        $('#' + getSelectedTabId() + '-html-bg')
            .fadeIn("fast")
            .attr('src', URL.createObjectURL(event.target.files[0]))
            .attr('alt', imgname);

        $('#' + getSelectedTabId() + '-html-bg').load(function() {
            var width = $('#' + getSelectedTabId()).find('.droppable').width();
            var height = $('#' + getSelectedTabId()).find('.droppable').height();
            debug('iframe width and height: ' + width + ' ' + height);
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
// Funktion um ein Tab im editor zu entfernen
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

// Funktionen für das ConfigPopUp, .custom öffnen, .closeConfig schließen .removeelement element löschen
$(document).on('click', '.custom', function() {
    var l = $(this).offset().left;
    var t = $(this).offset().top + $(this).height() + 5;

    //todo: hier die Paramter rauslesen und dann direkt beim öffnen wieder mit anzeigen!
    //$(this).attr('onclick');
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
                  '<label class="col50">Ladeanimation</label><input type="checkbox" id="LoadAnim" /><div class="Clear"></div>' +
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
    var relTo = '<select class="chooseTabToLink col40" id="LinkTo">'+
                    '<option value="-1">- custom -</option>';

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

    var paramall = '<div class="col100 ConfigHeaderLine">Parameter</div><div class="Clear"></div>' +
                   '<label class="col50">Verz&ouml;gerung</label><input type="text" id="DelayTime" class="col40" placeholder="0.0"/><div class="Clear"></div>' +
                   '<label class="col50">Ausgabe</label><input type="text" id="ReturnValue" class="col40" placeholder="MusterAusgabe" /><div class="Clear"></div>' +
                   '<label class="col50">Ausgabe zu Element</label>' + outTo + '<div class="Clear"></div>' +
                   '<label class="col50">Weiterleiten auf</label>' + relTo + '<div class="Clear"></div>' +
                   '<label class="col50">spezielle Url</label><input type="text" id="CustomUrl" class="col40" placeholder="test.php" /><div class="Clear"></div>'+
                   '<label class="col50">Url Mod.</label><input type="text" id="ModUrl" class="col40" placeholder="www.testurl.de" /><div class="Clear"></div>';

    switch (val) {
        case "0":
            $('#Parameter').html('');
            break;
        case "1": // hier nur spezifisches hinzufügen
            $('#Parameter').html(paramall +
                                 '<button onclick="addFunction(1)">Funktion zuweisen</button>');
            break;
        case "2":
            $('#Parameter').html(paramall +
                                 '<label class="col50">FixedPos</label>' +
                                     '<div class="col40">' +
                                         '<input type="checkbox" id="FixedPos" class="" onchange="CheckForPos();"/>' +
                                         '<div class="col100">' +
                                             '<label class="FixedPosFields">x</label><input type="number" id="fpx" class="FixedPosFields" value="100" />' +
                                             '<label class="FixedPosFields">y</label><input type="number" id="fpy" class="FixedPosFields" value="100" />' +
                                             '<div class="Clear"></div>' +
                                         '</div>' +
                                     '</div>' +
                                 '<button onclick="addFunction(2)">Funktion zuweisen</button>');
            break;
        case "3":
            $('#Parameter').html(paramall +
                                 '<button onclick="addFunction(3)">Funktion zuweisen</button>');
            break;
    }
}

function addFunction(type) {
    var el = $('#ElementConfig').parent();
    var act_elem    = $('#' + $('#ActElement').text());
    // Übergabeparameter
    var delayTime   = el.find('#DelayTime').val()   || 1;
    var returnValue = el.find('#ReturnValue').val() || -1;
    var returnTo    = el.find('#ReturnTo').val()    || -1;
    var linkFr      = getSelectedTabId();
    var linkTo      = el.find('#LinkTo').val()      || -1;
    var fp          = (document.getElementById('FixedPos') !== null && document.getElementById('FixedPos').checked) ? 1 : -1;
    var fpx         = el.find('#fpx').val()         || -1;
    var fpy         = el.find('#fpy').val()         || -1;
    var customUrl   = el.find('#CustomUrl').val()   || -1;
    var modUrl      = el.find('#ModUrl').val()      || -1;
    var loadAnim    = (document.getElementById('LoadAnim') !== null && document.getElementById('LoadAnim').checked) ? 1 : -1;

    debug('delayTime: ' + delayTime + ' returnVal: ' + returnValue + ' returnTo: ' + returnTo);
    debug('from ' + linkFr + ' to ' + linkTo);
    debug('fp: ' + fp + ' fpx: ' + fpx + ' fpy: ' + fpy);
    debug('customurl: ' + customUrl + ' modurl: ' + modUrl);
    debug('loadAnim: ' + loadAnim);

    switch (type) {
        case 0:
            act_elem.attr("onclick", "debug('nothing to do')");
            break;
        case 1:
            act_elem.attr("onclick", "LoadNextSite(" + delayTime + ", '"
                                                     + returnValue + "', '"
                                                     + returnTo + "', '"
                                                     + linkFr + "', '"
                                                     + linkTo + "', '"
                                                     + fp + "', '"
                                                     + fpx + "', '"
                                                     + fpy + "', '"
                                                     + customUrl + "', '"
                                                     + modUrl + "', '"
                                                     + loadAnim + "')");
            break;
        case 2:
            act_elem.attr("onclick", "LoadNextSitePopUp(" + delayTime + ", '"
                                                     + returnValue + "', '"
                                                     + returnTo + "', '"
                                                     + linkFr + "', '"
                                                     + linkTo + "', '"
                                                     + fp + "', '"
                                                     + fpx + "', '"
                                                     + fpy + "', '"
                                                     + customUrl + "', '"
                                                     + modUrl + "', '"
                                                     + loadAnim + "')");
            break;
        case 3:
            act_elem.attr("onclick", "debug('non type 3')");
            break;
    }
    $('#ElementConfig').hide();
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


// Hilfsfunktionen -------------------------------------------------------------------------
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
// Hilfsfunktionen -------------------------------------------------------------------------
// Testfunktionen  -------------------------------------------------------------------------
// aktuellen tab auslesen
$(document).on('click', '.TestActTab', function() {
    //window.history.replaceState('https://localhost/www.mud.de/index7.php', "", "www.amazon.de/ergneiuhrgipöurg");
});
// Testfunktionen  -------------------------------------------------------------------------