/**
 * Created by Administrator on 2017/4/27.
 */
function SwitchTV(){
    this.tvMesh=[];
    this.video=null;
    this.tipsInfo=new GOT.TipsInfo("点击开关电视");
    this.currentPick=null;
    this.isLock=false;
}

SwitchTV.prototype={
    constructor: SwitchTV,
    initTV: function(scene,videoID){
        var tvWidth=100;
        var tvHeight=50;
        var tvPosition=new THREE.Vector3(0,0,0);
        var video = document.getElementById(videoID );
        var texture = new THREE.VideoTexture( video );
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        var geometry=new THREE.PlaneGeometry(tvWidth,tvHeight);
        var material=new THREE.MeshLambertMaterial({
            color: 0xffffff,
            map:texture
        });
        var mesh=new THREE.Mesh(geometry,material);
        //添加状态属性
        mesh.close=true;
        mesh.position.copy(tvPosition);
        scene.add(mesh);
        this.video=video;
        this.tvMesh.push(mesh);
    },
    pickTV: function(raycasterPick){
        var intersects=raycasterPick.intersectObjects(this.tvMesh);
        if(intersects.length>0){
            // console.log("选中");
            this.currentPick=intersects[0].object;
            this.isLock=true;
            this.tipsInfo.showInfo();
        }else{
            this.isLock=false;
            this.tipsInfo.hideInfo();
        }
    },
    eventTV: function(){
        if(this.isLock){
            if(this.currentPick.close){
                this.video.play();
                this.currentPick.close=false;
                // console.log("打开");
            }else{
                this.video.pause();
                this.video.load();
                this.currentPick.close=true;
                // console.log("关闭");
            }
        }
    }
};
var switchTV=new SwitchTV();
export default switchTV;