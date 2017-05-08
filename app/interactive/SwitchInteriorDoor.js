/**
 * Created by Administrator on 2017/4/27.
 */
import {TweenMax} from "gsap";
function SwitchInteriorDoor(){
    this.arrMesh=[];
    this.tipsInfo=new GOT.TipsInfo("按E开关");
    this.currentPick=null;
    this.isLock=false;
}

SwitchInteriorDoor.prototype={
    constructor:SwitchInteriorDoor,
    //各种初始,需要门已经加载到场景中才能初始
    initInteriorDoor:function(objects){
        this.arrMesh=objects||[];
        for(var i=0;i<this.arrMesh.length;i++){
            var box=new THREE.Box3();
            box.setFromObject(this.arrMesh[i]);
            this.arrMesh[i].geometry.center();

            //偏移所有几何点位置的方式改变锚点位置
            //由于门把手的存在box.getSize()计算可能不准确,需要调整下
            this.arrMesh[i].geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -box.getSize().x/2-1, 0, -box.getSize().z/2+6 ) );
            this.arrMesh[i].position.copy(box.getCenter()).x +=box.getSize().x/2+1;
            this.arrMesh[i].position.z += box.getSize().z/2-6;
            //为门添加一个判断门状态的属性
            this.arrMesh[i].close=true;

        }
    },
    //门选择锁定
    pickInteriorDoor:function(raycasterPick){
        var intersects=raycasterPick.intersectObjects(this.arrMesh);
        if(intersects.length>0){
            this.currentPick=intersects[0].object;
            this.isLock=true;
            this.tipsInfo.showInfo();
            //console.log(this.currentPick);
            //console.log("选中门")
        }else{
            this.isLock=false;
            this.tipsInfo.hideInfo();
        }
    },
    //开关门
    eventInteriorDoor:function(){
        if(this.isLock){
            if(this.currentPick.close){
                TweenLite.to(this.currentPick.rotation,2,{y:-Math.PI/2});
                this.currentPick.close=false;
                //console.log("开门");
            }else{
                TweenLite.to(this.currentPick.rotation,2,{y:0});
                this.currentPick.close=true;
                //console.log("关门");
            }
        }
    }

};
var switchInteriorDoor=new SwitchInteriorDoor();
export default switchInteriorDoor;