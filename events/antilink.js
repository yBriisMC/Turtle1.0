const { QuickDB } = require('quick.db')
const db = new QuickDB()
const Discord = require("discord.js")
const client = require("..")

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
    
  let verificando = await db.get(`antilink_${message.guild.id}`);

  if (!verificando || verificando === "off" || verificando === null || verificando === false) return;

  if (verificando === "on") {
    if (!message.channel.permissionsFor(message.author).has(Discord.PermissionFlagsBits.EmbedLinks))
      if (!message.channel.permissionsFor(message.author).has(Discord.PermissionFlagsBits.Administrator))

        if (message.content.includes("https".toLowerCase() || "http".toLowerCase() || "www".toLowerCase() || ".com".toLowerCase() || ".br".toLowerCase())) {

          message.delete();
          message.reply({

            content: `${message.author}`,

            embeds: [

              new Discord.EmbedBuilder()
                .setDescription(`**${message.author.tag},** Você não pode enviar links aqui.`)

                .setColor("Red")

            ], ephemeral: true

          }).then(reply => {

            setTimeout(() => {

              reply.delete();

            }, 13000); 

          });

        }

  }

})