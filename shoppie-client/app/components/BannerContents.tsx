import Image from "next/image";
import React from "react";
import BannerContentsProps from "../interface";

const BannerContents: React.FC<BannerContentsProps> = ({
  imageSrc,
  text,
  altText,
}) => {
  return (
    //
    <div className="flex items-center justify-center p-2 w-auto rounded-lg">
      <a href="#">
        <div className="flex flex-col shadow-gray-50 items-center space-y-2">
          <Image
            src={imageSrc}
            alt={altText}
            width={64}
            height={64}
            className="object-contain"
          />
          <p className="text-sm font-medium">{text}</p>
        </div>
      </a>
    </div>
  );
};

export default BannerContents;
