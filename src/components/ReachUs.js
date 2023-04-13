import React,{useState} from 'react'
import "../styles/reach-us.css"
import photo from "../images/reach-us/photo.jpg"
import playstore from "../images/reach-us/playstore.png"
import download from "../images/reach-us/download.png"
import locationPin from "../images/reach-us/location-pin.png"
import locationPinBtn from "../images/reach-us/location-pin-btn.png"
import { OutletAddresses } from './../data/OutletAddresses';
import { Link } from 'react-router-dom';


function ReachUs() {
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
    <div className='reach-section section'>
        <div className='container'>
            <div className='row col-12 p-0 m-0 align-items-center'>
                <div className='reach-content col-md-7'>
                    <div className=''>
                        <h2 className='font-weight-bold'>reach us</h2>
                        <p className='font-weight-lighter'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra turpis sed enim hendrerit, a eleifend enim auctor.</p>
                    </div>
                    <div className='row p-0 m-0'>
                        <div className='col-sm-6 pl-0 pt-2'>
                            <img className='reach-icon' src={locationPin}/>
                            <h4 className='font-weight-bold'>outlet</h4>
                            <p className='font-weight-lighter'>check <Link className='text-underline text-primary' to={"/addresses"}>our addresses from here</Link> or you can find the closest outlet to you</p>
                            <button onClick={() => findClosestOutlet(latitude,longitude)} className='reach-btn d-flex align-items-center'>
                                <img className='mr-1' src={locationPinBtn}/>
                                <span>find now</span>
                            </button>
                            {
                                closestOutlet ?
                                <p>your closest outlet to you is at <span className='text-white font-weight-bold'>{closestOutlet.address.city}, {closestOutlet.address.country}</span></p>
                                :
                                ""
                            }
                        </div>
                        <div className='col-sm-6 pl-0 pt-2'>
                            <img className='reach-icon' src={download}/>
                            <h4 className='font-weight-bold'>download app</h4>
                            <p className='font-weight-lighter'>download our app and get our best offers</p>
                            <button className='reach-btn d-flex align-items-center'>
                                <img className='mr-1' src={playstore}/>
                                <span>download now</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='reach-img d-flex col-md-5'>
                    <img className='photo w-100' src={photo}/>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ReachUs