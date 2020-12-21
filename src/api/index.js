import axios from 'axios'

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
    "deleteItem"
]

const request = {}

api.forEach(url => {
    request[url] = params => {
        return axios({
            url: '/api/' + url,
            method: 'get',
            params,
        })
    }
})

console.log(request)
export default request