const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

async function downloadVideo(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL parameter is missing.' });
    }

    const downloadStream = ytdl(url, { format: 'mp4' });
    const filePath = path.join(process.cwd(), 'downloads', 'Video.mp4');

    const writeStream = fs.createWriteStream(filePath);

    downloadStream.pipe(writeStream);

    downloadStream.on('end', () => {
      console.log('Video downloaded successfully.');
      // res.sendFile(filePath);
      res.status(200).json({ message: 'Video downloaded successfully.' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}

module.exports = {
  downloadVideo,
};
