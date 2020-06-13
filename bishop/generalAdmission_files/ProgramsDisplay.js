/// <reference path="../jquery-1.3.2-vsdoc2.js" />
/// <reference path="../jquery-ui-1.7.2.custom.js" />
//^^^for intellisense^^^

//function closeEventsFilterPanel(e) {
//    //e.preventDefault();
//    $(".ProgrammingEventsList_FilterPanel").slideUp();
//    return false;
//}



function openEventsFilterPanel(e) {
    //e.preventDefault();
    $(".Programming_EventsList_FilterPanel").slideDown();

    $('.Programming_EventsList_OtherDatesLink').off('click', openEventsFilterPanel);
    $('.Programming_EventsList_OtherDatesLink').hide();

    $('#' + labelEventsListDateClientID).css('cursor', 'auto');
    $('#' + labelEventsListDateClientID).off('click', openEventsFilterPanel);
}

function openAlternateDates(e) {
    $('#divAlternateDates').fadeIn(100);
    $('#' + labelAlternateDatesClientID).off('click', openAlternateDates);
    $('#' + labelAlternateDatesClientID).click(closeAlternateDates);
}

function closeAlternateDates(e) {
    $('#divAlternateDates').fadeOut(100);
    $('#' + labelAlternateDatesClientID).off('click', closeAlternateDates);
    $('#' + labelAlternateDatesClientID).click(openAlternateDates);
}

function openAlternateTimes(e) {
    $('#divAlternateTimes').fadeIn(100);
    $('#' + labelAlternateTimesClientID).off('click', openAlternateTimes);
    $('#' + labelAlternateTimesClientID).click(closeAlternateTimes);
}

function closeAlternateTimes(e) {
    $('#divAlternateTimes').fadeOut(100);
    $('#' + labelAlternateTimesClientID).off('click', closeAlternateTimes);
    $('#' + labelAlternateTimesClientID).click(openAlternateTimes);
}

function openAlternateComboDates(e) {
    $('#divAlternateComboDates').fadeIn(100);
    $('#' + labelAlternateComboDatesClientID).off('click', openAlternateComboDates);
    $('#' + labelAlternateComboDatesClientID).click(closeAlternateComboDates);
}

function closeAlternateComboDates(e) {
    $('#divAlternateComboDates').fadeOut(100);
    $('#' + labelAlternateComboDatesClientID).off('click', closeAlternateComboDates);
    $('#' + labelAlternateComboDatesClientID).click(openAlternateComboDates);
}

function openAlternateProgramGroupTimes(e) {
    var programGroupID = e.target.id.substr(e.target.id.length - 36),
        divIDEnding = 'divAlternateProgramGroupTimes_' + programGroupID,
        labelIDEnding = 'labelAlternateProgramGroupTimes_' + programGroupID;

    $("div[id$='" + divIDEnding + "']").fadeIn();
    $("span[id$='" + labelIDEnding + "']").off('click', openAlternateProgramGroupTimes);
    $("span[id$='" + labelIDEnding + "']").click(closeAlternateProgramGroupTimes);
}

function closeAlternateProgramGroupTimes(e) {
    var programGroupID = e.target.id.substr(e.target.id.length - 36),
        divIDEnding = 'divAlternateProgramGroupTimes_' + programGroupID,
        labelIDEnding = 'labelAlternateProgramGroupTimes_' + programGroupID;

    // end with
    $("div[id$='" + divIDEnding + "']").fadeOut();
    $("span[id$='" + labelIDEnding + "']").off('click', closeAlternateProgramGroupTimes);
    $("span[id$='" + labelIDEnding + "']").click(openAlternateProgramGroupTimes);
}


function GetWebEventUri(eventUrl, eventDate) {
	if (!(!eventUrl)) {
		eventUrlBasedOndate.push({ date: eventDate, url: eventUrl });
	}
}

var eventUrlBasedOndate = [];
var jsonData = null;
var isFirstDate = true;
function GetEventData(date, renderedMonth) {
	var programId = $('#hfProgramID').val();
	var eventId = $('#hfActiveViewObjectID').val();
	var currentPageID = $('#hfCurrentPageID').val();
	var includeSoldOut = $('#hfIncludeSoldOut').val();
	var eventData = null;
	$.ajax({
		type: "POST",
		url: BLACKBAUD.netcommunity.WebMethodsURL + "/GetEventProgramData",
		async: false,
		data: JSON.stringify({ 'calendarday': date, 'progId': programId, 'activeViewObjId': eventId, 'currentPageID': currentPageID, 'renderedMonth': renderedMonth, 'includeSoldOut': includeSoldOut }),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (val) {
			eventData = val;

		},
		error: function (val) {
			console.log(val);
		}
	});
	return eventData;
}

$(function () {
	$('#anchorOtherDates')
   .datepicker({
   	format: 'mm/dd/yyyy',
   	autoclose: true,
   	beforeShowDay: function (date) {
   		var eachDay = (new Date(date)).format("ddMMyyyy");
   		var IsEnabled = false;
   		var CssClass;
   		var ToolTip;
   		var renderedMonth;
   		if (isFirstDate) {
   		    renderedMonth = (date.getDate() > 1) ? date.getMonth() + 2 : date.getMonth() + 1;
   			if (renderedMonth > 12) {
   				renderedMonth = renderedMonth - 12;
   			}
   			jsonData = GetEventData(date, renderedMonth);
   			isFirstDate = false;
   		}
   		for (var i = 0; i < jsonData.d.length; i++) {
   			var eventDateWithOnlineUserOffset = new Date(parseInt(jsonData.d[i].EventDate.replace("/Date(", "").replace(")/")));
   			//Removing the timezone offset of online user that was included by JavaScript automatically, so that the actual event date can be used to apply css on calendar.
   			//Service send actual event date by converting it into UTC date but actually this date is not UTC date, we use UTC to transfer event date because it will always remain same in all time zone. 
   			var eventDate = (new Date(eventDateWithOnlineUserOffset.getUTCFullYear(), eventDateWithOnlineUserOffset.getUTCMonth(), eventDateWithOnlineUserOffset.getUTCDate())).format("ddMMyyyy");
   			if (eventDate === eachDay) {
   				IsEnabled = jsonData.d[i].IsEnabled;
   				CssClass = jsonData.d[i].CssClass;
   				ToolTip = jsonData.d[i].ToolTip;
   				GetWebEventUri(jsonData.d[i].Eventurl, eventDate)
   				break;
   			}
   		}
   		return {
   			enabled: IsEnabled,
   			classes: CssClass,
   			tooltip: ToolTip
   		};
   	}

   })
   .on('changeMonth', function (e) {
   	isFirstDate = true;
   })
   .on('changeYear', function (e) {
   	isFirstDate = true;
   })
   .on('changeDate', function (e) {
   	var dateText = new Date(e.date).format("ddMMyyyy");
   	for (i = 0; i < eventUrlBasedOndate.length; i++) {
   		if (eventUrlBasedOndate[i].date == dateText) {
   			window.open(eventUrlBasedOndate[i].url, "_self");
   		}
   	}
   });

	var isComboFirstDate = true;
	var jsonComboData = null;
	function GetCombinationData(date, renderedMonth) {
		var combinationId = $('#hfActiveViewObjectID').val();
		var selectedDate = $('#hfCombinationSelectedDate').val();
		var hfOnSaleHorizonDate = $('#hfOnSaleHorizonDate').val();
		var eventData = null;
		$.ajax({
			type: "POST",
			url: BLACKBAUD.netcommunity.WebMethodsURL + "/GetComboProgramData",
			async: false,
			data: JSON.stringify({ 'calendarday': date, 'selectedDate': new Date(selectedDate), 'activeViewObjId': combinationId, 'renderedMonth': renderedMonth }),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (val) {
				eventData = val;
				
			},
			error: function (val) {
				console.log(val);
			}
		});
		return eventData;
	}
	// Combination date picker
	$('#anchorOtherComboDates')
	   .datepicker({
	   	format: 'mm/dd/yyyy',
	   	autoclose: true,
	   	beforeShowDay: function (date) {
	   		var eachDay = (new Date(date)).format("ddMMyyyy");
	   		var IsEnabled = false;
	   		var CssClass;
	   		var ToolTip;
	   		var renderedMonth;
	   		if (isComboFirstDate) {
	   		    renderedMonth = (date.getDate() > 1) ? date.getMonth() + 2 : date.getMonth() + 1;
	   			if (renderedMonth > 12) {
	   				renderedMonth = renderedMonth - 12;
	   			}
	   			jsonComboData = GetCombinationData(date, renderedMonth);
	   			isComboFirstDate = false;
	   		}
	   		for (var i = 0; i < jsonComboData.d.length; i++) {
	   			var eventDateWithOnlineUserOffset = new Date(parseInt(jsonComboData.d[i].EventDate.replace("/Date(", "").replace(")/")));
	   			//Removing the timezone offset of online user that was included by JavaScript automatically, so that the actual event date can be used to apply css on calendar.
	   			//Service send actual event date by converting it into UTC date but actually this date is not UTC date, we use UTC to transfer event date because it will always remain same in all time zone.
	   			var eventDate = (new Date(eventDateWithOnlineUserOffset.getUTCFullYear(), eventDateWithOnlineUserOffset.getUTCMonth(), eventDateWithOnlineUserOffset.getUTCDate())).format("ddMMyyyy");
	   			if (eventDate === eachDay) {
	   				IsEnabled = jsonComboData.d[i].IsEnabled;
	   				CssClass = jsonComboData.d[i].CssClass;
	   				ToolTip = jsonComboData.d[i].ToolTip;
	   				GetWebEventUri(jsonComboData.d[i].Eventurl, eventDate)
	   				break;
	   			}
	   		}
	   		return {
	   			enabled: IsEnabled,
	   			classes: CssClass,
	   			tooltip: ToolTip
	   		};

	   	}

	   })
		.on('changeMonth', function (e) {
			isComboFirstDate = true;
		})
		.on('changeYear', function (e) {
			isComboFirstDate = true;
		})
		.on('changeDate', function (e) {
			var dateText = new Date(e.date).format("dddd, MMM d");
			__doPostBack('mycustom', new Date(e.date).format("MM/dd/yyyy"));
		});



	var maxWidthProgramsListFilters = 0;
	$(".Programming_Programs_ListFilters li").each(function () {
		if ($(this).width() > maxWidthProgramsListFilters) {
			maxWidthProgramsListFilters = $(this).width() || 0;
		}
	});
	$(".Programming_Programs_ListFiltersMonths li").each(function () {
		if ($(this).width() > maxWidthProgramsListFilters) {
			maxWidthProgramsListFilters = $(this).width() || 0;
		}
	});
	$(".Programming_Programs_ListFilters li").width(maxWidthProgramsListFilters);
	$(".Programming_Programs_ListFiltersMonths li").width(maxWidthProgramsListFilters);

	//try to style out the row chooser td when all the TDs are empty--TDs were emptied for not-in-current-month days server-side; with that leftmost td also empty, the row disappears (at least on IE8)
	//        $(".ProgrammingProgramsListFiltersMonth tr"). .each(function() {
	//        if ($(this).width() > maxWidthProgramsListFilters)
	//            maxWidthProgramsListFilters = $(this).width();
	//        });
	//           var element = document.getElementById("put back the angle brackets to make this work again %=Calendar1.ClientID %");
	//             	
	//            for(var i = 1; i < element.rows.length; i++) //start at 1 -- 0 is the header row
	//            {
	//               var elementHTML = element.rows[i].cells[0].innerHTML;
	//               element.rows[i].cells[0].innerHTML = '';
	//            }


	//viewEvent
	if ($('#' + labelAlternateDatesClientID).attr('ScrollingMonth') === 'true') {
		$('#divAlternateDates').show(); //to keep it displayed while scrolling from month to month
	} else {
		$('#divAlternateDates').hide();
		$('#' + labelAlternateDatesClientID).css('cursor', 'pointer');
		$('#' + labelAlternateDatesClientID).click(openAlternateDates);
	}

	$('#divAlternateTimes').hide();
	$('#' + labelAlternateTimesClientID).css('cursor', 'pointer');
	$('#' + labelAlternateTimesClientID).click(openAlternateTimes);

	//viewCombination
	$("div[id*='divAlternateProgramGroupTimes']").hide();
	$("span[id*='labelAlternateProgramGroupTimes']").css('cursor', 'pointer');
	$("span[id*='labelAlternateProgramGroupTimes']").click(openAlternateProgramGroupTimes);

	if (!(!labelAlternateComboDatesClientID)) {
		if ($('#' + labelAlternateComboDatesClientID).attr('ScrollingMonth') === 'true') {
			$('#divAlternateComboDates').show(); //to keep it displayed while scrolling from month to month
		} else {
			$('#divAlternateComboDates').hide();
			$('#' + labelAlternateComboDatesClientID).css('cursor', 'pointer');
			$('#' + labelAlternateComboDatesClientID).click(openAlternateComboDates);
		}
	}

	//viewEvents
	//$(".ProgrammingEventsList_OtherDatesLink").bind("click", function() { $(".ProgrammingEventsList_FilterPanel").toggle(); }).attr("href", "#");
	$('.Programming_EventsList_OtherDatesLink').click(openEventsFilterPanel); //expected
	$('#' + labelEventsListDateClientID).click(openEventsFilterPanel); //alternate
	//$("#anchorCloseEventsFilterPanel").click(closeEventsFilterPanel); //click X to close        
});

$(document).click(function (e) {
    var target = e.target;

    if (!$(target).is('#divAlternateDates') && !$(target).is('#' + labelAlternateDatesClientID) && !$(target).is("a[href*='calendarEventAlternateDates']")) {
        closeAlternateDates();
    }

    if (!$(target).is('#divAlternateTimes') && !$(target).is('#' + labelAlternateTimesClientID)) {
        closeAlternateTimes();
    }

    if (!$(target).is('#divAlternateComboDates') && !$(target).is('#' + labelAlternateComboDatesClientID) && !$(target).is("a[href*='calendarComboAlternateDates']")) {
        closeAlternateComboDates();
    }

    if ((target.id.indexOf('linkProgramGroupAlternateTime') === -1) && (target.id.indexOf('labelAlternateProgramGroupTimes') === -1)) {
        $("div[id*='divAlternateProgramGroupTimes']:visible").each(function () {
            closeAlternateProgramGroupTimes({ target: this });
        });
    }
});
