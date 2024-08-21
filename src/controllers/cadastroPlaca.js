const CadastroPlaca = require("../models/cadastroPlacaModels");
const { getOCR } = require("../api/ocr");
const fs = require("fs");

const cadastroPlaca = async (req, res) => {
  try {
    const { cidade } = req.body;

    // Verifique se o arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Nenhum arquivo foi enviado.",
      });
    }

    if(!cidade){
      return res.status(400).json({
        success: false,
        message: "nome da cidade obrigatorio",
      });
    }

    const filePath = req.file.path;

    if (!fs.existsSync(filePath)) {
      throw new Error('O arquivo no caminho ${filePath} não existe.');
    }

    // Realize a leitura OCR da placa
    const placaOCR = await getOCR(filePath);

    // Verifique se a placa já está cadastrada
    const placaExistente = await CadastroPlaca.findOne({ placa: placaOCR, nomeCidade: cidade });

    console.log(placaExistente)
    if (placaExistente) {
      return res.status(409).json({
        success: false,
        message: "Essa placa já foi cadastrada nessa cidade!",
      });
    }

    const novaPlaca = new CadastroPlaca({
      nomeCidade: cidade,
      placa: placaOCR,
      caminhoImagem: filePath,
    });

    await novaPlaca.save();

    res.status(201).json({
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