import '../css/app.css';

import $ from "jquery";
import sign from './Sign.js';
import {switchViewGUI} from './basic/GUI.js';

//基础设施
import skybox from './basic/Skybox.js';
import lights from './basic/Lights.js';
import map from './basic/Map.js';
//控制器
import trackballControl from './controls/TrackballControl.js';
import pointerlockControl from './controls/PointerlockControl.js';
import world from './controls/ControlManager.js';
//加载器
import objLoader from './loader/ObjLoader.js';
import jsonLoader from './loader/JsonLoader.js';
import objectLoader from './loader/ObjectLoader.js';
/*import objLoader2 from './loader/ObjLoader2.src';*/

//交互
import switchInteriorDoor from './interactive/SwitchInteriorDoor.js';
import switchMusicPlayer from './interactive/SwitchMusicPlayer.js';
import switchTV from './interactive/SwitchTV.js';
//开发辅助
import performanceStats from './devHelper/PerformanceStats';
import scenehelper from './devHelper/SceneHelper.js';
//import guiDate from './devHelper/DatGui.src';

performanceStats.initPerformanceStats();
var mesh;
var clock=new THREE.Clock();
var time=0;
var delta=0;
var time1=0;
function init(){
    
    world.initControlManager();
    //guiDate.initGui();

    //辅助
    //world.scene.add(skybox.createSphereSkybox());
    world.scene.add(skybox.createHemisphereSkybox());
    world.scene.add(scenehelper.createArrowHelper());
    world.scene.add(scenehelper.createAxisHelper());
    world.scene.add(scenehelper.createGirdHelper());
    world.scene.add(lights.createLights());
    //world.scene.add(lights.hemisphereLight);

    //模型
    //异步操作

    objectLoader.createModelsPromise(world.scene).then(function(){
        switchInteriorDoor.initInteriorDoor([world.scene.getObjectByName("Box001"),world.scene.getObjectByName("Box002")]);
        }).catch(function(){
    });
   /* objLoader.createModelsPromise(world.scene).then(function(){


    }).catch(function(){
        console.log("模型加载失败")
    });*/

    jsonLoader.createModels(world.scene);
    objectLoader.createModels(world.scene);
    objLoader.createModels(world.scene);


    //全部模型加载管理
    THREE.DefaultLoadingManager.onLoad = function ( ) {
        console.log( 'Loading Complete!');

    };


    var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    var material = new THREE.MeshPhongMaterial( { map: texture } );
    mesh = new THREE.Mesh( geometry, material );
    //mesh.receiveShadow=true;
    mesh.castShadow=true;
    mesh.position.y=100;
    //world.scene.add( mesh );

    var geometry1 = new THREE.PlaneBufferGeometry( 4000, 4000 );
    var material1 = new THREE.MeshPhongMaterial( { color: 0xff00ff } );
    var mesh1 = new THREE.Mesh( geometry1, material1 );
    mesh1.rotateX(-Math.PI/2);
    mesh1.position.y =3;
    mesh1.receiveShadow=true;
    //mesh1.castShadow=true;
   // world.scene.add( mesh1 );

    //地图
    //交互标志
    sign.createSign(world.scene);

    //初始化 门交互
    //switchInteriorDoor.initInteriorDoor();

    //各种事件
    window.addEventListener('resize',function(){
        world.handleWindowResize();
    },false);



    //点击事件
    var webgldom=world.renderer.domElement;
    webgldom.addEventListener('mousedown',function(event){
        //标志点击事件
        sign.eventSign();
        //开门
       // switchInteriorDoor.eventInteriorDoor();


    },false);
    //键盘事件
    document.addEventListener('keydown',function(event){
        if(event.keyCode===69){
            switchInteriorDoor.eventInteriorDoor();
        }

    },false);


    //控制器切换
    document.addEventListener('keydown',function(event){
        world.eventControl(event);

    },false);


    //更新鼠标
    webgldom.addEventListener( 'mousemove', function(event){
        event.preventDefault();
        GOT.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        GOT.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }, false );

    //自定义事件,切换视角

    document.addEventListener("switchview",function(event){
        world.switchView();
        switchViewGUI();
        $("#info").hide();
        //console.log("事件测试");
    },false);
    loop();

}
function loop(){
    time = performance.now(); //返回当前运行时间(毫秒数)
    delta = clock.getDelta(); //每一帧运行的时间(秒数),如果累加每一帧的时间,就是当前运行时间
    //time1=clock.getElapsedTime ();//返回当前运行时间(秒数)
    //console.log(time);
    //console.log(delta);
   // console.log(time1);

    /*mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;*/
    world.render(time);
    performanceStats.updatePerformanceStats(world.renderer);
    //标记动画
    sign.signAnimation(time);

    if(world.currentControlName==="trackball"){
        trackballControl.control.update();
        //更新trackballControl的选择射线
        trackballControl.raycasterUpdate1(GOT.mouse);
        //是否选中门
        sign.pickSign(trackballControl.pickRaycaster);

    };
    if(world.currentControlName==="pointerlock"){
        //第一人称的选择射线更新
        pointerlockControl.pickRaycasterUpdate();

        //墙壁碰撞
        var m24=world.scene.getObjectByName("m24");
        pointerlockControl.fps([m24],delta);

        //室内门选着
        switchInteriorDoor.pickInteriorDoor(pointerlockControl.pickRaycaster);

        //小地图
        map.update(pointerlockControl.control.getObject());
    };
    if(world.currentControlName==="daydream"){

    };










    requestAnimationFrame(loop);
    //console.log(trackballControl.control.object.position);
    //console.log(world.camera.position);
    //console.log(pointerlockControl.control.getObject().position);
    //console.log(world.scene.getObjectByName("m1"));

}
window.addEventListener('load',init);
