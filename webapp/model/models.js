sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },

            fnFlexiable: function () {
                var oFlexable = new JSONModel({
                    width:"auto"
                });
                return oFlexable;
            },

            _fnCreateUserPayLoad: function(){
              return {
                "OBJECT_ID": 0,
                "RETAILER_ID": "1",
                "LOGIN_NAME": "",
                "TITLE_ID": "",
                "FIRST_NAME": "",
                "MIDDLE_NAME": "",
                "LAST_NAME": "",
                "EMAIL_ID": "",
                "USER_TYPE": "",
                "GENDER": "10",
                "VALID_FROM": "2023-04-17",
                "VALID_TO": "",
                "NON_EXPIRED": true,
                "ADDRESS": {
                    "ADDRESS_CODE": "",
                    "ADDRESS_LINE_1": "",
                    "ADDRESS_LINE_2": "",
                    "ADDRESS_LINE_3": "",
                    "CITY": "",
                    "STATE": "",
                    "POSTAL_CODE": "",
                    "COUNTRY_CODE": "+91",
                    "LANGUAGE": "",
                    "ADDRESS_TYPE": "Personal",
                    "VALID_FROM": "2023-04-17",
                    "VALID_TO": ""        
                },
                "CONTACT": {
                    "RETAILER_ID": "1",
                    "OBJECT_TYPE": "User",
                    "POSITION": "",
                    "DEPARTMENT": "",
                    "PHONE_NUMBER": "",
                    "EMAIL_ADDRESS": "",
                    "FAX_NUMBER": "",
                    "EXT_NUMBER": "",
                    "PH_COUNTRY_CODE": "",
                    "ALT_PH_COUNTRY_CODE": "",
                    "ALT_PHN_NUMBER": "",
                    "TELE_FAX_NUMBER": ""
                }
            }
        
          },
          _fnUpdateUserPayLoad: function(){
            return{
                
                    "OBJECT_ID": 0,
                    "USER_ID": 10071,
                    "RETAILER_ID": 1,
                    "LOGIN_NAME": "",
                    "TITLE_ID": "",
                    "FIRST_NAME": "",
                    "MIDDLE_NAME": "",
                    "LAST_NAME": "",
                    "EMAIL_ID": "",
                    "ACTIVE": true,
                    "DELETED": false,
                    "VALID_FROM": "2023-04-12 00:00:00",
                    "VALID_TO": "9999-12-31 00:00:00",
                    "USER_TYPE": "Employee",
                "ADDRESS": {
                    "ADDRESS_ID": "",
                    "ADDRESS_CODE": "",
                    "ADDRESS_LINE_1": "",
                    "ADDRESS_LINE_2": "",
                    "ADDRESS_LINE_3": "",
                    "CITY": "",
                    "STATE": "",
                    "POSTAL_CODE": "",
                    "COUNTRY_CODE": "+91",
                    "LANGUAGE": "",
                    "ADDRESS_TYPE": "Personal",
                    "VALID_FROM": "2023-04-12",
                    "VALID_TO": "2023-05-04"
                },
                "CONTACT": {
                    "CONTACT_ID": 25,
                    "RETAILER_ID": "1",
                    "OBJECT_TYPE": "User",
                    "POSITION": "",
                    "DEPARTMENT": "10",
                    "PHONE_NUMBER": "321321321",
                    "EMAIL_ADDRESS": "fo1@gmail.com",
                    "FAX_NUMBER": "12121212",
                    "EXT_NUMBER": "84545",
                    "PH_COUNTRY_CODE": "+60",
                    "ALT_PH_COUNTRY_CODE": "",
                    "ALT_PHN_NUMBER": "",
                    "TELE_FAX_NUMBER": "321321"
                }
                
            }
          },
    _fnUploadUserPayLoad: function(){
        {
            item : [{
            "OBJECT_ID": 0,
            "USER_ID": "",
            "RETAILER_ID": "1",
            "LOGIN_NAME": "",
            "TITLE_ID": "",
            "FIRST_NAME": "",
            "MIDDLE_NAME": "",
            "LAST_NAME": "",
            "EMAIL_ID": "",
            "GENDER": "10",
            "VALID_FROM": "2023-04-12",
            "VALID_TO": "",
            "NON_EXPIRED": true,
            "USER_TYPE" : "",
            "ADDRESS": {
                "ADDRESS_CODE": "",
                "ADDRESS_LINE_1": "",
                "ADDRESS_LINE_2": "",
                "ADDRESS_LINE_3": "",
                "CITY": "",
                "STATE": "",
                "POSTAL_CODE": "",
                "COUNTRY_CODE": "",
                "LANGUAGE": "",
                "ADDRESS_TYPE": "Personal",
                "VALID_FROM": "2023-04-12",
                "VALID_TO": "2023-05-04"
            },
            "CONTACT": {
                "RETAILER_ID": "1",
                "OBJECT_TYPE": "",
                "POSITION": "",
                "DEPARTMENT": "10",
                "PHONE_NUMBER": "",
                "EMAIL_ADDRESS": "",
                "FAX_NUMBER": "",
                "EXT_NUMBER": "",
                "PH_COUNTRY_CODE": "",
                "ALT_PH_COUNTRY_CODE": "",
                "ALT_PHN_NUMBER": "",
                "TELE_FAX_NUMBER": ""
            }
        }
            ]
        }
    },
    _fnCreateUserUiControl: function(){
        return {
            "Required":{
                "AddressLine1" : true,
                "Title":true,
                "FirstName":true,
                "LastName":true,
                "MiddleName": true,
                "EmailId": true,
                "UserType": true
            },
            "Visible":{
                "AddressLine1" : true,
                "Title":true,
                "FirstName":true,
                "LastName":true,
                "MiddleName": true,
                "EmailId": true,
                "UserType": true
            },
            "Editable":{
                "AddressLine1" : true,
                "Title":true,
                "FirstName":true,
                "LastName":true,
                "MiddleName": true,
                "EmailId": true,
                "UserType": true
            },
            "Picklist":{
                "AddressLine1" : true,
                "Title":true,
                "FirstName":true,
                "LastName":true,
                "MiddleName": true,
                "EmailId": true,
                "UserType": true
            },
            "MaxLength":{
                "AddressLine1" : 200,
                "Title":10,
                "FirstName":5,
                "LastName":8,
                "MiddleName": 200,
                "EmailId": 200,
                "UserType": 20
            },
            "ValueState":{
                "AddressLine1" : "None",
                "Title":"None",
                "FirstName":"None",
                "LastName":"None",
                "MiddleName": "None",
                "EmailId": "None",
                "UserType": "None"
            },
            "ValueStateText":{
                "AddressLine1" : "None",
                "Title":"None",
                "FirstName":"None",
                "LastName":"None",
                "MiddleName": "None",
                "EmailId": "None",
                "UserType": "None"
            }
        }
    }

        };
    });