const https = require('https');

/**
 * Pass the data to send as `event.data`, the verb as `event.options` and 
 * the path as `event.path`
 *
 * You can use https://webhook.site/#!/ to receive the calls
 *
 * Will succeed with the response body.
 */
exports.handler = (event, context, callback) => {
    const options = {
      hostname: 'webhook.site',
      port: 443,
      path: event.path,
      method: event.verb
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
    req.write(JSON.stringify(event.data));
    req.end();
};
