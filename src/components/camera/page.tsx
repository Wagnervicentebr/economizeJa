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
                alert("Permitido");
            })
            .catch(e => {
                console.log("background error : " + e.name);
            });
        }

        Quagga.init({
            inputStream : {
              name : "Live",
              type : "LiveStream",
              target: document.querySelector('#video')    
            },
            frequency: 10,
            decoder: {
                readers: [
                    'ean_reader'
                ],
                multiple: false
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
      });

  return (
    <div className={styles.cameraContainer}>
          <video id="video" height="400" width="450" autoPlay={true}  playsInline={true} muted={true}></video>
    </div>
  )
}

export default Camera
