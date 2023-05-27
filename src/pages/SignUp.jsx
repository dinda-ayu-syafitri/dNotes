import { React, useState } from "react";
import { Card, Label, TextInput, Alert, Button } from "flowbite-react";
import { supabase } from "../../supabase";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignUp() {
  const navigate = useNavigate();

  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Mohon isi nama lengkap dengan benar")
        .required("Nama lengkap harus diisi"),

      email: Yup.string()
        .email("Mohon isi email dengan benar")
        .required("Email harus diisi"),

      password: Yup.string()
        .min(8, "Password minimal 8 karakter")
        .required("Password harus diisi"),

      confirmPass: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password tidak sama"
      ),
    }),

    onSubmit: async (values) => {
      const { name, email, password } = values;
      try {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              name: name,
            },
          },
        });

        if (!error) {
          setIsSignUpSuccess(true);
          // navigate("/Login");
        }
      } catch (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-2 flex justify-center items-center">
        {isSignUpSuccess && (
          <div className="flex justify-center absolute w-full top-10">
            <Alert color="success">
              <span>
                <p>
                  <span className="font-medium">Sign Up Success! </span>
                  You can now login to your account,{" "}
                  <Link to={"/Login"} className="underline">
                    Login
                  </Link>
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
                  htmlFor="name"
                  value="Name"
                  color={formik.errors.name ? "failure" : ""}
                />
              </div>
              <TextInput
                id="name"
                placeholder="John Doe"
                required
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                color={formik.errors.name ? "failure" : ""}
                helperText={formik.errors.name}
              />
            </div>
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
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="confirmPass"
                  value="Confirm password"
                  color={formik.errors.confirmPass ? "failure" : ""}
                />
              </div>
              <TextInput
                id="confirmPass"
                required
                type="password"
                value={formik.values.confirmPass}
                onChange={formik.handleChange}
                color={formik.errors.confirmPass ? "failure" : ""}
                helperText={formik.errors.confirmPass}
              />
            </div>
            <Button type="submit">Sign Up</Button>
          </form>
          <div className="text-center">
            <span>
              Already have an account?{" "}
              <Link to={"/SignIn"}>
                <b>Sign In</b>
              </Link>
            </span>
          </div>
        </Card>
      </div>
      <div className="text-center col-span-3 flex justify-center items-center bg-sky-600 text-white flex-col">
        <h1>Welcome to dNotes !</h1>
        <p>Let's keep your notes organized !</p>
      </div>
    </div>
  );
}

export default SignUp;
