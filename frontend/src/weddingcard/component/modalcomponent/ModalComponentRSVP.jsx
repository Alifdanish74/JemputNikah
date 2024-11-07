/* eslint-disable react/prop-types */
// components/ModalComponentRSVP.js

const ModalComponentRSVP = ({ onConfirm }) => {
  return (
    <>
      <div className="flex  flex-col mb-5 min-h-[20vh]">
        <h2 className="text-lg mb-4 text-center font-bold text-gray-500">
          RSVP
        </h2>
        <button
          className="py-2 border-4 font-semibold bg-transparent hover:bg-green-500 transition-colors text-black rounded-lg mb-2"
          onClick={() => onConfirm("RSVPSlot")}
        >
          Hadir
        </button>
        <button
          className="py-2 border-4 bg-transparent font-semibold hover:bg-red-500 text-black rounded"
          onClick={() => onConfirm("RSVPTidakHadir")}
        >
          Tidak Hadir
        </button>
      </div>
    </>
  );
};

export default ModalComponentRSVP;
