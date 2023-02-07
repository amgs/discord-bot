const { SlashCommandBuilder } = require('discord.js');

async function clear_channel_messages(channel) {
    await channel.messages.fetch().then(
        messages => messages.forEach(async message => {
            await message.delete();
        }));
};


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears all messages in the channel.'),
    async execute(interaction) {
        await clear_channel_messages(interaction.channel);
    },
};