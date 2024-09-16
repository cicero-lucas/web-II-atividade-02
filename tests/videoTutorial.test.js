const request = require("supertest");
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
let server;

describe("POST /videoTutorial", () => {
  beforeAll(() => {
    server = require('../src/server');
  });

  // Após todos os testes, fecha o servidor e a conexão do MongoDB
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it("deve retornar 200 e transmitir o vídeo", async () => {
    const videoPath = path.join("videos", "tutorial.mp4");

    if (!fs.existsSync(videoPath)) {
      throw new Error("Vídeo não encontrado");
    }

    const response = await request(server)
      .post("/videoTutorial")
      .expect("Content-Type", /video\/mp4/)
      .expect(200);

    const stat = fs.statSync(videoPath);
    expect(response.header["content-length"]).toBe(String(stat.size));
  });

  it("deve retornar 404 se o vídeo não for encontrado", async () => {
    const videoPath = path.join("videos", "tutorial.mp4");
    const tempVideoPath = path.join("videos", "tutorial_temp.mp4");

    if (fs.existsSync(videoPath)) {
      fs.renameSync(videoPath, tempVideoPath);
    }

    const response = await request(server).post("/videoTutorial").expect(404);

    expect(response.text).toBe("Vídeo não encontrado");

    if (fs.existsSync(tempVideoPath)) {
      fs.renameSync(tempVideoPath, videoPath);
    }
  });
});
