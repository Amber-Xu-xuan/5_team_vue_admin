import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import orderDetail from './views/nav2/orderDetail.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import orderByDay from './views/charts/orderByDay.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
           // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '菜品管理' },
           // { path: '/form', component: Form, name: 'Form' },
           // { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据统计',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/orderByDay', component: orderByDay, name: '订单' },
            { path: '/user', component: user, name: '商品' }
        ]
    },
    {
        path: '/',
        component:Home,
        name: '订单管理',
        iconCls: 'fa fa-address-card',
        //leaf: true,//只有一个节点
        children: [
            { path: '/orderDetail', component: orderDetail, name: '系统订单' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;