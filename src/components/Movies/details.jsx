import React, { useState } from "react";
import Rating from '@mui/material/Rating';

const Details = () => {
    const [rate, setRate] = useState(3)
    return <>
        <div className="movie-card">
            <div className="container">
                <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_cover.jpg" alt="cover" className="cover" /></a>
                <div className="hero">
                    <div className="details">
                        <div className="title1">The Hobbit <span>PG-13</span></div>
                        <div className="title2">The Battle of the Five Armies</div>
                        <Rating name="simple-controlled" value={rate} onChange={(event, newValue) => {
                            setRate(newValue);
                        }}
                        />
                    </div>
                </div>
                <div className="description">
                    <div className="column1">
                        <span className="tag">action</span>
                        <span className="tag">fantasy</span>
                        <span className="tag">adventure</span>
                    </div>
                    <div className="column2">
                        <p>Bilbo Baggins is swept into a quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug. Approached out of the blue by the wizard Gandalf the Grey, Bilbo finds himself joining a company of thirteen dwarves led by the legendary warrior, Thorin Oakenshield. Their journey will take them into the Wild; through... <a href="#">read more</a></p>
                        <div className="avatars">
                            <a href="#" data-tooltip="Person 1" data-placement="top">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar1.png" alt="avatar1" />
                            </a>
                            <a href="#" data-tooltip="Person 2" data-placement="top">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar2.png" alt="avatar2" />
                            </a>
                            <a href="#" data-tooltip="Person 3" data-placement="top">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar3.png" alt="avatar3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default Details