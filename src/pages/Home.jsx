import { React, useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

function Home() {
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

  return (
    <div>
      <h1>Welcome, {user?.user_metadata?.name} !</h1>
      <Link to={"/add-notes"}>
        <div className="flex flex-row gap-4 p-5 shadow-md rounded-md hover:bg-slate-100">
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <BsPlusCircle />
            </h5>
          </div>
          <div>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Add New Notes
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Home;
