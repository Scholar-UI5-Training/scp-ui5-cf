/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"_sap/com/sap/demo/employeeservice/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});