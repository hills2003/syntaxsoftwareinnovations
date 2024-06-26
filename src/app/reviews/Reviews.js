import React, { useContext, useState } from 'react'
import styles from "./reviews.module.css";
import Image from 'next/image';
import { Button, Input, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined,RightOutlined } from '@ant-design/icons';
import { Backdrop, BackdropUpdater } from './page';
import { DataContext } from '../AuthContext';
import { useSelector } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useDispatch } from "react-redux";
import { updater } from "../features/counterSlice";
function Reviews({noOfReviews}) {

  const data = useContext(Backdrop)
  const update = useContext(BackdropUpdater)
  const location = useSelector((state) => state.counter.location)
  const dispatch = useDispatch()

  const handleModal = () =>{
     update(!data)
  }

  const [place,setPlace] = useState('')

  const updateState = (d) =>{
       console.log(d)
       dispatch(updater(d.label))
  }

  return (
    <main className={styles.reviewContainer}>
        <div className={styles.nav}>
            <div className={styles.inputLeft}>
                <Image
                    className={styles.logo}
                    src="/logo.svg"
                    alt="SyntaxSoftwareInnovations Logo"
                    width={180}
                    height={37}
                    priority
                    />

                    <div className={styles.inputContainer}>
                    <GooglePlacesAutocomplete
                                apiKey="AIzaSyBGBVmYYo05JfeGAjG9gWf3mCWqAOyHijg"
                                selectProps={{
                                  place,
                                  onChange:updateState
                                }}
                                
                              />
                    </div>
            </div>

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
        </div>

        <div className={styles.reviewProp}>
             <div className={styles.upper}>
              <div className={styles.upperLeft}>
                <div className={styles.upperLeftS1}>{location}</div>
                <div className={styles.upperLeftS2}>"{noOfReviews}" {noOfReviews == 1 ?"review" : "reviews"} (People are raving about the selected location)</div>
              </div>
              <div className={styles.upperRight}>
                <Button onClick={handleModal} className={styles.search} type="primary">LEAVE A REVIEW</Button>
                
                  <Image
                      className={styles.logo}
                      src="/Button1.svg"
                      alt="save logo"
                      width={50}
                      height={50}
                      priority
                      />
               
                
                  <Image
                      className={styles.logo}
                      src="/Button2.svg"
                      alt="save logo"
                      width={50}
                      height={50}
                      priority
                      />
                
              </div>
             </div>
             <div className={styles.lower}>
                
                   <div className={styles.pills}>Schools</div>
                   <div className={styles.pills}>Hospitals</div>
                   <div className={styles.pills}>Resort Park</div>
                   <div className={styles.pills}>Shopping Malls</div>
                   <div className={styles.pills}>Airport</div>
                   <div className={styles.pills}>Train Station</div>
                   <div className={styles.pills}>Nightlife</div>
                   <div className={styles.pills}>Public Wifi</div>
                   <div className={styles.pills}>Parking Lot</div>
                   <div className={styles.pills}>Security</div>
                   <div className={styles.pills}>Public Transport</div>
                   <div className={styles.pills}>Bus Station</div>
                   <div className={styles.pills}>Quiet</div>

                  <div className={styles.right}>
                    <RightOutlined />
                  </div>
               
                
             </div>
        </div>

        
        
    </main>
  )
}

export default Reviews