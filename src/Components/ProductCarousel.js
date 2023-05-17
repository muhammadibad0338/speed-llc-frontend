import React from 'react'
import { Carousel } from 'react-carousel-minimal';

import { makeStyles } from "@material-ui/core/styles";


const styles = makeStyles((theme) => ({
    cntnr: {

        [theme.breakpoints.down("sm")]: {
            height: "330px !important",
        },
    }
}));

const ProductCarousel = ({ data,time,thumbnail,borderRadius }) => {

    const classes = styles();

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }

    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    return (
        <div className="App">
            <div style={{ textAlign: "center" }}>
                <div style={{
                    padding: "0 20px"
                }}  >
                    <Carousel
                        data={data}
                        time={2000}
                        width="100%"
                        height="500px"
                        captionStyle={captionStyle}
                        radius='10px'
                        slideNumber={true}
                        slideNumberStyle={slideNumberStyle}
                        captionPosition="bottom"
                        automatic={true}
                        dots={true}
                        pauseIconColor="white"
                        pauseIconSize="40px"
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                        thumbnails={true}
                        thumbnailWidth="100px"
                        sx={{
                            textAlign: "center",
                            maxWidth: "850px",
                            maxHeight: "500px",
                            margin: "0px auto",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCarousel
