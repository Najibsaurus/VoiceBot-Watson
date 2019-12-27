window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var recorder, inputPoint;
var audioContext = new AudioContext();

var onFail = function(e) {
  console.log('Rejected!', e);
};

var onSuccess = function(stream) {
  inputPoint = audioContext.createGain();
  audioInput = audioContext.createMediaStreamSource(stream);
  audioInput.connect(inputPoint);
  recorder = new Recorder( inputPoint );
  recorder.clear();
  recorder.record();
}

function startRecording() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, onSuccess, onFail);
  } else {
    console.log('navigator.getUserMedia not present');
  }
}

function stopRecording() {
  recorder.stop();
  recorder.exportWAV(function(blob){
    var blobURL = (window.URL || window.webkitURL).createObjectURL(blob);
    var payload = {
      message: blobURL,
      user: "Client",
      ts: (new Date()).getTime(),
      type: "audio"
    };
    createUserMessage(payload);
    sendAudioMessage(blob, payload.ts);
  });
}

function toggleRecording( e ) {
  // alert(e);
  if (e.classList.contains("recording")) {
    stopRecording()
    e.classList.remove("recording");
    e.classList.remove("btn-danger");
    e.classList.add("btn-success");
  } else {
    // start recording
    // if (!recorder) return;
    e.classList.add("recording");
    e.classList.add("btn-danger");
    e.classList.remove("btn-success");
    startRecording();
  }
}
