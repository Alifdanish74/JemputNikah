/* eslint-disable react/prop-types */
import { Button } from "flowbite-react";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      console.log("Copied to clipboard:", content);

      // Reset isCopied after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      setIsCopied(false);
      console.error("Unable to copy to clipboard:", error);
    }
  };

  return { isCopied, copyToClipboard };
};

const CopyToClipboardButton = ({ content }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <div>
      <Button onClick={() => copyToClipboard(content)} size="xs" outline>
        {isCopied ? "Copied!" : <FaRegCopy className="text-lg" />}
      </Button>
    </div>
  );
};

export default CopyToClipboardButton;
