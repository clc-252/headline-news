// 引入已经封装好的axios
import axios from '@/utils/myaxios.js'

// 1.封装一个实现获取栏目新闻数据的方法
export const getPostList=(params)=>{
    return axios({
        url:'/post',
        params
    }) 
}

// 2.封装一个实现根据新闻id获取新闻详情的方法
export const getArticleById=(id)=>{
    return axios({
        url:`/post/${id}`
    })
}

// 3.封装一个实现点赞和取消赞的方法
export const likeArticle=(id)=>{
    return axios({
        url:`/post_like/${id}`
    })
}

// 4.封装一个实现收藏和取消收藏的方法
export const starArticle=(id)=>{
    return axios({
        url:`/post_star/${id}`
    })
}

// 5.封装一个实现获取新闻评论列表的方法
export const getCommentList=(id,params)=>{
    return axios({
        url:`/post_comment/${id}`,
        params
    })
}

// 6.封装一个实现发布评论的方法
export const replyComment=(id,data)=>{
    return axios({
        method:'post',
        url:`/post_comment/${id}`,
        data
    })
}

// 封装一个实现文章搜索的方法
export const searchArticle=(params)=>{
    return axios({
        url:'/post_search',
        params
    })
}