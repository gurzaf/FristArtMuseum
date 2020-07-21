/*jslint bitwise: true, browser: true, eqeqeq: true, nomen: true, undef: false, white: true */

function rdo_OnClick(r) {
    var ctlAmount = document.getElementById(txtAmountID);
    var ctlAthon = document.getElementById(chkIsAthonID);
    var ctlAmountReqVal = document.getElementById(m_oReqValidatorAmountID);
    var ctlAmountCmpVal = document.getElementById(m_oCmpValidatorAmountID);
    //var ctlAmountRegExVal = document.getElementById(m_oRegExValidatorAmountID);
    //var ctlRequired = document.getElementById(lblAmtRequiredMarkerID);
    var ctlOtherAmountLabel = document.getElementById(otherAmountLabel);
    //ViM on 2/4/08 for CR292496-013008
    // Value comparison is sufficient here. No need to compare type. Replacing === with ==
    if (setGivingLevel(r) == -1)
    {
        ctlAmount.disabled = false;
        if (ctlAthon !==  null)
        {
            ctlAthon.disabled = false;
        }
        try
        {
            ctlAmountReqVal.enabled = true;
            ctlAmountCmpVal.enabled = true;
            //ctlAmountRegExVal.enabled = true;
        }
        catch(e) {}
        //if (ctlRequired) {
        //    ctlRequired.style.visibility = 'visible';
        //}
        if (ctlOtherAmountLabel) {
            ctlOtherAmountLabel.style.visibility = 'visible';
        }
    }
    else
    {
        if (ctlAmount !==  null)
        {
            ctlAmount.disabled = true;
            ctlAmount.value = '';
        }
        if (ctlAthon !==  null)
        {
            ctlAthon.disabled = true;
        }
        try
        {
            ctlAmountReqVal.enabled = false;
            ctlAmountCmpVal.enabled = false;
            //ctlAmountRegExVal.enabled = false;
        }
        catch(e) {}
        //if (ctlRequired !==  null)
        //{
        //    ctlRequired.style.visibility = 'hidden';
        //}
        //if (ctlOtherAmountLabel) {
        //    ctlOtherAmountLabel.style.visibility = 'hidden';
        //    ctlOtherAmountLabel.innerText = '';
        //    ctlOtherAmountLabel.innerHTML = '';
        //}
    }
    //truePledge.updateSummary();
    UpdateSummary();

}

function setGivingSchedule(rdo, target) {
    var hdnvar = document.getElementById(target);
    if (rdo.checked) {
        hdnvar.value = rdo.value;
    }
}

function setGivingLevel(r)
{
    var ctlHidden = document.getElementById(HiddenIDID);
    var level = r.parentNode.attributes.getNamedItem('itemIndex').nodeValue;
    ctlHidden.value = level;
    return level;
}

function DonationGiftAidHelp()
{
    var sFeatures = 'WIDTH=510px,HEIGHT=425px,RESIZABLE=YES,SCROLLBARS=NO,TOOLBAR=NO,LEFT=5,TOP=20,location=No;status=No';
    var oPopUp = new PopUpDialogBB('~/Admin/DonationHelp.ascx', '_blank', sFeatures, '&mode=4');
    oPopUp.Show();
}

function txtTributeName_KeyUp(txtbox, ddlRequiredId)
{
    var ddlRequired = document.getElementById(ddlRequiredId);
    var visibility;
    
    if(txtbox.value.replace("^\s*|\s*$", "") === "")
    {
        visibility = "hidden";
    }
    else
    {
        visibility = "visible";
    }

    ddlRequired.style.visibility = visibility;
}

function ddlTribute_OnChange(ddl)
{
    var chkAcknowledge = document.getElementById(chkAcknowledgeID);
    var m_oReqValidator_TribName = document.getElementById(m_oReqValidator_TribNameID);
    var tdTributeRequiredMarker = document.getElementById(tdTributeRequiredMarkerID);
    if (!suppressTributeDesc)
    {
        var m_oReqValidator_TribDesc = document.getElementById(m_oReqValidator_TribDescID);
        var txtTributeDescription = document.getElementById(txtTributeDescriptionID);
        var tdTributeDescRequiredMarker = document.getElementById(tdTributeDescRequiredMarkerID);
    }
    
    if ((ddl.selectedIndex !== 0) || (chkAcknowledge.checked))
    {
        if (m_oReqValidator_TribName !== null)
        {
            m_oReqValidator_TribName.enabled = true;
        }
        if (tdTributeRequiredMarker)
        {
            tdTributeRequiredMarker.style.visibility = 'visible';
        }
        if (ddl.selectedIndex !== 0)
        {
            if (txtTributeDescription)
            {
                txtTributeDescription.disabled = false;
                if (!window.event) {
                        txtTributeDescription.focus();
                }
            }
            if (tdTributeDescRequiredMarker)
            {
                tdTributeDescRequiredMarker.style.visibility = 'visible';
            }
            try
            {
                if (m_oReqValidator_TribDesc)
                {
                    m_oReqValidator_TribDesc.enabled = true;
                }
                var w = ddl.selectedIndex;
                var selected_text = ddl.options[w].text;
                if (m_oReqValidator_TribDesc)
                {
                    m_oReqValidator_TribDesc.errormessage = selected_text + ' Description: Required';
                }
            }
            catch(e) {}
        }
        else
        {
            if (txtTributeDescription)
            {
                txtTributeDescription.disabled = true;
            }
            if (m_oReqValidator_TribDesc)
            {
                m_oReqValidator_TribDesc.enabled = false;
            }
            if (tdTributeDescRequiredMarker)
            {
                tdTributeDescRequiredMarker.style.visibility = 'hidden';
            }
        }
    }
    else
    {
        if (txtTributeDescription)
        {
            txtTributeDescription.disabled = true;
        }
        if (tdTributeRequiredMarker)
        {
            tdTributeRequiredMarker.style.visibility = 'hidden';
        }
        if (tdTributeDescRequiredMarker)
        {
            tdTributeDescRequiredMarker.style.visibility = 'hidden';
        }
        
        try
        {
            m_oReqValidator_TribName.enabled = false;
            if (m_oReqValidator_TribDesc)
            {
                m_oReqValidator_TribDesc.enabled = false;
            }
        }
        catch(e) {}
    }
}

function ddlDesignations_OnChange(ddl)
{
    var m_oReqValidator_Designation = document.getElementById(m_oReqValidator_DesignationID);
    var trDesignationOther = document.getElementById(trDesignationOtherID);
    if (ddl.value === DESIGNATION_OTHER)
    {
        m_oReqValidator_Designation.enabled = true;
        trDesignationOther.style.visibility = '';
    }
    else {
        m_oReqValidator_Designation.enabled = false;
        trDesignationOther.style.visibility = 'hidden';
    }
}

function chkDonationReady_OnClick()
{
    var chkDonationReady = document.getElementById(chkDonationReadyID);
    var btnNext = document.getElementById(btnNextID);
    btnNext.disabled = !chkDonationReady.checked;
}

function donationToggleECards()
{
    if ($get(donationSendAnECardID).checked)
    {
        $get(trECardsDataID).style.display = "";
    }
    else
    {
        $get(trECardsDataID).style.display = "none";
    }
}

function GetInstallments() {
    var myValue = $('#' + txtInstallmentsID).val();
    if (myValue) {
        if (myValue.length > 0) {
            // if integer greater than 0
            if ((parseInt(myValue) == myValue - 0) && (myValue - 0 > 0)) {
                return (myValue - 0)
            }             
        }
    }
    //Installments not found
    return(-1);
}
    
function UpdateSummary() {
    var spanTruePledgePaymentAmountID = '#spanTruePledgePaymentAmount';
    var labelID = '#' + lblTruePledgeInstallmentsID
    var amount = SearchDonationAmountInForm();

    var installments = GetInstallments();
   
    var message = "";
    if (amount > 0 && installments + 0 > 0) {
        CallWithAjax();
        message = currencySymbol + CurrencyFormatted(amount / installments)
        $(labelID).html(message);
        $(spanTruePledgePaymentAmountID).show()
    }
    else {
        $(spanTruePledgePaymentAmountID).hide()
        HideTruePledgeEndingDate();
    }
}

function SearchDonationAmountInForm() {
    // Case 1: amount in designation
    var spanDesTotalWithoutCurrency = $('.lblDesTotalWithoutCurrency');
    if (spanDesTotalWithoutCurrency) {
        if (spanDesTotalWithoutCurrency.length > 0) {
            var amount = spanDesTotalWithoutCurrency.text()
            amount = amount.replace(',', '');
            // if amount greater than 0
            if ((amount == amount - 0) && (amount - 0 > 0)) return (amount - 0);
        }
    }
    
    // Case 2: amount in textbox
    //amount = document.getElementById(txtAmountID);
    var textBoxAmountID = '#' + txtAmountID;
    var amount = $(textBoxAmountID).val();
    // if textbox not empty
    if (amount) {
        if (amount.length > 0) {
            amount = amount.replace(',', '');
            // if amount greater than 0
            if ((amount == amount - 0) && (amount - 0 > 0)) return (amount - 0);
        }
    }
    
    // Case 3: amount in levels radio button list
    //Get selected one if exists
    var tableAmountID = '#' + tblAmountID;
    var rdoLevelChecked = $(tableAmountID + ' input:radio:checked');
    if (rdoLevelChecked.length > 0) {
        var amount = rdoLevelChecked.parents('span').attr('amount');
        if (amount) {
            if (amount.length > 0) return (amount - 0)
        }
    }    
    //Amount not found
    return -1
}

function CurrencyFormatted(amount) {
    var i = parseFloat(amount);
    if (isNaN(i)) { i = 0.00; }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if (s.indexOf('.') < 0) { s += '.00'; }
    if (s.indexOf('.') == (s.length - 2)) { s += '0'; }
    return s;
}

function DisplayTruePledgeEndingDate(endingDate) {
    if (endingDate.length > 0) {
        var spanTruePledgeEndingDateID = '#spanTruePledgeEndingDate';
        var labelID = '#lblTruePledgeEndingDate';
        $(labelID).html(endingDate);
        $(spanTruePledgeEndingDateID).show()
    }
}

function HideTruePledgeEndingDate() {
        var spanTruePledgeEndingDateID = '#spanTruePledgeEndingDate';
        $(spanTruePledgeEndingDateID).hide()
}

function RegisterToEvents() {
    $('#' + ddlDayOfWeek1ID).change(function() {
        CallWithAjax()
    });
    $('#' + DatePickerStartID).blur(function() {
        CallWithAjax()
    });
    $('#' + rdoDayID).click(function() {
        CallWithAjax()
    });
    $('#' + rdoTheID).click(function() {
        CallWithAjax()
    });
    $('#' + ddlDayNumber2ID).change(function() {
        CallWithAjax()
    });
    $('#' + ddlPositionID).change(function() {
        CallWithAjax()
    });
    $('#' + ddlDayOfWeek2ID).change(function() {
        CallWithAjax()
    });
    $('#' + ddlMonthID).change(function() {
        CallWithAjax()
    });
    $('#' + ddlDayNumber1ID).change(function() {
        CallWithAjax()
    });
}

function CallWithAjax() {
    var installments = $('#' + txtInstallmentsID).val();
    if ( installments + 0 > 1 )
    {
        DayOfWeek = "";
        Day = "";
        Position = "";
        Month = "";
        Installments = installments;
        
        Frequency = $('#' + ddlFrequencyID).val();
        switch (Frequency)
        {
            case "1":
                DayOfWeek = $('#' + ddlDayOfWeek1ID).val();
                break;

            case "2": case "3":
                if ($('#' + rdoDayID + ':checked').length > 0) {
                    Day = $('#' + ddlDayNumber2ID).val();
                }
                if ($('#' + rdoTheID + ':checked').length > 0) {
                    Position = $('#' + ddlPositionID).val();
                    DayOfWeek = $('#' + ddlDayOfWeek2ID).val();              
                }
                break;

            case "4":
                Month = $('#' + ddlMonthID).val();
                Day = $('#' + ddlDayNumber1ID).val();
                break;
        }

        StartDate = $('#' + DatePickerStartID).val();

        if (StartDate.length > 0 && Frequency.length > 0) {
            CallWebServiceMethod(webMethodsURL, "GetTruePledgeEndingDate", success, fail,
                    "Frequency", Frequency, "StartDate", StartDate, "DayOfWeek", DayOfWeek,
                    "Day", Day, "Position", Position, "Month", Month, "Installments", Installments);
        }
    }
}

function success(response) {
    //alert(response.d);
    if (response.d.length > 0) DisplayTruePledgeEndingDate(response.d);
    else HideTruePledgeEndingDate()
}

function fail(response) {
    HideTruePledgeEndingDate()
}

function chkRemoveSpouse_OnClick(chk) {
    if (chk) {
        setChildrenDisabledById(tbSpouseInfo, chk.checked);
    }
}