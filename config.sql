-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: lyfesystem
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.16.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `born` varchar(30) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Henrique Lyra da SIlva','07103488606',NULL,'33999999961'),(2,'Jocimar Cruz','12345678912','undefined','21987654321'),(3,'Jocimar Cruz Filho','23123141241','undefined','21987654321'),(4,'adoasod','22222222222','undefined','21987654321'),(5,'Jean Coelho','07733724740','undefined','21991325778');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devolution`
--

DROP TABLE IF EXISTS `devolution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devolution` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` varchar(30) NOT NULL,
  `sale_origin` varchar(20) NOT NULL,
  `sale_cod` varchar(20) NOT NULL,
  `sale_name` varchar(50) NOT NULL,
  `user` varchar(15) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '0',
  `confirmation_user` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `cod_UNIQUE` (`sale_cod`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devolution`
--

LOCK TABLES `devolution` WRITE;
/*!40000 ALTER TABLE `devolution` DISABLE KEYS */;
INSERT INTO `devolution` VALUES (1,'30-03-2019','mljc','0002','comprador 2','hlyras','0',NULL),(2,'30-03-2019','mljc','0004','compr4','hlyras','0',NULL),(3,'30-03-2019','mljc','0005','compr 5','hlyras','0',NULL);
/*!40000 ALTER TABLE `devolution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devolution_product`
--

DROP TABLE IF EXISTS `devolution_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devolution_product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `devolution_id` int(11) unsigned NOT NULL,
  `sale_cod` varchar(20) NOT NULL,
  `product_id` int(11) unsigned NOT NULL,
  `product_info` varchar(45) NOT NULL,
  `amount` int(4) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devolution_product`
--

LOCK TABLES `devolution_product` WRITE;
/*!40000 ALTER TABLE `devolution_product` DISABLE KEYS */;
INSERT INTO `devolution_product` VALUES (1,1,'0002',2,'Capa Modular M/pt',1),(2,2,'0004',2,'Capa Modular M/pt',10),(3,3,'0005',3,'Capa Modular G/pt',4);
/*!40000 ALTER TABLE `devolution_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(45) NOT NULL,
  `user` varchar(45) NOT NULL,
  `status` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logins`
--

LOCK TABLES `logins` WRITE;
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;
INSERT INTO `logins` VALUES (1,'30/03/2019-16:57:15','hlyras','in'),(2,'30/03/2019-17:58:30','hlyras','in'),(3,'30/03/2019-18:29:4','hlyras','in'),(4,'30/03/2019-19:0:44','hlyras','in'),(5,'30/03/2019-19:32:0','hlyras','in'),(6,'01/04/2019-9:15:38','hlyras','in'),(7,'01/04/2019-10:10:16','hlyras','in'),(8,'01/04/2019-10:24:29','hlyras','out'),(9,'01/04/2019-10:24:36','hlyras','in'),(10,'01/04/2019-10:48:14','hlyras','in'),(11,'01/04/2019-11:19:41','hlyras','in'),(12,'01/04/2019-11:54:9','hlyras','in'),(13,'01/04/2019-17:10:47','hlyras','in'),(14,'01/04/2019-17:42:17','hlyras','in'),(15,'01/04/2019-18:12:44','hlyras','in'),(16,'01/04/2019-18:55:25','hlyras','in'),(17,'01/04/2019-19:25:53','hlyras','in'),(18,'01/04/2019-21:38:36','hlyras','in'),(19,'01/04/2019-22:8:46','hlyras','in'),(20,'02/04/2019-7:51:15','hlyras','in'),(21,'02/04/2019-8:29:16','hlyras','in'),(22,'02/04/2019-9:15:57','hlyras','in'),(23,'02/04/2019-9:48:11','hlyras','in'),(24,'02/04/2019-11:16:31','hlyras','in'),(25,'02/04/2019-11:46:54','hlyras','in'),(26,'02/04/2019-12:21:48','hlyras','in'),(27,'02/04/2019-13:2:22','hlyras','in'),(28,'02/04/2019-13:39:47','hlyras','in'),(29,'02/04/2019-14:17:38','hlyras','in'),(30,'02/04/2019-15:1:46','hlyras','in'),(31,'02/04/2019-15:37:48','hlyras','in'),(32,'02/04/2019-16:33:40','hlyras','in'),(33,'02/04/2019-17:11:12','hlyras','in'),(34,'02/04/2019-17:49:42','hlyras','in'),(35,'02/04/2019-18:19:58','hlyras','in'),(36,'02/04/2019-18:50:15','hlyras','in'),(37,'02/04/2019-19:20:22','hlyras','in'),(38,'02/04/2019-19:53:25','hlyras','in'),(39,'02/04/2019-20:28:43','hlyras','in'),(40,'02/04/2019-21:0:39','hlyras','in'),(41,'02/04/2019-21:30:46','hlyras','in'),(42,'03/04/2019-7:3:41','hlyras','in'),(43,'03/04/2019-7:7:42','hlyras','out'),(44,'03/04/2019-7:7:47','hlyras','in'),(45,'03/04/2019-7:38:48','hlyras','in'),(46,'03/04/2019-9:57:57','hlyras','in'),(47,'03/04/2019-10:28:32','hlyras','in'),(48,'03/04/2019-11:10:12','hlyras','in'),(49,'03/04/2019-11:53:18','hlyras','in'),(50,'03/04/2019-12:36:47','hlyras','in'),(51,'03/04/2019-13:18:38','hlyras','in'),(52,'03/04/2019-13:58:37','hlyras','in'),(53,'03/04/2019-14:43:35','hlyras','in'),(54,'03/04/2019-16:5:16','hlyras','in');
/*!40000 ALTER TABLE `logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `cod` int(4) unsigned zerofill NOT NULL,
  `name` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `value1` double(5,2) unsigned zerofill DEFAULT NULL,
  `value3` double(5,2) unsigned zerofill DEFAULT NULL,
  `value5` double(5,2) unsigned zerofill DEFAULT NULL,
  `value10` double(5,2) unsigned zerofill DEFAULT NULL,
  `pic1` varchar(200) DEFAULT NULL,
  `pic2` varchar(200) DEFAULT NULL,
  `pic3` varchar(200) DEFAULT NULL,
  `pic4` varchar(200) DEFAULT NULL,
  `pic5` varchar(200) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `link_UNIQUE` (`adress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio`
--

LOCK TABLES `portfolio` WRITE;
/*!40000 ALTER TABLE `portfolio` DISABLE KEYS */;
INSERT INTO `portfolio` VALUES (1,0001,'prod1','preto','software',999.99,99.99,85.00,70.00,'https://i.imgur.com/UQMebOQ.jpg','https://i.imgur.com/v8glq1r.jpg','https://i.imgur.com/10W1mVf.jpg','https://i.imgur.com/sfxif0G.jpg','https://i.imgur.com/MSuTVq3.jpg',NULL);
/*!40000 ALTER TABLE `portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `cod` int(4) NOT NULL,
  `type` varchar(15) CHARACTER SET utf8 NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 NOT NULL,
  `color` varchar(15) CHARACTER SET utf8 NOT NULL,
  `amount` int(5) unsigned DEFAULT '0',
  `value` decimal(7,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,'colete','Capa Modular P','pt',100,150.00),(2,2,'colete','Capa Modular M','pt',100,150.00),(3,3,'colete','Capa Modular G','pt',100,150.00),(4,31,'colete','Capa Modular P','vd',100,150.00),(5,32,'colete','Capa Modular M','vd',100,150.00),(8,52,'colete','Capa modular M','tan',100,150.00),(17,53,'colete','Capa Modular G','tan',100,150.00),(19,101,'coldre','Cold. univ. per(d)','pt',100,35.00),(20,131,'coldre','Cold. univ. per(d)','vd',100,35.00),(21,151,'coldre','Cold. univ. per(d)','tan',100,35.00),(24,201,'bornal','Bornal Tático','pt',100,50.00),(25,231,'bornal','Bornal Tático','vd',100,50.00),(29,251,'bornal','Bornal Tático','tan',100,50.00),(31,33,'colete','Capa modular G','vd',100,150.00),(32,801,'pecamodular','P.c. Fuzil tt mod.','pt',100,20.00),(33,831,'pecamodular','P.c. Fuzil tt mod.','vd',100,20.00),(34,851,'pecamodular','P.c. Fuzil tt mod.','tan',100,20.00),(35,901,'pecamodular','Cold. univ. mod(d)','pt',100,20.00),(36,931,'pecamodular','Cold. univ. mod(d)','vd',100,20.00),(37,951,'pecamodular','Cold. univ. mod(d)','tan',100,20.00),(44,902,'pecamodular','Cold. univ. mod(c)','pt',100,20.00),(45,932,'pecamodular','Cold. univ. mod(c)','vd',100,20.00),(46,952,'pecamodular','Cold. univ. mod(c)','tan',100,20.00),(48,102,'coldre','Cold. univ. per(c)','pt',100,35.00),(49,132,'coldre','Cold. univ. per(c)','vd',100,35.00),(50,152,'coldre','Cold. univ. per(c)','tan',100,35.00),(51,51,'colete','Capa Modular P','tan',100,150.00),(52,1001,'pecamodular','Camelback modular','pt',100,40.00),(53,1101,'pecamodular','P.. Rádio modular','pt',100,15.00);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `production` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(70) NOT NULL,
  `origin` varchar(45) NOT NULL,
  `provider` varchar(45) NOT NULL,
  `product` varchar(4) NOT NULL,
  `amount` int(11) NOT NULL,
  `confirmed_amount` int(11) unsigned DEFAULT '0',
  `status` varchar(45) NOT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `checked` varchar(1) DEFAULT '0',
  `done` varchar(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production`
--

LOCK TABLES `production` WRITE;
/*!40000 ALTER TABLE `production` DISABLE KEYS */;
INSERT INTO `production` VALUES (1,'30-03-2019','interna','João','2',12,12,'finalizado','','1','1'),(2,'30-03-2019','interna','Fabiano','32',24,24,'finalizado','','1','1'),(6,'30-03-2019','interna','Fabiano','32',24,24,'finalizado','','1','1'),(7,'30-03-2019','interna','Fabiano','35',24,23,'finalizado','estragou uma peça','1','0'),(8,'30-03-2019','interna','Fabiano','44',24,24,'finalizado','ok','1','1'),(9,'30-03-2019','externa','cost1','2',40,20,'parcial','','0','0'),(10,'30-03-2019','externa','cost1','1',10,5,'parcial','','0','0'),(11,'30-03-2019','externa','cost1','3',10,10,'finalizado','','1','1');
/*!40000 ALTER TABLE `production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_input`
--

DROP TABLE IF EXISTS `production_input`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `production_input` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(45) NOT NULL,
  `production_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  `user` varchar(20) NOT NULL,
  `checked` tinyint(1) DEFAULT '0',
  `confirmation_user` varchar(20) DEFAULT NULL,
  `obs` varchar(26) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_input`
--

LOCK TABLES `production_input` WRITE;
/*!40000 ALTER TABLE `production_input` DISABLE KEYS */;
INSERT INTO `production_input` VALUES (1,'30-03-2019',8,44,'902 Cold. univ. mod(c) pt',24,'finalizado','hlyras',1,'hlyras','ok'),(2,'30-03-2019',7,35,'901 Cold. univ. mod(d) pt',23,'finalizado','hlyras',1,'hlyras','estragou uma peça'),(3,'30-03-2019',6,32,'801 P.c. Fuzil tt mod. pt',24,'finalizado','hlyras',1,'hlyras',''),(4,'30-03-2019',2,32,'801 P.c. Fuzil tt mod. pt',24,'finalizado','hlyras',1,'hlyras',''),(5,'30-03-2019',1,2,'2 Capa Modular M pt',12,'finalizado','hlyras',1,'hlyras',''),(6,'30-03-2019',11,3,'3 Capa Modular G pt',10,'finalizado','hlyras',1,'hlyras',''),(7,'30-03-2019',10,1,'1 Capa Modular P pt',5,'parcial','hlyras',1,'hlyras',''),(8,'30-03-2019',9,2,'2 Capa Modular M pt',20,'parcial','hlyras',1,'hlyras','');
/*!40000 ALTER TABLE `production_input` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(70) NOT NULL,
  `origin` varchar(45) NOT NULL,
  `provider` varchar(45) NOT NULL,
  `product` varchar(45) NOT NULL,
  `amount` int(11) NOT NULL,
  `confirmed_amount` int(11) unsigned DEFAULT '0',
  `status` varchar(45) NOT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `checked` varchar(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` varchar(30) NOT NULL,
  `origin` varchar(20) NOT NULL,
  `cod` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `user` varchar(15) NOT NULL,
  `status` varchar(18) NOT NULL,
  `dev_cod` int(11) DEFAULT '0',
  `last_update` varchar(45) DEFAULT NULL,
  `withdrawal` int(11) DEFAULT '0',
  `send_date` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `cod_UNIQUE` (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
INSERT INTO `sale` VALUES (1,'30-03-2019','mljc','0001','comprador 1','hlyras','enviado',0,'hlyras',1,NULL),(2,'30-03-2019','mljc','0002','comprador 2','hlyras','cancelado',1,'hlyras',2,NULL),(3,'30-03-2019','mljc','0003','compr 3','hlyras','preparacao',0,NULL,0,NULL),(4,'30-03-2019','mljc','0004','compr4','hlyras','cancelado',2,'hlyras',3,NULL),(5,'30-03-2019','mljc','0005','compr 5','hlyras','devolucao',3,'hlyras',4,NULL);
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_product`
--

DROP TABLE IF EXISTS `sale_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale_product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sale_cod` varchar(20) NOT NULL,
  `product_id` int(11) unsigned NOT NULL,
  `product_info` varchar(45) NOT NULL,
  `amount` int(4) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_product`
--

LOCK TABLES `sale_product` WRITE;
/*!40000 ALTER TABLE `sale_product` DISABLE KEYS */;
INSERT INTO `sale_product` VALUES (1,'0001',32,'P.c. Fuzil tt mod./pt',7),(2,'0001',1,'Capa Modular P/pt',1),(3,'0001',53,'P.. Rádio modular/pt',1),(4,'0001',52,'Camelback modular/pt',1),(5,'0002',2,'Capa Modular M/pt',1),(6,'0003',4,'Capa Modular P/vd',200),(7,'0003',3,'Capa Modular G/pt',200),(8,'0003',31,'Capa modular G/vd',189),(9,'0004',2,'Capa Modular M/pt',10),(10,'0005',3,'Capa Modular G/pt',5);
/*!40000 ALTER TABLE `sale_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_cashier`
--

DROP TABLE IF EXISTS `store_cashier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_cashier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(30) DEFAULT NULL,
  `value` decimal(7,2) DEFAULT '0.00',
  `total_value` decimal(7,2) DEFAULT '0.00',
  `open_date` varchar(30) DEFAULT NULL,
  `close_date` varchar(30) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `user` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_cashier`
--

LOCK TABLES `store_cashier` WRITE;
/*!40000 ALTER TABLE `store_cashier` DISABLE KEYS */;
INSERT INTO `store_cashier` VALUES (1,'03-04-2019',0.00,365.00,'03/04/2019-14:22:31','03/04/2019-16:32:57','2','hlyras');
/*!40000 ALTER TABLE `store_cashier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_cashier_drain`
--

DROP TABLE IF EXISTS `store_cashier_drain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_cashier_drain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cashier_id` int(11) NOT NULL,
  `full_date` varchar(30) NOT NULL,
  `value` decimal(7,2) NOT NULL,
  `user` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_cashier_drain`
--

LOCK TABLES `store_cashier_drain` WRITE;
/*!40000 ALTER TABLE `store_cashier_drain` DISABLE KEYS */;
INSERT INTO `store_cashier_drain` VALUES (1,1,'03/04/2019-14:23:49',150.00,'hlyras'),(2,1,'03/04/2019-14:25:0',115.00,'hlyras'),(3,1,'03/04/2019-14:52:14',100.00,'hlyras'),(4,2,'03/04/2019-14:53:19',0.00,'hlyras');
/*!40000 ALTER TABLE `store_cashier_drain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_product`
--

DROP TABLE IF EXISTS `store_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_product` (
  `id` int(11) NOT NULL,
  `cod` int(4) NOT NULL,
  `type` varchar(15) CHARACTER SET utf8 NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 NOT NULL,
  `color` varchar(15) CHARACTER SET utf8 NOT NULL,
  `amount` int(5) unsigned DEFAULT '0',
  `value` decimal(7,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_product`
--

LOCK TABLES `store_product` WRITE;
/*!40000 ALTER TABLE `store_product` DISABLE KEYS */;
INSERT INTO `store_product` VALUES (1,1,'colete','Capa Modular P','pt',99,150.00),(2,2,'colete','Capa Modular M','pt',100,150.00),(3,3,'colete','Capa Modular G','pt',100,150.00),(4,31,'colete','Capa Modular P','vd',100,150.00),(5,32,'colete','Capa Modular M','vd',100,150.00),(8,52,'colete','Capa modular M','tan',100,150.00),(17,53,'colete','Capa Modular G','tan',100,150.00),(19,101,'coldre','Cold. univ. per(d)','pt',100,35.00),(20,131,'coldre','Cold. univ. per(d)','vd',100,35.00),(21,151,'coldre','Cold. univ. per(d)','tan',100,35.00),(24,201,'bornal','Bornal Tático','pt',97,50.00),(25,231,'bornal','Bornal Tático','vd',100,50.00),(29,251,'bornal','Bornal Tático','tan',100,50.00),(31,33,'colete','Capa modular G','vd',100,150.00),(32,801,'pecamodular','P.c. Fuzil tt mod.','pt',91,20.00),(33,831,'pecamodular','P.c. Fuzil tt mod.','vd',100,20.00),(34,851,'pecamodular','P.c. Fuzil tt mod.','tan',100,20.00),(35,901,'pecamodular','Cold. univ. mod(d)','pt',100,20.00),(36,931,'pecamodular','Cold. univ. mod(d)','vd',100,20.00),(37,951,'pecamodular','Cold. univ. mod(d)','tan',100,20.00),(44,902,'pecamodular','Cold. univ. mod(c)','pt',100,20.00),(45,932,'pecamodular','Cold. univ. mod(c)','vd',100,20.00),(46,952,'pecamodular','Cold. univ. mod(c)','tan',100,20.00),(48,102,'coldre','Cold. univ. per(c)','pt',100,35.00),(49,132,'coldre','Cold. univ. per(c)','vd',100,35.00),(50,152,'coldre','Cold. univ. per(c)','tan',100,35.00),(51,51,'colete','Capa Modular P','tan',100,150.00),(52,1001,'pecamodular','Camelback modular','pt',100,40.00),(53,1101,'pecamodular','P.. Rádio modular','pt',100,15.00);
/*!40000 ALTER TABLE `store_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_sale`
--

DROP TABLE IF EXISTS `store_sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_sale` (
  `cod` int(11) NOT NULL AUTO_INCREMENT,
  `cashier_id` int(11) DEFAULT NULL,
  `date` varchar(30) NOT NULL,
  `origin` varchar(15) NOT NULL,
  `customer` varchar(45) NOT NULL,
  `customer_cpf` varchar(11) DEFAULT NULL,
  `payment` varchar(20) NOT NULL,
  `installment` int(2) DEFAULT NULL,
  `discount` varchar(45) DEFAULT '0',
  `discount_full_packs` decimal(7,2) DEFAULT '0.00',
  `discount_molle_packs` decimal(7,2) DEFAULT '0.00',
  `value` decimal(7,2) NOT NULL DEFAULT '0.00',
  `total_value` decimal(7,2) DEFAULT '0.00',
  `full_date` varchar(30) NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_sale`
--

LOCK TABLES `store_sale` WRITE;
/*!40000 ALTER TABLE `store_sale` DISABLE KEYS */;
INSERT INTO `store_sale` VALUES (1,1,'03-04-2019','ja1','Henrique Lyra da SIlva','07103488606','cash',1,'0',115.00,0.00,330.00,215.00,'03/04/2019-14:23:1','1'),(2,1,'03-04-2019','ja1','Henrique Lyra da SIlva','07103488606','cash',1,'0',0.00,0.00,150.00,150.00,'03/04/2019-14:24:24','1');
/*!40000 ALTER TABLE `store_sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_sale_product`
--

DROP TABLE IF EXISTS `store_sale_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_sale_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_sale_cod` varchar(20) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_info` varchar(45) DEFAULT NULL,
  `amount` int(4) DEFAULT '0',
  `value` decimal(7,2) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_sale_product`
--

LOCK TABLES `store_sale_product` WRITE;
/*!40000 ALTER TABLE `store_sale_product` DISABLE KEYS */;
INSERT INTO `store_sale_product` VALUES (1,'1',1,'Capa Modular P/pt',1,150.00),(2,'1',32,'P.c. Fuzil tt mod./pt',9,20.00),(3,'2',24,'Bornal Tático/pt',3,50.00);
/*!40000 ALTER TABLE `store_sale_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_supply`
--

DROP TABLE IF EXISTS `store_supply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_supply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(30) NOT NULL,
  `user` varchar(15) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '0',
  `obs` varchar(200) DEFAULT NULL,
  `confirmation_user` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_supply`
--

LOCK TABLES `store_supply` WRITE;
/*!40000 ALTER TABLE `store_supply` DISABLE KEYS */;
INSERT INTO `store_supply` VALUES (1,'30-03-2019','hlyras','1','','hlyras');
/*!40000 ALTER TABLE `store_supply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_supply_product`
--

DROP TABLE IF EXISTS `store_supply_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_supply_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supply_id` int(11) NOT NULL,
  `product_id` int(11) unsigned NOT NULL,
  `product_info` varchar(45) NOT NULL,
  `amount` int(4) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_supply_product`
--

LOCK TABLES `store_supply_product` WRITE;
/*!40000 ALTER TABLE `store_supply_product` DISABLE KEYS */;
INSERT INTO `store_supply_product` VALUES (1,1,1,'Capa Modular P/pt',3),(2,1,3,'Capa Modular G/pt',1),(3,1,2,'Capa Modular M/pt',2);
/*!40000 ALTER TABLE `store_supply_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `access` varchar(2) NOT NULL,
  `name` varchar(200) NOT NULL,
  `occupation` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'hlyras','Howigo123!@','a1','Henrique Lyra','Programador'),(2,'user2','senha2','a2','Usuário Fictício','Suporte Técnico de Software'),(3,'user3','senha3','a3','Usuário 3','Low scale');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawal`
--

DROP TABLE IF EXISTS `withdrawal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `withdrawal` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` varchar(30) NOT NULL,
  `user` varchar(15) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '0',
  `confirmation_user` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal`
--

LOCK TABLES `withdrawal` WRITE;
/*!40000 ALTER TABLE `withdrawal` DISABLE KEYS */;
INSERT INTO `withdrawal` VALUES (1,'30-03-2019','hlyras','1','hlyras'),(2,'30-03-2019','hlyras','1','hlyras'),(3,'30-03-2019','hlyras','1','hlyras'),(4,'30-03-2019','hlyras','0',NULL);
/*!40000 ALTER TABLE `withdrawal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawal_product`
--

DROP TABLE IF EXISTS `withdrawal_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `withdrawal_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `withdrawal_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_cod` varchar(4) NOT NULL,
  `product_info` varchar(45) NOT NULL,
  `amount` int(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal_product`
--

LOCK TABLES `withdrawal_product` WRITE;
/*!40000 ALTER TABLE `withdrawal_product` DISABLE KEYS */;
INSERT INTO `withdrawal_product` VALUES (1,1,32,'801','P.c. Fuzil tt mod. pt',7),(2,1,1,'1','Capa Modular P pt',1),(3,1,52,'1001','Camelback modular pt',1),(4,1,53,'1101','P.. Rádio modular pt',1),(5,2,2,'2','Capa Modular M pt',1),(6,3,2,'2','Capa Modular M pt',10),(7,4,3,'3','Capa Modular G pt',5);
/*!40000 ALTER TABLE `withdrawal_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawal_sale`
--

DROP TABLE IF EXISTS `withdrawal_sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `withdrawal_sale` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `withdrawal_id` int(11) NOT NULL,
  `sale_cod` varchar(20) NOT NULL,
  `sale_buyer` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal_sale`
--

LOCK TABLES `withdrawal_sale` WRITE;
/*!40000 ALTER TABLE `withdrawal_sale` DISABLE KEYS */;
INSERT INTO `withdrawal_sale` VALUES (1,1,'0001','comprador 1'),(2,2,'0002','comprador 2'),(3,3,'0004','compr4'),(4,4,'0005','compr 5');
/*!40000 ALTER TABLE `withdrawal_sale` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-03 17:20:51
