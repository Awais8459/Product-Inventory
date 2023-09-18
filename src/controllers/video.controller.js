// controllers/videoController.js

const videoService = require('../services/video.service');

// Download video and save it to a folder
async function downloadVideo(req, res) {
  const { videoUrl } = req.body;

  try {
    const destinationPath = './downloads'; // Specify the folder where you want to save the video
    const videoFilePath = await videoService.downloadAndSaveVideo(videoUrl, destinationPath);

    res.status(200).json({ message: 'Video downloaded and saved successfully', videoFilePath });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error downloading the video');
  }
}

module.exports = {
  downloadVideo,
};
