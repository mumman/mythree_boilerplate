
function PointerlockControl(){
    this.control= null;
    this.camera=null;
    //各个方向的速率
    this.velocity= new THREE.Vector3();
    //选择射线
    this.pickRaycaster=new THREE.Raycaster();
    this.pickRaycaster.near=0;
    this.pickRaycaster.far=1500;
    //水平碰撞射线
    this.collisionRaycaster= new THREE.Raycaster();
    this.collisionRaycaster.near=0;
    this.collisionRaycaster.far=200;
    
    this.element=document.body;
    //运动控制
    this.controlsEnabled=false;
    this.move={
        moveForward :false,
        moveBackward : false,
        moveLeft : false,
        moveRight : false,
        canJump : false
    };
    this.crossHairCanvas=null;


}

PointerlockControl.prototype={
    constructor: PointerlockControl,
    initControl:function(scene){

        //初始化相机
        var fieldOfView, aspectRatio, nearPlane, farPlane;
        aspectRatio = window.innerWidth/window.innerHeight;
        fieldOfView = 75;
        nearPlane = 1;
        farPlane = 100000;
        var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        this.camera=camera;

        //初始化control
        //camera.position.set(0,0,0);
        this.control = new THREE.PointerLockControls( this.camera );
        this.control.enabled=false;
        this.controlsEnabled = false;

        this.control.getObject().position.copy(GOT.view1.position);
        scene.add( this.control.getObject() );



        //检查浏览器是否支持
        var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
        if ( havePointerLock ) {
            var pointerlockchange = function ( event ) {
                if ( document.pointerLockElement === this.element || document.mozPointerLockElement === this.element || document.webkitPointerLockElement === this.element ) {
                    this.controlsEnabled = true;
                    this.control.enabled = true;
                    this.crossHairCanvas.style.visibility="visible";
                    //console.log("开始z");
                } else {
                    this.crossHairCanvas.style.visibility="hidden";
                    this.controlsEnabled = false;
                    this.control.enabled = false;

                    //console.log("暂停z");
                }
            }.bind(this);

            var pointerlockerror = function ( event ) {}.bind(this);

            // Hook pointer lock state change events
            document.addEventListener( 'pointerlockchange', pointerlockchange, false );
            document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'pointerlockerror', pointerlockerror, false );
            document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
            document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

        } else {}

        //初始化具体控制

        var onKeyDown = function ( event ) {
            switch ( event.keyCode ) {

                case 38: // up
                case 87: // w
                    this.move.moveForward = true;
                    break;

                case 37: // left
                case 65: // a
                    this.move.moveLeft = true; break;

                case 40: // down
                case 83: // s
                    this.move.moveBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    this.move.moveRight = true;
                    break;

                case 32: // space
                    if ( this.move.canJump === true ) this.velocity.y += 3000;
                    this.move.canJump = false;
                    break;
            }
        }.bind(this);

        var onKeyUp = function ( event ) {

            switch( event.keyCode ) {
                case 38: // up
                case 87: // w
                    this.move.moveForward = false;
                    break;
                case 37: // left
                case 65: // a
                    this.move.moveLeft = false;
                    break;

                case 40: // down
                case 83: // s
                    this.move.moveBackward = false;
                    break;

                case 39: // right
                case 68: // d
                    this.move.moveRight = false;
                    break;
            }
        }.bind(this);


        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );

        //准心实现
        function canvasDraw() {
            var canvas = document.createElement('canvas');
            canvas.width = 50;
            canvas.height = 50;
            var ctx=canvas.getContext('2d');
            ctx.strokeStyle="#00FF00";
            ctx.lineWidth=2;
            ctx.beginPath();
            ctx.moveTo(25,0);
            ctx.lineTo(25,20);

            ctx.moveTo(0,25);
            ctx.lineTo(20,25);

            ctx.moveTo(25,50);
            ctx.lineTo(25,30);

            ctx.moveTo(50,25);
            ctx.lineTo(30,25);

            ctx.stroke();

            return canvas;
        }

        this.crossHairCanvas=canvasDraw();
        document.body.appendChild(this.crossHairCanvas);
        this.crossHairCanvas.style.position="fixed";
        this.crossHairCanvas.style.left="50%";
        this.crossHairCanvas.style.top="50%";
        this.crossHairCanvas.style.transform=" translate(-50%,-50%)";
        this.crossHairCanvas.style.visibility="hidden";







    },
    //锁定指针
    lockPointer:function(){
        this.element.requestPointerLock = this.element.requestPointerLock || this.element.mozRequestPointerLock || this.element.webkitRequestPointerLock;
        this.element.requestPointerLock();
        //this.control.getObject().position.set(0,0,0);
        //TweenLite.to(this.control.getObject().position,2,{x:0,y:0,z:0});


        //console.log("游戏开始");
    },
    //释放指针
    relasePointer:function(){
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
        document.exitPointerLock();


        //console.log("游戏结束");
    },


    //碰撞检测
    fps : function(objectarray,delta){
        if ( this.controlsEnabled ) {
            var objectarray=objectarray||[];

            // 碰撞检测
            
            //console.log(this.camera.getWorldDirection());
            var axis=new THREE.Vector3(0,1,0);
            for(var i=0; i<4; i++){
                //获得摄像机的方向在水平面的锤子投影,标准化,然后逆时针分别旋转90度
                this.collisionRaycaster.set( this.control.getObject().position, this.camera.getWorldDirection().setY(0).normalize().applyAxisAngle ( axis, Math.PI/2*i));
                var intersects=this.collisionRaycaster.intersectObjects(objectarray);
                if(intersects.length>0){
                    if(i===0){
                        //console.log("正面碰撞");
                        this.move.moveForward=false;
                        this.velocity.z =0;
                    }else if(i===2 ){
                        //console.log("背面碰撞");
                        this.move.moveBackward=false;
                        this.velocity.z=0;
                    }else if(i===1){
                        //console.log("左侧碰撞");
                        this.move.moveLeft=false;
                        this.velocity.x=0;
                    }else if(i===3){
                        //console.log("右侧碰撞");
                        this.move.moveRight=false;
                        this.velocity.x=0;
                    }
                }
            }
            //移动
            this.velocity.x -= this.velocity.x * 100.0 * delta;
            this.velocity.z -= this.velocity.z * 100.0 * delta;

            this.velocity.y -= 9.8 * 600.0 * delta; // 100.0 = mass

            if ( this.move.moveForward ) this.velocity.z -= 300000.0 * delta;
            if ( this.move.moveBackward ) this.velocity.z += 300000.0 * delta;
            if ( this.move.moveLeft ) this.velocity.x -= 300000.0 * delta;
            if ( this.move.moveRight ) this.velocity.x += 300000.0 * delta;

            //通过相对距离来移动,相对距离不变就不会移动,所以用速度这个词不合适?
            this.control.getObject().translateX( this.velocity.x * delta );
            this.control.getObject().translateY( this.velocity.y * delta );
            this.control.getObject().translateZ( this.velocity.z * delta );

            if ( this.control.getObject().position.y < 1600 ) {
                this.velocity.y = 0;
                this.control.getObject().position.y = 1600;
                this.move.canJump = true;
            }


        }
    },
    //动画


    //选择射线更新
    pickRaycasterUpdate: function(){
        this.pickRaycaster.set(this.control.getObject().position, this.camera.getWorldDirection());
    }
};



var pointerlockControl=new PointerlockControl();



export default pointerlockControl;




