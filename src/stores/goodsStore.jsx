import { toMobx } from "@chaoswise/cw-mobx";
import { message } from "@chaoswise/ui";
import { goodsList,goodsDelete,goodsAdd } from "@/services/goodsServices";


// 设置数据接收
const model = {
    namespace: 'goodsStore',
    state: {
        listData:{},
        inputSearchName:'',
    },
    effects:{
        *getList(params) {
            const res = yield goodsList(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("res====>",res);
                console.log("获取成功");
                this.listData = res.data;
            }
            else{
                message.error(
                    (res && res.msg) || '商品列表获取失败'
                );
                console.log("获取失败");
                console.log("res====>",res);
                console.log("-------------------------");
            }
            console.log("res222====>",res);
            return (
                res
            )
            ;
        },
        // 删除方法并判定是否成功
        *deleted(params){
            console.log("params====>",params);
            const res = yield goodsDelete(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("res====>",res);
                console.log("删除成功");
            }
            else{
                message.error(
                    (res && res.msg) || '删除失败'
                );
                console.log("删除失败");
                console.log("res====>",res);
                console.log("-------------------------");
            }
            console.log("res222====>",res);
            return (
                res
            )
            ;
        },
        *added(params){
            const res = yield goodsAdd(params);
            if (res?.code === 100000){
                console.log("-------------------------");
                console.log("新增成功");
                console.log("res====>",res);
            }
            else{
                message.error(
                    (res && res.msg) || '新增失败'
                );
                console.log("新增失败");
                console.log("res====>",res);
                console.log("-------------------------");
            }
            console.log("res222====>",res);
            return (
                res
            )
            ;
        }
    },
};

export default toMobx(model);