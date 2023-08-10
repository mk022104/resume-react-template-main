import React,{useState,useEffect} from "react";
let count = 0;
const Footer = () => {
  const now = new Date().toLocaleTimeString();
  const Today =new Date().toDateString();
  const [time,setTime] = useState(now);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().locale;
  console.log(timeZone);
  useEffect(()=>{
   const timer = setInterval(()=>{
      updateTime();
    },1000);
    return ()=>{
      clearInterval(timer)
    }
  },[])
  const updateTime =()=>{
    const now = new Date().toLocaleTimeString();
    setTime(now);
    count++;
    console.log(count);
  }
  return (
    <footer className="bg-amber-950 p-4 absolute bottom-0 left-0 w-full">
      <div className="container px-4">
        <p className="text-sm text-black-900 tracking-wide text-center">
          Designed and Developed by Madhukar Reddy.:::<span class="tracking-tight md:tracking-wide text-black-900 text-center ">{time} {Today} {timeZone}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
