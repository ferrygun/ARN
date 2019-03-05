function close(closables) {
    var closable;
    var i;
    for (i = 0; i < closables.length; i++) {
        closable = closables[i];
        if (closable) {
            closable.close();
        }
    }
}

function getListAppPortoFolio(StartDate, EndDate, Project_ID, Category_ID, Application_ID, Product_Owner) {
	var query = "Select Distinct \"APPLICATION_ID\", " +
    			"\"PRODUCT_NAME_SHORT\", " +
			    "\"PRODUCT_NAME_CAPTION\", " +
			    "\"VENDOR_DESC\", " +
			    "\"PRODUCT_OWNER\", " +
			    "\"HOSTINGTYPE_DESC\", " +
			    "\"CURRENT_ARCHITECTURE\", " +
			    "\"CURRENT_VERSION\" " +
			    "From  \"Common_Basis\".\"z_applications\", \"Common_Basis\".\"z_hostingtypes\", \"Common_Basis\".\"z_vendor\",  \"Common_Basis\".\"z_projects\", \"Common_Basis\".\"z_capabilities\", \"Common_Basis\".\"z_category\"  " +
			    "Where \"Common_Basis\".\"z_applications\".\"HOSTING_TYPE_ID\" = \"Common_Basis\".\"z_hostingtypes\".\"ID\" " + 
			    "And \"Common_Basis\".\"z_applications\".\"VENDOR_ID\" = \"Common_Basis\".\"z_vendor\".\"ID\" " +
			    "And \"Common_Basis\".\"z_applications\".\"APPLICATION_ID\" = \"Common_Basis\".\"z_projects\".\"APPLICATIONS_ID\" " +
			    "And \"Common_Basis\".\"z_applications\".\"CATEGORY_ID\" = \"Common_Basis\".\"z_category\".\"ID\" ";
			    
	
	if(Project_ID !== "-1") {
		query = query + "And \"Common_Basis\".\"z_projects\".\"ID\" = '" + Project_ID + "' ";
	}
	
	if(Application_ID !== "-1") {
		query = query + "And \"Common_Basis\".\"z_applications\".\"APPLICATION_ID\" = '" + Application_ID + "' ";
	}
	
	if(Category_ID !== "-1") {
		query = query + "And \"Common_Basis\".\"z_category\".\"ID\" = '" + Category_ID + "' ";
	}
	
	if(Product_Owner !== "--All Product Owners--") {
		 query = query + "And \"Common_Basis\".\"z_applications\".\"PRODUCT_OWNER\" = '" + Product_Owner + "' ";
	}
		       
	if(StartDate !== "" && EndDate !== "") {
		query = query + "And \"Common_Basis\".\"z_capabilities\".\"TARGET_ARCHITECTURE_DATE\" Between '" + StartDate + "' and '" + EndDate + "' ";
	}
	
	query = query + "Order by  \"PRODUCT_NAME_SHORT\" Asc";
	
	var AppPortoFolioList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var AppPortoFolio;

        while (resultSet.next()) {
            AppPortoFolio = {};
            AppPortoFolio.APPLICATION_ID = resultSet.getString(1);
            AppPortoFolio.PRODUCT_NAME_SHORT = resultSet.getString(2);
			AppPortoFolio.PRODUCT_NAME_CAPTION = resultSet.getString(3);
			AppPortoFolio.VENDOR_DESC = resultSet.getString(4);
			AppPortoFolio.PRODUCT_OWNER = resultSet.getString(5);
			AppPortoFolio.HOSTINGTYPE_DESC = resultSet.getString(6);
			AppPortoFolio.CURRENT_ARCHITECTURE = resultSet.getString(7);
			AppPortoFolio.CURRENT_VERSION = resultSet.getString(8);

            AppPortoFolioList.push(AppPortoFolio);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return AppPortoFolioList;
}

function getEvent(Application_ID) {
	var query = "Select \"EVENTTYPE\", \"STARTDATE\", \"ENDDATE\", \"EVENT_DESC\" " +
				"From \"Common_Basis\".\"z_event\" " + 
				"Where  \"Common_Basis\".\"z_event\".\"APPLICATIONS_ID\" = '" + Application_ID + "'";
	
    var EventList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var Event;

        while (resultSet.next()) {
            Event = {};
            Event.EVENTTYPE = resultSet.getString(1);
			Event.STARTDATE = resultSet.getString(2);
			Event.ENDDATE = resultSet.getString(3);
			Event.EVENT_DESC = resultSet.getString(4);

            EventList.push(Event);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return EventList;
}

function getSummary(Application_ID) {
	var query = "Select \"APPLICATION_ID\", " +
	            "\"PRODUCT_NAME_SHORT\", " +
	            "\"PRODUCT_NAME_CAPTION\", " +
	            "\"PRODUCT_NAME_LONG\", " +
	            "\"VENDOR_DESC\", " +
	            "\"VENDOR_ID\", " +
	            "\"PRODUCT_OWNER\", " +
	            "\"HOSTINGTYPE_DESC\", " +
	            "\"HOSTING_TYPE_ID\", " +
	            "\"CATEGORY_DESC\", " +
	            "\"CATEGORY_ID\", " +
				"\"LINEOFBUSINESS_DESC\", " +
				"\"Common_Basis\".\"z_lineofbusiness\".\"ID\", " +
	            "\"CURRENT_ARCHITECTURE\", " +
	            "\"CURRENT_VERSION\", " +
	            "\"TARGET_ARCHITECTURE\", " +
	            "\"TARGET_VERSION\", " +
	            "\"NOTES\", " +
	            "\"LAST_ARCHITECTURE_REVIEW_DATE\", " +
	            "\"CURRENT_VERSION_END_OF_MAINTENANCE\", " +
	            "\"TARGET_UPGRADE_CYCLE\", " +
				"\"EXECUTIVE_SUMMARY\", " +
				"\"APPLICATION_FUNCTION\" " +
	            "From  \"Common_Basis\".\"z_applications\", \"Common_Basis\".\"z_hostingtypes\", \"Common_Basis\".\"z_vendor\", \"Common_Basis\".\"z_category\", \"Common_Basis\".\"z_lineofbusiness\" " +
	            "Where \"Common_Basis\".\"z_applications\".\"HOSTING_TYPE_ID\" = \"Common_Basis\".\"z_hostingtypes\".\"ID\" " + 
	            "And \"Common_Basis\".\"z_applications\".\"VENDOR_ID\" = \"Common_Basis\".\"z_vendor\".\"ID\" " + 
				"And \"Common_Basis\".\"z_applications\".\"CATEGORY_ID\" = \"Common_Basis\".\"z_category\".\"ID\" " +
				"And \"Common_Basis\".\"z_applications\".\"LINE_OF_BUSINESS_ID\" = \"Common_Basis\".\"z_lineofbusiness\".\"ID\" " +
				"And \"Common_Basis\".\"z_applications\".\"APPLICATION_ID\" = '" + Application_ID + "'";
	
    var SummaryList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var Summary;

        while (resultSet.next()) {
            Summary = {};
            Summary.APPLICATION_ID = resultSet.getString(1);
			Summary.PRODUCT_NAME_SHORT = resultSet.getString(2);
			Summary.PRODUCT_NAME_CAPTION = resultSet.getString(3);
			Summary.PRODUCT_NAME_LONG = resultSet.getString(4);
			Summary.VENDOR_DESC = resultSet.getString(5);
			Summary.VENDOR_ID = resultSet.getString(6);
			Summary.PRODUCT_OWNER = resultSet.getString(7);
			Summary.HOSTINGTYPE_DESC = resultSet.getString(8);
			Summary.HOSTING_TYPE_ID = resultSet.getString(9);
			Summary.CATEGORY_DESC = resultSet.getString(10);
			Summary.CATEGORY_ID = resultSet.getString(11);			
			Summary.LINEOFBUSINESS_DESC = resultSet.getString(12);
			Summary.LINEOFBUSINESS_ID = resultSet.getString(13);
			Summary.CURRENT_ARCHITECTURE = resultSet.getString(14);
			Summary.CURRENT_VERSION = resultSet.getString(15);
			Summary.TARGET_ARCHITECTURE = resultSet.getString(16);
			Summary.TARGET_VERSION = resultSet.getString(17);
			Summary.NOTES = resultSet.getString(18);
			Summary.LAST_ARCHITECTURE_REVIEW_DATE = resultSet.getString(19);
			Summary.CURRENT_VERSION_END_OF_MAINTENANCE = resultSet.getString(20);
			Summary.TARGET_UPGRADE_CYCLE = resultSet.getString(21);
			Summary.EXECUTIVE_SUMMARY = resultSet.getString(22);
			Summary.APPLICATION_FUNCTION = resultSet.getString(23);
			

            SummaryList.push(Summary);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return SummaryList;
}

function getCapability(Application_ID) {
	var query = "Select \"ID\", \"CAPABILITY\", \"CAPABILITYOWNER\", \"CAPABILITYSTATUS\",  \"TARGET_ARCHITECTURE_DATE\" " +
				"From \"Common_Basis\".\"z_capabilities\" " + 
				"Where  \"Common_Basis\".\"z_capabilities\".\"APPLICATIONS_ID\" = '" + Application_ID + "'";
	
    var CapabilityList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var Capability;

        while (resultSet.next()) {
            Capability = {};
            Capability.ID = resultSet.getString(1);
            Capability.CAPABILITY = resultSet.getString(2);
			Capability.CAPABILITYOWNER = resultSet.getString(3);
			Capability.CAPABILITYSTATUS = resultSet.getString(4);
			Capability.TARGET_ARCHITECTURE_DATE = resultSet.getString(5);
						
            CapabilityList.push(Capability);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return CapabilityList;
}

function getQueryVariable(querystr, variable) {
    var query = querystr;
    var vars = query.split('&');
    var i; 
    var pair;
    for (i = 0; i < vars.length; i++) {
        pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var paramID = $.request.parameters.get('q');

if (paramID === '1')  {
	var appid =  $.request.parameters.get('appid');
	var StartDate =  $.request.parameters.get('sd');
	var EndDate = $.request.parameters.get('ed'); 
	var Project_ID = $.request.parameters.get('pid');
	var Category_ID = $.request.parameters.get('cid');
	var Application_ID = $.request.parameters.get('appid');
	var Product_Owner = $.request.parameters.get('po');
	
	var query = "Select Distinct \"APPLICATION_ID\", " +
				"\"PRODUCT_NAME_SHORT\", " +
			    "\"PRODUCT_NAME_CAPTION\", " +
			    "\"VENDOR_DESC\", " +
			    "\"PRODUCT_OWNER\", " +
			    "\"HOSTINGTYPE_DESC\", " +
			    "\"CURRENT_ARCHITECTURE\", " +
			    "\"CURRENT_VERSION\" " +
			    "From  \"Common_Basis\".\"z_applications\", \"Common_Basis\".\"z_hostingtypes\", \"Common_Basis\".\"z_vendor\",  \"Common_Basis\".\"z_projects\", \"Common_Basis\".\"z_capabilities\", \"Common_Basis\".\"z_category\"  " +
			    "Where \"Common_Basis\".\"z_applications\".\"HOSTING_TYPE_ID\" = \"Common_Basis\".\"z_hostingtypes\".\"ID\" " + 
			    "And \"Common_Basis\".\"z_applications\".\"VENDOR_ID\" = \"Common_Basis\".\"z_vendor\".\"ID\" " +
			    "And \"Common_Basis\".\"z_applications\".\"APPLICATION_ID\" = \"Common_Basis\".\"z_projects\".\"APPLICATIONS_ID\" " +
			    "And \"Common_Basis\".\"z_applications\".\"APPLICATION_ID\" = \"Common_Basis\".\"z_capabilities\".\"APPLICATIONS_ID\" " +
			    "And \"Common_Basis\".\"z_applications\".\"CATEGORY_ID\" = \"Common_Basis\".\"z_category\".\"ID\" " +
			    "And \"Common_Basis\".\"z_projects\".\"ID\" = '" + Project_ID + "' ";

	if(Application_ID !== "") {
		query = query + "And \"Common_Basis\".\"z_applications\".\"APPLICATION_ID\" = '" + Application_ID + "' ";
	}
	
	if(Category_ID !== "") {
		query = query + "And \"Common_Basis\".\"z_category\".\"ID\" = '" + Category_ID + "' ";
	}
	
	if(Product_Owner !== "") {
		query = query + "And \"Common_Basis\".\"z_applications\".\"PRODUCT_OWNER\" = '" + Product_Owner + "' ";
	}
	   
	if(StartDate !== "" && EndDate !== "") {
		query = query + "And \"Common_Basis\".\"z_capabilities\".\"TARGET_ARCHITECTURE_DATE\" Between '" + StartDate + "' and '" + EndDate + "' ";
	}
		
	try {
        $.response.contentType = "application/json";
        //$.response.setBody(JSON.stringify(query));
        $.response.setBody(JSON.stringify(getListAppPortoFolio(StartDate, EndDate, Project_ID, Category_ID, Application_ID, Product_Owner)));
        //$.response.setBody(JSON.stringify(StartDate + '|' + EndDate + '|' + Project_ID + '|' + Category_ID + '|' + Application_ID + '|' +  Product_Owner));
    } catch (err) {
        $.response.contentType = "text/plain";
        $.response.setBody("Error while executing query: [" + err.message + "]");
        $.response.returnCode = 200;
    }

} else if(paramID === '2') {
	var appid = $.request.parameters.get('appid');

	var jsonO = {
		"Summary": {
        },
		"Event": {
        },
        "Capability": {
        }
    };
	
	jsonO["Summary"] = getSummary(appid);
	jsonO["Event"] = getEvent(appid);
	jsonO["Capability"] = getCapability(appid);

	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(jsonO));
}