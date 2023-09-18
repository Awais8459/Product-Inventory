const ytdl = require('ytdl-core');
const { getYoutubeVideoInfo } = require('../services/video.service');

const checkDownload = async (req, res) => {
  try {
    const { URL } = req.query;
    if (!URL) {
      return res.status(400).json({ error: 'URL parameter is missing' });
    }
    const { title, author } = await getYoutubeVideoInfo(URL);
    res.json({
      status: true,
      title,
      author,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const downloadVideo = async (req, res) => {
  try {
    const { URL, downloadFormat, quality, title } = req.query;
    if (!URL || !downloadFormat || !quality) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const filename = downloadFormat === 'audio-only' ? `${title.substring(0, 40)}.mp3` : `${title.substring(0, 25)}.mp4`;
    const disposition = `attachment; filename="${filename}"`;

    res.header('Content-Disposition', disposition);

    const format = downloadFormat === 'video-only' ? 'videoonly' : 'audioandvideo';
    const videoQuality = quality === 'high' ? 'highestvideo' : 'lowestvideo';

    ytdl(URL, { filter: format, quality: videoQuality }).pipe(res);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  checkDownload,
  downloadVideo,
};
