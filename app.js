var configFromYelpPage = {
  consumerKey: '<consumerKey>',
  consumerSecret: '<consumerSecret>',
  token: '<token>',
  tokenSecret: '<tokenSecret>'
}

// An example search on Yelp
var searchData = {
    term: 'enchiladas',
    location: 'New York, NY',
    limit: '10',
    radius_filter: '5000',
    category_filter: 'mexican'
}

// --------------------------------------------
// End of stuff that will be different for you.
// --------------------------------------------

var consumer = {
  public: configFromYelpPage.consumerKey,
  secret: configFromYelpPage.consumerSecret
};

var token = {
  public: configFromYelpPage.token,
  secret: configFromYelpPage.tokenSecret
};

var CORSRestrictionAvoidanceHack = 'https://accesscontrolalloworiginall.herokuapp.com/';
var yelpUrl = 'https://api.yelp.com/v2/search';

var requestDataForSigning = {
    url: yelpUrl,
    method: 'GET',
    data: searchData
};

var oauth = OAuth({
    consumer: consumer,
    signature_method: 'HMAC-SHA1'
});

var oauthParams = oauth.authorize(requestDataForSigning, token);

console.log("oauthParams", oauthParams);

$.ajax({
  url: CORSRestrictionAvoidanceHack + requestDataForSigning.url,
  method: requestDataForSigning.method,
  data: oauthParams,
  success: function(response) {
    console.log("response", response);
  }
});
