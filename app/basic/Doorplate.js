/**
 * Created by Administrator on 2017/4/28.
 */
function Doorplate(){
    this.doorplateMesh=null;
    this.isLock=false;
    this.signalGroup=null;
}

Doorplate.prototype={
    constructor:Doorplate,
    initDoorplate: function(scene,doorplatePosition){
        var jsonPath="models/doorplate.json";
        GOT.jsonLoader(jsonPath,scene);
        this.doorplateMesh=scene.getObjectByName("doorplate");
        this.doorplateMesh.position.copy(doorplatePosition);

        //提醒标记
        var cube = new THREE.Mesh( new THREE.BoxGeometry( 5, 10, 5 ), new THREE.MeshBasicMaterial( {
            color: 0x00ff00,
            wireframe:true
        } ) );
        var cone = new THREE.Mesh( new THREE.ConeGeometry( 5, 10, 4 ), new THREE.MeshBasicMaterial( {
            color: 0xffff00,
            wireframe:true
        } ) );
        cone.position.y=-10;
        cone.rotateX(Math.PI);
        cone.rotateY(Math.PI/4);

        var group=new THREE.Group();
        group.add(cube,cone);
        this.signalGroup=group;
        this.signalGroup.position.set(doorplatePosition.x,doorplatePosition.y+500,doorplatePosition.z);



    },
    pickDoorplate: function(raycasterPick){
        var intersects=raycasterPick.intersectObjects([this.doorplateMesh]);
        if(intersects.length>0){
            // console.log("选择门牌");
            this.isLock=true;
            this.doorplateMesh.material.materials[1].color=new THREE.Color(0xff0000);

        }else{
            this.isLock=false;
            this.doorplateMesh.material.materials[1].color=new THREE.Color(0x051A07);
        }


    },
    doorplateAnimation: function(time){
        this.signalGroup.rotation.y +=0.1;
        this.signalGroup.children[0].position.y = 10*Math.sin(time);
        this.signalGroup.children[1].position.y = -12+12*Math.sin(time);
    },
    eventDoorplate: function(){
        if(this.isLock){
            // window.open ('http://weibo.com/u/1295998082', '', 'height=512, width=1024, top=0,left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=no,location=yes, status=yes')
            window.open('http://weibo.com/u/1295998082','','height=512,width=1024,scrollbars=yes,status=yes,menubar=yes');
        }
    }
};
var doorplate=new Doorplate();
export default doorplate;