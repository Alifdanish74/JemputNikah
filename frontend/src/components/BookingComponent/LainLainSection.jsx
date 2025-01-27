/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import ReactAudioPlayer from "react-audio-player";
// import { FileInput, Label } from "flowbite-react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function LainLainSection({
  onPrevious,
  formData,
  handleFormDataChange,
  submit,
  errors,
  isEditMode,
}) {
  const [songs, setSongs] = useState([]);
  const [selectedSongUrl, setSelectedSongUrl] = useState(
    isEditMode ? formData.bgSong : ""
  );
  const doaOptions = {
    doa1: "Ya Allah, berkatilah majlis perkahwinan ini, limpahkan baraqah dan rahmat\nkepada kedua mempelai ini. Kurniakanlah mereka zuriat yang soleh dan solehah.\nKekalkanlah jodoh mereka di dunia dan di akhirat dan sempurnakanlah agama mereka dengan berkat ikatan ini.",
    doa2: "Ya Allah, berkatilah satukanlah hati kedua pasangan mempelai ini dengan iman,\nkeyakinan dan tawakal kepadaMu. Panjangkan umur mereka, lapangkanlah rezeki mereka,\ndekatlah mereka menuju kebaikan, jauhkanlah mereka dari keburukan. Kurniakanlah mereka zuriat yang soleh dan solehah.",
    doa3: "Ya Allah, jadikanlah majlis ini majlis yang mendapat keberkatan dan keredhaanMu.\nKekalkanlah ikatan perkahwinan mereka sepanjang hayat, tetapkanlah kasih sayang antara mereka\nselagi tidak melebihi kasih padaMu.",
    doa4: "Ya Allah, kami memohon doa restumu, berkatilah majlis perkahwinan ini, berjalan\nsempurna seperti mana yang Engkau kehendaki. Semoga jodoh perkahwinan ini akan berkekalan\nbuat selama-lamanya hingga ke akhir hayat.",
  };
  // Initialize doa text based on edit mode
  // Initialize doa text and update formData if not already set
  const [doaText, setDoaText] = useState(() => {
    const initialDoa =
      isEditMode && formData.doa ? formData.doa : doaOptions.doa1;
    if (!formData.doa) {
      handleFormDataChange("doa", initialDoa);
    }
    return initialDoa;
  });

  const handleSelectChange = (e) => {
    const selectedDoa = e.target.value;
    const selectedDoaText = doaOptions[selectedDoa] || doaOptions.doa1;
    setDoaText(selectedDoaText); // Set the displayed doa text
    handleFormDataChange("doa", selectedDoaText); // Store the selected doa in formData
  };

  const handleTextChange = (e) => {
    const inputText = e.target.value.slice(0, 350); // Limit to 350 characters
    setDoaText(inputText);
    handleFormDataChange("doa", inputText); // Store updated doa text in formData
  };

  console.log("Is Edit Mode in LainLain Section:", isEditMode);

  useEffect(() => {
    // Fetch the list of songs from the backend
    const fetchSongs = async () => {
      try {
        const response = await axios.get("/api/songs");
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  // Pre-select the song if in edit mode
  useEffect(() => {
    if (isEditMode && formData.bgSong) {
      setSelectedSongUrl(formData.bgSong);
    }
  }, [isEditMode, formData.bgSong]);

  const handleSongChange = (event) => {
    const songId = event.target.value;
    const song = songs.find((song) => song._id === songId);
    handleFormDataChange("bgSong", song ? song.url : "");
    handleFormDataChange(
      "bgSongTitle",
      song ? `${song.singer} - ${song.songtitle}` : ""
    );
    handleFormDataChange("bgSongId", songId); // Store the song ID in formData
    setSelectedSongUrl(song ? song.url : "");
  };

  return (
    <div className="my-8">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leading-tight ">
        Lain Lain Maklumat
      </h1>
      <form action="#">
        <div className="grid gap-5 my-6">
          {/* Musik background */}
          <div>
            <label
              htmlFor="bgmusic"
              className=" mb-2 text-sm font-medium text-gray-900 "
            >
              Musik Latar Belakang
            </label>
            <AudioPlayer
              className="w-full my-4"
              src={selectedSongUrl}
              autoplay={false}
              // controls
            />
          </div>

          {/* Background lagu */}
          <div>
            <select
              id="lagu"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.bgSongId || ""}
              onChange={handleSongChange}
            >
              <option value="">- Pilih musik latar belakang -</option>
              {songs.map((song) => (
                <option key={song._id} value={song._id}>
                  {song.singer} - {song.songtitle}
                </option>
              ))}
            </select>
            {errors.bgSong && (
              <p className="text-red-500 text-sm">{errors.bgSong}</p>
            )}
          </div>

          {/* Image pengantin */}

          {/* <div>
            <h1 className="font-medium">Galeri (tidak wajib)</h1>

            <div className="text-start mb-2">
              <Label
                htmlFor="file-upload-helper-text"
                value="Upload Gambar 1"
              />
            </div>
            <FileInput
              id="file-upload-helper-text"
              accept="image/*"
              helperText="PNG or JPG  (MAX. 800x400px)."
            />

            <div className="text-start mb-2">
              <Label
                htmlFor="file-upload-helper-text"
                value="Upload Gambar 2"
              />
            </div>
            <FileInput
              id="file-upload-helper-text"
              accept="image/*"
              helperText="PNG or JPG  (MAX. 800x400px)."
            />

            <div className="text-start mb-2">
              <Label
                htmlFor="file-upload-helper-text"
                value="Upload Gambar 3"
              />
            </div>
            <FileInput
              id="file-upload-helper-text"
              accept="image/*"
              helperText="PNG or JPG  (MAX. 800x400px)."
            />
          </div> */}
        </div>
        {/* Doa */}
        <div>
          <div className="text-start mb-2">
            <label htmlFor="doa-helper-text">Pilihan Doa</label>
          </div>
          <select
            id="doa"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={
              Object.keys(doaOptions).find(
                (key) => doaOptions[key] === doaText
              ) || ""
            }
            onChange={handleSelectChange}
          >
            <option value="">- Pilih doa -</option>
            {Object.keys(doaOptions).map((key) => (
              <option key={key} value={key}>
                Doa {key.slice(-1)}
              </option>
            ))}
          </select>

          {/* Text input for selected Doa */}
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
            value={doaText} // Display doaText
            onChange={handleTextChange}
            maxLength="350"
            rows="5"
          />
          <div className="text-sm text-gray-500 mt-1">
            {doaText.length} / 350
          </div>
          {errors.doa && (
              <p className="text-red-500 text-sm">{errors.doa}</p>
            )}
        </div>
        <div className="grid gap-5 my-6 sm:grid-cols-2">
          {/* Kod Pemakaian */}
          <div>
            <label
              htmlFor="dressCode"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Kod Pemakaian (jika ada)
            </label>
            <input
              type="text"
              name="dressCode"
              id="dressCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              value={formData.dressCode}
              onChange={(e) => {
                handleFormDataChange("dressCode", e.target.value);
              }}
            />
          </div>
          {/* Info tambahan */}
          <div>
            <label
              htmlFor="extrainfo"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Info Tambahan
            </label>
            <textarea
              type="text"
              name="extraInfo"
              id="extraInfo"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              value={formData.extraInfo}
              onChange={(e) => {
                handleFormDataChange("extraInfo", e.target.value);
              }}
            />
          </div>
          {/* Hashtag */}
          <div>
            <label
              htmlFor="hashtag"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              HashTag
            </label>
            
            <input
              type="text"
              name="hashtag"
              id="hashtag"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              required={true}
              value={formData.hashtag}
              placeholder="contoh: AdamXHawa"
              onChange={(e) => {
                handleFormDataChange("hashtag", e.target.value);
              }}
            />
            {errors.hashtag && (
              <p className="text-red-500 text-sm">{errors.hashtag}</p>
            )}
          </div>
          {/* orderphone */}
          <div>
            <label
              htmlFor="orderphone"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nombor telefon (Tanpa &#39; &#45; &#39;)
            </label>
            <input
              type="text"
              name="orderphone"
              id="orderphone"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              required={true}
              value={formData.orderphone}
              onChange={(e) => {
                handleFormDataChange("orderphone", e.target.value);
              }}
            />
            {errors.orderphone && (
              <p className="text-red-500 text-sm">{errors.orderphone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex space-x-3 justify-start">
            <button
              type="button"
              onClick={onPrevious}
              className="text-white bg-gray-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 sm:py-3.5 text-center"
            >
              <HiOutlineArrowNarrowLeft />
            </button>
          </div>
          <div className="flex space-x-3 justify-end">
            <button
              type="submit"
              className="w-3/4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 sm:py-3.5 text-center"
              onClick={submit}
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LainLainSection;
