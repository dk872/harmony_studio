-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: harmony_studio
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('550d6238af41');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `master_id` int NOT NULL,
  `service_id` int NOT NULL,
  `booking_datetime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `master_id` (`master_id`),
  KEY `service_id` (`service_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`master_id`) REFERENCES `master` (`id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `additional_info` text,
  PRIMARY KEY (`id`),
  CONSTRAINT `client_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (54,'');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master`
--

DROP TABLE IF EXISTS `master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `bio` text,
  `free_times` json DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `speciality` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `master_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  CONSTRAINT `master_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master`
--

LOCK TABLES `master` WRITE;
/*!40000 ALTER TABLE `master` DISABLE KEYS */;
INSERT INTO `master` VALUES (1,1,1,'Experienced aesthetician with over 8 years of experience. Anna specializes in deep pore cleansing and custom organic facial treatments. Known for her relaxing massage techniques.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://vapexpo.kiev.ua/wp-content/uploads/2025/2/photo12/ochki-optom.com/4/4_1.jpg','Face master'),(2,2,1,'Dedicated skincare specialist focusing on anti-aging and rejuvenation therapies. Lucas holds certifications in microdermabrasion and chemical peels.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/4969919/pexels-photo-4969919.jpeg?_gl=1*18sjcwu*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg4NjAkajIzJGwwJGgw','Face master'),(4,4,1,'Specialist in natural and holistic face care. She offers detoxifying mud masks and lymphatic drainage for a glowing complexion.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/17470320/pexels-photo-17470320.jpeg?_gl=1*1ueml2t*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTgzMTMkajE4JGwwJGgw','Face master'),(5,5,1,'Medical aesthetician specializing in acne treatment and post-acne scar reduction using advanced laser technology.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/17550304/pexels-photo-17550304.jpeg?_gl=1*ynzr2h*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg0MjQkajckbDAkaDA.','Face master'),(6,6,2,'Expert in classic and volume eyelash extensions. Mia is renowned for her precise application and long-lasting results.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/7453637/pexels-photo-7453637.jpeg?_gl=1*1k7138o*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg0MjQkajckbDAkaDA.','Eyes master'),(7,7,2,'Master of lash lifting and tinting. Elena focuses on enhancing natural beauty and maintaining lash health.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/4662994/pexels-photo-4662994.jpeg?_gl=1*sy7u7a*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg0NzYkajU1JGwwJGgw','Eyes master'),(8,8,2,'Eyecare and under-eye dark circle treatment specialist. Offers relaxing cold stone therapy and hydration treatments for the delicate eye area.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/15214094/pexels-photo-15214094.jpeg?_gl=1*1e6wam1*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg1MDckajI0JGwwJGgw','Eyes master'),(9,9,3,'Certified therapeutic masseur. David specializes in deep tissue and sports recovery massage, focusing on chronic pain relief.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/7438468/pexels-photo-7438468.jpeg?_gl=1*e1haqw*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg4NDckajM2JGwwJGgw','Massage master'),(10,10,3,'Holistic massage therapist offering aromatherapy and hot stone treatments to reduce stress and promote deep relaxation.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/20718145/pexels-photo-20718145.jpeg?_gl=1*1okzceo*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg1MjkkajIkbDAkaDA.','Massage master'),(11,11,4,'Nail art guru and gel extension expert. Tiana is known for intricate, trendy designs and flawless cuticle work.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/9065201/pexels-photo-9065201.jpeg?_gl=1*6gtvhy*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg1NTUkajYwJGwwJGgw','Manicure master'),(12,12,4,'Men\'s grooming and foot care specialist. Offers specialized pedicures and hand treatments for sensitive skin.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/3882356/pexels-photo-3882356.jpeg?_gl=1*pi0f84*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg4NDIkajQxJGwwJGgw','Manicure master'),(13,13,4,'Master technician for healthy nail restoration and shellac application. Focuses on sterile and safe practices.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/7788797/pexels-photo-7788797.jpeg?_gl=1*qypmzt*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg1NzUkajQwJGwwJGgw','Manicure master'),(14,14,4,'Quick and perfect express manicure expert. Ideal for clients needing high-quality service on a tight schedule.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/17052891/pexels-photo-17052891.jpeg?_gl=1*fkddv5*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg2MDckajgkbDAkaDA.','Manicure master'),(15,15,5,'Precision brow artist specializing in microblading and brow lamination to achieve full, defined arches.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/11188544/pexels-photo-11188544.jpeg?_gl=1*1vz27wf*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg2MzgkajYwJGwwJGgw','Eyebrows master'),(16,16,5,'Expert in threading and brow shaping. Phoebe offers natural tinting and mapping for symmetrical results.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/12622633/pexels-photo-12622633.jpeg?_gl=1*15jb2gc*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg3MDEkajU5JGwwJGgw','Eyebrows master'),(17,17,5,'Eyebrow restoration specialist for sparse or over-plucked brows. Uses custom growth serums and natural dyes.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/15773061/pexels-photo-15773061.jpeg?_gl=1*15jb2gc*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg3MDEkajU5JGwwJGgw','Eyebrows master'),(18,18,6,'Permanent makeup artist focused on lip contouring and natural lip blushing for a defined, effortless look.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/3328941/pexels-photo-3328941.jpeg?_gl=1*16kwjn*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg3MzUkajI1JGwwJGgw','Lips master'),(19,19,6,'Lip hydration and plumping treatment specialist. Uses non-invasive techniques and high-grade hyaluronic acid treatments.','[\"2025-10-31 08:00\", \"2025-10-31 08:30\", \"2025-10-31 09:00\", \"2025-10-31 09:30\", \"2025-10-31 10:00\", \"2025-10-31 10:30\", \"2025-10-31 11:00\", \"2025-10-31 11:30\", \"2025-10-31 12:00\", \"2025-10-31 12:30\", \"2025-10-31 13:00\", \"2025-10-31 13:30\", \"2025-10-31 14:00\", \"2025-10-31 14:30\", \"2025-10-31 15:00\", \"2025-10-31 15:30\", \"2025-10-31 16:00\", \"2025-10-31 16:30\", \"2025-10-31 17:00\", \"2025-10-31 17:30\", \"2025-11-06 08:00\", \"2025-11-06 08:30\", \"2025-11-06 09:00\", \"2025-11-06 09:30\", \"2025-11-06 10:00\", \"2025-11-06 10:30\", \"2025-11-06 11:00\", \"2025-11-06 11:30\", \"2025-11-06 12:00\", \"2025-11-06 12:30\", \"2025-11-06 13:00\", \"2025-11-06 13:30\", \"2025-11-06 14:00\", \"2025-11-06 14:30\", \"2025-11-06 15:00\", \"2025-11-06 15:30\", \"2025-11-06 16:00\", \"2025-11-06 16:30\", \"2025-11-06 17:00\", \"2025-11-06 17:30\"]','https://images.pexels.com/photos/19664612/pexels-photo-19664612.jpeg?_gl=1*aetg0l*_ga*ODA0MjQxMzYxLjE3NjA0NTgyNzI.*_ga_8JE65Q40S6*czE3NjA0NTgyNzEkbzEkZzEkdDE3NjA0NTg4MTEkajEyJGwwJGgw','Lips master'),(43,70,5,'Hello I`m Dina!','[]','https://placehold.co/100x100/ccc/fff?text=Photo','Eyebrows');
/*!40000 ALTER TABLE `master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `master_id` int NOT NULL,
  `client_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `master_id` (`master_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `user` (`id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`master_id`) REFERENCES `master` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Face','Specialized facial treatments form the core of our skincare philosophy, aiming to revitalize, deeply cleanse, and restore the skin’s natural balance. We understand that the face is continuously exposed to environmental stressors, and our goal is to counteract these effects using personalized protocols. Our services span from routine maintenance, such as deep pore cleansing and custom organic masks, to more intensive procedures, including targeted acne treatment, enzyme exfoliation, and advanced hydration therapies.'),(2,'Eyes','The eye area is often the first to show signs of fatigue and aging, requiring specialized and gentle care. Our dedicated eye services are crafted to enhance the natural features while addressing common concerns like darkness, puffiness, and fine lines. We offer eyelash extensions, available in both classic and voluminous styles, applied with meticulous precision to ensure a stunning, long-lasting look without compromising natural lash health.'),(3,'Massage','Our massage therapy portfolio is rooted in the belief that relaxation and healing are intrinsically linked. We offer a variety of therapeutic and holistic bodywork designed to provide relief from chronic pain and alleviate stress caused by modern life. Clients can choose from deep tissue massage, specifically targeting deeper layers of muscle and connective tissue to break down knots and release tension, or sports recovery massage, which is essential for athletes seeking faster rehabilitation and improved flexibility.'),(4,'Manicure','Our manicure and pedicure services go beyond simple aesthetics; they are a commitment to the health and grooming of your hands and feet. We provide comprehensive nail care that ensures impeccable hygiene, proper cuticle maintenance, and exfoliation for soft, conditioned skin. Our experts are proficient in both quick, high-quality express manicures for clients on the go, and more detailed, specialized foot care.'),(5,'Eyebrows','The eyebrows are fundamental to facial symmetry and expression, acting as a natural frame for the eyes. Our services are dedicated to achieving perfectly shaped, defined, and symmetrical arches that complement your unique bone structure. We offer traditional methods such as precision threading and expert waxing, followed by custom tinting to add depth and fullness to lighter or sparser hairs.'),(6,'Lips','Our lip services cater to the growing demand for defined, plump, and healthy lips without necessarily requiring drastic cosmetic intervention. We focus on enhancing the lip area through both cosmetic artistry and targeted hydration therapies. Our non-invasive treatments use high-grade hyaluronic acid serums and specialized devices to boost moisture retention, reduce fine lines around the mouth, and give the lips a naturally fuller, smoother appearance.');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(10) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone_number` varchar(15) NOT NULL,
  `password_hash` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'master','Anna','Bennett','anna.face@harmony.com','1993-05-27','0661234567','scrypt:32768:8:1$T4I5FXsCw3oJ9qVu$23847e66048ec4d3a56913500e37f72d39979f8c5fce9db60a3552cf9415d6ca7e9b7210b1a8aa3c3c90f42c76de2c15a6aeb1c57d6e95a077d4415d68f20cef'),(2,'master','Lucas','Chen','lucas.skin@harmony.com','1988-11-15','0661234567','scrypt:32768:8:1$hFatwBMEXIiTEmpp$0f5ffe6c46bbbf00d79a160c4fea005d0938076b85c2c8329f89896d63f001e9934733b9fdc806196a74b321dfd73d0df7130e8f5f362496865da1885b9cb88c'),(4,'master','Sofia','Ricci','sofia.holistic@harmony.com','1996-03-01','0661234567','scrypt:32768:8:1$tUXuMonVZyy9t3EJ$cae9a6ea7b4576836d17f28429df4d4899b930c5c447720debc3e27cfe7ba56325c2aa8dd96bf8ec54c086a8ee2daa7228588d1b7e6a5e05aa8184d236a2e6f6'),(5,'master','Callie','Jones','callie.laser@harmony.com','1991-09-12','0661234567','scrypt:32768:8:1$0YFUT4SuY6RTW0uF$7dcdfa05e4de5aeea2765b6786aa6367a89e82bc26b8208ef5368a4d6efe37c75cf8024029e2e309a7b86120d30e17e6942f02e212614cac09808842d41dc8b8'),(6,'master','Mia','Kim','mia.lashes@harmony.com','1998-07-04','0661234567','scrypt:32768:8:1$IWotih0EWRMrmvJd$374fba529bdd5117592d7e17dabc2deca9a3ab4c9bef70fcff891acd5d40952fcbd214506eea623b408f80aa5d52651eee8c587c2671c4f0fbaa7f4496d40d43'),(7,'master','Elena','Petrova','elena.lift@harmony.com','1995-02-18','0661234567','scrypt:32768:8:1$jb8YxTOy8XyXcLaR$55d074f775615b00e528dbac34d505f4768f7dd0a3ad680ca65ac99a4752af71993fa7b8fa987cc5d4fa6294995a25e1c159150c4c6f5b7ea3a251d9da632a09'),(8,'master','Chloe','Davis','chloe.eyes@harmony.com','1997-10-22','0661234567','scrypt:32768:8:1$K5LqaYVePyuHQBkV$834932ab2dff0aaaf7c9fdf29e35c864d2e1644e014d67ebf379d7423d26f5cde23ab0a4fa6caadf8d6389cdd73fdf33b714f4fd6303e73452f21785329e65ae'),(9,'master','David','Smith','david.therapy@harmony.com','1985-01-20','0661234567','scrypt:32768:8:1$87Ngwoc5Uxv0Xyh4$625157d7d7de4018372bf004c8003dad7192bd90de94c9ecde700d284744e080a015a3767dcaa598a20071f87fed6c7d21e75554541f6b9c171e95f85339a715'),(10,'master','Serena','Williams','serena.zen@harmony.com','1990-06-19','0661234567','scrypt:32768:8:1$6SupbIVkl790uvEG$4bbf32983dd7b90a8ceb2f28151e6129007de7a074d4688d5bdaf3de0931f34a27590da4e39c9982c0f717f1987eefa1e5f9d6720e2bb1ab4c8799bcc2a329d4'),(11,'master','Tiana','Jackson','tiana.nails@harmony.com','1994-08-30','0661234567','scrypt:32768:8:1$dnorPA3ES3tM9F3n$b3cb3cce466331c4ecf94164eaa8204ed90054a07c4eba80d5fcacf96bc75b647974d8c6eec531b19e5079a0e4a069906ab6fa3c07954c5be25ae5d75310b91b'),(12,'master','Kevin','Brown','kevin.grooming@harmony.com','1983-12-05','0661234567','scrypt:32768:8:1$pIEiTunch15kRIwJ$140f2054c154ae06257841e880cdd62c6c668f3d753f1c35d351c796c2e34bc5184a439eb6c4b29545152121f90ae26c6374a4112b0cbe5f67e245d3cbcc7176'),(13,'master','Leila','Hadid','leila.shellac@harmony.com','1999-04-10','0661234567','scrypt:32768:8:1$ziDnw5kYo6zoSESy$3f15308f4a25a70c412de0f9aaa82b5c4c32abc85a265b5a6a38716e300e55857c4cc9c047d594327edfafeee6a97572ec238bd18e8f30d1eadcec94ad4d3e8d'),(14,'master','Maxine','Lee','maxine.express@harmony.com','2000-01-25','0661234567','scrypt:32768:8:1$gcPG7DinpZkn6vdn$7a98fb43b9daa226cf6dfca28db5c3c47e4ab3e88865f2892bacbf0de19bfc0c66600807ba00c242484688bea3140e60d2ba44f2b92ef55de744df59ab173eaa'),(15,'master','Jason','Miller','jason.micro@harmony.com','1992-03-17','0661234567','scrypt:32768:8:1$dvN3dDvMqBiTmWxp$acb742c900f9e41f1ff61ee665fb4df69e67263bfa12561c1198ff51b629478d25383e44e5d3b3c8154a0786992d765c0b67871b7aa8602ff7afd1aee9727473'),(16,'master','Phoebe','White','phoebe.thread@harmony.com','1990-11-29','0661234567','scrypt:32768:8:1$tk2Y5ID3fJRzpgno$58eaa0b232bc56a02f265db9146763d21c1e078900ad7ae364fe00f0e4b7fec7a2512e89571e6ac88450c5fd4c3c4107f9f0da6e54103317446c11cc2bbf555f'),(17,'master','Olga','Ivanova','olga.brows@harmony.com','1995-06-08','0661234567','scrypt:32768:8:1$0EMnrEsEtU5kzAXR$ed42e35656e1c887727a6f305d51d3a95576a03e976c1caa569de75742e5c837dacb90260aaf8a430ac08d2a7a77e8f75055aeb8526a3507fe9856b59a89a425'),(18,'master','Roxanne','Stone','roxanne.pmu@harmony.com','1987-04-03','0661234567','scrypt:32768:8:1$BXP7OW5OOevDYVoI$df3aa191dc7e4f0fae8eaef6a42d61a6768cae436e5858e2984d890d812bd5c6f011c778a9a107eb6cd68469ac7728e68bcb7c547bf0070b6815b0fd93378d40'),(19,'master','Ethan','Hunt','ethan.lips@harmony.com','1994-10-14','0661234567','scrypt:32768:8:1$qumHQ1kdM8JZzIhx$90e2e48bdd8beb53e5f4dc11ac70af5282d9b8578bcc4573943ccfc6482c49bd8d841e057deee173dfa2f013362e5ed5df4030f6a0c32088eb6394965d08c81d'),(54,'client','Dmytro','Kulyk','dimakulyk2005@gmail.com','2005-11-09','0661234567','scrypt:32768:8:1$msCjY8Sv1wltFRAW$b24ded985529e0a6282b17b7a9b7132522be975a060eae6d217254c51fff88c4a9510de185b86b062d85b48a386673a19e81f7b712bbd22a89f94f59a7786686'),(70,'master','Dina','Root','root@gmail.com','1997-12-12','0984448888','scrypt:32768:8:1$LCT4iIZ8joKdlYuz$f69321d02901038b34eafe3fc30d5a0c0ba36828444f0425164762241f646ee11996a8a95bf31a91c662415266f2c64083c497d227ed0a8780ff8968bafa052c'),(73,'admin','Admin','Admin','admin@example.com','1995-07-10','0984448888','scrypt:32768:8:1$jcz9caU6V3Nehcln$b19bf6c95bfecc4ec427d347d6ee7060b8c441f69b95f79924c4eb6cb3aba29c38bb5f469982f781d3481b1fe325e02d594becb4c2aea614482455bf68782847');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-04 19:16:06
