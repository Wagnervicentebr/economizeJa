"use client"
import React, { useCallback, useEffect } from 'react'
import styles from './page.module.css'
import Quagga from '@ericblade/quagga2';


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
             
            },
            frequency: 10,
            decoder: {
                readers: ["ean_reader"],
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
            const err = getMedianOfCodeErrors(data.codeResult.decodedCodes);
            // if Quagga is at least 75% certain that it read correctly, then accept the code.
            if (err < 0.25) {
                alert(data.codeResult.code);
                console.log(data);
            }
          })
      });

      function getMedian(arr) {
        const newArr = [...arr]; // copy the array before sorting, otherwise it mutates the array passed in, which is generally undesireable
        newArr.sort((a, b) => a - b);
        const half = Math.floor(newArr.length / 2);
        if (newArr.length % 2 === 1) {
            return newArr[half];
        }
        return (newArr[half - 1] + newArr[half]) / 2;
    }
    
    function getMedianOfCodeErrors(decodedCodes) {
        const errors = decodedCodes.flatMap(x => x.error);
        const medianOfErrors = getMedian(errors);
        return medianOfErrors;
    }


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
