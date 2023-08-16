const Discord = require("discord.js")
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
    name: "help",
    description: "[ 🧀 Utilidades ] Meu Menu De Comandos", 
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        var cor = client.config.color
        let embed = new Discord.EmbedBuilder()
        .setColor(cor)
        .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
        .setTitle("TurtleTools")
        .setImage("https://cdn.discordapp.com/attachments/1035757599712366663/1072353104642711673/2fba7ee37077c4fd648c0af4e2eaba71.png")
        .addFields(
            { name: `Precisa de ajuda?`, value: `entre aqui [server](https://discord.io/TurtleTools)`, inline: false },
            { name: `Me adicione!`, value: `me adicione [clique aqui](https://discord.com/api/oauth2/authorize?client_id=1061545216823279666&permissions=8&scope=bot)`, inline: false },
        )
        .setImage("https://cdn.discordapp.com/attachments/1035757599712366663/1072353104642711673/2fba7ee37077c4fd648c0af4e2eaba71.png")

        const painel = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder(`Veja aqui`)
                .addOptions(
                  /*  {
                        label: `Interação`,
                        emoji: "🧀 ",
                        value: 'value1',
                    },*/
                    {
                        label: `Moderação`,
                        //emoji: " ",
                        value: 'value2',
                    },
                    {
                        label: `Utilidade`,
                      //  emoji: ":cheese:",
                        value: 'value3',
                    },
                    {
                        label: `Ticket`,
                       // emoji: " ",
                        value: 'value4',
                    },
                    /*{
                        label: `Economia`,
                        emoji: "<:dock:1072214713464803408> ",
                        value: 'value5',
                    },*/
                ),
        );

        interaction.reply({ embeds: [embed], components: [painel] }).then(msg => {
            const user1 = interaction.user
            const filter = (interaction) => {
                if(interaction.user.id == user1.id) return true; 
                else {
                    interaction.reply({ content: client.lang.COMMANDS.INFO.HELP.ERROR.replace(/<no>/g, emoji.no).replace(/<user>/g, user1), ephemeral: true })
                }
            }

            const coletor = msg.createMessageComponentCollector({
                filter
            })

            coletor.on('collect', async (collected) => {
                let valor = collected.values[0]
                collected.deferUpdate()

                if (valor == "value1") {
                    let embed = new Discord.EmbedBuilder()
                    .setDescription(`there is nothing here`)
                    .setColor(cor)
                    .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
                    interaction.editReply({ embeds: [embed] })
                } else if (valor == "value3") {
                    let embed = new Discord.EmbedBuilder()
                    .setDescription(`\n\n/botinfo\n/user info\n/info-server\n/reportar-bug\n/userinfo`)
                    .setColor(cor)
                    .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
                    interaction.editReply({ embeds: [embed] })
                } else if (valor == "value2") {
                    let embed = new Discord.EmbedBuilder()
                    .setDescription(`\n\n/ban\n/clear\n/kick\n/lock\n/unlock\n/unban`)
                    .setColor(cor)
                    .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
                    interaction.editReply({ embeds: [embed] })
                } else if (valor == "value4") {
                    let embed = new Discord.EmbedBuilder()
                    .setDescription(`/setpanel\n/setlogs\n/setcategory\n/setmoderator`)
                    .setColor(cor)
                    .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
                    interaction.editReply({ embeds: [embed] })
                } else if (valor == "value5") {
                    let embed = new Discord.EmbedBuilder()
                    .setDescription(`\n\n/apostar\n/atm\n/daily\n/assaltar\n/pay\n/fazer-gf\n/trabalhar`)
                    .setColor(cor)
                    .setImage("https://cdn.discordapp.com/attachments/1035757599712366663/1072353104642711673/2fba7ee37077c4fd648c0af4e2eaba71.png")
                    .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
                    interaction.editReply({ embeds: [embed] })
                } else {
                    let embed = new Discord.EmbedBuilder()
                    .setColor(cor)
                    .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
                    .setDescription(client.lang.COMMANDS.INFO.HELP.EMBED_DESC1.replace(/<user>/g, interaction.user).replace(/<bot>/g, client.user))
                    .addFields(
                        { name: `Precisa de ajuda?`, value: `entre aqui [server](discord.gg/lojinha)`, inline: false },
                        { name: `Me adicione!`, value: `me adicione [clique aqui](https://discord.com/api/oauth2/authorize?client_id=1027989884893397093&permissions=3843929668855&scope=bot)`, inline: false },
                    )
                    .setImage("https://cdn.discordapp.com/attachments/1035757599712366663/1072353104642711673/2fba7ee37077c4fd648c0af4e2eaba71.png")
                    interaction.editReply({ embeds: [embed] })
                }
            })
        })
    }
}