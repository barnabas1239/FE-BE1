module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true, // Lehet null, amíg a user be nem jelentkezik
      },
      token_valid_until: {
        type: DataTypes.DATE,
        allowNull: true, // Lehet null, amíg a user be nem jelentkezik
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Alapértelmezetten nem admin
      },
    }, {
      // Model opciók
      timestamps: false, // Kikapcsoljuk az időbélyegeket, hogy elkerüljük a hibát
    });
  
    return User;
  };
  