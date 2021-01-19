const AWS = require('aws-sdk');

/**
 * Pass the data to send as `event.data`, the verb as `event.options` and 
 * the path as `event.path`
 *
 * You can use https://webhook.site/#!/ to receive the calls
 *
 * Will succeed with the response body.
 * Role policy: AWSStepFunctionsFullAccess
 */

exports.handler = (event, context, callback) => {
  console.log('Event= ' + JSON.stringify(event));
  const action = event.action;
  const taskToken = event.taskToken;

  const stepfunctions = new AWS.StepFunctions();

  var message = "";

  if (action === "approve") {
    message = "Approved!";
  } else if (action === "reject") {
    message = "Rejected!";
  } else {
    console.error("Unrecognized action. Expected: approve, reject.");
    callback({"Status": "Failed to process the request. Unrecognized Action."});
  }

  stepfunctions.sendTaskSuccess({
    output: JSON.stringify(message),
    taskToken: event.taskToken
  })
  .promise()
  .then(function(data) {
    console.log("Approved= " + JSON.stringify(data));
  }).catch(function(err) {
    console.error(err, err.stack);
    callback(err);
  });
}