
-- tags are missing yet


-- add users
INSERT INTO `bancha_samles_users` (`id`, `name`, `login`, `created`, `email`, `avatar`, `weight`, `height`) VALUES
(1, 'Roland', 'roland', '2011-07-28 03:54:20', 'mail@rolandschuetz.at', 'roland.jpg', 76, 187),
(2, 'Andreas', 'andreas', '2011-07-28 03:54:20', 'andreas.kern@gmail.com', 'andreas.jpg', 70, 230),
(3, 'Florian', 'florian', '2011-07-28 03:54:20', 'f.eckerstorfer@gmail.com', 'florian.jpg', 80, 180),
(4, 'Kung', 'kung', '2011-07-28 03:54:20', 'kung.wong@gmail.com', 'kung.jpg', 82, 186);


-- add articles
INSERT INTO `bancha_samles_articles` (`id`, `title`, `date`, `body`, `published`, `user_id`) VALUES
(11, 'Titel 1', '2011-11-21 01:50:38', 'This is the text for 1', 0, 1),
(12, 'Titel 2', '2011-11-21 01:50:38', 'This is the text for 2', 0, 1),
(13, 'Titel 3', '2011-11-21 01:50:38', 'This is the text for 3', 1, 1),
(14, 'Titel 4', '2011-11-21 01:50:38', 'This is the text for 4', 1, 2),
(15, 'Titel 5', '2011-11-21 01:50:38', 'This is the text for 5', 1, 2),
(16, 'Titel 6', '2011-11-21 01:50:38', 'This is the text for 6', 1, 2),
(17, 'Titel 7', '2011-11-21 01:50:38', 'This is the text for 7', 1, 3),
(18, 'Titel 8', '2011-11-21 01:50:38', 'This is the text for 8', 1, 3),
(19, 'Titel 9', '2011-11-21 01:50:38', 'This is the text for 9', 1, 3),
(20, 'Titel 10', '2011-11-21 01:50:38', 'This is the text for 10', 1, 4),
(21, 'Titel 11', '2011-11-21 01:50:38', 'This is the text for 11', 1, 4),
(22, 'Titel 12', '2011-11-21 01:50:38', 'This is the text for 12', 1, 4),
(23, 'Titel 13', '2011-11-21 01:50:38', 'This is the text for 13', 1, 1),
(24, 'Titel 14', '2011-11-21 01:50:38', 'This is the text for 14', 1, 1),
(25, 'Titel 15', '2011-11-21 01:50:38', 'This is the text for 15', 1, 1),
(26, 'Titel 16', '2011-11-21 01:50:38', 'This is the text for 16', 1, 1),
(27, 'Titel 17', '2011-11-21 01:50:38', 'This is the text for 17', 1, 3),
(28, 'Titel 18', '2011-11-21 01:50:38', 'This is the text for 18', 1, 3),
(29, 'Titel 19', '2011-11-21 01:50:38', 'This is the text for 19', 1, 3),
(30, 'Titel 20', '2011-11-21 01:50:38', 'This is the text for 20', 1, 3),
(31, 'Titel 21', '2011-11-21 01:50:38', 'This is the text for 21', 1, 1),
(32, 'Titel 22', '2011-11-21 01:50:38', 'This is the text for 22', 1, 2),
(33, 'Titel 23', '2011-11-21 01:50:38', 'This is the text for 23', 1, 2),
(34, 'Titel 24', '2011-11-21 01:50:38', 'This is the text for 24', 1, 2),
(35, 'Titel 25', '2011-11-21 01:50:38', 'This is the text for 25', 1, 2),
(36, 'Titel 26', '2011-11-21 01:50:38', 'This is the text for 26', 1, 2),
(37, 'Titel 27', '2011-11-21 01:50:38', 'This is the text for 27', 1, 3),
(38, 'Titel 28', '2011-11-21 01:50:38', 'This is the text for 28', 1, 3),
(39, 'Titel 29', '2011-11-21 01:50:38', 'This is the text for 29', 1, 3),
(40, 'Titel 30', '2011-11-21 01:50:38', 'This is the text for 30', 1, 4),
(41, 'Titel 31', '2011-11-21 01:50:38', 'This is the text for 31', 1, 4),
(42, 'Titel 32', '2011-11-21 01:50:38', 'This is the text for 32', 1, 4),
(43, 'Titel 33', '2011-11-21 01:50:38', 'This is the text for 33', 1, 4);
