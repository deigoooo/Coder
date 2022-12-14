const admin = require("firebase-admin");

const serviceAccount = require("../proyectofinal.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


(async () => {
    
})();