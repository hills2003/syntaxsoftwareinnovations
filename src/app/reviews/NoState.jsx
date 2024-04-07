import React, { useContext } from 'react'
import styles from "./reviews.module.css";
import { Divider } from 'antd';
import Image from 'next/image';
import { Button, Input, Tooltip } from 'antd';
import { Backdrop, BackdropUpdater } from './page';

function NoState() {
  const data = useContext(Backdrop)
  const updater = useContext(BackdropUpdater)

  const handleModal = () =>{
     updater(!data)
  }

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center',position:'relative'}}>
    <Image
         className={styles.environ}
         src="/EmptyState.svg"
         alt="no state"
         width={18}
         height={16}
         priority
         />

         <span style={{marginTop:"18px",marginBottom:'44px'}}>Oops! No reviews yet.{data ?"true":"false"}</span>

         <Button onClick={handleModal} className={styles.search} type="primary">LEAVE A REVIEW</Button>
    </div>
  )
}

export default NoState