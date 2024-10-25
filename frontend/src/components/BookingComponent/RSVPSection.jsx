import { useState } from "react";
import { Datepicker, ToggleSwitch } from "flowbite-react";

// eslint-disable-next-line react/prop-types
function RSVPSection({ onPrevious, onNext }) {
  const [slotMasa, setSlotMasa] = useState(false);
  const [kids, setkids] = useState(false);

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
          <div>
            {/* Toggle Kanak kanak */}
            <ToggleSwitch
              checked={kids}
              label="Kehadiran kanak-kanak?"
              onChange={setkids}
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
              required="true"
              placeholder="500"
            />
          </div>
          <div>
            <label
              htmlFor="limitperperson"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Had Kehadiran Per Tetamu
            </label>
            <input
              type="number"
              name="limitperperson"
              id="limitperperson"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              required="true"
              placeholder="5"
            />
          </div>
        </div>
        {slotMasa && (
          <div>
            {/* Slot 1 */}
            <label
              htmlFor="slot1"
              className="block  text-sm text-left pb-2 font-medium text-gray-900 "
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Label (eg: Saudara-mara)*"
                  required="true"
                />
                <input
                  type="number"
                  name="limit1"
                  id="limit1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Had tetamu*"
                  required="true"
                />
              </div>
              <div className=" flex">
                <input
                  type="text"
                  name="from1"
                  id="from1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Dari (eg: 11:00 AM)*"
                  required="true"
                />
                <input
                  type="number"
                  name="to1"
                  id="to1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Hingga (eg: 12:30 PM)*"
                  required="true"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Label (eg: Jiran tetangga)*"
                  required=""
                />
                <input
                  type="number"
                  name="limit2"
                  id="limit2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Had tetamu*"
                  required=""
                />
              </div>
              <div className=" flex">
                <input
                  type="text"
                  name="from2"
                  id="from2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Dari (eg: 12:30 PM)*"
                  required=""
                />
                <input
                  type="number"
                  name="to2"
                  id="to2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Hingga (eg: 2:00 PM)*"
                  required=""
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Label (eg: Rakan-rakan)*"
                  required=""
                />
                <input
                  type="number"
                  name="limit3"
                  id="limit3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Had tetamu*"
                  required=""
                />
              </div>
              <div className=" flex">
                <input
                  type="text"
                  name="from3"
                  id="from3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Dari (eg: 2:00 PM)*"
                  required=""
                />
                <input
                  type="number"
                  name="to3"
                  id="to3"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Hingga (eg: 3:30 PM)*"
                  required=""
                />
              </div>
            </div>
            {/* Slot 4 */}
            <label
              htmlFor="slot4"
              className="block  text-sm text-left py-2 font-medium text-gray-900 "
            >
              Slot 4
            </label>
            {/* <div className="grid gap-5 sm:grid-cols-2"></div> */}
            <div>
              <div className=" flex">
                <input
                  type="text"
                  name="label4"
                  id="label4"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Label (eg: Tetamu sekalian)*"
                  required=""
                />
                <input
                  type="number"
                  name="limit4"
                  id="limit4"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Had tetamu*"
                  required=""
                />
              </div>
              <div className=" flex">
                <input
                  type="text"
                  name="from4"
                  id="from4"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full   "
                  placeholder="Dari (eg: 3:30 PM)*"
                  required=""
                />
                <input
                  type="number"
                  name="to4"
                  id="to4"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600 block h-3/4 w-full"
                  placeholder="Hingga (eg: 5:00 PM)*"
                  required=""
                />
              </div>
            </div>
          </div>
        )}
        {/* Had kehadiran per tetamu */}

        {/* Tarikh last rsvp */}
        <div className="w-1/2">
          <label
            htmlFor="tarikhlastrsvp"
            className="block my-2 text-sm font-medium text-gray-900 "
          >
            Tarikh Akhir RSVP
          </label>
          <Datepicker />
        </div>

        <div className="grid grid-cols-2 mt-10">
          <div className="flex space-x-3 justify-start">
            <button
              type="button"
              onClick={onPrevious} // Call the onNext prop when the button is clicked
              className="w-1/2 text-white bg-gray-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3.5 text-center"
            >
              Previous: MoneyGift
            </button>
          </div>
          <div className="flex space-x-3 justify-end">
            <button
              type="button"
              onClick={onNext} // Call the onNext prop when the button is clicked
              className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3.5 text-center"
            >
              Next: Lain-Lain
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RSVPSection;
