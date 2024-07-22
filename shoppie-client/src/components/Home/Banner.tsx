import React from "react";
import BannerContents from "./BannerContents";
const Banner: React.FC = () => {
  return (
    <div className="flex gap-3 justify-evenly w-full min-h-24 p-1">
      <BannerContents
        imageSrc="/images/topoffer.webp" // Path to your image
        altText="Top Offer" // Alt text for accessibility
        text="Top Offers" // Content for the <p> tag
      />
      <BannerContents
        imageSrc="/images/mobiles.webp" // Path to your image
        altText="mobiles & tablets" // Alt text for accessibility
        text="Mobiles & Tablets" // Content for the <p> tag
      />
      <BannerContents
        imageSrc="/images/fashion.webp"
        altText="fashion"
        text="Fashion"
      />
      <BannerContents
        imageSrc="/images/appliance.webp" // Path to your image
        altText="Appliance" // Alt text for accessibility
        text="Tv & Appliance" // Content for the <p> tag
      />
      <BannerContents
        imageSrc="/images/electronics.webp"
        altText="electronics"
        text="Electronics"
      />
      <BannerContents
        imageSrc="/images/kitchen.webp" // Path to your image
        altText="Top Offer" // Alt text for accessibility
        text="Home & Kitchen" // Content for the <p> tag
      />
      <BannerContents
        imageSrc="/images/travel.webp"
        altText="fashion"
        text="Travels"
      />
      <BannerContents
        imageSrc="/images/furniture.webp"
        altText="furniture"
        text="Furniture"
      />
      <BannerContents
        imageSrc="/images/grocery.webp"
        altText="fashion"
        text="Grocery"
      />
    </div>
  );
};

export default Banner;
