sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../utils/dataUtil",
    "sap/ui/core/Fragment",
    "../model/formatter",
    "../utils/ajaxutil",
    "../utils/filterOpEnum",
    "../model/models",
    "sap/m/ColumnListItem",
    "../utils/configuration",
    "../utils/services"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, dataUtil, _Fragment, formatter, ajaxutil, _filterOpEnum, models, ColumnListItem, Configuration, Services) {
        "use strict";

        return Controller.extend("usermanagement.usercreation.controller.CreateUser", {
            formatter: formatter,

            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.AppModel = this.getOwnerComponent().getModel("appModel");

                this.oRouter.getRoute("displayuser").attachPatternMatched(this.onDisplayRouteMatched, this);
                this.oRouter.getRoute("createuser").attachPatternMatched(this.onCreateRouteMatched, this);
                this.oRouter.getRoute("edituser").attachPatternMatched(this.onEditRouteMatched, this);

                this._fnGetLookUpData();
                this._fnGetState();

            },

            _fnGetState: function () {
                var sUrl = Configuration.fnBasePathUserManagement + Configuration.dbOperations.fetchCountryCode
                Services._fnRead(sUrl, "GET", {}, function (response) {
                    this.AppModel.setProperty("/state", response);

                }.bind(this));
            },


            _fnGetLookUpData: function () {
                debugger;
                var sUrl = Configuration.fnBasePathUserManagement + Configuration.dbOperations.fetchMasterBatch;
                var requestPayload = ["TITLE", "COUNTRY-CODE", "USER-TYPE"];
                Services._fnPost(sUrl, "POST", requestPayload, function (response, data) {
                    debugger;
                    this.AppModel.setProperty("/userType", response['USER-TYPE']);
                    this.AppModel.setProperty("/countryCode", response['COUNTRY-CODE']);
                    this.AppModel.setProperty("/title", response['TITLE']);
                }.bind(this));
            },

            onCreateRouteMatched: function (oEvent) {
                this.AppModel.setProperty("/createUiControl",models._fnCreateUserUiControl())
                this.AppModel.setProperty("/action", 'Create');
                // initialize create model data binding
                this.AppModel.setProperty("/detailItem", models._fnCreateUserPayLoad());
            },
            onEditRouteMatched: function (oEvent) {
                var sUserId = oEvent.getParameter("arguments").userId;
                this.AppModel.setProperty("/action", 'Edit');
                this.AppModel.setProperty("/detailItem", models._fnUpdateUserPayLoad());
                this._fnFetchUniqueUser(sUserId);
            },
            onDisplayRouteMatched: function (oEvent) {
                var sUserId = oEvent.getParameter("arguments").userId;
                this.AppModel.setProperty("/action", 'Display');
                this._fnFetchUniqueUser(sUserId);
            },
            _fnFetchUniqueUser(userId) {
                var sUrl = Configuration.fnBasePathUserManagement + Configuration.dbOperations.fetchUsers + "/" + userId;
                Services._fnRead(sUrl, "GET", {}, function (response) {
                    this.AppModel.setProperty("/detailItem", response);
                }.bind(this));
            },

            onSubmitDetails: function () {
                var that = this;
                var _firstName = this.byId("inpFirstName"),
                    _firstNameValue = _firstName.getValue();
                var _lastName = this.byId("inpLastName"),
                    _lastNameValue = _lastName.getValue()
                // var _emailId = this.byId("inpEmailId");
                // var _userType = this.byId("cmbUserType");
                // var _phoneCountryCode = this.byId("cmbPhCountryCode");
                // var _phoneNo = this.byId("cmbPhoneNo");
                // var _addressLine1 = this.byId("txtAreaAddressLine_1");
                // var _country = this.byId("cmbCountry");
                // var _state = this.byId("cmbState");
                // var _postalCode = this.byId("inpPostalCode");
                // var _effectiveStartDate = this.byId("dtEffectiveStartDate");

                if (_firstNameValue === "" || _lastNameValue === "") {
                    if (_firstNameValue === "" && _lastNameValue === "") {
                        _firstName.setValueState("Error");
                        _lastName.setValueState("Error");
                    }else if (_firstNameValue !== "") {
                        _firstName.setValueState("None");
                    }else if(_lastNameValue !== ""){
                        _lastName.setValueState("None");
                    }
                }





                var requestPayload = this.AppModel.getProperty("/detailItem");
                var cmbUserType = this.byId("cmbUserType");
                if (cmbUserType.getSelectedItem()) {
                    var selectedText = cmbUserType.getSelectedItem().getText()
                    cmbUserType.setSelectedKey(selectedText);
                }
                debugger;
                var cmbState = this.byId("cmbState");
                if (cmbState.getSelectedItem()) {
                    var selectedText = cmbState.getSelectedItem().getText()
                    cmbState.setSelectedKey(selectedText);
                }
                console.log(requestPayload);
                var sUrl = Configuration.fnBasePathUserManagement + Configuration.dbOperations.createUsers;
                Services._fnPost(sUrl, "POST", requestPayload, function (response, data) {
                    debugger
                    if (data == "success") {
                        var sMessage = "User Created Successfully";
                        sap.m.MessageBox.success(sMessage, {
                            title: "Success",
                            styleClass: "",
                            actions: [sap.m.MessageBox.Action.OK],
                            emphasizedAction: sap.m.MessageBox.Action.OK,
                            initialFocus: null,
                            onClose: function (sAction) {
                                if (sAction === "OK") {
                                    that.oRouter.navTo("RouteOverview")
                                }

                            }
                        });
                    }
                });
            },
            onBack: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("ManageUser");
            }
        });
    });
