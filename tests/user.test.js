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

  describe("POST /cadastro", () => {
    it("deve retornar 201 e cadastrar o usuário", async () => {
      const response = await request(server)
        .post('/cadastro')
        .send({
            
                "nome": "ralf",
                "email": "ralf@email",
                "senha": "123",
                "confirmsenha": "123"
              
        })
        .expect(201);

      expect(response.body).toHaveProperty('mensagem', 'Usuário cadastrado com sucesso!');
    });

    it("deve retornar 422 se os dados estiverem incompletos", async () => {
      const response = await request(server)
        .post('/cadastro')
        .send({
          nome: "Teste"
        })
        .expect(422);

      expect(response.body).toHaveProperty('mensagem', 'Dados incompletos');
    });
  });

  describe("POST /login", () => {
    it("deve retornar 200 e o token de autenticação", async () => {
      const response = await request(server)
        .post('/login')
        .send({
          email: "ralf@email",
          senha: "senha123"
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it("deve retornar 404 se o usuário não for encontrado", async () => {
      const response = await request(server)
        .post('/login')
        .send({
          email: "naoexiste@example.com",
          senha: "senha123"
        })
        .expect(404);

      expect(response.body).toHaveProperty('msg', 'usuário não cadastrado, faça o cadastro!');
    });

    it("deve retornar 422 se a senha estiver incorreta", async () => {
      const response = await request(server)
        .post('/login')
        .send({
          email: "teste@example.com",
          senha: "senhaerrada"
        })
        .expect(422);

      expect(response.body).toHaveProperty('msg', 'senha inválida !');
    });
  });
});
