var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1.js');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const AssistantV1 = require('ibm-watson/assistant/v1');

const { IamAuthenticator } = require('ibm-watson/auth');

var blobStream = require('blob-stream');


const text_to_speech = new TextToSpeechV1({
  version: '2018-04-05',
  authenticator: new IamAuthenticator({
    apikey:
      process.env.TEXT_TO_SPEECH_IAM_APIKEY
  }),
  url: process.env.TEXT_TO_SPEECH_URL
});
var speech_to_text = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.SPEECH_TO_TEXT_IAM_APIKEY
  }),
  url: process.env.SPEECH_TO_TEXT_URL
});

const assistant = new AssistantV1({
  version: '2019-02-28',
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_APIKEY
  }),
  url: process.env.ASSISTANT_URL
});

var watson = {
  message: function(text, context, callback) {
    assistant.message(
      {
        workspaceId: process.env.workspaceId,
        input: { text: text },
        context: context
      },
      callback
    );
  },

  recognize: function(stream, err, data) {
    var params = {
      content_type: 'audio/l16; rate=44100; channels=2',
      model: 'en-US_BroadbandModel' // Specify your language model here
    };
    var textStream = stream.pipe(
      speech_to_text.recognizeUsingWebSocket(params)
    );
    textStream.setEncoding('utf8');
    textStream.on('error', err);
    textStream.on('data', data);
  },

  synthesize: function(message) {
    var params = {
      text: message,
      voice: 'en-US_AllisonVoice',
      download: true,
      accept: 'audio/mp3'
    };
    return text_to_speech.synthesize(params);
  }
};

module.exports = watson;
