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


// Auswahl der Elemente / BGs anzeigen
$(document).on('click', '#Element_Choices', function() {
    $('#Panel-Elements-BG').hide('');
    $('#Panel-Elements-Items').show('');
});
$(document).on('click', '#Background_Choices', function() {
    $('#Panel-Elements-Items').hide('');
    $('#Panel-Elements-BG').show('');
});

// Bild oder HTML Auswahl aktivieren
function ChoosePattern() {
    if (document.getElementById('pattern_pic').checked) {
        $('#pattern_handler_img').show('');
        $('#pattern_handler_zip').hide('');
    } else if (document.getElementById('pattern_off').checked) {
        $('#pattern_handler_img').hide('');
        $('#pattern_handler_zip').show('');
    }
}

// Hilfsfunktionen zum Submitten der Uploadforms ohne den editor neu zu laden
function redirectImg()
{
    document.getElementById('img_form').target = 'img_frame';
    document.getElementById('img_form').submit();
}
function redirectZip()
{
    document.getElementById('zip_form').target = 'zip_frame';
    document.getElementById('zip_form').submit();
}
// Funktion zu neuladen der hochgeladenen Dateien
$(document).on('click', '#refresh_img', function() {
    RefreshImgs();
});
function RefreshImgs() {
    $.ajax({
        url: 'refresh_img.php',
        type: 'POST'
    }).done(function(data){
        $('#available_img').html(data);
    });
}
$(document).on('click', '#refresh_zip', function() {
    RefreshZips();
});
function RefreshZips() {
    $.ajax({
        url: 'refresh_zip.php',
        type: 'POST'
    }).done(function(data){
        $('#available_zip').html(data);
    });
}
// Funktion um per doppelklick auf ein Bild dieses in den Hintergrund zu laden
$(document).on('dblclick', '.av_img', function() {
    var name = $(this).find('.av_img_name').html();
    var path = $(this).find('.av_img_path').html();
    var style = 'display:none; position:absolute; left: 0; top: 0px; z-index: 1;';

    // Platzhalter einfügen
    $('#' + getSelectedTabId()).find('.tab-background').html('');
    $('#' + getSelectedTabId())
        .find('.tab-background')
        .append('<img id="' + getSelectedTabId() + '-bg" class="tab-background" src="' + path + '/' + name + '" alt="" width="" style="' + style + '" />');

    $('#' + getSelectedTabId() + '-bg')
        .fadeIn("fast")
        .attr('alt', $(this).find('.av_img_name').html());

    $('#' + getSelectedTabId() + '-bg').load(function() {
        var width = $('#' + getSelectedTabId() + '-bg').width();
        var height = $('#' + getSelectedTabId() + '-bg').height();
        $('#' + getSelectedTabId()).css({'width':width});
        $('#' + getSelectedTabId()).css({'height':height});
        debug('picture width and height: ' + width + ' ' + height);
    });
});
// Funktion um per doppelklick auf eine HTML diese in den Hintergrund zu laden
$(document).on('dblclick', '.av_zip_file', function() {
    var name = $(this).find('.av_zip_file_name').html().replace('>', '').replace('&gt;', '');
    var path = $(this).find('.av_zip_file_path').html().replace('>', '');
    var style = 'display:none; position:absolute; left: 0; top: 0px; z-index: 1;';

    // Platzhalter einfügen, vorher Hintergrund leeren
    $('#' + getSelectedTabId()).find('.tab-background').html('');
    $('#' + getSelectedTabId())
        .find('.tab-background')
        .append('<iframe id="' + getSelectedTabId() + '-html-bg"' +
                    'class="tab-background" src="'+path+'/'+name+'" style="' + style + '" onclick="return false;"></iframe>');

    // Bild in Platzhalter einfügen
    $('#' + getSelectedTabId() + '-html-bg')
        .fadeIn("fast")
        .attr('alt', name);

    $('#' + getSelectedTabId() + '-html-bg').load(function() {
        var width = $('#' + getSelectedTabId()).find('.droppable').width();
        var height = $('#' + getSelectedTabId()).find('.droppable').height();
        debug('iframe width and height: ' + width + ' ' + height);
        $('#' + getSelectedTabId() + '-html-bg').attr('width', width);
        $('#' + getSelectedTabId() + '-html-bg').attr('height', height);
    });
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
    $('.tab').resizable({
        start: function(e, ui) { },
        resize: function(e, ui) {
            //ResizeActTab();
            ResizeActIframe();
        },
        stop: function(e, ui) { }
    });
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
                      '<option value="3">delayOnChange(sec, return)</option>' +
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
                                 '<label class="col50">Target Keyword</label><input type="text" id="Keyword" class="col40" placeholder="keyword" /><div class="Clear"></div>' +
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
    var target      = el.find('#Keyword').val()     || -1;

    debug('delayTime: ' + delayTime + ' returnVal: ' + returnValue + ' returnTo: ' + returnTo);
    debug('from ' + linkFr + ' to ' + linkTo);
    debug('fp: ' + fp + ' fpx: ' + fpx + ' fpy: ' + fpy);
    debug('customurl: ' + customUrl + ' modurl: ' + modUrl);
    debug('loadAnim: ' + loadAnim + ' Target Key: ' + target);

    var params = delayTime + ", '" + returnValue + "', '" + returnTo + "', '" + linkFr + "', '" + linkTo + "', '" +
                 fp + "', '" + fpx + "', '" + fpy + "', '" + customUrl + "', '" + modUrl + "', '" + loadAnim + "'";

    switch (type) {
        case 0:
            act_elem.attr("onclick", "debug('nothing to do')");
            break;
        case 1:
            act_elem.attr("onclick", "LoadNextSite(" + params + ")");
            break;
        case 2:
            act_elem.attr("onclick", "LoadNextSitePopUp(" + params + ")");
            break;
        case 3:
            //act_elem.attr("onclick", "LoadNextSitePopUp(" + params + "')");
            if($('#Script-' + $('#ActElement').text()).length) {
                $('#HiddenScript').find('#Script-' + $('#ActElement').text()).html("$(document).on('input', '#" + $('#ActElement').text() + "', function() { LoadNextSiteOnChange(" + params + ", '" + $('#ActElement').text() + "', '" + target + "');});");//ersetzen
            } else {
                $('#HiddenScript').append("<div id='Script-" + $('#ActElement').text() + "' class='dyn_script'>$(document).on('input', '#" + $('#ActElement').text() + "', function() { LoadNextSiteOnChange(" + params + ", '" + $('#ActElement').text() + "', '" + target + "');});</div>");//einfügen
            }
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