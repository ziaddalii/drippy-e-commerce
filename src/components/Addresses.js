import React, {useState, useEffect}from 'react'
import { OutletAddresses } from './../data/OutletAddresses';
import locationPinBtn from "../images/reach-us/location-pin.png"
import "../styles/addresses.css"
function Addresses() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [closestOutlet, setClosestOutlet] = useState(null);
    const getUserLocation = () =>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            error => {
                console.error(error);
            }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }
    
    useEffect(() => {
        console.log(closestOutlet);
      }, [closestOutlet]);
  
    const findClosestOutlet = (latitude, longitude) => {
        getUserLocation()
        const R = 6371; // Radius of the earth in km
        const distances = OutletAddresses.map((address) => {
          const lat1 = address.latitude;
          const lon1 = address.longitude;
          const lat2 = latitude;
          const lon2 = longitude;
          const dLat = (lat2 - lat1) * Math.PI / 180;
          const dLon = (lon2 - lon1) * Math.PI / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c; // Distance in km
          return {
            address,
            distance,
          };
        });
        const closestOutlet = distances.reduce((acc, cur) => {
          return cur.distance < acc.distance ? cur : acc;
        });
        setClosestOutlet(closestOutlet);

      };
  return (
    <div className='section mt-5'>
        <div className='container'>
            <h2 className='text-uppercase font-weight-bold'>our addresses</h2>
            <ul className='px-4'>
            {
                OutletAddresses.map((address) => {
                    return (
                        <li className='text-uppercase' key={address.id}>{address.city}, {address.country}</li>
                    )
                })
            }
            </ul>
            <button onClick={() => findClosestOutlet(latitude,longitude)} className='addresses-btn d-flex align-items-center'>
                <img className='mr-1' src={locationPinBtn}/>
                <span className='text-uppercase text-white'>find now</span>
            </button>
        {
            closestOutlet ?
            <p className='text-uppercase'>your closest outlet to you is at <span className='font-weight-bold'>{closestOutlet.address.city}, {closestOutlet.address.country}</span></p>
            :
            ""
        }  
        </div>
    </div>
  )
}

export default Addresses