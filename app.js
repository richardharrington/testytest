var configFromYelpPage = {
  consumerKey: 'JaGr-6ycGUWiUHopylWrtw',
  consumerSecret: '29aNsmQTVvfNqaWhHkIrkyaxSWg',
  token: 'bs2-cAauqREgyFxqDvkOgEXVvPTVwIJS',
  tokenSecret: 'ZUvl4_ehAnHHo19xiRxbillrqx8'
}


var consumer = {
  public: configFromYelpPage.consumerKey,
  secret: configFromYelpPage.consumerSecret
};

var token = {
  public: configFromYelpPage.token,
  secret: configFromYelpPage.tokenSecret
};

var CORSRestrictionAvoidanceHack = 'https://accesscontrolalloworiginall.herokuapp.com/';
var yelpUrl = 'https://api.yelp.com/v2/search/';
var searchForEnchiladas = '?term=enchiladas&location=New York, NY&limit=10&radius_filter=500&category_filter=mexican';

var requestDataForSigning = {
    url: CORSRestrictionAvoidanceHack + yelpUrl + searchForEnchiladas,
    method: 'GET'
};

var oauth = OAuth({
    consumer: consumer,
    signature_method: 'HMAC-SHA1'
});

var oauthParams = oauth.authorize(requestDataForSigning, token);

console.log("oauthParams", oauthParams);

$.ajax({
  url: requestDataForSigning.url,
  method: requestDataForSigning.method,
  data: oauthParams,
  success: function(response) {
    console.log("response", response);
  }
});

console.log(decodeURIComponent("GET&https%3A%2F%2Fapi.yelp.com%2Fv2%2Fsearch%2F&category_filter%3Dmexican%26limit%3D10%26location%3DNew%2520York%252C%2520NY%26oauth_consumer_key%3DJaGr-6ycGUWiUHopylWrtw%26oauth_nonce%3DYi4e3NZdptnE9jw8r9qJsA2RaJeJ14NJ%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1466907607%26oauth_token%3Dbs2-cAauqREgyFxqDvkOgEXVvPTVwIJS%26oauth_version%3D1.0%26radius_filter%3D500%26term%3Denchiladas"));

// https://api.yelp.com/v2/search/&category_filter=mexican&limit=10&location=New%20York%2C%20NY&oauth_consumer_key=JaGr-6ycGUWiUHopylWrtw&oauth_nonce=Yi4e3NZdptnE9jw8r9qJsA2RaJeJ14NJ&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1466907607&oauth_token=bs2-cAauqREgyFxqDvkOgEXVvPTVwIJS&oauth_version=1.0&radius_filter=500&term=enchiladas
