"use client"
import React, { useEffect, useState } from 'react'
import styles from "./reviews.module.css";
import { Divider } from 'antd';
import Image from 'next/image';
import { Button, Input, Tooltip } from 'antd';
import { Alert, Space } from 'antd';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function ReviewContent({success,error}) {
  const [show,setShow] = useState(true)
  const [data,setData] = useState([])
  let location= null
  if (typeof window !== 'undefined') {
    location = localStorage.getItem("location").toLowerCase();


  }
  useEffect(()=>{
   const unsub = onSnapshot(doc(db, "reviews", location), (doc) => {
      console.log("Current data: ", doc.data().reviews);
      setData(doc.data().reviews)
  });
  },[])

  return (
    <div className={styles.reviews}>
        <div className={styles.contentLeft}>
            
           {data && data.map(data=>{
             return (
               <div className={styles.revwithdivider}>
               <div className={styles.eachReview}>
               <div className={styles.topper}>
                   <div className={styles.whoField}>
                    <Image
                        className={styles.individual}
                        src="/Ellipse.svg"
                        alt="reviewer picture"
                        width={180}
                        height={37}
                        priority
                        />
                        <div className={styles.reviewerName}>{data.name}.</div>
                        <div className={styles.date}>5 months ago</div>
                   </div>

                    <div className={styles.rateField}>
                       <Image
                            className={styles.star}
                            src="/Star.svg"
                            alt="rating star icon"
                            width={180}
                            height={37}
                            priority
                            />
                      <div className={styles.rateScore}>{data.rateScore + ".0"}</div>
                   </div>
               </div>
               <div className={styles.writeUp}>
                 {data.text}
               </div>
               <div className={styles.rateOrComment}>
                  <div className={styles.rateProp}>
                  <Image
                        className={styles.upvote}
                        src="/upVote.svg"
                        alt="upVote"
                        width={26}
                        height={22}
                        priority
                        />
                        <div>{data.likes}</div>
                  </div>
                  <div className={styles.rateProp}>
                  <Image
                        className={styles.downvote}
                        
                        src="/downVote.svg"
                        alt="downvote"
                        width={18}
                        height={16}
                        priority
                        />
                        <div>{data.dislikes}</div>
                  </div>
                  <div className={styles.rateProp}>
                  <Image
                        className={styles.comment}
                        src="/comment.svg"
                        alt="comment box"
                        width={18}
                        height={16}
                        priority
                        />
                        <div>0</div>
                  </div>
               </div>
              

            </div>
            <Divider className={styles.divide}/>
            </div>
             )
           })}
            
           
            

          
            
        </div>
        <div className={styles.contentRight}>
          <div className={styles.imgWrapper}>
                     <Image
                        className={styles.environ}
                        src="/environ.svg"
                        alt="environment"
                        width={18}
                        height={16}
                        priority
                        />
          </div>
          <div className={styles.imgWrapper}>
                     <Image
                        className={styles.environ}
                        src="/environ2.svg"
                        alt="environment"
                        width={18}
                        height={16}
                        priority
                        />
          </div>
          <div className={styles.imgWrapper}>
                     <Image
                        className={styles.environ}
                        src="/environ3.svg"
                        alt="environment"
                        width={18}
                        height={16}
                        priority
                        />
          </div>
          <div className={styles.imgWrapper}>
                     <Image
                        className={styles.environ}
                        src="/environ.svg"
                        alt="environment"
                        width={18}
                        height={16}
                        priority
                        />
                        <div className={styles.overlayImg}>VIEW MORE</div>
          </div>
        </div>

        {success && (
        <div className={styles.info}>
          <Alert message="Review submitted" type="success" showIcon />
        </div>
        )}
         {error && (
         <div className={styles.info}>
            <Alert message="failed to submit review" type="error" showIcon />
         </div>
         )}

      
        
    </div>
  )
}

export default ReviewContent