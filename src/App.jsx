import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SidebarApp from "./components/Sidebar";
import AddNotes from "./pages/AddNotes";
import NotesList from "./pages/NotesList";
import ArchivedNotes from "./pages/ArchivedNotes";
import NoteDetails from "./pages/NoteDetails";
import EditNote from "./pages/EditNote";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SidebarApp />}>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route exact path="/add-notes" element={<ProtectedRoute />}>
          <Route path="/add-notes" element={<AddNotes />} />
        </Route>
        <Route exact path="/notes" element={<ProtectedRoute />}>
          <Route path="/notes" element={<NotesList />} />
        </Route>
        <Route exact path="/archived" element={<ProtectedRoute />}>
          <Route path="/archived" element={<ArchivedNotes />} />
        </Route>
        <Route exact path="/notes/:id" element={<ProtectedRoute />}>
          <Route path="/notes/:id" element={<NoteDetails />} />
        </Route>
        <Route exact path="/notes/edit/:id" element={<ProtectedRoute />}>
          <Route path="/notes/edit/:id" element={<EditNote />} />
        </Route>

        {/* <Route index element={<Home />} />
        <Route path="/add-notes" element={<AddNotes />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="/archived" element={<ArchivedNotes />} />
        <Route path="/notes/:id" element={<NoteDetails />} />
        <Route path="/notes/edit/:id" element={<EditNote />} /> */}
      </Route>
      <Route path="SignUp" element={<SignUp />} />
      <Route path="SignIn" element={<SignIn />} />
    </>
  )
);

function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
