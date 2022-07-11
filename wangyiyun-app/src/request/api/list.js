import service from '..'

// http://openapi.music.163.com/openapi/music/basic/playlist/detail

// 获取歌单详情页的数据
export function getPlayList(id) {
    return service({
        method: 'GET',
        url: `playlist/detail?id=${id}`
    })
}

// 获取歌单所有歌曲
export function getListAllMusic(id, limit, offset) {
    return service({
        method: 'GET',
        url: `playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
    })
}

// 获取歌词
export function getLyric(id) {
    return service({
        method: 'GET',
        url: `/lyric?id=${id}`
    })
}