/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"usermanagement/usercreation/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
