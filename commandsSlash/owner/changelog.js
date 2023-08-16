const Discord = require("discord.js");

module.exports = {
  name: "changelog",
  description:
    "[ 🌟 Owner ] Envia uma mensagem em todas das guildas do bot no cache",
  options: [
    {
      name: "mensagem",
      description: "A mensagem de anuncio a ser enviada",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    if (interaction.user.id !== client.config.owner) {
      return interaction.reply({
        content:
          "Você tem permissão para utilizar este comando. Somente o **Owner Bot** tem acesso a este comando!",
        ephemeral: true,
      });
    }

    const message = interaction.options.getString("mensagem");
    let nome = "🐢-turtle-anuncios";
      

  // Loop através de todas as guilds do bot

  for (const guild of client.guilds.cache.values()) {

    try {

      // Encontra o canal com o nome "🐢-turgle-anuncios"

      const channel = guild.channels.cache.find(c => c.name === '🐢-turtle-anuncios');

      

      // Verifica se o canal foi encontrado

      if (!channel) {

        console.log(`Canal não encontrado em ${guild.name}.`);

        return;
          

      }

      

      // Envia o embed no canal encontrado

      const embed = new Discord.EmbedBuilder()

        .setTitle('🐢 Turtle Atualizações')

        .setDescription(message)

        .setColor(client.color);

      await channel.send({ content: '@here', embeds: [embed] });

      

    } catch (error) {

      console.log(`Erro ao enviar embed em ${guild.name}: ${error}`);

    }

  }
  }
};
