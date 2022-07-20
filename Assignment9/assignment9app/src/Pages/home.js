import React from 'react'
import NavBar from '../components/NavBar'
import Card from '../components/Card'
import img1 from '../images/cheese1.jpeg'
import img2 from '../images/cheese2.jpg'
import img3 from '../images/cheese3.jpeg'
import img4 from '../images/cheese4.jpeg'



function Home() {
    let items = [{ text: "American Cheese", color: "Purple", img: img1 }, { text: "Burrata Cheese", color: "Blue", img: img2 }, { text: "Cheddar Cheese", color: "indigo", img: img3 }, { text: "Mozzerella Cheese", color: "pink", img: img4 }];
    return (
        <>
            {<NavBar />}
            <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}>
                <h1 style={{ width: '100%', textAlign: 'center', marginBottom: "25px" }} >
                    Choose from a wide range of cheese from all over the world</h1>
                <h5 style={{ width: '100%', textAlign: 'center', marginBottom: "25px" }} >
                    Get it delivered start to your door step in 3 hours</h5>
                <div style={{ display: 'flex', justifyContent: "space-around", width: "100%" }}>
                    {items.map((item, index) => { return <Card key={index} color={item.color} text={item.text} imgSrc={item.img} /> })}
                </div></div>
        </>
    )
}

export default Home