const CadastroPlaca = require("../models/cadastroPlacaModels");
const { getOCR } = require("../api/ocr");
const fs = require("fs");

const cadastroPlaca = async (req, res) => {
  try {
    const {cidade} = req.body;

    // Verifique se o arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Nenhum arquivo foi enviado.",
      });
    }

    const filePath = req.file.path;
    

    if (!fs.existsSync(filePath)) {
      throw new Error(`O arquivo no caminho ${filePath} não existe.`);
    }

    // Realize a leitura OCR da placa
    const placaOCR = await getOCR(filePath);
    console.log(cidade)
    console.log(placaOCR)
    // Crie um novo documento no banco de dados com os dados da placa e o caminho da imagem
    const novaPlaca = new CadastroPlaca({
      nomeCidade: "crato-ce",
      placa: placaOCR,
      caminhoImagem: filePath,
    });

    await novaPlaca.save();

    // Retorne uma mensagem de sucesso
    res.status(200).json({
      success: true,
      message: "Dados cadastrados com sucesso!",
      data: novaPlaca,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao cadastrar os dados.",
      error: error.message,
    });
  }
};

module.exports = {
  cadastroPlaca,
};
