#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h> //new library for the "bridge" to node
#include <Servo.h>
#include <Discord_WebHook.h>

//esp8266 info
int sensorPin = A0;
int sensorValue = 0;

//piezo
int buzzerPin = D6;

//servo info
Servo WateringBot;
int servoPin = D5;
int servoAngle = 45; //start in closed position

//status data
bool isWatering = false;
bool isManual = false; //manual toggle
int moistureThreshold = 500; //over 500 is too dry

//discord info
Discord_Webhook ivy;
const char* ssid = "WiFi_Name";           // wifi name
const char* password = "WiFi_Password";   // wifi password
String channelID = "1234567890";          // channel ID -> numbers after the https://discord.com/api/webhooks/....
String webToken =                         // webhook token -> numbers and letters after the channel ID 
"your_discord_webhook_token_here";

//start server on port 80
ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);

  //set pin modes
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH); //led off initially

  //initialize servo and force closed position
  WateringBot.attach(servoPin);
  WateringBot.write(45); 
  delay(500);

  //wait for wifi to actually connect
  WiFi.begin(ssid, password);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("connected!");

  //give the connection a moment to stabilize
  delay(3000);

  //initialize and connect webhook
  ivy.begin(channelID, webToken);
  ivy.addWiFi(ssid, password);
  ivy.connectWiFi();

  //print ip for the node bot.js file
  Serial.print("ESP IP Address: ");
  Serial.println(WiFi.localIP());

  //startup message
  ivy.send("ivy is online and ready to yap \n Use /help to see all my commands!!");

  //-- server routes for nodejs commands
  
  //manual water command
  server.on("/water", []() {
    server.send(200, "text/plain", "Watering...");
    
    //lock auto logic so it doesnt fight the motor
    isWatering = true; 
    
    digitalWrite(LED_BUILTIN, LOW);
    WateringBot.write(180); //open
    delay(3000); //water for 3 seconds
    WateringBot.write(45); //close
    digitalWrite(LED_BUILTIN, HIGH);
    
    ivy.send("Im watered bih");
  });

  //mode switcher
  server.on("/mode", []() {
    String val = server.arg("val");
    if (val == "manual") isManual = true;
    else isManual = false;
    server.send(200, "text/plain", "Mode updated");
    ivy.send("mode switched to " + val);
  });

  //moisture data for /update
  server.on("/update", []() {
    int currentMoisture = analogRead(A0);
    server.send(200, "text/plain", String(currentMoisture));
  });


  //scream function
  server.on("/scream", [](){
    server.send(200, "text/plain", "AHHHHHHH!!!");
    for(int i = 0; i < 5; i++) {
      //play sound
      tone(buzzerPin, 2000 + (i * 500), 200);
      delay(100);
      tone(buzzerPin, 4000, 200);
      delay(100);
    }
    //stop screamin
    noTone(buzzerPin);
  });

  //led func
  server.on("/led", []() {
    //turn on led
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    server.send(200, "text/plain", "LED ON");
  });


  //change threshold
  server.on("/threshold", []() {
    if(server.hasArg("val")) {
      String newVal = server.arg("val");

      //convert new string into int
      moistureThreshold = newVal.toInt();
      server.send(200, "text/plain", "Threshold updated to " + String(moistureThreshold));
      Serial.print("New Threshold set: ");
      Serial.println(moistureThreshold);
    } else {
      server.send(400, "text/plain", "Missing Value Argument");
    }
  });

  server.begin();
}

void loop() {
  server.handleClient(); //listen for node commands

  sensorValue = analogRead(sensorPin);
  Serial.print("soil moisture value: ");
  Serial.println(sensorValue);

  //auto logic only runs if manual mode is off
  if (!isManual) {
    if (sensorValue > moistureThreshold) {
      if (!isWatering) {
        //too dry - start watering
        WateringBot.write(180); //move motor first
        digitalWrite(LED_BUILTIN, LOW);
        isWatering = true; 
        
        //then send the message
        ivy.send("My shit is too dry. Watering...");
      }
    } else {
      if (isWatering) {
        //wet enough - stop watering
        WateringBot.write(45); //move motor first
        digitalWrite(LED_BUILTIN, HIGH);
        isWatering = false;
        
        //then send the message
        ivy.send("Finally my shits been watered....");
      }
    }
  }

  delay(1000);
}
}
