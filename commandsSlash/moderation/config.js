const { EmbedBuilder, ApplicationCommand, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType } = require('discord.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
    name: 'config',
    description: '[ 🧀 Utilidades ] subcommand de config',
    options: [
            {
                name: 'ticket',
                description: '[ 🎫 Ticket ] Use para setar informações necessárias para usar ticket.',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                 {

            name: "chat",

            description: "Mencione um canal (Embed principal).",

            type: ApplicationCommandOptionType.Channel,
       

        channelTypes: [

          ChannelType.GuildText

        ],

            required: true,

        },
       {

            name: "categoria",

            description: "Escolha a categoria de ticket.",

            type: ApplicationCommandOptionType.Channel,

            channelTypes: [

                ChannelType.GuildCategory,

            ],

            required: true,

        },             
         {

            name: "logs",

            description: "Mencione um canal (Embed principal).",

            type: ApplicationCommandOptionType.Channel,

       

        channelTypes: [

          ChannelType.GuildText

        ],

            required: true,

        },
         {

            name: "staff",

            description: "mencione cargo para ver todos tickets abertos.",

            type: ApplicationCommandOptionType.String,

            required: true,

        },

            

        {

            name: "button",

            description: "Mensagem do botão (embed principal).",

            type: ApplicationCommandOptionType.String,

            required: false,

        },

        {

            name: "emoji",

            description: "emoji do botão (emned principal).",

            type: ApplicationCommandOptionType.String,

            required: false,

        },

        {

            name: "cor",

            description: "cor do embed (embed principal).",

            type: ApplicationCommandOptionType.String,

            required: false,

        },
                ],

            },
    ],

    run: async(client, interaction) => {

        switch (interaction.options.getSubcommand()) {

            case 'ticket': {
       

  if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator))

        return interaction.reply({

            content: `**❌ | ${interaction.user}, você não tem permissão de utilizar está comando`,

            ephemeral: true,

        })

//lets opções
let role = interaction.options.getRole("staff")
let channellogs = interaction.options.getChannel('logs')
let Categoria = interaction.options.getChannel("categoria")

//db Quick
await db.set(`staffticket${interaction.guild.id}`, role.id);
await db.set(`logsticket${interaction.guild.id}`, channellogs.id);
await db.set(`categoryticket${interaction.guild.id}`, Categoria.id);
                
 //ifs              
 if (!channellogs.send)

            return interaction.reply({

                content: `**❌ - ${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`,

                ephemeral: true,

            })


}
     }//getsubcmd
        }
    }