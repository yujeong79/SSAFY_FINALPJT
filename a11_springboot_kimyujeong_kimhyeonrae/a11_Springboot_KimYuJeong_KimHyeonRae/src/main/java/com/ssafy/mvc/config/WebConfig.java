//package com.ssafy.mvc.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import com.ssafy.mvc.interceptor.AIInterceptor;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//	
//	@Autowired
//	private AIInterceptor aiInterceptor;
//	
//	@Override
//	public void addInterceptors(InterceptorRegistry registry) {
//		registry.addInterceptor(aiInterceptor).addPathPatterns("/api-message/regist");
//	}
//}
