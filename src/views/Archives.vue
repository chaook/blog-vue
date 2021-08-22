<template>
    <div id="timeline" v-if="timeLine != null">
        <section class="year" v-for="(value, key) in timeLine" :key="key">
            <h3>{{value[0]}}</h3>
            <section>
                <ul>
                    <div v-for="(item, index) in value[1]" :key="index">
                        <li>
                            <a @click.prevent="goBlog(item.blogId)" href="#" >{{item.title}}</a>
                            &nbsp;
                            <span>{{item.date}}</span>
                        </li>
                    </div>
                </ul>
            </section>
        </section>
    </div>
    <div
    v-else
    style="font-family:宋体;font-size: 20px; font-weight: 600;!important;text-align: center"
    >
    暂时没有数据
  </div>
</template>

<script>

export default {
  data() {
    return {
      timeLine: null
    }
  },
  mounted() {
    this.getTimeLine();
  },
  methods: {
    async getTimeLine() {
      const res = await this.$http.get("/archive")
      this.timeLine = new Map(Object.entries(res.data.data));
    },
     goBlog(blogId) {
       this.$router.push(`blog/${blogId}`)
     }
  }
}
</script>