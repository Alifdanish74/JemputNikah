import { WeddingCardProvider } from "../customhooks/WeddingCardContext";
import BaseWeddingCard from "./BaseWeddingCard";

function BottomBase() {
  return (
    <WeddingCardProvider>
      <div>
        <BaseWeddingCard />
      </div>
    </WeddingCardProvider>
  );
}

export default BottomBase;
