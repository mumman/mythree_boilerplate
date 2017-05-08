import lights from './../basic/Lights.js';
import trackballControl from './../controls/TrackballControl.js';
import pointerlockControl from './../controls/PointerlockControl.js';
//import {TweenMax, Power2, TimelineLite} from "gsap";
//console.log(Power2);
var gui = new dat.GUI();
var guiData={
    author:'mumman',
    controls:'trackball',
    lights:true,
    reset:function(){
        this.author='mumman';
        this.controls='trackball';
        for (var i in gui.__controllers) {
            gui.__controllers[i].updateDisplay();
        }
    },
 /*   speed: 0.8,
    displayOutline: false,
    message2:"ee",
    speed1:0.2,
    message1:"22",
    maxSize:1*/

};

guiData.initGui=function(){
    gui.add(guiData, 'author');
   var controlsValue= gui.add(guiData,'controls',['trackball','pointerlook','webvr']);
    controlsValue.onChange(function(value){
        switch (value){
            case 'trackball':
                /*trackballControl.control.enabled=true;
                pointerlockControl.relasePointer();*/
                console.log(value);
                break;
            case 'pointerlook':
                /*trackballControl.control.enabled=false;
                pointerlockControl.lockPointer();*/
                console.log(value);
                break;
            case 'webvr':
                console.log(value);
                break;
        }
    });
   var switchLights= gui.add(guiData,'lights');
    switchLights.onChange(function(value){
        if(!value){
            lights.offLights();
        }else{
            lights.onLights();
        }

    });

    gui.add(guiData, 'reset').name("Reset Menu");

/*    gui.add(guiData, 'speed', -5, 5);
    gui.add(guiData, 'displayOutline');

    gui.add(guiData, 'message1', [ 'pizza', 'chrome', 'hooray' ] );
    gui.add(guiData, 'speed1', { Stopped: 0, Slow: 0.1, Fast: 5 } );

    var f2 = gui.addFolder('Letters');
    f2.add(guiData, 'maxSize').min(0).step(0.25);
    f2.add(guiData, 'message2');*/






};

export default guiData;