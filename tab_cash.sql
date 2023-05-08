-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tab_cash
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `parent_id` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `age` int NOT NULL,
  `dob` date NOT NULL,
  `address` varchar(200) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `national_id` varchar(14) DEFAULT NULL,
  `access_token` varchar(250) DEFAULT NULL,
  `photo` varchar(700) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `is_child` tinyint DEFAULT '0',
  `credit_card_num` varchar(16) DEFAULT NULL,
  `credit_card_pass` varchar(4) DEFAULT NULL,
  `credit_card_expiration_date` date DEFAULT NULL,
  `restrictions` varchar(200) DEFAULT NULL,
  `balance` int DEFAULT '0',
  `_created_at` date NOT NULL DEFAULT '0000-00-00',
  `_updated_at` date DEFAULT NULL,
  `_deleted` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `parent_id_idx` (`parent_id`),
  CONSTRAINT `parent_id` FOREIGN KEY (`parent_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('37e0cb8b-6055-4b94-b649-9c72dca90bc2','root','Mohammed','Moataz','mohammedmoataz','mohammedmoataz@gmail.com','$2b$07$pMlgLOKwvoV/FN94QX7JR.fWRRX8SzXRAo4O6s/oWKOph6VBRzHf6',22,'2001-02-13','Egypt','Male','01234567890','30102130000000','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3ZTBjYjhiLTYwNTUtNGI5NC1iNjQ5LTljNzJkY2E5MGJjMiIsInVzZXJuYW1lIjoibW9oYW1tZWRtb2F0YXoiLCJpYXQiOjE2ODM1MDUzMDQsImV4cCI6MTY4MzU5MTcwNH0.FAo0nI9Ap05pex2hAJRzNDHrCVN0Zs1HwJYzpTab3bQ',NULL,0,NULL,NULL,NULL,NULL,0,'2023-05-07','2023-05-08',0),('8a103566-cc53-4a13-bd10-709bc3a3f260','37e0cb8b-6055-4b94-b649-9c72dca90bc2','Adam','Emad','adamemad',NULL,'$2b$07$pMlgLOKwvoV/FN94QX7JR.fWRRX8SzXRAo4O6s/oWKOph6VBRzHf6',5,'2018-02-13','Egypt','Male',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,0,'2023-05-08',NULL,0),('root','root','root','root','root','root','root',0,'2023-01-01','root','root','root','root',NULL,NULL,0,NULL,NULL,NULL,NULL,0,'0000-00-00','0000-00-00',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-08  3:45:37
