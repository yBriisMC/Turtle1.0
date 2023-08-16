const fs = require("fs");

module.exports = async (client) => {

  const commandsArray = [];

  const subcommandsMap = new Map();

  const commandFolders = await fs.promises.readdir('./commandsSlash');

  for (const folder of commandFolders) {

    const commandFiles = await fs.promises.readdir(`./commandsSlash/${folder}`);

    const commandSubcommands = [];

    for (const file of commandFiles) {

      if (!file.endsWith('.js')) continue;

      const command = require(`../commandsSlash/${folder}/${file}`);

      if (!command.name) continue;

      // Add command to map and array

      client.slashCommands.set(command.name, command);

      commandsArray.push(command);

      // Check if command has subcommands

      const subcommandsPath = `./commandsSlash/${folder}/${command.name}/subcommands`;

      if (fs.existsSync(subcommandsPath)) {

        const subcommandFiles = await fs.promises.readdir(subcommandsPath);

        for (const subcommandFile of subcommandFiles) {

          if (!subcommandFile.endsWith('.js')) continue;

          const subcommand = require(`../commandsSlash/${folder}/${command.name}/subcommands/${subcommandFile}`);

          if (!subcommand.name) continue;

          // Add subcommand to map and array

          subcommandsMap.set(subcommand.name, subcommand);

          commandSubcommands.push(subcommand);

        }

      }

    }

    // Add subcommands to command object

    for (const command of commandSubcommands) {

      command.subcommand = true;

      command.parentCommand = folder;

      client.slashCommands.set(command.name, command);

    }

  }

  // Register commands on client ready

  client.on('ready', async () => {

    for (const guild of client.guilds.cache.values()) {

      await guild.commands.set(commandsArray);

    }

  });

  // Register subcommands on client interactionCreate

  


  client.on("guildCreate", async (guild) => {

    await guild.commands.set(commandsArray);

    console.log("Joined a new guild: " + guild.name);

  });

};

