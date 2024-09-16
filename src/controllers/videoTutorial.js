const fs = require('fs');
const path = require('path');

const videoTutorial = async (_, res) => {
  try {
    const videoPath = path.join("videos", "tutorial.mp4");

    if (!fs.existsSync(videoPath)) {
      return res.status(404).send("Vídeo não encontrado");
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Length": fileSize,
    });

    const videoStream = fs.createReadStream(videoPath);
    videoStream.pipe(res);
  } catch (error) {
    res.status(500).json({
      success: false,
      mensagem: "Erro ao gerar stream de vídeo.",
      error: error.message,
    });
  }
};

module.exports = {
  videoTutorial,
};
