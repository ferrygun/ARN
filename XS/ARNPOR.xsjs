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

function getEventsPOR() {
    var query = "Select  DISTINCT \"z_event\".\"APPLICATIONS_ID\", \"PRODUCT_NAME_SHORT\", \"EVENTTYPE\", \"STARTDATE\", \"ENDDATE\", \"EVENT_DESC\" " +
        "From \"Common_Basis\".\"z_applications\", \"Common_Basis\".\"z_capabilities\", \"Common_Basis\".\"z_event\" " +
        "Where \"Common_Basis\".\"z_applications\".\"APPLICATION_ID\" = \"Common_Basis\".\"z_capabilities\".\"APPLICATIONS_ID\" " +
        "And \"Common_Basis\".\"z_applications\".\"APPLICATION_ID\" = \"Common_Basis\".\"z_event\".\"APPLICATIONS_ID\" " +
        "Order by APPLICATIONS_ID Asc";

    var EventsPORList = [];
    var connection = $.db.getConnection("testxsmd::anonuser");
    var statement = null;
    var resultSet = null;
    try {
        statement = connection.prepareStatement(query);
        resultSet = statement.executeQuery();
        var EventsPOR;

        while (resultSet.next()) {
        	EventsPOR = {};
        	EventsPOR.APPLICATIONS_ID = resultSet.getString(1);
        	EventsPOR.PRODUCT_NAME_SHORT = resultSet.getString(2);
        	EventsPOR.EVENTTYPE = resultSet.getString(3);
        	EventsPOR.STARTDATE = resultSet.getString(4);
        	EventsPOR.ENDDATE = resultSet.getString(5);
        	EventsPOR.EVENT_DESC = resultSet.getString(6);

            EventsPORList.push(EventsPOR);
        }
    } finally {
        close([resultSet, statement, connection]);
    }
    return EventsPORList;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var jsonO = {
    "Results": []
};

var data = JSON.parse(JSON.stringify(getEventsPOR()));
var length = data.length;
var i;

var appid;
var eventtype;
var product_name_short;
var startdate;
var enddate;
var eventdesc;

var name;
var events;

for (i = 0; i < length; i++) {
    appid = data[i].APPLICATIONS_ID;
    product_name_short = data[i].PRODUCT_NAME_SHORT;
    eventtype = data[i].EVENTTYPE;
    startdate = data[i].STARTDATE;
    enddate = data[i].ENDDATE;
    eventdesc = data[i].EVENT_DESC;

    name = {
        "Name": {},
        "PDS": {},
        "Events":{}
    };
    
    events = {
    	"EVENTTYPE": {},
        "STARTDATE": {},
        "ENDDATE": {},
        "EVENT_DESC": {}
    };    
   
    events["EVENTTYPE"] = eventtype;
    events["STARTDATE"] = startdate;
    events["ENDDATE"] = enddate;
    events["EVENT_DESC"] = eventdesc;

    name["Name"] = appid;
    name["PDS"] = product_name_short;
    name["Events"] = events;
    jsonO["Results"].push(name);
}

var data = jsonO.Results;

var ind;
var k;
var a;
var b;
var ar = [];

var obj = JSON.parse(JSON.stringify(jsonO));

Object.keys(obj).forEach(k=>{
	  obj[k] = obj[k].reduce((a,b)=>{
		  ind = a.map(i=>i.Name).indexOf(b.Name)
		  if(ind > -1){
			a[ind]['Events'].push(b['Events'])
		  }else{
		   ar=[];
		   ar.push(b['Events'])
		   b['Events'] = ar;
		   a.push(b)
		  }
		 return a;
	  },[])
});

$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(obj));
