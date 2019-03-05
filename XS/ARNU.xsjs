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

var content = $.request.body.asString();

var appid = getQueryVariable(content, "appid");
var pns = getQueryVariable(content, "pns");
var pnl = getQueryVariable(content, "pnl");
var pnc = getQueryVariable(content, "pnc");
var cid = getQueryVariable(content, "cid");
var lobid = getQueryVariable(content, "lobid");
var htid = getQueryVariable(content, "htid");
var es = getQueryVariable(content, "es");
var tuc = getQueryVariable(content, "tuc");
var po = getQueryVariable(content, "po");
var vid = getQueryVariable(content, "vid");
var ca = getQueryVariable(content, "ca");
var cv = getQueryVariable(content, "cv");
var eod = getQueryVariable(content, "eod");
var ta = getQueryVariable(content, "ta");
var tv = getQueryVariable(content, "tv");
var not = getQueryVariable(content, "not");
var af = getQueryVariable(content, "af");

var conn = $.db.getConnection("testxsmd::anonuser");

var query = "CALL\"Common_Basis\".\"ARNUpdate\"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
try {
	var cst = conn.prepareCall(query);
	cst.setString(1, appid);
	cst.setString(2, pns);
	cst.setString(3, pnl);
	cst.setString(4, pnc);
	cst.setString(5, cid);
	cst.setString(6, lobid);
	cst.setString(7, htid);
	cst.setString(8, es);
	cst.setString(9, tuc);
	cst.setString(10, po);
	cst.setString(11, vid);
	cst.setString(12, ca);
	cst.setString(13, cv);
	cst.setString(14, eod);
	cst.setString(15, ta);
	cst.setString(16, tv);
	cst.setString(17, not);
	cst.setString(18, af);

	cst.execute();
	conn.commit(); 
	
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify('success'));
    //$.response.setBody(JSON.stringify(pns + '|' + pnl + '|' + pnc + '|' + cid + '|' + lobid + '|' + htid + '|' + es + '|' + po + '|' + vid + '|' +ca + '|' + cv + '|' + eod + '|' + ta + '|' + tv + '|' + not));
	$.response.returnCode = 200;
	
} catch (err) {
	$.response.contentType = "application/json";
	$.response.setBody("Error while executing query: [" + err + "]");

} finally {
    close([cst, conn]);
}
	