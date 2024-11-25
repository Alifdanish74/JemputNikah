/* eslint-disable react/prop-types */
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  

  return (
    <a
      href={"http://wasap.my/601127877926/Hi! Nak tempah kad jemputan digital."}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        backgroundColor: "#25d366",
        color: "#fff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        textDecoration: "none",
        fontSize: "24px",
      }}
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppButton;
