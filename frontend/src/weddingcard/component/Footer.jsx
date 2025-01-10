import { FaWhatsapp } from "react-icons/fa";
import JemputKahwinLogo from "../../assets/JemputKahwinLogo.png";
import { useParams } from "react-router-dom";
import { useWeddingCard } from "../../customhooks/WeddingCardContext";
import { useEffect } from "react";

function Footer() {
  const { orderNumber } = useParams();
  const { weddingCard, fetchWeddingCard } = useWeddingCard();

  useEffect(() => {
    if (orderNumber) {
      fetchWeddingCard(orderNumber);
    }
  }, [orderNumber]);

  // if (loading) return <p>Loading wedding card details...</p>;
  // if (!weddingCard) return <p>Wedding card not found.</p>;

  return (
    <footer
      id="hashtag"
      className="flex flex-col text-center content-center justify-center container py-5"
    >
      <h1
        style={{ color: weddingCard.designFontColor || "#000000" }}
        className=" font-[gormorant] mt-10 text-xl"
      >
        #{weddingCard.hashtag}
        {/* #DanishXIqkriany */}
      </h1>

      <br></br>
      {/* Logo */}
      <div className="flex flex-col my-4 mx-auto">
        <h1
          style={{ color: weddingCard.designFontColor || "#000000" }}
          className=" my-1 text-xs"
        >
          Dizahirkan penuh ❤️ oleh
        </h1>
        <a href="https://www.jemputkahwin.com.my" target="_blank">
          <img
            src={JemputKahwinLogo}
            width={50}
            height={50}
            alt="Logo Jemput Kahwin"
            className="mx-auto"
          />
        </a>
      </div>
      {/* Social media */}
      <div className="mt-4">
        <h1
          style={{ color: weddingCard.designFontColor || "#000000" }}
          className=" my-2"
        >
          Lebih lanjut
        </h1>
        <a
          href={
            "http://wasap.my/601127877926/Hi! Nak tempah kad jemputan digital."
          }
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: weddingCard.designFontColor || "#000000" }}
          className="flex items-center text-3xl justify-center "
        >
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
