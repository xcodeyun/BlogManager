<template>
  <div class="join">
    <!-- 登录 -->
    <transition name="join">
      <div class="form-login" v-if="show">
        <el-input
          v-model="form_login.username"
          placeholder="请输入账号"
        ></el-input>
        <el-input
          class="pas"
          v-model="form_login.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
        <div class="switch">
          <el-switch
            v-model="loginMode"
            active-color="#409eff"
            inactive-color="#c0c4cc"
          >
          </el-switch>
          <span>一周内免登录</span>
        </div>
        <el-button type="primary" @click="login">登录</el-button>
        <el-divider></el-divider>
        <span class="tips">
          我是新用户,还没有账号?
          <a href="javascript: (0);" @click.stop="taggleShow">立即注册</a>
        </span>
      </div>
    </transition>
    <!-- 注册 -->
    <transition name="join">
      <div class="form-register" v-if="!show">
        <el-input
          v-model="form_register.username"
          placeholder="请输入账号"
        ></el-input>
        <el-input
          class="pas"
          v-model="form_register.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
        <el-input
          type="email"
          class="phone"
          v-model="form_register.email"
          placeholder="请输入邮箱"
        ></el-input>
        <el-button type="primary" @click="register">注册</el-button>
        <el-divider></el-divider>
        <span class="tips">
          已经有账号,马上去登录?
          <a href="javascript: (0);" @click.stop="taggleShow">立即登录</a>
        </span>
      </div>
    </transition>
    <!-- 蒙版 -->
    <template>
      <el-button
        type="primary"
        v-loading.fullscreen.lock="fullscreenLoading"
        style="border: none; padding: 0"
      ></el-button>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class JOIN extends Vue {
  private show = true; // 登录/注册 显示依赖参数
  private fullscreenLoading = false; // 加载框 显示依赖参数
  private loginMode = false; // 登录模式, false为单次登录, true为7天内免密登录
  // 登录表单参数
  private form_login = {
    username: "",
    password: "",
  };
  // 注册表单参数
  private form_register = {
    username: "",
    password: "",
    email: "",
  };

  // 登录/注册 切换
  private taggleShow() {
    this.show = !this.show;
  }

  // 登录按钮
  private login() {
    // 验参
    if (!this.form_login.username) return this.$message.error("请输入账号");
    if (!this.form_login.password) return this.$message.error("请输入密码");
    // 打开加载蒙版
    this.fullscreenLoading = true;
    // 得参
    let form = {
      name: this.form_login.username,
      pas: this.form_login.password,
      mode: false,
    };
    form.mode = this.loginMode;
    // 发送请求
    (this as any).axios
      .post("http://127.0.0.1:3000/user/login", form)
      .then(({ data }: any) => {
        this.fullscreenLoading = false;
        if (data.code == 200 && data.data.token) {
          if (form.mode)
            window.localStorage.setItem("xmanager-login", data.data.token);
          else window.sessionStorage.setItem("xmanager-login", data.data.token);
          this.$router.push({ name: "home" });
          this.$message.success("登录成功");
        } else {
          this.$message.error("登录失败,请重试");
        }
        this.form_login = {
          username: "",
          password: "",
        };
      });
  }

  // 注册按钮
  private register() {
    // 校验信息是否充足
    if (!this.form_register.username) return this.$message.error("请输入账号");
    if (!this.form_register.password) return this.$message.error("请输入密码");
    if (!this.form_register.email) return this.$message.error("请输入手机号码");
    // 获取信息
    let form = { ...this.form_register, code: "" };
    // 打开加载蒙版
    this.fullscreenLoading = true;
    // 发送请求,使服务器发送邮件验证码
    (this as any).axios
      .get("http://127.0.0.1:3000/user/emailCode", {
        params: {
          email: form.email,
        },
      })
      .then(() => {
        // 打开对话框,让用户输入验证码
        return this.$prompt("请输入从邮箱中获取的验证码", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[0-9]{6}$/,
          inputErrorMessage: "验证码格式不正确,验证码为6位数字",
        });
      })
      .then(({ value }: any) => {
        // 请求后端, 验证验证码的正确性
        form.code = value;
        return (this as any).axios.post(
          "http://127.0.0.1:3000/user/emailCode",
          {
            email: form.email,
            code: form.code,
          }
        );
      })
      .then((res: any) => {
        res = res.data;
        // 根据不同的验证结果做不同处理
        if (res.code == 200) {
          this.getRegister(form).then((res: any) => {
            res = res.data;
            this.fullscreenLoading = false;
            if (res.code == 200) {
              this.$message.success("注册成功,请登录");
              this.form_register = {
                username: "",
                password: "",
                email: "",
              };
              this.show = true;
            } else {
              console.log(res);
              this.$message.error("注册失败,请重试");
            }
          });
        } else if (res.code == 202) {
          this.fullscreenLoading = false;
          this.$message.error("验证码错误");
        } else {
          console.log(res);
          this.fullscreenLoading = false;
          this.$message.error("未知错误, 请重试");
        }
      });
  }

  // 发起注册请求
  private getRegister(form: any) {
    return (this as any).axios.post("http://127.0.0.1:3000/user/register", {
      name: form.username,
      pas: form.password,
      email: form.email,
    });
  }

  // 忘记密码跳转
  private resetPassword() {}
}
</script>

<style lang="less">
.join-enter,
.join-leave-to {
  opacity: 0;
}
.join-enter-active,
.join-leave-active {
  transition: opacity 0.3s ease;
}
.join {
  width: 100%;
  height: 100%;
  background-color: #eff3f9;
  background-image: url("../../app/blog/img/xmanagerBG.png");
  background-position: center center;
  background-size: cover;
  position: relative;
}
.form-login,
.form-register {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}
.pas {
  margin: 25px 0;
}
.phone {
  margin-bottom: 25px;
}
.switch {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 25px;
}
.switch span {
  margin-left: 15px;
}
.tips a {
  text-decoration: none;
  color: #409eff;
}
</style>