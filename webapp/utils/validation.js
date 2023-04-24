sap.ui.define([], function () {
	"use strict";
	var validation = ("usermanagement.usercreation.utils.validation", {
		validate: function (sProperty,component,aValidationError) {
            var sMessage = "";
            var oErrorMessageObj = {};
			switch (sProperty) {
                case 'Title':
                    break;
               case 'FirstName' :
                component.AppModel.setProperty("/createUiControl/ValueState/FirstName",'None');
                component.AppModel.setProperty("/createUiControl/ValueStateText/FirstName",'');
                var sValue = component.AppModel.getProperty("/detailItem/FIRST_NAME");
                var iMaxLength = this._fnValidateLength(sValue);
                if(iMaxLength === 0 || !sValue){
                    sMessage = component.getI18n("FirstNameRequired");
                    oErrorMessageObj = this.formatMessageList("Error",sProperty,sMessage,aValidationError.length + 1);
                    aValidationError.push(oErrorMessageObj);
                    component.AppModel.setProperty("/createUiControl/ValueState/FirstName",'Error');
                    component.AppModel.setProperty("/createUiControl/ValueStateText/FirstName",sMessage);
                }
                if(iMaxLength > 5){
                    sMessage = component.getI18n("FirstNameMaxLength");
                    oErrorMessageObj = this.formatMessageList("Error",sProperty,sMessage,aValidationError.length + 1);
                    aValidationError.push(oErrorMessageObj);
                    component.AppModel.setProperty("/createUiControl/ValueState/FirstName",'Error');
                    component.AppModel.setProperty("/createUiControl/ValueStateText/FirstName",sMessage);
                }
                break;
                case 'LastName' :
                component.AppModel.setProperty("/createUiControl/ValueState/LastName",'None');
                component.AppModel.setProperty("/createUiControl/ValueStateText/LastName",'');
                var sValue = component.AppModel.getProperty("/detailItem/LAST_NAME");
                var iMaxLength = this._fnValidateLength(sValue);
                if(iMaxLength === 0 || !sValue){
                    sMessage = component.getI18n("LastNameRequired");
                    oErrorMessageObj = this.formatMessageList("Error",sProperty,sMessage,aValidationError.length + 1);
                    aValidationError.push(oErrorMessageObj);
                    component.AppModel.setProperty("/createUiControl/ValueState/LastName",'Error');
                    component.AppModel.setProperty("/createUiControl/ValueStateText/LastName",sMessage);
                }
                if(iMaxLength > 5){
                    sMessage = component.getI18n("LastNameMaxLength");
                    oErrorMessageObj = this.formatMessageList("Error",sProperty,sMessage,aValidationError.length + 1);
                    aValidationError.push(oErrorMessageObj);
                    component.AppModel.setProperty("/createUiControl/ValueState/LastName",'Error');
                    component.AppModel.setProperty("/createUiControl/ValueStateText/LastName",sMessage);
                }
                break;
                default:
                    break;
			}
		},
		_fnValidateLength: function (sValue) {
			return sValue.trim().length;
		},
		_fnValidate3Int2Decimal: function (sValue) {
			var regex = new RegExp(/^\d{1,3}(\.$|\.\d{1,2}$|$)/);
			regex.test(sValue);
		},
        
        	//Format Message List
			formatMessageList: function (type, sColumnName, message, idx) {
				var messageObj = {};
				messageObj.type = type;
				messageObj.DisplayIdx = parseInt(idx) + 1;
				messageObj.sTitle = "Record No. : " + messageObj.DisplayIdx + "\n Column :" + sColumnName;
				messageObj.title = sColumnName;
				messageObj.state = type;
				messageObj.message = message;
				messageObj.idx = parseInt(idx);
				return messageObj;
			}
		
		

	});
	return validation;
}, true);