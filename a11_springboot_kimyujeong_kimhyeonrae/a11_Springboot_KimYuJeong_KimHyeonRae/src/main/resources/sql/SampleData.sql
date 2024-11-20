-- video review 샘플 데이터
INSERT INTO `review` (`video_id`, `email`, `content`)
VALUES ('1', 'gusto917', "하고 나니 배고파요"),
		('2', 'aabbc0908@naver.com', "상체 전반적으로 운동할 수 있어서 좋았어요!"),
        ('3', 'gusto917', "등살이 사라졌어요~!"),
        ('4', 'gusto917', "어깨가 제니됨ㅎ"),
        ('4', 'aabbc0908@naver.com', "직각어깨 대박"),
        ('5', 'gusto917', "가슴 펌핑 대박이에요"),
		('6', 'gusto917', "팔이 완전 얇아졌어요"),
        ('6', 'aabbc0908@naver.com', "1일차"),
        ('6', 'aabbc0908@naver.com', "2일차"),
        ('7', 'gusto917', "배가 홀쭉해졌어요"),
        ('8', 'gusto917', "다리가 후들거려요"),
        ('8', 'aabbc0908@naver.com', "하고 나면 못 걷겠어요"),
        ('9', 'gusto917', "엉덩이가 완전 업됐어요"),
        ('10', 'gusto917', "허벅지가 얇아졌어요"),
        ('11', 'gusto917', "종아리가 얇아졌어요"),
        ('12', 'aabbc0908@naver.com', "얼굴이 작아졌어요");

-- goal 샘플 데이터 수정
INSERT INTO `goal` (`email`, `start_date`, `end_date`, `day`, `goal_code`, `goal_description`, `text`, `pledge`)
-- VALUES ('aabbc0908@naver.com', '2024-11-10', '2024-12-31', 100, '5kg 감량', '나 다이어트 할거다~!', '실패하면 뿌링클 쏜다~!'),
	VALUES ('gusto917', '2024-12-01', '2024-12-31', 30, 100, '10kg 증량', '나 살찔거야', '실패하면 돈까스에 새우멘치까지 사줌');

-- message 샘플 데이터
INSERT INTO `message` (`goal_id`, `receiver`, `sender`, `sender_nickname`, `content`, `day`, `stickerId`)
VALUES (1, 'gusto917', 'aabbc0908@naver.com', '수원얼짱녀', '5키로 증량 껌이지', 1, 1),
		(1, 'gusto917', 'aabbc0908@naver.com', '수원최고미인', '돈까스 잘 먹을게~ㅎㅎ', 10, 3);

commit;

SELECT * FROM `review`;
SELECT * FROM `goal_type`;
SELECT * FROM `goal`;
SELECT * FROM `message`;

DESC `goal`;