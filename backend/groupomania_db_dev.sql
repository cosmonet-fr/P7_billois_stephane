-- MySQL dump 10.16  Distrib 10.1.44-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: groupomania_db_dev
-- ------------------------------------------------------
-- Server version	10.1.44-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Messages`
--

DROP TABLE IF EXISTS `Messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUSERS` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `attachement` varchar(255) NOT NULL,
  `likes` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUSERS` (`idUSERS`),
  CONSTRAINT `Messages_ibfk_1` FOREIGN KEY (`idUSERS`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Messages`
--

LOCK TABLES `Messages` WRITE;
/*!40000 ALTER TABLE `Messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `Messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20200729123541-create-user.js'),('20200729123903-create-message.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `url_image` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'mail@mail.org','myName','$2b$10$nrlkT17SJJ7PP1KuJZIRVuHyPQZb5grndIhIdZX8CvhmoydH2Ou82',NULL,NULL,0,'2020-08-06 10:09:38','2020-08-06 10:09:38'),(2,'mail2@mail.org','myName','$2b$10$J6z1TwXYYAtho4N1qEUCQ.kJeSbQ3htd4xwql1hmrRKYCtCByve8a',NULL,NULL,0,'2020-08-06 10:13:47','2020-08-06 10:13:47'),(3,'mail2@mail.org','myName','$2b$10$UMY7.PZSUMVSrV7h0jw5quNwd3hKTABPG6YtrY6FqYtX7PED6rcxq',NULL,NULL,0,'2020-08-06 13:54:23','2020-08-06 13:54:23'),(4,'mail2@mail.org','','$2b$10$y1ZPVs7rbe1P5TKjd2VeR.qezO1dhs6nx1LHxbr0KW2ZH28C3QJ5G',NULL,NULL,0,'2020-08-06 14:24:55','2020-08-06 14:24:55'),(5,'','myName','$2b$10$1d9KpzUiHIHS1QSXMpY5BOz7OMCe80fdS9IXvtMllEElGF1UXm/xS',NULL,NULL,0,'2020-08-06 14:25:20','2020-08-06 14:25:20'),(6,'mail3@mail.org','myName','$2b$10$/mmaw6ljNXhj4VIA.AFVTOnvomhsI92AwRquOiOuCNdOAN8VdqR.O',NULL,NULL,0,'2020-08-06 15:31:57','2020-08-06 15:31:57'),(7,'mail3@mail.org','myName','azerty2',NULL,NULL,0,'2020-08-11 08:23:54','2020-08-11 08:23:54'),(8,'mail4@mail.org','myName','$2b$10$fUwEN8jTNOXM1Wwk805OkO80W8XwOSy0ucQ8ud8W8.QYEjLQIIBrC',NULL,NULL,0,'2020-08-11 08:30:01','2020-08-11 08:30:01'),(9,'mail5@mail.org','myName','$2b$10$1KBtJERmK9DPdj.BoXwf6uOPgI41LW2KNGttC1WdiMOr04kpzaebO',NULL,NULL,0,'2020-08-11 09:28:08','2020-08-11 09:28:08'),(10,'mail6@mail.org','mario','$2b$10$xxIb5ZNmvL7mJuRRsFpJFuY8CvQZ4s2xdAYnNEPxzTd8OwP0802Ke',NULL,NULL,0,'2020-08-12 08:53:07','2020-08-12 08:53:07'),(11,'mail6@mail.org','mario','$2b$10$VIjFQGieeAsG6blTgWMxguoKm3BjCV.2CUJs5H1N77YU/dDYy/376','https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mario_emblem.svg/800px-Mario_emblem.svg.png','Mario (マリオ) est un personnage de jeu vidéo devenu la mascotte de Nintendo, facilement reconnaissable à sa moustache, à sa salopette, à ses gants blancs et à sa casquette rouge marquée d\'un M inscrit dans un cercle blanc.',0,'2020-08-12 08:57:29','2020-08-12 08:57:29'),(12,'mail6@mail.org','mario','$2b$10$MD9bZzyi.en1R8LjyvN3w.AtSOk7IvZPthX2YC.hdAwyRCW7/j6O2',NULL,NULL,0,'2020-08-13 07:10:25','2020-08-13 07:10:25'),(13,'','mario','$2b$10$s6c8Qz0pYN2Lfhwnj8V8zup9L4JOGG1WjIg0pp1Y36Gt4PSS.kc8G','https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mario_emblem.svg/800px-Mario_emblem.svg.png','Mario (マリオ) est un personnage de jeu vidéo devenu la mascotte de Nintendo, facilement reconnaissable à sa moustache, à sa salopette, à ses gants blancs et à sa casquette rouge marquée d\'un M inscrit dans un cercle blanc.',0,'2020-08-13 09:35:41','2020-08-13 09:35:41'),(14,'','test','test','test','test',0,'2020-08-13 11:43:51','2020-08-13 11:43:51'),(15,'mariomail.org','mario','$2b$10$Q2veWKb.RkuIM3XDHApWZ.oxHZfBP4obvBpv5yLNfZWRGttGg/f3C','https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mario_emblem.svg/800px-Mario_emblem.svg.png','Mario (マリオ) est un personnage de jeu vidéo devenu la mascotte de Nintendo, facilement reconnaissable à sa moustache, à sa salopette, à ses gants blancs et à sa casquette rouge marquée d\'un M inscrit dans un cercle blanc.',0,'2020-08-14 07:58:20','2020-08-14 07:58:20'),(16,'mario-mario@mail.org','mario2','$2b$10$KH7Ng2zDLJPGYZpUKo6PoOIhbbLQRQMfi3v/IBww63MgDhBICx0mi','https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mario_emblem.svg/800px-Mario_emblem.svg.png','Mario (マリオ) est un personnage de jeu vidéo devenu la mascotte de Nintendo, facilement reconnaissable à sa moustache, à sa salopette, à ses gants blancs et à sa casquette rouge marquée d\'un M inscrit dans un cercle blanc.',0,'2020-08-14 08:41:43','2020-08-14 08:41:43'),(17,'mario-mario@mail.org','mario2','$2b$10$eyvgUtRdxSdgDD2Yhs9HPe25SujQSm7KGVIrGdPZRgkjnBRRIoJke','https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mario_emblem.svg/800px-Mario_emblem.svg.png','Mario (マリオ) est un personnage de jeu vidéo devenu la mascotte de Nintendo, facilement reconnaissable à sa moustache, à sa salopette, à ses gants blancs et à sa casquette rouge marquée d\'un M inscrit dans un cercle blanc.',0,'2020-08-14 08:49:05','2020-08-14 08:49:05'),(18,'mario-mario@mail.org','mario2','$2b$10$oK1/kFjjRabJZTKrFwHQGeJLnKAyrC94/Tu8SHETgLC00z/DNqhgO','https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mario_emblem.svg/800px-Mario_emblem.svg.png','Mario (マリオ) est un personnage de jeu vidéo devenu la mascotte de Nintendo, facilement reconnaissable à sa moustache, à sa salopette, à ses gants blancs et à sa casquette rouge marquée d\'un M inscrit dans un cercle blanc.',0,'2020-08-14 09:49:25','2020-08-14 09:49:25'),(19,'mario-mario@mail.org','mario2','$2b$10$55L5Ky3e.vUnAEQOme0D1ui1IsrUWul4nKuQCkWZTEg4FuucFhUMi','https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mario_emblem.svg/800px-Mario_emblem.svg.png','Mario (マリオ) est un personnage de jeu vidéo devenu la mascotte de Nintendo, facilement reconnaissable à sa moustache, à sa salopette, à ses gants blancs et à sa casquette rouge marquée d\'un M inscrit dans un cercle blanc.',0,'2020-08-14 09:50:03','2020-08-14 09:50:03');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-17 11:37:29
