-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2018 at 07:24 AM
-- Server version: 5.6.26
-- PHP Version: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gym`
--

-- --------------------------------------------------------

--
-- Table structure for table `alerttemp`
--

CREATE TABLE IF NOT EXISTS `alerttemp` (
  `member_id` int(11) NOT NULL,
  `alert_type` varchar(10) NOT NULL,
  `uptodate` int(11) NOT NULL,
  `expired_date` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `alerttemp`
--

INSERT INTO `alerttemp` (`member_id`, `alert_type`, `uptodate`, `expired_date`) VALUES
(13, 'day', 2, '03/06/2018'),
(17, 'day', 2, '02/23/2018'),
(18, 'day', 2, '02/26/2018'),
(19, 'day', 2, '02/26/2018');

-- --------------------------------------------------------

--
-- Table structure for table `alert_limit`
--

CREATE TABLE IF NOT EXISTS `alert_limit` (
  `alert_limit_id` int(11) NOT NULL,
  `description` varchar(250) NOT NULL,
  `limit_no` int(11) NOT NULL,
  `limit_type` varchar(10) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `recordstatus` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `alert_limit`
--

INSERT INTO `alert_limit` (`alert_limit_id`, `description`, `limit_no`, `limit_type`, `createddate`, `modifieddate`, `user_id`, `recordstatus`) VALUES
(1, 'expired', 1, 'day', '12/14/2016', '02/22/2018', 1, 1),
(2, 'daily alert', 0, 'day', '02/22/2018', '', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `alert_list`
--

CREATE TABLE IF NOT EXISTS `alert_list` (
  `alert_list_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `alert_date` varchar(10) NOT NULL,
  `action_date` varchar(10) NOT NULL,
  `alert_description` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `alert_list`
--

INSERT INTO `alert_list` (`alert_list_id`, `member_id`, `alert_date`, `action_date`, `alert_description`, `user_id`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(1, 17, '02/22/2018', '', 'There are some alert for this user. There are some alert for this user. There are some alert for this user. There are some alert for this user.', 1, '', '', 1),
(2, 12, '02/22/2018', '', 'There are some alert description.', 1, '', '', 1),
(3, 17, '02/24/2018', '02/24/2018', 'Some action to this person. Some action to this person.', 1, '02/24/2018', '', 1),
(4, 17, '02/25/2018', '02/24/2018', 'New action to this person.', 1, '02/24/2018', '', 2),
(5, 17, '02/26/2018', '02/24/2018', 'Action to this person today. Action to this person today.', 1, '02/24/2018', '', 1),
(6, 17, '02/27/2018', '02/24/2018', 'New Action. New Action to this person.', 1, '02/24/2018', '', 1),
(7, 17, '02/24/2018', '02/24/2018', 'New alert to this person. New alert to this person.', 1, '02/24/2018', '', 1),
(8, 17, '02/24/2018', '02/24/2018', 'New Action to this person.', 1, '02/24/2018', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `daily_action`
--

CREATE TABLE IF NOT EXISTS `daily_action` (
  `daily_action_id` int(11) NOT NULL,
  `action_date` varchar(10) NOT NULL,
  `week` varchar(255) NOT NULL,
  `days` int(11) NOT NULL,
  `training_id` int(11) NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `height` varchar(255) NOT NULL,
  `chest` varchar(255) NOT NULL,
  `arm` varchar(255) NOT NULL,
  `waist` varchar(255) NOT NULL,
  `thigh` varchar(255) NOT NULL,
  `glute` varchar(255) NOT NULL,
  `calf` varchar(255) NOT NULL,
  `org_name` text NOT NULL,
  `gen_name` text NOT NULL,
  `member_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `daily_action`
--

INSERT INTO `daily_action` (`daily_action_id`, `action_date`, `week`, `days`, `training_id`, `trainer_id`, `photo`, `weight`, `height`, `chest`, `arm`, `waist`, `thigh`, `glute`, `calf`, `org_name`, `gen_name`, `member_id`, `user_id`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(1, '02/20/2018', '5', 1, 1, 1, '', '5', '5', '5', '5', '5', '5', '5', '5', '', '', 12, 1, '02/20/2018', '', 2),
(2, '02/20/2018', '5', 3, 1, 1, '', '5', '5', '5', '5', '5', '5', '5', '5', '', '', 12, 1, '02/20/2018', '', 1),
(3, '02/20/2018', '6', 5, 3, 4, '', '6', '6', '6', '6', '6', '6', '6', '6', '', '', 12, 1, '02/20/2018', '', 1),
(4, '02/10/2018', '', 3, 1, 1, '', '9', '9', '9', '9', '9', '9', '9', '9', '', '', 12, 1, '02/20/2018', '', 1),
(5, '02/20/2018', '55', 3, 1, 1, '', '7', '7', '7', '7', '77', '77', '77', '77', '', '', 12, 1, '02/20/2018', '', 1),
(6, '02/20/2018', 'pp', 5, 1, 1, '', 'pp', 'pp', 'pp', 'pp', 'pp', 'pp', 'pp', 'pp', '', '', 12, 1, '02/20/2018', '', 1),
(7, '02/20/2018', 'uu', 4, 1, 1, '', 'uu', 'uu', 'uu', 'uu', 'uu', 'uu', 'uu', 'uu', '', '', 12, 1, '02/20/2018', '', 1),
(8, '02/22/2018', 'ee', 2, 1, 1, '', 'ee', 'ee', 'eeee', 'eeee', 'eee', 'eeee', 'eee', 'ee', '', '', 12, 1, '02/20/2018', '', 1),
(9, '02/20/2018', 'hh', 5, 1, 1, '', 'hh', 'hh', 'hhhh', 'hhhh', 'hhh', 'hhhh', 'hhhh', 'hhh', '', '', 15, 1, '02/20/2018', '', 1),
(10, '02/20/2018', '55555', 3, 1, 3, '', '5', '5', '5', '55', '55', '55', '55', '5', '', '', 12, 1, '02/20/2018', '', 1),
(11, '02/20/2018', '5', 3, 1, 5, '', '5', '555', '55', '55', '5555', '5', '5', '5555', '', '', 12, 1, '02/20/2018', '', 1),
(12, '02/28/2018', '3', 2, 3, 3, '', '5', '5', '5', '5', '5', '5', '5', '5', '', '', 15, 1, '02/28/2018', '', 1),
(13, '02/28/2018', '3', 3, 4, 3, '', '6', '6', '6', '6', '6', '6', '6', '6', 'Business_Website_Design.jpg', '307562aa26347d91274af9af15c64404.jpg', 12, 1, '02/28/2018', '', 1),
(14, '03/02/2018', '3', 1, 1, 1, '', '7', '7', '7', '7', '4', '4', '4', '4', 'c.png,h1.png,l1.png,p3.png', '', 12, 1, '03/02/2018', '', 1),
(15, '03/02/2018', '', 1, 1, 1, '', '', '', '', '', 'q', '', '', '', 'c1.png,p2.png', '29ba60abe9684f55b055d3b6b08d6fe5.png', 12, 1, '03/02/2018', '', 1),
(16, '03/02/2018', '2', 1, 1, 1, '', '', '', '', '', 'q', '', '', '', 'l2.png,p4.png,c1.png', '', 12, 1, '03/02/2018', '', 1),
(17, '03/02/2018', '', 3, 4, 4, '', '', '', '', '', '', '', '', '', 'p3.png,c.png', '49981b594ec9098343a34431e10993ad.png,13a7388ba04d170ac92fa5e2c32a6212.png', 17, 1, '03/02/2018', '', 1),
(18, '03/05/2018', '5', 1, 1, 1, '', '8', '8', '8', '8', '3', '3', '3', '3', 'alphabet-2010703_960_720.png,80-g2_de0ebd1f-3f38-4ffd-8c5a-717e82584615_grande.png', 'eedbedaed48e1b2e0354a9add4937358.png', 12, 1, '03/05/2018', '', 1),
(19, '03/06/2018', '', 3, 0, 0, '', '', '5''', '', '', '', '', '', '', '', '', 17, 1, '03/06/2018', '', 1),
(20, '03/06/2018', '5', 1, 1, 1, '', '55', '5''', '4', '4', '4', '4', '4', '4', '', '', 17, 1, '03/06/2018', '', 1),
(21, '03/06/2018', '', 3, 3, 1, '', '', '5'' 4"', '', '', '', '', '', '', '', '', 17, 1, '03/06/2018', '', 1),
(22, '03/06/2018', '3', 3, 1, 3, '', '45 kg', '5'' 4"', '33"', '15"', '24"', '23"', '36"', '16"', '', '', 17, 1, '03/06/2018', '', 1),
(23, '03/06/2018', '', 1, 0, 0, '', '', '5''', '', '', '', '', '', '', '', '', 17, 1, '03/06/2018', '', 1),
(24, '03/06/2018', '', 2, 0, 0, '', '', '5''', '', '', '', '', '', '', '', '', 17, 1, '03/06/2018', '', 1),
(25, '03/06/2018', '', 1, 0, 0, '', '', '7''', '', '', '', '', '', '', '', '', 17, 1, '03/06/2018', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE IF NOT EXISTS `expense` (
  `expense_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `exp_description` varchar(100) NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `exp_date` varchar(10) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `income_detail`
--

CREATE TABLE IF NOT EXISTS `income_detail` (
  `income_detail_id` int(11) NOT NULL,
  `income_header_id` int(11) NOT NULL,
  `income_date` varchar(10) NOT NULL,
  `leave_on_off` varchar(5) NOT NULL,
  `status_on_off` varchar(5) NOT NULL,
  `daily_action` varchar(255) NOT NULL,
  `daily_food` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `income_detail`
--

INSERT INTO `income_detail` (`income_detail_id`, `income_header_id`, `income_date`, `leave_on_off`, `status_on_off`, `daily_action`, `daily_food`, `remark`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(29, 17, '01/30/2018', '', '', '', '', '', '01/30/2018', '', 1),
(30, 17, '01/31/2018', '', '', '', '', '', '01/30/2018', '', 1),
(31, 17, '02/01/2018', '', '', '', '', '', '01/30/2018', '', 1),
(32, 18, '01/30/2018', '', '', '', '', '', '01/30/2018', '', 1),
(33, 18, '01/31/2018', '', '', '', '', '', '01/30/2018', '', 1),
(34, 18, '02/01/2018', '', '', '', '', '', '01/30/2018', '', 1),
(35, 19, '01/30/2018', '', '', '', '', '', '01/30/2018', '', 1),
(36, 19, '01/31/2018', '', '', '', '', '', '01/30/2018', '', 1),
(37, 19, '02/01/2018', '', '', '', '', '', '01/30/2018', '', 1),
(38, 19, '02/03/2018', '', '', '', '', '', '01/30/2018', '', 1),
(39, 19, '02/04/2018', '', '', '', '', '', '01/30/2018', '', 1),
(40, 19, '02/02/2018', '', '', '', '', '', '01/30/2018', '', 1),
(41, 20, '02/04/2018', '', '', '', '', '', '01/30/2018', '', 1),
(42, 20, '02/05/2018', '', '', '', '', '', '01/30/2018', '', 1),
(43, 20, '02/06/2018', '', '', '', '', '', '01/30/2018', '', 1),
(44, 21, '02/06/2018', '', '', '', '', '', '01/30/2018', '', 1),
(45, 21, '02/07/2018', '', '', '', '', '', '01/30/2018', '', 1),
(46, 21, '02/08/2018', '', '', '', '', '', '01/30/2018', '', 1),
(47, 21, '02/09/2018', '', '', '', '', '', '01/30/2018', '', 1),
(48, 21, '02/10/2018', '', '', '', '', '', '01/30/2018', '', 1),
(49, 22, '02/13/2018', '', '', '', '', '', '01/30/2018', '', 1),
(50, 22, '02/14/2018', '', '', '', '', '', '01/30/2018', '', 1),
(51, 22, '02/15/2018', '', '', '', '', '', '01/30/2018', '', 1),
(52, 23, '02/15/2018', '', '', '', '', '', '01/30/2018', '', 1),
(53, 23, '02/16/2018', '', '', '', '', '', '01/30/2018', '', 1),
(54, 24, '02/19/2018', '', '', '', '', '', '01/30/2018', '', 1),
(55, 24, '02/20/2018', '', '', '', '', '', '01/30/2018', '', 1),
(56, 25, '02/20/2018', '', '', '', '', '', '01/31/2018', '', 1),
(57, 25, '02/21/2018', '', '', '', '', '', '01/31/2018', '', 1),
(58, 25, '02/22/2018', '', '', '', '', '', '01/31/2018', '', 1),
(59, 25, '02/24/2018', '', '', '', '', '', '01/31/2018', '', 1),
(60, 25, '02/25/2018', '', '', '', '', '', '01/31/2018', '', 1),
(61, 25, '02/23/2018', '', '', '', '', '', '', '', 1),
(62, 26, '02/26/2018', '', '', '', '', '', '01/31/2018', '', 1),
(63, 26, '02/28/2018', '', '', '', '', '', '01/31/2018', '', 1),
(64, 26, '02/27/2018', '', '', '', '', '', '', '', 1),
(65, 27, '03/02/2018', '', '', '', '', '', '01/31/2018', '', 1),
(66, 27, '03/01/2018', '', '', '', '', '', '01/31/2018', '', 1),
(67, 28, '03/02/2018', '', '', '', '', '', '01/31/2018', '', 1),
(68, 28, '03/03/2018', '', '', '', '', '', '01/31/2018', '', 1),
(69, 28, '03/01/2018', '', '', '', '', '', '', '', 1),
(70, 29, '03/04/2018', '', '', '', '', '', '01/31/2018', '', 1),
(71, 29, '03/05/2018', '', '', '', '', '', '01/31/2018', '', 1),
(72, 30, '03/04/2018', '', '', '', '', '', '01/31/2018', '', 1),
(73, 30, '03/06/2018', '', '', '', '', '', '01/31/2018', '', 1),
(74, 30, '03/05/2018', '', '', '', '', '', '01/31/2018', '', 1),
(75, 31, '03/04/2018', '', '', '', '', '', '01/31/2018', '', 1),
(76, 31, '03/06/2018', '', '', '', '', '', '01/31/2018', '', 1),
(77, 31, '03/05/2018', '', '', '', '', '', '01/31/2018', '', 1),
(78, 32, '03/04/2018', '', '', '', '', '', '01/31/2018', '', 1),
(79, 32, '03/06/2018', '', '', '', '', '', '01/31/2018', '', 1),
(80, 32, '03/05/2018', '', '', '', '', '', '01/31/2018', '', 1),
(81, 33, '03/08/2018', '', '', '', '', '', '01/31/2018', '', 1),
(82, 33, '03/05/2018', '', '', '', '', '', '01/31/2018', '', 1),
(83, 33, '03/09/2018', '', '', '', '', '', '01/31/2018', '', 1),
(84, 34, '03/08/2018', '', '', '', '', '', '01/31/2018', '', 1),
(85, 34, '03/10/2018', '', '', '', '', '', '01/31/2018', '', 1),
(86, 34, '03/09/2018', '', '', '', '', '', '', '', 1),
(87, 34, '03/05/2018', '', '', '', '', '', '', '', 1),
(88, 35, '03/14/2018', '', '', '', '', '', '01/31/2018', '', 1),
(89, 35, '03/16/2018', '', '', '', '', '', '01/31/2018', '', 1),
(90, 36, '03/14/2018', '', '', '', '', '', '01/31/2018', '', 1),
(91, 36, '03/16/2018', '', '', '', '', '', '01/31/2018', '', 1),
(92, 36, '03/15/2018', '', '', '', '', '', '01/31/2018', '', 1),
(93, 35, '03/15/2018', '', '', '', '', '', '', '', 1),
(94, 37, '03/19/2018', '', '', '', '', '', '01/31/2018', '', 1),
(95, 37, '03/21/2018', '', '', '', '', '', '01/31/2018', '', 1),
(96, 37, '03/20/2018', '', '', '', '', '', '01/31/2018', '', 1),
(97, 38, '03/19/2018', '', '', '', '', '', '01/31/2018', '', 1),
(98, 38, '03/21/2018', '', '', '', '', '', '01/31/2018', '', 1),
(99, 38, '03/20/2018', '', '', '', '', '', '', '', 1),
(100, 39, '02/15/2018', '', '', '', '', '', '02/15/2018', '', 1),
(101, 39, '02/16/2018', '', '', '', '', '', '02/15/2018', '', 1),
(102, 39, '02/17/2018', '', '', '', '', '', '02/15/2018', '', 1),
(103, 40, '02/22/2018', '', '', '', '', '', '02/22/2018', '', 1),
(104, 40, '02/23/2018', '', '', '', '', '', '02/22/2018', '', 1),
(105, 41, '02/22/2018', '', '', '', '', '', '02/22/2018', '', 1),
(106, 41, '02/23/2018', '', '', '', '', '', '02/22/2018', '', 1),
(107, 42, '02/22/2018', '', '', '', '', '', '02/22/2018', '', 1),
(108, 42, '02/23/2018', '', '', '', '', '', '02/22/2018', '', 1),
(109, 43, '02/22/2018', '', '', '', '', '', '02/22/2018', '', 1),
(110, 43, '02/23/2018', '', '', '', '', '', '02/22/2018', '', 1),
(111, 44, '02/22/2018', '', '', '', '', '', '02/22/2018', '', 1),
(112, 44, '02/23/2018', '', '', '', '', '', '02/22/2018', '', 1),
(113, 45, '02/23/2018', '', '', '', '', '', '02/23/2018', '', 1),
(114, 45, '02/24/2018', '', '', '', '', '', '02/23/2018', '', 1),
(115, 45, '02/25/2018', '', '', '', '', '', '02/23/2018', '', 1),
(116, 45, '02/26/2018', '', '', '', '', '', '02/23/2018', '', 1),
(117, 46, '02/23/2018', '', '', '', '', '', '02/23/2018', '', 1),
(118, 46, '02/24/2018', '', '', '', '', '', '02/23/2018', '', 1),
(119, 46, '02/25/2018', '', '', '', '', '', '02/23/2018', '', 1),
(120, 46, '02/26/2018', '', '', '', '', '', '02/23/2018', '', 1),
(121, 47, '03/05/2018', '', '', '', '', '', '03/05/2018', '', 1),
(122, 47, '03/06/2018', '', '', '', '', '', '03/05/2018', '', 1),
(123, 47, '03/07/2018', '', '', '', '', '', '03/05/2018', '', 1),
(124, 47, '03/08/2018', '', '', '', '', '', '03/05/2018', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `income_header`
--

CREATE TABLE IF NOT EXISTS `income_header` (
  `income_header_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `start_date` varchar(10) NOT NULL,
  `end_date` varchar(10) NOT NULL,
  `register_date` varchar(10) NOT NULL,
  `income_description` varchar(100) NOT NULL,
  `num_days` int(11) NOT NULL,
  `average_amt` decimal(18,2) NOT NULL,
  `total_amt` decimal(18,2) NOT NULL,
  `voucher` varchar(100) NOT NULL,
  `mbr_type_id` int(11) NOT NULL,
  `mbr_end` int(11) NOT NULL,
  `type_pro_id` int(11) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `edit` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `income_header`
--

INSERT INTO `income_header` (`income_header_id`, `member_id`, `start_date`, `end_date`, `register_date`, `income_description`, `num_days`, `average_amt`, `total_amt`, `voucher`, `mbr_type_id`, `mbr_end`, `type_pro_id`, `remark`, `edit`, `user_id`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(17, 12, '01/30/2018', '02/02/2018', '01/30/2018', 'Register Income', 3, '666.67', '2000.00', '', 2, 0, 0, '', 0, 1, '01/30/2018', '', 1),
(18, 13, '01/30/2018', '02/01/2018', '01/30/2018', 'Register Income', 3, '333.33', '1000.00', '', 2, 0, 0, '', 0, 1, '01/30/2018', '', 1),
(19, 14, '01/30/2018', '02/05/2018', '01/30/2018', 'Register Income', 6, '83.33', '500.00', '', 2, 0, 0, '', 0, 1, '01/30/2018', '', 1),
(20, 13, '02/04/2018', '02/07/2018', '01/30/2018', 'Register Income', 3, '333.33', '1000.00', '', 2, 0, 0, '', 0, 1, '01/30/2018', '', 1),
(21, 12, '02/06/2018', '02/11/2018', '01/30/2018', 'Register Income', 5, '2000.00', '10000.00', '', 2, 0, 0, '', 0, 1, '01/30/2018', '', 1),
(22, 14, '02/13/2018', '02/14/2018', '01/30/2018', 'Register Income', 3, '333.33', '1000.00', '', 2, 0, 0, '', 0, 1, '01/30/2018', '', 1),
(23, 14, '02/15/2018', '02/16/2018', '01/31/2018', 'Register Income', 2, '500.00', '1000.00', '', 2, 0, 0, '', 0, 1, '01/30/2018', '', 1),
(24, 14, '02/19/2018', '02/20/2018', '01/30/2018', 'Register Income', 2, '500.00', '1000.00', '', 2, 0, 0, '', 0, 1, '01/30/2018', '', 1),
(25, 15, '02/20/2018', '02/25/2018', '01/31/2018', 'Register Income', 5, '1000.00', '5000.00', '', 2, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(26, 15, '02/26/2018', '02/28/2018', '01/31/2018', 'Register Income', 2, '3000.00', '6000.00', '', 2, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(27, 15, '03/01/2018', '03/02/2018', '01/31/2018', 'Register Income', 2, '1500.00', '3000.00', '', 1, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(28, 14, '03/01/2018', '03/03/2018', '01/31/2018', 'Register Income', 3, '1000.00', '3000.00', '', 2, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(29, 15, '03/04/2018', '03/05/2018', '01/31/2018', 'Register Income', 2, '750.00', '3000.00', '', 1, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(30, 14, '03/04/2018', '03/06/2018', '01/31/2018', 'Register Income', 3, '500.00', '3000.00', '', 1, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(31, 13, '03/04/2018', '03/06/2018', '01/31/2018', 'Register Income', 2, '750.00', '3000.00', '', 1, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(32, 12, '03/04/2018', '03/06/2018', '01/31/2018', 'Register Income', 3, '500.00', '3000.00', '', 1, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(33, 14, '03/08/2018', '03/09/2018', '01/31/2018', 'Register Income', 3, '1000.00', '3000.00', '', 1, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(34, 15, '03/08/2018', '03/10/2018', '01/31/2018', 'Register Income', 4, '750.00', '3000.00', '', 2, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(35, 15, '03/14/2018', '03/16/2018', '01/31/2018', 'Register Income', 3, '666.67', '2000.00', '', 2, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(36, 14, '03/14/2018', '03/16/2018', '01/31/2018', '', 3, '1000.00', '3000.00', '', 1, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(37, 15, '03/19/2018', '03/21/2018', '01/31/2018', 'Register Income', 3, '100.00', '300.00', '', 1, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(38, 14, '03/19/2018', '03/21/2018', '01/31/2018', 'Register Income', 3, '200.00', '600.00', '', 2, 0, 0, '', 0, 1, '01/31/2018', '', 1),
(39, 14, '02/15/2018', '02/17/2018', '02/15/2018', 'Register Income', 3, '1666.67', '5000.00', '0017', 1, 0, 0, '', 0, 1, '02/15/2018', '', 1),
(40, 17, '02/22/2018', '02/23/2018', '02/22/2018', 'Register Income', 2, '500.00', '1000.00', '', 2, 0, 0, '', 0, 1, '02/22/2018', '', 1),
(41, 15, '02/22/2018', '02/23/2018', '02/22/2018', 'Register Income', 2, '500.00', '1000.00', '', 2, 0, 0, '', 0, 1, '02/22/2018', '', 1),
(42, 12, '02/22/2018', '02/23/2018', '02/22/2018', 'Register Income', 2, '500.00', '1000.00', '', 2, 0, 0, '', 0, 1, '02/22/2018', '', 1),
(43, 18, '02/22/2018', '02/23/2018', '02/22/2018', 'Register Income', 2, '500.00', '1000.00', '', 2, 1, 0, '', 0, 1, '02/22/2018', '', 1),
(44, 19, '02/22/2018', '02/23/2018', '02/22/2018', 'Register Income', 2, '500.00', '1000.00', '', 2, 1, 0, '', 0, 1, '02/22/2018', '', 1),
(45, 18, '02/23/2018', '02/26/2018', '02/23/2018', 'Register Income', 4, '750.00', '3000.00', '', 2, 0, 0, '', 0, 1, '02/23/2018', '', 1),
(46, 19, '02/23/2018', '02/26/2018', '02/23/2018', 'Register Income', 4, '750.00', '3000.00', '', 2, 0, 0, '', 0, 1, '02/23/2018', '', 1),
(47, 12, '03/05/2018', '03/08/2018', '03/05/2018', 'Register Income', 4, '250.00', '1000.00', '0123', 2, 0, 0, '', 0, 1, '03/05/2018', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `leave_detail`
--

CREATE TABLE IF NOT EXISTS `leave_detail` (
  `leave_detail_id` int(11) NOT NULL,
  `leave_header_id` int(11) NOT NULL,
  `leave_date` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `leave_header`
--

CREATE TABLE IF NOT EXISTS `leave_header` (
  `leave_header_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `from_date` varchar(10) NOT NULL,
  `to_date` varchar(10) NOT NULL,
  `total_days` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `member_id` int(11) NOT NULL,
  `member_register_id` varchar(50) NOT NULL,
  `member_name` varchar(100) NOT NULL,
  `register_date` varchar(10) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `measure` varchar(255) NOT NULL,
  `work` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `injury` varchar(255) NOT NULL,
  `remark` text NOT NULL,
  `weight` varchar(10) NOT NULL,
  `height` varchar(50) NOT NULL,
  `target` varchar(50) NOT NULL,
  `recent_gym` varchar(10) NOT NULL,
  `mbr_end` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `member_register_id`, `member_name`, `register_date`, `dob`, `gender`, `phone`, `measure`, `work`, `address`, `injury`, `remark`, `weight`, `height`, `target`, `recent_gym`, `mbr_end`, `user_id`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(12, 'MBR00000001', 'Aye Pa', '01/30/2018', '01/30/2018', 'female', '09-402616265', 'Anything Here', 'Product Manager', 'Amayapura, Mandalay', 'Anything Here', 'Remark', '', '', 'Weight Gain', 'no', 0, 1, '01/30/2018', '02/17/2018', 1),
(13, 'MBR00000013', 'Thu Thu', '01/30/2018', '01/30/2018', 'male', '', '', '', '', '', '', '', '', '', 'no', 0, 1, '01/30/2018', '', 1),
(14, 'MBR00000014', 'Cho', '01/30/2018', '01/30/2018', 'male', '', '', '', '', '', '', '', '', '', 'no', 0, 1, '01/30/2018', '', 1),
(15, 'MBR00000015', 'Maung Maung', '01/31/2018', '01/31/2018', 'male', '', '', '', '', '', '', '45 kg', '5 feet 4 inches', 'weight gain', 'no', 0, 1, '01/31/2018', '02/16/2018', 1),
(16, 'MBR00000016', 'Thuzar Thaung Sein', '02/14/2018', '02/14/2018', 'female', '', '', '', '', '', '', '', '', 'weight gain', 'no', 0, 1, '02/14/2018', '02/16/2018', 1),
(17, 'MBR00000017', 'New Boy', '02/16/2018', '02/16/2018', 'male', '090 666 333 777', '', 'Nothing', 'Some address', '', '', '', '', 'Build muscle', 'no', 0, 1, '02/16/2018', '02/16/2018', 1),
(18, 'MBR00000018', 'Aye Aye', '02/22/2018', '02/22/2018', 'male', '', '', '', '', '', '', '', '', '', 'no', 0, 1, '02/22/2018', '', 1),
(19, 'MBR00000019', 'Chaw Chaw', '02/22/2018', '02/22/2018', 'male', '', '', '', '', '', '', '', '', '', 'no', 0, 1, '02/22/2018', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `member_type`
--

CREATE TABLE IF NOT EXISTS `member_type` (
  `mbr_type_id` int(11) NOT NULL,
  `mbr_type_name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member_type`
--

INSERT INTO `member_type` (`mbr_type_id`, `mbr_type_name`, `user_id`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(1, 'Daily Member', 0, '', '', 1),
(2, 'Monthly Member', 0, '', '', 1),
(3, 'Promotion Member', 0, '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `off_day`
--

CREATE TABLE IF NOT EXISTS `off_day` (
  `off_day_id` int(11) NOT NULL,
  `off_date` varchar(10) NOT NULL,
  `description` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `off_day`
--

INSERT INTO `off_day` (`off_day_id`, `off_date`, `description`, `user_id`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(1, '02/02/2018', 'Sunday', 1, '01/29/2018', '', 2),
(2, '01/29/2018', '', 1, '01/29/2018', '', 1),
(3, '01/28/2018', '', 1, '01/29/2018', '', 1),
(4, '01/27/2018', 'Sat', 1, '01/29/2018', '', 1),
(5, '02/06/2018', '', 1, '01/30/2018', '', 2),
(6, '02/10/2018', '', 1, '01/30/2018', '', 2),
(7, '02/15/2018', '', 1, '01/30/2018', '', 2),
(8, '02/17/2018', '', 1, '01/30/2018', '', 2),
(9, '02/20/2018', '', 1, '01/30/2018', '', 2),
(10, '02/22/2018', '', 1, '01/30/2018', '', 2),
(11, '02/23/2018', 'Holiday', 1, '01/30/2018', '', 2),
(12, '01/01/2018', 'Holiday', 1, '01/30/2018', '', 1),
(13, '02/27/2018', '', 1, '01/31/2018', '', 2),
(14, '03/01/2018', '', 1, '01/31/2018', '', 2),
(15, '03/05/2018', '', 1, '01/31/2018', '', 2),
(16, '03/09/2018', '', 1, '01/31/2018', '', 2),
(17, '03/11/2018', '', 1, '01/31/2018', '', 2),
(18, '03/15/2018', '', 1, '01/31/2018', '', 2),
(19, '03/20/2018', '', 1, '01/31/2018', '', 2),
(20, '03/20/2018', '', 1, '01/31/2018', '', 2),
(21, '02/12/2018', '', 1, '02/12/2018', '', 1),
(22, '04/01/2018', '', 1, '02/12/2018', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE IF NOT EXISTS `promotion` (
  `promotion_id` int(11) NOT NULL,
  `pro_type` varchar(30) NOT NULL,
  `pro_num` varchar(50) NOT NULL,
  `pro_end` int(11) NOT NULL,
  `from_date` varchar(10) NOT NULL,
  `to_date` varchar(10) NOT NULL,
  `pro_description` varchar(255) NOT NULL,
  `pro_name` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `promotion`
--

INSERT INTO `promotion` (`promotion_id`, `pro_type`, `pro_num`, `pro_end`, `from_date`, `to_date`, `pro_description`, `pro_name`, `remark`, `user_id`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(1, 'day', '15', 1, '01/26/2018', '01/31/2018', 'Register 1 month => Get 15 days', '15 Days free', '', 1, '01/26/2018', '01/27/2018', 1),
(2, 'day', '5', 0, '03/30/2018', '03/31/2018', 'a', '5', 'a', 1, '03/28/2018', '', 2),
(3, 'amount', '50,per', 1, '02/20/2018', '02/25/2018', 'Amount Promotion', '% Promotion', '', 1, '03/28/2018', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `register_id`
--

CREATE TABLE IF NOT EXISTS `register_id` (
  `id` int(11) NOT NULL,
  `prefix` varchar(50) NOT NULL,
  `num` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `register_id`
--

INSERT INTO `register_id` (`id`, `prefix`, `num`, `createddate`) VALUES
(1, 'MBR', 8, '');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(1, 'admin', '', '', 1),
(2, 'accountant', '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `trainers`
--

CREATE TABLE IF NOT EXISTS `trainers` (
  `trainer_id` int(11) NOT NULL,
  `trainer_name` varchar(100) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trainers`
--

INSERT INTO `trainers` (`trainer_id`, `trainer_name`, `remark`, `user_id`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(1, 'Trainer', 'remark', 1, '02/13/2018', '', 1),
(2, 'Trainer two', 'Remark two', 1, '02/13/2018', '', 2),
(3, 'Aung Aung', '', 1, '02/20/2018', '', 1),
(4, 'Maung Maung', '', 1, '02/20/2018', '', 1),
(5, 'Kyaw Kyaw', '', 1, '02/20/2018', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE IF NOT EXISTS `training` (
  `training_id` int(11) NOT NULL,
  `training_description` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `training`
--

INSERT INTO `training` (`training_id`, `training_description`, `remark`, `createddate`, `modifieddate`, `user_id`, `recordstatus`) VALUES
(1, 'Training One', 'Remark', '02/13/2018', '', 1, 1),
(2, 'Training two', 'Remark two', '02/13/2018', '', 1, 2),
(3, 'Training Two', '', '02/20/2018', '', 1, 1),
(4, 'Training Three', '', '02/20/2018', '', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `login_id` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `login_id`, `password`, `role_id`, `createddate`, `modifieddate`, `recordstatus`) VALUES
(1, 'Thuzar', 'tzts', '202cb962ac59075b964b07152d234b70', 1, '', '', 1),
(2, 'Aye Pa', 'apph', '202cb962ac59075b964b07152d234b70', 1, '03/06/2018', '', 1),
(3, 'Zin Zin', 'zinzin', '202cb962ac59075b964b07152d234b70', 1, '03/06/2018', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alerttemp`
--
ALTER TABLE `alerttemp`
  ADD PRIMARY KEY (`member_id`,`alert_type`);

--
-- Indexes for table `alert_limit`
--
ALTER TABLE `alert_limit`
  ADD PRIMARY KEY (`alert_limit_id`);

--
-- Indexes for table `alert_list`
--
ALTER TABLE `alert_list`
  ADD PRIMARY KEY (`alert_list_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `daily_action`
--
ALTER TABLE `daily_action`
  ADD PRIMARY KEY (`daily_action_id`);

--
-- Indexes for table `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`expense_id`);

--
-- Indexes for table `income_detail`
--
ALTER TABLE `income_detail`
  ADD PRIMARY KEY (`income_detail_id`);

--
-- Indexes for table `income_header`
--
ALTER TABLE `income_header`
  ADD PRIMARY KEY (`income_header_id`);

--
-- Indexes for table `leave_detail`
--
ALTER TABLE `leave_detail`
  ADD PRIMARY KEY (`leave_detail_id`);

--
-- Indexes for table `leave_header`
--
ALTER TABLE `leave_header`
  ADD PRIMARY KEY (`leave_header_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `member_type`
--
ALTER TABLE `member_type`
  ADD PRIMARY KEY (`mbr_type_id`);

--
-- Indexes for table `off_day`
--
ALTER TABLE `off_day`
  ADD PRIMARY KEY (`off_day_id`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`promotion_id`);

--
-- Indexes for table `register_id`
--
ALTER TABLE `register_id`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `trainers`
--
ALTER TABLE `trainers`
  ADD PRIMARY KEY (`trainer_id`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`training_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alert_limit`
--
ALTER TABLE `alert_limit`
  MODIFY `alert_limit_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `alert_list`
--
ALTER TABLE `alert_list`
  MODIFY `alert_list_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `daily_action`
--
ALTER TABLE `daily_action`
  MODIFY `daily_action_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `expense`
--
ALTER TABLE `expense`
  MODIFY `expense_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `income_detail`
--
ALTER TABLE `income_detail`
  MODIFY `income_detail_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT for table `income_header`
--
ALTER TABLE `income_header`
  MODIFY `income_header_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `leave_detail`
--
ALTER TABLE `leave_detail`
  MODIFY `leave_detail_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `leave_header`
--
ALTER TABLE `leave_header`
  MODIFY `leave_header_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `member_type`
--
ALTER TABLE `member_type`
  MODIFY `mbr_type_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `off_day`
--
ALTER TABLE `off_day`
  MODIFY `off_day_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `promotion_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `register_id`
--
ALTER TABLE `register_id`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `trainers`
--
ALTER TABLE `trainers`
  MODIFY `trainer_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `training`
--
ALTER TABLE `training`
  MODIFY `training_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
