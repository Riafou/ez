const { Client } = require('discord.js-selfbot-v13');

const token = process.env.TOKEN;
const channelId = process.env.CHANNEL_ID;

// Si le token ou l'ID du salon n'est pas configuré, le script s'arrête.
if (!token || !channelId) {
    console.error("Erreur: TOKEN ou CHANNEL_ID manquant.");
    process.exit(1);
}

const client = new Client({
    checkUpdate: false,
});

client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.username}.`);
    
    // Récupère le salon une seule fois
    client.channels.fetch(channelId)
        .then(channel => {
            console.log(`Salon "${channel.name}" trouvé. Envoi du message...`);

            // Envoie le message
            channel.send('$p')
                .then(msg => {
                    console.log(`[${new Date().toLocaleTimeString()}] Message '$p' envoyé.`);
                    // Déconnexion après l'envoi pour terminer le script
                    client.destroy();
                    process.exit(0);
                })
                .catch(err => {
                    console.error("Erreur lors de l'envoi du message:", err);
                    client.destroy();
                    process.exit(1);
                });
        })
        .catch(err => {
            console.error("Erreur: Impossible de trouver le salon avec l'ID fourni.");
            client.destroy();
            process.exit(1);
        });
});

console.log("Tentative de connexion...");
client.login(token)
    .catch(err => {
        console.error("Erreur de connexion:", err);
        process.exit(1);
    });
