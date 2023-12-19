"use client"
import React, { useEffect } from 'react'
import styles from './page.module.css'
import Quagga from 'quagga'; // ES6

const Camera = () => {

    useEffect(() => {
        let video: HTMLVideoElement = document.getElementById("video") as HTMLVideoElement;

        if (navigator.mediaDevices.getUserMedia !== null) {
          var options = {
            video: {
                facingMode: 'environment'
            },
          };
          navigator.mediaDevices.getUserMedia(options)
            .then((stream) => {
                video.srcObject = stream;
                video.play();
                console.log(stream, "streaming");
            })
            .catch(e => {
                console.log("background error : " + e.name);
            });
        }

        Quagga.init({
            inputStream : {
              name : "Live",
              type : "LiveStream",
              target: document.querySelector('#video'),
              area: { // defines rectangle of the detection/localization area
                top: "0%",    // top offset
                right: "0%",  // right offset
                left: "0%",   // left offset
                bottom: "0%"  // bottom offset
              },
              locate : false,
              singleChannel: true
            },
            frequency: 10,
            decoder: {
                readers: [{
                    format: "ean_reader",
                    config: {
                        supplements: [
                            'ean_5_reader', 'ean_2_reader'
                        ]
                    }
                }],
                multiple: false
            },
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
      });

  return (
    <div className={styles.cameraContainer}>
        <div className={styles.cameraGroup}>
            <video id="video"  autoPlay={true}  playsInline={true} muted={true}></video>
            <div className={styles.lineCanva}></div>
        </div>
    </div>
  )
}

export default Camera
