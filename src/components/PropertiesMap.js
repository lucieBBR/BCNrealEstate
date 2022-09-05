import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Properties from '../properties.csv'

const mapUrl = 'https://api.mapbox.com/styles/v1/luciebbr/cl7gjuddn001i15p8mip0g9hd/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibHVjaWViYnIiLCJhIjoiY2w3Z2pveHB4MDVieTNubzBnYnFmaWlsOSJ9.3lJjKxP4RT-q_Ush43Vf_g';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [47.36667, 8.55];
const zoomLevel = 13.;
const buildingTypeList = ["Residential", "Industrial", "Offices", "Commercial", "Mixed use"];
const maxPrice = [1000, 2000, 3000, 4000, 5000]
const filters = {
    buildingType: '',
    price: null,
    parking: ''
  }
 
//   Object.keys(obj).forEach((key, index) => {
//     obj[key] = obj[key] + index;
//   });

export default function PropertiesMap() {
  const [properties, setProperties] = useState(Properties);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [chosenType, setType] = useState("default");
  const [isChecked, setIsChecked] = useState(false);
  const [price, setPrice] = useState("default");
 
  

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

console.log(filters)

  const handleInputChange = (event) => {
    setType(event.target.value);
    //let filtered = false;
    // if (filteredProperties.length !== 0) {
    //    setFilteredProperties(filteredProperties.filter(p => p.BuildingType === event.target.value))
    //  } else {}
    //setFilteredProperties(properties.filter(p => p.BuildingType === event.target.value))
    filters.buildingType = event.target.value;
}

  const handleMaxPriceChange = (event) => {
    setPrice(event.target.value);
    //setFilteredProperties(filteredProperties.filter(p => p['Price/m^2'] <= event.target.value))
    filters.price = event.target.value;
  };

  const handleCheckboxChange = () => {
    if (isChecked === true) {
        setIsChecked(false)
        filters.parking = "x";
    } else {
        setIsChecked(true)
        filters.parking = "";
    };
  }

  const handleSubmit = (event) => {
    event.preventDefault()
   // if (chosenType !== "default" && price !== "default" && isChecked === true) {
        let filteredProperties = properties.filter(p =>
            p.BuildingType === filters.buildingType
            && p['Price/m^2'] < filters.price
            && p.Parking === filters.parking)
        setProperties(filteredProperties)
    
  }
    
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

        {/* Filters */}

        <div>
          <form 
           onSubmit={handleSubmit}
          >
            <div className="">
              <select
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
             
              
              
              <select
                className=""
                id="max_price"
                onChange={(e) => handleMaxPriceChange(e)}
                value={price}
              >
                <option
                  className="default"
                  disabled
                  value={'default'}
                >
                -- Max price in EUR/square meter  --
                </option>
                
                {
                maxPrice.map((m) => (
                <option
                  key={m}
                  className=""
                  value={m}
                >
                  {m}
                </option>
              ))}
              </select>

              {/* <label htmlFor="price">Price</label>
              <input 
                type="input"
                id="price"
                name="price"
                // onInput={ handleInput } 
                onChange={(e) => handleRangeChange(e)}
                value="25000"
                min="730" max="4650"
                step="1"
              /> */}
             
             
             <label htmlFor="parking">Parking</label>
              <input
                type="checkbox"
                id="parking"
                name="parking"
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(e)}
                className=""
              />

          <button
            type="submit"
            disabled = {chosenType === "default" && price === "default" && isChecked === false ? true : false}
            className=""
          >
            Filter
          </button>

          <button
            //onClick={resetFilters}
            className=""
            type="button"
            disabled = {chosenType === "default" && price === "default" && isChecked === false ? true : false}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Map */}
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
                 {/* { filteredProperties.length !== 0 ?
         filteredProperties.map(p => (
                    <Marker key={p.Coordinates} position={p.Coordinates.replace(/[^0-9\.\s]/g,"").split(" ").map(Number)} icon={blueMarker}>
                        <Popup className="PopUp">
                            <p>Price: €{p['Price/m^2']}/m&#178;</p>
                            <p>Building Type: {p.BuildingType}</p>
                            <p>Parking: {p.Parking === "x"? "YES" : "NO"}</p>
                            
                        </Popup>
                    </Marker>
                ))
            : */}
            { properties.map(p => (
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