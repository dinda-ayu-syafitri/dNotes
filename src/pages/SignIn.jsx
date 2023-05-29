import { React, useState } from "react";
import { Card, Label, TextInput, Alert, Button } from "flowbite-react";
import { supabase } from "../../supabase";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Lottie from "react-lottie";
import animationData from "../animations/notes.json";

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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 sm:h-screen bg-[#fdfcf6]">
      <div className="col-span-2 flex justify-center items-center -order-first sm:order-first py-12">
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
        <div className="w-3/4">
          <h1 className="mb-6 text-3xl font-bold text-[#c29824]">Sign In</h1>

          <Card className="">
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
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
              {/* <PrimaryButton></PrimaryButton> */}
              <Button type="submit" className="btn-primary">
                Sign In
              </Button>
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
      </div>
      <div className="text-center col-span-1 sm:col-span-3 flex justify-center items-center bg-[#4d4732] text-white flex-col py-5">
        <Lottie
          options={defaultOptions}
          height={200}
          width={200}
          className="-mt-12"
        />
        <h2 className="text-2xl sm:text-3xl font-bold -mt-10 sm:m-0">
          Welcome Back to dNotes !
        </h2>
        <p>Let's keep your notes organized !</p>
      </div>
    </div>
  );
}

export default SignIn;
