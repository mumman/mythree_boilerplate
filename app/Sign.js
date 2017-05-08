/**
 * Created by Administrator on 2017/4/13.
 */
function Sign(){

    var m1={
        name:'m1',
        position: new THREE.Vector3(0,1000,1000)
    };
    var m2={
        name:'m2',
        position: new THREE.Vector3(0,1000,2000)
    };
    var m3={
        name:'m3',
        position: new THREE.Vector3(-2000,1000,4000)
    };



    this.arr=[m1,m2,m3];
    this.group=new THREE.Group();

    this.canvas=null;//使用同一个canvas
    this.ctx=null;
    this.spriteMaterial=null;//都使用同一个材质

    this.timer=0;
    this.currentPick=null;
    this.lastPick=null;
    this.isLock=false;


}

Sign.prototype={
    constructor:Sign,
    //canvas  动画

    createSign:function(scene){
        //this.signAnimation(1000);
        var that=this;

        var canvas = document.createElement( 'canvas' );
        canvas.width = 256;
        canvas.height = 256;
        this.canvas=canvas;
        this.ctx=this.canvas.getContext('2d');
        this.spriteMaterial=new THREE.SpriteMaterial( {map:null, color: 0xffffff } );

        function generateSprite(){

            that.spriteMaterial.map=new THREE.CanvasTexture( that.canvas);
            that.spriteMaterial.blending=THREE.AdditiveBlending;
            that.spriteMaterial.map.needsUpdate = true;
            that.spriteMaterial.transparent=true;
            var sprite = new THREE.Sprite( that.spriteMaterial );
            sprite.scale.set(500, 500, 1);
            return sprite;

        }

        //var sprite=generateSprite();
        for(var i=0;i<this.arr.length;i++){
            var meshPosition= this.arr[i].position;

            var sprite=generateSprite();
            sprite.name=this.arr[i].name+"sign";
            sprite.position.copy(meshPosition);
            this.group.add(sprite);
        }
        scene.add(this.group)

    },

    signAnimation:function(time){
        var ctx=this.ctx;
        var radius=this.canvas.height/2; //圆半径
        var duration=6000; //一个圈的持续时间
        var segment=duration/4; //分段

        //console.log(time%duration/duration);
        //映射到0-1之间
        var a=(time)%duration/duration;
        var a1=(time+segment)%duration/duration;
        var a2=(time+segment*2)%duration/duration;
        var a3=(time+segment*3)%duration/duration;

        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        ctx.fillStyle='rgba(0,0,0,1)';
        ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        //ctx.globalAlpha =0.1*(1-time%2000*0.001/2);

        ctx.beginPath();
        ctx.fillStyle='rgba(255,0,0,'+(1-a)+')';
        ctx.arc(radius,radius,a*radius,0,Math.PI*2,true);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle='rgba(255,0,0,'+(1-a1)+')';
        ctx.arc(radius,radius,a1*radius,0,Math.PI*2,true);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle='rgba(255,0,0,'+(1-a2)+')';
        ctx.arc(radius,radius,a2*radius,0,Math.PI*2,true);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle='rgba(255,0,0,'+(1-a3)+')';
        ctx.arc(radius,radius,a3*radius,0,Math.PI*2,true);
        ctx.fill();
        this.spriteMaterial.map.needsUpdate = true;

    },


    pickSign:function(pickRaycaster){
        var intersects= pickRaycaster.intersectObjects(this.group.children);
        if(intersects.length>0){
            this.currentPick=intersects[0].object;
            this.isLock=true;
            document.body.style.cursor='pointer';
        }else{
            this.isLock=false;
            document.body.style.cursor='default';
        }

    },
    eventSign:function(){
        if(this.isLock){

            var scope=this;
            this.group.remove(scope.currentPick);
            //恢复上一个选择.
            if(this.lastPick!==this.currentPick&&this.lastPick!==null){
                this.group.add(this.lastPick);
                clearTimeout(scope.timer);
            }
            this.lastPick=this.currentPick;
            //如果没点击其他sign,那么就回复最后一个选择,并把最后一个选择设置null
            this.timer=setTimeout(function(){
                scope.group.add(scope.lastPick);
                scope.lastPick=null;
            },3000)
        }

    }





};
var sign=new Sign();
export default sign;