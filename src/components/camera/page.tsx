"use client"
import React, { useCallback, useEffect } from 'react'
import styles from './page.module.css'
import Quagga from 'quagga'; // ES6

const Camera = () => {

    useEffect(() => {
        Quagga.init({
            inputStream : {
                name : "Live",
                type : "LiveStream",
                target: document.querySelector('#video')    // Or '#yourElement' (optional)
              },
              area: { // defines rectangle of the detection/localization area
                top: "0%",    // top offset
                right: "0%",  // right offset
                left: "0%",   // left offset
                bottom: "0%"  // bottom offset
              },
              singleChannel: false,
              constraints: {
                width: 640,
                height: 480,
                facingMode: "environment",
              },
              decoder : {
                readers : ["ean_reader"]
              },
              numOfWorkers: 4,
              frequency: 10,
            }, function(err) {
                if (err) {
                    console.log(err);
                    return
                }
                console.log("Initialization finished. Ready to start");
                Quagga.start();
            });


          Quagga.onDetected(data => {
            alert(data.codeResult.code);
            console.log(data);
          })
    }, []);

     
    
  return (
    <div className={styles.cameraContainer}>
       <div id="video"><video playsInline autoPlay></video></div>
    </div>
  )
}

export default Camera
