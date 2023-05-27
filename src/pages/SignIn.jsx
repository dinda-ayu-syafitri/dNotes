import { React, useState } from "react";
import { Card, Label, TextInput, Alert, Button } from "flowbite-react";
import { supabase } from "../../supabase";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignIn() {
  const navigate = useNavigate();

  const [isSignInError, setIsSignInError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Mohon isi email dengan benar")
        .required("Email harus diisi"),

      password: Yup.string()
        .min(8, "Password minimal 8 karakter")
        .required("Password harus diisi"),
    }),

    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (!error) {
          navigate("/");
        } else {
          throw new Error(error.message);
        }
      } catch (error) {
        setIsSignInError(true);
        console.log(error);
      }
    },
  });

  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-2 flex justify-center items-center">
        {isSignInError && (
          <div className="flex justify-center absolute w-full top-10">
            <Alert color="failure">
              <span>
                <p>
                  <span className="font-medium">Sign In Failed! </span>
                  Email or Password false
                </p>
              </span>
            </Alert>
          </div>
        )}
        <Card className="w-3/4">
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Email"
                  color={formik.errors.email ? "failure" : ""}
                />
              </div>
              <TextInput
                id="email"
                placeholder="name@flowbite.com"
                required
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                color={formik.errors.email ? "failure" : ""}
                helperText={formik.errors.email}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value="Password"
                  color={formik.errors.password ? "failure" : ""}
                />
              </div>
              <TextInput
                id="password"
                required
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                color={formik.errors.password ? "failure" : ""}
                helperText={formik.errors.password}
              />
            </div>
            <Button type="submit">Sign In</Button>
          </form>
          <div className="text-center">
            <span>
              Don't have an account?{" "}
              <Link to={"/SignUp"}>
                <b>Sign Up</b>
              </Link>
            </span>
          </div>
        </Card>
      </div>
      <div className="text-center col-span-3 flex justify-center items-center bg-sky-600 text-white flex-col">
        <h1>Welcome Back to dNotes !</h1>
        <p>Let's keep your notes organized !</p>
      </div>
    </div>
  );
}

export default SignIn;
