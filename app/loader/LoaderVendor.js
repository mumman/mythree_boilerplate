/**
 * Created by Administrator on 2017/5/3.
 */
function LoaderVendor(){

}

LoaderVendor.prototype={
    constructor:LoaderVendor,

    objectLoader:function(filePath,scene){
        var promise=new Promise(function(resolve,reject){
            var loader = new THREE.ObjectLoader();
            loader.load(filePath,function(object){
                //位置需要调整,.
                object.traverse(function(child){
                    if (child instanceof THREE.Mesh){
                        child.position.multiply(new THREE.Vector3(-1,1,-1));
                        child.material.side=THREE.DoubleSide;
                        child.rotation.x=0;
                    }
                });
                //var object = loader.parse( loadedObj );
                scene.add(object);
                // console.log(object);
                resolve(object);
            });
        });
        return promise;
    },

    objLoader: function(mtlPath,objPath,scene){
        var promise=new Promise(function(resolve,reject){
            THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.load( mtlPath, function( materials ) {
                materials.preload();

                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials( materials );

                objLoader.load( objPath, function ( object ) {
                    scene.add(object);
                    // console.log(object);
                    resolve(object);
                });
            });

        });
        return promise;
    },

    objLoader2:function(mtlPath,objPath,scene){
        var promise=new Promise(function(resolve,reject){
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.load( mtlPath, function( materials ) {
                materials.preload();
                var objLoader = new THREE.OBJLoader2();
                //objLoader.setSceneGraphBaseNode( scene );
                objLoader.setDebug( false, false );
                objLoader.setMaterials( materials.materials );
                var onSuccess = function ( object ) {
                    scene.add(object);
                    console.log(object);
                    resolve(object);

                };
                var onProgress = function ( event ) {

                };
                var onError = function ( event ) {
                    console.error( 'Error of type "' + event.type + '" occurred when trying to load: ' + event.src );
                };
                objLoader.load( objPath, onSuccess, onProgress, onError );
            });

        });
        return promise;
    },

    jsonLoader:function(jsonPath,scene){
        var promise=new Promise(function(resolve,reject){
            var loader=new THREE.JSONLoader();
            loader.load(jsonPath,function(geometry,materials){
                materials.forEach(function(element){
                    element.side= THREE.DoubleSide;
                    //element.side=THREE.FrontSide;
                });
                var material = materials[ 0 ];
                var object = new THREE.Mesh( geometry, material );
                object.name=jsonPath.match(/m\d+/)[0];

                scene.add( object );
                //console.log(object);
                resolve(object);
            });
        });
        return promise;
    },

};
var loaderVendor=new LoaderVendor();
export default loaderVendor;