import React from 'react'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
import img1 from '../images/shop.png'


function Contact() {
    return (

        <>
            {<NavBar />}
            <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}><h4 style={{ width: '100%', textAlign: 'center', marginBottom: "25px" }} > Send us an Email at </h4>{<Card color={"blue"} imgSrc={img1} text={"Email id: customerservice@cheese.com"} />}</div>
            <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}><h4 style={{ width: '100%', textAlign: 'center', marginBottom: "25px" }} > Call us here </h4>{<Card color={"lightblue"} imgSrc={img1} text={"Phone: 9876456754"} />}</div>
        </>
    )
}

export default Contact