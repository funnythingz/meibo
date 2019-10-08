import admin from "firebase-admin"

import serviceAccount from "../meibo-8e247-firebase-adminsdk-eo8py-5a62552509.json"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://meibo-8e247.firebaseio.com"
});
