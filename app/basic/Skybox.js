import Shader from './../Shader.js';
function Skybox(){
    this.cubeSkybox=null;
    this.sphereSkybox=null;
    this.hemisphereSkybox=null;
}


Skybox.prototype={
    constructor:Skybox,
    //spheremap 方式全局图
    createSphereSkybox:function(){
        var sphereGeometry = new THREE.SphereGeometry( 10000, 60, 40 );
        //翻转几何体
        sphereGeometry.scale( - 1, 1, 1 );
        var sphereMaterial = new THREE.MeshBasicMaterial( {
            map: new THREE.TextureLoader().load( 'textures/skybox/sphere.jpg' )
        } );
        var sphereSkybox = new THREE.Mesh( sphereGeometry, sphereMaterial );
        this.sphereSkybox=sphereSkybox;
        return this.sphereSkybox;

    },
    //cubemap 方式全景图
    createCubeSkybox:function(){
        function loadTexture(path) {
            var texture = new THREE.Texture(texture_placeholder);
            var material = new THREE.MeshBasicMaterial({
                map: texture,
                overdraw: 0.5
            });
            var image = new Image();
            image.onload = function() {
                texture.image = this;
                texture.needsUpdate = true;
            };
            image.src = path;
            return material;
        }

        var texture_placeholder = document.createElement('canvas');
        texture_placeholder.width = 128;
        texture_placeholder.height = 128;

        var context = texture_placeholder.getContext('2d');
        context.fillStyle = 'rgb( 200, 200, 200 )';
        context.fillRect(0, 0, texture_placeholder.width, texture_placeholder.height);

        var materials = [
            loadTexture('textures/skybox/px.jpg'), // right
            loadTexture('textures/skybox/nx.jpg'), // left
            loadTexture('textures/skybox/py.jpg'), // top
            loadTexture('textures/skybox/ny.jpg'), // bottom
            loadTexture('textures/skybox/pz.jpg'), // back
            loadTexture('textures/skybox/nz.jpg') // front
        ];
        var cubeSkybox = new THREE.Mesh(new THREE.BoxGeometry(25000, 25000, 25000, 1, 1, 1), new THREE.MultiMaterial(materials));
        //翻转网格体
        cube.scale.x = -1;
        this.cubeSkybox=cubeSkybox;
        return this.cubeSkybox;
    },
    //渐变背景
    createHemisphereSkybox:function(){
        var vertexShader = Shader.sky.vertexShader;
        var fragmentShader = Shader.sky.fragmentShader;
        var uniforms = {
            topColor:    { value: new THREE.Color( 0x0077ff ) },
            bottomColor: { value: new THREE.Color( 0xffffff ) },
            offset:      { value: 33 },
            exponent:    { value: 0.6 }
        };
        //uniforms.topColor.value.copy( 0xffffff );
        var skyGeo = new THREE.SphereGeometry( 20000, 32, 15 );
        var skyMat = new THREE.ShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: uniforms,
            side: THREE.BackSide } );
        var sky = new THREE.Mesh( skyGeo, skyMat );
        this.hemisphereSkybox=sky;
        return this.hemisphereSkybox;
    }



};
var skybox=new Skybox();
export default skybox;