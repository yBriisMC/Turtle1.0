const Discord = require('discord.js');
//const { durationTime } = require('util-stunks') 
const 
{ EmbedBuilder, 
    ActionRowBuilder, 
    TextInputStyle, 
    TextInputBuilder 
} = require('discord.js')

module.exports = {
    name: "configbot",
    description: "[ 🌟 Owner ] Painel De configuração do bot.",
    type: Discord.ApplicationCommandOptionType.ChatInput,

    run: async(client, interaction) => {

        const server = interaction.guild.members.cache.get(client.user.id)

        let embedConteúdo = new EmbedBuilder()
         .setTitle(`${client.user.username}`)
         .setDescription(`*Olá, me chamo ${client.user.username}! Abaixo há algumas informações sobre mim.*`)
         .setColor('Red')
         .setThumbnail(`${client.user.displayAvatarURL()}`)
         .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})
       
         .addFields(
            {
                name: '🆔 - ID:',
                value: `\`\`\`${client.user.id}\`\`\``,
                inline: true,
                
            },
            {
                name: '🤖 - Bot?',
                value: `**${client.user.bot ? "Sim" : "Não"}**`,
                inline: true,
            },
                {
             name: `🚀 - Server Booster`,
             value: `${server.premiumSince
             ? `Desde <t:${Math.ceil(interaction.guild.premiumSinceTimestamp / 1000)}>`
              : "Não"
             }`,
              inline: true,
            },
            {
                name: '📅 - Entrou no Servidor:',
                value: `<t:${Math.ceil(server.joinedTimestamp / 1000)}:F>`,
                inline: false,
            },
            {
                name: `📆 - Criado:`,
                value: `<t:${parseInt(client.user.createdTimestamp / 1000)}>`,
                inline: false,
            },
             {

                name: `🙋- me adicione`,

                value: `[${client.user.username}](https://discord.com/api/oauth2/authorize?client_id=1061545216823279666&permissions=8&scope=bot)`,

                inline: false,

            },
         )

         const selectBOT = new ActionRowBuilder()
          .addComponents(
            new Discord.StringSelectMenuBuilder()
            .setCustomId('select2')
            .setPlaceholder('📌 - Opções')
            .addOptions(
                {
                    label: ' - Cargos',
                    description: 'Clique aqui para ver os cargos do BOT.',
                    emoji: '🚀',
                    value: 'cargos',
                },
                {
                    label: ' - Configurar',
                    description: 'Clique aqui para configurar o BOT (👑 Owner Bot).',
                    emoji: '🔧',
                    value: 'config',
                },

                
            ),
            
          )

         interaction.reply({  content: `${interaction.user}`, embeds: [embedConteúdo], components: [selectBOT], ephemeral: true})
    }
}