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
  `approvazione` enum('APPROVATO','RICHIESTA','SCARTATO') NOT NULL DEFAULT 'RICHIESTA',
  `nome` varchar(255) DEFAULT NULL,
  `descrizione` varchar(255) DEFAULT NULL,
  `motto` varchar(255) DEFAULT NULL,
  `luogo_evento` varchar(255) DEFAULT NULL,
  `coordinateGPS` varchar(255) DEFAULT NULL,
  `posti` int NOT NULL,
  `disponibilita` tinyint(1) NOT NULL DEFAULT '1',
  `data_evento` date NOT NULL,
  `prezzo_listino` double DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `percorso` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventi`
--

LOCK TABLES `eventi` WRITE;
/*!40000 ALTER TABLE `eventi` DISABLE KEYS */;
INSERT INTO `eventi` VALUES (1,'MUSICA','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Concerto Jazz sotto le stelle','Una serata magica dedicata al jazz contemporaneo con artisti di fama internazionale. Performance dal vivo sotto il cielo stellato in un\'atmosfera unica.','Serata di jazz contemporaneo con artisti internazionali','Anfiteatro Romano, Verona','45.4384,10.9916',2000,1,'2025-06-15',45,'jazz.festival@eventi.it','musica3.webp'),(2,'TEATRO_CINEMA','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Amleto - Teatro Classico','Una moderna interpretazione del capolavoro shakespeariano con costumi d\'epoca e scenografie innovative. Un cast di attori rinomati porta in vita questo classico.','Rappresentazione classica dell\'opera di Shakespeare','Teatro La Fenice, Venezia','45.4337,12.3347',800,1,'2025-03-20',35.5,'teatro.fenice@eventi.it','teatro_cinema5.webp'),(3,'CIBO','ENTRATA_LIBERA','APPROVATO','Festival dello Street Food','Un viaggio gastronomico attraverso sapori internazionali con chef provenienti da tutto il mondo. Degustazioni, show cooking e workshop culinari per tutti.','Street food da tutto il mondo con 30 stand gastronomici','Piazza Maggiore, Bologna','44.4949,11.3426',5000,1,'2025-07-10',NULL,'streetfood.bologna@eventi.it','cibo5.webp'),(4,'FESTE_SAGRE','ENTRATA_LIBERA','APPROVATO','Sagra della Polenta','Celebrazione della tradizione culinaria locale con degustazioni di polenta preparata secondo ricette antiche. Showcooking e dimostrazione di tecniche tradizionali di macinatura.','Degustazione e vendita di polenta prodotta da grani locali','Centro Storico, Vercelli','44.7004,8.0363',3000,1,'2025-10-05',NULL,'sagra.alba@eventi.it','feste_sagre2.webp'),(5,'SPORT','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Maratona di Roma','Corsa attraverso i monumenti più iconici della Città Eterna. Un percorso che unisce sport, storia e cultura in un evento indimenticabile.','Maratona internazionale nel cuore di Roma','Fori Imperiali, Roma','41.8925,12.4853',10000,1,'2025-04-21',50,'maratona.roma@eventi.it','sport1.webp'),(6,'ARTE','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Mostra Van Gogh Multimedia','Viaggio multisensoriale attraverso i capolavori di Van Gogh con proiezioni in alta definizione e musica orchestrale. Un\'esperienza artistica rivoluzionaria.','Esperienza immersiva nelle opere di Van Gogh','Palazzo Reale, Milano','45.4641,9.1919',200,1,'2025-02-28',22,'mostra.vangogh@eventi.it','arte1.webp'),(7,'MUSICA','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Opera Lirica - La Traviata','Un allestimento spettacolare della celebre opera verdiana con orchestra e coro internazionali. Una produzione che unisce tradizione e innovazione scenica.','Opera di Verdi con orchestra dal vivo','Arena di Verona','45.4386,10.9917',15000,1,'2025-08-01',75,'arena.verona@eventi.it','musica6.webp'),(8,'TEATRO_CINEMA','ENTRATA_LIBERA','APPROVATO','Cinema all\'aperto','Rassegna cinematografica che presenta i migliori film d\'autore in un\'atmosfera magica all\'aperto. Proiezioni in lingua originale con sottotitoli italiani.','Proiezione film d\'autore sotto le stelle','Giardini Margherita, Bologna','44.4850,11.3642',300,1,'2025-07-25',NULL,'cinema.estate@eventi.it','teatro_cinema4.webp'),(9,'CIBO','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Masterclass di Cucina','Lezione esclusiva di alta cucina con uno chef pluristellato. Tecniche avanzate, segreti professionali e degustazione finale dei piatti preparati.','Corso di cucina con chef stellato','Scuola di Cucina, Firenze','43.7696,11.2558',30,1,'2025-09-15',120,'masterclass.cucina@eventi.it','cibo3.webp'),(10,'SPORT','ENTRATA_LIBERA','APPROVATO','Torneo Beach Volley','Competizione amichevole di beach volley aperta a tutti i livelli. Musica, intrattenimento e area relax per spettatori sulla spiaggia.','Torneo amatoriale sulla spiaggia','Spiaggia Rimini','44.0678,12.5695',200,1,'2025-07-05',NULL,'beachvolley.rimini@eventi.it','sport6.jpg'),(11,'MUSICA','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Festival Rock Estate','Marathon musicale con le migliori band rock internazionali. Due palchi, area food & beverage e camping per un\'esperienza festival completa.','Due giorni di rock con band internazionali','Ippodromo San Siro, Milano','45.4785,9.1234',25000,1,'2025-07-20',65,'rockfestival@eventi.it','musica2.webp'),(12,'ARTE','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Mostra Fotografica - National Geographic','Esposizione delle fotografie più spettacolari selezionate da National Geographic. Incontri con i fotografi e workshop di fotografia naturalistica.','Le migliori foto naturalistiche dell\'anno','Palazzo Ducale, Genova','44.4076,8.9300',150,1,'2025-05-15',15,'mostra.fotografia@eventi.it','arte2.webp'),(13,'TEATRO_CINEMA','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Romeo e Giulietta - Ballet','Interpretazione moderna del classico shakespeariano attraverso la danza classica. Orchestra dal vivo e costumi creati da designer internazionali.','Ballet classico con orchestra dal vivo','Teatro San Carlo, Napoli','40.8383,14.2486',1200,1,'2025-04-10',40,'teatro.napoli@eventi.it','teatro_cinema2.webp'),(14,'CIBO','ENTRATA_LIBERA','APPROVATO','Festival del Cioccolato','Evento dedicato all\'arte del cioccolato con maestri cioccolatieri internazionali. Degustazioni, dimostrazioni e laboratori per adulti e bambini.','Degustazioni e laboratori sul cioccolato artigianale','Piazza Castello, Torino','45.0703,7.6869',2000,1,'2025-11-15',NULL,'cioccolato.torino@eventi.it','cibo4.webp'),(15,'FESTE_SAGRE','ENTRATA_LIBERA','APPROVATO','Festa della Vendemmia','Celebrazione della tradizione vinicola toscana con degustazioni guidate e tour dei vigneti. Spettacoli folkloristici e cena sotto le stelle.','Celebrazione tradizionale con degustazione vini','Montepulciano, Siena','43.0988,11.7873',1500,1,'2025-09-28',NULL,'vendemmia@eventi.it','feste_sagre3.webp'),(16,'SPORT','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Torneo Tennis Outdoor','Competizione tennistica di alto livello con atleti internazionali. Village con area food, shop sportivi e attività per famiglie.','Torneo internazionale di tennis','PalaAlpitour, Torino','45.0419,7.6501',12000,1,'2025-02-10',35,'tennis.torino@eventi.it','sport4.webp'),(17,'MUSICA','ENTRATA_LIBERA','APPROVATO','Concerto in Piazza','Concerto gratuito dell\'orchestra sinfonica nella splendida cornice di Piazza del Campo. Repertorio classico e contemporaneo sotto le stelle.','Orchestra sinfonica all\'aperto','Piazza del Campo, Siena','43.3186,11.3319',5000,1,'2025-06-21',NULL,'concerto.siena@eventi.it','musica1.webp'),(18,'ARTE','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Biennale Arte Contemporanea','Mostra internazionale di arte contemporanea con opere di artisti emergenti e affermati. Performance dal vivo, installazioni interattive e conferenze.','Esposizione internazionale di arte moderna','Arsenale, Venezia','45.4343,12.3388',1000,1,'2025-08-30',25,'biennale@eventi.it','arte5.webp'),(19,'TEATRO_CINEMA','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Festival del Cinema Indipendente','Selezione dei migliori film indipendenti internazionali. Incontri con registi e attori, masterclass di regia e workshop di sceneggiatura.','Rassegna di film indipendenti internazionali','Cinema Modernissimo, Bologna','44.4957,11.3431',400,1,'2025-03-15',12,'cinema.indie@eventi.it','teatro_cinema1.webp'),(20,'CIBO','ENTRATA_LIBERA','APPROVATO','Sagra del Pesto','Celebrazione del famoso pesto genovese con dimostrazioni di preparazione tradizionale. Degustazioni, corsi di preparazione e gara del mortaio.','Festival gastronomico dedicato al pesto genovese','Porto Antico, Genova','44.4083,8.9251',3000,1,'2025-05-25',NULL,'pesto.festival@eventi.it','cibo6.jpg'),(21,'FESTE_SAGRE','ENTRATA_LIBERA','APPROVATO','Carnevale di Viareggio','Il più spettacolare carnevale d\'Italia con giganteschi carri allegorici. Sfilate in maschera, spettacoli di strada e eventi collaterali.','Sfilata dei carri allegorici','Lungomare, Viareggio','43.8657,10.2513',50000,1,'2025-02-15',NULL,'carnevale@eventi.it','feste_sagre4.webp'),(22,'SPORT','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Gara di Triathlon','Sfida multidisciplinare che combina nuoto, ciclismo e corsa. Percorso panoramico lungo il litorale con atleti da tutto il mondo.','Competizione internazionale di triathlon','Lido di Ostia, Roma','41.7347,12.2711',1000,1,'2025-06-05',80,'triathlon.roma@eventi.it','sport2.webp'),(23,'MUSICA','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Electronic Vibes','Festival di musica elettronica con artisti internazionali. Stage multipli, visual art e performance di danza elettronica dal tramonto all\'alba.','Un\'esplosione di suoni elettronici con i migliori DJ della scena internazionale.','Parco della Musica, Roma','41.9284,12.4747',8000,1,'2025-07-10',40,'blues.festival@eventi.it','musica4.webp'),(24,'ARTE','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Mostra Monet','Esposizione completa delle opere più significative dell\'impressionista francese. Percorso cronologico con audioguide e visite guidate tematiche.','Retrospettiva delle opere più famose','Palazzo Strozzi, Firenze','43.7714,11.2502',300,1,'2025-04-01',18,'mostra.picasso@eventi.it','arte3.webp'),(25,'TEATRO_CINEMA','ENTRATA_LIBERA','APPROVATO','Teatro di Strada','Festival internazionale di teatro di strada con artisti da tutto il mondo. Spettacoli di giocoleria, acrobatica e clownerie.','Festival degli artisti di strada','Centro Storico, Ferrara','44.8346,11.6198',2000,1,'2025-09-05',NULL,'teatro.strada@eventi.it','teatro_cinema3.webp'),(26,'CIBO','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Cena Stellata','Serata gastronomica esclusiva con cinque chef stellati Michelin. Menu degustazione di alta cucina con abbinamento vini pregiati e spettacolo cooking live.','Cena di gala con 5 chef stellati','Villa Reale, Monza','45.5847,9.2784',100,1,'2025-10-10',200,'cena.stellata@eventi.it','cibo2.webp'),(27,'FESTE_SAGRE','ENTRATA_LIBERA','APPROVATO','Festa della Lavanda','Evento dedicato alla fioritura dei campi di lavanda con percorsi guidati, workshop di cosmesi naturale e fotografia nei campi fioriti.','Celebrazione della fioritura della lavanda','Sale San Giovanni, Cuneo','44.4089,8.0751',1000,1,'2025-07-01',NULL,'lavanda.festa@eventi.it','feste_sagre6.jpg'),(28,'SPORT','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Torneo Internazionale Scherma','Competizione internazionale di scherma con atleti olimpici. Categorie fioretto, spada e sciabola con finali spettacolari e clinic con campioni.','Competizione di scherma','PalaCatania, Catania','37.5079,15.0830',3000,1,'2025-03-25',20,'scherma.catania@eventi.it','sport7.jpg'),(29,'MUSICA','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Festival Opera Puccini','Festival dedicato alle opere più celebri di Giacomo Puccini. Orchestra internazionale, cast di prestigio e allestimenti scenici innovativi.','Rassegna delle opere di Puccini','Gran Teatro, Torre del Lago','43.8283,10.3189',3000,1,'2025-08-10',55,'puccini.festival@eventi.it','musica7.jpg'),(30,'ARTE','PRENOTAZIONE_OBBLIGATORIA','APPROVATO','Salone del libro antico','Esposizione di manoscritti e libri antichi dal Medioevo al Rinascimento. Workshop di calligrafia, restauro e lezioni sulla storia del libro.','Avvicinati anche tu al magico mondo dei libri','Castello Sforzesco, Milano','45.4704,9.1790',200,1,'2025-05-01',22,'leonardo.mostra@eventi.it','arte4.webp');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prenotazioni`
--

LOCK TABLES `prenotazioni` WRITE;
/*!40000 ALTER TABLE `prenotazioni` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'Paolo','Rossi','1994-06-07','admin@email.com','admin','RUOLO_ADMIN'),(2,'Carlo','Verdi','2001-03-19','utente@email.com','utente','RUOLO_UTENTE');
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

-- Dump completed on 2025-01-21 11:47:59
