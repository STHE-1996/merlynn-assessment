"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import NavBar from "../navBar/page";

const DrinkRecommended = () => {
  const [recommendation, setRecommendation] = useState<any>(null);
  useEffect(() => {
    
    const storedRecommendation = sessionStorage.getItem('recommendation');
    
    if (storedRecommendation) {
      setRecommendation(JSON.parse(storedRecommendation));
    }
  }, []);

  // Define the image paths based on the decision
  const getImageSrc = (decision: string) => {
    switch (decision) {
      case "Red Cappuccino":
        return "https://firebasestorage.googleapis.com/v0/b/ziontimeline.appspot.com/o/Picture4.png?alt=media&token=4b7dd616-22aa-4d42-ae64-dd0d8a24b134"; // Change to actual image URL
      case "Espresso":
        return "https://firebasestorage.googleapis.com/v0/b/ziontimeline.appspot.com/o/Picture5.png?alt=media&token=dbda8fa9-8e6f-4586-a7d2-28e812f0e087"; // Change to actual image URL
      case "Cappuccino":
        return "https://firebasestorage.googleapis.com/v0/b/ziontimeline.appspot.com/o/Picture6.png?alt=media&token=91e1af43-ecae-4de3-a6a2-4616e0378421"; // Change to actual image URL
      case "Water / Fruit Juice":
        return "https://firebasestorage.googleapis.com/v0/b/ziontimeline.appspot.com/o/Picturejuice.png?alt=media&token=5240b054-489e-46c6-a888-6adb9bb1efe3"; // Change to actual image URL
      case "Fizzy Drink":
        return "https://firebasestorage.googleapis.com/v0/b/ziontimeline.appspot.com/o/Picture3.png?alt=media&token=d10314ac-a872-45bc-93bf-0cbf46608846"; // Change to actual image URL
      case "Milkshake":
        return "https://firebasestorage.googleapis.com/v0/b/ziontimeline.appspot.com/o/Picture41.png?alt=media&token=777e941a-9edd-4ae7-ba24-9d1c6dcb45a8"; // Change to actual image URL
      default:
        return "https://example.com/default-image.png"; 
    }
  };
  return (
    <>
        {/* Include the NavBar here */}
        <NavBar />
    <Card className="relative  min-h-screen flex items-center justify-center">
      {/* Corner Images */}
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ziontimeline.appspot.com/o/Picture4.png?alt=media&token=4b7dd616-22aa-4d42-ae64-dd0d8a24b134"
        alt="Top Left Decoration"
        className="absolute top-0 left-0 w-80 h-60"
      />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ziontimeline.appspot.com/o/Picturemilk.png?alt=media&token=876d8cfc-5a43-4162-919f-04c8a81f542d"
        alt="Top Right Decoration"
        className="absolute top-0 right-0 w-80 h-60"
      />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ziontimeline.appspot.com/o/Picture1.png?alt=media&token=540e480e-de19-4107-809a-5e25d4327f00"
        alt="Bottom Left Decoration"
        className="absolute bottom-0 left-0 w-100 h-60"
      />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ziontimeline.appspot.com/o/Picturejuice.png?alt=media&token=5240b054-489e-46c6-a888-6adb9bb1efe3"
        alt="Bottom Right Decoration"
        className="absolute bottom-0 right-0 w-80 h-70"
      />

      
      <Card className="p-10  shadow-lg rounded-lg w-[90%] max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-6">
         Recommended Drink
        </h1>

      
        <div className="flex flex-col items-center justify-center bg-cream text-center p-6 rounded-lg shadow-lg">
      {recommendation ? (
        <>
          <img
            src={getImageSrc(recommendation.decision)}
            alt={recommendation.decision}
            className="w-40 h-40 object-cover mb-4"
          />
          <h2 className="text-3xl font-bold text-brown-700 mb-2">{recommendation.decision}</h2>
          <div className="text-4xl font-bold text-green-700 mb-4">$10</div>
          <Button>
            Buy Now
          </Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>

        
        <div>
         
        </div>
      </Card>
    </Card>
    </>
  );
};
export default DrinkRecommended;
