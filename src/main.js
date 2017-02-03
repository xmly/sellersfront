// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Chart from 'chart.js'
import AWS from 'aws-sdk'
import {CognitoUserPool, AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
var poolData = {
  UserPoolId: 'us-east-1_RNh9Lil9V', // Your user pool id here
  ClientId: '1cb436bh7bkplggjvrpuse47lh' // Your client id here
}
AWS.config.region = 'us-east-1'
var userPool = new CognitoUserPool(poolData)

var authenticationData = {
  Username: 'yue.yuanyuan@gmail.com',
  Password: 'yuan1208',
};

var authenticationDetails = new AuthenticationDetails(authenticationData);

var userData = {
  Username: 'yue.yuanyuan@gmail.com',
  Pool: userPool
};
var cognitoUser = new CognitoUser(userData);

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: function (result) {
    console.log('access token + ' + result.getAccessToken().getJwtToken());

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:e985141c-ec9e-4ea3-b5d6-783495d028fd', // your identity pool id here
      Logins: {
        // Change the key below according to the specific region your user pool is in.
        'cognito-idp.us-east-1.amazonaws.com/us-east-1_RNh9Lil9V': result.getIdToken().getJwtToken()
      }
    });
    // Instantiate aws sdk service objects now that the credentials have been updated.
    // example: var s3 = new AWS.S3();
    var s3 = new AWS.S3();
  },

  onFailure: function (err) {
    alert(err);
  },

});

var ctx = document.getElementById('myChart')
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
})
