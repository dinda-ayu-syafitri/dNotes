import { Label, TextInput, Button, Textarea } from "flowbite-react";
import { React, useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddNotes() {
  const navigate = useNavigate();
  const [user, setUserData] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const session = await supabase.auth.getSession();
      const userData = session.data.session.user;

      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title must be filled"),

      content: Yup.string().required("Notes content must be filled"),
    }),

    onSubmit: async (values) => {
      const { title, content } = values;
      console.log(user.id);
      try {
        const { data, error } = await supabase.from("notes").insert([
          {
            user_id: user.id,
            title: title,
            content: content,
            status: "active",
          },
        ]);

        if (!error) {
          navigate("/");
        } else {
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="p-5">
      <form className="flex flex-col gap-4" onClick={formik.handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="title"
              value="Notes Title"
              color={formik.errors.title ? "failure" : ""}
            />
          </div>
          <TextInput
            id="title"
            placeholder="Notes Title"
            required
            shadow
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            color={formik.errors.title ? "failure" : ""}
            helperText={formik.errors.title}
          />
        </div>

        <div id="textarea">
          <div className="mb-2 block">
            <Label
              htmlFor="content"
              value="Notes"
              color={formik.errors.content ? "failure" : ""}
            />
          </div>
          <Textarea
            id="content"
            placeholder="Write your notes here ..."
            required
            rows={4}
            value={formik.values.content}
            onChange={formik.handleChange}
            color={formik.errors.content ? "failure" : ""}
            helperText={formik.errors.content}
          />
        </div>

        <Button type="submit">Create Note</Button>
      </form>
    </div>
  );
}

export default AddNotes;
