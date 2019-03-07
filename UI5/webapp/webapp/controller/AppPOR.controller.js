sap.ui.define([
	"sap/ui/core/mvc/Controller", 
	"sap/ui/core/Fragment",
	"sap/m/MessageToast", 
	"./Formatter"
], 	function(Controller, Fragment, MessageToast) {
    "use strict";

	var _dialog;

	var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
    });

    return Controller.extend("ARN.ARN.controller.AppPOR", {
        handleRouteMatched: function(oEvent) {
            var oParams = {};

            if (oEvent.mParameters.data.context) {
                this.sContext = oEvent.mParameters.data.context;
                var oPath;
                if (this.sContext) {
                    oPath = {
                        path: "/" + this.sContext,
                        parameters: oParams
                    };
                    this.getView().bindObject(oPath);
                }
            }
        },

        onInit: function() {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oView = this.getView();
			var this_ = this;

			this.getView().addEventDelegate({
                onBeforeShow: function(evt) {

					this_.wasteTime();

					var startDate = new Date();
					console.log(startDate);

					var oModel = new sap.ui.model.json.JSONModel();
					oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNPOR.xsjs");   
		   
					oModel.attachRequestCompleted(function() {
						this_.runNext();
						console.log(oModel);

						 var oModel1 = new sap.ui.model.json.JSONModel();
						oModel1.setData({
							modelData: [oModel.getData()],
							startDate: startDate
                        });

						oView.setModel(oModel1);
						console.log(oModel1);
						//oView.bindElement("/Result");
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

        
        doNavBack: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("home", true);
        },

		doNavHome: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("home", true);
        },

		onNavDetail: function (evt) {
		 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("app_overview", true);
		},

		onNavPortfolio: function (evt) {
		 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("app_portfolio", true);
		},

		

		
    });
});