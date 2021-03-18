import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";

export default withUrqlClient(createUrqlClient)(function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const res = await login(values);
        if (res.data?.login.errors) {
          setErrors(toErrorMap(res.data.login.errors));
        } else if (res.data?.login.user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Wrapper variantSize="small">
            <Form>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="Username or Email"
              />
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              <Button
                type="submit"
                mt={4}
                isLoading={isSubmitting}
                colorScheme="blue"
                variant="outline"
              >
                Login
              </Button>
            </Form>
          </Wrapper>
        );
      }}
    </Formik>
  );
});
