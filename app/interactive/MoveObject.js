/**
 * Created by Administrator on 2017/4/28.
 */
function MoveObject(){
    this.arrMesh=null;
    this.isLock=false;
    this.isDrag=false;//是否在拖放中.
    this.tipsInfo=new GOT.TipsInfo("按E拾取")
    this.currentPick=null;
}

MoveObject.prototype={
    constructor: MoveObject,
    initObject: function(objects){
        this.arrMesh=objects||[];
    },
    pickObject: function(raycasterPick){
        var intersectsMove=raycasterPick.intersectObjects(this.arrMesh);
        if(intersectsMove.length>0){
            //  console.log("拖放物体可以被选中");
            this.currentPick=intersectsMove[0].object;
            this.lock=true;
            this.tipsInfo.showInfo();
            //对选中物体一个材质修改提示
            this.currentPick.material.color.copy(new THREE.Color(0xff0000));

        }else{
            this.lock=false;
            this.tipsInfo.hideInfo();
            //没有选中恢复物体材质
            if(this.currentPick){
                this.currentPick.material.color.copy(new THREE.Color(0x051A07));
            }
            this.currentPick=null;
        }
    },
    eventObject: function(){
        //必须同时锁定且没在拖放中才能设置isDrag为true
       if(!this.isDrag&&this.isLock){
           this.isDrag=true;
       } else{
           this.isDrag=false;
       }

    },
    //拖动物体
    drapObject: function(origin, direction){
        if(this.isDrag){
            this.currentPick.position.copy(direction.multiplyScalar(100));
            this.currentPick.position.add(origin);
            this.tipsInfo.hideInfo();
            //console.log("拖放中");
        }
    },

    //如果没有在拖放所有物体就一直下降,应该下降到原先的位置
    dropObject: function(delta){
        for(var i=0; i<this.arrMesh.length; i++){
            this.arrMesh[i].position.y-=delta*100;
            if(this.arrMesh[i].position.y< 0){
                this.arrMesh[i].position.y= 0;
            }
        }
    }

};
var moveObject=new MoveObject();
export default moveObject;