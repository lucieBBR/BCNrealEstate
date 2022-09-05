import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Properties from '../properties.csv'

const mapUrl = 'https://api.mapbox.com/styles/v1/luciebbr/cl7gjuddn001i15p8mip0g9hd/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibHVjaWViYnIiLCJhIjoiY2w3Z2pveHB4MDVieTNubzBnYnFmaWlsOSJ9.3lJjKxP4RT-q_Ush43Vf_g';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [47.36667, 8.55];
const zoomLevel = 13.;
const buildingTypeList = ["Residential", "Industrial", "Offices", "Commercial", "Mixed use"];

function PropertiesMap() {
  const [chosenType, setType] = useState("default");


  const handleInputChange = (event) => {
    setType(event.target.value); 
  };
    
    // https://github.com/pointhi/leaflet-color-markers
    let blueMarker = new L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
    shadowSize: [41, 41]
    });

    return (
      <div className='PropertiesMap'>
        <div>
          <form 
          //</div>onSubmit={handleSubmit}
          >
            <div className="">
              <select
                require="true"
                className=""
                id="select_type"
                onChange={(e) => handleInputChange(e)}
                value={chosenType}
              >
                <option
                  className="default"
                  disabled
                  value={'default'}
                >
                -- Choose a building type --
                </option>
                
                {
              buildingTypeList.map((t) => (
                <option
                  key={t}
                  className=""
                  value={t}
                >
                  {t}
                </option>
              ))}
              </select>

          <button
            type="submit"
            //disabled = {chosenType === "default" ? true : false}
            className=""
          >
            Filter
          </button>
          <button
            //onClick={resetFilteredOffersCb}
            className=""
            type="button"
          >
            Reset
          </button>
        </div>
      </form>
      </div>
            <div>
                <Map
                    center={mapCenter}
                    zoom={zoomLevel}
                >
                <TileLayer
                    attribution={stamenTonerAttr}
                    url={mapUrl}
                />
                 {
         Properties.map(p => (
                    <Marker key={p.Coordinates} position={p.Coordinates.replace(/[^0-9\.\s]/g,"").split(" ").map(Number)} icon={blueMarker}>
                        <Popup className="PopUp">
                            <p>Price: €{p['Price/m^2']}/m&#178;</p>
                            <p>Building Type: {p.BuildingType}</p>
                            <p>Parking: {p.Parking === "x"? "YES" : "NO"}</p>
                            
                        </Popup>
                    </Marker>
                ))
            }
                </Map>
            </div>
    </div>
    );
  
};

export default PropertiesMap;
