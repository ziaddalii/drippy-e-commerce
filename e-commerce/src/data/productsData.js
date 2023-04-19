
// Products Images
import sneaker from "../images/our-products/sneaker.jpg";
import bag from "../images/our-products/bag.jpg";
import jacket from "../images/our-products/jacket.jpg";
import sunglasses from "../images/our-products/sunglasses.jpg";

// Second Hand Products Images
import secondCoat from "../images/our-products/second-hand/second-coat.jpg";
import secondDenim from "../images/our-products/second-hand/second-denim.jpg";
import secondJacket from "../images/our-products/second-hand/second-jacket.jpg";
import secondSneakers from "../images/our-products/second-hand/second-sneakers.jpg";

export const productsData = [
    {
        title:"dior sneakers",
        price: 1_450,
        img: sneaker,
        category:"shoes",
        id:"1",
    },
    {
        title:"nike sneakers",
        price: 40,
        img: secondSneakers,
        category:"shoes",
        id:"2",
        secondHand: true,
    },
    {
        title:"gucci bag",
        price: 1_500,
        salePrice: 900,
        img: bag,
        category:"accessories",
        id:"3",
    },
    {
        title:"nike jacket",
        price: 1_670 ,
        img: jacket,
        category:"jackets",
        id:"4",
    },
    {
        title:"coat",
        price: 20,
        salePrice: 10,
        img: secondCoat,
        category:"jackets",
        id:"5",
        secondHand: true,
    },
    {
        title:"leather jacket",
        price: 30 ,
        img: secondJacket,
        category:"jackets",
        id:"6",
        secondHand: true,
    },
    {
        title:"dior sunglasses",
        price: 750 ,
        img: sunglasses,
        category:"accessories",
        id:"7",
    }, 
    {
        title:"denim jacket",
        price: 15 ,
        img: secondDenim,
        category:"jackets",
        id:"8",
        secondHand: true,
    }, 
]
