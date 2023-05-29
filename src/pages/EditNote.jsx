import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label, TextInput, Button, Textarea } from "flowbite-react";
import { supabase } from "../../supabase";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNoteData();
  }, []);

  const fetchNoteData = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error fetching note data:", error);
      } else {
        formik.setValues({
          title: data[0]?.title || "",
          content: data[0]?.content || "",
        });
      }
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
      try {
        const { data, error } = await supabase
          .from("notes")
          .update({ title, content })
          .eq("id", id);

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
    <div>
      <div className="p-5">
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
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

          <Button type="submit" className="btn-primary">
            Edit Note
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
