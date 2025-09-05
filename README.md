# Keycloaksetup

https://chatgpt.com/s/t_68baaff2fa1481918e9e7c24dcc6a017


Perfect 👍 Let me give you a **complete step-by-step flow** from scratch (Keycloak + React + Protecting routes).

---

# 🚀 Step-by-Step Guide: Keycloak + React

---

## 1️⃣ Run Keycloak with Docker (with persistent storage)

Open PowerShell/Terminal:

```powershell
docker run -d --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  -v keycloak_data:/opt/keycloak/data \
  quay.io/keycloak/keycloak:latest start-dev
```

* Runs Keycloak on `http://localhost:8080`
* Admin credentials → `admin / admin`
* Data persisted in `keycloak_data` volume

---

## 2️⃣ Setup Realm, Client, and User in Keycloak

1. Open [http://localhost:8080](http://localhost:8080)
   Login with `admin / admin`.

2. **Create a Realm** (e.g. `myrealm`)

3. **Create a Client** (for React app):

   * Go to **Clients → Create**
   * Client ID → `react-client`
   * Client type → `OpenID Connect`
   * Root URL → `http://localhost:3000`
   * Valid redirect URIs → `http://localhost:3000/*`
   * Web origins → `http://localhost:3000`

   👉 Save.

4. **Create a User**:

   * Go to **Users → Add User**
   * Username → `testuser`
   * Set a password in **Credentials** (disable "Temporary").

✅ Now Keycloak is ready.

---

## 3️⃣ Setup React App

### Install dependencies

In your React app folder:

```bash
npm install @react-keycloak/web keycloak-js react-router-dom
```

---

## 4️⃣ Configure Keycloak in React

Create `keycloak.js`:

```javascript
// src/keycloak.js
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",   // Keycloak URL
  realm: "myrealm",               // Your realm name
  clientId: "react-client",       // Your client ID
});

export default keycloak;
```

---

## 5️⃣ Wrap App with KeycloakProvider

```javascript
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <App />
  </ReactKeycloakProvider>
);
```

---

## 6️⃣ Create ProtectedRoute component

```javascript
// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const ProtectedRoute = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return keycloak?.authenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
```

---

## 7️⃣ Define Routes in App

```javascript
// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import ProtectedRoute from "./ProtectedRoute";

const Home = () => <h2>Public Home Page</h2>;
const About = () => <h2>Protected About Page</h2>;
const Contact = () => <h2>Protected Contact Page</h2>;

function App() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) return <div>Loading...</div>;

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link> |{" "}
        {!keycloak.authenticated ? (
          <button onClick={() => keycloak.login()}>Login</button>
        ) : (
          <button onClick={() => keycloak.logout()}>Logout</button>
        )}
      </nav>

      <Routes>
        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## 🔄 How it works

* `/` → **public** (anyone can view)
* `/about` & `/contact` → **protected** (if not logged in → redirect to `/`)
* Login/logout → handled by **Keycloak**
* After login, Keycloak redirects back to your React app with tokens.

---

👉 That’s the **full setup from scratch**.

Do you also want me to extend this so certain routes (like `/about`) are only accessible by users with a **specific role** (e.g., `admin`), not just any logged-in user?
