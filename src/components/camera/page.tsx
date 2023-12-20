"use client"
import React, { useCallback, useEffect } from 'react'
import styles from './page.module.css'
import Quagga from 'quagga'; // ES6

const Camera = () => {

    useEffect(() => {
        // let video: HTMLVideoElement = document.getElementById("video") as HTMLVideoElement;

        // if (navigator.mediaDevices.getUserMedia !== null) {
        //   var options = {
        //     video: {
        //         facingMode: 'environment'
        //     },
        //   };
        //   navigator.mediaDevices.getUserMedia(options)
        //     .then((stream) => {
        //         video.srcObject = stream;
        //         video.play();
                
        //         console.log(stream, "streaming");
        //     })
        //     .catch(e => {
        //         console.log("background error : " + e.name);
        //     });
        // }

        Quagga.init({
            inputStream : {
                name : "Live",
                type : "LiveStream",
                target: document.querySelector('#video')    // Or '#yourElement' (optional)
              },
              decoder : {
                readers : ["ean_reader"]
              }
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
        {/* <div className={styles.cameraGroup}>
            <video id="video"  autoPlay={true}  playsInline={true} muted={true}></video>
            <div className={styles.lineCanva}></div>
        </div> */}
        <div id="video"></div>
    </div>
  )
}

export default Camera
