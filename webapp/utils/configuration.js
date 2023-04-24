sap.ui.define([
	"sap/base/Log"
], function(Log) {
	"use strict";
	return {
		fnBasePathUserManagement: "https://spusermgmt-zwjymjbxva-as.a.run.app",
		dbOperations:{
            "fetchCountryCode" : "/master/state",
            "fetchUsers": "/user",
			"fetchUniqueUser":"/user?userId=",
			"fetchMasterBatch":"/master/batch",
			"createUsers":"/user",
			"uploadUsers": "/user/mass-upload",
			

        }
		
	};
}, true); // <-- Enables accessing this module via global name "path.to.my.formatter"