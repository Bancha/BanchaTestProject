
-- tags are missing yet


-- add users
INSERT INTO `bancha_samles_users` (`id`, `name`, `login`, `created`, `email`, `avatar`, `weight`, `height`) VALUES
(1, 'Roland', 'roland', '2011-07-28 03:54:20', 'mail@rolandschuetz.at', 'img/user-avatars/bancha-logo-1.png', 76, 187),
(2, 'Andreas', 'andreas', '2011-07-28 03:54:20', 'andreas.kern@gmail.com', 'img/user-avatars/bancha-logo-2.jpg', 70, 230),
(3, 'Florian', 'florian', '2011-07-28 03:54:20', 'f.eckerstorfer@gmail.com', 'img/user-avatars/bancha-logo-1.png', 80, 180),
(4, 'Kung', 'kung', '2011-07-28 03:54:20', 'kung.wong@gmail.com', 'img/user-avatars/bancha-logo-1.png', 82, 186);


-- add articles
INSERT INTO `bancha_samles_articles` (`id`, `title`, `date`, `body`, `published`, `user_id`) VALUES
(11, 'Titel 01', '2011-11-21 01:50:34', 'This is the text for 01', 0, 1),
(12, 'Titel 02', '2011-11-21 01:50:42', 'This is the text for 02', 0, 1),
(13, 'Titel 03', '2011-11-21 01:50:38', 'This is the text for 03', 1, 1),
(14, 'Titel 04', '2011-11-21 01:50:38', 'This is the text for 04', 1, 2),
(15, 'Titel 05', '2011-11-21 01:50:38', 'This is the text for 05', 1, 2),
(16, 'Titel 06', '2011-11-21 01:50:38', 'This is the text for 06', 1, 2),
(17, 'Titel 07', '2011-11-21 01:50:38', 'This is the text for 07', 1, 3),
(18, 'Titel 08', '2011-11-21 01:50:38', 'This is the text for 08', 1, 3),
(19, 'Titel 09', '2011-11-21 01:50:38', 'This is the text for 09', 1, 3),
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
