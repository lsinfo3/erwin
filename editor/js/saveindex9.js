/**
 * Created by Valik on 31.08.2015.
 */


// Alle Tabs als eine .html speichern
$(document).on('click', '.SaveTabButton', function() {
    var file_content = '';
    var title = 'platzhaltetitel';
    var script_content = $('#script-content').html();
    var dyn_sc_content = "";
    var css_content = $('#css-content').html();
    var dom_content = '';

    script_content += ''+
        '$(document).on("mousedown", ".tab-background", function (e) { e.preventDefault(); console.log("noclick1"); });';

    // dynamisch hinzugefügtes skript auslesen und hinzufügen
    $('.dyn_script').each(function() { script_content += $(this).html(); });

    // css_content bauen
    css_content += ''+
        'body { margin:0; }'+
        '.tab_in_popup { position: absolute; left:100px; top:100px; }'+
        '.invisButton { background: transparent !important; border: 1px solid red !important; opacity: 0; filter: alpha(opacity=0); }'+
        '.invisBorder { border: 0px solid; }'+
        '.Clear { clear:both; }'+
        '#Test { }'+
        '.Instructions { position:absolute; width: 20%; z-index: 99; background: #cbcccc; opacity: 0.7; min-height:100%; }'+
        '.instructions_header { height: 40px; padding:10px; line-height: 40px; font-size: 24px; font-style: italic;  border-bottom: 1px solid #000; font-weight: bold;}'+
        '.i_line { width: 100%; padding: 10px; line-height: 20px; font-size: 20px; box-sizing: border-box; }'+
        '.active { font-weight: bold; background: #FFF; }';

    // css für tab, init size + init pos
    if ($('input[name="ShowInTabs"]:checked').val() == 0) {
        css_content += '.tab { position:absolute; width: 1280px; height: 960px; }';
    } else {
        if ($('input[name="InPos"]:checked').val() == 1) { // links
            css_content += '.tab { position:absolute; width: 1280px; height: 960px; left: 20%; }';
        } else if ($('input[name="InPos"]:checked').val() == 2) { // rechts
            css_content += '.tab { position:absolute; width: 1280px; height: 960px; }';
        }
    }

    // dom_content bauen
    var tc = 0;
    var firsttabiframe = '';
    $('#tabs').tabs('option', 'active', tc);
    $('.tab').each(function() {
        // style of element, nur erste index anzeigen
        var soe = 'display:none;'; // sichtbarkeit von element
        if (tc == 0) soe = '';
        var add_class = '';

        // tabcontent hinzufügen
        var backupsource = '', backupwidth = 0, backupheight = 0;

        if ($('#' + getSelectedTabId() + '-bg').length) { // image bg
            add_class = 'bg_image';
            // attr=src des bildes backuppen
            backupsource = $('#' + getSelectedTabId() + '-bg').attr('src');
            backupwidth = $('#' + getSelectedTabId() + '-bg').width();
            backupheight = $('#' + getSelectedTabId() + '-bg').height();
            var newsource = $('#' + getSelectedTabId() + '-bg').attr('alt');
            $('#' + getSelectedTabId() + '-bg').attr('src', newsource);
        } else if ($('#' + getSelectedTabId() + '-html-bg').length) { // html bg
            //if (tc == 0) firsttabiframe = 'overflow-visibility';
            add_class = 'bg_iframe';
            // attr=src des iframe backuppen
            backupsource = $('#' + getSelectedTabId() + '-html-bg').attr('src');
            backupwidth = $('#' + getSelectedTabId() + '-html-bg').width();
            backupheight = $('#' + getSelectedTabId() + '-html-bg').height();
            var newsource_html = $('#' + getSelectedTabId() + '-html-bg').attr('alt');
            $('#' + getSelectedTabId() + '-html-bg').attr('src', newsource_html);

            // da iframe hintergrund, script hinzufügen das die ausführung von klicks im jeweiligen iframe blockiert.
            dyn_sc_content += ""+
                "$('#" + getSelectedTabId() + "-html-bg').load(function() {"+
                    "$('#" + getSelectedTabId() + "-html-bg').contents().find('a').each(function() {"+
                        "$(this).removeAttr('href'); $(this).css('cursor', 'pointer');"+
                        "$(this).on('click', function(event) { event.preventDefault(); event.stopPropagation(); }); });" +
                    "$('#" + getSelectedTabId() + "-html-bg').contents().find('[onclick]').each(function() { $(this).removeAttr('onclick'); });" +
                    "$('#" + getSelectedTabId() + "-html-bg').contents().find('[onchange]').each(function() { $(this).removeAttr('onchange'); });" +
                    "$('#" + getSelectedTabId() + "-html-bg').contents().find('input[type=submit]').each(function() { $(this).prop('type', 'button'); });" +
                    "$('#" + getSelectedTabId() + "-html-bg').contents().find('form').each(function(event) {"+
                        "$(this).removeAttr('action'); $(this).removeAttr('method');"+
                        "$(this).bind('keypress', function(e) { if (e.keyCode == 13) { return false; } }); }); });"
        }

        // prüfen ob Anweisungen hinzugefügt werden müssen
        var instructions = '';
        switch ($('input[name="ShowInTabs"]:checked').val()) {
            case "0":
                break;
            case "1": // all
                if ($('input[name="InPos"]:checked').val() == 1) { // links
                    css_content += '#tabs-' + (tc + 1) + '-instructions { height: ' + backupheight + 'px; }';
                } else { // rechts
                    css_content += '#tabs-' + (tc + 1) + '-instructions { height: ' + backupheight + 'px; left: ' + backupwidth + 'px; }';
                }

                // Instructions einfügen
                var eachcounter = 0;
                instructions += '<div id="tabs-' + (tc + 1) + '-instructions" class="Instructions" style="' + soe + '">'+
                                    '<div class="instructions_header">Further action:</div>';
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

        // falls instructions links, vor dem tab anfügen
        if ($('input[name="InPos"]:checked').val() == 1) dom_content += instructions;

        // dom content anfügen
        dom_content += '<div id="tabs-' + (tc + 1) + '" class="tab ' + add_class + '" style="width:' + backupwidth + 'px; height:' + backupheight + 'px; ' + soe + '">';
        dom_content += $(this).find('.tab-background').html()+$(this).find('.droppable').html();
        dom_content += '</div><!--<div class="Clear"></div>-->';

        // falls instructions rechts, nach dem tab anfügen
        if ($('input[name="InPos"]:checked').val() == 2) dom_content += instructions;

        // attr=src recovern
        if ($('#' + getSelectedTabId() + '-bg').length) {
            $('#' + getSelectedTabId() + '-bg').attr('src', backupsource);
        } else if ($('#' + getSelectedTabId() + '-html-bg').length) {
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
            '<div id="Test">' + dom_content + '</div>' +
            '<script>' + dyn_sc_content + '</script>' +
        '</body>' +
        '</html>';


    saveAs(
        new Blob(
            [file_content],
            {type: 'application/xhtml+xml;charset=' + document.characterSet}
        ),
        ($('#html-filename').val() || $('#html-filename').attr('placeholder')) + '.html');
});