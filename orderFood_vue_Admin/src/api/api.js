import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`/order-food/users/adminLogin`, params).then(res => res.data); };

export const getGoodsList = params => { return axios.get(`/order-food/goods/orderDetailList`, { params: params }); };

export const getOrderDetail= params => { return axios.get(`/order-food/orderDetail/orderDetailList`, { params: params }); };

export const selectOrdeByDay= params => { return axios.get(`/order-food/order/selectOrdeByDay`, { params: params }); };

export const getUserListPage = params => { return axios.get(`/order-food/goods/list`, { params: params }); };

export const removeGood = params => { return axios.get(`/order-food/goods/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editGood = params => { return axios.post(`/order-food/goods/editGood`, params).then(res => res.data); };

export const addGood = params => { return axios.post(`/order-food/goods/addGood`,params).then(res => res.data); };