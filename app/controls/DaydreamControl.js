/**
 * Created by Administrator on 2017/5/2.
 */
function DaydreamControl(){
    this.camera=null;
    this.control=null;
    this.vrDisplay=null;//设备的isPresenting属性用于判断是否在vr状态中
    this.pickRaycaster=new THREE.Raycaster();
    this.pickRaycaster.near=0;
    this.pickRaycaster.far=1500;

}

DaydreamControl.prototype={
    constructor:DaydreamControl,
    initControl:function(scene,renderer){
        var scope=this;
        if ( WEBVR.isAvailable() === false ) {
            document.body.appendChild( WEBVR.getMessage() );
        }

        WEBVR.getVRDisplay( function ( display ) {
            if ( display !== undefined ) {
                scope.vrDisplay = display;
                scope.camera = new THREE.WebVRCamera( display, renderer );
            }
            document.body.appendChild( WEBVR.getButton( display, renderer.domElement ) );

        } );

        var control = new THREE.DaydreamController();
        control.position.set( 0.25, - 0.5, 0 );//距离要调整
        scene.add( control );
        this.control=control;





    },
    pickRaycasterUpdate:function(){

        this.pickRaycaster.ray.origin.copy( this.control.position );
        this.pickRaycaster.ray.direction.set( 0,0,- 1).applyQuaternion ( this.control.quaternion );

    }
};
var daydreamControl=new DaydreamControl();
export default daydreamControl;