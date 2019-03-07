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

    return Controller.extend("ARN.ARN.controller.AppPortfolio", {
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
					var application_id = "-1";
					var target_architecture_date_start = "";
					var target_architecture_date_end = "";
					var project_id = "-1";
					var category_id = "-1";
					var product_owner ="--All Product Owners--";

					var oModel = new sap.ui.model.json.JSONModel();
					oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNQ.xsjs?q=1&appid=" + application_id + "&sd=" + target_architecture_date_start + "&ed=" + target_architecture_date_end + "&pid=" + project_id + "&cid=" + category_id + "&po=" + product_owner);   
			
					oModel.attachRequestCompleted(function() {
						this_.runNext();
						console.log(oModel);
						oView.setModel(oModel);
						oView.bindElement("/");
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

        Search: function(oEvent) {
            var searchValue = oEvent.oSource.mProperties.value;

            var filters = new Array();
            var filter1 = new sap.ui.model.Filter("VENDOR_DESC", sap.ui.model.FilterOperator.Contains, searchValue);
            var filter2 = new sap.ui.model.Filter("PRODUCT_NAME_SHORT", sap.ui.model.FilterOperator.Contains, searchValue);
            var filter3 = new sap.ui.model.Filter("PRODUCT_NAME_CAPTION", sap.ui.model.FilterOperator.Contains, searchValue);
            var filter4 = new sap.ui.model.Filter("PRODUCT_OWNER", sap.ui.model.FilterOperator.Contains, searchValue);
            var filter5 = new sap.ui.model.Filter("HOSTINGTYPE_DESC", sap.ui.model.FilterOperator.Contains, searchValue);
            var filter6 = new sap.ui.model.Filter("CURRENT_ARCHITECTURE", sap.ui.model.FilterOperator.Contains, searchValue);
            var filter7 = new sap.ui.model.Filter("CURRENT_VERSION", sap.ui.model.FilterOperator.Contains, searchValue);

            var oCombinedOr = new sap.ui.model.Filter([filter1, filter2, filter3, filter4, filter5, filter6, filter7]);
            filters.push(oCombinedOr);

            //get list created in view
            this.oList = this.getView().byId("polist");
            this.oList.getBinding("items").filter(filters);
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

		onObjectListItemPress: function(oEvent) {
			var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
			var data = {};
            data.context = oEvent.getSource().getBindingContext();
			var selectedIndex = oBindingContext.sPath.split("/")[1];

			var app_id = data.context.oModel.oData[selectedIndex].APPLICATION_ID;
			console.log("app_id: " + app_id);

			var this_ = this;
			var oModel = new sap.ui.model.json.JSONModel();

            oModel.setData(app_id);
            sap.ui.getCore().setModel(oModel, "appid");
			this.onNavDetail();
		},

		onAddApp: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("addapp", true);
		},

		_getDialog : function() {
                if (!this.dialog) {
                    this.dialog = sap.ui.xmlfragment("idFragment","ARN.ARN.view.FilterDialog", this);

					var oDPtads = sap.ui.core.Fragment.byId("idFragment", "target_architecture_date_start");
					oDPtads.setValueState("None");
					oDPtads.addEventDelegate({
						onAfterRendering: function(){
						var oDateInner = this.$().find('.sapMInputBaseInner');
						var oID = oDateInner[0].id;
						$('#'+oID).attr("disabled", "disabled"); 
					}},oDPtads);

					var oDPtade = sap.ui.core.Fragment.byId("idFragment", "target_architecture_date_end");
					oDPtade.setValueState("None");
					oDPtade.addEventDelegate({
						onAfterRendering: function(){
						var oDateInner = this.$().find('.sapMInputBaseInner');
						var oID = oDateInner[0].id;
						$('#'+oID).attr("disabled", "disabled"); 
					}},oDPtade);

					var this_ = this;
					this.wasteTime();

					var Project_oModel = new sap.ui.model.json.JSONModel();
					Project_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=5");   
					Project_oModel.attachRequestCompleted(function() {
						sap.ui.core.Fragment.byId("idFragment", "project").setModel(Project_oModel);
					});

					var Category_oModel = new sap.ui.model.json.JSONModel();
					Category_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=6");   
					Category_oModel.attachRequestCompleted(function() {
						sap.ui.core.Fragment.byId("idFragment", "category").setModel(Category_oModel);
					});

					var Applications_oModel = new sap.ui.model.json.JSONModel();
					Applications_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=7");   
					Applications_oModel.attachRequestCompleted(function() {
						sap.ui.core.Fragment.byId("idFragment", "application").setModel(Applications_oModel);
					});

					var ProductOwner_oModel = new sap.ui.model.json.JSONModel();
					ProductOwner_oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNService.xsjs?q=8");   
					ProductOwner_oModel.attachRequestCompleted(function() {
						sap.ui.core.Fragment.byId("idFragment", "product_owner").setModel(ProductOwner_oModel);
						this_.runNext();
					});

                }
                return this.dialog;
            },


		onSearchDialog: function(oEvent) {
			this._getDialog().open();
		},

		OncloseDialog : function() {
            this._getDialog().close();
        },

		onFilter: function(oEvent) {
			var this_ = this;

			var target_architecture_date_start = sap.ui.getCore().byId("idFragment--target_architecture_date_start").getValue().trim();
			var target_architecture_date_end = sap.ui.getCore().byId("idFragment--target_architecture_date_end").getValue().trim();
			var project_id = sap.ui.getCore().byId("idFragment--project").getSelectedKey().trim();
			var category_id = sap.ui.getCore().byId("idFragment--category").getSelectedKey().trim();
			var application_id = sap.ui.getCore().byId("idFragment--application").getSelectedKey().trim();
			var product_owner = sap.ui.getCore().byId("idFragment--product_owner").getSelectedKey().trim();

			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy/MM/dd"
			});

			var date_ = new Date(target_architecture_date_start);
			var target_architecture_date_startd = dateFormat.format(date_);
			var date_ = new Date(target_architecture_date_end);
			var target_architecture_date_endd = dateFormat.format(date_);

			console.log(target_architecture_date_startd + ' - ' + target_architecture_date_endd);

			var oView = this.getView();
			var this_ = this;

			this_.wasteTime();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("https://szish1d.pfizer.com:4300/testxsmd/ARNQ.xsjs?q=1&appid=" + application_id + "&sd=" + target_architecture_date_startd + "&ed=" + target_architecture_date_endd + "&pid=" + project_id + "&cid=" + category_id + "&po=" + product_owner);   
			   
			oModel.attachRequestCompleted(function() {
				this_.runNext();
				console.log(oModel);
				oView.setModel(oModel);
				oView.bindElement("/");
				this_._getDialog().close();
			});
		},

		OnClear: function(oEvent) {
			sap.ui.getCore().byId("idFragment--target_architecture_date_start").setValue();
			sap.ui.getCore().byId("idFragment--target_architecture_date_end").setValue();
			sap.ui.getCore().byId("idFragment--project").setSelectedKey("-1");
			sap.ui.getCore().byId("idFragment--category").setSelectedKey("-1");
			sap.ui.getCore().byId("idFragment--application").setSelectedKey("-1");
			sap.ui.getCore().byId("idFragment--product_owner").setSelectedKey("-1");
		},

		onAppPOR: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("app_por", true);
		},

		handleDetailsChange: function (oEvent) {
			var oFrag =  sap.ui.core.Fragment,
				oDTPStart = oFrag.byId("idFragment", "target_architecture_date_start"),
				oDTPEnd = oFrag.byId("idFragment", "target_architecture_date_end"),
				oOKButton = oFrag.byId("idFragment", "OKButton");

			this._validateDateTimePicker(oDTPStart, oDTPEnd);
			this.updateButtonEnabledState(oDTPStart, oDTPEnd, oOKButton);
		},

		_validateDateTimePicker: function (oDateTimePickerStart, oDateTimePickerEnd) {
			var oStartDate = oDateTimePickerStart.getDateValue(),
				oEndDate = oDateTimePickerEnd.getDateValue(),
				sValueStateText = "Start date should be before End date";

			if (oStartDate && oEndDate && oEndDate.getTime() <= oStartDate.getTime()) {
				oDateTimePickerStart.setValueState("Error");
				oDateTimePickerEnd.setValueState("Error");
				oDateTimePickerStart.setValueStateText(sValueStateText);
				oDateTimePickerEnd.setValueStateText(sValueStateText);
			} else {
				oDateTimePickerStart.setValueState("None");
				oDateTimePickerEnd.setValueState("None");
			}
		},

		updateButtonEnabledState: function (oDateTimePickerStart, oDateTimePickerEnd, oButton) {
			var bEnabled = oDateTimePickerStart.getValueState() !== "Error"
				&& oDateTimePickerStart.getValue() !== ""
				&& oDateTimePickerEnd.getValue() !== ""
				&& oDateTimePickerEnd.getValueState() !== "Error";

			oButton.setEnabled(bEnabled );
		},
    });
});