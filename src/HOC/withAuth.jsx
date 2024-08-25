import { UseAuthContext } from "@/context/AuthContext";

const withAuth = (Component) => {
  const HOC = (props) => {
    const { auth } = UseAuthContext();
    console.log("HOC props = ", props);
    if (!auth.isLogin) return <h1>Not Login</h1>;

    return <Component {...props} auth={auth} />;
    // return <Component {...props} />;
  };

  return HOC;
};

export default withAuth;
