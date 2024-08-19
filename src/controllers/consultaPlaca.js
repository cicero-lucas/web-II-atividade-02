const CadastroPlaca = require("../models/cadastroPlacaModels");

const consultaPlaca = async (req, res) => {
  try {
    const { placa } = req.params;

    // Procurar placa no banco de dados
    let registro = await CadastroPlaca.find({ placa: placa });
    console.log (registro)

    const dados = () => Object.values(registro).map((el,index) => {
      res.status(200).json({
        el
      });
    })

    if (registro.length>=1) {
      // Retorna os detalhes da placa se encontrada
    dados()
    } else {
      // Informa que a placa não foi encontrada
      res.status(404).json({ mensagem: 'Placa não encontrada!' });
    }
  } catch (error) {
    res.status(500).send('Erro ao consultar placa.');
  }
};

module.exports = { 
    consultaPlaca,
 };
