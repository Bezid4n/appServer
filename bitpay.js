const routes = require('express').Router();
const axios = require('axios');
const querystring = require('querystring');

const ApiKey = "adxcv-zzadq-polkjsad-opp13opoz-1sdf455aadzmck1244567";
const Url = "http://bitpay.ir/payment-test/gateway-send";
const UrlCheck = "http://bitpay.ir/payment-test/gateway-result-second";
const Redirect = "http://localhost:3010/payment/result";

routes.get('/', (req, res) => {
  axios.post(Url,
    querystring.stringify({
      api: ApiKey,
      amount: '1000',
      redirect: Redirect,
      factorId: '666',
      name: 'Test User',
      email: 'test@user.com',
      description: 'Test Payment'
    }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
        console.log(response.data);
        res.redirect(`http://bitpay.ir/payment-test/gateway-` + response.data)
    });
  
});


routes.post('/result', (req, res) => {
  // string str = string.Concat(new string[] { "api=", Api, "&trans_id=", Trans_id, "&id_get=", Id_get });
  axios.post(UrlCheck,
    querystring.stringify({
      api: ApiKey,
      trans_id: req.body.trans_id,
      id_get: req.body.id_get,      
    }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
        if(response.data == 1){
          res.send("payment result! " +  JSON.stringify(req.body));
        }else{
          res.send("payment verification FAILED");
        }
    }).catch(err => {
      console.log(err);
      res.send("payment FAILED");
    });
  
});

routes.get('/result', (req, res) => {
  res.send("payment !");
});


module.exports = routes;