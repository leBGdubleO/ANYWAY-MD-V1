const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT045M21adHBNOHdIS2VEN05FM2VzaUIvdDRVenA2Nk1NWU9vby9DUXdHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYSt1V0IycXgzZGdQcVJHRWRzN1lvVkRaeXQvSXdDNHN0aC9MVDJaK3dFVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RTRncHRYUzl6bjNPU3VsWG1oM1grNldsZ0VXbDJlUDZ2SVg4RVVIV2w0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwbTZXOTJFWTBuMmU2cE5Na01CZUJYajZ2WFhGWFNva3pnYzdjejFMZEJRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1OM1lUNGptQyt1ajBCMXNFVFFyNklHUE5zaDlPd2NZZENkb0xTWFJmMk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9lSTl2T00xL25kODJLY29ETUkwTUpLUmNrQjRXS21VaTJ0WVR6UGU2Mms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUgvUVFVeFRjdEh0dklTc1dKMEhLaHJtWlpONHI0RGI4VFlGdkdpN3dHbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUlpHbTAyd0R0a3g4MENrc0xmNXNjWVZ4dCtJQ3cyNE12d1lnajhaRVNCTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjloL0FSRExob1hwblRUQk9QbzNyTU5KbkF2UVhSTW1jUGIrNkRKazdNK2YvbjNYbmZzZW9kRjNHcUkzbGlOTzFreHJST3B2WG1GZDhwanlFRm0wbWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODQsImFkdlNlY3JldEtleSI6IkxvL1RVZURkVmZsNlBLLzRNeENJQUJVK1hxZHlTYnNhRm03QUR5K2U4MTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im9FS2xKU2sxUjR1Z2FaWXRndUt0Y0EiLCJwaG9uZUlkIjoiODI4N2VjMTUtY2NmNy00ZTM1LTk5NTUtMzJmOTUwZTJhZjhmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjM0dmFLQml3Yis4K2JpR2tSS1hxejQ2QUdsOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyS3BQaTlNOExZUDZQemJqV0taTlpDdjFnOGc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMzVaWU5TNUoiLCJtZSI6eyJpZCI6IjUwOTQzNTA0NDYzOjUyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik1SIEFTU0FTU0lOIPCWo5gg8J2Qt/Cdm6/wnZul8J2Rh/Cdm6jwkoiS8JOEv82ezZ/Nns2f4LySIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJZkZyT3NIRUlXSjJMa0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJDZjc3amU5QnpWdjlxL094c3dRdnNYaWZkREtZWDJPSXRqNHFvRWJJMkhjPSIsImFjY291bnRTaWduYXR1cmUiOiJ1azZKS2ZkKzk1MGRHZmlvdlpFUm9GNjlFN08wUXJRb3FsK2QrSGRNSSs3Y29wZ2ZubkN5eGFtRzZ2ckkvYkt4UUpxOExneTJhcUNxOXVJNUFlT1lCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSHFYYnFwVVY5b0JqbDE2ZmF4L01BVHR5c1M4UjB6S011Ynd6aTBaQnZac3NRejd5d1JLNERtN1Mwd1NBWHcxQmFvVW5PbnAwYzAvRzNCYXJFRGlyamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDk0MzUwNDQ2Mzo1MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRbisrNDN2UWMxYi9hdnpzYk1FTDdGNG4zUXltRjlqaUxZK0txQkd5TmgzIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMxNTkzMzY0fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Assasin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
