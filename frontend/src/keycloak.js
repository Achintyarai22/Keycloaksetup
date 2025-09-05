// src/keycloak.js
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",  // Keycloak server
  realm: "myrealm",              // Your Realm
  clientId: "react-app",         // Your Client
});

export default keycloak;
