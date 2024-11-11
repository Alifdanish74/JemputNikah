/* eslint-disable react/prop-types */
import { Datepicker } from "flowbite-react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";

function ClockSVG() {
  return (
    <svg
      className="w-4 h-4 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// eslint-disable-next-line react/prop-types
function MajlisSection({ onPrevious, onNext, formData, handleFormDataChange }) {
  return (
    <div className="my-8">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leding-tight ">
        Maklumat Majlis
      </h1>
      <form action="#">
        <div className="grid gap-5 my-6">
          {/* Tajuk Majlis */}
          <div>
            <label
              htmlFor="tajukmajlis"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Tajuk Majlis
            </label>
            <input
              type="text"
              name="tajukmajlis"
              id="tajukmajlis"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              required={true}
              value={formData.tajukMajlis}
              onChange={(e) => {
                handleFormDataChange("tajukMajlis", e.target.value);
              }}
            />
          </div>

          {/* Mukadimah */}
          <div>
            <label
              htmlFor="mukadimah"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Mukadimah
            </label>
            <textarea
              type="text"
              name="mukadimah"
              id="mukadimah"
              className="bg-gray-50 border border-gray-300 text-center text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  w-full p-2.5  "
              required={true}
              value={formData.mukadimah}
              onChange={(e) => {
                handleFormDataChange("mukadimah", e.target.value);
              }}
            />
          </div>

          {/* Ucapan Aluan */}
          <div>
            <label
              htmlFor="ucapan"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Ucapan Aluan
            </label>
            <textarea
              name="ucapan"
              id="ucapan"
              className="bg-gray-50 border border-gray-300 text-center text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block h-24 w-full p-2.5"
              required={true}
              value={formData.ucapanAluan}
              onChange={(e) => {
                handleFormDataChange("ucapanAluan", e.target.value);
              }}
            />
          </div>
          {/* Tarikh majlis */}
          <div>
            <label
              htmlFor="tarikhmajlis"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Tarikh Majlis
            </label>
            <Datepicker
              title="Tarikh Majlis Berlangsung"
              minDate={new Date()}
              showTodayButton={false}
              value={
                formData.tarikhMajlis
                  ? new Date(formData.tarikhMajlis)
                  : new Date()
              } // Convert to Date object
              onChange={(date) => handleFormDataChange("tarikhMajlis", date)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Waktu majlis mula */}
            <div>
              <label
                htmlFor="start-time"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Majlis Mula
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <ClockSVG />
                </div>
                <input
                  type="time"
                  id="eventstart"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={formData.majlisStart}
                  onChange={(e) => {
                    handleFormDataChange("majlisStart", e.target.value);
                  }}
                />
              </div>
            </div>
            {/* Waktu majlis akhir */}
            <div>
              <label
                htmlFor="end-time"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Majlis Berakhir
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <ClockSVG />
                </div>
                <input
                  type="time"
                  id="eventend"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={formData.majlisEnd}
                  onChange={(e) => {
                    handleFormDataChange("majlisEnd", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Lokasi Majlis */}
          <div>
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Lokasi Majlis
            </label>
            <input
              type="text"
              name="location"
              id="location"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              placeholder="Lokasi Majlis"
              required={true}
              value={formData.locationMajlis}
              onChange={(e) => {
                handleFormDataChange("locationMajlis", e.target.value);
              }}
            />
          </div>

          {/* Alamat penuh  */}
          <div>
            <label
              htmlFor="alamat"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Alamat Penuh Lokasi Majlis
            </label>
            <input
              type="text"
              name="alamat"
              id="alamat"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block h-20 w-full p-2.5  "
              required={true}
              placeholder="Alamat Penuh Lokasi Majlis"
              value={formData.fullLocationMajlis}
              onChange={(e) => {
                handleFormDataChange("fullLocationMajlis", e.target.value);
              }}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* GoogleMaps */}
            <div>
              <label
                htmlFor="maps"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Link Google Maps
              </label>
              <input
                type="text"
                name="maps"
                id="maps"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                placeholder="Link Google Maps"
                required={true}
                value={formData.googleMapsLink}
                onChange={(e) => {
                  handleFormDataChange("googleMapsLink", e.target.value);
                }}
              />
            </div>
            {/* Waze */}
            <div>
              <label
                htmlFor="waze"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Link Waze
              </label>
              <input
                type="text"
                name="waze"
                id="waze"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
                placeholder="Link Waze"
                required={true}
                value={formData.wazeLink}
                onChange={(e) => {
                  handleFormDataChange("wazeLink", e.target.value);
                }}
              />
            </div>
          </div>

          {/* Contact waris */}
          <label
            htmlFor="contact-waris"
            className="block  text-sm font-medium text-gray-900 "
          >
            No Telefon Ibu Bapa / Waris
          </label>
          {/* <div className="grid gap-5 sm:grid-cols-2"></div> */}
          <div>
            <div className=" flex">
              <input
                type="text"
                name="nama1"
                id="nama1"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                placeholder="Nama *"
                required={true}
                value={formData.emergencyContacts1}
                onChange={(e) => {
                  handleFormDataChange("emergencyContacts1", e.target.value);
                }}
              />
              <input
                type="text"
                name="phone1"
                id="phone1"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                placeholder="Nombor Telefon (Tanpa '-')*"
                required={true}
                value={formData.emergencyNumber1}
                onChange={(e) => {
                  handleFormDataChange("emergencyNumber1", e.target.value);
                }}
              />
            </div>
            <div className=" flex">
              <input
                type="text"
                name="nama2"
                id="nama2"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                placeholder="Nama *"
                required={true}
                value={formData.emergencyContacts2}
                onChange={(e) => {
                  handleFormDataChange("emergencyContacts2", e.target.value);
                }}
              />
              <input
                type="text"
                name="phone2"
                id="phone2"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                placeholder="Nombor Telefon (Tanpa '-')*"
                required={true}
                value={formData.emergencyNumber2}
                onChange={(e) => {
                  handleFormDataChange("emergencyNumber2", e.target.value);
                }}
              />
            </div>
            <div className=" flex">
              <input
                type="text"
                name="nama3"
                id="nama3"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                placeholder="Nama"
              />
              <input
                type="text"
                name="phone3"
                id="phone3"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                placeholder="Nombor Telefon (Tanpa '-')"
                value={formData.emergencyContacts3}
                onChange={(e) => {
                  handleFormDataChange("emergencyContacts3", e.target.value);
                }}
              />
            </div>
            <div className=" flex">
              <input
                type="text"
                name="nama4"
                id="nama4"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                placeholder="Nama"
                value={formData.emergencyContacts4}
                onChange={(e) => {
                  handleFormDataChange("emergencyContacts4", e.target.value);
                }}
              />
              <input
                type="text"
                name="phone4"
                id="phone4"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                placeholder="Nombor Telefon (Tanpa '-')"
                value={formData.emergencyNumber4}
                onChange={(e) => {
                  handleFormDataChange("emergencyNumber4", e.target.value);
                }}
              />
            </div>
          </div>
          {/* Aturcara */}
          <label
            htmlFor="aturcara"
            className="block  text-sm font-medium text-gray-900 "
          >
            Aturcara Majlis
          </label>
          {/* <div className="grid gap-5 sm:grid-cols-2"></div> */}

          <div>
            <div className="grid grid-cols-2">
              <div className="relative">
                <div className="absolute inset-y-2 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <ClockSVG />
                </div>
                <input
                  type="time"
                  id="time1"
                  className="bg-gray-50 border h-3/4 leading-none border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={formData.eventTentativeTime1}
                  onChange={(e) => {
                    handleFormDataChange("eventTentativeTime1", e.target.value);
                  }}
                />
              </div>
              <input
                type="text"
                name="aturcara1"
                id="aturcara1"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                required={true}
                value={formData.eventTentativeTitle1}
                onChange={(e) => {
                  handleFormDataChange("eventTentativeTitle2", e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="relative">
                <div className="absolute inset-y-2 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <ClockSVG />
                </div>
                <input
                  type="time"
                  id="time2"
                  className="bg-gray-50 border h-3/4 leading-none border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={formData.eventTentativeTime2}
                  onChange={(e) => {
                    handleFormDataChange("eventTentativeTime2", e.target.value);
                  }}
                />
              </div>
              <input
                type="text"
                name="aturcara2"
                id="aturcara2"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                required={true}
                value={formData.eventTentativeTitle2}
                onChange={(e) => {
                  handleFormDataChange("eventTentativeTitle3", e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="relative">
                <div className="absolute inset-y-2 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <ClockSVG />
                </div>
                <input
                  type="time"
                  id="time3"
                  className="bg-gray-50 border h-3/4 leading-none border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={formData.eventTentativeTime3}
                  onChange={(e) => {
                    handleFormDataChange("eventTentativeTime3", e.target.value);
                  }}
                />
              </div>
              <input
                type="text"
                name="aturcara3"
                id="aturcara3"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                required={true}
                value={formData.eventTentativeTitle3}
                onChange={(e) => {
                  handleFormDataChange("eventTentativeTitle3", e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="relative">
                <div className="absolute inset-y-2 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <ClockSVG />
                </div>
                <input
                  type="time"
                  id="time4"
                  className="bg-gray-50 border h-3/4 leading-none border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.eventTentativeTime4}
                  onChange={(e) => {
                    handleFormDataChange("eventTentativeTime4", e.target.value);
                  }}
                />
              </div>
              <input
                type="text"
                name="aturcara4"
                id="aturcara4"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                value={formData.eventTentativeTitle4}
                onChange={(e) => {
                  handleFormDataChange("eventTentativeTitle4", e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="relative">
                <div className="absolute inset-y-2 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <ClockSVG />
                </div>
                <input
                  type="time"
                  id="time5"
                  className="bg-gray-50 border h-3/4 leading-none border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.eventTentativeTime5}
                  onChange={(e) => {
                    handleFormDataChange("eventTentativeTime5", e.target.value);
                  }}
                />
              </div>
              <input
                type="text"
                name="aturcara5"
                id="aturcara5"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                value={formData.eventTentativeTitle5}
                onChange={(e) => {
                  handleFormDataChange("eventTentativeTitle5", e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex space-x-3 justify-start">
            <button
              type="button"
              onClick={onPrevious} // Call the onNext prop when the button is clicked
              className=" text-white bg-gray-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 sm:py-3.5 text-center"
            >
              {/* Previous: RSVP */}
              <HiOutlineArrowNarrowLeft />
            </button>
          </div>
          <div className="flex space-x-3 justify-end">
            <button
              type="button"
              onClick={onNext} // Call the onNext prop when the button is clicked
              className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 sm:py-3.5 text-center"
            >
              <HiOutlineArrowNarrowRight />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MajlisSection;
