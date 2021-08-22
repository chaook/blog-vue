<template>
  <div class="ui inverted vertical segment m-padded-tb-massive">
    <div class="ui center aligned container m-padded-tb-mini">
      <div class="ui stackable inverted divided grid">
        <div class="three wide column">
          <div class="ui inverted link list">
            <div class="item">
              <!-- 保留位置，可以添加二维码等信息 -->
              <img v-if="about.image!==null" :src="$imageUrl + about.image" class="ui rounded image" style="width: 110px">
            </div>
          </div>
        </div>

        <div class="three wide column">
          <h4 class="ui inverted header m-text-spaced m-opacity-small">
            联系我
          </h4>
          <div class="ui inverted link list m-text-lined">
            <div class="item">QQ:{{ about.qq }}</div>
            <div class="item">WeChat:{{ about.wechat }}</div>
            <div class="item">Email{{ about.email }}</div>
          </div>
        </div>

        <div class="seven wide column">
          <h4 class="ui inverted header m-text-spaced m-opacity-small">
            关于我
          </h4>
          <p class="m-text-thin m-text-spaced m-opacity-mini">{{ about.aboutMe || "学习永无止境"}}</p>
          <p></p>
        </div>

        <div class="three wide column">
          <h4 class="ui inverted header m-text-spaced m-opacity-small">
            备案信息
          </h4>
          <a href="http://beian.miit.gov.cn/">{{ about.record || "暂无"}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      about: {
        image: null,
        qq: '',
        wechat: '',
        email: '',
        aboutMe: '',
        record: ''
      }
    };
  },
  mounted() {
    this.getAbout();
  },
  methods: {
    async getAbout() {
      const res = await this.$http.get("/about");
      if (res.data.data !== null){
        this.about = res.data.data;
      }
    }
  }
};
</script>