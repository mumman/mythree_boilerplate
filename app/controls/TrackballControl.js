function TrackballControl(){
    this.control = null;
    this.camera= null;
    this.pickRaycaster=new THREE.Raycaster();
}
TrackballControl.prototype={
    constructor:TrackballControl,
    initControl:function(domElement){
        //初始化相机
        var fieldOfView, aspectRatio, nearPlane, farPlane;
        aspectRatio = window.innerWidth/window.innerHeight;
        fieldOfView = 75;
        nearPlane = 1;
        farPlane = 100000;
        var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        this.camera=camera;
        //初始控制器
        var control = new THREE.TrackballControls(this.camera,domElement);
        control.rotateSpeed = 1.0;
        control.zoomSpeed = 3;
        control.panSpeed = 0.8;
        control.noZoom = false;
        control.noPan = false;
        control.staticMoving = true;
        control.dynamicDampingFactor = 0.3;
        control.keys = [65, 83, 68];
        //control.object.position.copy(this.initialPosition);
        control.object.position.copy(GOT.view0.position);
        this.control = control;
    },

    //选择射线更新
    raycasterUpdate1:function(mouse){
        this.pickRaycaster.setFromCamera(mouse,this.camera);
    }
};
var trackballControl=new TrackballControl();
export default trackballControl;
