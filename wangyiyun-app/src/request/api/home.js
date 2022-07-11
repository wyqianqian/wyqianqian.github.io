import service from "..";

// 获取轮播图
export function getBanner() {
    return service({
        method: 'GET',
        url: 'banner?type=2'
    });
}

//获取推荐歌单
export function getRecommendMusicList() {
    return service({
        method: 'GET',
        url: 'personalized?limit=10'
    });
}

// 搜索
export function getSearchResult(keyword) {
    return service({
        method: 'GET',
        url: `search?keywords=${keyword}`
    });
}

// 登录
export function getPhoneLogin(data) {
    return service({
        method: 'GET',
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
    });
}

// 用户详情
export function getUserDetail(id) {
    return service({
        method: "GET",
        url: `/user/detail?uid=${id}`
    })
}