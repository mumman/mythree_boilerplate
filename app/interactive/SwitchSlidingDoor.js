/**
 * Created by Administrator on 2017/4/27.
 */
function SwitchSlidingDoor(){
    this.arrMesh=[];
    this.isLock=false;
    this.tipsInfo=new GOT.TipsInfo("点击开关推拉门");
    this.currentPick=null;
}

SwitchSlidingDoor.prototype={
    constructor:SwitchSlidingDoor,
    initSlidingDoor: function(objects){
        this.arrMesh=objects||[];
        for(var i=0;i<this.arrMesh.length;i++){
            //重置几何中心,不知道用Blender导出好像不需要这一步了
            var box=new THREE.Box3();
            box.setFromObject(this.arrMesh[i]);
            this.arrMesh[i].geometry.center();
            this.arrMesh[i].position.copy(box.getCenter());
            //添加状态属性
            this.arrMesh[i].close=true;

        }
    },
    pickSlidingDoor: function(raycasterPick){
        var intersects=raycasterPick.intersectObjects(this.arrMesh);
        if(intersects.length>0){
            this.currentPick=intersects[0].object;
            this.isLock=true;
            this.tipsInfo.showInfo();
        }else{
            this.isLock=false;
            this.tipsInfo.hideInfo();
        }
    },
    eventSlidingDoor: function(){
        if(this.isLock){
            var name=this.currentPick.name;
            //判断横竖方向,手动指明哪些x方向,哪些是在方向
            //x方向
            if(name===""||name===""||name===""){
                if(this.currentPick.close){
                    //拖拉1000mm
                    TweenLite.fromTo(this.currentPick.position,2,{x:this.currentPick.position.x},{x:this.currentPick.position.x+1000});
                    this.currentPick.close=false;

                }else{
                    TweenLite.fromTo(this.currentPick.position,2,{x:this.currentPick.position.x},{x:this.currentPick.position.x-1000});
                    this.currentPick.close=true;
                }
            }
            //z方向
            if(name===""||name===""||name===""){
                if(this.currentPick.close){
                    //拖拉1000mm
                    TweenLite.fromTo(this.currentPick.position,2,{z:this.currentPick.position.z},{z:this.currentPick.position.z+1000});
                    this.currentPick.close=false;

                }else{
                    TweenLite.fromTo(this.currentPick.position,2,{z:this.currentPick.position.z},{z:this.currentPick.position.z-1000});
                    this.currentPick.close=true;
                }
            }

        }
    }
};
var switchSlidingDoor=new SwitchSlidingDoor();
export default switchSlidingDoor;