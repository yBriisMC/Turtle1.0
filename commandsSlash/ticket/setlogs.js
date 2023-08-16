const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'setlogs',
    description: "[ 🎫 Ticket ] Use para definir canal de logs",
    options: [
      {
        name: 'canal',
        description: 'Mencione o canal',
        type: Discord.ApplicationCommandOptionType.Channel,
        channelTypes: [
          Discord.ChannelType.GuildText
        ],
        required: true,
      }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**❌ - Você não possui permissão para utilizar este comando.**`, ephemeral: true })
        } else {

            
            let channel = interaction.options.getChannel('canal')

            if (!channel.send)
            return interaction.reply({
                content: `**❌ - ${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`,
                ephemeral: true,
            })

            await db.set(`logsticket${interaction.guild.id}`, channel.id);
            
          let embedLogTicket = new Discord.EmbedBuilder()
           .setDescription(`**${client.emoji.verify} - Canal ${channel} setado para Logs de Tickets!**`)
           .setColor(`#2f3136`)
           .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
     
           interaction.reply({ embeds: [embedLogTicket], ephemeral: true })
            
        }

 

    }
} 