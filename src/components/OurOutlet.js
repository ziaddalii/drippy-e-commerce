import React, {useState} from 'react'
import { OutletAddresses } from './../data/OutletAddresses';

import outlet from "../images/outlet/outlet.jpg"
import "../styles/our-outlet.css"
function OurOutlet() {
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
    <div className='our-outlet-section section'>
        <div className='container'>
            <div className='row col-12 d-flex justify-content-between align-items-center m-0 p-0'>
                <div className='col-md-7 justify-content-center'>
                    <img className='w-100' src={outlet}/>
                </div>
                <div className='col-md-5 justify-content-center'>
                    <div className='our-outlet-info'>
                        <h2 className='text-uppercase font-weight-bold'>our outlet</h2>
                        <p className='text-uppercase font-weight-lighter'><span className='font-weight-bold'>"drippy"</span> is proud to announce its officially found its home on august 25th 2000 we opened our first flagship store in cairo, egypt and now open daily from 11am-7pm. this store is something you need to see in person featuring a new modern, sleek, and seamless style and yet still encompasses the brand's distinct comedic language</p>
                        <button onClick={() => findClosestOutlet(latitude,longitude)} className='text-uppercase'>find the closest outlet &#8594;</button>
                        {
                            closestOutlet ?
                            <p className='text-uppercase'>your closest outlet to you is at <span className='text-white font-weight-bold'>{closestOutlet.address.city}, {closestOutlet.address.country}</span></p>
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OurOutlet