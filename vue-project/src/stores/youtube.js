import { ref, onMounted, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export const useYoutubeStore = defineStore('youtube', () => {
  const videoList = ref([]);
  const video = ref(JSON.parse(sessionStorage.getItem('clickedVideo')) || null);

  // 검색 수행
  const youtubeSearch = function (searchKeyword) {
    const url = `https://www.googleapis.com/youtube/v3/search`;
    const API_KEY = `AIzaSyAdwWjg2XQMvnIuYdB-GW11N9MebrNmcVo`;

    axios({
      url,
      method: 'GET',
      params: {
        key: API_KEY,
        part: 'snippet',
        maxResults: 10,
        q: searchKeyword,
        type: 'video',
      },
    })
      .then((response) => {
        sessionStorage.setItem('keyword', searchKeyword);
        videoList.value = response.data.items;
      })
      .catch(() => {
        console.log('유튜브 검색 에러 발생');
      });
  };

  // 비디오 클릭
  const clickVideo = function(clickedVideo) {
    sessionStorage.setItem('clickedVideo', JSON.stringify(clickedVideo));
    video.value = clickedVideo;
    console.log(video.value);
    router.push({name: 'detail'});
  };

  return {
    videoList,
    youtubeSearch,
    video,
    clickVideo,
  };
});
