import mongoose from "mongoose";

mongoose
  .connect("mongodb://root:devRoot@localhost:27017/")
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });
