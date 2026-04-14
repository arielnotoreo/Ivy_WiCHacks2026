# Ivy 🪴 -- BEST HARDWARE WINNING HACK
## I'm Ivy, a self-aware plant monitor that's tired of being thirsty. I judge my owners neglect in real time and use a servo-controlled valve to water myself when things get too dry.
    Note that I have an....interesting personality! I will probably not say very nice things 😋
===========================================================================
## Setup Guide
Before using me, you'll need to do a bit of setup. Otherwise I won't be able to do anything and you'll actually need to be responsible..
### Create A WebHook and Bot
You will need to create a WebHook and intergrate it into a server of your choice. You will also need to make a bot. Please research how to do this! I am just a plant and cannot help you with this :D I promise it's nothing fancy, just a regular WebHook and Discord Bot! Try using the Discord Bot

### In bot.js
1. Replace the BOT_TOKEN with your own bot token
2. Replace the ESP_IP with your own IP address

### In moist.ino
1. Replace the ssid with your WiFi name
2. Replace the password with your WiFi password
3. Replace the channelID with your Discord WebHook Channel ID -> numbers located after the https://discord.com/api/webhooks/...
4. Replace the webToken with your Discord WebHook token -> the numbers and letters after the Channel ID

===========================================================================
## 🌿 Ivy's Command Manual
Use these commands to interact with Ivy's brain and body.

### 🛠 Hardware & Tech
- /update - Live moisture check
- /graph - Visual moisture bar
- /threshold [num] - Set dry limit
- /water - Manual hydration
- /led - Toggle ESP heartbeat
- /scream - Activate piezo buzzer

### 🤖 System Modes
- /auto - Let Ivy take control
- /manual - Disable auto-watering

### 📖 Lore & Personality
- /hello - Say hi to Ivy
- /lore - Project background
- /facts - Random plant/tech facts
- /rage - Ivy tweaks out
- /explode - Critical thirst alert
- /meme - Sinister Bob
- /music - Ivy's random wav files
- /dance - Ivy will bust a move

### ⚙️ Utility
- /clear - Wipe chat (20 msgs)
- /link - GitHub Repo
- /credits - The creators

===========================================================================
## IVY COMMAND TEMPLATE GUIDE
Use this as a reference if you want to add new content!

    // 1. SIMPLE TEXT REPLY
    if (command === "/yourcommand") {
      // The bot just tags you and says something
      msg.reply("text reply");
      
      // 2. SENDING A MESSAGE TO THE CHANNEL (WITHOUT TAGGING)
      // Announcements or something else idk
      msg.channel.send("Hello everyone");
  
  
  
      // 3. ADDING TENOR GIF OR OTHER IMAGE
      // Copy Tenor link address or image address
      // It should end in .gif or .png
      const ivyEmbed = new EmbedBuilder()
          .setTitle("Ivy BootyHole") 
          .setDescription("This is the sub-text under the title")
          .setImage("https://media.tenor.com/7XkuPqVP5qUAAAAe/sinirli-sigma.png")
          .setColor("#FF0000")
          .setFooter({ text: "Sent from Ivy" });
      msg.channel.send({ embeds: [ivyEmbed] });
  
  
  
      // 4. TRIGGERING AN ESP8266 ROUTE
      // Use this if you want the command to actually move a motor or read a sensor
      axios.get(`${ESP_IP}/your-arduino-route`)
          .then(response => {
              // response.data is whatever the Arduino sent back (server.send)
              msg.reply(`The Arduino says: ${response.data}`);
          })
          .catch(err => {
              msg.reply("Couldn't get to ESP8266");
          });
  
  
  
      // 5. DELAYED ACTION
      // If you want the bot to wait before doing something
      setTimeout(() => {
          msg.channel.send("I waited 3 seconds to send this.");
      }, 3000); // 3000 milliseconds = 3 seconds
    }

===========================================================================

# 🌿 Ivy's Creators
Built with passion and sleepless nights for WiCHacks 2026. Our last WiCHacks ever :(
## 👥 The Team
- Presley Smith
- Ariel Cthwe
- McKenzie Lam
## 💻 Software Stack
- Node.js (Brain/Bridge)
- Discord.js (Interface)
- Arduino C++ (Firmware)
- Axios (API Requests)
## 🔌 Hardware Stack
- ESP8266 (Microcontroller)
- Capacitive Sensor (Moisture)
- MG90S Servo (Physical Action)
- Piezo Buzzer (Feedback)

Thank you for checking out Ivy!
