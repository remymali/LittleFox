import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
const Room = () => {
    const {roomID}=useParams()
    const { userInfo } = useSelector((state) => state.auth);
    const email = userInfo.email || '';
  const name = userInfo.name || '';

    console.log("email",email)
    console.log("name",name)
    console.log("userInfo",userInfo)
    const myMeeting=async(element)=>{
        const appId=1594163332
        const serverSecret="9a24d30d20d9f97ecf7ffcdb537bd7d5"
        const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appId,serverSecret,roomID,email,name)
        // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                  name: 'Copy link',
                  url:
                   window.location.protocol + '//' + 
                   window.location.host + window.location.pathname +
                    '?roomID=' +
                    roomID,
                },
              ],
            scenario: {
              mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
            showScreenSharingButton:true
          });
     
      

    }
    return (
        <div
          className="myCallContainer ms-auto"
          ref={myMeeting}
          style={{ width: '80vw', height: '80vh' }}
        ></div>
      );
}

export default Room