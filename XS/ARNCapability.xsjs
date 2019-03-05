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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var content = $.request.body.asString();

var data = JSON.parse(content);
var appid = data.appid;
//var str = data.Capability[0].CAPABILITY;
var str = data.Capability.length;

var i;
var capability;
var capabilityowner;
var capabilitystatus;
var target_architecture_date;

var result = ""; 
var conn=$.db.getConnection("testxsmd::anonuser"); 

function onesql(sql) { 
    try { 
        var ps = conn.prepareStatement(sql); 
        var execrc = ps.execute(); 
        ps.close(); 
    }catch(e){ 
        result += sql + ":\n" + e.toString() + "\n--------\n\n"; 
    } 
}

onesql("CREATE LOCAL TEMPORARY TABLE #local_test_table_1(Capability  VARCHAR(255), CapabilityOwner  VARCHAR(255), CapabilityStatus  VARCHAR(255), Target_Architecture_Date DATE, Applications_ID VARCHAR(255))");

//Insert records
for(i = 0; i <data.Capability.length; i++) {
	capability = data.Capability[i].CAPABILITY;
	capabilityowner = data.Capability[i].CAPABILITYOWNER;
	capabilitystatus = data.Capability[i].CAPABILITYSTATUS;
	target_architecture_date = data.Capability[i].TARGET_ARCHITECTURE_DATE;
	//onesql("insert into #local_test_table_1 values('FD-C','Inactive','Inactive','2019-12-31', 'FD')");
	onesql("insert into #local_test_table_1 values('" + capability + "','" + capabilityowner + "','" + capabilitystatus + "', '" + target_architecture_date + "', '" + appid + "')");
}


//$.response.contentType = "application/json";
//$.response.setBody(result);
//$.response.returnCode = 200;
 
var query = "CALL \"Common_Basis\".\"capability\"(?, #local_test_table_1)";
try {
	var cst = conn.prepareCall(query);
	cst.setString(1, appid);
	
	cst.execute();
	conn.commit(); 
	
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify('success'));
	$.response.returnCode = 200;
	
} catch (err) {
	$.response.contentType = "application/json";
	$.response.setBody("Error while executing query: [" + err + "]");

} finally {
    close([cst, conn]);
}

