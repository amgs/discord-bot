// https://discord.com/oauth2/authorize?client_id=816862027481481286&scope=bot

const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const intents = new Discord.Intents([
  Discord.Intents.ALL,
  "GUILD_MEMBERS",
  "GUILD_PRESENCES",
  "GUILDS",
  "GUILD_BANS"
]);
const client = new Discord.Client({ ws: { intents } });
client.login(process.env.TOKEN);


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

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

client.on('message', msg => {
  if (msg.author.id === "366217565506240513") {
    if (msg.content === '!ping') {
      msg.reply('pong!');
    }

    if (msg.content === "!kickall") {
      msg.guild.members.fetch()
        .then(guildMembers => {
          for (const entry of guildMembers.entries()) {
            const member = entry[1];
            if (!["UAL", "amgs"].includes(member.user.username)) {
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
