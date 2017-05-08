/**
 * Created by Administrator on 2017/4/28.
 */
function SwitchIndoorLamp(){
    this.arrMesh=[];
    this.isLock=null;
    this.tipsInfo=new GOT.TipsInfo("点击开关");
    this.count=1;
}

SwitchIndoorLamp.prototype={
    constructor:SwitchIndoorLamp,
    createIndoorLamp:function(scene,lampPosition,power,width,length,height){
        var width=width||300;
        var length=length||300;
        var height=height||300;
        var power=power||100;
        var boxGeometry=new THREE.BoxBufferGeometry(width,length,height);
        var material=new THREE.MeshBasicMaterial({
            visible:false
        });
        var lampMesh=new THREE.Mesh(boxGeometry,material);
        var pointLight=new THREE.PointLight( 0xFAE897, 1, 1000 ,2 );
        pointLight.power=power;
        lampMesh.add(pointLight);
        lampMesh.close=false;
        lampMesh.name="lamp"+this.count;
        pointLight.name="lamp"+this.count;
        this.count++;
        lampMesh.position.copy(lampPosition);
        scene.add(lampMesh);
        this.arrMesh.push(lampMesh);

    },
    pickIndoorLamp:function(raycasterPick, switchObject){
        var intersects=raycasterPick.intersectObjects(this.arrMesh);
        if(intersects.length>0){
            //console.log(intersects[0].object.name);
            this.currentPick=intersects[0].object;
            this.isLock=true;
            this.tipsInfo.showInfo();
        }else{
            this.isLock=false;
            this.currentPick=null;
            this.tipsInfo.hideInfo();
        }
    },
    eventIndoorLamp:function(){
        if(this.isLock){
            if(!this.currentPick.close){
                this.currentPick.getObjectByName(this.currentPick.name).intensity=0.0;
                this.currentPick.close=true;
            }else{
                this.currentPick.getObjectByName(this.currentPick.name).intensity=1.0;
                this.currentPick.close=false;
            }
        }
    }
};
var switchIndoorLamp=new SwitchIndoorLamp();
export default switchIndoorLamp;