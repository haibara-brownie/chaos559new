import { fetchPost, fetchDelete } from "@chaoswise/request/lib/fetch/methods";


const API = "/gateway/local";

//分页展示方法
export function goodsList(
    params = {}
) {
    return fetchPost(
        `${API}/car/listpage`,
        {body: params},
    );
}
//新增数据方法
export function goodsAdd(
    params = {}
){

    return fetchPost(
        `${API}/car/add`,
        {body: params},
    );
}
// 删除数据方法
export function goodsDelete(params){
    return fetchPost(
        `${API}/car/delete/${params}`,
    );
}

    
// // 修改数据方法
// export function goodsUpdata(){

// }



// todo
// // 查询数据方法
// export function goodsSearch(params){
//     return fetchPost(
//         `${API}/goods/search`,
//     );
// }
