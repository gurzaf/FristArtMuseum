/*jslint bitwise: false, browser: false, eqeqeq: false, onevar: false, passfail: false, undef: false, white: false, laxbreak: true */
/*global getElement*/

function recurButton_OnClick(r, ddlDayNumber2ID, ddlPositionID, ddlDayOfWeek2ID) {

    var ctlDay = getElement(ddlDayNumber2ID);
    var ctlPosition = getElement(ddlPositionID);
    var ctlDayOfWeek = getElement(ddlDayOfWeek2ID);
    switch (r.value)
    {
        case EMonthlyQuarterlyMethod_ByDay:
            ctlDay.disabled = false;
            ctlPosition.disabled = true;
            ctlDayOfWeek.disabled = true;
            break;
        case EMonthlyQuarterlyMethod_ByPosition:
            ctlDay.disabled = true;
            ctlPosition.disabled = false;
            ctlDayOfWeek.disabled = false;
            break;
    }
}