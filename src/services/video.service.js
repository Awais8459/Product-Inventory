const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Download and save video function
async function downloadAndSaveVideo(videoUrl, destinationPath) {
  try {
    const response = await axios.get(videoUrl, { responseType: 'stream' });
    const videoFilePath = path.join(destinationPath, 'downloaded_video.mp4'); // Change the filename as needed
    const videoFileWriteStream = fs.createWriteStream(videoFilePath);

    response.data.pipe(videoFileWriteStream);

    return new Promise((resolve, reject) => {
      videoFileWriteStream.on('finish', () => resolve(videoFilePath));
      videoFileWriteStream.on('error', reject);
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error downloading the video');
  }
}

module.exports = {
  downloadAndSaveVideo,
};
