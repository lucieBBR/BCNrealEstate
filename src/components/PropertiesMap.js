import React, { useState, useLayoutEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import idealistaBCN from '../idealistaBCN.csv'

const NEW_PROPERTIES = idealistaBCN.map((item, i) => Object.assign(item, {id: i + 1}))
const BUILDING_TYPE_LIST = ["Flat", "Office", "Commercial"];
const MAX_PRICE = [1000, 2000, 3000, 4000, 5000, 6000, 7000]
const INIT_FILTERS = {
    buildingType: "",
    price: null,
    parking: "No"
  }

export default function PropertiesMap() {
  const [properties, setProperties] = useState(NEW_PROPERTIES);
  const [filters, setFilters] = useState(INIT_FILTERS)
  const [chosenType, setType] = useState("default");
  const [isChecked, setIsChecked] = useState(false);
  const [price, setPrice] = useState("default");
 
// console.log("result", properties.filter(p =>
//   p.BuildingType === "Office"
//   && Number(p['Price/m^2']) < 5000
//   && p.Parking === "Yes"))
// const mynum = "1.345"
// console.log("test", mynum.split(".").join(""))
//console.log(((2.900 ).toString()).split(".").join(""))
//console.log("price", properties.map(p => p.PriceForSqMeter))

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  // handle dropdown menu selection for type of property
  const handleInputChange = (event) => {
    setType(event.target.value);
    filters.buildingType = event.target.value;
    setProperties(NEW_PROPERTIES)
}
  // handle dropdown menu selection for max property price
  const handleMaxPriceChange = (event) => {
    setPrice(event.target.value);
    filters.price = Number(event.target.value);
    setProperties(NEW_PROPERTIES)
  };

  // handle checkbox changes when Parking checked/unchecked
  const handleCheckboxChange = () => {
    if (isChecked === true) {
        setIsChecked(false)
        filters.parking = "No";
        setProperties(NEW_PROPERTIES)
    } else {
        setIsChecked(true)
        filters.parking = "Yes";
        setProperties(NEW_PROPERTIES)
    };
  }

  // Submit filters and reset the properties, so the markers would change based on the filters
  const handleSubmit = (event) => {
    event.preventDefault()
   if (chosenType !== "default" && price !== "default") {
        let filteredProperties = properties.filter(p =>
          p.BuildingType === filters.buildingType
          && Number(((p.PriceForSqMeter).toString()).split(".").join("")) < filters.price
          && p.Parking === filters.parking)
        setProperties(filteredProperties)
        console.log(filters)
        console.log(filteredProperties)
        setFilters(INIT_FILTERS) 
   } else if (chosenType === "default" && price !== "default") {
        let filteredProperties = properties.filter(p =>
          Number(((p.PriceForSqMeter).toString()).split(".").join("")) < filters.price
            && p.Parking === filters.parking)
        setProperties(filteredProperties)
        console.log(filters)
        console.log(filteredProperties)
        setFilters(INIT_FILTERS)
   } else if (chosenType !== "default" && price === "default") {
        let filteredProperties = properties.filter(p =>
            p.BuildingType === filters.buildingType
            && p.Parking === filters.parking)
        setProperties(filteredProperties)
        console.log(filters)
        console.log(filteredProperties)
        setFilters(INIT_FILTERS)
   } else {
        let filteredProperties = properties.filter(p => p.Parking === filters.parking)
        setProperties(filteredProperties)
        console.log(filters)
        console.log(filteredProperties)
        setFilters(INIT_FILTERS)
   }
  }

  // Reset filters
  const resetFilters = (event) => {
    setProperties(NEW_PROPERTIES)
    setType("default")
    setPrice("default")
    setIsChecked(false)
  }
    
    //insert marker style from Github https://github.com/pointhi/leaflet-color-markers
    let blueMarker = new L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
    shadowSize: [41, 41]
    });

    return (
      <div id="mapSection" className="MapWithFilters">

        {/* Filters */}
        <div className="LeftColumn">
          <div className="Headings">
            <h2>Find the ideal property in</h2>
            <h3>BARCELONA</h3>
          </div>
          
          <form className="FiltersForm" onSubmit={handleSubmit}>
              <h4>Lets have a look...</h4>
              {/* Select building type  - dropdown menu  */}
              <label htmlFor="select_type">What type of property are you looking for?</label>
              <select
                id="select_type"
                onChange={(e) => handleInputChange(e)}
                value={chosenType}
              >
                <option
                  className="default"
                  disabled
                  value={'default'}
                >-- Choose a building type --
                </option>
                
                {BUILDING_TYPE_LIST.map((t) => (
                <option
                  key={t}
                  className=""
                  value={t}
                >{t}
                </option>
                ))}
              </select>
             
             {/* Select max price - dropdown menu  */}
              <label htmlFor="selemax_price">What is the maximum price you want to pay? (in €/m&#178;)</label>
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
                -- Max price in EUR per square meter  --
                </option>
                
                {MAX_PRICE.map((m) => (
                <option
                  key={m}
                  className=""
                  value={m}
                >
                  {m}
                </option>
              ))}
              </select>
             
             {/* Parking option - Checkbox */}
             <label htmlFor="parking">Do you need a parking?</label>
              <input
                type="checkbox"
                id="parking"
                name="parking"
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(e)}
              />

             {/* Filter and Reset buttons to submit or reset filters */}
             <div className='buttons'>
              <button
                type="submit"
                id="submitButton"
                >Filter
              </button>

              <button
                onClick={resetFilters}
                type="button"
                id="resetButton"
                >Reset
              </button>
             </div>
           </form>
        </div>
      
      
      {/* Map */}
     
        <div className='Map'>
            {/* Show Map at coordinates: center and with given zoom */}
            <Map
              center={[41.390205, 2.154007]}
              zoom={13}
            >
            
            {/* Display the tiles */}
            <TileLayer
                attribution={'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
                url={'https://api.mapbox.com/styles/v1/luciebbr/cl7qjsagm002y15oba7393t3q/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibHVjaWViYnIiLCJhIjoiY2w3Z2pveHB4MDVieTNubzBnYnFmaWlsOSJ9.3lJjKxP4RT-q_Ush43Vf_g'}
            />

            {/* Map through properties and display markers on given coordinates */}
            { properties.map(p => (
            // <Marker key={p.id} position={p.Coordinates.replace(/[^0-9\.\s]/g,"").split(" ").map(Number)} icon={blueMarker}>
            <Marker key={p.id} position={[p.Latitude, p.Longitude]} icon={blueMarker}>
                    <Popup className="PopUp">
                        <p>Price: €{p.PriceForSqMeter}/m&#178;</p>
                        <p>Building Type: {p.BuildingType}</p>
                        <p>Parking: {p.Parking === "Yes"? "YES" : "NO"}</p>
                        
                    </Popup>
                </Marker>
            ))
            
            }
            </Map>
         </div>
    </div>
  );
};