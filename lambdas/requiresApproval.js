const https = require('https');

exports.handler = (event, context, callback) => {
    console.log('event= ' + JSON.stringify(event));
    console.log('context= ' + JSON.stringify(context));

    const executionContext = event.ExecutionContext;
    console.log('executionContext= ' + executionContext);

    const executionName = executionContext.Execution.Name;
    console.log('executionName= ' + executionName);

    const statemachineName = executionContext.StateMachine.Name;
    console.log('statemachineName= ' + statemachineName);

    const taskToken = executionContext.Task.Token;
    console.log('taskToken= ' + taskToken);

    const options = {
      hostname: 'webhook.site',
      port: 443,
      path: event.Event.path,
      method: event.Event.verb
    };
    const req = https.request(options, (res) => {
        let body = '';
        console.log('Status:', res.statusCode);
        console.log('Headers:', JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log('Successfully processed HTTPS response');
            // If we know it's JSON, parse it
            if (res.headers['content-type'] === 'application/json') {
                body = JSON.parse(body);
            }
            callback(null, body);
        });
    });
    req.on('error', callback);

    const data = {
        "context": executionContext,
        "event": event
    };
    req.write(JSON.stringify(data));
    req.end();
    
};