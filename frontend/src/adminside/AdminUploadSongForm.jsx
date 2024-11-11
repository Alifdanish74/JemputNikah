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

  // Fetch songs on component mount
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
      toast.error("Both song name and file are required");
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

  // Delete song function
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
      toast.error("Error deleting song");
      console.error(error);
    }
  };

  return (
    <div className="w-full  mx-auto p-8 px-20 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Upload background song
      </h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="container space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Singer
          </label>
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
      <div className="m-10">
        <h3 className="text-2xl font-semibold mb-4">Available Songs</h3>
        <Table>
          <Table.Head>
            <Table.HeadCell>Singer</Table.HeadCell>
            <Table.HeadCell>Song Title</Table.HeadCell>
            <Table.HeadCell>Music URL</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {songs.map((song) => (
              <Table.Row
                key={song._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{song.singer}</Table.Cell>
                <Table.Cell>{song.songtitle}</Table.Cell>
                <Table.Cell>
                  <a
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    Listen
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="failure"
                    onClick={() => handleDelete(song._id)}
                    className="flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default SongUploadForm;
