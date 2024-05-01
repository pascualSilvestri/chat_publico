import Message from "./Message.model";




// Sincronizar las tablas
const models = [
  Message
];

// Sincroniza todos los modelos
Promise.all(models.map((model) => model.sync({ alter: true })))
  .then(() => {
    console.log("Base de datos sincronizada.");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });


