import { motion } from "framer-motion";
import "../../fonts.css";
// import { useWeddingCard } from "../customhooks/WeddingCardContext";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import BgTest from "../assets/bgtest.jpg";
// import E1 from "../../assets/E1.png";
// import E2 from "../../assets/E2.png";
// import E3 from "../../assets/E3.png";
// import E4 from "../../assets/E4.png";
// import E5 from "../../assets/E5.png";
// import E6 from "../../assets/E6.png";
import { useWeddingCard } from "../../customhooks/WeddingCardContext";

function AnimatedComponent() {
  const {  weddingCard } = useWeddingCard();

  return (
    <>
      <div className="">
        {/* E1 */}

        {/* KIRI BAWAH */}
        <motion.img
          // src={E3} // Replace with your flower image path
          src={weddingCard.designAnimatedKiriBawah} // Replace with your flower image path
          alt="Flower"
          className="w-[180px] h-auto  top-14 absolute right-[320px]"
          animate={{
            rotate: [0, 3, -3, 0], // Slight rotations to simulate wind
            x: [0, 4, -4, 0], // Horizontal sway
            scale: [1, 1.02, 1], // Slight scaling for a natural feel
          }}
          transition={{
            duration: 5, // Adjust duration to control speed
            repeat: Infinity, // Loop infinitely
            repeatType: "mirror", // Smooth mirroring
            ease: "easeInOut", // Smooth easing
          }}
        />

        {/* KIRI ATAS */}
        {/* E3*/}
        <motion.img
          src={weddingCard.designAnimatedKiriAtas} // Replace with your flower image path
          alt="Flower"
          className="w-[300px] h-auto -top-28 absolute right-[100px] "
          animate={{
            rotate: [0, 3, -3, 0], // Slight rotations to simulate wind
            x: [0, 4, -4, 0], // Horizontal sway
            scale: [1, 1.02, 1], // Slight scaling for a natural feel
          }}
          transition={{
            duration: 5, // Adjust duration to control speed
            repeat: Infinity, // Loop infinitely
            repeatType: "mirror", // Smooth mirroring
            ease: "easeInOut", // Smooth easing
          }}
        />

        {/* KIRI TENGAH */}
        {/* E2 */}
        <motion.img
          src={weddingCard.designAnimatedKiriTengah} // Replace with your flower image path
          alt="Flower"
          className="w-[250px] h-auto -top-16 absolute right-[260px] "
          animate={{
            rotate: [0, 3, -3, 0], // Slight rotations to simulate wind
            x: [0, 4, -4, 0], // Horizontal sway
            scale: [1, 1.02, 1], // Slight scaling for a natural feel
          }}
          transition={{
            duration: 5, // Adjust duration to control speed
            repeat: Infinity, // Loop infinitely
            repeatType: "mirror", // Smooth mirroring
            ease: "easeInOut", // Smooth easing
          }}
        />

        {/* KANAN BAWAH */}
        {/* E4 */}
        <motion.img
          src={weddingCard.designAnimatedKananBawah} // Replace with your flower image path
          alt="Flower"
          className="w-[230px] h-auto -bottom-4 absolute left-[180px]"
          animate={{
            rotate: [0, 3, -3, 0], // Slight rotations to simulate wind
            x: [0, 4, -4, 0], // Horizontal sway
            scale: [1, 1.02, 1], // Slight scaling for a natural feel
          }}
          transition={{
            duration: 5, // Adjust duration to control speed
            repeat: Infinity, // Loop infinitely
            repeatType: "mirror", // Smooth mirroring
            ease: "easeInOut", // Smooth easing
          }}
        />
        {/* KANAN ATAS */}
        {/* E6 */}
        <motion.img
          src={weddingCard.designAnimatedKananAtas} // Replace with your flower image path
          alt="Flower"
          className="w-[180px] h-auto bottom-16 absolute left-[320px]"
          animate={{
            rotate: [0, 3, -3, 0], // Slight rotations to simulate wind
            x: [0, 4, -4, 0], // Horizontal sway
            scale: [1, 1.02, 1], // Slight scaling for a natural feel
          }}
          transition={{
            duration: 5, // Adjust duration to control speed
            repeat: Infinity, // Loop infinitely
            repeatType: "mirror", // Smooth mirroring
            ease: "easeInOut", // Smooth easing
          }}
        />
        {/* KANAN TENGAH */}
        {/* E5*/}
        <motion.img
          src={weddingCard.designAnimatedKananTengah} // Replace with your flower image path
          alt="Flower"
          className="w-[250px] h-auto -bottom-10 absolute left-[290px]"
          animate={{
            rotate: [0, 3, -3, 0], // Slight rotations to simulate wind
            x: [0, 4, -4, 0], // Horizontal sway
            scale: [1, 1.02, 1], // Slight scaling for a natural feel
          }}
          transition={{
            duration: 5, // Adjust duration to control speed
            repeat: Infinity, // Loop infinitely
            repeatType: "mirror", // Smooth mirroring
            ease: "easeInOut", // Smooth easing
          }}
        />
      </div>
    </>
  );
}

export default AnimatedComponent;
