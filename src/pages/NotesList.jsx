import { Card, Button, Spinner } from "flowbite-react";
import { React, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";

function NotesList() {
  const [user, setUserData] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const session = await supabase.auth.getSession();
      const userData = session.data.session.user;

      setUserData(userData);
      fetchNotesData(userData.id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotesData = async (userID) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userID);

      if (error) {
        console.error("Error fetching notes data:", error);
      } else {
        setNotes(data.filter((note) => note.status === "active"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PageHeading title="Your Notes" />
      {notes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <>
            {notes.map((note, index) => {
              return (
                <Card key={index} className="">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {note.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {note.content.split(/\s+/).slice(0, 10).join(" ")} ...
                  </p>
                  <Link to={`/notes/${note.id}`}>
                    <Button className="btn-primary">
                      <p>Read more</p>
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </>
        </div>
      ) : (
        <div className="text-center flex justify-center items-center h-screen">
          <h1 className="text-xl">Tidak ada notes</h1>

          {/* <Spinner
            aria-label="Center-aligned spinner example"
            size="xl"
            color="warning"
          /> */}
        </div>
      )}
    </div>
  );
}

export default NotesList;
