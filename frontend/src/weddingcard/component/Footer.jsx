import { FaWhatsapp } from "react-icons/fa";
import ImageLogo from "../../assets/LogoJomKahwinFullBlack_clear.png";

function Footer() {
  return (
    <footer
      id="hashtag"
      className="flex flex-col text-center content-center justify-center container py-5"
    >
      <h1 className="text-black font-[gormorant] mt-10 text-xl">
        #DANISH & IQKRIANY
      </h1>

      <br></br>
      {/* Logo */}
      <div className="flex flex-col my-4 mx-auto">
        <h1 className="text-black my-1 text-xs">Dizahirkan penuh ❤️ oleh</h1>
        <a href="http://wasap.my/601127877926/Tempah-E-kad-jemputan">
          <img
            src={ImageLogo}
            width={150}
            height={150}
            alt="Logo Jom Kahwin"
          />
        </a>
      </div>
      {/* Social media */}
      <div className="mt-4">
        <h1 className="text-black my-2">Lebih lanjut</h1>
        <a
          href={"http://wasap.my/601127877926/Tempah-E-kad-jemputan"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-3xl justify-center text-black"
        >
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
