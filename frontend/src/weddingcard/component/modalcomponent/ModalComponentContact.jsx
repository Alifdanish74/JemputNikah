// components/ModalComponentContact.js
import Contact from "./ContactComponent";
import "react-toastify/dist/ReactToastify.css";

const ModalComponentContact = () => {
  return (
    <>
      <div className="flex flex-col mb-5 min-h-[30vh]">
        <h2 className="text-lg mb-4 text-center font-bold text-gray-500">
          Contact
        </h2>
        {/* Contact 1 */}
        <Contact
          contactName="Arshad"
          phoneNumber="0123157930"
          gelaran="Bapa-Lelaki"
          wsLink="http://wasap.my/60123157930/WalimatulurusDanish&Iqkriany"
        />

        {/* Contact 2 */}
        <Contact
          contactName="Rohayu"
          phoneNumber="0196224566"
          gelaran="Ibu-Lelaki"
          wsLink="http://wasap.my/60196224566/WalimatulurusDanish&Iqkriany"
        />
        {/* Contact 3 */}
        <Contact
          contactName="Nor Azean"
          phoneNumber="0193582242"
          gelaran="Ibu-Perempuan"
          wsLink="http://wasap.my/60193582242/WalimatulurusDanish&Iqkriany"
        />
        {/* Contact 4 */}
        <Contact
          contactName="Alif Danish"
          phoneNumber="01127877926"
          gelaran="Pengantin-L"
          wsLink="http://wasap.my/601127877926/WalimatulurusDanish&Iqkriany"
        />
        {/* Contact 5 */}
        <Contact
          contactName="Nur Iqkriany"
          phoneNumber="01123268530"
          gelaran="Pengantin-P"
          wsLink="http://wasap.my/601123268530/WalimatulurusDanish&Iqkriany"
        />
      </div>
    </>
  );
};

export default ModalComponentContact;
