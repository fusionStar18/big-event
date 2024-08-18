//导入request.js请求工具
import request from '@/utils/request.js'

//提供调用注册接口的函数
export const userRegisterService = (registerData) => {
    //借助urlSearchParams完成传递
    const params = new URLSearchParams();
    for (let key in registerData) {
        params.append(key, registerData[key]);
    }
    return request.post('/user/register', params);
}

//提供调用登录接口的函数
export const userLoginService = (LoginData) => {
    const params = new URLSearchParams();
    for (let key in LoginData) {
        params.append(key, LoginData[key])
    }
    return request.post('/user/login', params)
}

//获取用户详细信息
export const userListService = () =>{
    return request.get('/user/userInfo')
}

//修改个人信息
export const userUpdateService = (userInfo) =>{
    return request.put('/user/update',userInfo)
}

//修改个人头像
export const userAvatarUpdateService = (url) =>{
    // const params = new URLSearchParams()
    // params.append('avatarUrl',url)
    return request.patch('/user/updateAvatar?avatarUrl='+url)
}

//修改个人密码
export const userPasswordUpdateService = (passwordData) =>{
    return request.patch('/user/updatePwd',passwordData)
}