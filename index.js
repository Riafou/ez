const { Client, GatewayIntentBits , Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const express = require('express');
const client = new Client({
    checkUpdate: false,
});
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Bot is running!');
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const prefix = process.env.PREFIX || '!';
const token = process.env.TOKEN;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
var pokemon = [];
client.on('ready', () => {
    // Statut personnalisé supprimé
    console.log('-------------------------------');
    console.log(`${client.user.username} est co`);
    console.log('-------------------------------');
    afterLogCmd();
    
})
client.on('messageCreate', async message =>{
    if(message.author.bot) return;
    if(message.author.id != client.user.id) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command){
		command.run(message, args, command, client);
		var d = new Date();
		console.log(`[${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}] Command run : ${cmd}`);
	}
})
function afterLogCmd() {
        const cid = "1235957384602587219";
        const channel = client.channels.cache.get(cid)
        var time = 3660000;
        channel.send('$p');
        setTimeout(() => {
            getLastMsg(cid);  
        }, 10000);
        setInterval(() => {
            channel.send('$p');
            setTimeout(() => {
                getLastMsg(cid);   
                console.log("search")
            }, 10000);
        }, time);  
        
       
}
async function getLastMsg(cid) {
    const mid = "432610292342587392";  //MUDAE ID
    try {
        const channel2 = await client.channels.fetch(cid);
        const messages = await channel2.messages.fetch({ limit: 1 });
        const lastMessage = messages.last();
        if(lastMessage.author['id'] == mid) {
            // console.log(lastMessage.content); 
            const ww = lastMessage.content.split(" ");
            const newp = "pokenew";
            if (ww[1].includes(newp)) {
               var new_poke = ww[ww.length - 1].replace(/\*/g, '') + " ";
               var new_poke2 = `**${new_poke}**`;
               if(!pokemon.includes(new_poke2)) pokemon.push(new_poke2)
            }
        }
    } catch (error) {
        console.error(error);
    }
}
function mettreEnGras(str) {
    return `\x1b[1m${str}\x1b[0m`; // Séquence d'échappement ANSI pour mettre en gras
}
const handleInterrupt = () => {
    displayPokemon();
    setTimeout(() => {
        process.exit(0);
    }, 1000);
    
};
process.on('SIGINT', handleInterrupt);
function displayPokemon() {
    
    const cid = "1235957384602587219";
    const channel = client.channels.cache.get(cid)
    console.log('-------------------------------');
    console.log('Nouveaux Pokemon obtenus : \n ' + pokemon)
    channel.send('Nouveaux Pokemon obtenus : \n ------------------------------- \n' + pokemon)
}
client.login(token);
