sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
    "sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
    "use strict";

	var _dialog;

	var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
    });

    return Controller.extend("ARN.ARN.controller.EventsSetting", {
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
						console.log(oModel_);
						oView.setModel(oModel_);
						sap.ui.getCore().setModel(oModel_, "eventslist");

						var oLength = oModel_.getData().Event.length;
						var oTable = this_.byId("events");
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

			var oDPsd = oView.byId("startdate");
			oDPsd.addEventDelegate({
				onAfterRendering: function(){
				var oDateInner = this.$().find('.sapMInputBaseInner');
				var oID = oDateInner[0].id;
				$('#'+oID).attr("disabled", "disabled"); 
			}},oDPsd);

			var oDPed = oView.byId("enddate");
			oDPed.addEventDelegate({
				onAfterRendering: function(){
				var oDateInner = this.$().find('.sapMInputBaseInner');
				var oID = oDateInner[0].id;
				$('#'+oID).attr("disabled", "disabled"); 
			}},oDPed);
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
			oModel = sap.ui.getCore().getModel("eventslist");
			console.log(oModel);

			var jsoneventdata = {
				"EVENTYPE": "",
				"STARTDATE": "",
				"ENDDATE": "",
				"EVENT_DESC": ""
			};

			var aNewRecord = oModel.getProperty("/Event");
			aNewRecord.push(jsoneventdata);
			oModel.setProperty("/Event", aNewRecord);

			this.getView().setModel(oModel);

			jQuery.sap.delayedCall(100, null, function() {
				var oLength = oModel.getData().Event.length;
				var oTable = this_.byId("events");
				var oItem = oTable.getItems()[oLength-1];
				var oCells = oItem.getCells();

				for (var j = 0; j < oCells.length; j++) {
					oCells[j].setEditable(true);
				}
			});
        },

		 onEdit: function(oEvent) {
			var oTable = this.byId("events");

			var oSelectedItem = oTable.getSelectedItem();
			if(oSelectedItem !== null) {
				var oCells = oSelectedItem.getCells();
				for (var j = 0; j < oCells.length; j++) {
					oCells[j].setEditable(true);
				}
			}
        },

		onDelete: function(oEvent) {
			var oTable = this.byId("events");

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
				oModel = sap.ui.getCore().getModel("eventslist");
				console.log(oModel.getData());

				var oData = oModel.getData().Event;
				oData.splice(oIndex,1);
				oModel.setProperty("/Event", oData);
				this.getView().setModel(oModel);

				oTable.removeSelections(true);
			} else {
				oTable.removeSelections(true);
				return false;
			}
		},

		onSave: function(oEvent) {	
			var this_ = this;

			var oTable = this.byId("events");
		    var oModel = new sap.ui.model.json.JSONModel();
			oModel = sap.ui.getCore().getModel("eventslist");

			var oLength = oModel.getData().Event.length;
			console.log(oLength);

			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "MM/dd/yyyy"
			})
			var date;
			var startdate;
			var enddate;
			var error = 0;

			for (var i = 0; i <oLength; i++) {
				var oItem = oTable.getItems()[i];
				var oCells = oItem.getCells();

				for (var j = 0; j < oCells.length; j++) {
					oCells[j].setEditable(false);
				
					if(j==1) {
						date = new Date(oCells[j].getValue());
						startdate = dateFormat.format(date);
					}

					if(j==2) {
						date = new Date(oCells[j].getValue());
						enddate = dateFormat.format(date);

						if(Date.parse(enddate) < Date.parse(startdate)) {
							console.log('ERR');
							error = 1;

							oCells[j-1].setValueState("Error");
							oCells[j-1].setEditable(true);
							oCells[j-1].setValueStateText("Start date should be before End date");

							oCells[j].setValueState("Error");
							oCells[j].setEditable(true);
							oCells[j].setValueStateText("Start date should be before End date");
						}
					}

					if(oCells[j].getValue() === "") {
						error = 1;
						oCells[j].setValueState("Error");
						oCells[j].setEditable(true);
						oCells[j].setValueStateText("Field cannot be empty");
					}
				}
			}
						
			if (error == 0) {

				var oData = oModel.getData().Event;
				console.log(oData);

				var oTable = this_.byId("events");
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
					"Event": oData
				};
				oJsonData = JSON.stringify(oJsonData);

				this.wasteTime();
		
				var oModel = new sap.ui.model.json.JSONModel();                          
				oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNEvent.xsjs", oJsonData, true, 'POST');
				oModel.attachRequestCompleted(function() {
					this_.runNext();
					var result = oModel.getData();
					console.log(result);

					if(result == 'success') {

						var oModel_ = new sap.ui.model.json.JSONModel();
						oModel_.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNQ.xsjs?q=2&appid=" + app_id);   
						oModel_.attachRequestCompleted(function() {
							console.log(oModel_.getData());
							this_.getView().setModel(oModel_);
							sap.ui.getCore().setModel(oModel_, "eventslist");
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