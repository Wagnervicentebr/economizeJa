"use client"
import React, { useCallback, useEffect } from 'react'
import styles from './page.module.css'
import Quagga from '@ericblade/quagga2';


const Camera = () => {

    const locator = {
        patchSize: 'medium',
        halfSample: true,
        willReadFrequently: true,
    };;
    
    useEffect(() => {
        let video: HTMLVideoElement = document.getElementById("video") as HTMLVideoElement;

        if (navigator.mediaDevices.getUserMedia !== null) {
          var options = {
            video: {
                facingMode: 'environment',
                zoom: true
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
            locator,
            locate: true
          }, function(err) {
              if (err) {
                  console.log(err);
                  return
              }
              console.log("Initialization finished. Ready to start");
              Quagga.start();
          });

          Quagga.onProcessed(handleProcessed);

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


      const handleProcessed = (result) => {
        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;
        drawingCtx.font = "24px Arial";
        drawingCtx.fillStyle = 'green';
            
        if (result) {
            // console.warn('* quagga onProcessed', result);
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
                result.boxes.filter((box) => box !== result.box).forEach((box) => {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'purple', lineWidth: 2 });
                });
                
            }
            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: 'blue', lineWidth: 2 });
            
            }
            if (result.codeResult && result.codeResult.code) {
                // const validated = barcodeValidator(result.codeResult.code);
                // const validated = validateBarcode(result.codeResult.code);
                // Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: validated ? 'green' : 'red', lineWidth: 3 });
                drawingCtx.font = "24px Arial";
                // drawingCtx.fillStyle = validated ? 'green' : 'red';
                // drawingCtx.fillText(`${result.codeResult.code} valid: ${validated}`, 10, 50);
                drawingCtx.fillText(result.codeResult.code, 10, 20);
                // if (validated) {
                //     onDetected(result);
                // }
            }
        }
    };

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
