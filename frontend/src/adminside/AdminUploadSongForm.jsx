// SongUploadForm.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import { FaTrash, FaUpload } from "react-icons/fa";

function SongUploadForm() {
  const [singer, setSinger] = useState("");
  const [songtitle, setSongtitle] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("/api/songs");
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs", error);
      }
    };
    fetchSongs();
  }, []);

  const handleSongFileChange = (e) => {
    setSongFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!songtitle || !singer || !songFile) {
      toast.error("Both song name and file are required", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("singer", singer);
    formData.append("songtitle", songtitle);
    formData.append("file", songFile);

    try {
      const response = await axios.post("/api/songs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Song uploaded successfully!", {
          autoClose: 2000,
          position: "top-center",
          closeOnClick: true,
        });
        setSongs([...songs, response.data]); // Add the new song to the list
        setSinger("");
        setSongtitle("");
        setSongFile(null);
      }
    } catch (error) {
      toast.error("Error uploading song", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/songs/${id}`);
      setSongs(songs.filter((song) => song._id !== id));
      toast.error("Song deleted successfully!", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
    } catch (error) {
      toast.error("Error deleting song", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-blue-600">
        Upload Background Song
      </h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Singer</label>
          <TextInput
            type="text"
            value={singer}
            onChange={(e) => setSinger(e.target.value)}
            placeholder="Enter singer name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Song Title
          </label>
          <TextInput
            type="text"
            value={songtitle}
            onChange={(e) => setSongtitle(e.target.value)}
            placeholder="Enter song title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Upload Song File
          </label>
          <TextInput
            type="file"
            accept="audio/*"
            onChange={handleSongFileChange}
            required
          />
        </div>

        <Button type="submit" color="success" className="w-full mt-4">
          <FaUpload className="mr-2" /> Upload Song
        </Button>
      </form>

      {/* Song List Table */}
      <div className="mt-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          Available Songs
        </h3>
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <Table.Head className="bg-gray-100">
              <Table.HeadCell className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Singer
              </Table.HeadCell>
              <Table.HeadCell className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Song Title
              </Table.HeadCell>
              <Table.HeadCell className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Music URL
              </Table.HeadCell>
              <Table.HeadCell className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="bg-white divide-y divide-gray-200">
              {songs.map((song) => (
                <Table.Row
                  key={song._id}
                  className="text-xs sm:text-sm p-2 sm:p-4 flex flex-col sm:table-row border-b border-gray-200"
                >
                  <Table.Cell className="whitespace-nowrap py-2 px-3 text-sm sm:text-base">
                    {song.singer}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap py-2 px-3 text-sm sm:text-base">
                    {song.songtitle}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap py-2 px-3 text-sm sm:text-base">
                    <a
                      href={song.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Listen
                    </a>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap py-2 px-3 text-sm sm:text-base flex sm:table-cell">
                    <Button
                      color="failure"
                      onClick={() => handleDelete(song._id)}
                      className="flex items-center mx-auto sm:mx-0"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default SongUploadForm;
