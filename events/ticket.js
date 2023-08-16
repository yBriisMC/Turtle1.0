const Discord = require("discord.js")
const client = require("..")
const discordTranscripts = require('discord-html-transcripts') 
const { QuickDB } = require("quick.db") 
const db = new QuickDB()

client.on("interactionCreate", async (interaction) => {

      let buttonname = await db.get(`buttonticket${interaction.guild.id}`);
      let cor = await db.get(`corticket${interaction.guild.id}`);
      let emoji = await db.get(`emojiticket${interaction.guild.id}`);
      let channel = await db.get(`chatticket${interaction.guild.id}`)
      let staff = await db.get(`staffticket${interaction.guild.id}`) || 'Nenhuma função de staff definida';
      let categoria = await db.get(`categoryticket${interaction.guild.id}`) || 'Nenhuma categoria definida';
      let logs = await db.get(`logsticket${interaction.guild.id}`) || 'Nenhum canal de logs definido';

if (staff === 'Nenhuma função de staff definida' || categoria === 'Nenhuma categoria definida' || logs === 'Nenhum canal de logs definido') {

  return interaction.reply({ content: 'Algumas configurações do ticket não foram definidas. Por favor, defina-as usando os comandos `/setmoderation, /setcategory, /setlogs`.', ephemeral: true});
    
}

// Restante do código para criar o ticket

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'ticketmodal') {

      const titulo = interaction.fields.getTextInputValue('titulo');
      const descricao = interaction.fields.getTextInputValue('descricao');

      const titulo02 = interaction.fields.getTextInputValue('titulo02');
      const descricao02 = interaction.fields.getTextInputValue('descricao02');

      await db.set(`titulo02${interaction.guild.id}`, titulo02);
      await db.set(`descricao02${interaction.guild.id}`, descricao02);

      const embed = new Discord.EmbedBuilder()
        .setTitle(titulo)
        .setColor(cor)
        .setDescription(descricao)
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})

     const button = new Discord.ButtonBuilder()
        .setCustomId('ticketopen')
        .setLabel(buttonname)
        .setStyle(2)
        .setEmoji(emoji)

      const row = new Discord.ActionRowBuilder().setComponents(button)

      const sucesso = new Discord.EmbedBuilder()
        .setTitle(titulo)
        .setColor(cor)
        .setDescription(descricao)
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})

      let canal = interaction.guild.channels.cache.get(channel);
      canal.send({ embeds: [embed], components: [row]})

      await interaction.reply({ ephemeral: true, embeds: [sucesso] , components: [row], content: `${client.emoji.verify} Painel enviando com sucesso confira em: <#${channel}>`});
      //await interaction.deferUpdate()
    }
  }//modal setpanel
if(interaction.isButton) {
    if (interaction.customId === 'ticketopen') {

const modalticketopen = new Discord.ModalBuilder()
        .setCustomId('modalticketopen')
        .setTitle(`Abrir Ticket`)
      const motivo = new Discord.TextInputBuilder()
        .setCustomId('motivo')
        .setLabel('Motivo.')
        .setPlaceholder('Escreva aqui motivo do Ticket!')
        .setStyle(Discord.TextInputStyle.Short)

         const firstActionRow = new Discord.ActionRowBuilder().addComponents(motivo);
      modalticketopen.addComponents(firstActionRow)
      await interaction.showModal(modalticketopen);
 }
}//open ticket
  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'modalticketopen') {
     console.log(`o Usuário ${interaction.user.username} clicou no botão de ticket da guilda: ${interaction.guild.name}`)

   
   const motivo = interaction.fields.getTextInputValue('motivo');
   let titu02 = await db.get(`titulo02${interaction.guild.id}`)
   let desc02 = await db.get(`descricao02${interaction.guild.id}`)  
   let a = interaction.guild.channels.cache.filter(c => c.parent == categoria).size
   let nome = `🎫-${interaction.user.username}-${interaction.user.id}`;
//console.log(interaction.user)
        
        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find((c) => c.topic === `${interaction.user.id}`)) {
          interaction.reply({ content: `❌ Você ja possui um ticket aberto!!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          topic: interaction.user.id,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            },
            {
              id: staff,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `${client.emoji.verify} Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setTitle(titu02)
          .setColor(cor)
          .setDescription(desc02)

          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("ticketclose")
         
              //.setEmoji(client.emoji.lixeira)
          .setLabel("Fechar Ticket")
          .setStyle(Discord.ButtonStyle.Secondary)
          );

          ch.send({content: `Motivo do ticket: ${motivo}`, embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
}
 }
}//modal ticket open
if(interaction.isButton) {
if (interaction.customId === 'ticketclose') {

    let ticket = interaction.channel.topic
    interaction.channel.edit({
        permissionOverwrites: [
          {
            id: staff,
            allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions],
          },
          {
            id: ticket,
            deny: [Discord.PermissionFlagsBits.ViewChannel],
          },
          {
            id: interaction.guild.id,
            deny: [Discord.PermissionFlagsBits.ViewChannel],
          }
        ],
      })

      let embed = new Discord.EmbedBuilder()
        .setColor(cor)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`O Membro ${interaction.user}\`(${interaction.user.id})\` Fechou o ticket, Escolha uma opção abaixo. `)

      let botoes = new Discord.ActionRowBuilder().addComponents([

        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Success)
          .setLabel('Reabrir')
          .setCustomId('reabrir'),
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Danger)
          .setLabel('Deletar')
          .setCustomId('deletar')])


      interaction.reply({ embeds: [embed], components: [botoes] })
   }
}//close ticket
if (interaction.isButton) {
    if (interaction.customId === 'reabrir') {

interaction.message.delete()

  let ticket = interaction.channel.topic
      interaction.channel.edit({
        permissionOverwrites: [
          {
            id: staff,
            allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions],
          },
          {
            id: ticket,
            allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions],
          },
          {

            id: interaction.guild.id,
            deny: [Discord.PermissionFlagsBits.ViewChannel],
          }
        ],
      })

      let embed = new Discord.EmbedBuilder()
        .setColor(cor)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`Ola, <@${ticket}>, O Membro ${interaction.user} Reabriu seu ticket.`)

      let button = new Discord.ButtonBuilder()
        .setLabel('Apagar Mensagem')
        .setStyle(2)
        .setCustomId('msg')

      const row = new Discord.ActionRowBuilder().addComponents(button)
      interaction.channel.send({ content: `<@${ticket}>`, embeds: [embed], components: [row] })
 }
}//reabrir ticket 
if(interaction.isButton) {
if (interaction.customId === 'deletar') {

      const topic = interaction.channel.topic
      const channel = interaction.channel
      const attachment = await discordTranscripts.createTranscript(channel);

      interaction.channel.delete()

      let embed = new Discord.EmbedBuilder()
        .setDescription(`Ticket de <@${topic}>\`(${topic})\` \n Deletado por ${interaction.user}\`(${interaction.user.id})\``)
        .setColor(cor)
        .setTimestamp()

      let canal = interaction.guild.channels.cache.get(logs)
      canal.send({ embeds: [embed], files: [attachment] })
}
 }//deletar ticket
if(interaction.isButton) {
if (interaction.customId === 'msg') {
interaction.message.delete()
}
 }//deletar msg
})//final interaction 