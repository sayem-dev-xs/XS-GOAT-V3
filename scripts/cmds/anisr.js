const axios = require("axios")

const API_URL = "https://sayem-anisearch-apixs.onrender.com/anisr"
const memory = new Map()

async function stream(url) {
  const res = await axios({
    url,
    method: "GET",
    responseType: "stream",
    timeout: 20000
  })
  return res.data
}

async function fetchAnime(query) {
  try {
    const { data } = await axios.get(API_URL, {
      params: { q: query },
      timeout: 15000
    })

    if (!data || !data.status || !data.result)
      return null

    return [data.result]
  } catch {
    return null
  }
}

module.exports = {
  config: {
    name: "anisr",
    aliases: ["anisearch"],
    author: "S AY EM",
    version: "6.2",
    shortDescription: { en: "anime edit" },
    longDescription: { en: "random anime edit video" },
    category: "fun",
    guide: { en: "{p}{n} denji\nreply more" },
    onReply: true
  },

  onStart: async ({ api, event, args, commandName }) => {
    api.setMessageReaction("✨", event.messageID, () => {}, true)

    const query = args.join(" ").trim()
    if (!query) return

    memory.set(event.senderID, query)
    await send(api, event, query, commandName)
  },

  onReply: async ({ api, event, Reply }) => {
    if (event.senderID !== Reply.author) return

    const query = memory.get(event.senderID)
    if (!query) return

    await send(api, event, query, Reply.commandName)
  }
}

async function send(api, event, query, commandName) {
  try {
    const results = await fetchAnime(query)
    if (!results || results.length === 0) return

    const random = results[Math.floor(Math.random() * results.length)]
    if (!random.video) return

    const videoStream = await stream(random.video)

    api.sendMessage(
      { attachment: videoStream },
      event.threadID,
      (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            author: event.senderID
          })
        }
      },
      event.messageID
    )

  } catch {}
}
