<template>
  <div>
    <van-nav-bar title="题库选择" left-arrow @click-left="onClickLeft" fixed />
    <van-search v-model="value" placeholder="请输入搜索关键词" />

    <van-row>
      <van-col span="6">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="item.title"
            v-for="(item, index) in Zpy_titleList"
            :key="index"
          />
        </van-sidebar>
      </van-col>
      <van-col span="18"></van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      activeKey: "",
      Zpy_titleList: [
        { title: "求导题库", id: 1 },
        { title: "极限题库", id: 2 },
        { title: "生物", id: 3 },
        { title: "化学", id: 4 },
        { title: "数学", id: 5 },
        { title: "物理", id: 6 },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
<<<<<<< HEAD
  mounted() {
    // 专练分类
    getClassify().then((res) => {
      console.log(res);
      this.Zpy_titleList = res;
    });
    //专练列表内容
    getList().then((res) => {
      // console.log(res);
      this.Zpy_List = res.list;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    Zpy_price() {
      this.Zpy_List.sort((a, b) => {
        return b.price - a.price;
      });
    },
    Zpy_price2() {
      this.Zpy_List.sort((a, b) => {
        return a.price - b.price;
      });
    },
    Zpy_hot() {
      this.Zpy_List.sort((a, b) => {
        return b.sales_base - a.sales_base;
      });
    },
    Zpy_time() {},
    Zpy_goDeatil(id){
      this.$router.push({path:'/book',query:{id}})
    }
  },
=======
>>>>>>> d03aa5043faa8a8ad32cd4ae0da910c14a2ae753
};
</script>
<style lang="scss" scoped>
.van-search__content {
  margin-top: 1rem;
}
</style>