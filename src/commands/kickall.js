const { SlashCommandBuilder } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const admin_name = process.env.ADMIN_NAME;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kickall')
        .setDescription('Kicks everyone out.'),
    async execute(interaction) {
        interaction.guild.members.fetch().then(members => {
            members.forEach(member => {
                console.log(member.user.username);
                if (!["IADE", admin_name].includes(member.user.username)) {
                    member.kick();
                }
            });
        });
    },
};
