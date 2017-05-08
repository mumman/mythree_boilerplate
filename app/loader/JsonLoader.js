import loaderVendor from "./LoaderVendor.js";
function JsonLoader(){
    this.path="models/";
    this.arr=["m1","m2","m3","m4","m5","m6","m7","m8","m9","m10","m11","m12","m13","m14","m15","m16",'m17','m18',
     'm19','m20','m21','m22','m23','m25','m24','m26','m27','m28','m29'];
    //this.arr=['m1'];
    //需要异步操作的模型
    this.arrPromise=[];
    this.type=".json";

}

JsonLoader.prototype={
    constructor:JsonLoader,
    createModels:function(scene){
        var that=this;
        this.arr.forEach(function(element){
            var jsonPath=that.path+element+that.type;
            loaderVendor.jsonLoader(jsonPath,scene);
        });
    },
    //利用Promise.all()异步操作
    createModelsPromise:function(scene){
        var that=this;
        var promiseArray=this.arrPromise.map(function(element){
            var jsonPath=that.path+element+that.type;
            return loaderVendor.jsonLoader(jsonPath,scene);
        });
        var promiseAll=Promise.all(promiseArray);
        return promiseAll;
    }

};
var jsonLoader=new JsonLoader();
export default jsonLoader;