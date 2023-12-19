"use client"
import React, { useEffect } from 'react'
import styles from './page.module.css'

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
      });

  return (
    <div className={styles.cameraContainer}>
          <video id="video" height="400" width="450" autoPlay></video>
    </div>
  )
}

export default Camera
