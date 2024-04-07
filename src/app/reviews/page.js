"use client"
import React, { useEffect, useState } from 'react'
import Reviews from "./Reviews"
import ReviewContent from './ReviewContent'
import { Collapse } from 'antd';
import NoState from './NoState'
import styles from "./reviews.module.css";
import Image from 'next/image';
import { Checkbox } from 'antd';
import { Input } from 'antd';
import { Button, Flex } from 'antd';
import { SettingOutlined,DownOutlined,UpOutlined,StarOutlined} from '@ant-design/icons';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const Backdrop = React.createContext("")
export const BackdropUpdater = React.createContext(false)
const { TextArea } = Input;
function page() {
  const [modal,setModal] = useState(false)
  const [closed,setClosed] = useState(true)
  const [spinner,setSpinner] = useState(false)
  const [first,setFirst] = useState(false)
  const [second,setSecond] = useState(false)
  const [third,setThird] = useState(false)
  const [forth,setForth] = useState(false)
  const [fifth,setFifth] = useState(false)

  

  const checkboxObject = 
  [
    "Parking Lot","Nightlife","Hospitals","Schools","Adult Home","Free Wi-Fi","Childcare","Pet Store","Gym","Security",
    "Parking Lot","Nightlife","Hospitals","Schools","Adult Home","Free Wi-Fi","Childcare","Pet Store","Gym","Security",
    "Parking Lot","Nightlife","Hospitals","Schools"
   ]

   const [checked,setChecked] = useState({
    "Parking Lot":false,
    "Nightlife":false,
     Hospitals:false,
    "Schools":false,
    "Adult Home":false,
    "Free Wi-Fi":false,
    "Childcare":false,
    "Pet Store":false,
    "Gym":false,
    "Security":false,
   })

   const handleFirstClick = () =>{
    setFirst(true)
    setScore(1)
   }
   const handleFirstClickReverse = () =>{
    setFirst(false)
    setScore(1)
    if(second == true || third == true || forth == true || fifth == true){
      setFirst(true)
      setSecond(false)
      setThird(false)
      setForth(false)
      setFifth(false)
    }
   }
   const handleSecondClick = () =>{
    setFirst(true)
    setSecond(true)
    setScore(2)
   }
   const handleSecondClickReverse = () =>{
    setScore(1)
    setFirst(false)
    setSecond(false)
    setThird(false)
    setForth(false)
    setFifth(false)
    if(third == true || forth == true || fifth == true){
      setScore(2)
      setFirst(true)
      setSecond(true)
      setThird(false)
      setForth(false)
      setFifth(false)
    }
   }
   const handleThirdClick = () =>{
    setFirst(true)
    setSecond(true)
    setThird(true)
    setScore(3)
   }
   const handleThirdClickReverse = () =>{
    setScore(1)
    setFirst(false)
    setSecond(false)
    setThird(false)
    setForth(false)
    setFifth(false)
    if(forth == true || fifth == true){
      setScore(3)
      setFirst(true)
      setSecond(true)
      setThird(true)
      setForth(false)
      setFifth(false)
    }
   }
   const handleForthClick = () =>{
    setFirst(true)
    setSecond(true)
    setThird(true)
    setForth(true)
    setScore(4)
    
   }
   const handleForthClickReverse = () =>{
    setFirst(false)
    setSecond(false)
    setThird(false)
    setScore(1)
    setForth(false) 
    setFifth(false)
    if(fifth == true){
      setFirst(true)
      setScore(4)
      setSecond(true)
      setThird(true)
      setForth(true)
      setFifth(false)
    }
   }
   const handleFifthClick = () =>{
    setFirst(true)
    setSecond(true)
    setThird(true)
    setForth(true)
    setFifth(true)
    setScore(5)
   }
   const handleFifthClickReverse = () =>{
    setFirst(false)
    setSecond(false)
    setThird(false)
    setForth(false)
    setFifth(false)
    setScore(1)
   }

   const handleCheckboxUpdate =(e,data)=>{
      console.log(data)
   }
   const [all,setAll] = useState([])
   const [anonymous,setAnonymous] = useState(false)
   const [error,setError] = useState(false)
   const [success,setSuccess] = useState(false)

  
    const handleClose = () =>{
      setClosed(!closed)
    }

      const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setAnonymous(e.target.checked)
      }

      const genExtra = () => (
        <DownOutlined
          onClick={(event) => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
          }}
        />
      );

      const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;

  const items = [
    {
      key: '1',
      label: <p className={styles.collapseTitle}>Select Amenities</p>,
      children: <p>{text}</p>,
      showArrow: false,
      extra: genExtra(),
    }
  ];


  const [reviewText,setReviewText] = useState('')
  const [score,setScore] = useState(1)
  const [data,setData]= useState([])

  const retrace = () =>{
    setSuccess(false)
    setError(false)
  }
  const location = useSelector((state) => state.counter.location)
  

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "reviews", location), (doc) => {
       console.log("Current data: ", doc.data().reviews);
       setData(doc.data().reviews)
   });
   },[])


  const addToDB = async() =>{
    setSuccess(false)
    setError(false)
    setSpinner(true)
    const docRef = doc(db, "reviews", location);
    const docSnap = await getDoc(docRef);
    let name = anonymous == true ? "Anonymous" :"Hillary victor"
    try{
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().reviews);
  
        await setDoc(doc(db, "reviews", location), {
          reviews:[{
           amenities:[...all],
           text:reviewText,
           rateScore:score,
           name,
           likes:0,
           dislikes:0
          },...docSnap.data().reviews]
        });
        setModal(false)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        await setDoc(doc(db, "reviews", location), {
          reviews:[{
           amenities:[...all],
           text:reviewText,
           rateScore:score,
           name, 
           likes:0,
           dislikes:0
          }]
        });
        setModal(false)
        setSuccess(true)
      }
      setSuccess(true)
    }catch(err){
      setError(true)
    }

    setTimeout(retrace,5000)

    

    setSpinner(false)
  }
  return (
    <Backdrop.Provider value={modal}>
      <BackdropUpdater.Provider value={setModal}>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100vw",overflow:"hidden",position:"relative"}}>
       <Reviews noOfReviews={data.length}/>
       

       {data && data.length != 0 ?(
          <ReviewContent success={success} error={error}/>
       ):(
        <NoState />
       )}
       {/*  */}
       {modal && (
        <div className={styles.drop}>

          <div className={styles.card}>
            <div className={styles.title}>Review Location</div>
            <div className={styles.amenities}>
              <div className={styles.location}>Bonny and Clyde Street, Ajao Estate, Lagos</div>
              {/* <Collapse className={styles.collapse} ghost items={items} /> */}
              <div className={styles.dropContainer}>
                  <div className={styles.dropTop} onClick={handleClose}>
                    <div>Select Amenities</div>
                     <DownOutlined />
                  </div>
                 {!closed && ( <div className={styles.dropWrapper}>
                 
                  <div className={styles.innerDrop}>
                  {
                    checkboxObject && checkboxObject.map((data,id)=>{
                      return (
                       <Checkbox key={id} onChange={()=>{
                        setAll(prev => [
                          ...prev,data
                        ])
                       }}>
                            {data}
                          </Checkbox>
                      )
                    })
                  }
                  </div>
                 
                 </div>)}
              </div>
            </div>

           
             <div className={styles.amenities}>
             <div className={styles.location}>Rate location</div>
             <div className={styles.starContainer}>
            {first ? (
               <Image
               className={styles.ratingStar}
               src="/star.svg"
               alt="save logo"
               width={20}
               height={19.02}
               priority
               onClick={handleFirstClickReverse}
               />
            ):(
               <StarOutlined onClick={handleFirstClick} className={styles.eachUnfilledStar}/>
            )}

           {second ? (
               <Image
               className={styles.ratingStar}
               src="/star.svg"
               alt="save logo"
               width={20}
               height={19.02}
               priority
               onClick={handleSecondClickReverse}
               />
            ):(
               <StarOutlined onClick={handleSecondClick} className={styles.eachUnfilledStar}/>
            )}
            {third ? (
               <Image
               className={styles.ratingStar}
               src="/star.svg"
               alt="save logo"
               width={20}
               height={19.02}
               priority
               onClick={handleThirdClickReverse}
               />
            ):(
               <StarOutlined onClick={handleThirdClick} className={styles.eachUnfilledStar}/>
            )}
            {forth ? (
               <Image
               className={styles.ratingStar}
               src="/star.svg"
               alt="save logo"
               width={20}
               height={19.02}
               priority
               onClick={handleForthClickReverse}
               />
            ):(
               <StarOutlined onClick={handleForthClick} className={styles.eachUnfilledStar}/>
            )}
            {fifth ? (
               <Image
               className={styles.ratingStar}
               src="/star.svg"
               alt="save logo"
               width={20}
               height={19.02}
               priority
               onClick={handleFifthClickReverse}
               />
            ):(
               <StarOutlined onClick={handleFifthClick}/>
            )}
                
             </div>
             </div>


             <div className={styles.amenities}>
              <div>Write Review </div>
              <TextArea className={styles.area} rows={8} placeholder="write a review" value={reviewText} onChange={(e)=>setReviewText(e.target.value)}/>
              <div className={styles.anonymous}>
                        <Checkbox checked={anonymous} onChange={onChange}>
                             Post as Anonymous
                          </Checkbox>
                          
              </div>
             </div>

             <div className={styles.amenities}>
                <div className={styles.buttons}>
                  {spinner ? (
                     <Button disabled={reviewText == "" ? true :false } className={styles.eachButton} onClick={addToDB} type="primary">
                      <Spin
                       indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 24,
                          color:"white",
                          
                        }}
                        spin
                      /> }
                      />
                     </Button>
                  ):(
                    <Button disabled={reviewText == "" ? true :false } className={styles.eachButton} onClick={addToDB} type="primary">SUBMIT</Button>
                  )}
                 
                  <Button className={styles.eachButton} onClick={()=>setModal(false)}>CANCEL</Button>
                </div>
             </div>

           
          </div>
        </div>
       )}
    </div>
      </BackdropUpdater.Provider>
    </Backdrop.Provider>
  )
} 


export default page