import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import createUrqlClient from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

export default withUrqlClient(createUrqlClient)(function Register() {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({ options: values });
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Wrapper variantSize="small">
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="Email"
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
                Register
              </Button>
            </Box>
          </Form>
        </Wrapper>
      )}
    </Formik>
  );
});
