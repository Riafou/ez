const { Client } = require('discord.js-selfbot-v13');
require('dotenv').config();

const token = process.env.TOKEN;
const channelId = process.env.CHANNEL_ID;

if (!token || !channelId) {
    process.exit(1);
}

const client = new Client({
    checkUpdate: false,
});

client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.username}.`);
    console.log(`Le message '$p' sera envoyé dans le salon ${channelId} toutes les 2 heures.`);
    
    const interval = 2 * 60 * 60 * 1000;

    client.channels.fetch(channelId)
        .then(channel => {
            console.log(`Salon "${channel.name}" trouvé avec succès.`);

            const sendMessage = () => {
                channel.send('$p')
                    .then(msg => console.log(`[${new Date().toLocaleTimeString()}] Message '$p' envoyé avec succès !`))
                    .catch(() => {});
            };

            console.log("Envoi du premier message...");
            sendMessage();

            setInterval(sendMessage, interval);
        })
        .catch(error => {
            process.exit(1);
        });
});

console.log("Tentative de connexion à Discord...");
client.login(token);
