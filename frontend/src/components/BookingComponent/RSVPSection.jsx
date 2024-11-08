/* eslint-disable react/prop-types */
import { useState } from "react";
import { Datepicker, ToggleSwitch } from "flowbite-react";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";

// eslint-disable-next-line react/prop-types
function RSVPSection({ onPrevious, onNext, formData, handleFormDataChange }) {
  const [slotMasa, setSlotMasa] = useState(false);

  return (
    <div className="my-8">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leding-tight ">
        Maklumat RSVP
      </h1>
      <form action="#">
        <div className="grid gap-5 my-6 sm:grid-cols-2">
          {/* Toggle Slot Masa */}
          <div>
            <ToggleSwitch
              checked={slotMasa}
              label="Slot masa?"
              onChange={setSlotMasa}
            />
          </div>
        </div>
        {/* Had kehadiran keseluruhan */}
        <div className="grid gap-5 my-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="limitguest"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Had Kehadiran Keseluruhan
            </label>
            <input
              type="number"
              name="limitguest"
              id="limitguest"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              required={true}
              placeholder="500"
              value={formData.maxInvitations}
              onChange={(e) => {
                handleFormDataChange("maxInvitations", e.target.value);
              }}
            />
          </div>
          {/* Tarikh last rsvp */}
          <div>
            <label
              htmlFor="tarikhlastrsvp"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Tarikh Akhir RSVP
            </label>
            <Datepicker
              title="Tarikh Akhir RSVP"
              minDate={new Date()}
              maxDate={formData.tarikhMajlis}
              onChange={(date) => handleFormDataChange("maxDate", date)}
            />
          </div>
        </div>
        <div className="grid gap-5 my-6 sm:grid-cols-2">
          {/* Had kehadiran per tetamu */}
          <div>
            <label
              htmlFor="limitperperson"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Had Kehadiran Per Tetamu (Dewasa)
            </label>
            <input
              type="number"
              name="limitperperson"
              id="limitperperson"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              required={true}
              placeholder="5"
              value={formData.maxInvitationsDewasa}
              onChange={(e) => {
                handleFormDataChange("maxInvitationsDewasa", e.target.value);
              }}
            />
          </div>
          {/* Had kehadiran per tetamu kanak kanak */}
          <div>
            <label
              htmlFor="limitperperson"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Had Kehadiran Per Tetamu (Kanak-kanak)
            </label>
            <input
              type="number"
              name="limitperperson"
              id="limitperperson"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              required={true}
              placeholder="5"
              value={formData.maxInvitationsKids}
              onChange={(e) => {
                handleFormDataChange("maxInvitationsKids", e.target.value);
              }}
            />
          </div>
        </div>
        {slotMasa && (
          <div>
            {/* Slot 1 */}
            <label
              htmlFor="slot1"
              className="block  text-sm text-left py-2 font-medium text-gray-900 "
            >
              Slot 1
            </label>
            {/* <div className="grid gap-5 sm:grid-cols-2"></div> */}
            <div>
              <div className=" flex">
                <input
                  type="text"
                  name="label1"
                  id="label1"
                  className="bg-gray-50 border  w-1/2 border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4    "
                  placeholder="Label (eg: Saudara-mara)*"
                  required={true}
                  value={formData.labelSlot1}
                  onChange={(e) => {
                    handleFormDataChange("labelSlot1", e.target.value);
                  }}
                />
              </div>
              <div className=" flex">
                <input
                  type="text"
                  name="from1"
                  id="from1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Dari (eg: 11:00 AM)*"
                  required={true}
                  value={formData.fromSlot1}
                  onChange={(e) => {
                    handleFormDataChange("fromSlot1", e.target.value);
                  }}
                />
                <input
                  type="text"
                  name="to1"
                  id="to1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Hingga (eg: 12:30 PM)*"
                  required={true}
                  value={formData.toSlot1}
                  onChange={(e) => {
                    handleFormDataChange("toSlot1", e.target.value);
                  }}
                />
              </div>
            </div>
            {/* Slot 2 */}
            <label
              htmlFor="slot2"
              className="block  text-sm text-left py-2 font-medium text-gray-900 "
            >
              Slot 2
            </label>
            {/* <div className="grid gap-5 sm:grid-cols-2"></div> */}
            <div>
              <div className=" flex">
                <input
                  type="text"
                  name="label2"
                  id="label2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-1/2   "
                  placeholder="Label (eg: Jiran tetangga)*"
                  required={true}
                  value={formData.labelSlot2}
                  onChange={(e) => {
                    handleFormDataChange("labelSlot2", e.target.value);
                  }}
                />
              </div>
              <div className=" flex">
                <input
                  type="text"
                  name="from2"
                  id="from2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Dari (eg: 12:30 PM)*"
                  required={true}
                  value={formData.fromSlot2}
                  onChange={(e) => {
                    handleFormDataChange("fromSlot2", e.target.value);
                  }}
                />
                <input
                  type="text"
                  name="to2"
                  id="to2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Hingga (eg: 2:30 PM)*"
                  required={true}
                  value={formData.toSlot2}
                  onChange={(e) => {
                    handleFormDataChange("toSlot2", e.target.value);
                  }}
                />
              </div>
            </div>
            {/* Slot 3 */}
            <label
              htmlFor="slot3"
              className="block  text-sm text-left py-2 font-medium text-gray-900 "
            >
              Slot 3
            </label>
            {/* <div className="grid gap-5 sm:grid-cols-2"></div> */}
            <div>
              <div className=" flex">
                <input
                  type="text"
                  name="label3"
                  id="label3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-1/2   "
                  placeholder="Label (eg: Rakan-rakan)*"
                  required={true}
                  value={formData.labelSlot3}
                  onChange={(e) => {
                    handleFormDataChange("labelSlot3", e.target.value);
                  }}
                />
              </div>
              <div className=" flex">
                <input
                  type="text"
                  name="from3"
                  id="from3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Dari (eg: 2:30 AM)*"
                  required={true}
                  value={formData.fromSlot3}
                  onChange={(e) => {
                    handleFormDataChange("fromSlot3", e.target.value);
                  }}
                />
                <input
                  type="text"
                  name="to3"
                  id="to3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Hingga (eg: 3:30 PM)*"
                  required={true}
                  value={formData.toSlot3}
                  onChange={(e) => {
                    handleFormDataChange("toSlot3", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 mt-10">
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

export default RSVPSection;
