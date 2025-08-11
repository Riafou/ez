const { Client } = require('discord.js-selfbot-v13');

const token = process.env.TOKEN;
const channelId = process.env.CHANNEL_ID;

if (!token || !channelId) {
    process.exit(1);
}

const client = new Client({
    checkUpdate: false,
});

client.on('ready', () => {
    console.log(`Connect ${client.user.username}.`);
    console.log(` message '$p'  ${channelId} `);
    
    const interval = 2 * 60 * 60 * 1000;

    client.channels.fetch(channelId)
        .then(channel => {
            console.log(`Salon "${channel.name}" check`);

            const sendMessage = () => {
                channel.send('$p')
                    .then(msg => console.log(`[${new Date().toLocaleTimeString()}]  '$p' `))
                    .catch(() => {});
            };

            console.log("tr");
            sendMessage();

            setInterval(sendMessage, interval);
        })
        .catch(() => {
            process.exit(1);
        });
});

console.log("co");
client.login(token);
