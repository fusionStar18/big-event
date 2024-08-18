import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import LoginView from '@/views/Login.vue';
import LayoutView from '@/views/Layout.vue'

import ArticleCategoryVue from '@/views/article/ArticleCategory.vue';
import ArticleManageVue from '@/views/article/ArticleManage.vue';
import UserAvatarVue from '@/views/user/UserAvatar.vue';
import UserInfoVue from '@/views/user/UserInfo.vue';
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue';

//定义路由关系
const routes = [
    { path: '/login', component: LoginView },
    {
        path: '/', component: LayoutView, 
        //重定向
        redirect: '/article/manage',
        //子路由
        children: [
            { path: '/article/category', component: ArticleCategoryVue },
            { path: '/article/manage', component: ArticleManageVue },
            { path: '/user/info', component: UserInfoVue },
            { path: '/user/avatar', component: UserAvatarVue },
            { path: '/user/resetPassword', component: UserResetPasswordVue }
        ]
    }
]

//创建路由器
const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

//导出路由
export default router