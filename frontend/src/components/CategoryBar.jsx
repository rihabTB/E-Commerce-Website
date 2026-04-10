import React from "react";

import theiereIC from "../assets/category/1000043997.png";
import tadjineIC from "../assets/category/1000043992.png";
import portegatIC from "../assets/category/1000043994.png";
import sniIC from "../assets/category/1000044002.png";
import kisanIC from "../assets/category/1000058954.png";
import mahbesIC from "../assets/category/1000044001.png";
import bakharaIC from "../assets/category/1000058955.png";
import bonboniereIC from "../assets/category/1000058956.png";
import serie4IC from "../assets/category/1000058959.png";
import fanousIC from "../assets/category/1000058953.png";
import allIC from "../assets/category/z1flu1z1flu1z1fl.png";

export default function CategoryBar({ selectedCategory, setSelectedCategory }) {
  
  const categories = [
    { name: "All", icon: allIC },
    { name: "Theiere", icon: theiereIC },
    { name: "Tadjine", icon: tadjineIC },
    { name: "Portegat", icon: portegatIC },
    { name: "Sni", icon: sniIC },
    { name: "Kisan", icon: kisanIC },
    { name: "Mahbes", icon: mahbesIC },
    { name: "Bakhara", icon: bakharaIC },
    { name: "Bonboniere", icon: bonboniereIC },
    { name: "Serie4", icon: serie4IC },
    { name: "Fanous", icon: fanousIC },
  ];

  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className={`category-item ${
            selectedCategory === cat.name ? "active" : ""
          }`}
          onClick={() => setSelectedCategory(cat.name)}
        >
          {cat.icon && (
            <img src={cat.icon} alt={cat.name} className="category-icon" />
          )}

        </div>
      ))}
    </div>
  );
}