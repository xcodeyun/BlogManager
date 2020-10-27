<template>
  <div class="home">
    <el-container class="layout">
      <el-aside width="222px" class="aside-container">
        <!-- 顶部 -->
        <div class="aside-title">博客后台管理系统</div>
        <div class="aside-user">
          <div class="img"><img src="" alt="" /></div>
          <div class="info">
            <div class="name">肖云蔚</div>
            <div class="status">博主</div>
          </div>
        </div>
        <!-- 分割线 -->
        <el-divider class="hr"></el-divider>
        <!-- 二级路由 -->
        <ul class="linkList">
          <li v-for="(item, index) in treelist" :key="index" class="linkItem">
            <div class="title" v-if="item.title">{{ item.title }}</div>
            <!-- :to="_item.to" -->
            <div
              class="link"
              :class="
                linkactive_f == index && linkactive_z == _index
                  ? 'link-active'
                  : ''
              "
              v-for="(_item, _index) in item.itemarr"
              :key="_index"
              @click="
                changeBreadcrumb(
                  item.title,
                  _item.name,
                  index,
                  _index,
                  _item.to
                )
              "
            >
              <div class="icon">
                <i :class="_item.icon"></i>
              </div>
              <div class="title">{{ _item.name }}</div>
            </div>
          </li>
        </ul>
      </el-aside>
      <el-container>
        <el-header height="70px" class="header-container">
          <span class="exit" @click="exit">登出</span>
        </el-header>
        <el-main class="main-container">
          <div class="main-note">
            <el-breadcrumb separator="▶">
              <el-breadcrumb-item
                v-for="(item, index) in breadcrumblist"
                :key="index"
              >
                {{ item }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="main-box"><router-view></router-view></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts'>
import { Component, Provide, Vue, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";
import treelist from "../api/data.js";

@Component({
  components: {},
})
export default class HOME extends Vue {
  private options1 = {}; // echart图表配置项1
  private options2 = {}; // echart图表配置项2
  private options3 = {}; // echart图表配置项3
  private treelist = treelist; // 导航树形数据
  private breadcrumblist: Array<String> = ["首页"]; // 面包屑数据
  private linkactive_f = 0; // 导航栏父active
  private linkactive_z = 0; // 导航栏子active

  private created() {
    console.log(
      window.sessionStorage.getItem("xmanager-login") ||
        window.localStorage.getItem("xmanager-login")
    );
  }

  private exit() {
    this.$router.push({ name: "join" });
  }

  // 导航栏选中样式切换、面包屑切换、路由跳转
  private changeBreadcrumb(
    title: string,
    _title: string,
    index: number,
    _index: number,
    to: string
  ) {
    this.linkactive_f = index;
    this.linkactive_z = _index;

    if (title) {
      this.breadcrumblist[0] = title;
      this.breadcrumblist[1] = _title;
    } else {
      this.breadcrumblist = [_title];
    }

    this.$router.push(to);
  }
}
</script>

<style lang='less'>
::-webkit-scrollbar {
  width: 5px;
  height: 110px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cecece;
}
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
// 侧边栏
.aside-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .aside-title {
    background-color: #4877e6;
    min-height: 70px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 16px;
    color: #fefefe;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0.1em;
  }
  .aside-user {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 100px;
    box-sizing: border-box;
    padding-left: 20px;
    .img {
      width: 50px;
      height: 50px;
      margin-right: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      .name {
        color: #000000;
        font-size: 15px;
        letter-spacing: 0.1em;
        margin-bottom: 8px;
        font-weight: bold;
      }
      .status {
        color: #acb5c9;
        font-size: 12px;
        letter-spacing: 0.1em;
      }
    }
  }
  .hr {
    margin: 0;
    min-height: 2px;
    background-color: #f0f3fa;
  }
  .linkList {
    box-sizing: border-box;
    padding: 15px 16px 0;
    width: 100%;
    flex: 1;
    .linkItem {
      margin-bottom: 25px;
      & > .title {
        color: #8d9ab6;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 12px;
      }
      .link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: transparent;
        box-sizing: border-box;
        padding: 0 12px;
        color: #36383b;
        border-radius: 40px;
        height: 40px;
        cursor: pointer;
        margin-bottom: 5px;
        transition: background-color 0.3s ease, color 0.3s ease;
        .icon {
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 15px;
          img {
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
          }
        }
        .title {
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 0.1em;
        }
      }
      .link-active {
        background-color: #4777e7;
        color: #fafafa;
      }
    }
  }
}
// 头部
.header-container {
  background-color: #4877e6;
  box-sizing: border-box;
  padding-right: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .exit {
    color: #fafafa;
    float: right;
    font-size: 12px;
    cursor: pointer;
  }
}
// 内容
.main-container {
  background-color: #f0f3fa;
  overflow-x: hidden;
  overflow-y: auto;
}
.main-note {
  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-radius: 6px;
  margin-bottom: 25px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 #e7ebf5;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.main-box {
  width: 100%;
  height: auto;
}
</style>
