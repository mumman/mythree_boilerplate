/**
 * Created by Administrator on 2017/4/27.
 */
function SwitchMusicPlayer(){
    this.sound=null;
    this.musicMesh=null;
    this.analyser=null;
    this.tipsInfo=new GOT.TipsInfo("按E开关"),
    this.isClose=true;
    this.isLock=false;
}

SwitchMusicPlayer.prototype={
    constructor:SwitchMusicPlayer,
    //音乐路径 'models/gaobai.mp3'
    //同样要确保模型加载完成后才能初始化
    initMusicPlayer:function(object,musicPath){
        var that=this;
        this.musicMesh=object;
        //重置几何中心?这里有必要吗?
        var box=new THREE.Box3();
        box.setFromObject(value);
        object.geometry.center();
        object.position.copy(box.getCenter());

        var listener= new THREE.AudioListener();
        var sound=new THREE.PositionalAudio(listener);
        var analyser=null;
        var audioLoader=new THREE.AudioLoader();
        audioLoader.load(musicPath,function(buffer){
            sound.setBuffer(buffer);
            sound.setRefDistance(40);
            sound.setLoop(true);
            sound.setVolume(1);
            //sound.play();
            analyser = new THREE.AudioAnalyser( sound, 2048 );
            that.sound=sound;
            that.analyser=analyser;
            that.musicMesh=object;
            that.musicMesh.add(that.sound);
        });

    },
    pickMusicPlayer:function(raycasterPick){
        var intersects=raycasterPick.intersectObjects([this.musicMesh]);
        if(intersects.length>0){
            //console.log("选中");
            this.tipsInfo.showInfo();
            this.isLock=true;
        }else{
            this.tipsInfo.hideInfo();
            this.isLock=false;
        }

    },
    eventMusicPlayer:function(){
        if(this.isLock){
            if(this.isClose){
                this.sound.play();
                this.isClose=false;
            }else{
                this.sound.pause();
                this.isClose=true;
            }
        }
    },
    //音乐可视化动画
    soundAnalyser: function(){
            if((!this.isClose)){
                //this.musicMesh.material.materials[2].color.r=this.analyser.getAverageFrequency() / 256;
                //this.musicMesh.material.materials[2].color.g=this.analyser.getAverageFrequency() / 256;
                //this.musicMesh.material.materials[2].color.b=this.analyser.getAverageFrequency() / 128;
            }

    }

};
var switchMusicPlayer=new SwitchMusicPlayer();
export default switchMusicPlayer;