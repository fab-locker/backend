# Presentation 

This repository is the back-end of the project FabLocker : https://github.com/fab-locker/FabLocker

## What you need to install to launch the back-end

Node.js : https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
Nest.js : https://kinsta.com/knowledgebase/install-nest/
pnpm : https://pnpm.io/installation

### First use

install dependencies : pnpm i

run : pnpm run dev 

### if you want to check about mqtt stuff

install : 
MQTT Explorer at : https://mqtt-explorer.com/

then log with your mqtt broker credential. The projects works whatever is the broker (use hiveMq to make it works for sure and don't forget to modify the code).

### to setup and work with the rfid, follow those steps

https://console.hivemq.cloud/clients/arduino-esp8266

### !! be careful, arduino IDE version is important you should work with the version: 1.8.18 !!

https://www.aranacorp.com/fr/utilisation-dun-module-rfid-avec-un-esp8266/#google_vignette

Make sure that the ports declared in your code are the same that those which were plugged on the esp8266.
When you pluged the esp you should press the rst button and launch the serial monitor to see if it works.




