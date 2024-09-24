const request = require("supertest");
const mongoose = require('mongoose');
let server;

describe("API Routes", () => {
  beforeAll(() => {
    server = require('../src/server');
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  
  describe("POST /cadastroPlaca", () => {
    it("deve retornar 200 e cadastrar a placa", async () => {
      const response = await request(server)
        .post('/cadastroPlaca')
        .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTQ2MmY5MjgyNWQ3YjdiNzMxYjBhMyIsImlhdCI6MTcyNzA4OTM1Mn0.Xg-rHmPW37ABF1CroH9oCMsa01lwiUTnNaQbrPJufGM",) 
        .attach('placa', './uploads/img.png') 
        .expect(200);

      expect(response.body).toHaveProperty('mensagem', 'Placa cadastrada com sucesso!');
    });

    it("deve retornar 401 se o token não for fornecido", async () => {
      const response = await request(server)
        .post('/cadastroPlaca')
        .attach('placa', './uploads/img.png') // Substitua pelo caminho real do arquivo
        .expect(401);

      expect(response.body.message).toBe('Token não fornecido');
    });
  });
});