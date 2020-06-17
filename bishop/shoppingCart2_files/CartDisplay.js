BLACKBAUD.netcommunity.CartDisplay = new function () {
	var that = this,
	$paymentType,
	$spanRegistrationConfirmPasswordRequiredID,
	$spanRegistrationPasswordRequiredID,
	$txtRegistrationConfirmPasswordID,
	$txtRegistrationPasswordID;

	this.paymentTypeID;
	this.useAsBillingID;
	this.billMeLaterValue;
	this.salesOrderID;
	this.Amount;
	this.bbPayTransactionID;
	this.AdditionalFee;
	this.isPaymentDone;
	that.sCallbackURI;
	that.mainForm = $(document.getElementById('BodyId'));

	function setVariables() {
		$paymentType = $('#' + that.paymentTypeID);
		$spanRegistrationConfirmPasswordRequiredID = $('#' + that.spanRegistrationConfirmPasswordRequiredID);
		$spanRegistrationPasswordRequiredID = $('#' + that.spanRegistrationPasswordRequiredID);
		$txtRegistrationConfirmPasswordID = $('#' + that.txtRegistrationConfirmPasswordID);
		$txtRegistrationPasswordID = $('#' + that.txtRegistrationPasswordID);
	}

	function bindEvents() {
		$paymentType.change(function (event) {
			that.displayUseAsBilling();
		});
	}

	this.displayUseAsBilling = function () {
		if ($paymentType.val() == that.billMeLaterValue) {
			$('#' + that.useAsBillingID).hide();
			$("label[for='" + that.useAsBillingID + "']").hide();
		}
		else {
			$('#' + that.useAsBillingID).show();
			$("label[for='" + that.useAsBillingID + "']").show();
		}
	};

	function ChargeTransaction(data, sCallbackURI, errroCallback) {	
        // Disable the main form		   

		$.ajax({
			url: BLACKBAUD.netcommunity.WebMethodsURL + "/ChargeTransactionLogging",
			type: "POST",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (success) {
			    if (typeof(success) != 'undefined' && success) {
			        let urlBack = sCallbackURI + "&t=" + data.TransactionID;
			        window.location.href = urlBack;                    
			    }
			    else {
			    	handleError("An error occurred during the transaction. Please contact the organization directly to arrange payment.");
			        HandleCSS(that.mainForm, "1", "auto");			        
                }
			},
			error: function (error) {
				if (errroCallback && typeof errroCallback === 'function') {
					errroCallback(error)
				}

				// Enable the main form
				HandleCSS(that.mainForm, "1", "auto");
			}
		});
	};

	function HandleCSS(mainform, opacity, pointEvent) {
		if (typeof(mainform) !== 'undefined') {
			mainform.css("opacity", opacity);
			mainform.css("pointer-events", pointEvent);
		}		
	}

	this.ChargeTransactionSuccess = function (data) {
		console.log('Charge Transaction completed.')
	};

	this.ChargeTransactionError = function(error) {
		handleError(error)
	};

	this.toggleRegistration = function () {
		if ($('#' + that.chkRegisterAnAccountID).is(':checked')) {
			$("#userRegistration").show();
			$txtRegistrationPasswordID.removeAttr('disabled');
			$txtRegistrationPasswordID.css({ 'background-color': '#FFF', 'color': '#000' });
			$spanRegistrationPasswordRequiredID.show();
			$txtRegistrationConfirmPasswordID.removeAttr('disabled');
			$txtRegistrationConfirmPasswordID.css({ 'background-color': '#FFF', 'color': '#000' });
			$spanRegistrationConfirmPasswordRequiredID.show();
		}
		else {
			$("#userRegistration").hide();
			$txtRegistrationPasswordID.attr('disabled', 'disabled');
			$txtRegistrationPasswordID.css({ 'background-color': '#F0F0F0', 'color': '#FF0000' });
			$spanRegistrationPasswordRequiredID.hide();
			$txtRegistrationConfirmPasswordID.attr('disabled', 'disabled');
			$txtRegistrationConfirmPasswordID.css({ 'background-color': '#F0F0F0', 'color': '#FF0000' });
			$spanRegistrationConfirmPasswordRequiredID.hide();
		}
	};

	this.enableRegistration = function () {
		$('#' + that.chkRegisterAnAccountID).click(function () {
			that.toggleRegistration();
		});
		that.toggleRegistration();
	};
    
	this.errorCallback = function () {
	    if (event && event.originalEvent && event.originalEvent.detail) {
	        handleError(event.originalEvent.detail.errorText)
	    }	    
	};

	this.cancelCallback = function () {
		console.log('Transaction cancled.');
	};

	this.loadedCallback = function () {
		console.log('Transaction loaded.');
	};

	this.completeCallback = function (e) {		
		if (e.originalEvent !== undefined) {
			//in order to find live form from multiple callback events.
			if (!that.isPaymentDone) {

				let chargeTransdata = {
					TransactionID: e.originalEvent.detail.transactionToken,
					Amount: that.Amount,
					ClientAppName: 'Altru Web Forms',
					AdditionalFee: 0.00 /*Additional fee for altru client should be handled by BBMS and cybersource at there level so should not be passing from here.*/,
					SalesOrderID: that.salesOrderID
				};
				HandleCSS(that.mainForm, ".3", "none");

				if (chargeTransdata.TransactionID) {
					ChargeTransaction(chargeTransdata, that.sCallbackURI, this.ChargeTransactionError);
					that.isPaymentDone = true;
				}
				else {
					console.log('TransactionID not found');
					handleError('An error occurred during the transaction. Please contact the organization directly to arrange payment.');
					//Enable the mainform after alert
					HandleCSS(that.mainForm, "1", "auto");
				}
			}
		}
	};

	this.MakePayment = function (dCartTotal, sCallbackURI, oMerchantAccountBBPSID, oMerchantAccountISO4217, cardHolder, addInfo, description, useMasterpass, useVisaCheckout, useApplePay, hasProcessCard, hasStoreCard, cardToken, publicKey) {
		that.isPaymentDone = false;
		that.Amount = dCartTotal;		
		that.sCallbackURI = sCallbackURI
		try {
			let addressInfo = JSON.parse(addInfo);

			if (!publicKey) {
				console.log("No PUBLICKEY found for Online Sales.");
				errorMessage = "The credit card payment cannot be processed.";
				throw new Error(errorMessage);
			}
			let transactionData = {
				'Key': publicKey,
				'MerchantAccountId': oMerchantAccountBBPSID,
				'Amount': dCartTotal,
				'ClientAppName': 'Altru Web Forms',
				//Optional parameters for card not present
				'Cardholder': cardHolder,
				'BillingAddressEmail': addressInfo.Email,
				'BillingAddressLine': addressInfo.Line,
				'BillingAddressCity': addressInfo.City,
				'BillingAddressState': addressInfo.State,
				'BillingAddressPostCode': addressInfo.PostCode,
				'BillingAddressCountry': addressInfo.Country,
				'BillingAddressPhone': addressInfo.Phone,
				'Note': description,
				'UseCaptcha': false,
				'UseMasterpass': useMasterpass,
				'UseVisaCheckout': useVisaCheckout,
				'UseApplePay': useApplePay,
				'Description': description,
				'CardToken': hasStoreCard === "True" ? cardToken : ""
			};

			if (hasProcessCard === "True" && hasStoreCard === "True") {
				Blackbaud_OpenPaymentForm(transactionData);
			}
			else if (hasProcessCard === "True" && hasStoreCard !== "True") {
				Blackbaud_OpenPaymentForm(transactionData);
			}
			else if (hasStoreCard === "True" && hasProcessCard !== "True") {
				Blackbaud_OpenStoreCardForm();
			}

			if (this.errorCallback) {
				$(document).on("checkoutError", this.errorCallback);
			}
			if (this.completeCallback) {
				$(document).on("checkoutComplete", this.completeCallback);
			}
			if (this.cancelCallback) {
				$(document).on("checkoutCancel", this.cancelCallback);
			}
			if (this.loadedCallback) {
				$(document).on("checkoutLoaded", this.loadedCallback);
			}
		} catch (e) {
			console.log(e.message);
			handleError('Sorry payment not completed, something went wrong. Please contact support.');
		}
		
	};

	function handleError(error) {
		alert(error);
	};

	function GetTokenIdFromFrame() {
		var url = $("#bbCheckoutPaymentIframe").prop('src');
		var tid = GetUrlVars(url)["t"];
		return tid;
	}

	function GetUrlVars(url) {
		var vars = [], hash;
		var hashes = url.slice(url.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

	this.init = function () {
		setVariables();
		bindEvents();
		that.displayUseAsBilling();
		that.enableRegistration();
	};
};
