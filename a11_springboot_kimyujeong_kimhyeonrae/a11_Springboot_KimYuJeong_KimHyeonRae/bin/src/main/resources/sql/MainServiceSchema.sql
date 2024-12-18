DROP DATABASE IF EXISTS `SSAFIT`;
CREATE DATABASE `SSAFIT`;
USE `SSAFIT`;

-- 메인 기본 서비스 스키마
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
    `review_id` INT PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL, -- 카카오 API에 맞게 수정
    `video_id` VARCHAR(50) NOT NULL,        
    `content` TEXT NOT NULL
);

commit;

SELECT * FROM review;