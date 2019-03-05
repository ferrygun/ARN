sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    "use strict";

    var _dialog;

    var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({});

    return Controller.extend("ARN.ARN.controller.Add", {
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

        onNavButtonTo: function(evt) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("edit", true);
        },

        _onCancel: function(oEvent) {
            var this_ = this;

          
        },

        _onSave: function(oEvent) {
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
        },

    });
});