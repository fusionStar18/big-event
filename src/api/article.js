import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js';
//文章分类列表查询
export const articleCategoryListService = () => {
    // const tokenStore = useTokenStore();
    //在pinia中定义的响应式数据都不需要value
    // return request.get('/category', { headers: { 'Authorization': tokenStore.token } });
    return request.get('/category');
}

//添加文章分类
export const articleCategoryAddService = (categoryData) => {
    return request.post('/category', categoryData);
}

//修改文章分类
export const articleCategoryUpdateService = (categoryData) => {
    return request.put('/category', categoryData)
}

//删除文章分类
export const articleCategoryDeleteService = (id) => {
    return request.delete('/category?id=' + id)
}

//文章列表查询
export const articleListService = (params) => {
    return request.get('/article', { params: params })
}

//文章添加
export const articleAddService = (ArticleData) => {
    return request.post('/article', ArticleData)
}

//文章编辑
export const articleUpdateService = (ArticleData) => {
    return request.put('/article', ArticleData)
}

//文章删除
export const articleDeleteService = (id) => {
    return request.delete('/article?id=' + id)
}