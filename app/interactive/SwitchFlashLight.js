/**
 * Created by Administrator on 2017/4/28.
 */
function SwitchFlashLight(){
    this.spotLight=null;
    this.targetObject=null;

}
SwitchFlashLight.prototype={
    constructor:SwitchFlashLight,
    initFlashLight: function(scene){
        var spotLight=new THREE.SpotLight(0xffffff);
        spotLight.angle = Math.PI / 10;
        spotLight.intensity=0;
        spotLight.penumbra = 0.2;
        spotLight.decay = 2;
        spotLight.distance = 5000;
        this.spotLight=spotLight;
        this.targetObject=new THREE.Object3D();
        scene.add(this.spotLight);
        scene.add(this.targetObject);

    },
    motionFlashLight: function(cameraDirection, controlPosition){
        this.targetObject.position.copy(cameraDirection);
        this.targetObject.position.add(controlPosition);
        this.spotLight.target=this.targetObject;
        this.spotLight.position.copy( controlPosition );
    },
    eventFlashLight: function(){
        if(this.spotLight.intensity>0){
            this.spotLight.intensity=0;
        }else{
            this.spotLight.intensity=3;
        }
    }
};
var switchFlashLight=new SwitchFlashLight();
export default switchFlashLight;