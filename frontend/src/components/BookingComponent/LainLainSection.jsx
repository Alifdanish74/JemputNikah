/* eslint-disable react/prop-types */
import ReactAudioPlayer from "react-audio-player";
import { FileInput, Label } from "flowbite-react";

// eslint-disable-next-line react/prop-types
function LainLainSection({ onPrevious, formData, handleFormDataChange, submit }) {
  return (
    <div className="my-8">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leding-tight ">
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
            <ReactAudioPlayer
              className="w-full my-4"
              src="https://l4lp5z4mhbcqycfi.public.blob.vercel-storage.com/Kisahcintakita-rLEvlErlgGc2SaWcG5ZxlmhfpZ8c4i.mp3"
              controls
            />
          </div>

          {/* Background lagu */}
          <div>
            <select
              id="lagu"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
              value={formData.bgSong}
              onChange={(e) => {
                
                handleFormDataChange("bgSong", e.target.value);
              }}
            >
              <option value="">- Pilih musik latar belakang -</option>
              <option value="001">Kisah Cinta Kita – Hafiz Suip</option>
              <option value="002">Sesungguhnya Aku – Alif Satar</option>
              <option value="003">Sampai ke Hari Tua – Aizat Amdan</option>
              <option value="004">Adinda – Lah Ahmad</option>
              <option value="005">Cinta Bersatu – Liyana Jasmay</option>
              <option value="006">Semoga Abadi – Misha Omar</option>
              <option value="007">Sedetik Lebih – Anuar Zain</option>
              <option value="008">Ajari Aku – Anuar Zain</option>
              <option value="009">Cinta Luar Biasa – Andmesh</option>
              <option value="010">Akad – Payung Teduh</option>
            </select>
          </div>

          {/* Gambar pasangan */}
          
          <div>
            <h1 className="font-medium">Galeri (tidak wajib)</h1>
            {/* Gambar 1 */}
            <div className="text-start mb-2">
              <Label htmlFor="file-upload-helper-text" value="Upload Gambar 1" />
            </div>
            <FileInput
              id="file-upload-helper-text"
              accept="image/*"
              helperText=" PNG or JPG  (MAX. 800x400px)."
            />
            {/* Gambar 2 */}
            <div className="text-start mb-2">
              <Label htmlFor="file-upload-helper-text" value="Upload Gambar 2" />
            </div>
            <FileInput
              id="file-upload-helper-text"
              accept="image/*"
              helperText=" PNG or JPG  (MAX. 800x400px)."
            />
            {/* Gambar 3 */}
            <div className="text-start mb-2">
              <Label htmlFor="file-upload-helper-text" value="Upload Gambar 3" />
            </div>
            <FileInput
              id="file-upload-helper-text"
              accept="image/*"
              helperText=" PNG or JPG  (MAX. 800x400px)."
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex space-x-3 justify-start">
            <button
              type="button"
              onClick={onPrevious} // Call the onNext prop when the button is clicked
              className="w-1/2 text-white bg-gray-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3.5 text-center"
            >
              Previous: RSVP
            </button>
          </div>
          <div className="flex space-x-3 justify-end">
            <button
              type="submit"
              className="w-3/4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 sm:py-3.5 text-center "
              onClick={submit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LainLainSection;
