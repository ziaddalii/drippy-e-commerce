import React, {useEffect,useState} from 'react'
import "../styles/favs.css";
import { useProducts } from '../contexts/ProductsContext';
 


const Favs = React.forwardRef(({className }, ref) =>{
  const {favorites, removeFromFavs} = useProducts();

  const [favsEmpty, setFavsEmpty] = useState(true)
  useEffect(() => {
    if (favorites.length !== 0) {
        setFavsEmpty(false)
    }else{
        setFavsEmpty(true)
    }
  }, [favorites])

  return (
    <div ref={ref} className={`favs ${className}`}>
      <div>{
      favsEmpty ?
      <span className='d-flex justify-content-center'>your favs is empty!!</span>
      :
        <div>
          <div className='favs-table d-flex col-12 align-items-center justify-content-start'>
            <span className='col-7 p-0 mr-1'>product:</span>
            <span className='col-3 p-0 mr-1'>price:</span>
          </div>
          {favorites.map((favsItem) => {
            return (
              <div className='favs-item d-flex col-12 align-items-center justify-content-start' key={favsItem.id}>
                <div className='d-flex align-items-center col-7 p-0 mr-1'>
                  <img className='favs-img' src={favsItem.img} alt={favsItem.title}/>
                  <span className='favs-title'>{favsItem.title}</span>
                </div>
                <span className='favs-price col-3 p-0 mr-1'>EGP {favsItem.salePrice ? favsItem.salePrice : favsItem.price}</span>
                <div className='col-1 p-0'>
                  <button onClick={() => removeFromFavs(favsItem)} className='remove-item-btn'>&#10005;</button>
                </div>
              </div>
            )
          })}
        </div>
      }
      </div>

    </div>
  );
})
 
 export default Favs