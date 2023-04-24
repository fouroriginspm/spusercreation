sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/models",
    "sap/ui/export/Spreadsheet",
    'sap/ui/export/library',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "../enums/xlsx.core.min",
    'sap/m/MessageToast',
    'sap/ui/model/Sorter',
    "../utils/configuration",
    "../utils/services"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, models, Spreadsheet, exportLibrary, Filter, FilterOperator, Fragment, XLSXLib, MessageToast, Sorter, Configuration, Services) {
        "use strict";
        var EdmType = exportLibrary.EdmType;

        return Controller.extend("usermanagement.usercreation.controller.Overview", {
            models: models,
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                var objAppInitialData = {
                    busy: false,
                    items: [],
                    oUserTokens: [],
                    aUserType: [],
                    aMassUpload: []
                }
                this.AppModel = this.getOwnerComponent().getModel("appModel");
                debugger;
                this.AppModel.setData(objAppInitialData);
                // this.oRouter.getRoute("uploadUser").attachPatternMatched(this.onUploadUserRouteMatched, this);
                this._fnGetUsersList();
                this._fnGetLookUpData();
                this.oRouter.getRoute("RouteOverview").attachPatternMatched(this.onRouteMatched, this);

            },

            _fnGetLookUpData: function () {
                debugger;
                var sUrl = Configuration.fnBasePathUserManagement + Configuration.dbOperations.fetchMasterBatch;
                var requestPayload = ["USER-TYPE"];
                Services._fnPost(sUrl, "POST", requestPayload, function (response, data) {
                    debugger;
                    this.AppModel.setProperty("/userType", response['USER-TYPE']);
                }.bind(this));
            },

            onRouteMatched: function () {
                this._fnGetUsersList();
            },
            _fnGetUsersList: function () {
                var sUrl = Configuration.fnBasePathUserManagement + Configuration.dbOperations.fetchUsers
                Services._fnRead(sUrl, "GET", {}, function (response) {
                    this.AppModel.setProperty("/items", response);

                }.bind(this));

            },
            onChange: function (oEvent) {
                debugger;
            },

            onPressCreate: function (oEvent) {

                var oComponentModel = this.getOwnerComponent().getModel("appModel"),
                    aUserTable = this.getOwnerComponent().getModel("appModel").getProperty("/items"),
                    iUsertableLength = aUserTable.length,
                    iUserId = aUserTable[iUsertableLength - 1].USER_ID;
                oComponentModel.setProperty("/iLastUserId", iUserId);
                this.oRouter.navTo("createuser");
            },

            onPressDisplay: function (oEvent) {
                var oSelectedObject = oEvent.getSource().getBindingContext("appModel").getObject();
                var sID = oSelectedObject.USER_ID

                this.oRouter.navTo("displayuser", {
                    userId: sID
                });

            },
            onPressEdit: function (oEvent) {
                var oSelectedObject = oEvent.getSource().getBindingContext("appModel").getObject();
                var sID = oSelectedObject.USER_ID

                this.oRouter.navTo("edituser", {
                    userId: sID
                });
            },
            onDeleteBtnClk: function (oEvent) {
                var that = this;
                var sPath = oEvent.getSource().getBindingContext("appModel").getPath().split("/")[2];
                var oTable = this.getView().getModel("appModel").getProperty("/items");
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show("Are you sure? This action is irreverisble", {
                    icon: sap.m.MessageBox.Icon.WARNING,
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            try {
                                oTable.splice(sPath, 1);
                                that.getView().getModel("appModel").refresh(true);

                            } catch (e) {
                                Log.error("Exception in Delete function");
                            }
                        }
                    }
                });

            },


            onDeleteListItem: function (oEvent) {
                var oSelectedItem = oEvent.getSource().getBindingContext("appModel").getObject();
                var _userID = oSelectedItem.USER_ID;
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show("Are you sure? This action is irreverisble", {
                    icon: sap.m.MessageBox.Icon.WARNING,
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            try {
                                var absolutePath = " https://spusermgmt-wstkn7335q-as.a.run.app";
                                var relativePath = "/user/" + _userID + "";
                                var sUrl = absolutePath + relativePath;
                                $.ajax({
                                    url: sUrl,
                                    type: "DELETE",
                                    success: function (oData) {
                                        debugger;
                                        this._fnGetUsersList();
                                    }.bind(this),
                                    error: function (oError) {
                                        debugger;
                                    }
                                });

                            } catch (e) {
                                Log.error("Exception in Delete function");
                            }
                        }
                    }
                });


            },

            onDownload: function (oEvent) {

                var aCols, aUsers, oSettings, oSheet;
                aCols = this.createColumnConfig();
                aUsers = this.getView().getModel("appModel").getProperty('/items');

                oSettings = {
                    workbook: { columns: aCols },
                    dataSource: aUsers,
                    fileName: "Users"
                };

                oSheet = new Spreadsheet(oSettings);
                oSheet.build()
                    .then(function () {
                        MessageToast.show('Spreadsheet export has finished');
                    })
                    .finally(oSheet.destroy);
            },
            createColumnConfig: function () {
                return [
                    {
                        label: 'TITLE',
                        property: 'TITLE_ID',
                        type: EdmType.String
                    },
                    {
                        label: 'FIRST_NAME',
                        property: 'FIRST_NAME',
                        type: EdmType.String
                    },

                    {
                        label: 'LAST_NAME',
                        property: 'LAST_NAME',
                        type: EdmType.String
                    },

                    {
                        label: 'EMAIL_ID',
                        property: 'EMAIL_ID',
                        type: EdmType.String
                    },


                    {
                        label: 'COUNTRY_CODE',
                        property: 'COUNTRY_CODE',
                        type: EdmType.String
                    },
                    {
                        label: 'PHONE_NUMBER',
                        property: 'PHONE_NUMBER',
                        type: EdmType.String
                    },
                    {
                        label: 'FAX_NUMBER',
                        property: 'FAX_NUMBER',
                        type: EdmType.String
                    },
                    {
                        label: 'EXT_NUMBER',
                        property: 'EXT_NUMBER',
                        type: EdmType.String
                    },
                    {
                        label: 'ADDRESS_LINE_1',
                        property: 'ADDRESS_LINE_1',
                        type: EdmType.String
                    },
                    {
                        label: 'ADDRESS_LINE_2',
                        property: 'ADDRESS_LINE_2',
                        type: EdmType.String
                    },
                    {
                        label: 'ADDRESS_LINE_3',
                        property: 'ADDRESS_LINE_3',
                        type: EdmType.String
                    },
                    {
                        label: 'COUNTRY',
                        property: 'COUNTRY',
                        type: EdmType.String
                    },
                    {
                        label: 'STATE',
                        property: 'STATE',
                        type: EdmType.String
                    },
                    {
                        label: 'CITY',
                        property: 'CITY',
                        type: EdmType.String
                    },
                    {
                        label: 'POSTAL_CODE',
                        property: 'POSTAL_CODE',
                        type: EdmType.String
                    },
                    {
                        label: 'EFFECTIVE_START_DATE',
                        property: 'EFFECTIVE_START_DATE',
                        type: EdmType.String
                    },
                    {
                        label: 'EFFECTIVE_END_DATE',
                        property: 'EFFECTIVE_END_DATE',
                        type: EdmType.String
                    },
                ];
            },

            onSearch: function () {
                var aFilters = this._fnCreateFilters();
                this.getView().byId("tbUserTable").getBinding("items").filter(aFilters, "Application");
            },
            _fnCreateFilters: function () {
                var aFilters = [], aKey = [],
                    oViewOverview = this.getView().getModel("appModel");
                if (this.byId("fbFirstName").getValue().trim().length !== 0) {
                    aKey.push(this.byId("fbFirstName").getValue());
                    this._fnCreateComboFilter(aFilters, aKey, "FIRST_NAME");
                    aKey = [];
                }
                if (this.byId("fbLastName").getValue().trim().length !== 0) {
                    aKey.push(this.byId("fbLastName").getValue());
                    this._fnCreateComboFilter(aFilters, aKey, "LAST_NAME");
                    aKey = [];
                }
                if (this.byId("fbEmailId").getValue().trim().length !== 0) {
                    aKey.push(this.byId("fbEmailId").getValue());
                    this._fnCreateComboFilter(aFilters, aKey, "EMAIL_ID");
                    aKey = [];
                }

                if (this.AppModel.getProperty("/oUserTokens").length !== 0) {
                    aKey = this.AppModel.getProperty("/oUserTokens");
                    this._fnCreateComboFilter(aFilters, aKey, "USER_ID");
                    aKey = [];
                }


                return aFilters;
            },
            _fnCreateComboFilter: function (aFilters, aKeys, sOdataProp) {
                var aFilter = [];
                if (sOdataProp !== "USER_ID") {
                    jQuery.each(aKeys, function (i) {
                        aFilter.push(new Filter(sOdataProp, FilterOperator.Contains, aKeys[i]));
                    });
                } else {
                    jQuery.each(aKeys, function (i) {
                        aFilter.push(new Filter(sOdataProp, FilterOperator.EQ, aKeys[i].USER_ID));
                    });
                }
                aFilters.push(new Filter(aFilter, false));
                return aFilters;
            },
            onClear: function (oEvent) {

                this.byId("fbFirstName").setValue("");
                this.byId("fbLastName").setValue("");
                this.byId("fbEmailId").setValue("");

                this.AppModel.setProperty("/oUserTokens", []);

                if (this._pValueHelpDialog) {
                    this._pValueHelpDialog.destroy();
                    this._pValueHelpDialog = undefined;
                }
                this.onSearch();
            },
            _fnBindTable: function (aFilters) {
                this.getView().byId("tbUserTable").bindAggregation("items", {
                    path: "appModel>/items",
                    filters: aFilters
                });
            },

            onValueHelpSearch: function (oEvent) {

                var sValue = oEvent.getParameter("value");
                var oFilter = [new Filter("EMAIL_ID", FilterOperator.Contains, sValue),
                new Filter("USER_ID", FilterOperator.EQ, sValue)];
                oEvent.getSource().getBinding("items").filter(new Filter(oFilter, false), "Application");

            },

            onUpload: function (oEvent) {
                var that = this;
                if (!that._oUploadDialog) {
                    that._pDialog = Fragment.load({
                        id: "dialogUpload",
                        name: "usermanagement.usercreation.fragments.UploadFile",
                        controller: that
                    }).then(function (oDialog) {
                        that._oUploadDialog = oDialog;
                        that.getView().addDependent(that._oUploadDialog);
                    });
                }
                that._pDialog.then(function (oDialog) {
                    that._oUploadDialog.open();
                }.bind(that));
            },

            onCancelUpload: function (oEvent) {
                this._oUploadDialog.close();
            },
            OnSubmitUpload: function (oEvent) {
                var aUploadData = this.AppModel.getProperty("/aMassUpload");
                var aRequestPayload = [];
                for (var i = 0; i < aUploadData.length; i++) {
                    var oUser = models._fnCreateUserPayLoad();
                    var oUploadData = aUploadData[i];
                    oUser.TITLE_ID = oUploadData.TITLE_ID;
                    oUser.LOGIN_NAME = oUploadData.LOGIN_NAME;
                    oUser.FIRST_NAME = oUploadData.FIRST_NAME;
                    oUser.LAST_NAME = oUploadData.LAST_NAME;
                    oUser.GENDER = oUploadData.GENDER;
                    oUser.EMAIL_ID = oUploadData.EMAIL_ID;
                    oUser.USER_TYPE = oUploadData.USER_TYPE;
                    oUser.ADDRESS.ADDRESS_CODE = "";
                    oUser.ADDRESS.ADDRESS_LINE_1 = oUploadData.ADDRESS_LINE_1;
                    oUser.ADDRESS.ADDRESS_LINE_2 = oUploadData.ADDRESS_LINE_2;
                    oUser.ADDRESS.ADDRESS_LINE_3 = oUploadData.ADDRESS_LINE_3;
                    oUser.ADDRESS.CITY = oUploadData.CITY;
                    oUser.ADDRESS.STATE = oUploadData.STATE;
                    oUser.ADDRESS.POSTAL_CODE = oUploadData.POSTAL_CODE;
                    oUser.ADDRESS.COUNTRY_CODE = oUploadData.COUNTRY_CODE;
                    oUser.CONTACT.PHONE_NUMBER = oUploadData.PHONE_NUMBER;
                    oUser.CONTACT.FAX_NUMBER = oUploadData.FAX_NUMBER;
                    oUser.CONTACT.EXT_NUMBER = oUploadData.EXT_NUMBER;
                    oUser.CONTACT.PH_COUNTRY_CODE = oUploadData.PH_COUNTRY_CODE;
                    oUser.CONTACT.ALT_PH_COUNTRY_CODE = oUploadData.ALT_PH_COUNTRY_CODE;
                    oUser.CONTACT.ALT_PHN_NUMBER = oUploadData.ALT_PHN_NUMBER;
                    oUser.CONTACT.TELE_FAX_NUMBER = oUploadData.TELE_FAX_NUMBER;
                    aRequestPayload.push(oUser);
                }
                console.log(aRequestPayload);

                var sUrl = Configuration.fnBasePathUserManagement + Configuration.dbOperations.uploadUsers;
                Services._fnPost(sUrl, "POST", aRequestPayload, function (response, data) {
                    debugger
                    if (data == "success") {
                        var sMessage = "Users Created Successfully";
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
            handleUploadPress: function () {
                var oFileUploader = this.getView().byId("fileUploader"),
                    file = oFileUploader.oFileUpload.files[0];
                if (!oFileUploader.getValue()) {
                    MessageToast.show("Choose a file first");
                    return;
                }
                this.handleMassUpload(file);
            },

            handleTypeMissmatch: function (oEvent) {
                var aFileTypes = oEvent.getSource().getFileType();
                aFileTypes.map(function (sType) {
                    return "*." + sType;
                });
                MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
                    " is not supported. Choose one of the following types: " +
                    aFileTypes.join(", "));
            },

            handleValueChange: function (oEvent) {
                MessageToast.show("Press 'Upload File' to upload file '" +
                    oEvent.getParameter("newValue") + "'");
            },
            onDeleteBtnClk: function (oEvent) {
                var that = this;
                var sPath = oEvent.getSource().getBindingContext("appModel").getPath().split("/")[2];
                var oTable = this.getView().getModel("appModel").getProperty("/items");
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show("Are you sure? This action is irreverisble", {
                    icon: sap.m.MessageBox.Icon.WARNING,
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            try {
                                oTable.splice(sPath, 1);
                                that.getView().getModel("appModel").refresh(true);

                            } catch (e) {
                                Log.error("Exception in Delete function");
                            }
                        }
                    }
                });

            },

            /**
* on Press Extract Data from the Excel template
*/
            handleMassUpload: function (file, isVariant) {
                if (file && window.FileReader) {
                    var that = this;
                    var excelReader = (XLSX) ? XLSX : "";
                    // var bundle = this.localizationBundle;
                    var reader = new FileReader();
                    //handler for the load event
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var binary = "";
                        var bytes = new Uint8Array(data);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var workbook = excelReader.read(binary, {
                            type: "binary",
                            cellDates: true,
                            cellStyles: true
                        });

                        try {
                            // that.showBusyIndicator();
                            if (workbook.SheetNames instanceof Array && workbook.SheetNames.length >= 1) {
                                var sheetName = "";
                                var excelData = {};
                                for (var s = 0; s < workbook.SheetNames.length; s++) {
                                    sheetName = workbook.SheetNames[s];
                                    sheetName = workbook.SheetNames[s];
                                    excelData = excelReader.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                                    break;
                                }
                                // that.isMassUpload = false;
                                that.AppModel.setProperty("/aMassUpload", excelData)

                                // that.getOwnerComponent().getModel("appModel").setProperty("/uploadUser", excelData);
                                that.onUpload();
                                // ArticleCreationUtility._fnPopulateTemplateData(excelData, file.name, sheetName, isVariant, that);
                                // that.getView().byId("page").setBusy(false);
                            }
                        } catch (exc) {
                            // MessageToast.show(bundle.getText("Mass.Upload.Error") + "/n" + exc.message);
                            // that.getView().byId("page").setBusy(false);
                            // that.hideBusyIndicator();
                            // that.getUIControl("idExcelUploadButton").setEnabled(true);
                        }
                    };
                    //handler for the error event
                    reader.onerror = function (ex) {
                        // MessageToast.show(bundle.getText("Mass.Upload.Error") + "/n" + ex);
                        // that.getView().byId("page").setBusy(false);
                        // that.hideBusyIndicator();
                    };
                    reader.readAsArrayBuffer(file);
                }
            },

            onValueHelpRequest: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView(),
                    that = this;
                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "usermanagement.usercreation.fragments.UserValueHelp",
                        controller: this
                    }).then(function (oDialog) {
                        that._pValueHelpDialog = oDialog;
                        oDialog.setRememberSelections(true);
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }

            },
            onValueHelpClose: function (oEvent) {
                var aSelectedItems = oEvent.getParameter("selectedItems"),
                    aSelectedObject = [];
                var oBinding = oEvent.getSource().getBinding("items");
                if (aSelectedItems && aSelectedItems.length > 0) {
                    aSelectedObject = aSelectedItems.map(function (oItem) {
                        return oItem.getBindingContext("appModel").getObject();
                    });
                }
                this.AppModel.setProperty("/oUserTokens", aSelectedObject);
                oBinding.filter([]);

                this._pValueHelpDialog.destroy();
                this._pValueHelpDialog = null;
                this._pValueHelpDialog = undefined;

                if (!aSelectedItems) {
                    return;
                }


            },
            onSort: function (oEvent) {
                var that = this;
                that.oMainKey = oEvent.getSource();
                if (!that._oSortF4) {
                    that._SortDialog = sap.ui.core.Fragment.load({
                        id: that.createId("_SortF4"),
                        name: "usermanagement.usercreation.fragments.Sort",
                        controller: that
                    }).then(function (oDialog) {
                        that._oSortF4 = oDialog;
                        that.getView().addDependent(that._oSortF4);
                    });
                }
                that._SortDialog.then(function (oDialog) {
                    that._oSortF4.open();
                }.bind(this));
            },
            handleSortDialogConfirm: function (oEvent) {
                var oTable = this.getView().byId("tbUserTable"),
                    mParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    bDescending,
                    aSorters = [];

                sPath = mParams.sortItem.getKey();
                bDescending = mParams.sortDescending;
                aSorters.push(new Sorter(sPath, bDescending));

                // apply the selected sort and group settings
                oBinding.sort(aSorters);
            }

        });
    });
