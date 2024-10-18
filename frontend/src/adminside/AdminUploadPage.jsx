// import React from 'react';
import { useContext } from 'react';
import AdminUploadForm from './AdminUploadForm';
import { UserContext } from '../customhooks/UserContext';
import { Navigate } from 'react-router-dom';

function AdminUploadPage() {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <AdminUploadForm />
    </div>
  );
}

export default AdminUploadPage;
