import { useKeycloak } from "@react-keycloak/web";

function Home() {
  const { keycloak } = useKeycloak();

  return (
    <div>
      <h1>Home</h1>
      {!keycloak.authenticated ? (
        <button onClick={() => keycloak.login()}>Login</button>
      ) : (
        <button onClick={() => keycloak.logout()}>Logout</button>
      )}
    </div>
  );
}

export default Home;
