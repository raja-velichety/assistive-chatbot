

var AssistantV1 = require('watson-developer-cloud/assistant/v1');

/**
 * Instantiate the Watson Assistant Service
 */
var assistant = new AssistantV1({
  username: 'apikey',
  password: 'fcWCDWr0xQo-6R7FIc3e5g96rdeVYUWzz-sVN0TkkJZG',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-09-19'
});

/**
 * Calls the assistant message api.
 * returns a promise
 */
var message = function(text, context) {
  var payload = {
    workspace_id:'726c502d-12e8-4ff8-840d-a3269e8849a3',
    input: {
      text: text
    },
    context: context
  };
  return new Promise((resolve, reject) =>
    assistant.message(payload, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  );
};

// This example makes two successive calls to assistant service.
// Note how the context is passed:
// In the first message the context is undefined. The service starts a new assistant.
// The context returned from the first call is passed in the second request - to continue the assistant.
message('first message', undefined)
  .then(response1 => {
    // APPLICATION-SPECIFIC CODE TO PROCESS THE DATA
    // FROM ASSISTANT SERVICE
    console.log(JSON.stringify(response1, null, 2), '\n--------');

    // invoke a second call to assistant
    return message('second message', response1.context);
  })
  .then(response2 => {
    console.log(JSON.stringify(response2, null, 2), '\n--------');
    console.log(
      'Note that the two reponses should have the same context.conversation_id'
    );
  })
  .catch(err => {
    // APPLICATION-SPECIFIC CODE TO PROCESS THE ERROR
    // FROM ASSISTANT SERVICE
    console.error(JSON.stringify(err, null, 2));
});