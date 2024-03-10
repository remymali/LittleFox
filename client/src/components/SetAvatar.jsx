import React, { useState } from 'react'
import axios from axios
import {useNavigate} from 'react-router-dom'
function SetAvatar() {

    const api='https://api.multiavatar.com/4789897'
    const navigate=  useNavigate();
    const [avatars,setAvatars]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [selectedAvatar,setSelectedAvatar]=useState(undefined)
  return (
    <FormContainer>
      <div className='title-container'>
        <h1>Pick one avatar as your profile picture</h1>
        <div className='avatars'>
            {

            }
        </div>
      </div>
    </FormContainer>
  )
}

export default SetAvatar
