function Lights(){
    this.ambient = null;
    this.directionalLight = null;
    this.directionalLight1 = null;
    this.pointLight=null;
    this.hemisphereLight=null;
    this.groupLights = null;
}

Lights.prototype = {
    constructor: Lights,
    createLights: function(){
        var ambient = new THREE.AmbientLight(0xffffff, 0.5);
        var hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.8 );
        var pointLight=new THREE.PointLight(0xFFFFFF,1);
        pointLight.position.y=500;
        pointLight.castShadow=true;

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(40, 60, 5000);
        spotLight.castShadow = true;

        var directionalLight = new THREE.DirectionalLight(0xffeedd, 0.3);
        directionalLight.position.set(0, 5000, 5000);
        directionalLight.castShadow=true;

        directionalLight.shadow.camera.left = -4000;
        directionalLight.shadow.camera.right = 4000;
        directionalLight.shadow.camera.top = 4000;
        directionalLight.shadow.camera.bottom = -4000;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 10000;
        directionalLight.shadow.mapSize.width = 512;
        directionalLight.shadow.mapSize.height = 512;

        this.helper = new THREE.DirectionalLightHelper( directionalLight, 50 );
        var ch = new THREE.CameraHelper(directionalLight.shadow.camera);


        var directionalLight1 = new THREE.DirectionalLight(0xaabbff, 0.3);
        //directionalLight1.position.set(1000, 1000, 0);
        directionalLight1.position.x = 3000;
        directionalLight1.position.y = 2500;
        directionalLight1.position.z = -5000;
        directionalLight1.castShadow=true;

       /* directionalLight1.shadow.camera.left = -400;
        directionalLight1.shadow.camera.right = 400;
        directionalLight1.shadow.camera.top = 400;
        directionalLight1.shadow.camera.bottom = -400;
        directionalLight1.shadow.camera.near = 1;
        directionalLight1.shadow.camera.far = 10000;
        directionalLight1.shadow.mapSize.width = 2048;
        directionalLight1.shadow.mapSize.height = 2048;*/

        this.helper1 = new THREE.DirectionalLightHelper( directionalLight1, 50 );

        var groupLights = new THREE.Object3D();
        //groupLights.add(ambient);
        //groupLights.add(pointLight);
        //groupLights.add(spotLight);
        groupLights.add(ch);

        groupLights.add(this.helper);
        groupLights.add(this.helper1);

        groupLights.add(directionalLight);
        groupLights.add(directionalLight1);

        this.ambient = ambient;
        this.hemisphereLight=hemisphereLight;
        this.directionalLight = directionalLight;
        this.directionalLight1 = directionalLight1;
        this.groupLights = groupLights;

        return this.groupLights;
    },
    onLights: function(){
        this.groupLights.add(this.ambient);
        this.groupLights.add(this.directionalLight);
        this.groupLights.add(this.directionalLight1);
    },
    offLights: function(){
        this.groupLights.remove(this.ambient);
        this.groupLights.remove(this.directionalLight);
        this.groupLights.remove(this.directionalLight1);
    }
};
var lights = new Lights();
export default lights;
