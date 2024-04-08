"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Content } from "next/font/google";
import { Button, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DataContext, UpdaterContext } from "./AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useDispatch } from "react-redux";
import { updater } from "./features/counterSlice";


export default function Home() {
  const libraries = ['places'];
  const dispatch = useDispatch()
  const [place,setPlace] = useState("")
  const router = useRouter()
  const update = useContext(UpdaterContext)
  const data = useContext(DataContext)
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyBGBVmYYo05JfeGAjG9gWf3mCWqAOyHijg",
  //   libraries,
  // });

  const placesRef = useRef()
  
 
  return (
    <main className={styles.main}>
        <div className={styles.container}>
             <nav className={styles.header}>
             <Image
              className={styles.logo}
              src="/logo.svg"
              alt="SyntaxSoftwareInnovations Logo"
              width={180}
              height={37}
              priority
            />

            <div className={styles.right}>
              <div className={styles.welcome}>Welcome!</div>
              <Image
                className={styles.user}
                src="/user.svg"
                alt="current user image"
                width={180}
                height={37}
                priority
              />
            </div>
             </nav>
        </div>
        <div className={styles.content}>

          <div className={styles.contentLeft}>
            <div className={styles.textContainer}>
            <div className={styles.love}>
                   Find a place you will love to live!
                </div>
                <div className={styles.through}>
                  See through the lenses of people who have
                  lived or visited the neighbourhood you might
                  have in mind.
                </div>
            </div>
                  {/* <LoadScript
                  googleMapsApiKey= "AIzaSyBGBVmYYo05JfeGAjG9gWf3mCWqAOyHijg"
                 libraries ={["places"]}
                 
                 > */}

                        
                            <Input placeholder="Enter an Address" ref={placesRef} onChange={async(e)=>{
                              setPlace(e.target.value)
                              dispatch(updater(e.target.value))
                              
                            }} prefix={<SearchOutlined />} className={styles.searchInput} />
                            
                           
                       {/* </LoadScript> */}
                       
            
            <Button disabled={place == "" ? true : false} className={styles.search} type="primary" onClick={async()=>{
              router.push('/reviews')
              }
            }>SEARCH</Button>
          </div>
         
         
          
          <div className={styles.frames}>
          <Image
              className={styles.frame1}
              src="/Frame1.svg"
              alt="frames"
              width={239}
              height={800}
              priority
            />
            <Image
              className={styles.frame2}
              src="/Frame2.svg"
              alt="frames"
              width={239}
              height={800}
              priority
            />

            <div className={styles.overlay}></div>
          </div>
        </div>
     
    </main>
  );
}
