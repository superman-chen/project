//主页面路由
const routes =[
    {
        path:'main',
        name:'main',
        component:()=>import('@/views/mainPage/Chc_main')
    },
    {
        path:'user',
        name:'user',
        component:()=>import('@/views/mainPage/Qyp_User')
    }
]

export default routes