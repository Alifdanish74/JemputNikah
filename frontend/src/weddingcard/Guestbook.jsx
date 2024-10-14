import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../fonts.css";
import { weddingWishes } from "./component/weddingwish";

function Guestbook() {

    const settings = {
        arrow: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
      };
    
      return (
        <div className="p-6 pt-3 text-center main-card text-black justify-center items-center">
          <h1 className="pb-3 text-xl font-['Cinzel'] opacity-70"> GUESTBOOK</h1>
          <div className="p-4">
            <Slider {...settings}>
              {weddingWishes.map((data, index) => (
                <div key={index}>
                  <p className="text-center p-4 text-lg fontType-4 text-black font-extralight">
                    {data.weddingWish}
                  </p>
                  <p className="text-center text-sm text-black font-light">
                    -{data.name}-
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      );
}

export default Guestbook