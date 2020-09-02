const discord = require("discord.js");
const fs = require("fs");
const { Prefix, Token, Owner_ID, Color } = require("./config.json");
const client = new discord.Client();

//________________________________________________________________________________________________________________________________________________




client.on("ready", () => {
  function randomStatus() {
    let status = [`${client.users.cache.size} Users`, `${client.guilds.cache.size} Servers`, `s.help | Command v1`] // You can change it whatever you want.
    let rstatus = Math.floor(Math.random() * status.length);
    
    // client.user.setActivity(status[rstatus], {type: "WATCHING"}); 
    // You can change the "WATCHING" into STREAMING, LISTENING, and PLAYING.
    // Example: streaming
    
    client.user.setActivity(status[rstatus], {type: "PLAYING"});
  };setInterval(randomStatus, 20000) // Time in ms. 30000ms = 30 seconds. Min: 20 seconds, to avoid ratelimit.
  
  console.log("Ready to use");
});



//________________________________________________________________________________________________________________________________________________

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})


//________________________________________________________________________________________________________________________________________________



const prefix = 's.';



//________________________________________________________________________________________________________________________________________________






client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "bot") return;

  let msg = message.content.toLowerCase();
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return undefined;
  message.prefix = prefix;
  let { cooldown } = require("./cooldown.js");
  let commandcooldown = cooldown;

  if (!msg.startsWith(prefix)) return;
  if (commandcooldown.has(message.author.id)) {
    return message.channel.send("Waiting Cooldown 5 sec")
  } else if(message => message.delete(5000));
  
  commandcooldown.add(message.author.id);
  setTimeout(() => {
    commandcooldown.delete(message.author.id);
  }, 5000);

    
    try {
    let commandFile = require(`./cmds/${cmd}.js`);
    commandFile.run(client, message, args);
  } catch (e) {
  } finally {
    console.log(`${message.author.username} Menggunakan Command : ${cmd}`);
  }

});



client.login("TOKEN BOT U DSINI");