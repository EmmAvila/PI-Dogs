const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  // defino el modelo
  sequelize.define('Race', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    creadoPorEmmanuel: {
      type: DataTypes.STRING,
      defaultValue: 'Emmanuel',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    weight_min: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lifeSpan: {
      type: DataTypes.STRING,
      allowNull: false,
      get(){
        return this.getDataValue('lifeSpan') + ' years'
      }
    }, 
    image :{
      type: DataTypes.STRING,
      allowNull: true,
    },

  },
  {
    timestamps : false,
    cratedAt: false,
    updatedAt: false,
  });
};
