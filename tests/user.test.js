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
