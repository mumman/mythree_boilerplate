/**
 * Created by Administrator on 2017/5/2.
 */
function PerformanceStats(){
    this.stats=null;
    this.renderStats=null;
}

PerformanceStats.prototype={
    constructor:PerformanceStats,
    initPerformanceStats:function(){
        var stats=new Stats();
        document.getElementById('webgl-container').appendChild(stats.dom);
        this.stats=stats;

        var rendererStats  = new THREEx.RendererStats();
        rendererStats.domElement.style.position   = 'absolute';
        rendererStats.domElement.style.left  = '0px';
        rendererStats.domElement.style.bottom    = '300px';
        document.body.appendChild( rendererStats.domElement );
        this.renderStats=rendererStats;


    },
    updatePerformanceStats:function(renderer){
        this.stats.update();
        this.renderStats.update(renderer);
    }
};
var performanceStats=new PerformanceStats();

export default performanceStats;