import { React, useState } from "react";
import { Card, Label, TextInput, Alert, Button } from "flowbite-react";
import { supabase } from "../../supabase";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Lottie from "react-lottie";
import animationData from "../animations/notes.json";

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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 h-screen bg-[#fdfcf6]">
      <div className="col-span-2 flex justify-center items-center -order-first sm:order-first">
        {isSignUpSuccess && (
          <div className="flex justify-center absolute w-full top-10">
            <Alert color="success">
              <span>
                <p>
                  <span className="font-medium">Sign Up Success! </span>
                  You can now login to your account,{" "}
                  <Link to={"/signin"} className="underline">
                    Login
                  </Link>
                </p>
              </span>
            </Alert>
          </div>
        )}
        <div className="w-3/4 my-10">
          <h1 className="mb-6 text-3xl font-bold text-[#c29824]">Sign Up</h1>
          <Card>
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
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
                  placeholder="name@mail.com"
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
              <Button type="submit" className="btn-primary">
                Sign Up
              </Button>
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
      </div>
      <div className="text-center col-span-1 sm:col-span-3 flex justify-center items-center bg-[#4d4732] text-white flex-col py-5">
        <Lottie options={defaultOptions} height={200} width={200} />
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome to dNotes !</h1>
        <p>Let's keep your notes organized !</p>
      </div>
    </div>
  );
}

export default SignUp;
