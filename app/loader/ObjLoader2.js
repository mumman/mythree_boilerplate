/**
 * Created by Administrator on 2017/4/29.
 */
import loaderVendor from "./LoaderVendor.js";
function ObjLoader2(){
    this.path="models/";
    this.arr=["mobj2"];
    this.arrPromise=[];
}

ObjLoader2.prototype={
    constructor:ObjLoader2,
    createModels: function(scene){
      var scope=this;
      this.arr.forEach(function(element){
          var objPath=scope.path+element+".obj";
          var mtlPath=scope.path+element+".mtl";
          loaderVendor.objLoader2(objPath,mtlPath,scene)
      });
    },
    createModelsPromise: function(scene){

    }
};
var objLoader2=new ObjLoader2();
export default objLoader2;