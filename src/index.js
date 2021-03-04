// https://discord.com/oauth2/authorize?client_id=816862027481481286&scope=bot

const dotenv = require('dotenv');
const Discord = require('discord.js');
const fs = require('fs');

dotenv.config();
const admin_id = process.env.ADMIN_ID;
const admin_name = process.env.ADMIN_NAME;
const discord_token = process.env.TOKEN;

const intents = new Discord.Intents([
  Discord.Intents.ALL,
  "GUILD_MEMBERS",
  "GUILD_PRESENCES",
  "GUILDS",
  "GUILD_BANS"
]);
const client = new Discord.Client({ ws: { intents } });
client.login(discord_token);

async function clear_channel_messages(channel){
  let fetched;
  do {
    fetched = await channel.messages.fetch({limit: 100});
    for (const entry of fetched.entries()) {
      entry[1].delete()
    }
  }
  while(fetched.size >= 0);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  if (msg.author.id === admin_id) {    
    if (msg.content === '!warning') {
      const messages = JSON.parse(fs.readFileSync('messages.json', 'utf-8'));
      msg.channel.send(messages.warning);
    }

    if (msg.content === "!kickall") {
      msg.guild.members.fetch()
        .then(guildMembers => {
          for (const entry of guildMembers.entries()) {
            const member = entry[1];
            if (!["UAL", admin_name].includes(member.user.username)) {
              console.log(member.user.username);
              member.kick();
            };
          }
        })
        .catch(console.error);
    }

    if (msg.content === "!clearall") {
      clear_channel_messages(msg.channel);
    }
  }
});
