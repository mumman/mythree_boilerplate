function Helper(){
    this.arrowHelper=null;
    this.axisHelper=null;
    this.gridHelper=null;

}
Helper.prototype={
    constructor: Helper,
    createAllHelper: function(scene){
        var dir = new THREE.Vector3( 0, 1, 0 );
        dir.normalize();
        var origin = new THREE.Vector3( 0, 0, 0 );
        var length = 500;
        var hex = 0xFF002F;

        var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
        this.arrowHelper=arrowHelper;

        var axisHelper = new THREE.AxisHelper( 5000 );
        this.axisHelper=axisHelper;

        var size = 1000;
        var divisions = 10;
        var gridHelper = new THREE.GridHelper( size, divisions );
        this.gridHelper=gridHelper;

        scene.add(this.arrowHelper);
        scene.add(this.axisHelper);
        scene.add(this.gridHelper);

    },
    createArrowHelper:function(){
        var dir = new THREE.Vector3( 0, 1, 0 );
        dir.normalize();
        var origin = new THREE.Vector3( 0, 0, 0 );
        var length = 5000;
        var hex = 0xFF002F;

        var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
        this.arrowHelper=arrowHelper;

        return this.arrowHelper;
    },
    createAxisHelper:function(){
        var axisHelper = new THREE.AxisHelper( 8000 );
        this.axisHelper=axisHelper;
        return this.axisHelper;
    },
    createGirdHelper:function(){
        var size = 20000;
        var divisions = 20;
        var gridHelper = new THREE.GridHelper( size, divisions );
        this.gridHelper=gridHelper;
        return this.gridHelper;
    }

};
var helper=new Helper();
export default helper;
