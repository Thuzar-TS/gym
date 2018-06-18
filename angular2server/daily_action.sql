-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2018 at 03:26 PM
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
-- Table structure for table `daily_action`
--

CREATE TABLE IF NOT EXISTS `daily_action` (
  `daily_action_id` int(11) NOT NULL,
  `action_date` varchar(10) NOT NULL,
  `week` varchar(255) NOT NULL,
  `days` varchar(255) NOT NULL,
  `training_id` int(11) NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `height` varchar(255) NOT NULL,
  `measure` varchar(255) NOT NULL,
  `chest` varchar(255) NOT NULL,
  `arm` varchar(255) NOT NULL,
  `waist` varchar(255) NOT NULL,
  `thigh` varchar(255) NOT NULL,
  `glute` varchar(255) NOT NULL,
  `calf` varchar(255) NOT NULL,
  `member_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createddate` varchar(10) NOT NULL,
  `modifieddate` varchar(10) NOT NULL,
  `recordstatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daily_action`
--
ALTER TABLE `daily_action`
  ADD PRIMARY KEY (`daily_action_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daily_action`
--
ALTER TABLE `daily_action`
  MODIFY `daily_action_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
