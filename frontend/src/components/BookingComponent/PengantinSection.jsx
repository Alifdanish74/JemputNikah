/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaUpload } from "react-icons/fa";

function PengantinSection({ onNext, formData, handleFormDataChange }) {
  const [selectedFont, setSelectedFont] = useState("");
  const [pihakMajlis, setPihakMajlis] = useState("");

  // Function to handle font change
  const handleFontChange = (e) => {
    setSelectedFont(e.target.value); // Update selected font class based on user selection
  };

  const handlePihakMajlis = (e) => {
    setPihakMajlis(e.target.value); // Update selected pihak majlis class based on user selection
  };

  return (
    <div className="my-8">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leding-tight ">
        Maklumat Pengantin
      </h1>
      <form action="#">
        <div className="grid gap-5 my-6 sm:grid-cols-2">
          {/* Pihak Majlis */}
          <div>
            <label
              htmlFor="pihakmajlis"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Pihak Majlis
            </label>
            <select
              id="pihakmajlis"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
              value={formData.pihakMajlis}
              onChange={(e) => {
                handlePihakMajlis(e);
                handleFormDataChange("pihakMajlis", e.target.value);
              }}
            >
              <option selected="">Pilih pihak majlis</option>
              <option value="L">Belah pengantin lelaki</option>
              <option value="P">Belah pengantin perempuan</option>
              <option value="LL">Kedua-dua belah pihak (lelaki)</option>
              <option value="PP">Kedua-dua belah pihak (perempuan)</option>
              <option value="D">Dua pasangan</option>
            </select>
          </div>

          {/* <h1>{pihakMajlis}</h1> */}
          {/* Jenis Font */}
          <div>
            <label
              htmlFor="jenisfont"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Jenis Font
            </label>
            <select
              id="jenisfont"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${selectedFont}`}
              value={formData.jenisFont}
              onChange={(e) => {
                handleFontChange(e);
                handleFormDataChange("jenisFont", e.target.value);
              }} // Trigger handleFontChange when font is selected
            >
              <option value="">Pilih jenis font</option>
              <option className="font-Tangerine" value="font-Tangerine">
                Tangerine
              </option>
              <option
                className="font-CinzelDecorative"
                value="font-CinzelDecorative"
              >
                Cinzel Decorative
              </option>
              <option className="font-GreatVibes" value="font-GreatVibes">
                Great Vibes
              </option>
              <option className="font-MarckScript" value="font-MarckScript">
                Marck Script
              </option>
              <option
                className="font-LibreCaslonText"
                value="font-LibreCaslonText"
              >
                Libre Caslon Text
              </option>
              <option className="font-KaushanScript" value="font-KaushanScript">
                Kaushan Script
              </option>
              <option className="font-LaGraziela" value="font-LaGraziela">
                La Graziela
              </option>
              <option
                className="font-JuliettaMessie"
                value="font-JuliettaMessie"
              >
                Julietta Messie
              </option>
              <option className="font-Hearthway" value="font-Hearthway">
                Hearthway
              </option>
            </select>
          </div>
          {pihakMajlis === "D" ? (
            <>
              {/* Nama panjang pasangan pertama */}
              <div>
                <label
                  htmlFor="full-name-pair1"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Penuh Pasangan Pertama
                </label>
                <input
                  type="text"
                  name="full-name-pair1"
                  id="full-name-pair1"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${selectedFont} `}
                  placeholder="Ahmad Ali bin Abu & Siti Aminah binti Rahman"
                  required={true}
                  value={formData.namaPenuhPasangan1}
                  onChange={(e) => {
                    handleFormDataChange("namaPenuhPasangan1", e.target.value);
                  }}
                />
              </div>
              {/* Nama pendek pasangan pertama */}
              <div>
                <label
                  htmlFor="short-name-pair1"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Pendek Pasangan Pertama
                </label>
                <input
                  type="text"
                  name="short-name-pair1"
                  id="short-name-pair1"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${selectedFont} `}
                  placeholder="Ali & Siti"
                  required={true}
                  value={formData.namaPendekPasangan1}
                  onChange={(e) => {
                    handleFormDataChange("namaPendekPasangan1", e.target.value);
                  }}
                />
              </div>
              {/* Nama panjang Pasangan Kedua */}
              <div>
                <label
                  htmlFor="full-name-pair2"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Penuh Pasangan Kedua
                </label>
                <input
                  type="text"
                  name="full-name-pair2"
                  id="full-name-pair2"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${selectedFont} `}
                  placeholder="Ahmad Abu bin Ali & Aminah binti Salman"
                  required={true}
                  value={formData.namaPenuhPasangan2}
                  onChange={(e) => {
                    handleFormDataChange("namaPenuhPasangan2", e.target.value);
                  }}
                />
              </div>
              {/* Nama pendek Pasangan Kedua*/}
              <div>
                <label
                  htmlFor="short-name-pair2"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Pendek Pasangan Kedua
                </label>
                <input
                  type="text"
                  name="short-name-pair2"
                  id="short-name-pair2"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${selectedFont} `}
                  placeholder="Ahmad & Aminah"
                  required={true}
                  value={formData.namaPendekPasangan2}
                  onChange={(e) => {
                    handleFormDataChange("namaPendekPasangan2", e.target.value);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {/* Nama panjang pengantin lelaki */}
              <div>
                <label
                  htmlFor="full-name-lelaki"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Penuh Pengantin Lelaki
                </label>
                <input
                  type="text"
                  name="full-name-lelaki"
                  id="full-name-lelaki"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${selectedFont} `}
                  placeholder="Nama penuh"
                  required={true}
                  value={formData.namaPenuhLelaki}
                  onChange={(e) => {
                    handleFormDataChange("namaPenuhLelaki", e.target.value);
                  }}
                />
              </div>
              {/* Nama pendek pengantin lelaki */}
              <div>
                <label
                  htmlFor="short-name-lelaki"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Pendek Pengantin Lelaki
                </label>
                <input
                  type="text"
                  name="short-name-lelaki"
                  id="short-name-lelaki"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${selectedFont} `}
                  placeholder="Nama pendek"
                  required={true}
                  value={formData.namaPendekLelaki}
                  onChange={(e) => {
                    handleFormDataChange("namaPendekLelaki", e.target.value);
                  }}
                />
              </div>
              {/* Nama panjang pengantin Perempuan */}
              <div>
                <label
                  htmlFor="full-name-Perempuan"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Penuh Pengantin Perempuan
                </label>
                <input
                  type="text"
                  name="full-name-Perempuan"
                  id="full-name-Perempuan"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${selectedFont} `}
                  placeholder="Nama penuh"
                  required={true}
                  value={formData.namaPenuhPerempuan}
                  onChange={(e) => {
                    handleFormDataChange("namaPenuhPerempuan", e.target.value);
                  }}
                />
              </div>
              {/* Nama pendek pengantin Perempuan */}
              <div>
                <label
                  htmlFor="short-name-Perempuan"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Pendek Pengantin Perempuan
                </label>
                <input
                  type="text"
                  name="short-name-Perempuan"
                  id="short-name-Perempuan"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${selectedFont} `}
                  placeholder="Nama pendek"
                  required={true}
                  value={formData.namaPendekPerempuan}
                  onChange={(e) => {
                    handleFormDataChange("namaPendekPerempuan", e.target.value);
                  }}
                />
              </div>
            </>
          )}

          {pihakMajlis === "LL" ? (
            <>
              {/* Nama bapa (pihak majlis) */}
              <div>
                <label
                  htmlFor="namabapa"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Bapa Pengantin (Pihak Lelaki)
                </label>
                <input
                  type="text"
                  name="namabapa"
                  id="namabapa"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                  placeholder="Nama Bapa Pengantin Lelaki"
                  required={true}
                  value={formData.namaBapaPengantinL}
                  onChange={(e) => {
                    handleFormDataChange("namaBapaPengantinL", e.target.value);
                  }}
                />
              </div>

              {/* Nama ibu (pihak majlis) */}
              <div>
                <label
                  htmlFor="namaibu"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Ibu Pengantin (Pihak Lelaki)
                </label>
                <input
                  type="text"
                  name="namaibu"
                  id="namaibu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                  placeholder="Nama Ibu Pengantin Lelaki"
                  required={true}
                  value={formData.namaIbuPengantinL}
                  onChange={(e) => {
                    handleFormDataChange("namaIbuPengantinL", e.target.value);
                  }}
                />
              </div>
              {/* Nama bapa (pihak Perempuan) */}
              <div>
                <label
                  htmlFor="namabapa"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Bapa Pengantin (Pihak Perempuan)
                </label>
                <input
                  type="text"
                  name="namabapa"
                  id="namabapa"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                  placeholder="Nama Bapa Pengantin Perempuan"
                  required={true}
                  value={formData.namaBapaPengantinP}
                  onChange={(e) => {
                    handleFormDataChange("namaBapaPengantinP", e.target.value);
                  }}
                />
              </div>

              {/* Nama ibu (pihak Perempuan) */}
              <div>
                <label
                  htmlFor="namaibu"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Ibu Pengantin (Pihak Perempuan)
                </label>
                <input
                  type="text"
                  name="namaibu"
                  id="namaibu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                  placeholder="Nama Ibu Pengantin Perempuan"
                  required={true}
                  value={formData.namaIbuPengantinP}
                  onChange={(e) => {
                    handleFormDataChange("namaIbuPengantinP", e.target.value);
                  }}
                />
              </div>
            </>
          ) : pihakMajlis === "PP" ? (
            <>
              {/* Nama bapa (pihak majlis) */}
              <div>
                <label
                  htmlFor="namabapa"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Bapa Pengantin (Pihak Perempuan)
                </label>
                <input
                  type="text"
                  name="namabapa"
                  id="namabapa"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                  placeholder="Nama Bapa Pengantin Perempuan"
                  required={true}
                  value={formData.namaBapaPengantinP}
                  onChange={(e) => {
                    handleFormDataChange("namaBapaPengantinP", e.target.value);
                  }}
                />
              </div>

              {/* Nama ibu (pihak Perempuan) */}
              <div>
                <label
                  htmlFor="namaibu"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Ibu Pengantin (Pihak Perempuan)
                </label>
                <input
                  type="text"
                  name="namaibu"
                  id="namaibu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                  placeholder="Nama Ibu Pengantin Perempuan"
                  required={true}
                  value={formData.namaIbuPengantinP}
                  onChange={(e) => {
                    handleFormDataChange("namaIbuPengantinP", e.target.value);
                  }}
                />
              </div>
              {/* Nama bapa (pihak lelaki) */}
              <div>
                <label
                  htmlFor="namabapa"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Bapa Pengantin (Pihak Lelaki)
                </label>
                <input
                  type="text"
                  name="namabapa"
                  id="namabapa"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                  placeholder="Nama Bapa Pengantin Lelaki"
                  required={true}
                  value={formData.namaBapaPengantinL}
                  onChange={(e) => {
                    handleFormDataChange("namaBapaPengantinL", e.target.value);
                  }}
                />
              </div>

              {/* Nama ibu (pihak lelaki) */}
              <div>
                <label
                  htmlFor="namaibu"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Ibu Pengantin (Pihak Lelaki)
                </label>
                <input
                  type="text"
                  name="namaibu"
                  id="namaibu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                  placeholder="Nama Ibu Pengantin Lelaki"
                  required={true}
                  value={formData.namaIbuPengantinL}
                  onChange={(e) => {
                    handleFormDataChange("namaIbuPengantinL", e.target.value);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {/* Nama bapa (pihak majlis) */}
              <div>
                <label
                  htmlFor="namabapa"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Bapa Pengantin (Pihak Majlis)
                </label>
                <input
                  type="text"
                  name="namabapa"
                  id="namabapa"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                  placeholder="Nama Bapa Pengantin"
                  required={true}
                  value={formData.namaBapaPengantin}
                  onChange={(e) => {
                    handleFormDataChange("namaBapaPengantin", e.target.value);
                  }}
                />
              </div>

              {/* Nama ibu (pihak majlis) */}
              <div>
                <label
                  htmlFor="namaibu"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Ibu Pengantin (Pihak Majlis)
                </label>
                <input
                  type="text"
                  name="namaibu"
                  id="namaibu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                  placeholder="Nama Ibu Pengantin"
                  required={true}
                  value={formData.namaIbuPengantin}
                  onChange={(e) => {
                    handleFormDataChange("namaIbuPengantin", e.target.value);
                  }}
                />
              </div>
            </>
          )}

          {/* Gambar pasangan */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gambar Pasangan (tidak wajib)
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept="image/*"
                name="image"
                //   onChange={handleImageChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
              <FaUpload className="text-indigo-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="flex space-x-3 justify-end">
          <button
            type="button"
            onClick={onNext} // Call the onNext prop when the button is clicked
            className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3.5 text-center"
          >
            Next: Majlis
          </button>
        </div>
      </form>
    </div>
  );
}

export default PengantinSection;
