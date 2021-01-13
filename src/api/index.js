import axios from 'axios'
import { Toast } from 'vant';
const api = [
    "getMemberList",
    "insertMember",
    "getMember",
    "insertConsumption",
    "insertRecharge",
    "getConsumptionList",
    "getRechargeList",
    "getItemList",
    "insertItem",
    "updateItem",
    "deleteItem",
    "mglogin",
    "getConsumptionTotal",
    "getRechargeTotal"
]

const request = {}

api.forEach(url => {
    request[url] = (params, isLoading = true) => {
        return new Promise((resolve, reject) => {
            let loading
            if(isLoading) {
                loading = Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                });
            }
            axios({
                url: '/api/' + url,
                method: 'get',
                params,
            }).then(response => {
                isLoading && loading.clear()
                resolve(response)
            }, err => {
                isLoading && loading.clear()
                reject(err)
            })
        })
    }
})



export default request