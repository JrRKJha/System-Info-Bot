const Discord = require("discord.js")
require("dotenv").config();

const client = new Discord.Client({
 allowedMentions: {
  parse: ["users", "roles"],
  repliedUser: false,
 },
 presence: {
  status: "online",
  afk: false,
 },
 intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MEMBERS],
});
const moment = require("moment");
require("moment-duration-format");
const osutils = require("os-utils");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const os = osu.os;
const drive = osu.drive;
const proc = osu.proc;
const { dependencies } = require("./package.json");

client.on("messageCreate", (message) => {
    if(!message.content.startsWith("!info")) {
        return 0;}
    if(!message.guild) {return};
    if(!message.member) {return}; // Idk, i can't use shorer if XD

         const botuptime = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   const osuptime = moment.duration(os.uptime()).format(" D [days], H [hrs], m [mins], s [secs]");
   function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
   cpu.usage().then((cpupercentage) => {
    drive.info().then((driveinf) => {
     const driveinf0 = JSON.stringify(driveinf);
     const driveinfo = JSON.parse(driveinf0);
     const embed = new Discord.MessageEmbed() // Prettier
      .setTitle(
       `Generic Information`,
       message.guild.iconURL({
        dynamic: true,
        format: "png",
       })
      )
      .setColor("RANDOM")
      .setThumbnail(
       client.user.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      )
      .addField(`Guild Count`, `\`${client.guilds.cache.size} guilds\``, true)
      .addField(`User Count`, `\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``, true)
      .addField(`Channel Count`, `\`${client.channels.cache.size} channels\``, true)
      .addField(`Operating System`, "```" + capitalize(osutils.platform()) + " (" + os.arch() + ")```", true)
      .addField(`Tools`, `\`\`\`Node.js: ${process.version} | Discord.js: ${dependencies["discord.js"].replace("^", "v")}\`\`\``)
      .addField(`Uptime`, `\`\`\`Bot: ${botuptime}\nServer: ${osuptime}\`\`\``)
      // Yea, quite long strings XD
      .addField(`Ping`, `\`\`\`Bot: ${Math.round(client.ws.ping)}ms | API: ${(Date.now() - message.createdTimestamp).toString().replace(/-/g, "")}ms\`\`\``)
      .addField(`CPU`, "```" + cpu.model() + " (" + cpu.count() + " cores)" + " [" + cpupercentage + "% used]```")
      .addField(`Drive`, `\`\`\`${driveinfo.usedGb}GB/${driveinfo.totalGb}GB (${driveinfo.freePercentage}% free)\`\`\``)
      .addField(`RAM Usage`, `\`\`\`VPS: ${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\nBOT: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / osutils.totalmem().toString().split(".")[0]).toFixed(2)} %)\`\`\``)
      .setFooter(
       `Requested by ${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     return message.reply({ embeds: [embed]});
    });
   });



})
client.login(process.env.TOKEN);
