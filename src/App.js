import React, {useRef, useLayoutEffect} from 'react';

import './App.css';



function App() {
    const aliceS = useRef(null);
    const ground = useRef(null);
    const bground = useRef(null);
  useLayoutEffect(() => {

      var spriteFrames = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-100%)' }   
      ];

      var alice = aliceS.current.animate(
        spriteFrames, {
          easing: 'steps(7, end)',
          direction: "reverse",
          duration: 500,
          playbackRate: 1,
          iterations: Infinity
        });

      setInterval( function() {
        if (alice.playbackRate > .4) {
          alice.playbackRate -= .1;
          adjustSceneryPlayback();
        } 
      }, 3000);


      var sceneryFrames =   [
        { transform: 'translateX(100%)' },
        { transform: 'translateX(-100%)' }   
      ];
      
      var sceneryTimingBackground = {
        duration: 36000,
        iterations: Infinity
      };
      
      var sceneryTimingForeground = {
        duration: 12000,
        iterations: Infinity
      };

      var foregroundMovement = ground.current.animate(sceneryFrames, sceneryTimingForeground);
      var backgroundMovement = bground.current.animate(sceneryFrames, sceneryTimingBackground);

      var sceneries = [foregroundMovement, backgroundMovement];

      var adjustSceneryPlayback = function() {
        console.log(alice.playbackRate)
        if (alice.playbackRate < .8) {
          sceneries.forEach(function(anim) {
            anim.playbackRate = alice.playbackRate/2 * -1;
          });
        } else if (alice.playbackRate > 1.2) {
          sceneries.forEach(function(anim) {
            anim.playbackRate = alice.playbackRate/2;
          });
        } else {
          sceneries.forEach(function(anim) {
            anim.playbackRate = 0;    
          });
        }   
      }
      adjustSceneryPlayback();

      const goFaster = () => {
        alice.playbackRate += 0.1;
        adjustSceneryPlayback();
      }
  
      window.addEventListener("click", goFaster);
  })

  
  

  return (
    <div className="container">
      <div className="sky"></div>
      
      <div className="earth">
        <div className="red-queen_and_alice" >
            <img className="red-queen_and_alice" ref={aliceS}  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" alt=" " />
        </div>
      </div>>
      
      <div className="scenery" id="foreground" ref={ground} >
        <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" alt=" "/>
      </div>

      <div className="scenery" id="background1" ref={bground}>
        <img className="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" alt=" " />
        <img className="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" alt=" " />
        <img className="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" alt=" " />
      </div>
    </div>
  );
}

export default App;
