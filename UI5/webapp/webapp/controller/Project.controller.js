sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
    "sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
    "use strict";

	var _dialog;

	var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
    });

    return Controller.extend("ARN.ARN.controller.Project", {
        onInit: function() {
            var oView = this.getView();
   			var this_ = this;
			
            this.getView().addEventDelegate({
				onBeforeShow: function(evt) {
					this_.wasteTime();

					var oModel = new sap.ui.model.json.JSONModel();
					oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNQ.xsjs?q=3");   
		   
					oModel.attachRequestCompleted(function() {
						this_.runNext();
						oView.setModel(oModel);
						sap.ui.getCore().setModel(oModel, "projectslist");

						var oLength = oModel.getData().length;
						var oTable = this_.byId("projects");
						for (var i = 0; i <oLength; i++) {
							var oItem = oTable.getItems()[i];
							var oCells = oItem.getCells();

							for (var j = 0; j < oCells.length; j++) {
								oCells[j].setEditable(true);
								oCells[j].setValueState("None");
							}
						}
					});
				},
			});
        },

		wasteTime: function() {
             busyDialog.open();
		},

		runNext: function() {
             busyDialog.close();
		},

        doNavBack: function() {
			jQuery.sap.history.back();
        },

        doNavHome: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("home", true);
        },
	
		onNavButtonTo: function (evt) {
		 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("edit", true);
		},

		onInsert: function(oEvent) {
			var this_ = this;

			var oModel = new sap.ui.model.json.JSONModel();
			oModel = sap.ui.getCore().getModel("projectslist");
			console.log(oModel);

			var jsonProjectdata = {
				"ID": "",
				"APPLICATIONS_ID": "",
				"PROJECT_DESC": ""
			};

			var aNewRecord = oModel.getProperty("/");
			aNewRecord.push(jsonProjectdata);
			oModel.setProperty("/", aNewRecord);

			this.getView().setModel(oModel);

			jQuery.sap.delayedCall(100, null, function() {
				var oLength = oModel.getData().length;
				console.log(oLength);

				var oTable = this_.byId("projects");
				var oItem = oTable.getItems()[oLength-1];
				var oCells = oItem.getCells();

				for (var j = 0; j < oCells.length; j++) {
					oCells[j].setEditable(true);
				}
			});
        },

		 onEdit: function(oEvent) {
			var oTable = this.byId("projects");

			var oSelectedItem = oTable.getSelectedItem();
			if(oSelectedItem !== null) {
				var oCells = oSelectedItem.getCells();
				for (var j = 0; j < oCells.length; j++) {
					oCells[j].setEditable(true);
				}
			}
        },

		onDelete: function(oEvent) {
			var oTable = this.byId("projects");

			var oTable = oEvent.getSource().getParent().getParent();
			var oSelectedItem = oTable.getSelectedItem();
			if (oSelectedItem === null) {
				MessageBox.alert("Please select an Item to Delete", {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: "Error"
				});
			} else {
				var that = this;
				MessageBox.confirm("Are you sure you want to delete selected item ?", {
					icon: sap.m.MessageBox.Icon.WARNING,
					title: "Delete",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oEvent) {
						console.log(oSelectedItem);
						that.fnCallbackConfirm(oEvent, oTable, oSelectedItem);
					}	
				});
			}
        },

		fnCallbackConfirm: function(oEvent, oTable, oItem) {
			if (oEvent == "YES") {
				var oIndex = oTable.indexOfItem(oItem);

				var oModel = new sap.ui.model.json.JSONModel();
				oModel = sap.ui.getCore().getModel("projectslist");
				console.log(oModel.getData());

				var oData = oModel.getData();
				oData.splice(oIndex,1);
				oModel.setProperty("/", oData);
				this.getView().setModel(oModel);

				oTable.removeSelections(true);
			} else {
				oTable.removeSelections(true);
				return false;
			}
		},

		onSave: function(oEvent) {	
			var this_ = this;

			var oTable = this.byId("projects");
		    var oModel = new sap.ui.model.json.JSONModel();
			oModel = sap.ui.getCore().getModel("projectslist");

			var oLength = oModel.getData().length;
			console.log(oLength);

			var error = 0;
			for (var i = 0; i <oLength; i++) {
				var oItem = oTable.getItems()[i];
				var oCells = oItem.getCells();
				for (var j = 0; j < oCells.length; j++) {
					oCells[j].setEditable(false);

					if(oCells[j].getValue() === "") {
						error = 1;
						oCells[j].setValueState("Error");
						oCells[j].setEditable(true);
						oCells[j].setValueStateText("Field cannot be empty");
					}
				}
			}

			if(error == 0) {
				var oData = oModel.getData();
				console.log(oData);

				var oTable = this_.byId("projects");
				for (var i = 0; i <oLength; i++) {
					var oItem = oTable.getItems()[i];
					var oCells = oItem.getCells();

					for (var j = 0; j < oCells.length; j++) {
						oCells[j].setEditable(false);
						oCells[j].setValueState("None");
					}
				}			

				var oJsonData = {
					"Project": oData
				};
				oJsonData = JSON.stringify(oJsonData);

				this.wasteTime();
		
				console.log(oJsonData);

				var oModel = new sap.ui.model.json.JSONModel();                          
				oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNProject.xsjs", oJsonData, true, 'POST');
				oModel.attachRequestCompleted(function() {
					this_.runNext();
					var result = oModel.getData();

					if(result == 'success') {
						var oModel_ = new sap.ui.model.json.JSONModel();
						oModel_.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNQ.xsjs?q=3");   
						oModel_.attachRequestCompleted(function() {
							console.log(oModel_.getData());
							this_.getView().setModel(oModel_);
							sap.ui.getCore().setModel(oModel_, "projectslist");
						});

						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(jQuery.sap.resources({
							url: "i18n/i18n.properties"
						}).getText("EDIT_SUCCESS_MSG"), {
							icon: sap.m.MessageBox.Icon.INFORMATION,
							title: this_.getView().getModel("i18n").getResourceBundle().getText("WELCOME_TITLE"),
							actions: sap.m.MessageBox.Action.OK,
							onClose: null,
							//styleClass: ""                        
						});
					} else {
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(jQuery.sap.resources({
							url: "i18n/i18n.properties"
						}).getText("EDIT_ERROR_MSG"), {
							icon: sap.m.MessageBox.Icon.INFORMATION,
							title: this_.getView().getModel("i18n").getResourceBundle().getText("WELCOME_TITLE"),
							actions: sap.m.MessageBox.Action.OK,
							onClose: null,
							//styleClass: ""                        
						});
					}
				});
			} else {
				jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show(jQuery.sap.resources({
					url: "i18n/i18n.properties"
					}).getText("02_ERROR_MSG"), {
						icon: sap.m.MessageBox.Icon.INFORMATION,
                        title: this_.getView().getModel("i18n").getResourceBundle().getText("WELCOME_TITLE"),
                        actions: sap.m.MessageBox.Action.OK,
                        onClose: null,
                        //styleClass: ""                        
                });
			}
			  
		},

    });
});