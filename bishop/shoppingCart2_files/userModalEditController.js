/*jslint bitwise: false, browser: false, eqeqeq: false, onevar: false, passfail: false, undef: false, white: false, laxbreak: true */

//currently only used by UserModalPart.vb
function BBNCUserModalEditor(editorDlgId, editorBtnLinkId, height, width, HeaderCSS, HeaderLabelCSS, DialogFormCSS, ButtonPaneCSS, ButtonCSS, saveFail, messageDivId, message, ValidationDivCSS, SavingDivCSS, SaveBtnText, CancelBtnText, CancelEventType, CancelEventHandlerReference, dialogPosition, dialogPositionElement, dialogSaveOnEnter, dialogCloseOnEscape, messageOnly, messageOnlyButtonText) {

    //var $ = BLACKBAUD.netcommunity.jQuery.v1_3_2;

    var me = this;  //preserve this reference before it switches context within jQuery functions

    me._editorId = editorDlgId;
    me._editorLinkId = editorBtnLinkId;
    me._cancelEventHandlerReference = CancelEventHandlerReference;
    me._cancelEventType = CancelEventType;

    if (typeof (height) == 'undefined') {
        me._height = 400;
    } else {
        if (height == -1) {
            me._height = "auto"; 
        } else {
            me._height = height;
        }
    }

    if (typeof (width) == 'undefined') {
        me._width = 400;
    } else {
        if (width == -1) {
            me._width = "auto"; 
        } else {
            me._width = width;
        }
    }

    if (typeof (dialogPosition) == 'undefined') {
        dialogPosition = 'center';
    } else {
        if (dialogPosition == 'element') {
            dialogPosition = [$("#" + dialogPositionElement).attr("offsetLeft"), $("#" + dialogPositionElement).attr("offsetTop")];
        }
    }

    me._saveButton = null;
    function getSaveButton() {
        if(!me._saveButton) {
            var modalDialogContent = $("#" + me._editorId).dialog("widget").get(0);
            var modalDialogButtonPane = $(".ui-dialog-buttonpane", modalDialogContent.parentElement).get(0); //.nextSibling
            me._saveButton = $("button:contains(" + SaveBtnText + ")", modalDialogButtonPane).get(0);
        }
        return me._saveButton;
    }

    me.jQueryReady = function () {
        //dialog definition
        $("#" + me._editorId).dialog(
                {
                    modal: true,
                    autoOpen: false,
                    height: me._height,
                    width: me._width,
                    position: dialogPosition,
                    resizable: false,
                    draggable: false,
                    closeOnEscape: dialogCloseOnEscape,
                    overlay: { "background-color": "#000", "opacity": "0.75", "-moz-opacity": "0.75" },
                    open: function (event, ui) { $(this).parent().appendTo("form"); },
                    buttons: {
                        "DialogButtonCancel": function () { doMyEditCancel(); $(this).dialog("close"); },
                        "DialogButtonSave": function () { doSaveCSS(); doMyEditSave(); }
                    }
                });

        //attach edit dialog open to edit link
        $("#" + me._editorLinkId).click(function () {
            //event.preventDefault();
            console.log("#" + me._editorId);
            $("#" + me._editorId).dialog("open");
        });

        $(".ui-dialog-titlebar").addClass(HeaderCSS);
        $(".ui-dialog-title").addClass(HeaderLabelCSS);
        $(".ui-dialog-buttonpane").addClass(ButtonPaneCSS);
        $(".ui-state-default").addClass(ButtonCSS);

        $(".ui-dialog").removeClass("ui-widget"); //this class makes the font big
        $(".ui-dialog").addClass(DialogFormCSS);

        if (Boolean.parse(messageOnly)) { //if (messageOnly.toLowerCase() == true.toString()) {
            $('.ui-dialog-buttonpane button:contains(DialogButtonSave)').hide();
            $("#" + messageDivId).siblings().hide();

            $('.ui-dialog-buttonpane button:contains(DialogButtonCancel)').text(messageOnlyButtonText);
            $('.ui-dialog-buttonpane button:contains(DialogButtonSave)').text(SaveBtnText);
        } else {
            $('.ui-dialog-buttonpane button:contains(DialogButtonCancel)').text(CancelBtnText);
            $('.ui-dialog-buttonpane button:contains(DialogButtonSave)').text(SaveBtnText);
        }

        //optionally bind Enter key to Save button
        if (dialogSaveOnEnter) {
            $("#" + me._editorId).find("input").keypress(function (e) {
                if (e.keyCode == 13) {
                    getSaveButton().click();
                    return false;
                }
            });
        }

        me._saving = false;
        //callback from dialog save
        function doMyEditSave() {
            if (!me._saving) {
                me._saving = true;
                //doEditSave is a postback reference spit out from codebehind
                me.doEditSave();
            }
        }

        function doSaveCSS() {
            $("#" + messageDivId).removeClass(ValidationDivCSS);
            $("#" + messageDivId).addClass(SavingDivCSS);
            $("#" + messageDivId).html(message);

            var saveButton = getSaveButton();
            if (typeof saveButton.disabled !== 'undefined') {
                saveButton.disabled = true;
            }
        }

        //validation
        if (parseInt(saveFail,10)) {
            $("#" + messageDivId).removeClass(SavingDivCSS);
            $("#" + messageDivId).addClass(ValidationDivCSS);
            $("#" + messageDivId).html(message);
            $("#" + me._editorId).dialog("open");
        }

        function doMyEditCancel() {
            //alert(me._cancelEventHandlerReference);
            //alert(me._cancelEventType);
            if (Boolean.parse(messageOnly)) {
                messageOnly = 'false';
                $("#" + messageDivId).html('');
                $("#" + messageDivId).siblings().show();

                var modalDialogContent = $("#" + me._editorId).dialog("widget").get(0);
                var modalDialogButtonPane = $(".ui-dialog-buttonpane", modalDialogContent.parentElement).get(0); //.nextSibling
                $("button:contains(" + messageOnlyButtonText + "):visible", modalDialogButtonPane).text(CancelBtnText);
                $("button:contains(" + SaveBtnText + ")", modalDialogButtonPane).show();
            } else {
                if (me._cancelEventHandlerReference !== "" && me._cancelEventType !== "") {
                    $('#' + me._cancelEventHandlerReference).trigger(me._cancelEventType);
                }
            }
        }
    };
}