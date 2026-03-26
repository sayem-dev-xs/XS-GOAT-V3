const axios = require("axios");

module.exports = {
  config: {
    name: "album",
    version: "1.2",
    author: "S AY EM",
    countDown: 5,
    role: 0,
    shortDescription: "Random video menu",
    longDescription: "Send random video by category",
    category: "media",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {

    const page1 = `
╔═════════════════════╗
      🎬 𝐕𝐈𝐃𝐄𝐎 𝐌𝐄𝐍𝐔 🎬
╚═════════════════════╝

╭─❍ 「 𝐏𝐀𝐆𝐄 𝟏 / 𝟐 」
│
│ ❶ 💞 𝐋𝐎𝐕𝐄 𝐕𝐈𝐃𝐄𝐎
│ ❷ 💕 𝐂𝐎𝐔𝐏𝐋𝐄 𝐕𝐈𝐃𝐄𝐎
│ ❸ 📽 𝐒𝐇𝐎𝐑𝐓 𝐕𝐈𝐃𝐄𝐎
│ ❹ 😔 𝐒𝐀𝐃 𝐕𝐈𝐃𝐄𝐎
│ ❺ 📝 𝐒𝐓𝐀𝐓𝐔𝐒 𝐕𝐈𝐃𝐄𝐎
│ ❻ ✍️ 𝐒𝐇𝐀𝐈𝐑𝐈 𝐕𝐈𝐃𝐄𝐎
│ ❼ 😻 𝐁𝐀𝐁𝐘 𝐕𝐈𝐃𝐄𝐎
│
╰───────────────❍

📩 Reply Number (1-7)
➡️ Type "next" for Page 2
`;

    api.sendMessage(page1, event.threadID, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: "album",
        author: event.senderID,
        messageID: info.messageID,
        type: "page1"
      });
    }, event.messageID);
  },

  onReply: async function ({ api, event, Reply }) {

    if (event.senderID != Reply.author) return;

    const input = event.body.toLowerCase();

    if (Reply.type == "page1") {

      if (input == "next") {

        api.unsendMessage(Reply.messageID);

        const page2 = `
╔═════════════════════╗
      🎬 𝐕𝐈𝐃𝐄𝐎 𝐌𝐄𝐍𝐔 🎬
╚═════════════════════╝

╭─❍ 「 𝐏𝐀𝐆𝐄 𝟐 / 𝟐 」
│
│ ❽ 🌸 𝐀𝐍𝐈𝐌𝐄 𝐕𝐈𝐃𝐄𝐎
│ ❾ ❄ 𝐇𝐔𝐌𝐀𝐈𝐘𝐔𝐍 𝐅𝐎𝐑𝐈𝐃
│ ❿ 🤲 𝐈𝐒𝐋𝐀𝐌𝐈𝐊 𝐕𝐈𝐃𝐄𝐎
│
│ 🔞 𝟏𝟖+ 𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐘
│
│ ⓫ 🥵 𝐇𝐎𝐑𝐍𝐘 𝐕𝐈𝐃𝐄𝐎
│ ⓬ 🔥 𝐇𝐎𝐓 𝐕𝐈𝐃𝐄𝐎
│ ⓭ 💃 𝐈𝐓𝐄𝐌 𝐕𝐈𝐃𝐄𝐎
│
╰───────────────❍

📩 Reply Number (8-13)
⬅️ Type "back" for Page 1
`;

        return api.sendMessage(page2, event.threadID, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: "album",
            author: event.senderID,
            messageID: info.messageID,
            type: "page2"
          });
        });
      }

      if (["1","2","3","4","5","6","7"].includes(input)) {

        api.unsendMessage(Reply.messageID)

        api.setMessageReaction("😘", event.messageID, () => {}, true)

        return sendVideo(api, event, input);
      }

    }

    if (Reply.type == "page2") {

      if (input == "back") {

        api.unsendMessage(Reply.messageID);

        const page1 = `
╔═════════════════════╗
      🎬 𝐕𝐈𝐃𝐄𝐎 𝐌𝐄𝐍𝐔 🎬
╚═════════════════════╝

╭─❍ 「 𝐏𝐀𝐆𝐄 𝟏 / 𝟐 」
│
│ ❶ 💞 𝐋𝐎𝐕𝐄 𝐕𝐈𝐃𝐄𝐎
│ ❷ 💕 𝐂𝐎𝐔𝐏𝐋𝐄 𝐕𝐈𝐃𝐄𝐎
│ ❸ 📽 𝐒𝐇𝐎𝐑𝐓 𝐕𝐈𝐃𝐄𝐎
│ ❹ 😔 𝐒𝐀𝐃 𝐕𝐈𝐃𝐄𝐎
│ ❺ 📝 𝐒𝐓𝐀𝐓𝐔𝐒 𝐕𝐈𝐃𝐄𝐎
│ ❻ ✍️ 𝐒𝐇𝐀𝐈𝐑𝐈 𝐕𝐈𝐃𝐄𝐎
│ ❼ 😻 𝐁𝐀𝐁𝐘 𝐕𝐈𝐃𝐄𝐎
│
╰───────────────❍

📩 Reply Number (1-7)
➡️ Type "next" for Page 2
`;

        return api.sendMessage(page1, event.threadID, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: "album",
            author: event.senderID,
            messageID: info.messageID,
            type: "page1"
          });
        });
      }

      if (["8","9","10","11","12","13"].includes(input)) {

        api.unsendMessage(Reply.messageID)

        api.setMessageReaction("😘", event.messageID, () => {}, true)

        return sendVideo(api, event, input);
      }

    }

  }
};


async function sendVideo(api, event, choice) {

  const options = {
    "1": "/video/love",
    "2": "/video/cpl",
    "3": "/video/shortvideo",
    "4": "/video/sadvideo",
    "5": "/video/status",
    "6": "/video/shairi",
    "7": "/video/baby",
    "8": "/video/anime",
    "9": "/video/humaiyun",
    "10": "/video/islam",
    "11": "/video/horny",
    "12": "/video/hot",
    "13": "/video/item"
  };

  try {

    const apiList = await axios.get(
      "https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json",
      { timeout: 5000 }
    );

    const base = apiList.data.api;

    const res = await axios.get(base + options[choice], { timeout: 5000 });

    const videoUrl = res.data.data;
    const caption = res.data.nayan;
    const total = res.data.count;

    const stream = await axios({
      url: videoUrl,
      method: "GET",
      responseType: "stream",
      timeout: 10000
    });

    api.sendMessage({
      body: `${caption}\n\n╭─❍ 𝐓𝐎𝐓𝐀𝐋 𝐕𝐈𝐃𝐄𝐎: ${total}`,
      attachment: stream.data
    }, event.threadID, null, event.messageID); // reply fix

  } catch (e) {
    api.sendMessage("❌ Video fetch failed!", event.threadID, null, event.messageID);
  }

}
