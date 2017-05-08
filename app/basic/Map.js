/**
 * Created by Administrator on 2017/4/12.
 */
function Map(){

    function canvasDraw(path,width,height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx=canvas.getContext('2d');
        var img = new Image();
        img.src = path;

        img.onload = function() {
            ctx.drawImage(img,0,0);
        };
        return canvas;
    }
    //canvas 添加图片的方式
   /* var mapCanvas=canvasDraw('map.jpg',200,200);
    document.body.appendChild(mapCanvas);
    mapCanvas.style.position="fixed";
    mapCanvas.style.left="100%";
    mapCanvas.style.top="100%";
    mapCanvas.style.transform=" translate(-100%,-100%)";
    mapCanvas.style.zIndex="1";*/

    var playerCanvas=canvasDraw('textures/sprite.png',16,16);
    document.body.appendChild(playerCanvas);
    playerCanvas.style.position="fixed";
    playerCanvas.style.left="200px";
    playerCanvas.style.top="100%";
    playerCanvas.style.transform=" translate(-100%,-100%)";
    playerCanvas.style.zIndex="2";
    playerCanvas.style.transform="translate(-108px,-108px)";

    var img1=document.createElement("img");
    img1.src="img/map.png";
    img1.style.width="200px";
    img1.style.height="200px";
    img1.style.position="fixed";
    img1.style.left="200px";
    img1.style.top="100%";
    img1.style.transform=" translate(-100%,-100%)";
    img1.style.zIndex="1";
    document.body.appendChild(img1);

    this.playerCanvas=playerCanvas;

}

Map.prototype={
    constructor:Map,
    createMap:function(scene){
      /*  var map = new THREE.TextureLoader().load( "../textures/map.jpg" );
        var material = new THREE.MeshBasicMaterial( { map: map, color: 0xffffff } );
        var geometry=new THREE.PlaneGeometry(1000,1000);
        this.meshMap = new THREE.Mesh( geometry,material );
        this.meshMap.position.set(window.innerWidth,window.innerHeight,0);
        //scene.add( this.meshMap );


        var spriteMap = new THREE.TextureLoader().load( '../textures/sprite.png' );
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        this.spritePlayer = new THREE.Sprite( spriteMaterial );
        this.spritePlayer.scale.set(1000, 1000, 1);
        this.spritePlayer.position.set(window.innerWidth,window.innerHeight,4000);
       // scene.add( this.spritePlayer );*/

    },
    update:function(camera){

        var x=Math.min(Math.max(camera.position.x,-10000),10000)/10000;
        var y=Math.min(Math.max(camera.position.z,-10000),10000)/10000;


        this.playerCanvas.style.transform="translate(-"+(x*100+108)+"px,-"+(y*100+108)+"px)";
       // console.log((x)+","+(y));
    }
};
var map=new Map();
export default map;