<h1 align="center" style="border-bottom: none;"> 🤖 Chatbot using IBM Watson </h1>
<h3 align="center">Node.js application using Speech to Text, Text to Speech and Assistant </h3>

## Prerequisites

1. Sign up for an [IBM Cloud account](https://cloud.ibm.com/registration/).
2. Download the [IBM Cloud CLI](https://cloud.ibm.com/docs/cli/index.html#overview).
3. Create an instance of the Speech to Text, Text to Speech and Assistant service and get your credentials:
    - Copy the `apikey` value.
    - Copy the `url` value.

## Configuring the application

1. Open the *config/config.env* file and add the service credentials that you obtained in the previous step.
    ```
    TEXT_TO_SPEECH_IAM_APIKEY=<your text to speech apikey>
    TEXT_TO_SPEECH_URL=<your text to speech url>
    SPEECH_TO_TEXT_IAM_APIKEY=<your speech to text apikey>
    SPEECH_TO_TEXT_URL=<your speech to text url>
    ASSISTANT_APIKEY=<your assistant apikey>
    ASSISTANT_IAM_APIKEY=<your assistant iam apikey>
    ASSISTANT_URL=<your assistan url>
    ASSISTANT_AUTH_TYPE=iam
    workspaceId=<your workspace id>

    ```

## Running locally

1. Install the dependencies

    ```
    npm install
    ```

2. Run the application

    ```
    npm start
    ```

3. View the application in a browser at `localhost:8080`

4. It will works like a charm


<img src="https://github.com/Najibsaurus/VoiceBot-Watson/blob/master/screenshoot-wtsn.png" width="70%" height="70%">


