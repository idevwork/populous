import { Accounts } from 'meteor/accounts-base';
import { WebApp } from 'meteor/webapp';
import { User, SIC, BlockchainAction,  Wallet, Currency, File, EmailValidate } from 'meteor/populous:api';
import Fiber from 'fibers'
import '../imports/server/cronJobs';
import '../imports/server/ethConnect';
import {Meteor} from 'meteor/meteor';

Accounts.validateLoginAttempt(({ user }) => {
  const u = new User(user);

  // Only allow admins to login
  return u.isAdmin();
});

Meteor.startup(async () => {
  (new SIC()).importCodes();

  // await (new Wallet()).attemptWalletUpgrade();
  await File.clearBucket();

  WebApp.connectHandlers.use('/validate', function(req, res, next) {
      if (req.method === 'GET') {
        Fiber(function () {
          const subject = decodeURIComponent(req.url.substr(1));
          const result = EmailValidate.findOne({subject});

          res.writeHead(200, {'Content-Type': 'application/json'});

          if (result) {
            res.end(JSON.stringify({
              "response": true,
              "url": result.url
            }));
          } else {
            res.end(JSON.stringify({
              "response": false
            }));
          }
        }).run();
      }
    });
});
