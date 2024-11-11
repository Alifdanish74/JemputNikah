// components/ModalComponentContact.js
import { useWeddingCard } from "../../../customhooks/WeddingCardContext";
import Contact from "./ContactComponent";
import "react-toastify/dist/ReactToastify.css";

const ModalComponentContact = () => {
  const { weddingCard } = useWeddingCard();

  // if (loading) return <p>Loading wedding card details...</p>;
  if (!weddingCard) return <p>Wedding card not found.</p>;
  return (
    <>
      <div className="flex flex-col mb-5 min-h-[30vh]">
        <h2 className="text-lg mb-4 text-center font-bold text-gray-500">
          Contact
        </h2>
        {/* Contact 1 */}
        <Contact
          contactName={weddingCard.emergencyContacts1}
          phoneNumber={weddingCard.emergencyNumber1}
        //   wsLink="http://wasap.my/60123157930/WalimatulurusDanish&Iqkriany"
          wsLink={`http://wasap.my/6${weddingCard.emergencyContacts1}`}
        />

        {/* Contact 2 */}
        {weddingCard.emergencyContacts2 && (
          <Contact
            contactName={weddingCard.emergencyContacts2}
            phoneNumber={weddingCard.emergencyNumber2}
            wsLink={`http://wasap.my/6${weddingCard.emergencyContacts2}`}
          />
        )}
        {/* Contact 3 */}
        {weddingCard.emergencyContacts3 && (
          <Contact
            contactName={weddingCard.emergencyContacts3}
            phoneNumber={weddingCard.emergencyNumber3}
            wsLink={`http://wasap.my/6${weddingCard.emergencyContacts3}`}
          />
        )}
        {/* Contact 4 */}
        {weddingCard.emergencyContacts4 && (
          <Contact
            contactName={weddingCard.emergencyContacts4}
            phoneNumber={weddingCard.emergencyNumber4}
            wsLink={`http://wasap.my/6${weddingCard.emergencyContacts4}`}
          />
        )}
        
      </div>
    </>
  );
};

export default ModalComponentContact;
