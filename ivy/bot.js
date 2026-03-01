//import discord library
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

//import axios which sends HTTP requests
const axios = require("axios");

//creates new discord client/bot
const client = new Client({
  //intents say what the bot is allowed to do
  //guild messages and message content allows the bot to read them
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

//bot token
const BOT_TOKEN =
  "insert_token_here";

//IP address
const ESP_IP = "insert_IP_here";

//every time a message is sent in a channel this function runs
client.on("messageCreate", async (msg) => {
  //ignore if the bot sent the last message
  if (msg.author.bot) return;

  //everything lowercase
  const command = msg.content.toLowerCase();

  //status update-
  if (command === "/update") {
    try {
      //get sensor data from esp
      const response = await axios.get(`${ESP_IP}/update`);
      const moisture = response.data;

      //if values are good then chillin, if not dry ahh hell
      let condition =
        moisture > 500 ? "REAL ASHY RN... " : "Im aight twin 🤪";

      //send back to discord
      msg.reply(
        `**Ivy RN: **\nMoisture Level: ${moisture}\nCondition: ${condition}`,
      );
    } catch (err) {
      //error message
      msg.reply("Can't reach the plant. Is Ivy plugged in?");
    }
  }

  //manual command
  if (command === "/manual") {
    //sends request to esp and makes manual true
    axios
      .get(`${ESP_IP}/mode?val=manual`)
      .then(() =>
        msg.reply("Manual Mode: Don't forget about me... again... 😒"),
      )
      .catch(() => msg.reply("Failed to switch modes."));
  }

  //auto command
  if (command === "/auto") {
    //sends request to esp and makes manual false
    axios
      .get(`${ESP_IP}/mode?val=auto`)
      .then(() => msg.reply("Auto Mode: Me when I have to water myself..."))
      .catch(() => msg.reply("Failed to switch modes."));
  }

  //water command
  if (command === "/water") {
    msg.reply("About time I got some water... 😑");
    //triggers servo motor
    axios
      .get(`${ESP_IP}/water`)
      .catch(() => msg.reply("Error: Valve stuck or ESP offline."));
  }

  //funny
  if (command === "/meme") {
    //embedd gif
    const embed = new EmbedBuilder()
      .setTitle("Me rn...")
      .setImage("https://media.tenor.com/5xZHvwVoI-MAAAAC/sinisterbob.gif")
      .setColor("#964B00")
      .setFooter({ text: "Im WATCHING you..." });

    msg.channel.send({ embeds: [embed] });
  }

  //greeting command
  if (command === "/hello") {
    //embedd gif
    const embed = new EmbedBuilder()
      .setTitle("HIIIII")
      .setImage("https://media.tenor.com/GuoxuYY8CjEAAAAi/hi-hello.gif")
      .setColor("#00FF40")
      .setFooter({ text: "Wsg Twin" });

    msg.channel.send({ embeds: [embed] });
  }

  //purpose command
  if (command === "/lore") {
    //embedd gif
    const embed = new EmbedBuilder()
      .setDescription(
        "I'm ivy, a self-aware plant monitor that's tired of being thirsty. I'm powered by an ESP8266 acting as my physical body and a nodejs bridge that serves as my brain. I judge my owners neglect in real time and use a servo-controlled valve to water myself when things get too dry.",
      )
      .setImage("https://media.tenor.com/MjbJccW8NkcAAAAd/cities-funny.gif")
      .setColor("#E7009A")
      .setFooter({ text: "Lore" });

    msg.channel.send({ embeds: [embed] });
  }

  //rage command
  if (command === "/rage") {
    //array of gifs
    const rageGifs = [
      "https://media.tenor.com/K2lzDHgGewMAAAAd/rage.gif",
      "https://media.tenor.com/uZ_UN-KXKBIAAAAi/alien-cat.gif",
      "https://media.tenor.com/dbE3NM5jQPgAAAAC/caseoh-lc85.gif",
    ];

    //get random gif from list
    const randomGif = rageGifs[Math.floor(Math.random() * rageGifs.length)];
    const embed = new EmbedBuilder()
      .setTitle("Ivy is Tweaking")
      .setDescription("I am Dying of Thirst")
      .setImage(randomGif)
      .setColor("#B70000")
      .setFooter({ text: "RAGE" });
    msg.channel.send({ embeds: [embed] });
  }

  //explode command
  if (command === "/explode") {
    //array of gifs
    const explodeGifs = [
      "https://media.tenor.com/UU4SQdD9T9AAAAAC/explosion-cat.gif",
      "https://media.tenor.com/Mow3BwJQLc8AAAAi/cat-cat-meme.gif",
      "https://media.tenor.com/eH8_PWzTdfcAAAAi/furry-memes-meteor.gif",
      "https://media.tenor.com/kQevh4gr6LwAAAAi/cat-brick.gif",
    ];

    //get random gif from list
    const randomGif =
      explodeGifs[Math.floor(Math.random() * explodeGifs.length)];
    const embed = new EmbedBuilder()
      .setTitle("Ivy just Self Destructed")
      .setDescription("I have no water so im going to blow up")
      .setImage(randomGif)
      .setColor("#F98705")
      .setFooter({ text: "BOOM" });

    msg.channel.send({ embeds: [embed] });
  }

  if (command === "/facts") {
    //array of gifs
    const factGifs = [
      "https://media.tenor.com/J9WzCvxHZEsAAAAd/ishowspeed-ishowspeed-yeah-right.gif",
      "https://media.tenor.com/Y7wZjkZx1ksAAAAi/monkey-thinking-meme-monkey-thinking-sticker.gif",
      "https://media.tenor.com/_V8TTKAXYB0AAAAC/spongebob-squarepants-sunglasses.gif",
      "https://media.tenor.com/7hVDSZTUqc8AAAAC/moneky-reading-book.gif",
      "https://media.tenor.com/557-iy3uAmUAAAAi/apu-apustaja-apu.gif",
      "https://media.tenor.com/wVj3vy6H8EIAAAAd/bookio.gif",
    ];

    const ivyFacts = [
      //project facts
      "Ivy uses an ESP8266 Microcontroller as its physical body to communicate through Wifi",
      "The Node.JS bridge acts as Ivy's brain. She processes Discord Commands into hardware actions",
      "This project uses a restful API architecture to connect JavaScript and C++",

      //plant facts
      "The smell of freshly cut grass is actually a chemical distress call emitted by the plant to warn other parts of the plant or nearby plants of danger",
      "Plant cells are totipotent, meaning they can act as stem cells and are theoretically immortal",
      "Roots can hear, responding to vibrations from water flowing in pipes to find water sources",

      //pothos facts
      "Pothos plants are nicknamed 'Devils Ivy' because they are almost impossible to kill",
      "A Pothos plant can survive in low light and can even thrive in just a jar of water",
      "Pothos plants are experts at air purification. They remove tocins like Formaldehyde from the room",
      "In the wild, pothos leves can grow to be over three feet long",
    ];

    //get random gif from list
    const randomGif = factGifs[Math.floor(Math.random() * factGifs.length)];
    //get random fact from list
    const randomFact = ivyFacts[Math.floor(Math.random() * ivyFacts.length)];
    const embed = new EmbedBuilder()
      .setTitle("Did you know...")
      .setDescription(randomFact)
      .setImage(randomGif)
      .setColor("#F98705")
      .setFooter({ text: "Now you know 🤓" });

    msg.channel.send({ embeds: [embed] });
  }

  if (command === "/dance") {
    //array of gifs
    const explodeGifs = [
      "https://media.tenor.com/UU4SQdD9T9AAAAAC/explosion-cat.gif",
      "https://media.tenor.com/Mow3BwJQLc8AAAAi/cat-cat-meme.gif",
      "https://media.tenor.com/eH8_PWzTdfcAAAAi/furry-memes-meteor.gif",
      "https://media.tenor.com/kQevh4gr6LwAAAAi/cat-brick.gif",
    ];

    //get random gif from list
    const randomGif =
      explodeGifs[Math.floor(Math.random() * explodeGifs.length)];
    const embed = new EmbedBuilder()
      .setTitle("Ivy just Self Destructed")
      .setDescription("I have no water so im going to blow up")
      .setImage(randomGif)
      .setColor("#F98705")
      .setFooter({ text: "BOOM" });

    msg.channel.send({ embeds: [embed] });
  }

  //help command (tells all commands\)
  if (command === "/help") {
    const helpEmbed = new EmbedBuilder()
      .setTitle("🌿 Ivy's Command Manual")
      .setDescription(
        "Use these commands to interact with Ivy's brain and body.",
      )
      .addFields(
        {
          name: "🛠 Hardware & Tech",
          value:
            "`/update` - Live moisture check\n`/graph` - Visual moisture bar\n`/threshold [num]` - Set dry limit\n`/water` - Manual hydration\n`/led` - Toggle ESP heartbeat\n`/scream` - Activate piezo buzzer",
          inline: false,
        },
        {
          name: "🤖 System Modes",
          value:
            "`/auto` - Let Ivy take control\n`/manual` - Disable auto-watering",
          inline: true,
        },
        {
          name: "📖 Lore & Personality",
          value: "... `/music` - Ivy's random wav files ...",
          inline: false,
        },
        {
          name: "⚙️ Utility",
          value:
            "`/clear` - Wipe chat (20 msgs)\n`/link` - GitHub Repo\n`/credits` - The creators",
          inline: true,
        },
      )
      .setColor("#3EC2FF")
      .setFooter({ text: "WiCHacks 2026 • Ivy Ecosystem" });

    msg.channel.send({ embeds: [helpEmbed] });
  }

  //graph command
  if (command === "/graph") {
    axios.get(`${ESP_IP}/update`).then((res) => {
      const val = parseInt(res.data);
      const max = 1024;
      const segments = 10;
      const filled = Math.round((val / max) * segments);
      const bar = "█".repeat(filled) + "░".repeat(segments - filled);
      msg.reply(`moisture levels: [${bar}] (${val})`);
    });
  }

  //led command
  if (command === "/led") {
    axios.get(`${ESP_IP}/led`).then(() => msg.reply("esp8266 LED toggled"));
  }

  //scream command
  if (command === "/scream") {
    axios.get(`${ESP_IP}/scream`);
    const screamEmbed = new EmbedBuilder()
      .setTitle("AAAAAAHHHHHHHHHH!!!!!!!!")
      .setImage("https://media.tenor.com/yH0cyIyjDsQAAAAj/letsgo-letsgoo.gif")
      .setColor("#FF0000");
    msg.channel.send({ embeds: [screamEmbed] });
  }

  //clear command
  if (command === "/clear") {
    msg.channel.bulkDelete(20).then(() => {
      msg.channel
        .send("Cleaned up the chat!!")
        .then((m) => setTimeout(() => m.delete(), 3000));
    });
  }

  //link command
  if (command === "/link") {
    msg.reply(
      "**Project Repo** ['https://github.com/arielnotoreo/Ivy_WiCHacks2026']",
    );
  }

  // credits command
  if (command === "/credits") {
    const creditEmbed = new EmbedBuilder()
      .setTitle("🌿 Ivy's Creators")
      .setDescription(
        "Built with passion and sleepless nights for **WiCHacks 2026**.",
      )
      .addFields(
        {
          name: "👥 The Team",
          value: "• **Presley Smith**\n• **Ariel Cthwe**\n• **McKenzie Lam**",
          inline: false,
        },
        {
          name: "💻 Software Stack",
          value:
            "• **Node.js** (Brain/Bridge)\n• **Discord.js** (Interface)\n• **Arduino C++** (Firmware)\n• **Axios** (API Requests)",
          inline: true,
        },
        {
          name: "🔌 Hardware Stack",
          value:
            "• **ESP8266** (Microcontroller)\n• **Capacitive Sensor** (Moisture)\n• **MG90S Servo** (Physical Action)\n• **Piezo Buzzer** (Feedback)",
          inline: true,
        },
      )
      .setColor("#FFD700") // Gold for credits
      .setThumbnail("https://media.tenor.com/5xZHvwVoI-MAAAAC/sinisterbob.gif")
      .setFooter({ text: "Thank you for checking out Ivy!" });

    msg.channel.send({ embeds: [creditEmbed] });
  }

  //change threshold function
  if (msg.content.startsWith("/threshold")) {
    // changed messageLink to msg
    const args = msg.content.split(" "); // changed message to msg
    const newLimit = args[1];

    if (!newLimit || isNaN(newLimit)) {
      return msg.reply(
        "Brother you gotta give me a number. EXAMPLE - '/threshold 600' ",
      );
    }

    axios
      .get(`${ESP_IP}/threshold?val=${newLimit}`)
      .then((res) => {
        const successEmbed = new EmbedBuilder()
          .setTitle("calibration updated")
          .setDescription(
            `Ivy will now start yelling if moisture hits **${newLimit}**`,
          )
          .setColor("#E1FF00")
          .setFooter({ text: `current value: ${res.data}` });
        msg.channel.send({ embeds: [successEmbed] });
      })
      .catch((err) => msg.reply("ESP is ghosting me. Check connection again"));
  }

  if (command === "/music") {
    const songs = [
      "./sounds/pretzel.mp3",
      "./sounds/Back in Chinatown.mp3",
      "./sounds/harmonics.mp3",
      "./sounds/lofi.mp3",
      "./sounds/moon.mp3",
      "./sounds/sum light.mp3",
      "./sounds/synth.mp3",
    ];

    //get raendom song
    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    //make attachment
    const attachment = new AttachmentBuilder(randomSong);

    //send with text
    msg.channel.send({
      content: "You know what... Sure...\n _This Song was created by Presley Smith_",
      files: [attachment],
    });
  }
});

//log into discord
client.login(BOT_TOKEN);