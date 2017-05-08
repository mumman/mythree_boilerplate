var GOT={
    //鼠标坐标
    mouse: new THREE.Vector2(),

    //立即运行一次返回构造函数,提示
    TipsInfo: function(){
        function TipsInfo(info){
            function canvasDraw(){
                var canvas=document.createElement('canvas');
                canvas.width=100;
                canvas.height=50;
                var ctx=canvas.getContext('2d');
                ctx.fillStyle="#FFF";
                ctx.font='24px serif';
                //ctx.textAlign="center";
                ctx.fillText(info, 16, 30);
                return canvas;
            }
            var moveCanvasInfo=canvasDraw();
            document.body.appendChild(moveCanvasInfo);
            moveCanvasInfo.style.position="fixed";
            moveCanvasInfo.style.left="50%";
            moveCanvasInfo.style.top="40%";
            moveCanvasInfo.style.transform=" translate(-50%,-50%)";
            moveCanvasInfo.style.visibility="hidden";

            this.canvasInfo=moveCanvasInfo;
        }
        TipsInfo.prototype={
            constructor: TipsInfo,
            showInfo: function(){
                this.canvasInfo.style.visibility="visible";
            },
            hideInfo: function(){
                this.canvasInfo.style.visibility="hidden";
            }
        };
        return  TipsInfo;
    }(),
    //当前视角
    currentViewName:"view0",
    currentViewLength:7,
    view0: {position:new THREE.Vector3(0,8000,10000),name:"上帝视角",index:0},
    view1: {position:new THREE.Vector3(-5000,1600,10000),name:"客厅",index:1},
    view2: {position:new THREE.Vector3(3000,1600,-3000),name:"厨房",index:2},
    view3: {position:new THREE.Vector3(-1000,1600,19000),name:"主卧",index:3},
    view4: {position:new THREE.Vector3(0,1600,1000),name:"卫生间",index:4},
    view5: {position:new THREE.Vector3(-4000,1600,-5000),name:"阳台",index:5},
    view6: {position:new THREE.Vector3(-8000,1600,16000),name:"次卧",index:6},

    eventSwitchView: new Event("switchview"),




};

