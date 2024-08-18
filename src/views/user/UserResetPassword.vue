<script setup>
import { ref, computed } from 'vue'

const passwordInfo = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})


//校验密码的函数
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('确认密码不能为空'));
    } else if (value !== passwordInfo.value.new_pwd) {
        callback(new Error('确保两次输入的密码一样'));
    } else {
        callback();
    }
}

//定义表单校验规则
const rules = {
    old_pwd: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        { min: 5, max: 16, message: '原密码必须是6-20位的非空字符串', trigger: 'blur' }
    ],

    new_pwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 5, max: 16, message: '新密码必须是6-20位的非空字符串', trigger: 'blur' }
    ],

    re_pwd: [
        { validator: checkRePassword, trigger: 'blur' },
        { required: true, message: '请确认新密码', trigger: 'blur' },
        { min: 5, max: 16, message: '新密码必须是6-20位的非空字符串', trigger: 'blur' }
    ]
}

// 计算属性，用于确定注册按钮是否禁用
const isDisabled = computed(() => {
    return passwordInfo.value.new_pwd !== passwordInfo.value.re_pwd ||
        passwordInfo.value.old_pwd === '' ||
        passwordInfo.value.new_pwd === '' ||
        passwordInfo.value.re_pwd === '';
});

//修改个人密码
import { userPasswordUpdateService } from '@/api/user.js'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import useUserInfoStore from '@/stores/userInfo.js';
const userInfoStore = useUserInfoStore()
import { useTokenStore } from '@/stores/token.js';
const tokenStore = useTokenStore()
const router = useRouter()
const updatePassword = () => {
    ElMessageBox.confirm(
        '你确认要更新密码吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //1.更新密码
            let result = await userPasswordUpdateService(passwordInfo.value)
            //1.清楚pinia中存储的token即个人信息
            tokenStore.removeToken()
            userInfoStore.removeInfo()
            //2.跳转到登录界面
            router.push('/login')
            ElMessage({
                type: 'success',
                message: '修改成功',
            })
            //刷新列表
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消修改',
            })
        })

}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>重置密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="passwordInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原密码" prop="old_pwd">
                        <el-input v-model="passwordInfo.old_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new_pwd">
                        <el-input v-model="passwordInfo.new_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="re_pwd">
                        <el-input v-model="passwordInfo.re_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword" :disabled="isDisabled">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>