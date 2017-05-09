/**
 * Created by Administrator on 2017/5/9.
 */
function Infobar(){
    this.meshSprite=null;
    this.canvas=null;
    this.ctx=null;
    this.container=null;
}

Infobar.prototype={
    constructor:Infobar,
    initInfobar:function(scene){
        var canvas=document.createElement('canvas') ;
        canvas.width=512;
        canvas.height=512;
        this.canvas=canvas;
        this.ctx=canvas.getContext("2d");
        

        var material=new THREE.SpriteMaterial({color:0xffffff});
        material.map=new THREE.CanvasTexture(canvas);
        //material.blending=THREE.AdditiveBlending;
        material.map.needsUpdate = true;
        material.transparent=true;
        material.depthTest=false;
        this.meshSprite=new THREE.Sprite(material);
        this.meshSprite.material.map.needsUpdate=true;
        this.meshSprite.scale.set(1500,1500,1);
        this.container=new THREE.Group();
        scene.add(this.container);


    },
    createInfobar:function(textInfo,position){
        var v=56;
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle='rgba(0,0,0,1)';
        this.ctx.fillRect(v,0,this.canvas.width-v,this.canvas.height-v*2);
        this.ctx.clearRect(v+5,5,this.canvas.width-v-10,this.canvas.height-v*2-10);
        this.ctx.fillStyle='rgba(0,0,0,0.7)';
        this.ctx.fillRect(v,0,this.canvas.width-v,this.canvas.height-v*2);

        this.ctx.beginPath();
        this.ctx.lineWidth=5;
        this.ctx.moveTo(5,this.canvas.height-5);
        this.ctx.lineTo(this.canvas.width/2,this.canvas.height-v);
        this.ctx.lineTo(this.canvas.width/2,this.canvas.height-v*2);
        this.ctx.stroke();

        this.ctx.fillStyle="#fff";
        this.ctx.font="60px serif";

        this.ctx.fillText(textInfo.name,v+30,v+30);
        this.ctx.fillText(textInfo.content,v+30,v+90);

        this.container.position.set(position.x+750,position.y+750,position.z);
        this.meshSprite.material.map.needsUpdate=true;
    },
    showInfobar:function(){
        this.container.add(this.meshSprite);
    },
    hideInfobar:function(){
        this.container.remove(this.meshSprite);
    }
};
var infobar=new Infobar();
export default infobar;