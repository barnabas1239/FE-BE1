const { models } = require('../db');
const { User } = models;

const authenticateToken = async (req, res, next) => {
  // 1. Token kiolvasása a 'Authorization' fejrészből
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formátum: "Bearer TOKEN"

  if (token == null) {
    return res.status(401).json({ message: 'Hiányzó authentikációs token.' }); // Unauthorized
  }

  try {
    // 2. Felhasználó keresése a token alapján
    const user = await User.findOne({ where: { token: token } });

    if (!user) {
      return res.status(403).json({ message: 'Érvénytelen token.' }); // Forbidden
    }

    // 3. Token érvényességének (lejáratának) ellenőrzése
    if (new Date() > new Date(user.token_valid_until)) {
      return res.status(401).json({ message: 'A token lejárt.' }); // Unauthorized
    }

    req.user = user; // A felhasználói adatokat a kérés objektumhoz csatoljuk
    next(); // Továbbengedjük a kérést a következő middleware-re vagy a controllerre
  } catch (error) {
    console.error('Hiba a token validálása során:', error);
    res.status(500).json({ message: 'Szerveroldali hiba a token validálása során.' });
  }
};

module.exports = authenticateToken;