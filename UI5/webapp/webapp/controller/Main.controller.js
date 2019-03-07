sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("ARN.ARN.controller.Main", {

        onInit: function(evt) {       	
            var oModelMenuTiles = this.getOwnerComponent().getModel("MenuTilesModel");
            this.getView().byId("menutilescontainerAS").setModel(oModelMenuTiles);			
        },


		onAfterRendering: function() {
		},


        handlePress: function(oEvent) {
            var sPath = oEvent.getSource().getBindingContext().getPath();
			var oModel = this.getView().byId("menutilescontainerAS").getModel();
			var oContext = oModel.getProperty(sPath);

			if(oContext.contenttext == "Application Portfolio")
				this.onNavToFeedback();

			if(oContext.contenttext == "Project")
				this.onNavToFavorite();

        },

		onNavToFeedback: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("app_portfolio", true);
		},
		
		onNavToFavorite: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("project", true);
		},
    });
});