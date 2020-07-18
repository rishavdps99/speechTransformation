const api=window.speechSynthesis; 

const text=document.querySelector('#text-input');
const textForm=document.querySelector('form');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const rateValue=document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchValue=document.querySelector('#pitch-value');
const body=document.querySelector('body');
// voice array

let voices=[];

const getVoices=()=>{
    voices=api.getVoices();

    // we will loop through voices and create option for each one

    voices.forEach(voice=>{
 // create options
   const option=document.createElement('option');

   // start filling option with voice and language

   option.textContent=voice.name + '('+ voice.lang+')';

   // set needed option attributes

   option.setAttribute('data-lang',voice.lang);
   option.setAttribute('data-name',voice.name);

   voiceSelect.appendChild(option);


    });
    
};

getVoices();
if(api.onvoiceschanged!==undefined){

    api.onvoiceschanged=getVoices;
}


//Speak functionality

const speak=()=>{

  
body.style.background='#141414 url(images/tenor.gif)';
body.style.backgroundRepeat='repeat-x';
body.style.backgroundSize='100% 100%';

// speaking condition    
      if(api.speaking){
          console.error('Already speaking...');
          return;
      }

      // grabbing value from the text input tag. If you do not write .value 
      // it will simply take in the tag itself

      if(text.value!==''){
           // get speak text
           // continue
          const speakText=new SpeechSynthesisUtterance(text.value);

          // speak end
          speakText.onend=e=>{

            console.log('done speaking...');
            body.style.background='#141414';
          }

          // error while speaking

          speakText.onerror=e=>{
              console.log('error ocurred') ;
         }
// selected voice

const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');

// looping through voices 

  voices.forEach(voice=>{
      if(voice.name===selectedVoice)
      {
          speakText.voice=voice;
      }
  });


  // setting pitch and rate 

  speakText.rate=rate.value;
  speakText.pitch=pitch.value;

  // speak 

  api.speak(speakText);

      }  
};



// adding event listeners 
// text form submit

textForm.addEventListener('submit',e=>{
  e.preventDefault();
  speak();
  text.blur();

});


// changing rate value

rate.addEventListener('change',e=>rateValue.textContent=rate.value);
pitch.addEventListener('change',e=>pitchValue.textContent=pitch.value);

voiceSelect.addEventListener('change',e=>speak());