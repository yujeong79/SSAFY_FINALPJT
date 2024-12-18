package com.ssafy.mvc.interceptor;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.mvc.model.dto.Message;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.util.ContentCachingRequestWrapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AIInterceptor implements HandlerInterceptor {

    private final OpenAiChatModel openAiChatModel;

    public AIInterceptor(OpenAiChatModel openAiChatModel) {
        this.openAiChatModel = openAiChatModel;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 메시지 본문 추출
    	 if (!(request instanceof ContentCachingRequestWrapper)) {
             request = new ContentCachingRequestWrapper(request);
         }
        
        // 요청 본문에서 Message 객체 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        Message message = objectMapper.readValue(request.getInputStream(), Message.class);
        System.out.println(message);
        
        // 메시지 content 분석
        String messageContent = message.getContent();
        boolean isOffensive = analyzeMessageContent(messageContent);

        if (isOffensive) {
            // 욕설이 포함된 경우 요청 중단 및 응답 반환
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            response.setContentType("application/json");
//            response.getWriter().write("{\"error\":\"욕설이 포함된 메시지는 등록할 수 없습니다.\"}");
            return false;
        }

        // 요청 진행
        return true;
    }

    private boolean analyzeMessageContent(String content) {
        try {
        	String command = "'" + content + "' 에 욕설이 있으면 예, 없으면 아니오 라고 대답해";
            // GPT를 호출하여 응답 받기
            String response = openAiChatModel.call(command);
            System.out.println(command);
            System.out.println(response);

            if(response.equals("예")) return true;
            else return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false; // 기본적으로 욕설이 아니라고 판단
        }
    }
}
