import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner, Alert } from "flowbite-react";

function NoteDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    fetchNotesData();
  }, []);

  const fetchNotesData = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error fetching notes data:", error);
      } else {
        setNotes(data);
        if (data[0].status === "active") {
          setIsArchived(false);
        } else {
          setIsArchived(true);
        }
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error delete notes data:", error);
      } else {
        navigate("/notes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleArchive = async () => {
    try {
      if (isArchived) {
        const { data, error } = await supabase
          .from("notes")
          .update({ status: "active" })
          .eq("id", id);

        if (error) {
          console.error("Error archive notes data:", error);
        } else {
          navigate("/notes");
        }
      } else {
        const { data, error } = await supabase
          .from("notes")
          .update({ status: "archived" })
          .eq("id", id);
        if (error) {
          console.error("Error archive notes data:", error);
        } else {
          navigate("/archived");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Note Details for ID: {id}</h1>
      {notes.length > 0 ? (
        <>
          <h1>{notes[0].title}</h1>
          <p>{notes[0].content}</p>
        </>
      ) : (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      )}

      <div className="grid grid-cols-3 gap-10 my-5">
        <Link to={`/notes/edit/${id}`} className="w-full">
          {" "}
          <Button className="w-full">Edit</Button>
        </Link>
        <Button onClick={handleArchive}>
          {isArchived ? "Unarchive" : "Archive"}
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}

export default NoteDetails;
