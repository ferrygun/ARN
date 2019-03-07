sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    "use strict";

	var _dialog;

	var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
    });

    return Controller.extend("ARN.ARN.controller.EditApp", {
        onInit: function() {
            var oView = this.getView();
   			var this_ = this;
			
            this.getView().addEventDelegate({
				onBeforeShow: function(evt) {
					
					this_.wasteTime();

					var oModel = new sap.ui.model.json.JSONModel();
					oModel = sap.ui.getCore().getModel("appid");

					var app_id = oModel.getData();

					var oModel_ = new sap.ui.model.json.JSONModel();
					oModel_.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNQ.xsjs?q=2&appid=" + app_id);   
		   
					oModel_.attachRequestCompleted(function() {
						console.log(oModel_);
						oView.setModel(oModel_);
	
						var categoryidx = oModel_.getData().Summary[0].CATEGORY_ID;
						var Category_oModel = new sap.ui.model.json.JSONModel();
						Category_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=1");   
						Category_oModel.attachRequestCompleted(function() {
							this_.getView().byId("selectCategory").setModel(Category_oModel);
							this_.getView().byId("selectCategory").setSelectedKey(categoryidx);
						});
						
						var lobidx = oModel_.getData().Summary[0].LINEOFBUSINESS_ID;
						var LOB_oModel = new sap.ui.model.json.JSONModel();
						LOB_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=2");   
						LOB_oModel.attachRequestCompleted(function() {
							this_.getView().byId("selectLOB").setModel(LOB_oModel);
							this_.getView().byId("selectLOB").setSelectedKey(lobidx);
						});

						var hostingtypeidx = oModel_.getData().Summary[0].HOSTING_TYPE_ID;
						var HostingType_oModel = new sap.ui.model.json.JSONModel();
						HostingType_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=3");   
						HostingType_oModel.attachRequestCompleted(function() {
							this_.getView().byId("selectHostingType").setModel(HostingType_oModel);
							this_.getView().byId("selectHostingType").setSelectedKey(hostingtypeidx)
						});

						var vendorididx = oModel_.getData().Summary[0].VENDOR_ID;
						var Vendor_oModel = new sap.ui.model.json.JSONModel();
						Vendor_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=4");   
						Vendor_oModel.attachRequestCompleted(function() {
							this_.getView().byId("selectVendor").setModel(Vendor_oModel);
							this_.getView().byId("selectVendor").setSelectedKey(vendorididx);
							this_.runNext();
						});
					});
				},
			});

			var oDPeomd = oView.byId("end_of_maintenance_date");
			oDPeomd.addEventDelegate({
				onAfterRendering: function(){
				var oDateInner = this.$().find('.sapMInputBaseInner');
				var oID = oDateInner[0].id;
				$('#'+oID).attr("disabled", "disabled"); 
			}},oDPeomd);
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
	
		onCancel: function(oEvent) {
			var this_ = this;

			this_.wasteTime();

			var oModel = new sap.ui.model.json.JSONModel();
			oModel = sap.ui.getCore().getModel("appid");
			var app_id = oModel.getData();
	
			var oModel_ = new sap.ui.model.json.JSONModel();
			oModel_.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNQ.xsjs?q=2&appid=" + app_id);   
			oModel_.attachRequestCompleted(function() {
				console.log(oModel_.getData());
				this_.getView().setModel(oModel_);

				var categoryidx = oModel_.getData().Summary[0].CATEGORY_ID;
				var Category_oModel = new sap.ui.model.json.JSONModel();
				Category_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=1");   
				Category_oModel.attachRequestCompleted(function() {
					this_.getView().byId("selectCategory").setModel(Category_oModel);
					this_.getView().byId("selectCategory").setSelectedKey(categoryidx);
				});
						
				var lobidx = oModel_.getData().Summary[0].LINEOFBUSINESS_ID;
				var LOB_oModel = new sap.ui.model.json.JSONModel();
				LOB_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=2");   
				LOB_oModel.attachRequestCompleted(function() {
					this_.getView().byId("selectLOB").setModel(LOB_oModel);
					this_.getView().byId("selectLOB").setSelectedKey(lobidx);
				});

				var hostingtypeidx = oModel_.getData().Summary[0].HOSTING_TYPE_ID;
				var HostingType_oModel = new sap.ui.model.json.JSONModel();
				HostingType_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=3");   
				HostingType_oModel.attachRequestCompleted(function() {
					this_.getView().byId("selectHostingType").setModel(HostingType_oModel);
					this_.getView().byId("selectHostingType").setSelectedKey(hostingtypeidx)
				});

				var vendorididx = oModel_.getData().Summary[0].VENDOR_ID;
				var Vendor_oModel = new sap.ui.model.json.JSONModel();
				Vendor_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=4");   
				Vendor_oModel.attachRequestCompleted(function() {
					this_.getView().byId("selectVendor").setModel(Vendor_oModel);
					this_.getView().byId("selectVendor").setSelectedKey(vendorididx);
					this_.runNext();
				});
			});
			
			this.getView().byId("product_name_short").setValueState("None");
			this.getView().byId("product_name_long").setValueState("None");
			this.getView().byId("product_name_caption").setValueState("None");
			this.getView().byId("executive_summary").setValueState("None");
			this.getView().byId("target_upgrade_cycle").setValueState("None");
			this.getView().byId("product_owner").setValueState("None");
			this.getView().byId("current_architecture").setValueState("None");
			this.getView().byId("current_version").setValueState("None");
			this.getView().byId("end_of_maintenance_date").setValueState("None");
			this.getView().byId("target_architecture").setValueState("None");
			this.getView().byId("target_version").setValueState("None");
			this.getView().byId("notes").setValueState("None");
			this.getView().byId("application_function").setValueState("None");

			var oButton = this.getView().byId("OKButton");
			oButton.setEnabled(true);
		},

		onSave: function(oEvent) {
			var this_ = this;

			var product_name_short = this.getView().byId("product_name_short").getValue().trim();
			var product_name_long = this.getView().byId("product_name_long").getValue().trim();
			var product_name_caption = this.getView().byId("product_name_caption").getValue().trim();
			var category_id = this.getView().byId("selectCategory").getSelectedKey().trim();
			var lob_id = this.getView().byId("selectLOB").getSelectedKey().trim();
			var hosting_type_id = this.getView().byId("selectHostingType").getSelectedKey().trim();
			var executive_summary = this.getView().byId("executive_summary").getValue().trim();
			var target_upgrade_cycle = this.getView().byId("target_upgrade_cycle").getValue().trim();
			var product_owner = this.getView().byId("product_owner").getValue().trim();
			var vendor_id = this.getView().byId("selectVendor").getSelectedKey().trim();
			var current_architecture = this.getView().byId("current_architecture").getValue().trim();
			var current_version = this.getView().byId("current_version").getValue().trim();
			var end_of_maintenance_date = this.getView().byId("end_of_maintenance_date").getValue().trim();
			var target_architecture = this.getView().byId("target_architecture").getValue().trim();
			var target_version = this.getView().byId("target_version").getValue().trim();
			var notes = this.getView().byId("notes").getValue().trim();
			var application_function = this.getView().byId("application_function").getValue().trim();

			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }); 
			var date = new Date(end_of_maintenance_date);
			end_of_maintenance_date = dateFormat.format(date);

			var oModel = new sap.ui.model.json.JSONModel();
			oModel = sap.ui.getCore().getModel("appid");
			var app_id = oModel.getData();

			var oJsonData = {
				"appid": app_id,
				"pns": product_name_short,
				"pnl": product_name_long,
				"pnc": product_name_caption,
				"cid": category_id,
				"lobid": lob_id,
				"htid": hosting_type_id,
				"es": executive_summary,
				"tuc": target_upgrade_cycle,
				"po": product_owner,
				"vid": vendor_id,
				"ca": current_architecture,
				"cv": current_version,
				"eod": end_of_maintenance_date,
				"ta": target_architecture,
				"tv": target_version,
				"not": notes,
				"af": application_function
			};

			this.wasteTime();
			var oModel = new sap.ui.model.json.JSONModel();                          
            oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNU.xsjs", oJsonData, true, 'POST');
			oModel.attachRequestCompleted(function() {
				this_.runNext();
				var result = oModel.getData();
				if(result == 'success') {

					var oModel_ = new sap.ui.model.json.JSONModel();
					oModel_.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNQ.xsjs?q=2&appid=" + app_id);   
					oModel_.attachRequestCompleted(function() {
						console.log(oModel_.getData());
						this_.getView().setModel(oModel_);
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
		},

		handleDetailsChange: function (oEvent) {
			var sValueStateText = "field cannot be empty";
			var oButton = this.getView().byId("OKButton");
			var err = 0;

			if(this.getView().byId("product_name_short").getValue() === "") {
				this.getView().byId("product_name_short").setValueState("Error");
				this.getView().byId("product_name_short").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("product_name_short").setValueState("None");
			
			 
			if(this.getView().byId("product_name_long").getValue() === "") {
				this.getView().byId("product_name_long").setValueState("Error");
				this.getView().byId("product_name_long").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("product_name_long").setValueState("None");
			
			if(this.getView().byId("product_name_caption").getValue() === "") {
				this.getView().byId("product_name_caption").setValueState("Error");
				this.getView().byId("product_name_caption").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("product_name_caption").setValueState("None");

			if(this.getView().byId("executive_summary").getValue() === "") {
				this.getView().byId("executive_summary").setValueState("Error");
				this.getView().byId("executive_summary").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("executive_summary").setValueState("None");

			if(this.getView().byId("target_upgrade_cycle").getValue() === "") {
				this.getView().byId("target_upgrade_cycle").setValueState("Error");
				this.getView().byId("target_upgrade_cycle").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("target_upgrade_cycle").setValueState("None");

			if(this.getView().byId("product_owner").getValue() === "") {
				this.getView().byId("product_owner").setValueState("Error");
				this.getView().byId("product_owner").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("product_owner").setValueState("None");

			if(this.getView().byId("current_architecture").getValue() === "") {
				this.getView().byId("current_architecture").setValueState("Error");
				this.getView().byId("current_architecture").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("current_architecture").setValueState("None");

			if(this.getView().byId("current_version").getValue() === "") {
				this.getView().byId("current_version").setValueState("Error");
				this.getView().byId("current_version").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("current_version").setValueState("None");

			if(this.getView().byId("end_of_maintenance_date").getValue() === "") {
				this.getView().byId("end_of_maintenance_date").setValueState("Error");
				this.getView().byId("end_of_maintenance_date").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("end_of_maintenance_date").setValueState("None");

			if(this.getView().byId("target_architecture").getValue() === "") {
				this.getView().byId("target_architecture").setValueState("Error");
				this.getView().byId("target_architecture").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("target_architecture").setValueState("None");

			if(this.getView().byId("target_version").getValue() === "") {
				this.getView().byId("target_version").setValueState("Error");
				this.getView().byId("target_version").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("target_version").setValueState("None");

			if(this.getView().byId("notes").getValue() === "") {
				this.getView().byId("notes").setValueState("Error");
				this.getView().byId("notes").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("notes").setValueState("None");

			if(this.getView().byId("application_function").getValue() === "") {
				this.getView().byId("application_function").setValueState("Error");
				this.getView().byId("application_function").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("application_function").setValueState("None");

			if(err === 1) 
				oButton.setEnabled(false);
			else
				oButton.setEnabled(true);
		},

    });
});