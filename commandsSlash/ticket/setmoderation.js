const Discord = require("discord.js")
const { QuickDB } = require("quick.db") 
const db = new QuickDB()

module.exports = {
  name: "setmoderation", 
  description: "[ 🎫 Ticket ] Use para definir quem poderá gerenciar tickets.", 
  type: Discord.ApplicationCommandType.ChatInput,
options: [
        {
            name: "staff",
            description: "Mencione um canal.",
            type: Discord.ApplicationCommandOptionType.Role,
            required: true,
        },

    ],

  run: async(client, interaction) => {

  if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator))
        return interaction.reply({
            content: `**❌ | ${interaction.user}, você não tem permissão de utilizar está comando`,
            ephemeral: true,
        })

   //lets opções
let role = interaction.options.getRole("staff")


  //db Quick
await db.set(`staffticket${interaction.guild.id}`, role.id);

let sucesso = new Discord.EmbedBuilder()

        .setColor(`#2f3136`)
        .setTitle(`** Sucesso**`)
        .setDescription(`${client.emoji.verify} Moderador de tickets setado como ${role}`)
         .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})

interaction.reply({ content: `${interaction.user}`, embeds: [sucesso],
            ephemeral: true, })
}
 }