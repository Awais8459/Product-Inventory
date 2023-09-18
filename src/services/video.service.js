const ytdl = require('ytdl-core')
const getYoutubeVideoInfo = async (URL) => {
  try {
    const {
      player_response: {
        videoDetails: { title, author },
      },
    } = await ytdl.getBasicInfo(URL);
    return { title, author };
  } catch (e) {
    throw e;
  }
};
module.exports = {
    getYoutubeVideoInfo
}