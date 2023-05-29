import { React, useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";

function Home() {
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
      fetchNotes(userData.id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotes = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching notes data:", error);
      } else {
        setNotes(data);
        console.log(notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PageHeading title="Dashboard" />
      <h1 className="text-xl">
        Welcome, {user?.user_metadata?.name?.split(" ")[0]} !
      </h1>
      <Link to={"/add-notes"}>
        <div className="flex flex-row gap-4 p-5 shadow-md rounded-md bg-[#4d4732] hover:bg-[#6d6548] my-5">
          <div>
            <h5 className="text-3xl font-bold tracking-tight text-white dark:text-white">
              <BsPlusCircle />
            </h5>
          </div>
          <div>
            <p className="font-normal text-xl text-white dark:text-gray-400">
              Add New Notes
            </p>
          </div>
        </div>
      </Link>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-4 p-5 shadow-md rounded-md bg-[#c29824] hover:bg-[#e3b63b] ">
          <div>
            <h5 className="text-xl tracking-tight text-white dark:text-white">
              Active Notes
            </h5>
          </div>
          <div>
            <p className="font-bold text-3xl text-white dark:text-gray-400">
              {notes.filter((note) => note.status === "active").length}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-5 shadow-md rounded-md bg-[#c29824] hover:bg-[#e3b63b] ">
          <div>
            <h5 className="text-xl tracking-tight text-white dark:text-white">
              Archived Notes
            </h5>
          </div>
          <div>
            <p className="font-bold text-3xl text-white dark:text-gray-400">
              {notes.filter((note) => note.status === "archived").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
