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

  describe("GET /relatorio/cidade/:cidade", () => {
    it("deve retornar 200 e o relatório da cidade", async () => {
      const cidade = "Crato";
      const response = await request(server)
        .get(`/relatorio/cidade/${cidade}`)
        .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTQ2MmY5MjgyNWQ3YjdiNzMxYjBhMyIsImlhdCI6MTcyNzA4OTM1Mn0.Xg-rHmPW37ABF1CroH9oCMsa01lwiUTnNaQbrPJufGM",) 
        .expect(200);

      expect(response.body).toHaveProperty('relatorio');
    });

    it("deve retornar 401 se o token não for fornecido", async () => {
      const cidade = "São Paulo";
      const response = await request(server)
        .get(`/relatorio/cidade/${cidade}`)
        .expect(401);

      expect(response.body.message).toBe('Token não fornecido');
    });
  });
});