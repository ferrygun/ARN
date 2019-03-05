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
var pnc = getQueryVariable(content, "pnc");
var pnl = getQueryVariable(content, "pnl");
var vid = getQueryVariable(content, "vid");
var po = getQueryVariable(content, "po");
var htid = getQueryVariable(content, "htid");
var cid = getQueryVariable(content, "cid");
var lobid = getQueryVariable(content, "lobid");
var ca = getQueryVariable(content, "ca");
var cv = getQueryVariable(content, "cv");
var ta = getQueryVariable(content, "ta");
var tv = getQueryVariable(content, "tv");
var not = getQueryVariable(content, "not");
var lard = getQueryVariable(content, "lard");
var cveom = getQueryVariable(content, "cveom");
var tuc = getQueryVariable(content, "tuc");
var es = getQueryVariable(content, "es");
var af = getQueryVariable(content, "af");

var conn = $.db.getConnection("testxsmd::anonuser");

var query = "CALL\"Common_Basis\".\"ARNAdd\"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
try {
	var cst = conn.prepareCall(query);
	cst.setString(1, appid);
	cst.setString(2, pns);
	cst.setString(3, pnc);
	cst.setString(4, pnl);
	cst.setString(5, vid);
	cst.setString(6, po);
	cst.setString(7, htid);
	cst.setString(8, cid);
	cst.setString(9, lobid);
	cst.setString(10, ca);
	cst.setString(11, cv);
	cst.setString(12, ta);
	cst.setString(13, tv);
	cst.setString(14, not);
	cst.setString(15, lard);
	cst.setString(16, cveom);
	cst.setString(17, tuc);
	cst.setString(18, es);
	cst.setString(19, af);
	
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
	