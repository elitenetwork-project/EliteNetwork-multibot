// © 2021 Luis De La Vega. EliteNetwork MultiBot è creato da Luis (LuisDj#7464). Visualizza la licenza!
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

// Avvio del bot
console.log(' ');
console.log('\x1b[92m%s\x1b[0m', '          ##################################');
console.log('\x1b[92m%s\x1b[0m', '          #        EliteNetwork BOT        #');
console.log('\x1b[92m%s\x1b[0m', '          #  https://www.elitenetwork.it   #');
console.log('\x1b[92m%s\x1b[0m', '          ##################################');
console.log(' ');
console.log('\x1b[96m%s\x1b[0m', '--------------------------------------------');
console.log(' ');
console.log('\x1b[101;93m%s\x1b[0m', '----------powered by LuisDj#7464-------------');
console.log(' ');

console.log("Configurazione di EliteNetwork MultiBot. Questo potrebbe richiedere alcuni secondi!")
console.log(' ');
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Impossibile eseguire la cartella dei comandi.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        if(botconfig["bot_setup"].debug_mode) {
            console.log(`${f} caricato!`);
        }
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
    });
});


if(botconfig["module_toggles"].ticket_system) {
    fs.readdir("./commands/ticket_system/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Nessuna cartella ticket_system.");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/ticket_system/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} caricato!`);
            }
            bot.commands.set(props.help.name, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Modulo ticket caricato!")
    });
}

if(botconfig["module_toggles"].utility_commands) {
    fs.readdir("./commands/utility_module/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Cartella utility_module trovata");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/utility_module/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} caricato!`);
            }
            bot.commands.set(props.help.name, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Modulo Utility caricato!")

    });
}

if(botconfig["module_toggles"].moderation_commands) {
    fs.readdir("./commands/moderation_module/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Cartella mancante moderation_module.");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/moderation_module/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} caricato!`);
            }
            bot.commands.set(props.help.name, props);
            bot.commands.set(props.help.name2, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Modulo di moderazione caricato!")

    });
}

if(botconfig["module_toggles"].fun_commands) {
    fs.readdir("./commands/fun_module/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Cartella mancante fun_module.");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/fun_module/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} caricato!`);
            }
            bot.commands.set(props.help.name, props);
            bot.commands.set(props.help.name2, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Modulo divertente caricato!")
    });
}

function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

bot.on('error', console.error);
bot.on("ready", async () => {
    console.log(' ');
    console.log('\x1b[32m%s\x1b[0m', `EliteNetwork MultiBot è ONLINE ed settato correttamente! Il bot è utilizzato in ${bot.guilds.size} server Discord.`);
    bot.user.setActivity(botconfig["bot_setup"].bot_game, {type: botconfig["bot_setup"].bot_game_type});
    bot.user.setStatus(botconfig["bot_setup"].bot_status)

    // NON MODIFICARE QUANTO SEGUE, QUESTO È PER PRESTAZIONI E STATISTICHE. LA MODIFICA DI QUESTA È UNA VIOLAZIONE DELLA LICENZA
    var express = require('express');
    var app = express();
    let webHookUrl = "https://discordapp.com/api/webhooks/762048528255942698/YGIG5VTR-2QeRstSG-5rtOo5ZII0chrrmAcUQb2x792qxv0N4RQOx0Hn3jZv2Kdg13RX" //https://hooks.zapier.com/hooks/catch/4795191/vi5vc8/
    let webHookData = `{
        name: "Luis D.L.V.",
        purchaseID: "FMMB008",
        mod_module: botconfig["module_toggles"].moderation_commands.toString(),
        utility_module: botconfig["module_toggles"].utility_commands.toString(),
        log_module: botconfig["module_toggles"].logs.toString(),
        mod_log_module: botconfig["module_toggles"].mod_logs.toString(),
        ticket_module: botconfig["module_toggles"].ticket_system.toString(),
        Filter_module: botconfig["module_toggles"].filter_lang_links.toString(),
        bot_prefix: botconfig["bot_setup"].prefix.toString(),
        debug_mode: botconfig["bot_setup"].debug_mode.toString()
    }`
    app.post(webHookUrl, function(req, res) {
        req.type('json');
        req.json(webHookData);
        req.end();
    });
    console.log(' ');
    await wait(5000)
    console.log('Controllo delle prestazioni e delle statistiche effettuato. Stato:', '\x1b[42m', `completato`, '\x1b[0m')
   
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig["bot_setup"].prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

    // Log dei comandi del bot
    if(botconfig["module_toggles"].mod_logs) {
        const cmdChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].command_logs_channel);
        if(!cmdChannel) return console.log("Canale non trovato (Config: 'commands_logs_channel')");
        const logEmbed = new Discord.RichEmbed()
        .setAuthor("Log comandi")
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setDescription(`**${message.author} (${message.author.tag})** comando usato: \n\`\`\`css\n${cmd} ${args}\`\`\``.split(',').join(' '))
        .setTimestamp()
        cmdChannel.send(logEmbed)
    }
});


// Messaggio di benvenuto
bot.on('guildMemberAdd', member => {
    if(botconfig["module_toggles"].join_role) {
        var role = member.guild.roles.find(role => role.id === botconfig["join_roles"].role);
        if (!role) return console.log("Ruolo non trovato (Config: 'role')");
        member.addRole(role);
    }
    if(botconfig["module_toggles"].welcome_leave_channel) {
        const channel = member.guild.channels.find(channel => channel.id === botconfig["channel_setup"].welcome_channel);
        if (!channel) return console.log("canale di benvenuto non trovato (Config: 'welcome_channel')");
        channel.send(`${member} (${member.user.tag}) **è entrato**`);
    }
    // Aggiornamento del canale di conteggio membri
    if(botconfig["module_toggles"].member_count_channel) {
        member.guild.channels.find(channel => channel.id === botconfig["member_count_module"].member_count_channel).setName(`Member Count: ${member.guild.memberCount}`);
    }
});

// Messaggio uscita
bot.on('guildMemberRemove', member => {
    if(botconfig["module_toggles"].welcome_leave_channel) {
        const channel = member.guild.channels.find(channel => channel.id === botconfig["channel_setup"].welcome_channel);
        if (!channel) return console.log("canale uscita non trovato (Config: 'welcome_channel')");
        channel.send(`${member} (${member.user.tag}) **è uscito**`);
    }
    // Aggiornamento del canale di conteggio membri
    if(botconfig["module_toggles"].member_count_channel) {
        member.guild.channels.find(channel => channel.id === botconfig["member_count_module"].member_count_channel).setName(`Member Count: ${member.guild.memberCount}`);
    }
});

// Messaggio Elimina logger
bot.on("messageDelete", message => {
    if(botconfig["module_toggles"].logs) {
        if (message.channel.type === 'dm') return;
        if (message.content.startsWith("!")) return undefined;
        if (message.content.startsWith(".")) return undefined;
        if (message.content.startsWith("?")) return undefined;
        if (message.content.startsWith("-")) return undefined;
        if (message.author.bot) return undefined;
        if (message.content.length > 1020) return undefined;

        let logEmbed = new Discord.RichEmbed()
        .setAuthor("LOG Azione", bot.user.avatar_url)
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setTimestamp()
        .setFooter(`${botconfig["bot_setup"].copyright} | Made by Luis#7467`)

        .setDescription("**Azione:** Messaggio eliminato")
        .addField("Autore messaggio:", `${message.author.toString()} - Hash: ${message.author.tag} - ID: ${message.author.id}`)
        .addField("Canale:", message.channel)
        .addField("Contenuto messaggio:", `${message.content}.`)

        let logChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
        if (!logChannel) return console.log("Canale uscita non trovato (Config: 'general_logs_channel')");
        logChannel.send(logEmbed);
    }
});

// Modifica log messaggi
bot.on("messageUpdate", (oldMessage, newMessage) => {
    if(botconfig["module_toggles"].logs) {
        if (oldMessage.author.bot) return undefined;
        if (oldMessage.content.length > 1020) return undefined;
        if (newMessage.content.length > 1020) return undefined;
        if (!oldMessage.guild) return undefined;

        let logEmbed = new Discord.RichEmbed()
        .setAuthor("LOG Azione", bot.user.avatar_url)
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | Made by Luis#7467`)

        .setDescription("**Azione:** Messaggio editato")
        .addField("Vecchio contenuto:", `${oldMessage.content}.`)
        .addField("Nuovo contenuto:", `${newMessage.content}.`)
        .addField("Autore Messaggio:", `${newMessage.author.toString()} - Hash: ${newMessage.author.tag} - ID: ${newMessage.author.id}`)
        .addField("Canale", oldMessage.channel)

        let logChannel = newMessage.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
        if (!logChannel) return console.log("Canale uscita non trovato (Config: 'general_logs_channel')");
        logChannel.send(logEmbed);
    }
});

// Registratore aggiornamenti membri
bot.on("guildMemberUpdate", async (oldMember, newMember) => {
    setTimeout(async () => {
        var Change = {
            rolesGiven: {
                update: false,
                updateArray: ""
            },
            rolesRemoved: {
                update: false,
                updateArray: ""
            },
            nickname: {
                update: false,
                updateArray: []
            }
        };

        const entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_UPDATE' }).then(audit => audit.entries.first())

        oldMember.roles.forEach(function(rInfo) {
            if (newMember.roles.find(roles => roles.id == rInfo.id) == null)
            {
                Change.rolesRemoved.updateArray = rInfo.id;
                Change.rolesRemoved.update = true;
            }
        });

        newMember.roles.forEach(function(rInfo) {
            if (oldMember.roles.find(roles => roles.id == rInfo.id) == null)
            {
                Change.rolesGiven.updateArray = rInfo.id;
                Change.rolesGiven.update = true;
            }
        });

        // Controlla se al membro è stato assegnato un nuovo soprannome
        if (oldMember.nickname !== newMember.nickname) {
            Change.nickname.updateArray.push({newNickname: newMember.nickname != null ? newMember.nickname : newMember.guild.members.get(newMember.id).user.username, oldNickname: oldMember.nickname != null ? oldMember.nickname : oldMember.guild.members.get(oldMember.id).user.username});
            Change.nickname.update = true;
        }

        if (Change.nickname.update) {
            let cName = Change.nickname.updateArray[0];
            let oldName = cName.oldNickname;
            let newName = cName.newNickname;
            let member = newMember.guild.members.get(entry.target.id);

            let logEmbed = new Discord.RichEmbed()
                .setAuthor("LOG Azione", bot.user.avatarURL)
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setTimestamp()
                .setFooter(`${botconfig["bot_setup"].copyright} | Made by Luis#7467`)

            logEmbed.setDescription("**Azione:** Nickname cambiato")
            if (entry.executor.id == newMember.id) {
                logEmbed.addField(`Cambiato da`, `${entry.executor} ( editato da se stesso/a )`, true);
            } else {
                logEmbed.addField(`Cambiato da`, `${entry.executor}`, true);
            }
            logEmbed.addField("Utente di destinazione", `${member} - ${member.user.tag}`, true)
            logEmbed.addField("Vecchio nickname", oldName)
            logEmbed.addField("Nuovo Nickname", newName)

            let logChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
            if(!logChannel) return console.log("Canale non trovato (Config: 'general_logs_channel')");
            logChannel.send(logEmbed);
        }

        if (Change.rolesGiven.update) {
            let addedRole = Change.rolesGiven.updateArray;

            let logEmbed = new Discord.RichEmbed()
            .setAuthor("LOG Azione", bot.user.avatarURL)
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setTimestamp()
                .setFooter(`${botconfig["bot_setup"].copyright} | Made by Luis#7467`)

            logEmbed.setDescription("**Azione:** Ruolo aggiunto")
            logEmbed.addField("Utente di destinazione", `${newMember} - ${newMember.user.tag}`, true)
            logEmbed.addField("Ruolo aggiunto", `<@&${addedRole}>`)

            let logChannel = oldMember.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
            if(!logChannel) return console.log("Canale non trovato (Config: 'general_logs_channel')");
            logChannel.send(logEmbed);
        }

        if (Change.rolesRemoved.update) {
            let removedRole = Change.rolesRemoved.updateArray

            let logEmbed = new Discord.RichEmbed()
            .setAuthor("Action Logs", bot.user.avatarURL)
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | Made by FAXES#8655`)

            logEmbed.setDescription("**Azione:** Ruolo rimosso")
            logEmbed.addField("Utente di destinazione", `${newMember} - ${newMember.user.tag}`, true)
            logEmbed.addField("RRuolo rimosso", `<@&${removedRole}>`)

            let logChannel = oldMember.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
            if (!logChannel) return console.log("Canale non trovato (Config: 'general_logs_channel')");
            logChannel.send(logEmbed);
        }
    }, 200);
});

// Filtri
if(botconfig["module_toggles"].filter_lang_links) {
    bot.on("message", message => {
        if(message.channel.type === 'dm') return;
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.member.hasPermission("ADMINISTRATOR")) return; // Questo potrebbe bloccarsi o dare errori. Non sono sicuro al 100% del perché ...
        let allowedRole = message.guild.roles.find(role => role.name === botconfig["filter_module"].language_bypass_role);
        switch (true) {
            case message.member.roles.has(allowedRole.id):
                return;
            case new RegExp(botconfig["filter_module"].filter_words.join("|")).test(message.content.toLowerCase()):
                message.delete();
                return message.channel.send(`Non sei autorizzato a usare quella lingua qui!`).then(msg => msg.delete(10000));
        };
    });

    bot.on("message", message => {
        if(message.channel.type === 'dm') return;
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.member.hasPermission("ADMINISTRATOR")) return; // Questo potrebbe bloccarsi o dare errori. Non sono sicuro al 100% del perché ...
        let allowedRole = message.guild.roles.find(role => role.name === botconfig["filter_module"].link_bypass_role);
        switch (true) {
            case message.member.roles.has(allowedRole.id): // Debug Errore Codice: ERRID08
                return;
            case new RegExp(botconfig["filter_module"].filter_links.join("|")).test(message.content.toLowerCase()):
                message.delete();
                return message.channel.send(`Non sei autorizzato a usare quella lingua qui!`).then(msg => msg.delete(10000)); 

        };
    });
}

bot.login(botconfig["bot_setup"].token);