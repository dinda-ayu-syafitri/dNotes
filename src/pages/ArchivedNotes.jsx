import { Card, Button } from "flowbite-react";
import { React, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Link } from "react-router-dom";

function ArchivedNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotesData();
  }, []);

  const fetchNotesData = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("status", "archived");

      if (error) {
        console.error("Error fetching notes data:", error);
      } else {
        setNotes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-4 gap-5">
      {notes.map((note, index) => {
        return (
          <Card key={index}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {note.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {note.content.split(/\s+/).slice(0, 10).join(" ")} ...
            </p>
            <Link to={`/notes/${note.id}`}>
              <Button>
                <p>Read more</p>
              </Button>
            </Link>
          </Card>
        );
      })}
    </div>
  );
}

export default ArchivedNotes;
