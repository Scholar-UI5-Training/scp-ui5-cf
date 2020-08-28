/*global QUnit*/

sap.ui.define([
	"_sap/com/sap/demo/employeeservice/controller/EmployeeDetails.controller"
], function (Controller) {
	"use strict";

	QUnit.module("EmployeeDetails Controller");

	QUnit.test("I should test the EmployeeDetails controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});