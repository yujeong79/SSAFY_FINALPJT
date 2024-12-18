import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useSharingStore = defineStore('share', () => {
    
    const sendKakao = (shareMessage) => {
      if (!window.Kakao.isInitialized()) {
        console.error('Kakao SDK is not initialized.');
        return;
      }
  
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareMessage.title,
          description: shareMessage.description,
          imageUrl: shareMessage.imageUrl,
          link: {
            mobileWebUrl: shareMessage.url,
            webUrl: shareMessage.url,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: shareMessage.url,
              webUrl: shareMessage.url,
            },
          },
        ],
      });
    };

    const sendX = (shareMessage) => {
      const twitterBaseUrl = 'https://twitter.com/intent/tweet';
      const tweetText = encodeURIComponent(
        `${shareMessage.title}\n\n${shareMessage.description}\n\n자세히 보기: ${shareMessage.url}`
      );
      const tweetUrl = `${twitterBaseUrl}?text=${tweetText}`;
      window.open(tweetUrl, '_blank');
    };
  
    return {
      sendKakao,
      sendX
    };
  });
