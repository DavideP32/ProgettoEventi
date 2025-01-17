-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: projectwork
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
-- Table structure for table `eventi`
--

DROP TABLE IF EXISTS `eventi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventi` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipologia` enum('MUSICA','TEATRO_CINEMA','CIBO','FESTE_SAGRE','SPORT','ARTE') DEFAULT NULL,
  `caratteristiche` enum('PRENOTAZIONE_OBBLIGATORIA','ENTRATA_LIBERA') DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `descrizione` varchar(255) DEFAULT NULL,
  `luogo_evento` varchar(255) DEFAULT NULL,
  `coordinateGPS` varchar(255) DEFAULT NULL,
  `posti` int NOT NULL,
  `disponibilita` tinyint(1) NOT NULL DEFAULT '1',
  `data_evento` date NOT NULL,
  `prezzo_listino` double DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `percorso` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventi`
--

LOCK TABLES `eventi` WRITE;
/*!40000 ALTER TABLE `eventi` DISABLE KEYS */;
INSERT INTO `eventi` VALUES (1,'MUSICA','PRENOTAZIONE_OBBLIGATORIA','Concerto Jazz sotto le stelle','Serata di jazz contemporaneo con artisti internazionali','Anfiteatro Romano, Verona','45.4384,10.9916',2000,1,'2025-06-15',45,'jazz.festival@eventi.it','./img/musica3.webp'),(2,'TEATRO_CINEMA','PRENOTAZIONE_OBBLIGATORIA','Amleto - Teatro Classico','Rappresentazione classica dell\'opera di Shakespeare','Teatro La Fenice, Venezia','45.4337,12.3347',800,1,'2025-03-20',35.5,'teatro.fenice@eventi.it','./img/teatro_cinema5.webp'),(3,'CIBO','ENTRATA_LIBERA','Festival dello Street Food','Street food da tutto il mondo con 30 stand gastronomici','Piazza Maggiore, Bologna','44.4949,11.3426',5000,1,'2025-07-10',NULL,'streetfood.bologna@eventi.it','./img/cibo5.webp'),(4,'FESTE_SAGRE','ENTRATA_LIBERA','Sagra della Polenta','Degustazione e vendita di polenta prodotta da grani locali','Centro Storico, Vercelli','44.7004,8.0363',3000,1,'2025-10-05',NULL,'sagra.alba@eventi.it','./img/feste_sagre2.webp'),(5,'SPORT','PRENOTAZIONE_OBBLIGATORIA','Maratona di Roma','Maratona internazionale nel cuore di Roma','Fori Imperiali, Roma','41.8925,12.4853',10000,1,'2025-04-21',50,'maratona.roma@eventi.it','./img/sport1.webp'),(6,'ARTE','PRENOTAZIONE_OBBLIGATORIA','Mostra Van Gogh Multimedia','Esperienza immersiva nelle opere di Van Gogh','Palazzo Reale, Milano','45.4641,9.1919',200,1,'2025-02-28',22,'mostra.vangogh@eventi.it','./img/arte1.webp'),(7,'MUSICA','PRENOTAZIONE_OBBLIGATORIA','Opera Lirica - La Traviata','Opera di Verdi con orchestra dal vivo','Arena di Verona','45.4386,10.9917',15000,1,'2025-08-01',75,'arena.verona@eventi.it','./img/musica6.webp'),(8,'TEATRO_CINEMA','ENTRATA_LIBERA','Cinema all\'aperto','Proiezione film d\'autore sotto le stelle','Giardini Margherita, Bologna','44.4850,11.3642',300,1,'2025-07-25',NULL,'cinema.estate@eventi.it','./img/teatro_cinema4.webp'),(9,'CIBO','PRENOTAZIONE_OBBLIGATORIA','Masterclass di Cucina','Corso di cucina con chef stellato','Scuola di Cucina, Firenze','43.7696,11.2558',30,1,'2025-09-15',120,'masterclass.cucina@eventi.it','./img/cibo3.webp'),(10,'SPORT','ENTRATA_LIBERA','Torneo Beach Volley','Torneo amatoriale sulla spiaggia','Spiaggia Rimini','44.0678,12.5695',200,1,'2025-07-05',NULL,'beachvolley.rimini@eventi.it','./img/sport6.jpg');
/*!40000 ALTER TABLE `eventi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prenotazioni`
--

DROP TABLE IF EXISTS `prenotazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prenotazioni` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utente_id` bigint NOT NULL,
  `evento_id` bigint NOT NULL,
  `pagato` tinyint(1) DEFAULT NULL,
  `numero_persone` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_utenti_prenot` (`utente_id`),
  KEY `fk_eventi_prenot` (`evento_id`),
  CONSTRAINT `fk_eventi_prenot` FOREIGN KEY (`evento_id`) REFERENCES `eventi` (`id`),
  CONSTRAINT `fk_utenti_prenot` FOREIGN KEY (`utente_id`) REFERENCES `utenti` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prenotazioni`
--

LOCK TABLES `prenotazioni` WRITE;
/*!40000 ALTER TABLE `prenotazioni` DISABLE KEYS */;
INSERT INTO `prenotazioni` VALUES (1,2,10,1,2,'2025-01-17 13:44:28');
/*!40000 ALTER TABLE `prenotazioni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utenti` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(75) DEFAULT NULL,
  `cognome` varchar(75) DEFAULT NULL,
  `data_nascita` date DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `ruolo` enum('RUOLO_ADMIN','RUOLO_UTENTE') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `k_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'Paolo','Rossi','1994-06-07','admin@email.com','admin','RUOLO_ADMIN'),(2,'Carlo','Verdi','2001-03-19','utente@email.com','utente','RUOLO_UTENTE'),(4,'Lorena','Mannone','2011-11-11','lomano@gmail.com','ciao','RUOLO_UTENTE'),(5,'Lo','Mann','1995-12-10','loaaaa@email.com','lorena12345','RUOLO_UTENTE'),(6,'Davide','Pino','2011-11-11','davide.pino9898@gmail.com','ciao','RUOLO_UTENTE'),(7,'Pippuz','Franca','1999-12-11','lorena@email.com','lorena12345','RUOLO_UTENTE'),(13,'Tiziu','Caiu','2011-11-11','tizcaz@email.com','ciao','RUOLO_UTENTE'),(16,'tiz','caz','1111-11-11','tizcaz@email.co','ciao','RUOLO_UTENTE');
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-17 14:45:23
