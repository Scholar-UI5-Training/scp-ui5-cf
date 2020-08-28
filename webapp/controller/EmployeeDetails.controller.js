sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/m/ColumnListItem",
	"sap/m/Input",
	"sap/base/util/deepExtend"
], function (Controller, JSONModel, MessageToast, MessageBox, ColumnListItem, Input, deepExtend) {
	"use strict";

	return Controller.extend("_sap.com.sap.demo.employeeservice.controller.EmployeeDetails", {
		onInit: function () {
			var data = jQuery.sap.syncGetJSON("/EmpService/employee/all").data;
			this.oModel = new JSONModel(data);
			this.getView().setModel(this.oModel);
			this.oTable = this.byId("empDataTable");
			this.oReadOnlyTemplate = this.oTable.removeItem(0);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
			this.oEditableTemplate = new ColumnListItem({
				cells: [
					new Input({
						value: "{id}"
					}), new Input({
						value: "{firstName}"
					}), new Input({
						value: "{lastName}"
					}), new Input({
						value: "{email}"
					}), new Input({
						value: "{contact}"
					})
				]
			});
		},
		
		rebindTable: function (oTemplate, sKeyboardMode) {
			this.oTable.bindItems({
				path: "/",
				template: oTemplate,
				templateShareable: true,
				key: "id"
			}).setKeyboardMode(sKeyboardMode);
		},

		onEdit: function () {
			this.aOldEmployeeData = deepExtend([], this.oModel.getProperty("/"));
			this.byId("editButton").setVisible(false);
			this.byId("addButton").setVisible(true);
			this.byId("saveButton").setEnabled(true);
			this.byId("cancelButton").setEnabled(true);
			this.rebindTable(this.oEditableTemplate, "Edit");
		},

		onAdd: function (oEvent) {
			var newEmp = {
				"id": "",
				"firstName": "",
				"lastName": "",
				"email": "",
				"contact": ""
			};
			this.getView().getModel().getData().push(newEmp);
			this.getView().getModel().refresh();
		},

		onDelete: function (oEvent) {
			this.dataDeleted = true;
		},

		onSave: function (oEvent) {
			jQuery.sap.syncPost();
		},

		onCancel: function (oEvent) {
			this.byId("addButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.byId("saveButton").setEnabled(false);
			this.byId("cancelButton").setEnabled(false);
			this.oModel.setProperty("/", this.aOldEmployeeData);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
		}

	/*	doAjaxCall: function (oData, sUrl, sType) {
			$.ajax({
				type: sType,
				url: sUrl,
				dataType: "json",
				data: oData,
				contentType: "application/json",
				success: function (oResponse) {
					if (oResponse) {
						MessageToast.show("Data Saved");
					} else {
						MessageBox.error("Data could not be saved. Please try later!");
					}
				},
				error: function (error) {
					MessageBox.error(error);
				}
			});
		}*/
	});
});