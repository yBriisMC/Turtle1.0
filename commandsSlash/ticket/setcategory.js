const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'setcategory',
    description: "[ 🎫 Ticket ] Use para definir categoria dos tickets.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "categoria",
            description: "Escolha a categoria de ticket.",
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [
                Discord.ChannelType.GuildCategory,
            ],
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**❌ - Você não possui permissão para utilizar este comando.**`, ephemeral: true })
         } else {
            
            let Categoria = interaction.options.getChannel("categoria")

              

 
                await db.set(`categoryticket${interaction.guild.id}`, Categoria.id);
            
                let embedCategoriaSet = new Discord.EmbedBuilder()
                 .setDescription(`**${client.emoji.verify} - Categoria ${Categoria} setado para Categoria de tickets!**`)
                 .setColor(`#2f3136`)
                 .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
           
                 interaction.reply({ embeds: [embedCategoriaSet], ephemeral: true})
                  
        }
        
 

 

    }
} 