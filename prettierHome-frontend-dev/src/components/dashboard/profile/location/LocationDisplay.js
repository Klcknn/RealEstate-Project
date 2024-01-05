import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
const EUROPE = [48.46973457587732, 21.203613281250004];
const LocationDisplay = ({ location, style, adverts }) => {
  const [mapLocation, setMapLocation] = useState(null);
  const mapZoom = adverts ? 5 : 15;

  useEffect(() => {
    if (location) {
      setMapLocation([location.lat, location.lng]);
    } else {
      setMapLocation(EUROPE);
    }
    return () => {
      setMapLocation(null);
    };
  }, [location]);


  const prettierMarker = new Icon({
    iconUrl: require("./marker/prettier-marker-sm.png"),
    iconRetinaUrl: require("./marker/prettier-marker-lg.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowSize: [40, 40],
    shadowAnchor: [12, 40],
  });

  const advertMarkers = () => {
    return (
      <>
        {
          adverts && adverts.map((advert, index) => (
            <Marker key={index}
              position={[advert.location?.lat, advert.location?.lng]}
              icon={prettierMarker}
            >
              <Popup className="advert-popup">
                <p style={{
                  margin: 0,
                  width: "100px",
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                }}
                >
                  {advert.title}
                </p>
              </Popup>
            </Marker>
          ))
        }
      </>
    )
  }

  return (
    <>
      {mapLocation &&
        <MapContainer
          className="display-map-container"
          center={mapLocation}
          zoom={mapZoom}
          scrollWheelZoom={true}
          style={style || { height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {
            adverts
              ?
              <>
                {advertMarkers()}
              </>
              :
              <Marker position={location} icon={prettierMarker}>
                <Popup>Location of this advert</Popup>
              </Marker>
          }
        </MapContainer>
      }
    </>
  );
};

export default LocationDisplay;
