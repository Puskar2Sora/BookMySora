import { useState, useEffect } from "react";

export default function useLocation() {
  const [city, setCity] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      const data = await res.json();
      setCity(data.city || data.locality || "Unknown");
    });
  }, []);

  return city;
}
