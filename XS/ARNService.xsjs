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

function getCategory() {
	var query = "Select \"ID\", \"CATEGORY_DESC\" " +
				"From \"Common_Basis\".\"z_category\" " +
				"Order by \"CATEGORY_DESC\" Asc";

    var CategoryList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var Category;

        while (resultSet.next()) {
            Category = {};
            Category.ID = resultSet.getString(1);
			Category.CATEGORY_DESC = resultSet.getString(2);
			
            CategoryList.push(Category);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return CategoryList;
}

function getLOB() {
	var query = "Select \"ID\", \"LINEOFBUSINESS_DESC\" " +
				"From \"Common_Basis\".\"z_lineofbusiness\"";

    var LOBList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var LOB;

        while (resultSet.next()) {
            LOB = {};
            LOB.ID = resultSet.getString(1);
			LOB.LINEOFBUSINESS_DESC = resultSet.getString(2);
			
            LOBList.push(LOB);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return LOBList;
}

function getHostingTypes() {
	var query = "Select \"ID\", \"HOSTINGTYPE_DESC\" " +
				"From \"Common_Basis\".\"z_hostingtypes\" " + 
				"Order by \"HOSTINGTYPE_DESC\" Asc";

    var HostingTypeList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var HostingType;

        while (resultSet.next()) {
            HostingType = {};
            HostingType.ID = resultSet.getString(1);
			HostingType.HOSTINGTYPE_DESC = resultSet.getString(2);
			
            HostingTypeList.push(HostingType);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return HostingTypeList;
}

function getVendor() {
	var query = "Select \"ID\", \"VENDOR_DESC\" " +
				"From \"Common_Basis\".\"z_vendor\" " + 
				"Order by \"VENDOR_DESC\" Asc";

    var VendorList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var Vendor;

        while (resultSet.next()) {
            Vendor = {};
            Vendor.ID = resultSet.getString(1);
			Vendor.VENDOR_DESC = resultSet.getString(2);
			
            VendorList.push(Vendor);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return VendorList;
}

function getCategory1() {
	var query = "Select \"ID\", \"CATEGORY_DESC\" " +
				"From \"Common_Basis\".\"z_category\" " + 
				"Order by \"CATEGORY_DESC\" Asc";

    var CategoryList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var Category;
        
        Category = {};
        Category.ID = "-1";
        Category.CATEGORY_DESC = "--All Categories--";
        CategoryList.push(Category);

        while (resultSet.next()) {
            Category = {};
            Category.ID = resultSet.getString(1);
			Category.CATEGORY_DESC = resultSet.getString(2);
			
            CategoryList.push(Category);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return CategoryList;
}

function getProject() {
	var query = "Select Distinct \"ID\", \"PROJECT_DESC\" " +
				"From \"Common_Basis\".\"z_projects\" " + 
				"Order by \"PROJECT_DESC\" Asc";

    var ProjectList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var Project;
        
        Project = {};
        Project.ID = "-1";
        Project.PROJECT_DESC = "--All Projects--";
        ProjectList.push(Project);

        while (resultSet.next()) {
            Project = {};
            Project.ID = resultSet.getString(1);
            Project.PROJECT_DESC = resultSet.getString(2);
			
			ProjectList.push(Project);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return ProjectList;
}

function getAppProductNameShort() {
	var query = "Select Distinct \"APPLICATION_ID\", \"PRODUCT_NAME_SHORT\" " +
				"From \"Common_Basis\".\"z_applications\" " + 
				"Order by \"PRODUCT_NAME_SHORT\" Asc";

    var AppProductNameShortList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var AppProductNameShort;

        AppProductNameShort = {};
        AppProductNameShort.APPLICATION_ID = "-1";
        AppProductNameShort.PRODUCT_NAME_SHORT = "--All Applications--";
        AppProductNameShortList.push(AppProductNameShort);
        
        while (resultSet.next()) {
        	AppProductNameShort = {};
        	AppProductNameShort.APPLICATION_ID = resultSet.getString(1);
            AppProductNameShort.PRODUCT_NAME_SHORT = resultSet.getString(2);
			
            AppProductNameShortList.push(AppProductNameShort);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return AppProductNameShortList;
}

function getAppProductOwner() {
	var query = "Select Distinct \"APPLICATION_ID\", \"PRODUCT_OWNER\" " +
				"From \"Common_Basis\".\"z_applications\" " +
				"Order by \"PRODUCT_OWNER\" Asc";

    var AppProductOwnerList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var AppProductOwner;
        
        AppProductOwner = {};
        AppProductOwner.APPLICATION_ID = "-1";
        AppProductOwner.PRODUCT_OWNER = "--All Product Owners--";
        AppProductOwnerList.push(AppProductOwner);

        while (resultSet.next()) {
        	AppProductOwner = {};
        	AppProductOwner.APPLICATION_ID = resultSet.getString(1);
        	AppProductOwner.PRODUCT_OWNER = resultSet.getString(2);
			
            AppProductOwnerList.push(AppProductOwner);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return AppProductOwnerList;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var paramID = $.request.parameters.get('q');

if(paramID === '1') { //Get Category
	try {
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(getCategory()));
    } catch (err) {
        $.response.contentType = "text/plain";
        $.response.setBody("Error while executing query: [" + err.message + "]");
        $.response.returnCode = 200;
    }
} else if(paramID === '2') { //Get LOB
	try {
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(getLOB()));
    } catch (err) {
        $.response.contentType = "text/plain";
        $.response.setBody("Error while executing query: [" + err.message + "]");
        $.response.returnCode = 200;
    }
} else if(paramID === '3') { //Get Hosting Types
	try {
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(getHostingTypes()));
    } catch (err) {
        $.response.contentType = "text/plain";
        $.response.setBody("Error while executing query: [" + err.message + "]");
        $.response.returnCode = 200;
    }
} else if(paramID === '4') { //Get Vendor
	try {
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(getVendor()));
    } catch (err) {
        $.response.contentType = "text/plain";
        $.response.setBody("Error while executing query: [" + err.message + "]");
        $.response.returnCode = 200;
    }
} else if(paramID === '5') { //Get Project
	try {
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(getProject()));
    } catch (err) {
        $.response.contentType = "text/plain";
        $.response.setBody("Error while executing query: [" + err.message + "]");
        $.response.returnCode = 200;
    }
} else if(paramID === '6') { //Get Category List
	try {
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(getCategory1()));
    } catch (err) {
        $.response.contentType = "text/plain";
        $.response.setBody("Error while executing query: [" + err.message + "]");
        $.response.returnCode = 200;
    }
} else if(paramID === '7') { //Get App Product Name Short
	try {
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(getAppProductNameShort()));
    } catch (err) {
        $.response.contentType = "text/plain";
        $.response.setBody("Error while executing query: [" + err.message + "]");
        $.response.returnCode = 200;
    }
} else if(paramID === '8') { //Get App Product Owner
	try {
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(getAppProductOwner()));
    } catch (err) {
        $.response.contentType = "text/plain";
        $.response.setBody("Error while executing query: [" + err.message + "]");
        $.response.returnCode = 200;
    }
}

/*	
} else if(paramID === '3') {
	var conn = $.db.getConnection("testxsmd::anonuser");

	var query3 = "CALL \"Common_Basis\".\"Proc_update\"(?,?)";
	try {
		var cst = conn.prepareCall(query3);
		cst.setString(1, "Hey");
		cst.setString(2, "Yoo");
	
		cst.execute();
		conn.commit(); 
	} catch (e) {
		$.response.contentType = "application/json";
		$.response.setBody(JSON.stringify(e));

	} finally {
        close([cst, conn]);
    }
}
*/