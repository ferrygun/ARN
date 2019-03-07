sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
    "sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
    "use strict";

	var _dialog;

	var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
    });

    return Controller.extend("ARN.ARN.controller.CapabilitiesSetting", {
        onInit: function() {
            var oView = this.getView();
   			var this_ = this;
			
            this.getView().addEventDelegate({
				onBeforeShow: function(evt) {
					this_.wasteTime();

					var oModel = new sap.ui.model.json.JSONModel();
					oModel = sap.ui.getCore().getModel("appid");
					var app_id = oModel.getData();
					console.log(app_id);

					var oModel_ = new sap.ui.model.json.JSONModel();
					oModel_.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNQ.xsjs?q=2&appid=" + app_id);   
		   
					oModel_.attachRequestCompleted(function() {
						this_.runNext();
						oView.setModel(oModel_);
						sap.ui.getCore().setModel(oModel_, "capabilitieslist");

						var oLength = oModel_.getData().Capability.length;
						var oTable = this_.byId("capabilities");
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

			var oDPtad = oView.byId("target_architecture_date");
			oDPtad.addEventDelegate({
				onAfterRendering: function(){
				var oDateInner = this.$().find('.sapMInputBaseInner');
				var oID = oDateInner[0].id;
				$('#'+oID).attr("disabled", "disabled"); 
			}},oDPtad);
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
			oModel = sap.ui.getCore().getModel("capabilitieslist");
			console.log(oModel);

			var jsoncapabilitydata = {
				"CAPABILITY": "",
				"CAPABILITYOWNER": "",
				"CAPABILITYSTATUS": "",
				"TARGET_ARCHITECTURE_DATE": ""
			};

			var aNewRecord = oModel.getProperty("/Capability");
			aNewRecord.push(jsoncapabilitydata);
			oModel.setProperty("/Capability", aNewRecord);

			this.getView().setModel(oModel);

			jQuery.sap.delayedCall(100, null, function() {
				var oLength = oModel.getData().Capability.length;
				var oTable = this_.byId("capabilities");
				var oItem = oTable.getItems()[oLength-1];
				var oCells = oItem.getCells();

				for (var j = 0; j < oCells.length; j++) {
					oCells[j].setEditable(true);
				}
			});
        },

		 onEdit: function(oEvent) {
			var oTable = this.byId("capabilities");

			var oSelectedItem = oTable.getSelectedItem();
			if(oSelectedItem !== null) {
				var oCells = oSelectedItem.getCells();
				for (var j = 0; j < oCells.length; j++) {
					oCells[j].setEditable(true);
				}
			}
        },

		onDelete: function(oEvent) {
			var oTable = this.byId("capabilities");

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
						that.fnCallbackConfirm(oEvent, oTable, oSelectedItem);
					}	
				});
			}
        },

		fnCallbackConfirm: function(oEvent, oTable, oItem) {
			if (oEvent == "YES") {
				var oIndex = oTable.indexOfItem(oItem);

				var oModel = new sap.ui.model.json.JSONModel();
				oModel = sap.ui.getCore().getModel("capabilitieslist");
				console.log(oModel.getData());

				var oData = oModel.getData().Capability;
				oData.splice(oIndex,1);
				oModel.setProperty("/Capability", oData);
				this.getView().setModel(oModel);

				oTable.removeSelections(true);
			} else {
				oTable.removeSelections(true);
				return false;
			}
		},

		onSave: function(oEvent) {	
			var this_ = this;

			var oTable = this.byId("capabilities");
		    var oModel = new sap.ui.model.json.JSONModel();
			oModel = sap.ui.getCore().getModel("capabilitieslist");

			var oLength = oModel.getData().Capability.length;
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

			if (error == 0) {
				var oData = oModel.getData().Capability;
				console.log(oData);

				var oTable = this_.byId("capabilities");
				for (var i = 0; i <oLength; i++) {
					var oItem = oTable.getItems()[i];
					var oCells = oItem.getCells();

					for (var j = 0; j < oCells.length; j++) {
						oCells[j].setEditable(false);
						oCells[j].setValueState("None");
					}
				}

				var appidoModel = sap.ui.getCore().getModel("appid");
				var app_id = appidoModel.getData();

				var oJsonData = {
					"appid": app_id,
					"Capability": oData
				};
				oJsonData = JSON.stringify(oJsonData);

				this.wasteTime();
		
				var oModel = new sap.ui.model.json.JSONModel();                          
				oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNCapability.xsjs", oJsonData, true, 'POST');
				oModel.attachRequestCompleted(function() {
					this_.runNext();
					var result = oModel.getData();

					if(result == 'success') {
						var oModel_ = new sap.ui.model.json.JSONModel();
						oModel_.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNQ.xsjs?q=2&appid=" + app_id);   
						oModel_.attachRequestCompleted(function() {
							console.log(oModel_.getData());
							this_.getView().setModel(oModel_);
							sap.ui.getCore().setModel(oModel_, "capabilitieslist");
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