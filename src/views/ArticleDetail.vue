<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span
        :class="{active:article.has_follow}"
        @click="followThisUser"
      >{{article.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{article.title}}</div>
      <div class="desc">
        <span>{{article.user.nickname}}</span> &nbsp;&nbsp;
        <span>{{article.user.create_date|dateFormat}}</span>
      </div>
      <!-- 当新闻不是视频的时候 -->
      <div class="content" v-html="article.content" v-if="article.type===1"></div>
      <!-- 当新闻是视频的时候 -->
      <video :src="article.content" v-if="article.type===2" controls></video>
      <div class="opt">
        <span class="like" :class="{active:article.has_like}" @click="likeThisArticle">
          <van-icon name="good-job-o" />
          {{article.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="http://127.0.0.1:3000/uploads/image/IMG1568705287936.jpeg" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <hmCommentFooter :post="article"></hmCommentFooter>
  </div>
</template>

<script>
// 引入封装的根据新闻id获取新闻详情的方法
// 引入实现点赞和取消点赞的方法
import { getArticleById, likeArticle } from "@/apis/article.js";
// 引入全局过滤器
import { dateFormat } from "@/utils/myfilters.js";
// 引入实现关注和取消用户的方法
import { followUser, unfollowUser } from "@/apis/user.js";
// 引入底部评论块
import hmCommentFooter from "@/components/hmCommentFooter.vue"
export default {
  data() {
    return {
      article: {
        user: {}
      }
    };
  },
  async mounted() {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let res = await getArticleById(this.$route.params.id);
    console.log(res);
    this.article = res.data.data;
  },
  methods: {
    // 关注和取消关注
    async followThisUser() {
      let res;
      // 如果has_follow=true，说明已经关注，再次点击是想要取消关注
      if (this.article.has_follow) {
        res = await unfollowUser(this.article.user.id);
      } else {
        // 否则说明已经取消关注，再次点击是想要关注
        res = await followUser(this.article.user.id);
      }
      // 更新页面上是否已关注按钮的状态
      this.article.has_follow = !this.article.has_follow;
      console.log(res);
      // 提示用户是否关注（取消关注）成功
      this.$toast.success(res.data.message);
    },

    // 点赞和取消点赞
    async likeThisArticle() {
      let res = await likeArticle(this.article.id);
      // console.log(res);
      if(res.data.message==='点赞成功'){
        ++this.article.like_length
      }else{
        --this.article.like_length
      }
      // 更新页面上是否点赞的状态
      this.article.has_like = !this.article.has_like;
      this.$toast.success(res.data.message)
    }
  },
  //注册
  components:{
    hmCommentFooter
  },
  // 注册过滤器
  filters: {
    dateFormat
  }
};
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    border: 1px solid #ccc;
    color: #000;
    &.active {
      background-color: #f00;
      color: #fff;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    // /deep/.photo {
    //   img {
    //     display: block;
    //     width: 100%;
    //   }
    // }
    /deep/img{
      width: 100%;
      display: block
    }
  }
  video {
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .like {
    &.active {
      color: red;
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px 50px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
