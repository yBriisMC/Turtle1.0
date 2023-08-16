const Discord = require('discord.js');
const client = require("..")
        client.on("interactionCreate", async (interaction) => {

            if (interaction.isStringSelectMenu()) {

              let choice = interaction.values[0]

              const member = interaction.member

              const server = interaction.guild.members.cache.get(client.user.id)

          

              //Username

              if (interaction.isStringSelectMenu()) {

                if (choice === "cargos") {

              let embedCargos = new Discord.EmbedBuilder()

               .setColor('Random')

               .setTitle(`🚀 -  Os cargos de ${client.user.username} são:`)

               .setDescription(`- ${server.roles.cache.sort

                ((a, b) => b.position - a.position)

                .filter((role) => role != interaction.guild.roles.client.user)

                .map((role) => role).join("\n -") || `Nenhum`}`)

               .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})



               interaction.reply({ embeds: [embedCargos],

              ephemeral: true

            })

        }  else if(choice === "config") {

            if(interaction.user.id != `${client.config.owner}`) {

                return interaction.reply({

                    content: `**❌ - Você precisa da permissão \`Owner BOT\` para usar este comando!**`,

                    ephemeral: true,

                })

            } else {

                let ConfigBotao = new Discord.ActionRowBuilder().addComponents(

                    new Discord.ButtonBuilder()

                    .setLabel(` - Username`)

                    .setEmoji(`📒`)

                    .setCustomId('username')

                    .setStyle(Discord.ButtonStyle.Secondary),

                    new Discord.ButtonBuilder()

                    .setLabel(` - Avatar`)

                    .setEmoji(`🖼️`)

                    .setCustomId('avatar')

                    .setStyle(Discord.ButtonStyle.Primary),

                    new Discord.ButtonBuilder()

                    .setLabel(` - Status`)

                    .setEmoji(`💼`)

                    .setCustomId('status')

                    .setStyle(Discord.ButtonStyle.Danger)

                )  

                

                let embedConfig = new Discord.EmbedBuilder()

                .setTitle(`🔧 - Configurar`)

                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

                 .setDescription(`*Escolha a mudança que você deseja realizar para ${client.user.username}:\n\`\`\`⠀\`\`\`*`)

                 .setImage(`${client.user.displayAvatarURL({ size: 2048 })}`)

                 .addFields(

                    {

                        name: '**📌 - Username**',

                        value: `Inerir um novo Username para o BOT.`,

                        inline: false,

                    },

                    {

                        name: '**🌆 - Avatar**',

                        value: `Inserir uma URL pra trocar o avatar do BOT.`,

                        inline: false,

                    },

                    {

                        name: '**📱 - Status**',

                        value: `*Mudar o Status do BOT para um personalizado.*`,

                        inline: false,

                    },

                    {

                        name: '⠀',

                        value: '\`\`\`⠀\`\`\`',

                        inline: false,

                    },

                 )

                 .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})

                 interaction.reply({ embeds: [embedConfig], components: [ConfigBotao], ephemeral: true })



            };

         };



    }





}

    if(interaction.isButton()) {

    if(interaction.customId.startsWith("username")) {

        const modal_username = new Discord.ModalBuilder()

        .setCustomId('username_modal')

        .setTitle(`🔧 - Configurar - Username`)

      const nome_bot = new Discord.TextInputBuilder()

        .setCustomId('username_bot')

        .setLabel('Digite o Username do bot.')

        .setPlaceholder('Escreva aqui!')

        .setStyle(Discord.TextInputStyle.Short)



      const firstActionRow = new Discord.ActionRowBuilder().addComponents(nome_bot);

      modal_username.addComponents(firstActionRow)

      await interaction.showModal(modal_username);



      interaction.followUp({ content: `**💼 - Lembre-se! Não abuse deste botão para evitar erros no terminal do BOT.**`, 

      ephemeral: true

    })

   } else if(interaction.customId === "avatar") {

     const modal_avatar = new Discord.ModalBuilder()

      .setCustomId('modal_avatar')

      .setTitle(`🔧 - Configurar - Avatar`)

     const avatar_bot_modal = new Discord.TextInputBuilder()

      .setCustomId('bot_avatar')

      .setLabel('URL da Imagem:')

      .setPlaceholder('URL do novo Avatar aqui!')

      .setStyle(Discord.TextInputStyle.Short)

     const SecondActionRow = new Discord.ActionRowBuilder().addComponents(avatar_bot_modal)

      modal_avatar.addComponents(SecondActionRow)

      await interaction.showModal(modal_avatar);



      interaction.followUp({ content: `**💼 - Lembre-se! Não abuse deste botão para evitar erros no terminal do BOT.**`, 

      ephemeral: true

    })



   } else if(interaction.customId.startsWith("status")) {

    const modal_status = new Discord.ModalBuilder()

    .setCustomId('modal_status')

    .setTitle(`🔧 - Configurar - Status`)



   const status_modal1 = new Discord.TextInputBuilder()

    .setCustomId('bot_status_atividade')

    .setLabel('Insira o Texto de Atividade:')

    .setStyle(Discord.TextInputStyle.Paragraph)

    .setRequired(true)



    const status_modal2 = new Discord.TextInputBuilder()

    .setCustomId('bot_status_presença')

    .setLabel('Insira o Tipo de Presença:')

    .setPlaceholder(` Online, Ausente, Invisível, Não Pertubar`)

    .setStyle(Discord.TextInputStyle.Short)

    .setRequired(true)

    const status_modal3 = new Discord.TextInputBuilder()

    .setCustomId('bot_status_tipo')

    .setLabel('Insira o Tipo de Atividade:')

    .setPlaceholder(`Jogando, Assistindo, Competindo,  Transmitindo, Ouvindo`)

    .setStyle(Discord.TextInputStyle.Short)

    .setRequired(true)



   const TerceiraActionRow = new Discord.ActionRowBuilder().addComponents(status_modal1)

   const QuartaActionRow = new Discord.ActionRowBuilder().addComponents(status_modal2)

   const QuintaActionRow = new Discord.ActionRowBuilder().addComponents(status_modal3)



    modal_status.addComponents(TerceiraActionRow, QuartaActionRow, QuintaActionRow)



    await interaction.showModal(modal_status);

    

   interaction.followUp({ content: `**💼 - Lembre-se! Não abuse deste botão para evitar erros no terminal do BOT.**`, 

    ephemeral: true



    

  })

   }   

 }

 //Modals Username

     if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'username_modal') {

         const nome_bot = interaction.fields.getTextInputValue('username_bot');  

         await interaction.reply({

          ephemeral: true,

          embeds: [

            new Discord.EmbedBuilder()

              .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})

              .setColor("Red")

              .setDescription(`**✅ - ${interaction.user.tag},** *O Username de ${client.user} alterado para:*`)

              .addFields(

                {

                  name: `\\📋 - Nome alterado para:`,

                  value: `\`\`\`fix\n${nome_bot}\n\`\`\``,

                  inline: false,

                },

              )

              .setTimestamp()

              .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dinamyc: true }) })

          ]

        })

       interaction.client.user.setUsername(nome_bot)

}

//Modals Avatar

if (!interaction.isModalSubmit()) return;

if (interaction.customId === 'modal_avatar') {

  const avatar_bot = interaction.fields.getTextInputValue('bot_avatar');



  interaction.reply({

    ephemeral: true,

    embeds: [

      new Discord.EmbedBuilder()

        .setColor("Random")

        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

        .setDescription(`**✅ - ${interaction.user.tag},** *Avatar alterado com sucesso!*`)

        .setImage(avatar_bot)

        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dinamyc: true }) })

    ]

  })

  interaction.client.user.setAvatar(avatar_bot)

}

//Modal Status

if (!interaction.isModalSubmit()) return;

if (interaction.customId === 'modal_status') {



  const atividade_bot = interaction.fields.getTextInputValue('bot_status_atividade');

  const atividade_presença= interaction.fields.getTextInputValue('bot_status_presença');

  const atividade_tipo= interaction.fields.getTextInputValue('bot_status_tipo');

     

//Presenças

 if(atividade_presença.includes("Online")) {

  client.user.setPresence({ status: `online` });

 } else if(atividade_presença.includes("Ausente")) {

  client.user.setPresence({ status: `idle` });

 } else if(atividade_presença.includes("Invisível")) {

  client.user.setPresence({ status: `invisible` });

 } else if(atividade_presença.includes("Não Pertubar")) {

  client.user.setPresence({ status: `dnd` });

 } 





//Atividades

 

  if(atividade_tipo.includes("Jogando")) {

    client.user.setActivity(`${atividade_bot}`, { type: Discord.ActivityType.Playing });

  }

  else if(atividade_tipo.includes("Assistindo")) {

    client.user.setActivity(`${atividade_bot}`, { type: Discord.ActivityType.Watching });

  } else if(atividade_tipo.includes("Competindo")) {

    client.user.setActivity(`${atividade_bot}`, { type: Discord.ActivityType.Competing });

  } else if(atividade_tipo.includes("Transmitindo")) {

    client.user.setActivity(`${atividade_bot}`, { type: Discord.ActivityType.Streaming });

  } else if(atividade_tipo.includes("Ouvindo")) {

    client.user.setActivity(`${atividade_bot}`, { type: Discord.ActivityType.Listening });

  }

// Armazenar





  await interaction.reply({

    ephemeral: true,

    embeds: [

      new Discord.EmbedBuilder()

        .setColor("Random")

        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

        .setDescription(`**✅ - ${interaction.user.tag},** *Status alterado com sucesso!*`)

        .addFields(

          {

            name: '**Atividade:**',

            value: `\`\`\`fix\n${atividade_bot}\n\`\`\``,

            inline: false,

          },

          {

            name: '**Presença:**',

            value: `\` - ${atividade_presença} - \``,

            inline: true,

          },

          {

            name: '**Tipo de Atividade:**',

            value: `\`\`\` - ${atividade_tipo} - \`\`\``,

            inline: true,

          },

        )

        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dinamyc: true }) })

    ]

  });

  

 };



  }); 