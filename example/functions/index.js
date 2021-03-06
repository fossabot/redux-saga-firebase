const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

const app = admin.initializeApp(functions.config().firebase);

exports.ping = functions.https.onRequest((request, response) => {
  admin.messaging().sendToDevice(request.query.token, {
    notification: {
      title: "Todo item created",
      body: request.query.ping
    },
    data: {
      message: request.query.ping,
    }
  }).then(function(response) {
    console.log("Successfully sent message:", response);
  }).catch(function(error) {
    console.log("Error sending message:", error);
  });

  cors(request, response, () => {
    response.json({
      pong: request.query.ping
    });
  });
});

exports.clean = functions.https.onRequest((request, response) => {
  admin.database().ref('/').set({
    todos: {
      '-KtqzKEE4kQHdckAXEmh': {
        done: true,
        label: "Hello"
      },
      '-KtqzL-Rgzmox9liHblv': {
        done: false,
        label: "World"
      }
    }
  })

  admin.storage().bucket().upload(
    'clean.png',
    { destination: 'test.png' }
  )

  cors(request, response, () => {
    response.json({
      done: true
    })
  })
})
