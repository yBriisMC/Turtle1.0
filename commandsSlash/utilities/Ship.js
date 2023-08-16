const Discord = require('discord.js')
const { QuickDB } = require("quick.db") 
const db = new QuickDB()

module.exports = {
    name: "ship",
    description: "[ 🧀 Utilidades ] Use esse comando para fazer um ship com algum usuário.", 
  options: [
    {
      name: 'user1',
      description: 'usuário 01 ',
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'user2',
      description: 'usuário 02',
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  run: async (client, interaction) => {

const user1 = interaction.options.getUser('user1')
   if(!user1) user1 = interaction.user
const user2 = interaction.options.getUser('user2')
  
 const existingShipPercentage = await db.get(`${user1.id}-${user2.id}`);

    if (existingShipPercentage) {
        let embed = new Discord.EmbedBuilder()
       .setColor(client.color)
       .setTitle(`${user2.username} e ${user1.username}`)
       .setDescription(`O amor entre ${user1} e ${user2} é de ${existingShipPercentage}%!`)
      return interaction.reply({ embeds: [embed] });
    }

    const lovePercentage = Math.floor(Math.random() * 101); // Gera um número aleatório de 0 a 100

    const embed = new Discord.EmbedBuilder()
      .setColor(client.color)
      .setTitle(`${user1.username} e ${user2.username}`)
      .setDescription(`O amor entre ${user1} e ${user2} é de ${lovePercentage}%!`);
    db.set(`${user1.id}-${user2.id}`, lovePercentage); // Armazena a porcentagem de amor no Quick.db

    interaction.reply({ embeds: [embed] });
 
  }
 }