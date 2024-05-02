import Message from "./Message.model";
import User from "./User.model";

User.hasMany(Message,{ as: 'messages', foreignKey: 'userId' } );

Message.belongsTo(User, { as: 'user', foreignKey: 'userId' } );


// Sincronizar las tablas
const models = [
  User,
  Message,
];

// Sincroniza todos los modelos
Promise.all(models.map((model) => model.sync({ alter: true })))
  .then(() => {
    console.log("Base de datos sincronizada.");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });


