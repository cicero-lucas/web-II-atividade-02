const { getOCR } = require("../api/ocr");
const fs = require("fs");

const cadastroPlaca = async (req, res) => {
  try {
    console.log(req);
    const { cidade } = req.body;

    const filePath = req.file.path;

    if (!fs.existsSync(filePath)) {
      throw new Error(`O arquivo no caminho ${filePath} não existe.`);
    }
    const placaOCR = await getOCR(filePath);

    res
      .status(200)
      .json({
        cidade,
        placa: placaOCR,
        data: new Date().toLocaleString("pt-BR", {
          timeZone: "America/Fortaleza",
        }),
      });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  cadastroPlaca,
};
