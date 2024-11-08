// import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../customhooks/UserContext';
import { Navigate } from 'react-router-dom';
import SongUploadForm from './AdminUploadSongForm';

function AdminUploadSong() {
  const { ready, user } = useContext(UserContext);
  // const [redirect, setRedirect] = useState(null);

  console.log("test user " + user);
  console.log("test ready " + ready)
  

  if (!ready) {
    return "Loading";
  }

  if (ready && !user || !user?.isAdmin) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <SongUploadForm />
    </div>
  );
}

export default AdminUploadSong;
