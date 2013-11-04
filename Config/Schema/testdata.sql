

/*
 * Please make sure to adopt the tables prefix here
 */


-- tags are missing yet

-- add users
DELETE FROM `bancha_10_samples_users` where 1=1;
INSERT INTO `bancha_10_samples_users` (`id`, `name`, `login`, `created`, `email`, `avatar`, `weight`, `height`) VALUES
(1, 'Roland', 'roland', '2011-07-28 03:54:20', 'mail@rolandschuetz.at', 'img/user-avatars/bancha-logo-1.png', 76, 187),
(2, 'Andreas', 'andreas', '2011-07-28 03:54:20', 'andreas.kern@gmail.com', 'img/user-avatars/bancha-logo-2.jpg', 70, 230),
(3, 'Florian', 'florian', '2011-07-28 03:54:20', 'f.eckerstorfer@gmail.com', 'img/user-avatars/bancha-logo-1.png', 80, 180),
(4, 'Kung', 'kung', '2011-07-28 03:54:20', 'kung.wong@gmail.com', 'img/user-avatars/bancha-logo-1.png', 82, 186);


-- add articles
DELETE FROM `bancha_10_samples_articles` where 1=1;
INSERT INTO `bancha_10_samples_articles` (`id`, `title`, `date`, `body`, `published`, `user_id`) VALUES
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

-- add tasks (tree data)
DELETE FROM `bancha_10_samples_tasks` where 1=1;
INSERT INTO `bancha_10_samples_tasks` VALUES(16, NULL, 1, 28, 'Project: Shopping', 13.25, 'Tommy Maintz', 'task-folder', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(17, NULL, 29, 54, 'Project: Testing', 2.00, 'Core Team', 'task-folder', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(18, 16, 2, 11, 'Housewares', 1.25, 'Tommy Maintz', 'task-folder', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(19, 16, 12, 27, 'Remodeling', 12.00, 'Tommy Maintz', 'task-folder', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(20, 18, 3, 4, 'Kitchen supplies', 0.25, 'Tommy Maintz', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(21, 18, 5, 6, 'Groceries', 0.40, 'Tommy Maintz', 'task', 1);
INSERT INTO `bancha_10_samples_tasks` VALUES(22, 18, 7, 8, 'Cleaning supplies', 0.40, 'Tommy Maintz', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(23, 18, 9, 10, 'Office supplies', 0.20, 'Tommy Maintz', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(24, 19, 13, 14, 'Retile kitchen', 6.50, 'Tommy Maintz', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(25, 19, 15, 20, 'Paint bedroom', 2.75, 'Tommy Maintz', 'task-folder', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(26, 19, 21, 22, 'Decorate living room', 2.75, 'Tommy Maintz', 'task', 1);
INSERT INTO `bancha_10_samples_tasks` VALUES(27, 19, 23, 24, 'Fix lights', 0.75, 'Tommy Maintz', 'task', 1);
INSERT INTO `bancha_10_samples_tasks` VALUES(28, 19, 25, 26, 'Reattach screen door', 2.00, 'Tommy Maintz', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(29, 25, 16, 17, 'Ceiling', 1.25, 'Tommy Maintz', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(30, 25, 18, 19, 'Walls', 1.50, 'Tommy Maintz', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(31, 17, 30, 37, 'Mac OSX', 0.75, 'Tommy Maintz', 'task-folder', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(32, 17, 38, 47, 'Windows', 3.75, 'Darrell Meyer', 'task-folder', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(33, 17, 48, 53, 'Linux', 0.50, 'Aaron Conran', 'task-folder', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(34, 31, 31, 32, 'FireFox', 0.25, 'Tommy Maintz', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(35, 31, 33, 34, 'Safari', 0.25, 'Tommy Maintz', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(36, 31, 35, 36, 'Chrome', 0.25, 'Tommy Maintz', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(37, 32, 39, 40, 'FireFox', 0.25, 'Darrell Meyer', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(38, 32, 41, 42, 'Safari', 0.25, 'Darrell Meyer', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(39, 32, 43, 44, 'Chrome', 0.25, 'Darrell Meyer', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(40, 32, 45, 46, 'Internet Exploder', 3.00, 'Darrell Meyer', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(41, 33, 49, 50, 'FireFox', 0.25, 'Aaron Conran', 'task', 0);
INSERT INTO `bancha_10_samples_tasks` VALUES(42, 33, 51, 52, 'Chrome', 0.25, 'Aaron Conran', 'task', 0);
