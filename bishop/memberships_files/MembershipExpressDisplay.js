/// <reference path="jquery-1.7.2-vsdoc.js" />
//alert( 'jQuery version: ' + $.fn.jquery);
//http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2-vsdoc.js
/*globals BLACKBAUD, Sys */

BLACKBAUD.netcommunity.MembershipExpressDisplay = function () {
	var Levels,
		MemberControlCssClass,
		TermIndexLevel,
		TermIDLevel,
		TypeIndexLevel,
		TypeIDLevel,
		Loaded;
};

BLACKBAUD.netcommunity.MembershipExpressDisplay.Init = function () {
	var leveli,
		termi,
		typei,
		levelsize,
		termsize,
		termEl,
		typesize,
		typeEl,
		currLevel,
		termCount,
		typeCount,
		selectedTermEl,
		selectedTypeEl,
		levelControls,
		memberControls;

	BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIndexLevel = new Array();
	BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIDLevel = new Array();
	BLACKBAUD.netcommunity.MembershipExpressDisplay.TypeIndexLevel = new Array();
	BLACKBAUD.netcommunity.MembershipExpressDisplay.TypeIDLevel = new Array();
	BLACKBAUD.netcommunity.MembershipExpressDisplay.Levels = JSON.parse(BLACKBAUD.netcommunity.MembershipExpressDisplay.MembershipLevels);
	BLACKBAUD.netcommunity.MembershipExpressDisplay.MemberControlCssClass = JSON.parse(BLACKBAUD.netcommunity.MembershipExpressDisplay.MemberHideShowClass);
	levelControls = BLACKBAUD.netcommunity.MembershipExpressDisplay.Levels;
	memberControls = BLACKBAUD.netcommunity.MembershipExpressDisplay.MemberControlCssClass;

	BLACKBAUD.netcommunity.MembershipExpressDisplay.Loaded = false;
	termCount = 0;
	typeCount = 0;
	levelsize = levelControls.levels.length;
	//Looping through program levels
	//Placing terms/types into respective lookup arrays
	//Placing event handlers on term/type selections
	//Determining if a level has been selected (for renewal)
	for (leveli = 0; leveli < levelsize; leveli++) {
		currLevel = levelControls.levels[leveli];
		termsize = currLevel.terms.length;
		typesize = currLevel.types.length;
		for (termi = 0; termi < termsize; termi++) {
			termEl = currLevel.terms[termi].elClientID;
			BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIndexLevel[termCount] = [termEl, leveli, currLevel.terms[termi].amount, currLevel.terms[termi].amountUnformatted];
			BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIDLevel[termEl] = [termCount, leveli];
			$('#' + termEl).change(function () {
				BLACKBAUD.netcommunity.MembershipExpressDisplay.TermSelected(this);
			});
			if (selectedTermEl === undefined) {
				if (termsize === 1 && levelsize === 1) { //If there is only one term, select it
					$('#' + termEl).attr('checked', true);
				}

				if ($('#' + termEl).is(':checked')) {
					selectedTermEl = termEl;
				}
			}
			termCount++;
		}
		for (typei = 0; typei < typesize; typei++) {
			typeEl = currLevel.types[typei].elClientID;
			BLACKBAUD.netcommunity.MembershipExpressDisplay.TypeIndexLevel[typeCount] = [typeEl, leveli];
			BLACKBAUD.netcommunity.MembershipExpressDisplay.TypeIDLevel[typeEl] = [typeCount, leveli];
			typeCount++;
			$('#' + typeEl).change(function () {
				BLACKBAUD.netcommunity.MembershipExpressDisplay.TypeSelected(this);
			});
			if (selectedTypeEl === undefined) {
				if ($('#' + typeEl).is(':checked')) {
					selectedTypeEl = typeEl;
				}
			}
		}
	}
	//Setting selected css classes on selected term/type
	if (selectedTermEl !== undefined) {
		if (selectedTypeEl !== undefined) {
			BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTypeClass(selectedTypeEl);
		}
		BLACKBAUD.netcommunity.MembershipExpressDisplay.TermSelected('#' + selectedTermEl);
	}
	//Or making sure the minimum number of member controls is visible
	else if (memberControls.Classes.length > 0) {
		$('.MembershipExpress_MemberControl').hide();
		$('.' + memberControls.Classes[0].CssClass).show();
	}
	BLACKBAUD.netcommunity.MembershipExpressDisplay.Loaded = true;

	var automaticallyRenewCheckBox = BLACKBAUD.netcommunity.MembershipExpressDisplay.AutomaticallyRenewCheckBox;
	var dropdownRenewalNotice = BLACKBAUD.netcommunity.MembershipExpressDisplay.DropDownRenewalNotice;
	var renewalRecipentPrimaryMember = BLACKBAUD.netcommunity.MembershipExpressDisplay.RenewalRecipentPrimaryMember;
	var renewalRecipentGifter = BLACKBAUD.netcommunity.MembershipExpressDisplay.RenewalRecipentGifter;
	var renewalRecipentBoth = BLACKBAUD.netcommunity.MembershipExpressDisplay.RenewalRecipentBoth;

	//Gift
	var giftCheckbox = BLACKBAUD.netcommunity.MembershipExpressDisplay.GiftOptionCheckBox;
	if ($('#' + giftCheckbox).is(':checked')) {
		$('.MembershipExpress_MemberControlBreak').hide();
		$('.MembershipExpress_PrimaryMemberControl').hide();
		if	($('#' + automaticallyRenewCheckBox).is(':checked')){
		    $('#' + dropdownRenewalNotice).val(renewalRecipentGifter)
		}
		else {
		    $('#' + dropdownRenewalNotice).val(renewalRecipentPrimaryMember)
		}
	}
	else {
		$('#' + BLACKBAUD.netcommunity.MembershipExpressDisplay.GiftContainer).hide();
		$('.MembershipExpress_MemberControlBreakGift').hide();
		$('.MembershipExpress_PrimaryMemberControl').show();
	}

	$('#' + giftCheckbox).change(function () {
		var giftContainer = BLACKBAUD.netcommunity.MembershipExpressDisplay.GiftContainer;
		if ($(this).is(':checked')) {
			$('#' + BLACKBAUD.netcommunity.MembershipExpressDisplay.GiftContainer).slideDown(400);
			$('.MembershipExpress_PrimaryMemberControl').slideUp(400);
			$('.MembershipExpress_MemberControlBreak').hide();
			$('.MembershipExpress_MemberControlBreakGift').show();
			if ($('#' + automaticallyRenewCheckBox).is(':checked')) {
			    $('#' + dropdownRenewalNotice).val(renewalRecipentGifter)
			}
			else {
			    $('#' + dropdownRenewalNotice).val(renewalRecipentPrimaryMember)
			}
		}
		else {
			$('#' + BLACKBAUD.netcommunity.MembershipExpressDisplay.GiftContainer).slideUp(400);
			$('.MembershipExpress_PrimaryMemberControl').slideDown(400);
			$('.MembershipExpress_MemberControlBreak').show();
			$('.MembershipExpress_MemberControlBreakGift').hide();
		}
	});

	if ($('#' + automaticallyRenewCheckBox).is(':checked')) {
	    if ($('#' + giftCheckbox).is(':checked')) {
	        $('#' + dropdownRenewalNotice).val(renewalRecipentGifter)
	    }
	}
	else {
	    if ($('#' + giftCheckbox).is(':checked')) {
	        $('#' + dropdownRenewalNotice).val(renewalRecipentPrimaryMember)
	    }
	}

	$('#' + automaticallyRenewCheckBox).change(function () {
	    if ($(this).is(':checked')) {
	        if ($('#' + giftCheckbox).is(':checked')) {
	            $('#' + dropdownRenewalNotice).val(renewalRecipentGifter)
	        }
	    }
	    else {
	        if ($('#' + giftCheckbox).is(':checked')) {
	            $('#' + dropdownRenewalNotice).val(renewalRecipentPrimaryMember)
	        }
	    }
	});

	//Setting width of level description based on width of parent
	//var maxParentWidth = 0;
	//$(".MembershipExpress_LevelSelectorContainer").each(function (index) {
	//	var parentWidth = $(this).width();
	//	if (parentWidth > maxParentWidth) {
	//		maxParentWidth = parentWidth;
	//	}
	//});
	//$(".MembershipExpress_LevelDescriptionText").width(maxParentWidth - 15);
	//$(".MembershipExpress_LevelSelectorContainer").width(maxParentWidth + 5);

    $('Select[id$="ddNumberOfChildren"]').change(function(elem) {
        $('input[id$="numberOfChildrenSelected"]')[0].value = elem.currentTarget.selectedIndex;
    });

    $('textarea[id$="txtGiftMessage"]').live("keypress", function(e) {
        var textArea = $(this),
            keysToIgnore = [8,9,33,34,35,36,37,38,39,40,45,46],
            maxLength = 250;

        return (textArea.val().length < maxLength || e.ctrlKey || $.inArray(e.keyCode, keysToIgnore) !== -1);
    });    

    // Disable Automatically renew checkbox if selected term is of $0
    if (selectedTermEl !== undefined) {
        if (Number(BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIndexLevel[selectedTermEl][3]) > 0) {
            $('#' + automaticallyRenewCheckBox).removeAttr("disabled");
            $('#' + automaticallyRenewCheckBox).closest('.MembershipExpress_AutomaticallyRenew').css({ opacity: 1 });
        }
        else {
            $('#' + automaticallyRenewCheckBox).attr("disabled", true);
            $('#' + automaticallyRenewCheckBox).prop('checked', false);
            $('#' + automaticallyRenewCheckBox).closest('.MembershipExpress_AutomaticallyRenew').css({ opacity: 0.5 });
        }
    }
};

//Selects the first term in a level if a term from that level hasn't already been selected
BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTermLevel = function (level) {
	var currentTermLevel, i, terms;

	currentTermLevel = -1;
	terms = BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIndexLevel;
	for (i = 0; i < terms.length; i++) {
		if ($('#' + terms[i][0]).is(':checked')) {
			currentTermLevel = terms[i][1];
			break;
		}
	}

	if (currentTermLevel !== level) {
		var firstTermEl = BLACKBAUD.netcommunity.MembershipExpressDisplay.Levels.levels[level].terms[0].elClientID;
		$('#' + firstTermEl).attr('checked', true);
		BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTermClass(firstTermEl);
		BLACKBAUD.netcommunity.MembershipExpressDisplay.SetAmount(BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIDLevel[firstTermEl][0]);
	}
};

//Selects the first type in a level if a type from that level hasn't already been selected
BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTypeLevel = function (level) {
	var currentType, i, types;

	currentType = [0, -1];
	types = BLACKBAUD.netcommunity.MembershipExpressDisplay.TypeIndexLevel;
	for (i = 0; i < types.length; i++) {
		if ($('#' + types[i][0]).is(':checked')) {
			currentType = types[i];
			break;
		}
	}

	if (currentType[1] !== level) {
		if (currentType[1] !== -1) {
			//There is no type for the selected level
			$('#' + currentType[0]).attr('checked', false);
			$("label[for='" + currentType[0] + "']").removeClass("MembershipExpress_SelectedTypeLabel");
		}
		var firstTypeEl, leveltypes;
		leveltypes = BLACKBAUD.netcommunity.MembershipExpressDisplay.Levels.levels[level].types;
		if (leveltypes.length > 0) {
			firstTypeEl = leveltypes[0].elClientID;
			BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTypeClass(firstTypeEl);
			$('#' + firstTypeEl).attr('checked', true);
		}
	}
};

BLACKBAUD.netcommunity.MembershipExpressDisplay.TermSelected = function (radio) {
    var level, term, automaticallyRenewCheckBox;
	automaticallyRenewCheckBox = BLACKBAUD.netcommunity.MembershipExpressDisplay.AutomaticallyRenewCheckBox;
	if ($(radio).is(':checked')) {
		BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTermClass($(radio).get(0).id);		
		BLACKBAUD.netcommunity.MembershipExpressDisplay.SetAmount(BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIDLevel[$(radio).get(0).id][0]);
		level = BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIDLevel[$(radio).get(0).id][1];
		term = BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIDLevel[$(radio).get(0).id][0];
		BLACKBAUD.netcommunity.MembershipExpressDisplay.SetLevel(level, 400);
		BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTypeLevel(level);

	    // Disable Automatically renew checkbox if selected term is of $0
		if (Number(BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIndexLevel[term][3]) > 0) {
		    $('#' + automaticallyRenewCheckBox).removeAttr("disabled");
		    $('#' + automaticallyRenewCheckBox).closest('.MembershipExpress_AutomaticallyRenew').css({ opacity: 1 });
		}
		else {
		    $('#' + automaticallyRenewCheckBox).attr("disabled", true);
		    $('#' + automaticallyRenewCheckBox).prop('checked', false);
		    $('#' + automaticallyRenewCheckBox).closest('.MembershipExpress_AutomaticallyRenew').css({ opacity: 0.5 });
		}
	}
};

BLACKBAUD.netcommunity.MembershipExpressDisplay.TypeSelected = function (radio) {
	var level;

	if ($(radio).is(':checked')) {
		BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTypeClass($(radio).get(0).id);	
		level = BLACKBAUD.netcommunity.MembershipExpressDisplay.TypeIDLevel[$(radio).get(0).id][1];
		BLACKBAUD.netcommunity.MembershipExpressDisplay.SetLevel(level, 400);
		BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTermLevel(level);
	}
};

BLACKBAUD.netcommunity.MembershipExpressDisplay.StateEnum = { 
    INCLUDED : 0, 
    ADDON : 1, 
    ADDED : 2 
}; 

BLACKBAUD.netcommunity.MembershipExpressDisplay.SetLevel = function (leveli, speed) {
	var levelNumberOfIncludedMembers,
		classesIndex,
		count,
		memberControlsForThisLevel,
		addonMemberControlsForThisLevel,
		addonMemberControl,
		addonID,
		addonCssClassForThisLevel,
		hiddenAddonIdControlID,
		memberControlIndex,
		i,
		MemberControlCssClass,
        numberOfChildrenSelected,
        numberOfChildrenDropDown;

	if (!BLACKBAUD.netcommunity.MembershipExpressDisplay.Loaded) speed = 0;

	var previouslySelectedLevel = $('.MembershipExpress_LevelContainer').data('previouslySelectedLevel');  //will be undefined when re-displaying after a failed form validation
	levelNumberOfIncludedMembers = BLACKBAUD.netcommunity.MembershipExpressDisplay.Levels.levels[leveli].nummembers;
    numberOfChildrenAllowed = BLACKBAUD.netcommunity.MembershipExpressDisplay.Levels.levels[leveli].childrenAllowed;
	MemberControlCssClass = BLACKBAUD.netcommunity.MembershipExpressDisplay.MemberControlCssClass;
	count = MemberControlCssClass.Classes.length;
	for (classesIndex = 0; classesIndex < count; classesIndex++) {
		if (MemberControlCssClass.Classes[classesIndex].NumberOfMembers < levelNumberOfIncludedMembers) {
			memberControlsForThisLevel = $('.' + MemberControlCssClass.Classes[classesIndex].CssClass);
			memberControlsForThisLevel.slideDown(speed);
			for (memberControlIndex = 0; memberControlIndex < memberControlsForThisLevel.length; memberControlIndex++) {
				BLACKBAUD.netcommunity.MembershipExpressDisplay.SetMemberControlState(memberControlsForThisLevel[memberControlIndex], BLACKBAUD.netcommunity.MembershipExpressDisplay.StateEnum.INCLUDED);
			}
		} else {
			if (MemberControlCssClass.Classes[classesIndex].NumberOfMembers == levelNumberOfIncludedMembers) { 
				var lastClassIndex = count - 1;
				if ((classesIndex == lastClassIndex) ? true : (MemberControlCssClass.Classes[classesIndex + 1].NumberOfMembers > levelNumberOfIncludedMembers)) { //they're sorted by number of members:  this tests if this is either the last one or the last one with this number of members, to prevent calling multiple times, which is harmless but there's too much animation.
					memberControlsForThisLevel = $('.' + MemberControlCssClass.Classes[classesIndex].CssClass);
					memberControlsForThisLevel.slideDown(speed);
					for (memberControlIndex = 0; memberControlIndex < memberControlsForThisLevel.length; memberControlIndex++) {
						BLACKBAUD.netcommunity.MembershipExpressDisplay.SetMemberControlState(memberControlsForThisLevel[memberControlIndex], BLACKBAUD.netcommunity.MembershipExpressDisplay.StateEnum.INCLUDED);
					}

					addonCssClassForThisLevel = MemberControlCssClass.Classes[classesIndex].CssClassAddon;
					addonMemberControlsForThisLevel = $('.' + addonCssClassForThisLevel);
					addonMemberControlsForThisLevel.data('addonCssClass', addonCssClassForThisLevel);
					//for the addon IDs, restore the .data values to be the hidden control values--they're lost when the form doesn't pass validation
					for (i = 0; i < addonMemberControlsForThisLevel.length; i++) {
						hiddenAddonIdControlID = $('#' + addonMemberControlsForThisLevel[i].id + ' .MembershipExpress_AddonID input')[0].id;
						if ((typeof $('#' + hiddenAddonIdControlID).val() !== 'undefined') && ($('#' + hiddenAddonIdControlID).val() != '')) {
							$('#' + addonMemberControlsForThisLevel[i].id).data('addonID', $('#' + hiddenAddonIdControlID).val());
						}
					}
					if (leveli == previouslySelectedLevel) {
						//since the level isn't changing, force a re-calculation of the total line here
						var addonsTotal = 0;//total cost of all selected add-ons, to update the total label next to the add-to-cart button
						var memberAddons = JSON.parse(BLACKBAUD.netcommunity.MembershipExpressDisplay.memberAddons);
						for (i = 0; i < addonMemberControlsForThisLevel.length; i++) {
							addonMemberControl = $('#' + addonMemberControlsForThisLevel[i].id);
							addonID = addonMemberControl.data('addonID');
							if ((typeof addonID !== 'undefined') && (addonID !== '')) {
								var typeLinkAddonType = $.grep(memberAddons, function (e) { return e.ID === addonID; })[0];
								addonsTotal += typeLinkAddonType.Price;
							}
						}
						BLACKBAUD.netcommunity.MembershipExpressDisplay.UpdateTotalWithAddons(addonsTotal);
					} else {
						if (classesIndex < lastClassIndex) { //when the selected level is not the last level, slideUp the last level's addons
							$('.' + MemberControlCssClass.Classes[lastClassIndex].CssClassAddon).slideUp(speed);
						}
					}
				} else {
					//skip it because it's not the last level with this number of included members
				}			
			} else { //NumberOfMembers > levelNumberOfIncludedMembers
				if (leveli !== previouslySelectedLevel) {
					$('.' + MemberControlCssClass.Classes[classesIndex].CssClass).slideUp(speed);
				}
			}
		}
	}

	if (leveli !== previouslySelectedLevel) {
		var showFirstAddon = true;
		for (i = 0; i < addonMemberControlsForThisLevel.length; i++) {			
			hiddenAddonIdControlID = $('#' + addonMemberControlsForThisLevel[i].id + ' .MembershipExpress_AddonID input')[0].id;

			if (typeof previouslySelectedLevel !== 'undefined') { //changing levels
				//clean up all the add-on IDs stored for those member controls which are add-ons at this level
				$('#' + addonMemberControlsForThisLevel[i].id).data('addonID', '');
				$('#' + hiddenAddonIdControlID).val('');		
			} else { //could be an initial page load or after a validation error--because it could be the latter case, add back the ones that were add-ons				
				addonMemberControl = $('#' + addonMemberControlsForThisLevel[i].id);
				addonID = addonMemberControl.data('addonID');
				if ((typeof addonID !== 'undefined') && (addonID !== '')) {
					BLACKBAUD.netcommunity.MembershipExpressDisplay.AddMemberAddon(addonID, undefined, addonMemberControl[0].id, hiddenAddonIdControlID);
					showFirstAddon = false; //because the .SetMemberControlState .ADDED above will manage it
				}
			}
		}

		//show the first add-on member control	
		if (showFirstAddon) {
			BLACKBAUD.netcommunity.MembershipExpressDisplay.SetMemberControlState(addonMemberControlsForThisLevel[0], BLACKBAUD.netcommunity.MembershipExpressDisplay.StateEnum.ADDON);		
		}
                
        // Show or hide Number of children 
        if (numberOfChildrenAllowed > 0) {
            numberOfChildrenDropDown = $('Select[id$="ddNumberOfChildren"]')[0];        
            numberOfChildrenSelected = parseInt($('input[id$="numberOfChildrenSelected"]')[0].value);
                                                                                
            if (numberOfChildrenDropDown.options.length > (numberOfChildrenAllowed + 1)) {
                for (i = numberOfChildrenDropDown.options.length - 1;i > numberOfChildrenAllowed;i--) {
                    numberOfChildrenDropDown.options.remove(i);
                }
            }
            else if (numberOfChildrenDropDown.options.length < (numberOfChildrenAllowed + 1)) {
                for (i=numberOfChildrenDropDown.options.length;i <= numberOfChildrenAllowed;i++) {
                    var option = document.createElement("OPTION");
                    option.text = i;
                    option.value = i; 

                    numberOfChildrenDropDown.options.add(option);
                }
            }  
            
            if (numberOfChildrenSelected > 0 && numberOfChildrenSelected <= numberOfChildrenAllowed) {
                numberOfChildrenDropDown.selectedIndex = numberOfChildrenSelected;
            } 
            else {
                resetSelectedNumberOfChildren();
            }   
            
            $('.MembershipExpress_NumberOfChildrenContainer').slideDown(speed);          
        }
        else {
            resetSelectedNumberOfChildren();
            $('.MembershipExpress_NumberOfChildrenContainer').slideUp(speed);
        }

		$('.MembershipExpress_LevelContainer').data('previouslySelectedLevel', leveli);
	}
};

function resetSelectedNumberOfChildren() {
    if (!$.isEmptyObject($('input[id$="numberOfChildrenSelected"]')[0])) {
        $('input[id$="numberOfChildrenSelected"]')[0].value = 0;
    }
    if (!$.isEmptyObject($('Select[id$="ddNumberOfChildren"]')[0])) {
        $('Select[id$="ddNumberOfChildren"]')[0].selectedIndex = 0;
    }
}

BLACKBAUD.netcommunity.MembershipExpressDisplay.SetMemberControlState = function (memberControl, state) {
	if (typeof memberControl !== 'undefined') {
	    var memberAddons = JSON.parse(BLACKBAUD.netcommunity.MembershipExpressDisplay.memberAddons);
		var addonsTotal = 0;//total cost of all selected add-ons, to update the total label next to the add-to-cart button
		var i;

		switch (state) {
			case BLACKBAUD.netcommunity.MembershipExpressDisplay.StateEnum.INCLUDED:
				$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_IncludedMemberHeaderContainer').slideDown();
				$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_AddonLinks').slideUp();
				$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_AddonHeaderContainer').slideUp();
				var addonID = $('#' + memberControl.id).data('addonID')
				if ((typeof addonID !== 'undefined') && (addonID !== '')) {
				    var typeLinkAddonType = $.grep(memberAddons, function (e) { return e.ID === addonID; })[0];
				    if (typeLinkAddonType.TypeCode === 1 && typeLinkAddonType.Type === 'Additional member') {
				        $('#' + memberControl.id + ' div.MembershipExpress_MemberDetails').slideDown();
				    }
				    else {
				        $('#' + memberControl.id + ' div.MembershipExpress_MemberDetails').hide();
				    }
				}
				
			break;

			case BLACKBAUD.netcommunity.MembershipExpressDisplay.StateEnum.ADDON:	
				//determine if any add-on types are available
				var addonCssClassForThisLevel = $('#' + memberControl.id).data('addonCssClass');
				var addonMemberControlsForThisLevel = $('.' + addonCssClassForThisLevel);
				for (i = 0; i < addonMemberControlsForThisLevel.length; i++) {
					var addonMemberControl = $('#' + addonMemberControlsForThisLevel[i].id);
					var addonID = addonMemberControl.data('addonID');
					if ((typeof addonID !== 'undefined') && (addonID !== '')) {
						//decrement the Limit
						var typeLinkAddonType = $.grep(memberAddons, function (e) { return e.ID === addonID; })[0];
						//re-purposing Limit here for "number remaining"...
						if (typeLinkAddonType.AllowMultiple) {
							typeLinkAddonType.Limit--;
						} else {
							typeLinkAddonType.Limit = 0;
						}
						addonsTotal += typeLinkAddonType.Price;
					} else {
						//only one of the addon member controls for this level should be visible, and the one that's the subject of this function will be it, so hide all others (of which there *should* be no more than one)
						if (addonMemberControl[0].id != memberControl.id) {
							$('#' + addonMemberControl[0].id).slideUp(); 
						}
					}
				}

				//loop through again to light up only those links for types which haven't hit the limit yet
				var typeLinks = $('#' + memberControl.id + ' .MembershipExpress_AddonOptionLink');
				for (i = 0; i < typeLinks.length; i++) {
					var typeLinkAddonTypeID = $('#' + typeLinks[i].id).attr('data_addonTypeID');
					typeLinkAddonType = $.grep(memberAddons, function (e) { return e.ID === typeLinkAddonTypeID; })[0];
					if ((!typeLinkAddonType.Include) || (typeLinkAddonType.Limit == 0)) {
						$('#' + typeLinks[i].id).hide();
					} else {
						$('#' + typeLinks[i].id).show();
					}
				}

				$('#' + memberControl.id).slideDown(); 
				
				$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_IncludedMemberHeaderContainer').slideUp();

				//for the add-on links, in addition to the slideDown, set the width and (if necessary) the height
				//$('#' + memberControl.id + ' .MembershipExpress_MemberHeaderContainer').width($('.MembershipExpress_PrimaryMemberControl').width());
				var primaryMemberControlHeight = $('.MembershipExpress_PrimaryMemberControl').height() || 0;
				$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_AddonLinks').height('auto'); //reset this because the height can change due to the roster of add-ons available this time being different (see "light up only those links..." above)
				var addonLinksHeight = $('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_AddonLinks').height() || 0;
				if (primaryMemberControlHeight > addonLinksHeight) {
					$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_AddonLinks').height(primaryMemberControlHeight/2).slideDown(); //set the height to be the same as when the name fields are displayed, rather than shorter
				} else {
					$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_AddonLinks').slideDown(); //let the height be as tall as it needs to in order to fit all the addon types
				}

				$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_AddonHeaderContainer').slideUp();

				$('#' + memberControl.id + ' div.MembershipExpress_MemberDetails').slideUp();
			break;

			case BLACKBAUD.netcommunity.MembershipExpressDisplay.StateEnum.ADDED:
				if ($('#' + memberControl.id).is(":hidden")) {
					$('#' + memberControl.id).slideDown(); 
				}

				$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_IncludedMemberHeaderContainer').slideUp();
				$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_AddonLinks').slideUp();
				$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer div.MembershipExpress_AddonHeaderContainer').slideDown();

				$('#' + memberControl.id + ' div.MembershipExpress_MemberError').width($('.MembershipExpress_PrimaryMemberControl').width() || 0);
				var addonID = $('#' + memberControl.id).data('addonID')
				if ((typeof addonID !== 'undefined') && (addonID !== '')) {
				    var typeLinkAddonType = $.grep(memberAddons, function (e) { return e.ID === addonID; })[0];
				    if (typeLinkAddonType.TypeCode === 1 && typeLinkAddonType.Type === 'Additional member') {
				        $('#' + memberControl.id + ' div.MembershipExpress_MemberDetails').slideDown();
				    }
				    else {
				        $('#' + memberControl.id + ' div.MembershipExpress_MemberDetails').hide();
				    }
				}
				
				var firstAvailableAddonMemberControl; 

				//determine the first available (empty) add-on member control for this level, and show it; also totals cost of selected add-ons
				addonCssClassForThisLevel = $('#' + memberControl.id).data('addonCssClass');
				addonMemberControlsForThisLevel = $('.' + addonCssClassForThisLevel);
				for (i = 0; i < addonMemberControlsForThisLevel.length; i++) {
					addonMemberControl = $('#' + addonMemberControlsForThisLevel[i].id);
					var addonID = addonMemberControl.data('addonID');
					if ((typeof addonID !== 'undefined') && (addonID !== '')) {
						var typeLinkAddonType = $.grep(memberAddons, function (e) { return e.ID === addonID; })[0]
						addonsTotal += typeLinkAddonType.Price;
					} else {
						if (typeof firstAvailableAddonMemberControl === 'undefined') {
							firstAvailableAddonMemberControl = addonMemberControl[0];
						}
					}
				}
				
				if (typeof firstAvailableAddonMemberControl !== 'undefined') {
					BLACKBAUD.netcommunity.MembershipExpressDisplay.SetMemberControlState(firstAvailableAddonMemberControl, BLACKBAUD.netcommunity.MembershipExpressDisplay.StateEnum.ADDON);
				}
			break;

			//default:		
		}//switch

		//update the total (price) displayed next to "Add to cart" button...
		BLACKBAUD.netcommunity.MembershipExpressDisplay.UpdateTotalWithAddons(addonsTotal);
	}//if memberControl
}

BLACKBAUD.netcommunity.MembershipExpressDisplay.AddMemberAddon = function (memberAddonID, memberID, memberControlID, hiddenAddonIdControlID) {
	//the add-on type selected, to set the hidden field to its ID and the label to its name and formatted price
    var selectedAddon = $.grep(JSON.parse(BLACKBAUD.netcommunity.MembershipExpressDisplay.memberAddons), function (e) { return e.ID == memberAddonID; })[0];
	
	//set the hidden field to the selected add-on type's ID, using whichever ID to get to it as was provided...
	if (typeof memberID !== 'undefined') {
		$('#' + BLACKBAUD.netcommunity.MembershipExpressDisplay.listViewMembersClientID + '_hiddenMemberAddonID_' + memberID).val(selectedAddon.ID);
	} else {
		if (typeof hiddenAddonIdControlID !== 'undefined') {
			$('#' + hiddenAddonIdControlID).val(selectedAddon.ID);
		}
	}

	//set the label to the selected add-on type's name and formatted price
	var memberControl = $('#' + memberControlID)[0];
	$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer .MembershipExpress_MemberAddonHeader').html(selectedAddon.Name + '&nbsp;(' + selectedAddon.PriceFormatted + ')');
	$('#' + memberControl.id).data('addonID', selectedAddon.ID);

	BLACKBAUD.netcommunity.MembershipExpressDisplay.SetMemberControlState(memberControl, BLACKBAUD.netcommunity.MembershipExpressDisplay.StateEnum.ADDED)
};

BLACKBAUD.netcommunity.MembershipExpressDisplay.RemoveMemberAddon = function (memberID, memberControlID) {
	var memberControl = $('#' + memberControlID)[0];

	//clear the hidden field of an add-on type's ID
	$('#' + BLACKBAUD.netcommunity.MembershipExpressDisplay.listViewMembersClientID + '_hiddenMemberAddonID_' + memberID).val('');
	$('#' + memberControl.id).data('addonID', '');

	//clear the label of an add-on type's name and formatted price
	$('#' + memberControl.id + ' div.MembershipExpress_MemberHeaderContainer .MembershipExpress_MemberAddonHeader').html('');

	//hide the validation panel
	$('#' + memberControl.id + ' .MembershipExpress_MemberError').slideUp();

	BLACKBAUD.netcommunity.MembershipExpressDisplay.SetMemberControlState(memberControl, BLACKBAUD.netcommunity.MembershipExpressDisplay.StateEnum.ADDON)
};

BLACKBAUD.netcommunity.MembershipExpressDisplay.SetAmount = function (term) {
	$('#' + BLACKBAUD.netcommunity.MembershipExpressDisplay.TotalAmount).html(BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIndexLevel[term][2]);
	$('#' + BLACKBAUD.netcommunity.MembershipExpressDisplay.TotalAmount).data('amountUnformatted', Number(BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIndexLevel[term][3]));  //3 = the unformatted cost of the level-term
};

BLACKBAUD.netcommunity.MembershipExpressDisplay.UpdateTotalWithAddons = function (addonsTotal) {
	var formattedTotal = 0,
		total = $('#' + BLACKBAUD.netcommunity.MembershipExpressDisplay.TotalAmount).data('amountUnformatted'); //start with the level-term cost
	total += addonsTotal;
	if (total == 0) {
		formattedTotal = BLACKBAUD.netcommunity.MembershipExpressDisplay.NoCostLanguage;
	}
	else {
		formattedTotal = BLACKBAUD.netcommunity.MembershipExpressDisplay.CurrencySymbol + total.toFixed(2);
	}
	$('#' + BLACKBAUD.netcommunity.MembershipExpressDisplay.TotalAmount).html(formattedTotal);
}

BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTermClass = function (radioID) {
	var i,
		count,
		terms;

	terms = BLACKBAUD.netcommunity.MembershipExpressDisplay.TermIndexLevel;
	count = terms.length;
	for (i = 0; i < count; i++) {
		if (radioID === terms[i][0]) {
			$("label[for='" + radioID + "']").addClass("MembershipExpress_SelectedTermLabel");
		}
		else {
			$("label[for='" + terms[i][0] + "']").removeClass("MembershipExpress_SelectedTermLabel");
		}
	}
};

BLACKBAUD.netcommunity.MembershipExpressDisplay.SetTypeClass = function (radioID) {
	var i,
		count,
		types;

	types = BLACKBAUD.netcommunity.MembershipExpressDisplay.TypeIndexLevel;
	count = types.length;
	for (i = 0; i < count; i++) {
		if (radioID === types[i][0]) {
			$("label[for='" + radioID + "']").addClass("MembershipExpress_SelectedTypeLabel");
		}
		else {
			$("label[for='" + types[i][0] + "']").removeClass("MembershipExpress_SelectedTypeLabel");
		}
	}
};
