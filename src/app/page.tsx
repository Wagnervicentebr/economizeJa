"use client"
import Camera from '@/components/camera/page'
import React, { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'


const mock = [
  {
    id: "064772",
    title: "Arroz Arboreo",
    lastValue: "R$ 21,50",
    imagem: 'https://m.media-amazon.com/images/I/91DzEcUcNIL._AC_SY741_.jpg'
  },
  {
    id: "010575",
    title: "Chá Leao",
    lastValue: "R$ 9,50",
    imagem: "https://www.drogariaminasbrasil.com.br/media/product/c07/cha-de-camomila-leao-com-10-saquinhos-cee.jpg"
  },
]
const Home = () => {

  const [itemEncontrado, setItemEncontrado] = useState({})

  const handdleDetectItem = (data) => {
    console.log(data);
    
    const item = mock.filter(item => {
      return item.id == data;
    })

    setItemEncontrado(item[0]);
  }


  return (
    <div>

      {!itemEncontrado.title ? 
        <Camera onDetectItem={handdleDetectItem}/>
        :
        <div className={styles.container}>
          <div>
            <span>Title: {itemEncontrado.title}</span>
          </div>
          <div>
            <span>Ultimo valor: {itemEncontrado.lastValue}</span>
          </div>
          <div>
            <Image src={itemEncontrado.imagem} alt='' width={200} height={350}/>
          </div>
        </div>
      }
    </div>
  )
}

export default Home
