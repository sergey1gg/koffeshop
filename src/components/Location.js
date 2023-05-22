import React, { useCallback } from 'react'
import "../css/header.css"

const LocationItem = (props) => {
  return(
    <div className='location_item' onClick={() => props.onSelect(props.loc)}>
      <img src={props.loc.picture} alt="kiosk"/>
      <div className='kiosk_info'>
        <span className='kiosk_name'>{props.loc.name}</span><br/>
        <span className='wokr_time'> с {props.loc.start_day} до {props.loc.end_day}</span>
      </div>
    </div>
  )

}

export { LocationItem }