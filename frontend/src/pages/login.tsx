import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async ({ username, password }, { setErrors }) => {
        const res = await login({ username, password });
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
                name="username"
                placeholder="username"
                label="Username"
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
}
