var express = require("express");
var app = express();
var url = require("url");
var cors = require("cors");
var fs = require("fs");
app.use(cors());
var http = require("http");
var https = require("https");
var crypto = require("crypto");
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

var appconfig = JSON.parse(fs.readFileSync("countries.config.json"));

// Get the embedSecret key from Bold BI
var embedSecret = appconfig.EmbedSecret;

var configjson = {
  DashboardId: appconfig.DashboardId,
  ServerUrl: appconfig.ServerUrl,
  SiteIdentifier: appconfig.SiteIdentifier,
  Environment: appconfig.Environment,
  EmbedType: appconfig.EmbedType,
};

//Enter your BoldBI credentials here
var userEmail = appconfig.UserEmail;

app.post("/embeddetail/get", function (req, response) {
  var embedQueryString = req.body.embedQuerString;
  var dashboardServerApiUrl = req.body.dashboardServerApiUrl;

  embedQueryString += "&embed_user_email=" + userEmail;
  embedQueryString +=
    "&embed_server_timestamp=" + Math.round(new Date().getTime() / 1000);
  embedQueryString += "&isWidgetMode=true&WidgetId=" + req.body.widgetId;
  var embedSignature = "&embed_signature=" + GetSignatureUrl(embedQueryString);
  var embedDetailsUrl = "/embed/authorize?" + embedQueryString + embedSignature;

  console.log("queryString", embedQueryString);
  var serverProtocol =
    url.parse(dashboardServerApiUrl).protocol == "https:" ? https : http;
  serverProtocol.get(dashboardServerApiUrl + embedDetailsUrl, function (res) {
    var str = "";
    res.on("data", function (chunk) {
      str += chunk;
    });
    res.on("end", function () {
      response.send(str);
    });
  });
});

function GetSignatureUrl(queryString) {
  var keyBytes = Buffer.from(embedSecret);
  var hmac = crypto.createHmac("sha256", keyBytes);
  data = hmac.update(queryString);
  gen_hmac = data.digest().toString("base64");

  return gen_hmac;
}

app.get("/", function (request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received.");

  response.writeHead(200);

  if (pathname == "/") {
    html = fs.readFileSync("index.html", "utf8");
    var resultString =
      "<script>var configjsonstring='" +
      JSON.stringify(configjson) +
      "';var configjson=JSON.parse(configjsonstring);";
    html = html.replace("<script>", resultString);
    console.log(resultString);
    response.write(html);
  }
  response.end();
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
