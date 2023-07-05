const boxs = document.querySelectorAll('.bottom span');
const charger = document.querySelector('.charger h2');
const plug = document.querySelector('.fa-usb');
const bubbles = document.querySelector('.bubbles');

let isCharging;


//Battery
const getBattery = () => {
   navigator.getBattery()
   .then(battery => {
      batteryStatus(battery);
   });
};

window.addEventListener('load', getBattery);


//Get Battery Status
const batteryStatus = (battery) =>{
   //Battery Percentage
   const currentCharge = parseInt(battery.level * 100) + '%';
   
   //Charging Status
   battery.charging ? isCharging = true : isCharging = false;
   
   //COonnect Or Disconnect Event
   battery.ondischargingtimechange = getBattery;
   
   //Battery Level Change Event
   battery.onlevelchange = getBattery;
   
   //Next Call
   batteryPercentage(currentCharge);
   
};



//Checking Percentage
const batteryPercentage = (percent) => {
   //Full Charge
   if (percent == '100%') {
      return setBoxes(percent, 'full');
   };
   
   if (percent > '0%' && percent <= '20%') {
      setBoxes(percent, 4);
   } else if (percent > '20%' && percent <= '40%') {
      setBoxes(percent, 3);
   } else if (percent > '40%' && percent <= '60%') {
      setBoxes(percent, 2);
   } else if (percent > '60%' && percent <= '80%') {
      setBoxes(percent, 1);
   } else if (percent > '80%' && percent <= '99%') {
      setBoxes(percent, 0);
   };
   
};


//Boxs in Battery 
const setBoxes = (per, count) => {
   boxs.forEach((box, i) => {
      if (!isNaN(count)) {
         if (i < count) {
            box.style.display = 'none';
         } else {
            if (i === count) {
               chargingTime(box, per);
            };
         };
      
      } else {
         box.style.background = '#278E34';
         charger.innerText = 'Full Charge' + per;
      };
   });
};


//plug in or Not
const chargingTime = (box, percent) => {
   if (isCharging) {
      //When Charger Connect
      charger.innerText = 'Charging ' + percent;
      plug.style.display = 'inline';
      bubbles.classList.add('animate');
      box.classList.add('charging');
   } else {
      //When Charger Disconnect
      charger.innerHTML = `<span style="font-size: 37px">${percent}</span>`;
      plug.style.display = 'none';
      bubbles.classList.remove('animate');
      box.classList.remove('charging');
   };
   
};

//Kshapi