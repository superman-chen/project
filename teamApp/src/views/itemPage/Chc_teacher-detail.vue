<template>
  <div id="detail">
    <!-- 头部 -->
    <header>
      <!-- 回退按钮 -->
      <back-button></back-button>
    </header>
    <!-- 老师信息 -->
    <div class="info">
      <div class="top">
        <!-- 头像 -->
        <div class="teacher-img">
          <img :src="teacher.avatar" alt="" />
        </div>
        <!-- 信息介绍 -->
        <div class="teacher-module">
          <h3>{{ teacher.real_name }}老师</h3>
          <p class="text-overflow-ell">
            {{ teacher.introduction }}
            <!-- <span>{{ teacher.sex }}</span>
            <span>{{ teacher.age }}岁</span>
            <span>{{ teacher.teachingTime }}年教龄</span>
            <span>关注数{{ teacher.focus }}</span> -->
          </p>
        </div>
        <!-- 右侧关注 -->
        <!-- 动态判断是否已关注 改变关注样式与文字 -->
        <div
          class="add-focus"
          :class="focusState == 1 ? 'yesStyle' : 'noStyle'"
          @click="clickFocus"
        >
          <span class="focus-icon">
            <img src="/icon/focus.png" alt="" />
          </span>
          <span class="focus-title">{{
            focusState == true ? "已关注" : "关注"
          }}</span>
        </div>
      </div>
      <!-- 标签 -->
      <div class="tag">
        <span class="tag-item" v-for="(item, i) in teacher.teacherTag" :key="i">
          {{ item }}
        </span>
      </div>
    </div>
    <!-- 主要信息  切换-->
    <div class="main">
      <van-tabs
        v-model="active"
        sticky
        animated
        swipeable
        title-inactive-color="silver"
        title-active-color="black"
        @click="tab"
      >
        <van-tab title="老师信息">
          <div class="teacher-detail">
            <ul>
              <li v-for="(item, i) in teacherDetail" :key="i">
                <span>{{ item.title }}</span>
                <span>{{ item.info }}</span>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="学员评价">
          <div class="say border-fine" v-for="(item, i) in say" :key="i">
            <!-- 头像 -->
            <div class="say-img">
              <img :src="item.sayImg" alt="" />
            </div>
            <!-- 评价信息 -->
            <div class="say-info">
              <h3>{{ item.sayName }}</h3>
              <p>
                <van-icon
                  v-for="(item, i) in item.sayNum"
                  :key="i"
                  color="#FED201"
                  name="star"
                />
              </p>
              <p>
                <span
                  class="say-tag"
                  v-for="(item, i) in item.sayTag"
                  :key="i"
                  >{{ item }}</span
                >
              </p>
              <p>{{ item.sayAlt }}</p>
              <p>{{ item.sayTime }}</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="主讲课程">
          <div
            class="lesson border-fine"
            v-for="(item, i) in lesson"
            :key="i"
            @click="getLessonDetail(item.id)"
          >
            <div class="lesson-img">
              <img :src="item.cover_img" alt="" />
            </div>
            <div class="lesson-info">
              <h2>{{ item.title }}</h2>
              <p>讲师：{{ teacher.real_name }}</p>
              <p>
                <!-- 价格字体样式通过判断教程是否免费来选择样色 -->
                <span
                  class="price"
                  :style="item.total_periods > 1 ? 'color:green' : 'color:red'"
                  >{{ item.total_periods > 1 ? "免费" : "￥" + item.id }}</span
                >
                <span class="num">
                  <van-icon name="shopping-cart-o" />
                  {{ item.brows_num }}
                </span>
              </p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <footer>
      <div :class="signState == true ? 'yesStyle' : 'noStyle'">
        <van-button class="focus-icon"   size="large" @click="toSign">
        {{ signState == true ? "取消约课" : "立即约课" }}
      </van-button>
      </div>
      
    </footer>
  </div>
</template>
<script>
import { Toast } from "vant";
import BackButton from "@/components/Chc_back_button";
import { mapState, mapMutations } from "vuex";
import {
  getTeacherInfo,
  getTeacherDetail,
  getLesson,
  tabFocus,
  getSay,
} from "@/utils/api";
export default {
  name: "",
  data() {
    return {
      // 老师基本信息
      teacher: {
        // img: "./img/小新.jpg",
        // name: "李湘",
        // alt:'',
        // // sex: "女",
        // // age: "32",
        // // teachingTime: "10年教龄",
        // // focus: 1012,
        // teacherTag: [
        //   "创造力丰富",
        //   "为人和善",
        //   "讲课方式新颖",
        //   "创造力丰富",
        //   "讲课方式新颖",
        // ],
        // id:0
      },
      // 切换信息下标
      active: null,
      // 老师详细信息
      teacherDetail: [
        {
          title: "毕业学院",
          info: "北京大学",
        },
        {
          title: "综合评价",
          info: "北京大学",
        },
        {
          title: "授课范围",
          info: "考研英语、雅思、托福、四六级",
        },
        {
          title: "擅长科目",
          info: "英语",
        },
        {
          title: "授课价格",
          info: "5学习币",
        },
        {
          title: "自我介绍",
          info: "偶像",
        },
        {
          title: "擅长题目",
          info:
            "教程作者：白套白（软件基础营33期学院）作者的分离会计分录看到过建瓯盘发动机盖攻击力卡第三方件拉的屎咖啡机阿拉丁可使肌肤蓝卡队数据分离卡戴珊交付了卡戴珊收款单方面修理厂是OKR金德生科技围殴烦恼违法违纪佛龛时代峻峰奥术大师大S的文档安慰法抗衰老的减肥克里斯多夫鸡儿",
        },
      ],
      //评论信息
      say: [
        {
          sayImg: "./img/小新.jpg",
          sayName: "辅助",
          sayNum: 5,
          sayTag: ["创造力丰富", "为人和善", "讲课方式新颖"],
          sayAlt: "很棒的课程",
          sayTime: "2020-10-10 18:00",
        },
        {
          sayImg: "./img/小新.jpg",
          sayName: "辅助",
          sayNum: 5,
          sayTag: ["创造力丰富", "为人和善", "讲课方式新颖"],
          sayAlt: "很棒的课程",
          sayTime: "2020-10-10 18:00",
        },
        {
          sayImg: "./img/小新.jpg",
          sayName: "辅助",
          sayNum: 5,
          sayTag: ["创造力丰富", "为人和善", "讲课方式新颖"],
          sayAlt: "很棒的课程",
          sayTime: "2020-10-10 18:00",
        },
      ],
      // 课程
      lesson: [],
      focusState: null, //关注状态
      yesStyle: "yesStyle", //已关注样式
      noStyle: "noStyle", //未关注样式
      signState: false, //报名状态
    };
  },
  components: {
    BackButton,
  },
  props: [],
  computed: {
    //关注状态
    // ...mapState(['focusState'])
  },
  created() {},
  mounted() {
    this.active = 0; //挂载时切换下标为0
    //发送老师详情请求
    getTeacherDetail(this.$route.query.id).then((res) => {
      console.log(res);
      this.isFocus(res.flag);
      this.teacher = res.teacher;
      this.teacher.teacherTag = [
        "创造力丰富",
        "为人和善",
        "讲课方式新颖",
        "创造力丰富",
        "讲课方式新颖",
      ];
    });
  },
  methods: {
    ...mapMutations(["changeFocus"]), //在vuex操作关注老师id，已废弃
    //判断是否关注
    isFocus(res) {
      if (res === 1) {
        this.focusState = false;
      } else {
        this.focusState = true;
      }
    },
    // 点击关注，切换状态
    clickFocus() {
      if(!localStorage.getItem('token')){
        this.$router.push('/login')
        Toast({
          message: "还未登录",
          icon: "fail",
          duration: 600,
        })
      }else{
        tabFocus(this.$route.query.id).then((res) => {
        this.isFocus(res);
      });
      // this.focusState = !this.focusState
      if (this.focusState) {
        Toast({
          message: "关注成功",
          icon: "like",
          duration: 600,
        });
      } else {
        Toast({
          message: "取消关注",
          icon: "like-o",
          duration: 600,
        });
      }
      }
      
    },
    //信息切换
    tab(i) {
      this.active = i;
    },
    //跳到课程详情
    getLessonDetail(id) {
      console.log(id)
      this.$router.push({
        path: "/free",
        query:{
          id:id
        }
      });
    },
    //报名
    toSign() {
      this.signState = !this.signState;
    },
  },
  watch: {
    active(i) {
      if (i === 0) {
        getTeacherInfo(this.$route.query.id).then((res) => {});
      } else if (i === 1) {
        let val = {
          limit: "",
          page: "",
          id: this.$route.query.id,
        };
        getSay(val).then((res) => {});
      } else if (i === 2) {
        let val = {
          limit: "",
          page: "",
          id: this.$route.query.id,
        };
        getLesson(val).then((res) => {
          // 循环所有课程，寻找包含教师id的课程
          //如果有能找到就添加，找不到就随机添加
          res.forEach((item, index, array) => {
            if (item.teachers_list[0].id == this.$route.query.id) {
              this.lesson.push(item);
            }
          });
          var length = parseInt(Math.random());
          if (this.lesson.length === 0) {
            for (var i = 0; i <= 2; i++) {
              let n = parseInt(Math.random() * res.length);
              this.lesson.push(res[n]);
            }
          }
        });
      }
    },
  },
};
</script>


<style lang='scss' scoped>
@mixin between {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}
#detail {
  width: 100%;
  height: 100%;
  background: rgb(241, 241, 241);
  position: relative;
  .van-button {
    position: absolute;
    bottom: 0rem;
  }
  // 头部
  header {
    width: 100%;
    height: 4rem;
    background-color: #ff9648;
    background-image: url("/img/detailbg1.png");
    background-size: 100% 90%;
    background-repeat: no-repeat;
    background-position: bottom;
  }
  // 老师信息
  .info {
    width: 100%;
    height: 2rem;
    background: white;
    padding: 0.2rem;
    font-size: 0.2rem;
    margin-bottom: 0.3rem;
    .top {
      height: 75%;
      @include between;
      // 老师头像
      .teacher-img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 1px solid #ff9648;
        overflow: hidden;
      }
      // 老师信息模块
      .teacher-module {
        width: 70%;
        height: 100%;
        padding: 0.15rem;
        h3 {
          font-weight: 600;
          line-height: 0.5rem;
        }
        p {
          color: silver;
          line-height: 0.5rem;
          span {
            margin-right: 0.2rem;
          }
        }
      }
      // 关注
      .add-focus {
        width: 11%;
        height: 100%;
        padding: 0.15rem 0rem;
        text-align: center;
        font-weight: bold;
        .focus-icon {
          width: 0.6rem;
          height: 0.6rem;
          line-height: 0.6rem;
          border-radius: 50%;
          margin-bottom: 0.1rem;
          img {
            width: 0.35rem;
            height: 0.35rem;
          }
        }
      }
      
    }
    // 老师标签
    .tag {
      width: 100%;
      height: 0.4rem;
      line-height: 0.4rem;
      display: fiex;
      flex-flow: row wrap;
      justify-content: start;
      align-items: center;
      overflow: hidden;
      .tag-item {
        height: 100%;
        background: rgb(231, 231, 231);
        color: silver;
        margin-right: 0.1rem;
        padding: 0rem 0.1rem;
        border-radius: 0.05rem;
        transform: scale(0.8);
      }
    }
  }
  //主要信息
  .main {
    width: 100%;
    height: calc(100% - 7.3rem);
    background: white;
    //主要内容包裹
    /deep/ .van-tab__pane {
      height: 5.1rem;
      padding: 0.35rem;
      padding-bottom: 0rem;
      overflow: scroll;
      //老师详情信息
      .teacher-detail {
        width: 100%;
        height: 100%;
        ul {
          width: 100%;
          overflow: scroll;
          @include between;
          li {
            width: 100%;
            margin: 0.1rem 0rem;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: start;
            span:nth-child(1) {
              color: silver;
            }
            span:nth-child(2) {
              width: 70%;
            }
          }
        }
      }
      //评价
      .say {
        width: 100%;
        // height: 3rem;
        margin-bottom: 0.3rem;
        @include between;
        align-items: start;
        // 评价头像
        .say-img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          overflow: hidden;
        }
        // 评价信息
        .say-info {
          width: 88%;
          height: 100%;
          color: rgb(146, 146, 146);
          h3 {
            color: black;
            font-size: 0.27rem;
          }
          p {
            margin: 0.1rem 0rem;
            .say-tag {
              padding: 0.1rem;
              margin-right: 0.1rem;
              border-radius: 0.05rem;
              background: rgb(231, 231, 231);
              font-weight: lighter;
              font-size: 0.2rem;
              transform: scale(0.9);
            }
          }
        }
      }
      //课程
      .lesson {
        width: 100%;
        height: 1.7rem;
        padding: 0.2rem 0rem;
        @include between;
        align-items: start;
        .lesson-img {
          width: 35%;
          height: 100%;
        }
        .lesson-info {
          width: 60%;
          height: 100%;
          position: relative;
          h2 {
            font-size: 0.3rem;
            font-weight: bold;
          }
          p {
            margin-top: 0.15rem;
            font-size: 0.2rem;
            color: silver;
          }
          p:last-child {
            width: 100%;
            position: absolute;
            bottom: 0rem;
            @include between;
            .price {
              font-size: 0.3rem;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  //已关注样式
      /deep/.yesStyle {
        color: rgb(126, 126, 126);
        .focus-icon {
          background: linear-gradient(190deg, #b1b1b1, #000000);
        }
      }
      // 没关注样式
      /deep/.noStyle {
        color: #ff8518;
        .focus-icon {
          background: linear-gradient(190deg, #fff6ef, #ff6600);
        }
      }
  footer{
    button{
      color: white !important;
    }
  }
}
</style>