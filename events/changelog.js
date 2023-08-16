const Discord = require('discord.js')
const client = require('..')
let gay = 'Marcia Junia';

client.on('ready', async () => {
  console.log(`Verificando...`);
   console.log(`O ${gay} é GAY :/`);
});

/*client.on('ready', async () => {
  console.log(`Verificando...!`);

  client.guilds.cache.forEach(async (guild) => {
    // Verifica se o canal 🐢-turgle-anuncios já existe na guilda
    const channel = guild.channels.cache.find(channel => channel.name === '🐢-turtle-anuncios' && Discord.ChannelType.GuildText);

    if (!channel) {
      // Cria um novo canal com permissões Deny para a guilda
      const newChannel = await guild.channels.create({ 
 name:'🐢-turtle-anuncios', 
 type: Discord.ChannelType.GuildText,
   permissionOverwrites: [
            {
              id: guild.id,
              deny: [ Discord.PermissionFlagsBits.ViewChannel]
     },
      ]
      });
        
      console.log(`Canal 🐢-turgle-anuncios criado na guilda ${guild.name} (${guild.id})`);
    } else {
      console.log(`O canal 🐢-turgle-anuncios já existe na guilda ${guild.name} (${guild.id})`);
    }
  });
});*/


/*client.on('ready', async () => {

  console.log(`Logged in as ${client.user.tag}!`);

  // Itera sobre todas as guildas nas quais o bot está conectado

  client.guilds.cache.forEach(async guild => {

    try {

      // Procura pelo canal com o nome "🐢-turgle-anuncios" na guilda atual

      const channelToDelete = guild.channels.cache.find(channel => channel.name === '🐢-turtle-anuncios');

      

      // Verifica se o canal foi encontrado

      if (!channelToDelete) {

        console.log(`Canal "🐢-turgle-anuncios" não encontrado em ${guild.name}!`);

        return;

      }

      

      // Exclui o canal na guilda atual

      await channelToDelete.delete();

      console.log(`Canal "🐢-turgle-anuncios" excluído em ${guild.name}!`);

    } catch (error) {

      console.error(`Erro ao excluir o canal "🐢-turgle-anuncios" em ${guild.name}!`, error);

    }

  });

});
*/