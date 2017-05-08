/**
 * Created by Administrator on 2017/4/30.
 */
import {TweenMax} from "gsap";
import trackballControl from "./TrackballControl.js";
import pointerlockControl from "./PointerlockControl.js";
import daydreamControl from "./DaydreamControl.js";

function ControlManager(){
    this.isMotion=false;
    this.currentControlName="trackball"; //trackball,pointerlock,daydream,cardboard
    this.camera=null;
    this.control=null;
    this.scene=null;
    this.renderer=null;
}

ControlManager.prototype={
    constructor:ControlManager,
    initControlManager:function(){

        //场景
        this.scene = new THREE.Scene();

        //渲染器
        var renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        //this.renderer.alpha=true;
        //所有纹理都乘以gamma??
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        //renderer.setClearColor(0xffff00, 1);
        var container = document.getElementById('webgl-container');
        container.appendChild(renderer.domElement);
        this.renderer = renderer;

        //控制器与相机
        trackballControl.initControl(this.renderer.domElement);
        pointerlockControl.initControl(this.scene);
        daydreamControl.initControl(this.scene,this.renderer);

        switch(this.currentControlName){
            case "trackball":
                this.camera=trackballControl.camera;
                this.control=trackballControl.control;
                break;
            case "pointerlock":
                this.camera=pointerlockControl.camera;
                this.control=pointerlockControl.control;
                break;
            case "daydream":
                this.camera=daydreamControl.camera;
                this.control=daydreamControl.control;
        }

    },
    handleWindowResize: function(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
        if(this.currentControlName==="trackball"){
            this.control.handleResize();
        }
        this.render();

    },
    getLastPosition:function(){
        var lastPosition=null;
        switch(this.currentControlName){
            case "trackball":
                lastPosition=this.control.object.position;
                break;
            case "pointerlock":
                lastPosition=this.control.getObject().position;
                break;
        }
      return lastPosition;
    },
    setTrackballControl:function(destination){
        var scope=this;
        var lastPosition=this.getLastPosition();
        this.camera=trackballControl.camera;
        this.control=trackballControl.control;
        //轨迹球control复位设置
        this.control.object.up.set(0,1,0);
        this.control.target.copy(new THREE.Vector3(0,0,0));
        pointerlockControl.relasePointer();
        this.currentControlName="trackball";
        this.render();
        var destination=destination;
        this.isMotion=true;
        TweenLite.fromTo(scope.control.object.position,1,
            {x:lastPosition.x, y:lastPosition.y, z:lastPosition.z},
            {x:destination.x, y:destination.y, z:destination.z,onComplete:function(){
                scope.isMotion=false;
            }});

    },
    setPointerlockControl:function(destination){
        var scope=this;
        var lastPosition=this.getLastPosition();
        this.camera=pointerlockControl.camera;
        this.control=pointerlockControl.control;
        pointerlockControl.lockPointer();
        this.control.getObject().rotation.x=0
        this.control.getObject().rotation.y=0
        this.currentControlName="pointerlock";
        this.render();
        this.isMotion=true;
        this.handleWindowResize();
        var destination=destination;
        TweenLite.fromTo(scope.control.getObject().position,1,
            {x:lastPosition.x, y:lastPosition.y, z:lastPosition.z},
            {x:destination.x, y:destination.y, z:destination.z,onComplete:function(){
                scope.isMotion=false;
            }});

    },

    switchView:function(){
        var destination=GOT[GOT.currentViewName].position;
        if(GOT.currentViewName==="view0"){
            this.setTrackballControl(destination);

        }else{
            this.setPointerlockControl(destination);
        }

    },
    eventControl:function(event){
        switch(event.keyCode){
            case 49:
            case 27:
            case 18:
                GOT.currentViewName="view0";
                document.dispatchEvent(GOT.eventSwitchView);
                break;
            case 50:
                GOT.currentViewName="view1";
                document.dispatchEvent(GOT.eventSwitchView);
                break;
            case 51:
                GOT.currentViewName="view2";
                document.dispatchEvent(GOT.eventSwitchView);
                break;
            case 52:
                GOT.currentViewName="view3";
                document.dispatchEvent(GOT.eventSwitchView);
                break;
            case 53:
                GOT.currentViewName="view4";
                document.dispatchEvent(GOT.eventSwitchView);
                break;
            case 54:
                GOT.currentViewName="view5";
                document.dispatchEvent(GOT.eventSwitchView);
                break;
            case 55:
                GOT.currentViewName="view6";
                document.dispatchEvent(GOT.eventSwitchView);
                break;
        }
    },

    render: function(){
        this.renderer.render(this.scene, this.camera);
    }

};
var controlManager=new ControlManager();
export default controlManager;