const Discord = require("discord.js")
const client = require('..');
const fs = require("fs")

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Command under development...`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    if (!client.slashCommands.has(interaction.commandName)) return;

    const command = client.slashCommands.get(interaction.commandName);

    if (!command.subcommand) return;

    const subcommand = subcommandsMap.get(interaction.options.getSubcommand());

    if (!subcommand) return;

    await subcommand.run(client, interaction);

  });