sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter",
    "sap/m/MessageToast"
], function(Controller, Filter, Sorter, MessageToast) {
    "use strict";

	var _dialog;

	var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
    });

    return Controller.extend("ARN.ARN.controller.AppOverview", {
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
					});
				}
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
	
		onEdit: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("editapp", true);
		},

		onSortCapabilities: function (oEvent) {
			this.bDescending = !this.bDescending;
			this.fnApplyFiltersAndOrderingCapabilities();
		},

		onGroupCapabilities: function (oEvent){
			this.bGrouped = !this.bGrouped;
			this.fnApplyFiltersAndOrderingCapabilities();
		},

		onFilterCapabilities: function (oEvent) {
			this.sSearchQuery = oEvent.getSource().getValue();
			this.fnApplyFiltersAndOrderingCapabilities();
		},

		fnApplyFiltersAndOrderingCapabilities: function (oEvent){
			var aFilters = [],
				aSorters = [];

			if (this.bGrouped) {
				aSorters.push(new Sorter("CAPABILITYSTATUS", this.bDescending, this._fnGroup));
			} else {
				aSorters.push(new Sorter("CAPABILITY", this.bDescending));
			}

			if (this.sSearchQuery) {
				var filters = new Array();
				var filter1 = new sap.ui.model.Filter("CAPABILITY", sap.ui.model.FilterOperator.Contains, this.sSearchQuery);
				var filter2 = new sap.ui.model.Filter("CAPABILITYOWNER", sap.ui.model.FilterOperator.Contains, this.sSearchQuery);
				var filter3 = new sap.ui.model.Filter("CAPABILITYSTATUS", sap.ui.model.FilterOperator.EQ, this.sSearchQuery);
				var filter4 = new sap.ui.model.Filter("TARGET_ARCHITECTURE_DATE", sap.ui.model.FilterOperator.Contains, this.sSearchQuery);

				var oCombinedOr = new sap.ui.model.Filter([filter1, filter2, filter3, filter4]);
				aFilters.push(oCombinedOr);
			}

			this.byId("application_overview_capabilities").getBinding("items").filter(aFilters).sort(aSorters);
		},

		onSortEvents: function (oEvent) {
			this.bDescending = !this.bDescending;
			this.fnApplyFiltersAndOrderingEvents();
		},

		onGroupEvents: function (oEvent){
			this.bGrouped = !this.bGrouped;
			this.fnApplyFiltersAndOrderingEvents();
		},

		onFilterEvents: function (oEvent) {
			this.sSearchQuery = oEvent.getSource().getValue();
			this.fnApplyFiltersAndOrderingEvents();
		},

		fnApplyFiltersAndOrderingEvents: function (oEvent){
			var aFilters = [],
				aSorters = [];

			if (this.bGrouped) {
				aSorters.push(new Sorter("EVENTTYPE", this.bDescending, this._fnGroup));
			} else {
				aSorters.push(new Sorter("EVENTTYPE", this.bDescending));
			}

			if (this.sSearchQuery) {
				var filters = new Array();
				var filter1 = new sap.ui.model.Filter("EVENTTYPE", sap.ui.model.FilterOperator.Contains, this.sSearchQuery);
				var filter2 = new sap.ui.model.Filter("STARTDATE", sap.ui.model.FilterOperator.Contains, this.sSearchQuery);
				var filter3 = new sap.ui.model.Filter("ENDDATE", sap.ui.model.FilterOperator.Contains, this.sSearchQuery);
				var filter4 = new sap.ui.model.Filter("EVENT_DESC", sap.ui.model.FilterOperator.Contains, this.sSearchQuery);

				var oCombinedOr = new sap.ui.model.Filter([filter1, filter2, filter3, filter4]);
				aFilters.push(oCombinedOr);
			}

			this.byId("application_overview_events").getBinding("items").filter(aFilters).sort(aSorters);
		},

		onSettingCapabilities: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("capabilities_setting", true);
		},

		onSettingEvents: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("events_setting", true);
		},

    });
});