# UAL Discord Bot

This is a sample Bot with some mod operation for course servers.

## Operations

- !warning : Prints a warning message about pending channel cleanup.
- !kick : Kicks out everyone in the channel.
- !clearall : Deletes the message history.

## Setup

1. Get a Discord Bot TOKEN
   1. Go to https://discord.com/developers/applications
   2. Create an Application (`New Application`)
      1. Register the `CLIENT ID`
   3. Create a Bot (`Add Bot` on the `Bot` tab)
      1. Get the secret TOKEN (`Click to Reveal Token` on the recently created Bot page)
   4. Access the bot link at `https://discord.com/oauth2/authorize?client_id=CLIENT ID&scope=bot`
2. Setup the bot server
   1. Copy `.env.sample` to `.env`
   2. Replace the `TOKEN` with the secret TOKEN from the Bot page.
   3. Install dependencies `npm i`
   4. Run the server `node src/index.js`
