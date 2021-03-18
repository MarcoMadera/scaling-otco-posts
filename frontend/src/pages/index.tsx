import NavBar from "../components/Navbar";
import UserProvider from "../context/UserContext";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

function Index() {
  const [{ data }] = usePostsQuery();
  return (
    <UserProvider>
      <NavBar />
      {data
        ? data.posts.map(({ id, title }) => {
            return <div key={id}>{title}</div>;
          })
        : null}
    </UserProvider>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
