const isAdmin = (req, res, next) => {
    // Fontos: Ennek a middleware-nek az 'authenticateToken' után kell lefutnia.
    // Ellenőrzi, hogy a hitelesített felhasználó admin-e.
    if (req.user && req.user.isAdmin) {
      return next(); // A felhasználó admin, továbbengedjük a kérést.
    }
  
    return res.status(403).json({ message: 'Hozzáférés megtagadva. Adminisztrátori jogosultság szükséges.' });
  };
  
  module.exports = isAdmin;