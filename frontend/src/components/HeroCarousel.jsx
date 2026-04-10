import { useState } from "react";

import vid1 from "../assets/vid/vid1.mp4";
import vid2 from "../assets/vid/vid2.mp4";
import vid3 from "../assets/vid/vid3.mp4";

export default function HeroCarousel() {
  const videos = [vid1, vid2, vid3];
  const [index, setIndex] = useState(0);

  //when video ends it goes to next
  const handleVideoEnd = () => {
    setIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="hero">

      {/*blurred background*/}
      <video
        src={videos[index]}
        autoPlay
        muted
        className="hero-bg-video"
      />

      {/*main video*/}
      <video
        key={index} //forces reload
        src={videos[index]}
        autoPlay
        muted
        onEnded={handleVideoEnd}
        className="hero-video"
      />

      {/*dots*/}
      <div className="carousel-indicators">
        {videos.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>

    </div>
  );
}