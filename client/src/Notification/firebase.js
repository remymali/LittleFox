// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging ,getToken} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDNMQO11KHil0Avlr4Xn3CkAKtNFdUzGn8",
  authDomain: "littlefoxpushnotification.firebaseapp.com",
  projectId: "littlefoxpushnotification",
  storageBucket: "littlefoxpushnotification.appspot.com",
  messagingSenderId: "359454662127",
  appId: "1:359454662127:web:ef11f7a63a3e6513d3aa1a",
  measurementId: "G-KWE0XYK6Q1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

export const generateToken = async ()=>{
const permission = await Notification.requestPermission();
console.log(permission)
if(permission==="granted")
{
    const token=await getToken(messaging,{
        vapidKey:'BBQQgio1UYhl_szy1YAYzPfSBTjCWQGy163EGbwNavSMsD0h6oq_DHmvdGvPUvi-y1sQPLktXIWbIEYna9KLvVU'
    })
    console.log("tokenNew",token)
}
else{
    console.log('Notification permission not granted.');
   // toast.error('You have not granted permission for notifications.');
}

}