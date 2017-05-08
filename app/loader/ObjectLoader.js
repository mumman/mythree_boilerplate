/**
 * Created by Administrator on 2017/3/24.
 */
import loaderVendor from "./LoaderVendor.js";
function ObjectLoader(){
    this.path="models/";
    this.arr=["mxo"];
    this.arrPromise=["door"];
    this.type=".json";

}

ObjectLoader.prototype={
    constructor:ObjectLoader,
    createModels: function(scene){
        var that=this;
        this.arr.forEach(function(element){
            var filePath=that.path+element+that.type;
            loaderVendor.objectLoader(filePath,scene);
        });
    },
    createModelsPromise: function(scene){
        var that=this;
        var promiseArray=this.arrPromise.map(function(element){
            var filePath=that.path+element+that.type;
            return loaderVendor.objectLoader(filePath,scene);
        });
        var promiseAll=Promise.all(promiseArray);
        return promiseAll;
    }
};
var objectLoader=new ObjectLoader();
export default objectLoader;
