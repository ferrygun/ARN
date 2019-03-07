sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    "use strict";

    var _dialog;

    var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({});

    return Controller.extend("ARN.ARN.controller.AddApp", {
        onInit: function() {
            var oView = this.getView();
            var this_ = this;

            this.getView().addEventDelegate({
                onBeforeShow: function(evt) {
					this_.wasteTime();

                    var Category_oModel = new sap.ui.model.json.JSONModel();
                    Category_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=1");
                    Category_oModel.attachRequestCompleted(function() {
						console.log(Category_oModel);
                        this_.getView().byId("selectCategory").setModel(Category_oModel);
                    });

                    var LOB_oModel = new sap.ui.model.json.JSONModel();
                    LOB_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=2");
                    LOB_oModel.attachRequestCompleted(function() {
                        this_.getView().byId("selectLOB").setModel(LOB_oModel);
                    });

                    var HostingType_oModel = new sap.ui.model.json.JSONModel();
                    HostingType_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=3");
                    HostingType_oModel.attachRequestCompleted(function() {
                        this_.getView().byId("selectHostingType").setModel(HostingType_oModel);
                    });

                    var Vendor_oModel = new sap.ui.model.json.JSONModel();
                    Vendor_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=4");
                    Vendor_oModel.attachRequestCompleted(function() {
                        this_.getView().byId("selectVendor").setModel(Vendor_oModel);
                        this_.runNext();
                    });

					var oButton = this_.getView().byId("OKButton");
					oButton.setEnabled(false);

					oView.byId("app_id").setValueState("None");
					oView.byId("product_name_short").setValueState("None");
					oView.byId("product_name_long").setValueState("None");
					oView.byId("product_name_caption").setValueState("None");
					oView.byId("executive_summary").setValueState("None");
					oView.byId("target_upgrade_cycle").setValueState("None");
					oView.byId("product_owner").setValueState("None");
					oView.byId("current_architecture").setValueState("None");
					oView.byId("current_version").setValueState("None");
					oView.byId("end_of_maintenance_date").setValueState("None");
					oView.byId("last_architecture_review_date").setValueState("None");
					oView.byId("target_architecture").setValueState("None");
					oView.byId("target_version").setValueState("None");
					oView.byId("notes").setValueState("None");
					oView.byId("application_function").setValueState("None");
                },

            });

			var oDPeomd = oView.byId("end_of_maintenance_date");
			oDPeomd.addEventDelegate({
				onAfterRendering: function(){
				var oDateInner = this.$().find('.sapMInputBaseInner');
				var oID = oDateInner[0].id;
				$('#'+oID).attr("disabled", "disabled"); 
			}},oDPeomd);

			var oDPlard = oView.byId("last_architecture_review_date");
			oDPeomd.addEventDelegate({
				onAfterRendering: function(){
				var oDateInner = this.$().find('.sapMInputBaseInner');
				var oID = oDateInner[0].id;
				$('#'+oID).attr("disabled", "disabled"); 
			}},oDPlard);		
			
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
            this.getView().byId("app_id").setValue();
            this.getView().byId("product_name_short").setValue();
            this.getView().byId("product_name_caption").setValue();
			this.getView().byId("product_name_long").setValue();
            this.getView().byId("selectVendor").setSelectedKey();
			this.getView().byId("product_owner").setValue();
			this.getView().byId("selectHostingType").setSelectedKey();
			this.getView().byId("selectCategory").setSelectedKey();
            this.getView().byId("selectLOB").setSelectedKey();
 			this.getView().byId("current_architecture").setValue();
            this.getView().byId("current_version").setValue();
            this.getView().byId("target_architecture").setValue();
            this.getView().byId("target_version").setValue();
			this.getView().byId("notes").setValue();
			this.getView().byId("last_architecture_review_date").setValue();
			this.getView().byId("end_of_maintenance_date").setValue();
			this.getView().byId("target_upgrade_cycle").setValue();
            this.getView().byId("executive_summary").setValue();
			this.getView().byId("application_function").setValue();

			var oButton = this.getView().byId("OKButton");
			oButton.setEnabled(false);
        },

        onSave: function(oEvent) {
            var this_ = this;

			var app_id = this.getView().byId("app_id").getValue().trim();
            var product_name_short = this.getView().byId("product_name_short").getValue().trim();
            var product_name_caption = this.getView().byId("product_name_caption").getValue().trim();
			var product_name_long = this.getView().byId("product_name_long").getValue().trim();
            var vendor_id = this.getView().byId("selectVendor").getSelectedKey().trim();
			var product_owner = this.getView().byId("product_owner").getValue().trim();
			var hosting_type_id = this.getView().byId("selectHostingType").getSelectedKey().trim();
			var category_id = this.getView().byId("selectCategory").getSelectedKey().trim();
            var lob_id = this.getView().byId("selectLOB").getSelectedKey().trim();
 			var current_architecture = this.getView().byId("current_architecture").getValue().trim();
            var current_version = this.getView().byId("current_version").getValue().trim();
            var target_architecture = this.getView().byId("target_architecture").getValue().trim();
            var target_version = this.getView().byId("target_version").getValue().trim();
			var notes = this.getView().byId("notes").getValue().trim();
			var last_architecture_review_date = this.getView().byId("last_architecture_review_date").getValue().trim();
			var end_of_maintenance_date = this.getView().byId("end_of_maintenance_date").getValue().trim();
			var target_upgrade_cycle = this.getView().byId("target_upgrade_cycle").getValue().trim();
            var executive_summary = this.getView().byId("executive_summary").getValue().trim();
			var application_function = this.getView().byId("application_function").getValue().trim();
            
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "yyyy-MM-dd"
            });
            var date = new Date(last_architecture_review_date);
			last_architecture_review_date = dateFormat.format(date);

			date = new Date(end_of_maintenance_date);
            end_of_maintenance_date = dateFormat.format(date);

            var oJsonData = {
				"appid": app_id,
				"pns": product_name_short, 
				"pnc": product_name_caption, 
				"pnl": product_name_long, 
				"vid": vendor_id, 
				"po": product_owner,
				"htid": hosting_type_id,
				"cid": category_id,
				"lobid": lob_id, 
				"ca": current_architecture, 
				"cv": current_version, 
				"ta": target_architecture,
				"tv": target_version, 
				"not": notes, 
				"lard": last_architecture_review_date, 
				"cveom": end_of_maintenance_date, 
				"tuc": target_upgrade_cycle, 
				"es": executive_summary, 
				"af": application_function, 
            };

			if(app_id === "") {
				jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show(jQuery.sap.resources({
					url: "i18n/i18n.properties"
                }).getText("03_ERROR_MSG"), {
					icon: sap.m.MessageBox.Icon.INFORMATION,
                    title: this_.getView().getModel("i18n").getResourceBundle().getText("WELCOME_TITLE"),
                    actions: sap.m.MessageBox.Action.OK,
                    onClose: null,
                    //styleClass: ""                        
                });
			} if(app_id.length < 2 || app_id.length >= 5) {
				jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show(jQuery.sap.resources({
					url: "i18n/i18n.properties"
                }).getText("04_ERROR_MSG"), {
					icon: sap.m.MessageBox.Icon.INFORMATION,
                    title: this_.getView().getModel("i18n").getResourceBundle().getText("WELCOME_TITLE"),
                    actions: sap.m.MessageBox.Action.OK,
                    onClose: null,
                    //styleClass: ""                        
                });
			} else {
			
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNA.xsjs", oJsonData, true, 'POST');
				oModel.attachRequestCompleted(function() {
					var result = oModel.getData();
					if (result == 'success') {

						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(jQuery.sap.resources({
							url: "i18n/i18n.properties"
						}).getText("ADD_SUCCESS_MSG"), {
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
			}
        },

		handleDetailsChange: function (oEvent) {
			var sValueStateText = "field cannot be empty";
			var oButton = this.getView().byId("OKButton");
			var err = 0;

			if(this.getView().byId("app_id").getValue() === "" || this.getView().byId("app_id").getValue().length < 2 || this.getView().byId("app_id").getValue().length >= 5) {
				this.getView().byId("app_id").setValueState("Error");
				this.getView().byId("app_id").setValueStateText("Enter valid entry");
				err = 1;
			} else 
				this.getView().byId("app_id").setValueState("None");

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

			if(this.getView().byId("last_architecture_review_date").getValue() === "") {
				this.getView().byId("last_architecture_review_date").setValueState("Error");
				this.getView().byId("last_architecture_review_date").setValueStateText(sValueStateText);
				err = 1;
			} else 
				this.getView().byId("last_architecture_review_date").setValueState("None");

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