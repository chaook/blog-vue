<template>
  <div class="m-padded-tb-large">
    <div class="ui stackable container m-container-nine">
      <h3 class="ui header m-text">
        <i class="fab fa-wolf-pack-battalion"></i>推荐网站:
      </h3>
      <br />
      <div class="ui cards">
        <a
          v-for="(item, index) in remList"
          :key="index"
          :href="item.webSite"
          class="orange card m-card-center"
        >
          <div class="content">
            <div class="header" href="#">{{item.name}}</div>
            <p >{{item.description}}</p>
          </div>
        </a>
      </div>

      <div class="ui section divider m-padded-tb"></div>
      <div class="ui stackable grid">
        <div class="ui eleven wide column">
          <h3 class="ui header m-text">
            <i class="fas fa-users"></i>友情链接:
          </h3>

          <br />
          <div class="ui link cards">
            <a
              v-for="(item, index) in friendList"
              :key="index"
              :href="item.webSite"
              class="teal card m-card-center"
            >
              <div class="content">
                <div class="header">{{item.name}}</div>
                <div class="description" >
                  {{item.description}}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      remList: [],
      friendList: []
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    async init() {
      const res = await this.$http.get("/friend");
      this.friendList = res.data.data;
      const rem = await this.$http.get("/friend", { params: { isRecommend: true} });
      this.remList = rem.data.data
    }
  }
}
</script>