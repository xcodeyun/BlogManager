// 后台管理树状结构数据
let treelist = [
  {
    title: "",
    itemarr: [
      {
        name: "首页",
        icon: "el-icon-s-home",
        to: "/home/index"
      }
    ]
  },
  {
    title: "文章管理",
    itemarr: [
      {
        name: "发表文章",
        icon: "el-icon-document-add",
        to: "/home/addWord"
      },
      {
        name: "修改文章",
        icon: "el-icon-document-checked",
        to: "/home/updataWord"
      },
      {
        name: "查询文章",
        icon: "el-icon-document",
        to: "/home/findWord"
      },
      {
        name: "删除文章",
        icon: "el-icon-document-delete",
        to: "/home/deleteWord"
      },
    ]
  },
  {
    title: "用户管理",
    itemarr: [
      {
        name: "查询用户",
        icon: "el-icon-coordinate",
        to: "/home/findUser"
      },
      {
        name: "修改用户信息",
        icon: "el-icon-edit-outline",
        to: "/home/updataUser"
      },
      {
        name: "注销用户",
        icon: "el-icon-switch-button",
        to: "/home/deleteUser"
      },
    ]
  },
  {
    title: "系统设置",
    itemarr: [
      {
        name: "面板设置",
        icon: "el-icon-setting",
        to: "/home/set"
      }
    ]
  },
];

export default treelist;