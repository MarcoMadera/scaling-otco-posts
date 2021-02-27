import NavBar from "../components/Navbar";
import UserProvider from "../context/UserContext";

export default function Index() {
  return (
    <UserProvider>
      <NavBar />
    </UserProvider>
  );
}
