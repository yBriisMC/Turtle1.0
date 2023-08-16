const Discord = require("discord.js")
const { QuickDB } = require("quick.db") 
const db = new QuickDB()

module.exports = {
  name: "setpanel", 
  description: "[ 🎫 Ticket ] Use para definir as mensagens do sistema de ticket.", 
  type: Discord.ApplicationCommandType.ChatInput,
options: [
        {
            name: "chat",
            description: "Mencione um canal.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "button",
            description: "Mensagem do botão (padrão: Open Ticket).",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "emoji",
            description: "emoji do botão.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "cor",
            description: "cor do embed (padrão: #2f3136).",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },

    ],

  run: async(client, interaction) => {

  if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator))
        return interaction.reply({
            content: `**❌ | ${interaction.user}, você não tem permissão de utilizar está comando`,
            ephemeral: true,
        })

   //lets opções
let chat = interaction.options.getChannel("chat")
let button = interaction.options.getString("button")
let emoji = interaction.options.getString("emoji")
let cor = interaction.options.getString("cor")
if(!button) button = "Open Ticket"
if(!emoji) emoji = `${client.emoji.ticket}`
if(!cor) cor = "#2f3136"

  //db Quick
await db.set(`chatticket${interaction.guild.id}`, chat.id);
await db.set(`buttonticket${interaction.guild.id}`, button);
await db.set(`emojiticket${interaction.guild.id}`, emoji);
await db.set(`corticket${interaction.guild.id}`, cor);

//modal
  let modal = new Discord.ModalBuilder()
                .setCustomId('ticketmodal')
                .setTitle('Mensagens do Sistema');

            let titu = new Discord.TextInputBuilder()
                .setCustomId('titulo')
                .setLabel("Titulo (Para abrir ticket)")
                .setStyle(1)
                .setPlaceholder('Digite o titulo (Primeira Linha)')
                .setRequired(false);

            let desc = new Discord.TextInputBuilder()
                .setCustomId('descricao')
                .setLabel("Descrição da mensagem (Para abrir ticket)")
                .setStyle(2)
                .setPlaceholder('Digite a Descrição.')
                .setRequired(false)

            let titu02 = new Discord.TextInputBuilder()
                .setCustomId('titulo02')
                .setLabel("Titulo (Dentro do ticket)")
                .setStyle(1)
                .setPlaceholder('Digite o titulo (Primeira Linha)')
                .setRequired(false);

            let desc02 = new Discord.TextInputBuilder()
                .setCustomId('descricao02')
                .setLabel("Descrição da mensagem (Dentro do ticket)")
                .setStyle(2)
                .setPlaceholder('Digite a Descrição.')
                .setRequired(false)

            const titulo = new Discord.ActionRowBuilder().addComponents(titu);
            const descricao = new Discord.ActionRowBuilder().addComponents(desc);
            const titulo02 = new Discord.ActionRowBuilder().addComponents(titu02);
            const descricao02 = new Discord.ActionRowBuilder().addComponents(desc02);

            modal.addComponents(titulo, descricao, titulo02, descricao02);

            await interaction.showModal(modal);
/*
let sucesso = new Discord.EmbedBuilder()
           .setDescription(`**${client.emoji.verify} - Mensagem enviada para canal:<#${channel}> !**`)
           .setColor(`#2f3136`)
           .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})


interaction.followUp({ content: `${interaction.user}`, embeds: [sucesso],  ephemeral: true})*/

  }
}