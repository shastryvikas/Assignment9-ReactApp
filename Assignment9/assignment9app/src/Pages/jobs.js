import React from 'react'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
import img1 from '../images/cheese1.jpeg'

function Jobs() {
    let items = [{ text: "Manager", color: "Purple" }, { text: "Cheese Maker", color: "Blue" }, { text: "Store Front Staff", color: "indigo" }];
    return (
        <>
            {<NavBar />}
            <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}>
                <h1 style={{ width: '100%', textAlign: 'center', marginBottom: "25px" }} >
                    We are hiring!</h1>

                <div style={{ display: 'flex', justifyContent: "space-around", width: "100%" }}>
                    {items.map((item, index) => { return <Card key={index} color={item.color} text={item.text} imgSrc={img1} /> })}
                </div></div>
        </>
    )
}

export default Jobs