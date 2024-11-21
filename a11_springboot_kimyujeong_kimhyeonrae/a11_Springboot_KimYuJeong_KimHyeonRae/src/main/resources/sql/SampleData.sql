-- goal 샘플 데이터 수정
INSERT INTO `goal` (`email`, `start_date`, `end_date`, `day`, `goal_code`, `goal_description`, `text`, `pledge`)
	VALUES ('gusto917', '2024-12-01', '2024-12-31', 30, 100, '10kg 증량', '나 살찔거야', '실패하면 돈까스에 새우멘치까지 사줌');

-- message 샘플 데이터
INSERT INTO `message` (`goal_id`, `receiver`, `sender`, `sender_nickname`, `content`, `day`, `stickerId`)
VALUES (1, 'gusto917', 'aabbc0908@naver.com', '수원얼짱녀', '5키로 증량 껌이지', 1, 1),
		(1, 'gusto917', 'aabbc0908@naver.com', '수원최고미인', '돈까스 잘 먹을게~ㅎㅎ', 10, 3);

commit;

DELETE FROM `message`
WHERE receiver = 'aabbc0908@naver.com';

SELECT * FROM `review`;
SELECT * FROM `goal_type`;
SELECT * FROM `goal`; 
SELECT * FROM `message`;

DESC `goal`;