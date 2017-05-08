import loaderVendor from "./LoaderVendor.js";
function ObjLoader(){
    this.path="models/";
    this.arr=['mobj'];
    this.arrPromise=[];
}

ObjLoader.prototype={
    constructor:ObjLoader,
    createModels:function(scene){
        var that=this;
        this.arr.forEach(function(element){
            var mtlPath=that.path+element+".mtl";
            var objPath=that.path+element+".obj";
            loaderVendor.objLoader(mtlPath,objPath,scene);
        });

    },
    createModelsPromise:function(scene){
       var that=this;
        var promiseArray=this.arrPromise.map(function(element){
            var mtlPath=that.path+element+".mtl";
            var objPath=that.path+element+".obj";
            return loaderVendor.objLoader(mtlPath,objPath,scene);
        });
        var promiseAll=Promise.all(promiseArray);
        return promiseAll;

    }
};
var objLoader=new ObjLoader();
export default objLoader;