const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({intents: [1, 512, 32768, 2, 128, 3276799]});
const errorChannelId = '1075988744047444068';

client.config = require("./config.json")
client.emoji = require("./emojis.json")
client.color = client.config.color
//client.bedrock = require('bedrock-protocol')
client.slashCommands = new Discord.Collection()
module.exports = client;
fs.readdirSync('./handler').forEach((handler) => {
	require(`./handler/${handler}`)(client)
});

/*process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.error(`Uncaught Exception: ${err}\n${err.stack}`);
  const errorChannel = client.channels.cache.get(errorChannelId);
  if (errorChannel) {
    errorChannel.send(`Exce�0�4�0�0o n�0�0o capturada: ${err}\n${err.stack}`);
  }
});
process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled Rejection at: ${reason.stack}`);
  const errorChannel = client.channels.cache.get(errorChannelId);
  if (errorChannel) {
    errorChannel.send(`Rejei�0�4�0�0o n�0�0o tratada em: ${reason.stack}`);
  }
});
process.on('warning', (warning) => {
  console.warn(`Warning: ${warning}`);
  const errorChannel = client.channels.cache.get(errorChannelId);
  if (errorChannel) {
    errorChannel.send(`Aviso: ${warning}`);
  }
});
process.on('exit', (code) => {
  console.log(`Process is about to exit with code: ${code}`);
  const errorChannel = client.channels.cache.get(errorChannelId);
  if (errorChannel) {
    errorChannel.send(`O processo est�� prestes a sair com c��digo: ${code}`);
  }
});*/

const cfonts = require('cfonts');
const banner = cfonts.render((`Turtle`), {
        font: 'block',
        color: 'candy',
        align: 'left',
        gradient: ["red","magenta"],
        lineHeight: 3
    });
console.log(banner.string);

client.on('ready', () => {
   let status = [
      `Olá, meu nome é Tartaruga /help `,
      `Hello, my name is Turtle /help `,
    ],
        i = 0
setInterval(() => { client.user.setActivity(`${status[i++ % status.length]}`, {
        type: Discord.ActivityType.Playing
      })
    }, 50000);   
  })

client.login(client.config.token);