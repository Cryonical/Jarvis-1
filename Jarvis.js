/*
File: Jarvis.js
Author: Sean Peters
Created: 06/22/2016
Description: Main Bot File
Version: 1.2.0
*/
var Discord = require("discord.js");
var bot = new Discord.Client();
var Twitter = require('twitter');
var fs = require('fs');
var request = require('request');
var prettyjson = require("prettyjson");

function classConvert(playerclass) {
    switch (playerclass) {
        case 1:
            return "Death Knight";
            break;
        case 2:
            return "Druid";
            break;
        case 3:
            return "Hunter";
            break;
        case 4:
            return "Mage";
            break;
        case 5:
            return "Monk";
            break;
        case 6:
            return "Paladin";
            break;
        case 7:
            return "Priest";
            break;
        case 8:
            return "Rogue";
            break;
        case 9:
            return "Shaman";
            break;
        case 10:
            return "Warlock";
            break;
        case 11:
            return "Warrior";
            break;
        case 12:
            return "Demon Hunter";
            break;
        default:
            return "WTF";
            break;
    }
}

function specConvert(playerclass, spec) {
    switch (playerclass) {
        case 1:
            switch (spec) {
                case 1:
                    return "Blood";
                    break;
                case 2:
                    return "Frost";
                    break;
                case 3:
                    return "Unholy";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 2:
            switch (spec) {
                case 1:
                    return "Balance";
                    break;
                case 2:
                    return "Feral";
                    break;
                case 3:
                    return "Guardian";
                    break;
                case 4:
                    return "Restoration";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 3:
            switch (spec) {
                case 1:
                    return "Beast Mastery";
                    break;
                case 2:
                    return "Marksmanship";
                    break;
                case 3:
                    return "Survival";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 4:
            switch (spec) {
                case 1:
                    return "Arcane";
                    break;
                case 2:
                    return "Fire";
                    break;
                case 3:
                    return "Frost";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 5:
            switch (spec) {
                case 1:
                    return "Brewmaster";
                    break;
                case 2:
                    return "Mistweaver";
                    break;
                case 3:
                    return "Windwalker";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 6:
            switch (spec) {
                case 1:
                    return "Holy";
                    break;
                case 2:
                    return "Protection";
                    break;
                case 3:
                    return "Retribution";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 7:
            switch (spec) {
                case 1:
                    return "Discipline";
                    break;
                case 2:
                    return "Holy";
                    break;
                case 3:
                    return "Shadow";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 8:
            switch (spec) {
                case 1:
                    return "Assassination";
                    break;
                case 2:
                    return "Combat";
                    break;
                case 3:
                    return "Subtlety";
                    break;
                case 4:
                    return "Outlaw";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 9:
            switch (spec) {
                case 1:
                    return "Elemental";
                    break;
                case 2:
                    return "Enhancement";
                    break;
                case 3:
                    return "Restoration";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 10:
            switch (spec) {
                case 1:
                    return "Affliction";
                    break;
                case 2:
                    return "Demonology";
                    break;
                case 3:
                    return "Destruction";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 11:
            switch (spec) {
                case 1:
                    return "Arms";
                    break;
                case 2:
                    return "Fury";
                    break;
                case 3:
                    return "Protection";
                    break;
                case 4:
                    return "Gladiator";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 12:
            switch (spec) {
                case 1:
                    return "Havoc";
                    break;
                case 2:
                    return "Vengence";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        default:
            return "WTF";
            break;
    }
}

bot.on("ready", function() {
  bot.sendMessage("180011389115564032","Jarvis up and running.");
});

// begin main bot
bot.on("message", function(message) {
    var input = message.content.toUpperCase();
    var server = message.channel.server;
    if (!(message.channel.isPrivate)) {
        var roles = message.channel.server.roles;
        var channels = message.channel.server.channels;
    }
    var user = message.author;
    var role;
    var encounter;
    var bossname;
    var spec;
    var playerclass;
    var parsed = message.content.split(" ");
    var parsedReg = input.split(" ");
    var channel;
    var reserved;
    // Emerald Nightmare id = 10, Hellfire Citadel = 8
    var raidid = 10;
    // Partition should almost always be set to 1, Pre-Patch is 2
    var partition = 1;
    var planfortheweek = "Get ready for Heroic on Thursday! Still working out a boss order. For now just look up the heroic mechanic differences (included in the !EN guide).";
    // Begin Command list
    // Hello Jarvis
    if (input === "HELLO JARVIS") {
        bot.reply(message, "Hello! Good to be back.");
    }
    // Fuck You Jarvis
    else if (input.includes("FUCK YOU JARVIS") || input.includes("FUCK YOU, JARVIS")) {
        var random = Math.floor((Math.random() * 3) + 1);
        if (random == 1) {
            bot.reply(message, "Why would you say that!?");
        } else if (random == 2) {
            bot.reply(message, "Well I don't think that was appropriate.");
        } else {
            bot.reply(message, "Fuck you too, silly human. Have you seen your logs recently? (They suck lol)");
        }
    }
    // Thanks Jarvis
    else if (input.includes("THANKS JARVIS") || input.includes("THANKS, JARVIS") || input.includes("THANK YOU, JARVIS") || input.includes("THANK YOU JARVIS")) {
        bot.reply(message, "Anytime.");
    }
    // Good Night Jarvis
    else if (input === "GOOD NIGHT JARVIS") {
        role = roles.get("name", "Officers").id;
        if (bot.memberHasRole(user, role)) {
            bot.reply(message, "Good Night Sir.");
        }
    }
    // GoT Stuff
    else if (input.includes("WHAT IS DEAD MAY NEVER DIE")) {
        bot.sendFile(message, "http://media2.popsugar-assets.com/files/thumbor/8JmtgAwoUtycNcKiKMY626mWtf8/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/05/24/864/n/1922283/4b3606df5ff39bb7_tumblr_m52wvwqwBQ1qb9ftxo1_500/i/House-Greyjoy-What-Dead-May-Never-Die.gif");
    } else if (input.includes("WINTER IS COMING")) {
        bot.sendFile(message, "https://media.makeameme.org/created/Brace-yourself-Winter.jpg");
    } else if (input.includes("YOU KNOW NOTHING")) {
        bot.sendFile(message, "http://i.imgur.com/FBC3qtM.gif");
    } else if (input.includes("HOLD THE DOOR")) {
        bot.sendFile(message, "http://gif4share.com/wp-content/uploads/2016/06/hold-the-door-game-of-thrones.gif");
    }
    // do you need an adult
    else if (input.includes("I NEED AN ADULT")) {
        bot.reply(message, "Me too.");
    }
    // stat weight sheet
    else if (input === "!STATS" || input === "!WEIGHTS" || input === "!STATWEIGHTS") {
        bot.sendMessage(message, "Here is the stat weights sheet for 7.0.3: <XXXX>")
    }
    // delete test
    else if (input.includes("HARAMBE") || input.includes("HARAMBAE") || input.includes("H A R A M B E") || input.includes("H A R A M B A E") && !(message.channel.isPrivate)) {
        bot.deleteMessage(message);
        bot.sendMessage(user,"Harambe is dead.");
    }
    // legendary
    else if (input.includes("http://www.wowhead.com/item=137090/moarg-bionic-stabilizers") || input.includes("BIONIC") || input.includes("137090") && !(message.channel.isPrivate)) {
        bot.deleteMessage(message);
        bot.sendMessage(user,"Fuck you and your legendary.");
    }
    // salt
    else if (input === "SALT" || input === "!SALT") {
        var random = Math.floor((Math.random() * 7) + 1);
        switch (random) {
            case 1:
                bot.sendFile(message, "http://i.imgur.com/Igir7HF.png");
                break;
            case 2:
                bot.sendFile(message, "http://i.imgur.com/mzfz7vf.jpg");
                break;
            case 3:
                bot.sendFile(message, "https://images.rapgenius.com/44f0fc58fb3a86b3c7cc19cfaab2bf1a.612x612x1.jpg");
                break;
            case 4:
                bot.sendFile(message, "https://cdn.meme.am/instances/500x/51800528.jpg");
                break;
            case 5:
                bot.sendFile(message, "http://ct.fra.bz/ol/fz/sw/i40/2/4/8/frabz-salt-salt-everywhere-898ce5.jpg");
                break;
            case 6:
                bot.sendFile(message, "http://www.relatably.com/m/img/high-level-meme/3972715.jpg");
                break;
            default:
                bot.sendFile(message, "http://static1.gamespot.com/uploads/original/1333/13335885/2874659-2341208346-ibzFa.gif");
        }
    }
    // wrecked
    else if (input.includes("WRECKED") || input.includes("REKT")) {
        var random = Math.floor((Math.random() * 7) + 1);
        switch (random) {
            case 1:
                bot.sendFile(message, "https://cdn.meme.am/instances/500x/47131303.jpg");
                break;
            case 2:
                bot.sendFile(message, "https://cdn.meme.am/instances/500x/50087032.jpg");
                break;
            case 3:
                bot.sendFile(message, "https://media.giphy.com/media/opY7SoUTNU3ao/giphy.gif");
                break;
            case 4:
                bot.sendFile(message, "http://i.imgur.com/6mbJFvA.jpg");
                break;
            case 5:
                bot.sendFile(message, "http://s2.quickmeme.com/img/94/941350454edd1fd9e446160102a2a51b3a7a2394dcfcb40caa9c96d60c9ea94e.jpg");
                break;
            case 6:
                bot.sendFile(message, "http://cdnvideo.dolimg.com/cdn_assets/f6ef0c9bee8be77f5896afb421a04d7586ce7dbe.jpg");
                break;
            default:
                bot.sendFile(message, "https://cdn.meme.am/instances/400x/52466269.jpg");
        }
    }
    // Fantasy GIF
    else if (input === "!FANTASY" || input.includes("CLASS FANTASY")) {
        bot.sendFile(message, "http://i.imgur.com/EMSiUF3.jpg");
    }
    // Pipeline Link
    else if (input === "!PIPELINE" || input === "!SCHEDULE" || input === "!IDEAS") {
        bot.sendMessage(message, "<XXXX>");
    }
    // Jarvis GIF
    else if (input === "!JARVIS") {
        bot.sendFile(message, "http://31.media.tumblr.com/dea23aa7056d90cdfdacdc2117171e6f/tumblr_mmq33aTgAD1rvvj1ho2_r2_500.gif");
    } 
    // plan for the week
    else if (input === "!PLAN" || input === "!PLANFORTHEWEEK" || input === "!COMMAND") {
        bot.sendMessage(message, planfortheweek);
    }
    // utility
    else if (input === "!UTILITY" || input === "!DEFENSIVE" || input === "!DEFENSIVES") {
        bot.sendMessage(message, "Here is the Legion Defensive/Utility Spell List: <https://docs.google.com/spreadsheets/d/1x6m0C6zJHVsEh63bgUgkQBKyLnkxYGeK3LM5JiVESzY/edit?usp=sharing>");
    }
    // artifact helper
    else if (input === "?ARTIFACT") {
        bot.sendMessage(message, "By using \n```!artifact CLASS SPEC```\n you can get the artifact path graphic sent. Class options are DK, DH, Druid, Hunter, Mage, Monk, Paladin, Priest, Rogue, Shaman, Warlock, or Warrior.");
    }
    // artifact power guide
    else if (input.startsWith("!ARTIFACT")) {
        switch (parsedReg[1]) {
            case "DK":
                switch(parsedReg[2]) {
                    case "UNHOLY":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/unholy-death-knight-artifact.jpg");
                        break;
                    case "FROST":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/frost-death-knight-artifact.jpg");
                        break;
                    case "BLOOD":
                        bot.sendFile(message, "http://i.imgur.com/9KakC97.png");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Unholy, Frost, or Blood.");
                }
                break;
            case "DH":
                switch(parsedReg[2]) {
                    case "HAVOC":
                        bot.sendFile(message, "http://i.imgur.com/75pbNRS.jpg");
                        break;
                    case "VENGEANCE":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/vengeance-demon-hunter-artifact.jpg");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Havoc or Vengeance.");
                }
                break;
            case "DRUID":
                switch(parsedReg[2]) {
                    case "BALANCE":
                        bot.sendFile(message, "http://i.imgur.com/bubvXrX.png");
                        break;
                    case "RESTORATION":
                    case "RESTO":
                        bot.sendFile(message, "http://i.imgur.com/ZBSWUGB.png");
                        break;
                    case "GUARDIAN":
                        bot.sendFile(message, "http://www.theincbear.com/images/ArtifactPaths.png");
                        break;
                    case "FERAL":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/feral-druid-artifact.jpg");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Balance, Restoration, Guardian, or Feral.");
                }
                break;
            case "HUNTER":
                switch(parsedReg[2]) {
                    case "BM":
                    case "BEAST":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/beast-mastery-hunter-artifact.jpg");
                        break;
                    case "MARKSMANSHIP":
                    case "MM":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/marksmanship-hunter-artifact.jpg");
                        break;
                    case "SURVIVAL":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/survival-hunter-artifact.jpg");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: BM, Marksmanship, or Survival.");
                }
                break;
            case "MAGE":
                switch(parsedReg[2]) {
                    case "FIRE":
                        bot.sendFile(message, "http://i.imgur.com/Aff1Kke.png");
                        break;
                    case "ARCANE":
                        bot.sendFile(message, "https://cdn.discordapp.com/attachments/209851034657357835/216690880109740033/Arcane-Artifacts-Templates-Branch.png");
                        break;
                    case "FROST":
                        bot.sendFile(message, "https://cdn.discordapp.com/attachments/209851034657357835/217064942589837312/Frost-Artifacts-Templates.png");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Fire, Arcane, or Frost.");
                }
                break;
            case "MONK":
                switch(parsedReg[2]) {
                    case "WINDWALKER":
                    case "WW":
                        bot.sendFile(message, "http://www.walkingthewind.com/wp-content/uploads/2016/08/Artifact-CCW.png");
                        break;
                    case "MISTWEAVER":
                    case "MW":
                        //bot.sendFile(message, "http://www.mistyteahouse.com/wp-content/uploads/2016/09/Artifact-Tree-Progress2.png");
                        bot.sendFile(message, "https://cdn.discordapp.com/attachments/218222107673362432/218222503447887872/circle-path-2.png"); 
                        break;
                    case "BREWMASTER":
                    case "BM":
                        bot.sendFile(message, "http://i.imgur.com/INQTgmd.png");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Windwalker, Mistweaver, or Brewmaster.");
                }
                break;
            case "PALADIN":
                switch(parsedReg[2]) {
                    case "HOLY":
                        bot.sendFile(message, "http://i.imgur.com/x06h0i7.png");
                        break;
                    case "RET":
                    case "RETRIBUTION":
                        bot.sendFile(message, "https://cdn.discordapp.com/attachments/122829094168559617/217313949115219969/IMG_2627.JPG");
                        break;
                    case "PROT":
                    case "PROTECTION":
                        bot.sendFile(message, "http://i.imgur.com/1Rkv3bh.png");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Holy, Retribution, or Protection");
                }
                break;
            case "PRIEST":
                switch(parsedReg[2]) {
                    case "SHADOW":
                        bot.sendFile(message, "http://i.imgur.com/geNBd11.png");
                        break;
                    case "DISC":
                    case "DISCIPLINE":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/discipline-priest-artifact.jpg");
                        break;
                    case "HOLY":
                        bot.sendFile(message, "http://puu.sh/qNit1/eea4da9804.jpg");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Holy, Discipline, or Shadow");
                }
                break;
            case "ROGUE":
                switch(parsedReg[2]) {
                    case "OUTLAW":
                    case "COMBAT":
                        bot.sendFile(message, "http://puu.sh/qKo3P/ecccd6024c.jpg");
                        break;
                    case "ASSASSINATION":
                    case "ASS":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/assassination-rogue-artifact.jpg");
                        break;
                    case "SUB":
                    case "SUBTLETY":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/subtlety-rogue-artifact.jpg");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Outlaw, Assassination, or Subtlety.");
                }
                break;
            case "SHAMAN":
                switch(parsedReg[2]) {
                    case "RESTORATION":
                    case "RESTO":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/restoration-shaman-artifact-casual.jpg");
                        break;
                    case "ELEMENTAL":
                    case "ELE":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/elemental-shaman-artifact.jpg");
                        break;
                    case "ENH":
                    case "ENHANCE":
                    case "ENHANCEMENT":
                        bot.sendFile(message, "http://static.icy-veins.com/images/wow/enhancement-shaman-artifact.jpg");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Restoration, Elemental, or Enhancement.");
                }
                break;
            case "WARLOCK":
                switch(parsedReg[2]) {
                    case "DEMONOLOGY":
                    case "DEMO":
                        bot.sendFile(message, "http://i.imgur.com/1UGnMro.png");
                        break;
                    case "DESTRUCTION":
                    case "DESTRO":
                        bot.sendFile(message, "http://i.imgur.com/SXM457s.jpeg");
                        break;
                    case "AFFLICTION":
                    case "AFF":
                        bot.sendFile(message, "http://i.imgur.com/xpYCqFi.png");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Demonology, Destruction, or Affliction.");
                }
                break;
            case "WARRIOR":
                switch(parsedReg[2]) {
                    case "PROTECTION":
                    case "PROT":
                        bot.sendFile(message, "https://i.imgur.com/OCpTPo1.png");
                        break;
                    case "ARMS":
                        bot.sendFile(message, "https://i.imgur.com/gPAvS0N.png");
                        break;
                    case "FURY":
                        bot.sendFile(message, "https://i.imgur.com/JZbh9Ka.png");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Protection, Arms, or Fury.");
                }
                break;
            default:
                bot.sendMessage(message, "Not a valid class. Options are DK, DH, Druid, Hunter, Mage, Monk, Paladin, Priest, Rogue, Shaman, Warlock, or Warrior.");
        }
    }
    // EN Guide
    else if (input.startsWith("!EN") || input.startsWith("!EMERALD")) {
       switch (parsedReg[1]) {
            case "NYTHENDRA":
                bot.sendMessage(message, "Here is the Boss Strat/Guide for Nythendra: <XXXX>");
                break;
            case "IL'GYNOTH":
                bot.sendMessage(message, "Here is the Boss Strat/Guide for Il'gynoth: <XXXX>");
                break;
            case "URSOC":
                bot.sendMessage(message, "Here is the Boss Strat/Guide for Ursoc: <XXXX>");
                break;
            case "DRAGONS":
            case "DARGONS":
            case "DON":
                bot.sendMessage(message, "Here is the Boss Strat/Guide for the Dragons of Nightmare: <XXXX>");
                break;
            case "CENARIUS":
                bot.sendMessage(message, "Here is the Boss Strat/Guide for Cenarius: <XXXX>");
                break;
            case "XAVIUS":
                bot.sendMessage(message, "Here is the Boss Strat/Guide for Xavius: <XXXX>");
                break;
            default:
                bot.sendMessage(message, "Here is the Emerald Nightmare Boss Strat/Guide for EP: <XXXX>");
       }
    }
    // Codec guide
    else if (input === "!CODEC" || input === "!EXPORT" || input === "!EXPORTING" || input === "!PREMEIRE" || input === "!HANDBRAKE" || input === "!CONVERTING" || input === "!CONVERT") {
        bot.sendMessage(message, "Here is the link for the Video Codec/Exporting Guide + Handbrake: <https://docs.google.com/document/d/1yUhICx-zh16jSX5IF2ReI_CbY39rDArHn2qxI6JprTQ/edit?usp=sharing>")
    }
    // SHAME
    else if (input === "!SHAME" || input === "SHAME") {
        bot.sendMessage(message, "http://i.imgur.com/FidZknJ.gif");
    }
    // Stay Classy Achieve
    else if (input === "!STAYCLASSY") {
        bot.sendMessage(message, "The following are the race/class combos we still need:\nTauren(Priest)\nTrolls(Warlock)\nUndead(Hunter)\nGoblins(DK, Rogue, Warlock, Priest)\nPandaren(Mage, Priest)");
    }
    // legion lexicon guide
    else if (input === "!LEXICON" || input === "!LEVELING") {
        bot.sendMessage(message, "Here is Soulflayer's leveling/gearing guide for Legion: <https://docs.google.com/spreadsheets/d/1TiiI4huz4NXKfx7PGvvVTyP6xu8VaDNZ4-FEn69mOhc/pubhtml#>");
        bot.sendMessage(message, "Here is Zhengsim's leveling guide for Legion: <https://docs.google.com/spreadsheets/d/1QwcvZmhi4zoe_29RmV_UDoDqLXrFdIBirKBz6ClMo0o/edit#gid=0>");
        bot.sendMessage(message, "Here is Brutall's speed leveling guide for Legion: <https://docs.google.com/spreadsheets/d/1blP6Ld_JGQQx8112LfN1eghYt1I3TZFxgCWZK8WOimQ/edit#gid=0>");
    }
    // WoWProgress Link
    else if (input === "!WOWPROGRESS") {
        bot.sendMessage(message, "Here is the link to the EP WoWProgress Page: <http://www.wowprogress.com/guild/us/arthas/Exiled+Power>");
        var url = "http://www.wowprogress.com/guild/us/arthas/Exiled+Power/json_rank";
        request({
            method: 'GET',
            uri: url,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var json_rank = response.body;
                console.log(json_rank);
                bot.sendMessage(message, "Exiled Power is currently ranked " + `${prettyjson.render(json_rank.world_rank)}` + " in the world and " + `${prettyjson.render(json_rank.realm_rank)}` + " on Arthas.");
            } else {
                bot.sendMessage(message, "I could not find a ranking for Exiled Power on WoWProgress for the current tier.");
            }
        });
    }
    // Warcraft Logs Link
    else if (input === "!LOGS" || input === "!WCL" || input === "!WARCRAFTLOGS") {
        bot.sendMessage(message, "Here is the link to the EP Logs: <https://www.warcraftlogs.com/guilds/reportslist/75984/>");
    }
    // git repo
    else if (input === "!GITHUB" || input === "!GIT" || input === "!CODE" || input === "!SOURCE") {
        bot.deleteMessage(message);
        bot.sendMessage(message, "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>");
    }
    // GITHUB issues
    else if (input === "!ISSUE" || input === "!SUGGESTION" || input === "!FEATURE" || input === "!FEEDBACK") {
        bot.deleteMessage(message);
        bot.sendMessage(message, "All suggestions/issues for Jarvis should be filled out here: https://github.com/seanpeters86/Jarvis/issues")
    }
    // its not random
    else if (input === "!RANDOM" || input === "#ITSRANDOM") {
        bot.sendMessage(message, "It's never random. Molo is a cheater.");
    }
    // creator
    else if (input === "!QUESTION WHO CREATED YOU?" || input === "!CREATOR" || input === "!QUESTION WHO IS YOUR CREATOR?") {
        bot.sendMessage(message, "My creator is the almighty Republic of course. He's pretty swell.");
    }
    // !Is cody good at playing hunter?
    else if (input === "!QUESTION IS CODY GOOD AT PLAYING HUNTER?") {
        bot.reply(message, "Nope");
    }
    // invite link
    else if (input === "!INVITE") {
        bot.sendMessage(message, "Here is the invite link: XXXX");
    }
    // YouTube Channel
    else if (input === "!YOUTUBE") {
        bot.sendMessage(message, "Here's our youtube channel: https://www.youtube.com/channel/UClDUcIXf0USA_WRRuFsmfCw");
    }
    // Plug.dj
    else if (input === "!MUSIC" || input === "!PLUG" || input === "!DJ" || input === "!PLUG.DJ") {
        bot.sendMessage(message, "Here's our Plug.DJ channel: XXXX");
    }
    // Website Link
    else if (input === "!WEBSITE") {
        bot.sendMessage(message, "Check out dat website: http://www.exiledpower.com");
    }
    // Prints out the link to the roster in Google Sheets
    else if (input === "!ROSTER" || input === "#AMISITTING?") {
        bot.sendMessage(message, "Here is the roster: <XXXX>");
    }
    // !game status for Jarvis
    else if (input.startsWith("!GAME") && input.endsWith("-J")) {
        bot.deleteMessage(message);
        bot.setStatus('online', parsed[1]);
    }
    // Stat Weights Sheet
    else if (input.startsWith("!STAT") || input === "!STATPRIORITIES" || input === "!STATWEIGHTS") {
        bot.sendMessage(message, "Here is the stat weights/priorities sheet: <XXXX>");
    }
    // cheatsheet
    else if (input === "!CHEATSHEET" || input === "!DUNGEONGUIDE") {
        bot.sendMessage(message, "Here is the mythic dungeon Cheat Sheet: <https://docs.google.com/document/d/1_tqb6mbU14BoABc4ApMTFxWMGaZ1KIu-6nuZ83p7tGM/preview>");
    }
    // rep guide
    else if (input === "!REPUTATION" || input.startsWith("!REP")) {
        bot.sendMessage(message, "Here is the wowhead reputation guide: <http://www.wowhead.com/guides/reputation/legion/overview>");
    }
    // drwaing board
    else if (input.startsWith("!DRAWING")) {
        bot.sendMessage(message, "Here is the drawing board for EP videos: <XXXX>");
    }
    // pre-raid bis sheet
    else if (input === "!BISLIST" || input.startsWith("!PRE-RAID") || input.startsWith("!GEARING")) {
        bot.sendMessage(message, "Here is the Gearing/What to do guide at 110: <http://www.worldofmoudi.com/end-game-guide-in-legion>");
        bot.sendMessage(message, "Here is the Pre-Raid BiS List: <https://docs.google.com/spreadsheets/d/1zyb9dfCAPj-cINDcTHoNlPNzSTflggIFE4XB4K8j2GI/edit?usp=sharing>");
    }
    // addons
    else if (input === "!ADDONS") {
        bot.sendMessage(message, "Legion Addon list:\nAuto Turn In: <https://mods.curse.com/addons/wow/autoturnin>\nWorld Quest Tracker: <https://mods.curse.com/addons/wow/world-quest-tracker>\nWorld Quest List: <https://mods.curse.com/addons/wow/world-quests-list>\nCharacter Stat Sheet: <https://mods.curse.com/addons/wow/dejacharacterstats>\nHandyNotes Tracker: <https://mods.curse.com/addons/wow/handynotes_legionrarestreasures>");
    }
    // sims
    else if (input.startsWith("!SIMS")) {
        switch (parsedReg[1]) {
            case "PUBLIK":
                bot.reply(message, "Here is the latest simulation for Publik (Shadow Priest): <https://github.com/seanpeters86/ExiledPower/tree/master/Priest_Shadow>");
                break;
            case "KELSO":
            case "KELSØ":
                bot.reply(message, "Here is the latest simulation for Kelsø (Enhancement Shaman): <https://github.com/seanpeters86/ExiledPower/tree/master/Shaman_Enhancement>");
                break;
            case "WAKINGDEMONZ":
            case "CODIAKSCOUT":
                bot.sendMessage(message, "Here are the latest simulations for Wakingdemonz/Codiakscout (Marksman Hunter): <https://github.com/seanpeters86/ExiledPower/tree/master/Hunter_Marksman>");
                bot.sendMessage(message, "Here are the latest simulations for Wakingdemonz/Codiakscount (Beast Mastery Hunter): <https://github.com/seanpeters86/ExiledPower/tree/master/Hunter_BeastMastery>");
            default:
                bot.deleteMessage(message);
                bot.sendMessage(user, parsedReg[1] + " sims does not exist in my repo, or I'm not sure where to find it.");
        }
    }
    // pinned messages
    else if (input.startsWith("!PINNED")) {
        if (!(input.endsWith("-P"))) {
            bot.deleteMessage(message);
        }
        bot.getPinnedMessages(message.channel, (err, messages) => {
            if (!err) {
                for (var message of messages) {
                    var content = message.content;
                    //console.log(content);
                    if (input.endsWith("-P")) {
                        bot.sendMessage(message, content);
                    } else {
                        bot.sendMessage(user, content);
                    }
                    if (!message.content) {
                        bot.sendMessage(user, "No pinned messages in this channel, or I can't find them.");
                    }
                }
            } else {
                console.log("Couldn't fetch pins: " + err);
            }
        });
    }
    // countdown helper
    else if (input.startsWith("?COUNTDOWN")) {
        bot.sendMessage(message, "Use !countdown QUERY, with QUERY being something such as Legion or EN");
    }
    // countdown
    /*
    else if (input.startsWith("!COUNTDOWN")) {
        var current = new Date();
        switch (parsedReg[1]) {
            case "LEGION":
            case "LAUNCH":
                var countdownName = "Legion";
                var calculated = new Date(2016, 7, 30, 6);
                break;
            case "MYTHIC+":
            case "MYTHICPLUS":
            case "EMERALD":
            case "EN":
                if (parsedReg[2] === "MYTHIC" || parsedReg[3] === "MYTHIC") {
                    var countdownName = "Emerald Nightmare Mythic";
                    var calculated = new Date(2016, 8, 27, 3);
                    break;
                } else {
                    var countdownName = "Emerald Nightmare Normal & Heroic / Mythic+";
                    var calculated = new Date(2016, 8, 20, 3);
                    break;
                }
            default:
                var countdownName = "INVALID";
        }
        var difference = calculated - current;
        var seconds = Math.round((difference) / 1000);
        var minutes = Math.round((seconds) / 60);
        var hours = Math.round((minutes) / 60);
        var days = Math.round((hours) / 24);
        if (!(countdownName === "INVALID")) {
            bot.sendMessage(message, "Countdown to " + countdownName + "\n" + days + " Days, " + (hours % 24) + " Hours, " + (minutes % 60) + " Minutes, and " + (seconds % 60) + " Seconds.");
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, parsedReg[1] + " " + parsedReg[2] + " is invalid query. Current options are: Legion, Mythic+ and Emerald Nightmare");
        }
        console.log("Days: " + days + " Hours: " + (hours % 24) + " Minutes: " + (minutes % 60) + " Seconds: " + (seconds % 60));
    }
    */
    // lore core
    else if (input === "!LORE" || input === "!LORECORE" || input === "#LORECORE" || input === "#LORE") {
        var random = Math.floor((Math.random() * 22) + 1);
        switch (random) {
            case 1:
                bot.sendFile(message, "http://i.imgur.com/d4tjQQJ.jpg");
                break;
            case 2:
                bot.sendFile(message, "http://i.imgur.com/tbwv6GX.png");
                break;
            case 3:
                bot.sendFile(message, "http://i.imgur.com/P2F5bWn.jpg");
                break;
            case 4:
                bot.sendFile(message, "http://i.imgur.com/tKNosl0.png");
                break;
            case 5:
                bot.sendFile(message, "http://i.imgur.com/TeIzUNt.png");
                break;
            case 6:
                bot.sendFile(message, "http://i.imgur.com/G8KLi3L.png");
                break;
            case 7:
                bot.sendFile(message, "http://i.imgur.com/lH4laAS.jpg");
                break;
            case 8:
                bot.sendFile(message, "http://i.imgur.com/3IgAUMT.jpg");
                break;
            case 9:
                bot.sendFile(message, "http://i.imgur.com/ZoKRvOX.png");
                break;
            case 10:
                bot.sendFile(message, "http://imgur.com/qugE1Hd");
                break;
            case 11:
                bot.sendFile(message, "http://i.imgur.com/Y1oULOj.png");
                break;
            case 12:
                bot.sendFile(message, "http://i.imgur.com/ONucxNF.png");
                break;
            case 13:
                bot.sendFile(message, "http://i.imgur.com/dEe9rGv.png");
                break;
            case 14:
                bot.sendFile(message, "http://i.imgur.com/Qfx2M5y.png");
                break;
            case 15:
                bot.sendFile(message, "http://i.imgur.com/8pKvL0X.jpg");
                break;
            case 16:
                bot.sendFile(message, "http://i.imgur.com/7K08VQg.png");
                break;
            case 17:
                bot.sendFile(message, "http://i.imgur.com/xxrNi8P.png");
                break;
            case 18:
                bot.sendFile(message, "http://i.imgur.com/OGhjNNR.png");
                break;
            case 19:
                bot.sendFile(message, "http://i.imgur.com/0luga5w.png");
                break;
            case 20:
                bot.sendFile(message, "http://i.imgur.com/Kp4SNIc.png");
                break;
            case 21:
                bot.sendFile(message, "http://i.imgur.com/mIV7Vmv.png");
                break;
            default:
                bot.sendFile(message, "http://i.imgur.com/TuHyl0N.jpg");
        }
    }
    // Video helper
    else if (input.startsWith("?BOSS") || input.startsWith("?VIDEO")) {
        bot.sendMessage(message, "By using !BOSS or !VIDEO simply follow it with the boss name or the video you wish to search my database for.");
    }
    // Kill Videos
    else if (input.startsWith("!BOSS") || input.startsWith("!VIDEO")) {
        switch (parsedReg[1]) {
            case "NYTHENDRA":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "IL'GYNOTH":
            case "IL":
            case "ILGYNOTH":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "ELERETHE":
            case "RENFERAL":
            case "ELE":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "URSOC":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "DRAGONS":
            case "DARGONS":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "CENARIUS":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "XAVIUS":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "ARCHIMONDE":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=Jkt1iId7Xbc");
                break;
            case "MANNY":
            case "MANNOROTH":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=b7mTPw0pv20");
                break;
            case "XHUL'HORAC":
            case "XHUL":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=N2aSgC4DlIU");
                break;
            case "TYRANT":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=wHUKGvI6U2Y");
                break;
            case "FEL":
            case "LORD":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=d0C92xy1fts");
                break;
            case "ISKAR":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=9iIAlJQ3Fws");
                break;
            case "SOCRETHAR":
            case "SOC":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=cbO6Ri4XqlA");
                break;
            case "GOREFIEND":
            case "GORE":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=OYOQ6ahRAc4");
                break;
            case "KILROGG":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=37hyWu503zo");
                break;
            case "COUNCIL":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=89wK24T2lK8");
                break;
            case "KORMROK":
            case "KORM":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=KAnECqXw11c");
                break;
            case "REAVER":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=8exVgQfHAaA");
                break;
            case "ASSAULT":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=FBKpYBYkZ5w");
                break;
            case "HANS":
            case "FRANZ":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=dCbk8OamUow");
                break;
            case "OREO":
            case "OREGORGER":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=F8xwKWEci_I");
                break;
            case "GRUUL":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=zYs9iKxrUGU");
                break;
            case "BEASTLORD":
            case "DARMAC":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=n3Jr61veZkQ");
                break;
            default:
                bot.deleteMessage(message);
                bot.sendMessage(user, parsedReg[1] + " name not recognized");
        }
    }
    // ?addrole helper
    else if (input.startsWith("?ADDROLE") || input.startsWith("?ADD")) {
        bot.sendMessage(message, "To get added into a channel type '!add channelName' where channel name is a valid name (case matters!). The options are: Pokemon, Healers, Theorycrafting, and Overwatch.");
    }
    // !addrole Role
    else if ((input.startsWith("!ADDROLE") || input.startsWith("!ADD") || input.startsWith("!JOIN")) && !(message.channel.isPrivate)) {
        //bot.sendMessage(message,parsed[1]); // send message that contains the roleid
        // Check of role matches the class list
        if (parsed[1] == "Mage" || parsed[1] == "Death" || parsed[1] == "Druid" || parsed[1] == "Hunter" || parsed[1] == "Demon" || parsed[1] == "Monk" || parsed[1] == "Paladin" || parsed[1] == "Priest" || parsed[1] == "Rogue" || parsed[1] == "Shaman" || parsed[1] == "Warlock" || parsed[1] == "Warrior") {
            role = roles.get("name", "Officers").id; //get roll id of Officer/Admin role
            // Check if member is an Officer/Admin
            if (bot.memberHasRole(user, role)) {
                if (parsed[1] == "Death") {
                    parsed[1] = "Death Knight";
                }
                if (parsed[1] == "Demon") {
                    parsed[1] = "Demon Hunter";
                }
                role = roles.get("name", parsed[1]).id; // get roleid of class
                bot.addMemberToRole(user, role);
                bot.reply(message, "You are now a " + parsed[1] + "!");
            } else { // if not an officer/admin
                bot.sendMessage(user, parsed[1] + " does not exist, or you do not have permission to add that role.");
            }
            // Check if role matches channel list
        } else if (parsed[1] == "Developers" || parsed[1] == "Music" || parsed[1] == "Pokemon" || parsed[1] == "Healers" || parsed[1] == "Theorycrafting" || parsed[1] == "Overwatch") {
            role = roles.get("name", parsed[1]).id; // get roleid of channel
            bot.addMemberToRole(user, role);
            bot.reply(message, "Added you to the " + parsed[1] + " channel!");
        } else { // if role does not exist
            bot.deleteMessage(message);
            bot.sendMessage(user, parsed[1] + " does not exist.");
        }
    }
    // ?removerole helper
    else if ((input.startsWith("?REMOVEROLE") || input.startsWith("?REMOVE") || input.startsWith("?RM")) && !(message.channel.isPrivate)) {
        bot.sendMessage(message, "To remove yourself from a channel type '!remove channelName' where channel name is a valid name (case matters!). The options are: Pokemon, Healers, Theorycrafting, and Overwatch.");
    }
    // !removerole Developers
    else if ((input.startsWith("!REMOVEROLE") || input.startsWith("!REMOVE") || input.startsWith("!RM")) && !(message.channel.isPrivate)) {
        if (parsed[1] == "Mage" || parsed[1] == "Death" || parsed[1] == "Druid" || parsed[1] == "Priest" || parsed[1] == "Hunter" || parsed[1] == "Demon" || parsed[1] == "Monk" || parsed[1] == "Paladin" || parsed[1] == "Rogue" || parsed[1] == "Shaman" || parsed[1] == "Warlock" || parsed[1] == "Warrior") {
            role = roles.get("name", "Officers").id;
            if (bot.memberHasRole(user, role)) {
                if (parsed[1] == "Death") {
                    parsed[1] = "Death Knight";
                }
                if (parsed[1] == "Demon") {
                    parsed[1] = "Demon Hunter";
                }
                role = roles.get("name", parsed[1]).id;
                bot.removeMemberFromRole(user, role);
                bot.reply(message, "You are no longer a " + parsed[1] + "!");
            } else {
                bot.reply(message, parsed[1] + " does not exist, or you cannot remove that role.");
            }
        } else if (parsed[1] == "Developers" || parsed[1] == "Music" || parsed[1] == "Pokemon" || parsed[1] == "Healers" || parsed[1] == "Theorycrafting" || parsed[1] == "Overwatch") {
            role = roles.get("name", parsed[1]).id;
            bot.removeMemberFromRole(user, role);
            bot.reply(message, "Removed you from " + parsed[1] + "!");
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, parsed[1] + " does not exist, or you cannot remove that role.");
        }
    }
    // !say channel message
    else if (!(message.channel.isPrivate) && input.startsWith("!SAY") && (parsed[1] === "developers" || parsed[1] === "music" || parsed[1] === "raiding" || parsed[1] === "guild-chat" || parsed[1] === "senior-raiders" || parsed[1] === "officers" || parsed[1] === "overwatch" || parsed[1] === "pokemon" || parsed[1] === "theorycrafting" || parsed[1] === "welcome" || parsed[1] === "healing" || parsed[1] === "mages" || parsed[1] === "hunters")) {
        channel = channels.get("name", parsed[1]).id; // get channel id
        console.log("Channel id: " + channel + " for " + parsed[1]);
        role = roles.get("name", "Officers").id;
        reserved = parsed[2];
        for (var i = 3; i < parsed.length; i++) {
            reserved = reserved + " " + parsed[i];
        }
        if (bot.memberHasRole(user, role)) {
            bot.sendMessage(channel, reserved);
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, "You don't have valid permissions to do that.");
        }
    }
    // !guide helper
    else if (input.startsWith("?GUIDE")) {
        bot.sendMessage(message, "By using !GUIDE you can query my database for class/general guides from across the web. An example would be '!guide priest shadow' to get a guide for shadow priests.");
    }
    // get guide links by class/spec
    else if (input.startsWith("!GUIDE")) {
        switch (parsedReg[1]) {
            case "DK":
                switch(parsedReg[2]) {
                    case "UNHOLY":
                        bot.sendMessage(message, "<https://docs.google.com/document/d/1jNy2mY12agytX47xOyg7O30IllXXHKZQL5HlALzUuzI/edit>\n<http://www.wowhead.com/guides/classes/death-knight/unholy/overview>");
                        break;
                    case "FROST":
                        bot.sendMessage(message, "<http://www.wowhead.com/guides/classes/death-knight/frost/overview>");
                        break;
                    case "BLOOD":
                        bot.sendMessage(message, "<https://docs.google.com/document/d/1rNeybQ76QKKQ2k5NXoErhG6bfijHo8O1FPHuqxR54JE/edit>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Unholy, Frost, or Blood.");
                }
                break;
            case "DH":
                switch(parsedReg[2]) {
                    case "HAVOC":
                        bot.sendMessage(message, "<http://www.wowhead.com/guides/classes/demon-hunter/havoc/overview>");
                        break;
                    case "VENGEANCE":
                        bot.sendMessage(message, "<http://www.wowhead.com/guides/classes/demon-hunter/vengeance/overview>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Havoc or Vengeance.");
                }
                break;
            case "DRUID":
                switch(parsedReg[2]) {
                    case "BALANCE":
                        bot.sendMessage(message, "<http://us.battle.net/forums/en/wow/topic/20745626938>\n<https://docs.google.com/document/d/1c6-_akHl_Cja-uwg20Gt8R0f12pcw4_qtVcT7LyZW4A/preview>");
                        break;
                    case "RESTORATION":
                    case "RESTO":
                        bot.sendMessage(message, "<http://www.restokin.com/resto-druid-healing-guide/>\n<http://www.wowhead.com/guides/classes/druid/restoration/overview>");
                        break;
                    case "GUARDIAN":
                        bot.sendMessage(message, "<http://www.theincbear.com/forums/viewtopic.php?f=9&t=1562>");
                        break;
                    case "FERAL":
                        bot.sendMessage(message, "<http://xanzara.com/xanzarasferalguide.pdf>\n<http://www.wowhead.com/guides/classes/druid/feral/overview>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Balance, Restoration, Guardian, or Feral.");
                }
                break;
            case "HUNTER":
                switch(parsedReg[2]) {
                    case "BM":
                    case "BEAST":
                        bot.sendMessage(message, "<http://www.icy-veins.com/wow/beast-mastery-hunter-pve-dps-guide>");
                        break;
                    case "MARKSMANSHIP":
                    case "MM":
                        bot.sendMessage(message, "<http://www.icy-veins.com/wow/marksmanship-hunter-pve-dps-guide>");
                        break;
                    case "SURVIVAL":
                        bot.sendMessage(message, "<http://www.icy-veins.com/wow/survival-hunter-pve-dps-guide>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: BM, Marksmanship, or Survival.");
                }
                break;
            case "MAGE":
                switch(parsedReg[2]) {
                    case "FIRE":
                        bot.sendMessage(message, "<https://www.altered-time.com/forum/viewtopic.php?f=4&t=2611>\n<https://www.altered-time.com/forum/viewtopic.php?f=4&t=2553>");
                        break;
                    case "ARCANE":
                        bot.sendMessage(message, "<https://www.altered-time.com/forum/viewtopic.php?f=3&t=2618>");
                        break;
                    case "FROST":
                        bot.sendMessage(message, "<https://www.altered-time.com/forum/viewtopic.php?f=5&t=2621>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Fire, Arcane, or Frost.");
                }
                break;
            case "MONK":
                switch(parsedReg[2]) {
                    case "WINDWALKER":
                    case "WW":
                        bot.sendMessage(message, "<https://www.wowhead.com/guides/classes/monk/windwalker/overview>\n<http://www.walkingthewind.com/guides/wordy/>");
                        break;
                    case "MISTWEAVER":
                    case "MW":
                        bot.sendMessage(message, "<http://www.wowhead.com/guides/classes/monk/mistweaver/overview>\n<http://www.mistyteahouse.com/mistweaver-guide/>"); 
                        break;
                    case "BREWMASTER":
                    case "BM":
                        bot.sendMessage(message, "<http://www.wowhead.com/guides/classes/monk/brewmaster/overview>\n<http://sunniersartofwar.com/brewmaster/>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Windwalker, Mistweaver, or Brewmaster.");
                }
                break;
            case "PALADIN":
                switch(parsedReg[2]) {
                    case "HOLY":
                        bot.sendMessage(message, "<https://www.wowhead.com/guides/classes/paladin/holy/overview>\n<https://sacredshielding.wordpress.com/legion-guide-introduction/>");
                        break;
                    case "RET":
                    case "RETRIBUTION":
                        bot.sendMessage(message, "<http://www.icy-veins.com/wow/retribution-paladin-pve-dps-guide>\n<http://www.wowhead.com/guides/classes/paladin/retribution/overview>\n<https://www.youtube.com/playlist?list=PLDryqnKrFNn_cI-zwx-Tl7BamKOAlko11>");
                        break;
                    case "PROT":
                    case "PROTECTION":
                        bot.sendMessage(message, "<http://www.wowhead.com/guides/classes/paladin/protection/overview>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Holy, Retribution, or Protection");
                }
                break;
            case "PRIEST":
                switch(parsedReg[2]) {
                    case "SHADOW":
                        bot.sendMessage(message, "<https://howtopriest.com/viewtopic.php?f=19&t=8402>");
                        break;
                    case "DISC":
                    case "DISCIPLINE":
                        bot.sendMessage(message, "<https://docs.google.com/document/d/1NbsDtJLVZqNc87jFzt-6WlPL02JOYmwppS1INtjVQTw/pub>\n<https://docs.google.com/document/d/1bYJ1KgX6cO6qHEoCVRTvsc0TCOYkQ_GUwUKd2672Ntg/pub>\n<https://www.automaticjak.com/guides/discipline>");
                        break;
                    case "HOLY":
                        bot.sendMessage(message, "<https://www.automaticjak.com/guides/holy>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Holy, Discipline, or Shadow");
                }
                break;
            case "ROGUE":
                switch(parsedReg[2]) {
                    case "OUTLAW":
                    case "COMBAT":
                        bot.sendMessage(message, "<https://docs.google.com/document/d/1-1GF7fMzLLkRg6Sa87e5mU3oSw2FwDe8fJwdsXxQKvU/preview>");
                        break;
                    case "ASSASSINATION":
                    case "ASS":
                        bot.sendMessage(message, "<https://docs.google.com/document/d/1-1GF7fMzLLkRg6Sa87e5mU3oSw2FwDe8fJwdsXxQKvU/preview>");
                        break;
                    case "SUB":
                    case "SUBTLETY":
                        bot.sendMessage(message, "<https://docs.google.com/document/d/1-1GF7fMzLLkRg6Sa87e5mU3oSw2FwDe8fJwdsXxQKvU/preview>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Outlaw, Assassination, or Subtlety.");
                }
                break;
            case "SHAMAN":
                switch(parsedReg[2]) {
                    case "RESTORATION":
                    case "RESTO":
                        bot.sendMessage(message, "<https://www.wowhead.com/guides/classes/shaman/restoration/overview>");
                        break;
                    case "ELEMENTAL":
                    case "ELE":
                        bot.sendMessage(message, "<http://www.wowhead.com/guides/classes/shaman/elemental/overview>");
                        break;
                    case "ENH":
                    case "ENHANCE":
                    case "ENHANCEMENT":
                        bot.sendMessage(message, "<http://www.wowhead.com/guides/classes/shaman/enhancement/overview>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Restoration, Elemental, or Enhancement.");
                }
                break;
            case "WARLOCK":
                switch(parsedReg[2]) {
                    case "DEMONOLOGY":
                    case "DEMO":
                        bot.sendMessage(message, "<http://goo.gl/Z0wDcx>\n<http://goo.gl/IZ9dGR>");
                        break;
                    case "DESTRUCTION":
                    case "DESTRO":
                        bot.sendMessage(message, "<http://goo.gl/Td6ldu>\n<http://goo.gl/W3VzOd>");
                        break;
                    case "AFFLICTION":
                    case "AFF":
                        bot.sendMessage(message, "<http://goo.gl/puw0Lg>\n<http://goo.gl/7hTC2k>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Demonology, Destruction, or Affliction.");
                }
                break;
            case "WARRIOR":
                switch(parsedReg[2]) {
                    case "PROTECTION":
                    case "PROT":
                        bot.sendsendMessageFile(message, "<https://goo.gl/uvKVbZ>\n<https://goo.gl/jpzbxg>");
                        break;
                    case "ARMS":
                        bot.sendMessage(message, "<https://goo.gl/ajsZkT>\n<https://goo.gl/7Y841X>");
                        break;
                    case "FURY":
                        bot.sendMessage(message, "<https://goo.gl/4qFqHc>\n<https://goo.gl/NrwZTU>");
                        break;
                    default:
                        bot.sendMessage(message, "Not a valid spec. Options are: Protection, Arms, or Fury.");
                }
                break;
            default:
                bot.sendMessage(message, "Not a valid class. Options are DK, DH, Druid, Hunter, Mage, Monk, Paladin, Priest, Rogue, Shaman, Warlock, or Warrior.");
        }
    }
    // !WA helper
    else if (input.startsWith("?WA")) {
        bot.sendMessage(message, "By using !WA you can query my database for class/general Weak Auras from WAGO.io. An example would be '!wa rogue' to get weakauras for rogues.");
    }
    // get WA category links
    else if (input.startsWith("!WA")) {
        switch (parsedReg[1]) {
            case "WAGO":
                bot.reply(message, "<https://wago.io/>");
                break;
            case "GENERAL":
                bot.reply(message, "<https://wago.io/categories/general>");
                break;
            case "DEATH":
            case "DK":
                bot.reply(message, "<https://wago.io/categories/classes/death-knight>");
                break;
            case "DEMON":
            case "DH":
                bot.reply(message, "<https://wago.io/categories/classes/demon-hunter>");
                break;
            case "DRUID":
                bot.reply(message, "<https://wago.io/categories/classes/druid>");
                break;
            case "HUNTER":
            case "HUNTARD":
                bot.reply(message, "<https://wago.io/categories/classes/hunter>");
                break;
            case "PALADIN":
            case "PALY":
                bot.reply(message, "<https://wago.io/categories/classes/paladin>");
                break;
            case "PRIEST":
                bot.reply(message, "<https://wago.io/categories/classes/priest>");
                break;
            case "ROGUE":
                bot.reply(message, "<https://wago.io/categories/classes/rogue>");
                break;
            case "SHAMAN":
            case "SHAMMY":
                bot.reply(message, "<https://wago.io/categories/classes/shaman>");
                break;
            case "MAGE":
                bot.reply(message, "<https://wago.io/categories/classes/mage>");
                break;
            case "MONK":
                bot.reply(message, "<https://wago.io/categories/classes/monk>");
                break;
            case "WARLOCK":
            case "LOCK":
                bot.reply(message, "<https://wago.io/categories/classes/warlock>");
                break;
            case "WARRIOR":
                bot.reply(message, "<https://wago.io/categories/classes/warrior>");
                break;
            case "RAID":
                bot.reply(message, "<https://wago.io/categories/roles/raid-lead>");
                break;
            case "DPS":
            case "DAMAGE":
                bot.reply(message, "<https://wago.io/categories/roles/damage>");
                break;
            case "HEALS":
            case "HEALER":
                bot.reply(message, "<https://wago.io/categories/roles/healing>");
                break;
            case "TANK":
                bot.reply(message, "<https://wago.io/categories/roles/tanking>");
                break;
            case "EN":
            case "NIGHTMARE":
            case "EMERALD":
                bot.reply(message, "<https://wago.io/categories/pve/emerald-nightmare>");
                break;
            default:
                bot.deleteMessage(message);
                bot.sendMessage(user, parsedReg[1] + " does not exist, or I'm not sure where to find it.");
        }
    }
    // !server helper
    else if (input.startsWith("?SERVER")) {
        bot.sendMessage(message, "By using !server you can query my database for discord channel invite links. An example would be '!server rogue' to get the inite link for the rogue discord.");
    }
    // get discord servers
    else if (input.startsWith("!SERVER")) {
        switch (parsedReg[1]) {
            case "WA":
                bot.reply(message, "https://discord.me/wa2");
                break;
            case "HEALING":
                bot.reply(message, "https://discord.gg/wDemsxV");
                break;
            case "DEATH":
            case "DK":
                bot.reply(message, "https://discord.gg/0ez1cFfUH3ingV96");
                break;
            case "DEMON":
            case "DH":
                bot.reply(message, "https://discord.gg/0enuZ4FBFluNZH1r");
                break;
            case "DRUID":
                bot.reply(message, "https://discord.gg/0dWu0WkuetF87H9H");
                break;
            case "HUNTER":
            case "HUNTARD":
                bot.reply(message, "https://discord.gg/yqer4BX");
                break;
            case "PALADIN":
            case "PALY":
                bot.reply(message, "https://discord.gg/0dvRDgpa5xZHFfnD");
                break;
            case "PRIEST":
                bot.reply(message, "https://discord.gg/0f1Ta8lT8xXXEAIY");
                break;
            case "ROGUE":
                bot.reply(message, "https://discord.gg/0h08tydxoNhfDVZf");
                break;
            case "SHAMAN":
            case "SHAMMY":
                bot.reply(message, "https://discord.gg/0VcupJEQX0HuE5HH");
                break;
            case "MAGE":
                bot.reply(message, "https://discord.gg/0gLMHikX2aZ23VdA");
                break;
            case "MONK":
                bot.reply(message, "https://discord.gg/0dkfBMAxzTmggsPH");
                break;
            case "WARLOCK":
            case "LOCK":
                bot.reply(message, "https://discord.gg/0onXDymd9Wpc2CEu");
                break;
            case "WARRIOR":
                bot.reply(message, "https://discord.gg/0pYY7932lTH4FHW6");
                break;
            case "AMR":
            case "ASKMRROBOT":
                bot.reply(message, "https://discord.gg/RuJN9xP");
                break;
            case "WCL":
            case "WARCRAFTLOGS":
            case "WARCRAFT":
                bot.reply(message, "https://discord.gg/3752GVf");
                break;
            case "DISCORD":
            case "API":
                bot.reply(message, "https://discord.gg/WtyHkza");
                break;
            default:
                bot.deleteMessage(message);
                bot.sendMessage(user, parsedReg[1] + " does not exist, or I'm not sure where to find it.");
        }
    }
    // ranking help
    else if (input === "?RANKING") {
        bot.reply(message, "By using !ranking PLAYERNAME BOSSNAME [-h] you can check WCL parses for that characters rankings. Simply add -h to the end to check HPS rankings instead of DPS.");
    }
    // ranking
    else if (input.startsWith("!RANKING")) {
        if (!(input.includes("-P"))) {
            bot.deleteMessage(message);
        }
        var char = encodeURIComponent(parsed[1]);
        switch(parsedReg[2]) {
            case "NYTHENDRA":
                encounter = 1853;
                bossname = "Nythendra";
                break;
            case "IL'GYNOTH":
            case "IL":
            case "ILGYNOTH":
                encounter = 1873;
                bossname = "Il'gynoth, Heart of Corruption";
                break;
            case "ELERETHE":
            case "RENFERAL":
            case "ELE":
                encounter = 1876;
                bossname = "Elerethe Renferal";
                break;
            case "URSOC":
                encounter = 1841
                bossname = "Ursoc";
                break;
            case "DRAGONS":
            case "DARGONS":
                encounter = 1854;
                bossname = "Dragons of the Nightmare";
                break;
            case "CENARIUS":
                encounter = 1877;
                bossname = "Cenarius";
                break;
            case "XAVIUS":
                encounter = 1864;
                bossname = "Xavius";
                break;
        }
        if (input.endsWith("-H")) {
            var uri = "https://www.warcraftlogs.com:443/v1/rankings/character/" + char + "/Arthas/US?zone=" + raidid + "&encounter=" + encounter + "&metric=hps&partition=" + partition + "&api_key=XXXX";
        } else if (input.endsWith("-T")) {
            var uri = "https://www.warcraftlogs.com:443/v1/rankings/character/" + char + "/Arthas/US?zone=" + raidid + "&encounter=" + encounter + "&metric=krsi&partition=" + partition + "&api_key=XXXX";
        } else {
            var uri = "https://www.warcraftlogs.com:443/v1/rankings/character/" + char + "/Arthas/US?zone=" + raidid + "&encounter=" + encounter + "&metric=dps&partition=" + partition + "&api_key=XXXX";
        }
        request({
            method: 'GET',
            uri: uri,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode == 200 && (encounter != 0) && body.length > 0) {
                var rank = response.body;
                spec = parseInt(`${prettyjson.render(rank[0].spec)}`);
                playerclass = parseInt(`${prettyjson.render(rank[0].class)}`);
                var classparsed = classConvert(playerclass);
                var specparsed = specConvert(playerclass, spec);
                if (input.endsWith("-H")) {
                    if (!(input.includes("-P"))) {
                        bot.sendMessage(user, parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in HPS");
                    } else {
                        bot.sendMessage(message, parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in HPS");
                    }
                } else if (input.endsWith("-T")) {
                    if (!(input.includes("-P"))) {
                        bot.sendMessage(user, parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in Tanking (KRSI)");
                    } else {
                        bot.sendMessage(message, parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in Tanking (KRSI)");
                    }
                } else {
                    if (!(input.includes("-P"))) {
                        bot.sendMessage(user, parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in DPS");
                    } else {
                        bot.sendMessage(message, parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in DPS");
                    }
                }
            } else {
                bot.sendMessage(user, "I could not find a ranking for " + parsed[1] + " on " + parsed[2] + ". Check query and try again. Silly Human.");
            }
        });
    }
    // fuckin ø Ø
    else if (input.includes("Ø") && !(user.bot)) {
        bot.reply(message, "I hate that stupid o. Can we use real letters please?");
    }
    // Prints out list of commands in Discord
    else if (input.startsWith("!HELP") || input === "?JARVIS") {
        if (!(input.endsWith("-P"))) {
            bot.deleteMessage(message);
            bot.sendMessage(user, "You can now message Jarvis directly! Most things will work (other than channel specific stuff).\n \
            *Some commands you can also do ?COMMANDNAME to get more help!*\n \
            **List of Commands:**\n \
            GoT Statements = GoT Gifs/Images\n \
            If you need some Fantasy = **!FANTASY**\n \
            To check the video Pipeline = **!PIPELINE**\n \
            Artifact Power Guide = **!Artifact**\n \
            Emerald Nightmare quick Guide = **!EN**\n \
            Help exporting videos = **!CODEC**\n \
            To get status on Stay Classy Achievement = **!STAYCLASSY**\n \
            Legion Leveling Lexicon = **!Lexicon**\n \
            To get WoWProgress Ranking = **!WOWPROGRESS**\n \
            To get WarcraftLogs Page = **!WCL**\n \
            Get Source Code = **!GITHUB**\n \
            Have an issue/suggestion? = **!ISSUE**\n \
            Is it random? = **!RANDOM**\n \
            Discord invite Link = **!INVITE**\n \
            YouTube Link = **!YOUTUBE**\n \
            Weekly Roster Link = **!ROSTER**\n");
            bot.sendMessage(user," \
                Mythic Dungeon Cheatsheet = **!CHEATSHEET**\n \
            Pre-Raid BiS Gear Calculator = **!BISLIST**\n \
            List of Legion Addons = **!ADDONS**\n \
            To get Pinned Messages = **!PINNED**\n \
            To get Countdown timers for Legion Launch/EN Launch = **!COUNTDOWN LEGION**\n \
            Kill Vidoes = **!BOSS BOSSNAMEHERE** or **!VIDEO VIDEONAMEHERE**\n \
            Website Link = **!WEBSITE**\n \
            Weekly Roster = **!ROSTER**\n \
            Plug.DJ = **!MUSIC**\n \
            Class guides = **!GUIDE SPECCLASS** i.e. **!GUIDE SHADOWPRIEST**\n \
            Add/Remove Channel Roles = **!ADD** [or **!REMOVE**] **CHANNEL** (CHANNEL = Healers, Theorycrafting, Overwatch, Music)\n \
            WoW Discord Links = **!SERVER searchterms**\n \
            Random Lore Facts = **!LORE**\n \
            To get WCL Ranking [optional features incluide P for public, T for tanking and H for healing] = **!RANKING CHARACTERNAME BOSSNAME [-P] [-T] [-H]** i.e. **!RANKING Daenall Archimonde -P -H**\n \
            WAGO Class Links = **!WA CLASSNAME**");
        } else {
            bot.sendFile(message, "http://i.imgur.com/mISkWv2.png");
        }
    }
    // command not found
    else if (input.startsWith("!") && !((input.startsWith("!ROSIE") || input.startsWith("!HELP -R") || input.startsWith("!GAME -R") || input === "!GITHUB -R" || input === "!GIT -R" || input === "!CODE -R" || input === "!SOURCE -R" || input === "!ISSUE -R" || input === "!SUGGESTION -R" || input === "!FEATURE -R" || input === "!FEEDBACK -R" || input === "?TWITTER" || input === "?ROSIE"))) {
        bot.deleteMessage(message);
        bot.sendMessage(user, "I'm sorry, but I don't recognize...\n\n```" + message + "```\n...as a command pattern. Try using !help or ?commandname to get assistance.");
    }
});
bot.loginWithToken("Bot XXXX");

bot.on("disconnect", function() {
    console.log("Bot disconnected");
    bot.loginWithToken("Bot XXXX");
});
