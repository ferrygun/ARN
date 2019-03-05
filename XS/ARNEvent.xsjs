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
var str = data.Event.length;

var i;
var eventtype;
var startdate;
var enddate;
var event_desc;

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

onesql("CREATE LOCAL TEMPORARY TABLE #local_test_table_2(EventType  VARCHAR(255), StartDate DATE, EndDate DATE, Event_Desc VARCHAR(255), Applications_ID VARCHAR(45))");

//Insert records
for(i = 0; i <data.Event.length; i++) {
	eventtype = data.Event[i].EVENTTYPE;
	startdate = data.Event[i].STARTDATE;
	enddate = data.Event[i].ENDDATE;
	event_desc = data.Event[i].EVENT_DESC;
	onesql("insert into #local_test_table_2 values('" + eventtype + "','" + startdate + "','" + enddate + "', '" + event_desc + "', '" + appid + "')");
}


//$.response.contentType = "application/json";
//$.response.setBody(result);
//$.response.returnCode = 200;
 
var query = "CALL \"Common_Basis\".\"event\"(?, #local_test_table_2)";
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

