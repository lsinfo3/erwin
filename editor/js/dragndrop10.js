/**
 * Created by Valik on 31.08.2015.
 */

var id_counter = 1;

$(document).ready(function() {
    InitDroppable();
});

function InitDroppable(){
    $('.droppable').droppable({
        //activeClass: 'ui-state-hover',
        //accept: '.component',
        tolerance: 'pointer',

        drop: function(event, ui) {
            if (!ui.draggable.hasClass("dropped")) {
                var elem = ui.draggable.find('.draggable').clone();
                var newX = ui.offset.left - $(this).offset().left;
                var newY = ui.offset.top - $(this).offset().top;

                $(this).prepend(elem
                    .removeClass('add_element fl ml20')
                    .addClass('dropped custom')
                    .draggable({cancel: false, containment: 'parent'})
                    .css({position: 'absolute', top: newY + 43, left: newX, zIndex: 1})
                    .attr('id', elem.attr('id') + '_' + id_counter))
                ;
                id_counter++;
            }
        }
    });
}

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

