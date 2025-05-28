import { GoogleOAuthProvider } from "@react-oauth/google";

import Messenger from "./components/Messenger";
import AccountProvider from "./context/AccountProvider";

function App() {
  const clientId =
    "326323254173-1r55p7gqo37git71mmue24lq0t0v39k9.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider >
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
