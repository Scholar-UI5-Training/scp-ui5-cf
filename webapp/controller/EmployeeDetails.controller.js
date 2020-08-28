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
			this.fetchUiData();
			//jQuery.sap.syncGetJSON("/EmpService/employee/all").data;
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
		},

		fetchUiData: function () {
			var that = this;
			$.ajax({
				type: "GET",
				url: "/EmpService/employee/all",
				dataType: "json",
				data: [],
				async: false,
				contentType: "application/json",
				success: function (oResponse) {
					if (oResponse) {
						that.oModel = new JSONModel(oResponse);
						that.getView().setModel(that.oModel);
						that.oTable = that.byId("empDataTable");
						that.oReadOnlyTemplate = that.oTable.removeItem(0);
						that.rebindTable(that.oReadOnlyTemplate, "Navigation");
						that.oEditableTemplate = new ColumnListItem({
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
					} else {
						MessageBox.error("Data could not be fetched. Please try later!");
					}
				},
				error: function (error) {
					MessageBox.error(error);
				}
			});
		}
	});
});
