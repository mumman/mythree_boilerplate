/**
 * Created by Administrator on 2017/5/9.
 */
import {TweenMax} from "gsap";
function Infobar(){
    this.meshSprite = null;
    this.canvas = null;
    this.ctx = null;
    this.container = null;
}

Infobar.prototype = {
    constructor: Infobar,
    initInfobar: function(scene){
        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        var material = new THREE.SpriteMaterial({color: 0xffffff});
        material.map = new THREE.CanvasTexture(canvas);
        //material.blending=THREE.AdditiveBlending;
        material.map.needsUpdate = true;
        material.transparent = true;
        material.depthTest = false;
        this.meshSprite = new THREE.Sprite(material);
        this.meshSprite.material.map.needsUpdate = true;
        this.meshSprite.scale.set(1500, 1500, 1);
        this.container = new THREE.Group();
        scene.add(this.container);

    },
    createInfobar: function(textInfo, position){
        var scope = this;
        var step = {x: 0};
        var draw = function(){
            var v = 56;

            scope.ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
            scope.ctx.save();

            scope.ctx.beginPath();
            //如果是向下动画 scope.ctx.rect(0, 0, scope.canvas.height, step.x);
            scope.ctx.rect(0, scope.canvas.height, scope.canvas.height, -step.x);
            scope.ctx.clip();

            scope.ctx.beginPath();
            scope.ctx.fillStyle = 'rgba(0,0,0,1)';
            scope.ctx.fillRect(v, 0, scope.canvas.width-v, scope.canvas.height-v*2);
            scope.ctx.clearRect(v+5, 5, scope.canvas.width-v-10, scope.canvas.height-v*2-10);
            scope.ctx.fillStyle = 'rgba(0,0,0,0.7)';
            scope.ctx.fillRect(v, 0, scope.canvas.width-v, scope.canvas.height-v*2);

            scope.ctx.beginPath();
            scope.ctx.lineWidth = 5;
            scope.ctx.moveTo(5, scope.canvas.height-5);
            scope.ctx.lineTo(scope.canvas.width/2, scope.canvas.height-v);
            scope.ctx.lineTo(scope.canvas.width/2, scope.canvas.height-v*2);
            scope.ctx.stroke();

            scope.ctx.fillStyle = "#fff";
            scope.ctx.font = "60px serif";

            scope.ctx.fillText(textInfo.name, v+30, v+30);
            scope.ctx.fillText(textInfo.content, v+30, v+90);
            scope.ctx.restore();
            scope.ctx.beginPath();
            //如果是向下动画 scope.ctx.rect(0, 0, scope.canvas.height, step.x);
            scope.ctx.rect(0, scope.canvas.height, scope.canvas.height, -step.x);
            scope.meshSprite.material.map.needsUpdate = true;

        };
        TweenLite.to(step, 1.5, {x: 512,
            onUpdate: function(){
                //console.log(step.x);
                draw();
            },
            onComplete(){
                step.x = 0;
               // console.log(step.x);
            }
        });

        this.container.position.set(position.x+750, position.y+750, position.z);

    },
    showInfobar: function(){
        this.container.add(this.meshSprite);
    },
    hideInfobar: function(){
        this.container.remove(this.meshSprite);
    }
};
var infobar = new Infobar();
export default infobar;