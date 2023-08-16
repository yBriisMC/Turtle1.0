const Discord = require("discord.js")

module.exports = {
  name: "botinfo",
  description: "[ 🧀 Utilidades ] Fornece informações sobre o bot.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let membros = client.users.cache.size;
    let servidores = client.guilds.cache.size;
    let canais = client.channels.cache.size;
    let bot = client.user.tag;
    let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
    let avatar = client.user.displayAvatarURL;
    let embed = new Discord.EmbedBuilder()
    .setColor(client.color)
    .setAuthor({ name: bot, iconURL: avatar_bot })
    .setFooter({ text: bot, iconURL: avatar_bot })
    .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
    .setDescription(`Olá ${interaction.user}, veja minhas informações abaixo:\n\n>  Nome: \`${bot}\`.\n> ** Owner:** <@790242538375086100>\n
\n>  Membros: \`${membros}\`.\n>  Servidores: \`${servidores}\`.\n>  Canais: \`${canais}\`.`);

    interaction.reply({ embeds: [embed] })


  }
}