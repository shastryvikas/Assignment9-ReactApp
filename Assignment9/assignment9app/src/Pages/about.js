import React from 'react'
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import img1 from '../images/shop.png'

function About() {
    return (<>
        {<NavBar />}
        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}>
            <h4 style={{ width: '100%', textAlign: 'center', marginBottom: "25px" }} >
                Support your local cheese shop and get special access to discounts</h4>
            <p style={{ width: "100%", textAlign: "center" }}>Get your own premium membership and become a VIP</p>
            {<Card color={"green"} imgSrc={img1} text={"10 Davis Ave, Brookline MA"} />}
        </div >
    </>
    )
}

export default About