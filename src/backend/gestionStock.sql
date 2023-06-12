-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 12, 2023 at 04:41 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestionStock`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `idArticle` int(10) UNSIGNED NOT NULL,
  `nomArticle` varchar(20) NOT NULL,
  `qteCourrante` int(20) NOT NULL,
  `coutTotal` double DEFAULT NULL,
  `idRefType` int(11) NOT NULL,
  `dateCreation` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`idArticle`, `nomArticle`, `qteCourrante`, `coutTotal`, `idRefType`, `dateCreation`) VALUES
(16, 'Orange', 770, 215500, 2, '06/06/2023'),
(17, 'Booster', 1, 2500, 1, '06/06/2023'),
(18, 'Pamplemous', 486, 137500, 2, '06/07/2023'),
(19, 'KADJI', 456, 125000, 1, '06/07/2023');

-- --------------------------------------------------------

--
-- Table structure for table `articlevendue`
--

CREATE TABLE `articlevendue` (
  `idVente` int(10) UNSIGNED NOT NULL,
  `idUser` int(10) UNSIGNED DEFAULT NULL,
  `qteVendu` int(11) NOT NULL,
  `prixVente` int(11) NOT NULL,
  `montantVente` float NOT NULL,
  `marge` int(11) NOT NULL,
  `dates` varchar(30) NOT NULL,
  `heure` varchar(15) NOT NULL,
  `idArticle` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `articlevendue`
--

INSERT INTO `articlevendue` (`idVente`, `idUser`, `qteVendu`, `prixVente`, `montantVente`, `marge`, `dates`, `heure`, `idArticle`) VALUES
(4, 11, 3, 500, 1500, 750, '7/6/2023', '', 16),
(5, 11, 25, 500, 12500, 6250, '8/6/2023', '', 16),
(6, 11, 12, 1000, 12000, 9000, '8/6/2023', '', 16),
(7, 11, 3, 500, 1500, 750, '2023/06/10', '14:21', 16),
(8, 11, 5, 250, 1250, 0, '2023/06/10', '14:30', 18),
(9, 11, 2, 1000, 2000, 1000, '2023/06/10', '14:43', 19),
(10, 11, 12, 250, 3000, 0, '2023/06/10', '14:46', 18),
(11, 11, 15, 300, 4500, 750, '2023/06/10', '14:56', 18),
(12, 11, 5, 500, 2500, 1250, '2023/06/11', '18:36', 18),
(13, 11, 50, 500, 25000, 12500, '2023/06/11', '20:56', 16),
(14, 11, 3, 250, 750, 0, '2023/06/11', '21:00', 18),
(15, 11, 7, 500, 3500, 1750, '2023/06/11', '21:02', 18);

-- --------------------------------------------------------

--
-- Table structure for table `commande`
--

CREATE TABLE `commande` (
  `idCommande` int(10) UNSIGNED NOT NULL,
  `idUser` int(10) UNSIGNED NOT NULL,
  `nomArticle` varchar(20) NOT NULL,
  `qteArticle` int(11) NOT NULL,
  `prixAchat` int(11) NOT NULL,
  `date` date NOT NULL,
  `heure` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conge`
--

CREATE TABLE `conge` (
  `idConge` int(10) UNSIGNED NOT NULL,
  `idUser` int(10) UNSIGNED DEFAULT NULL,
  `id_employe` int(10) UNSIGNED DEFAULT NULL,
  `motif` char(50) NOT NULL,
  `date_dep` date NOT NULL,
  `heure_dep` time DEFAULT NULL,
  `date_ret` varchar(30) NOT NULL,
  `heur_ret` time DEFAULT NULL,
  `statut` varchar(15) DEFAULT 'ATTENTE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conge`
--

INSERT INTO `conge` (`idConge`, `idUser`, `id_employe`, `motif`, `date_dep`, `heure_dep`, `date_ret`, `heur_ret`, `statut`) VALUES
(3, 2, NULL, 'Voyage', '2023-06-05', NULL, '2023-06-19', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employe`
--

CREATE TABLE `employe` (
  `id_employe` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED DEFAULT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) DEFAULT NULL,
  `poste` varchar(30) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `tel` int(13) NOT NULL,
  `cni` varchar(30) DEFAULT NULL,
  `profilUrl` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employe`
--

INSERT INTO `employe` (`id_employe`, `id_user`, `nom`, `prenom`, `poste`, `email`, `tel`, `cni`, `profilUrl`) VALUES
(11, 3, 'themad17', 'monnom', 'Dj', 'themad171@gmail.com', 45231288, 'skjpsdklepskf', NULL),
(12, 3, 'ellah', 'gishlain', 'Serveur', 'ellah@gmail.com', 654823584, 'jsdss5s6dlslds', NULL),
(15, 3, 'Niska', 'Dinga', 'Serveur', 'niska@gmail.com', 652548235, 'KpsppiesDmams', NULL),
(16, 3, 'ninho', 'zobaloza', 'Serveur', 'ninho@gmail.com', 689552478, 'KIY25252', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `emprunt`
--

CREATE TABLE `emprunt` (
  `id` int(10) UNSIGNED NOT NULL,
  `qte` int(11) NOT NULL,
  `prixVente` int(11) NOT NULL,
  `netAPayer` int(11) NOT NULL,
  `date` varchar(15) DEFAULT NULL,
  `statut` varchar(15) NOT NULL,
  `idUser` int(10) UNSIGNED DEFAULT NULL,
  `idArticle` int(10) UNSIGNED NOT NULL,
  `idRefArticle` int(11) NOT NULL,
  `id_employe` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `emprunt`
--

INSERT INTO `emprunt` (`id`, `qte`, `prixVente`, `netAPayer`, `date`, `statut`, `idUser`, `idArticle`, `idRefArticle`, `id_employe`) VALUES
(4, 5, 500, 2500, '11/06/2023', 'NON REGLE', NULL, 18, 2, 15);

-- --------------------------------------------------------

--
-- Table structure for table `fiche_pre_abs`
--

CREATE TABLE `fiche_pre_abs` (
  `id` int(10) UNSIGNED NOT NULL,
  `idUser` int(10) UNSIGNED DEFAULT NULL,
  `dateDay` varchar(15) NOT NULL,
  `heureArrive` time DEFAULT NULL,
  `heureDepart` time DEFAULT NULL,
  `statut` varchar(30) NOT NULL,
  `idEmploye` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fiche_pre_abs`
--

INSERT INTO `fiche_pre_abs` (`id`, `idUser`, `dateDay`, `heureArrive`, `heureDepart`, `statut`, `idEmploye`) VALUES
(1, 2, '5/6/2023', NULL, NULL, 'PRESENT', NULL),
(2, NULL, '5/6/2023', NULL, NULL, 'PRESENT', 11),
(3, NULL, '5/6/2023', NULL, NULL, 'ABSENT', 12),
(4, NULL, '5/6/2023', NULL, NULL, 'PRESENT', 15),
(5, NULL, '5/6/2023', NULL, NULL, 'PRESENT', 16),
(6, NULL, '7/6/2023', NULL, NULL, 'PRESENT', 11),
(7, NULL, '7/6/2023', NULL, NULL, 'PRESENT', 12),
(8, NULL, '7/6/2023', NULL, NULL, 'PRESENT', 15),
(9, NULL, '7/6/2023', NULL, NULL, 'PRESENT', 16),
(10, 2, '7/6/2023', NULL, NULL, 'PRESENT', NULL),
(11, 10, '7/6/2023', NULL, NULL, 'PRESENT', NULL),
(12, 11, '7/6/2023', NULL, NULL, 'PRESENT', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `perte`
--

CREATE TABLE `perte` (
  `id` int(10) UNSIGNED NOT NULL,
  `motif` text NOT NULL,
  `prix` float NOT NULL,
  `qte` int(11) DEFAULT NULL,
  `dates` varchar(15) NOT NULL,
  `idArticle` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `perte`
--

INSERT INTO `perte` (`id`, `motif`, `prix`, `qte`, `dates`, `idArticle`) VALUES
(1, 'CASSE', 500, 2, '9/6/2023', 16),
(2, 'casse', 500, 2, '12/6/2023', 18),
(3, 'paye music', 2000, NULL, '12/06/2023', NULL),
(4, 'paye', 650, NULL, '12/6/2023', NULL),
(5, 'paye ...', 200, NULL, '12/6/2023', NULL),
(6, 'casse', 1000, 2, '12/6/2023', 19),
(8, 'passe', 250, NULL, '12/06/2023', NULL),
(9, 'paye', 500, NULL, '12/06/2023', NULL),
(10, 'paye employeMusic', 1500, NULL, '12/6/2023', NULL),
(11, 'casse', 3000, 6, '12/6/2023', 17);

-- --------------------------------------------------------

--
-- Table structure for table `sanction`
--

CREATE TABLE `sanction` (
  `id` int(10) UNSIGNED NOT NULL,
  `idUser` int(10) UNSIGNED DEFAULT NULL,
  `id_employe` int(10) UNSIGNED DEFAULT NULL,
  `motif` text NOT NULL,
  `amande` float NOT NULL,
  `dates` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanction`
--

INSERT INTO `sanction` (`id`, `idUser`, `id_employe`, `motif`, `amande`, `dates`) VALUES
(11, NULL, 15, 'SUSPENSION TEMPORAIRE', 650, '12/6/2023');

-- --------------------------------------------------------

--
-- Table structure for table `type_article`
--

CREATE TABLE `type_article` (
  `id` int(11) NOT NULL,
  `libelle` varchar(30) NOT NULL,
  `qteCritique` int(11) NOT NULL,
  `prixUnitaire` float NOT NULL,
  `dateCreation` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `type_article`
--

INSERT INTO `type_article` (`id`, `libelle`, `qteCritique`, `prixUnitaire`, `dateCreation`) VALUES
(1, 'Biere ', 200, 500, '5/6/2023'),
(2, 'JUS TOP 0.5L', 200, 250, '5/6/2023'),
(3, 'WHISKY', 300, 5000, '5/6/2023'),
(4, 'VIN ROUGE', 550, 3000, '5/6/2023');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` int(10) UNSIGNED NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `tel` int(13) NOT NULL,
  `cni` varchar(30) DEFAULT NULL,
  `mdp` varchar(20) NOT NULL,
  `role` varchar(25) DEFAULT NULL,
  `generatedBy` varchar(20) DEFAULT NULL,
  `endValidity` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `nom`, `prenom`, `email`, `tel`, `cni`, `mdp`, `role`, `generatedBy`, `endValidity`) VALUES
(2, 'john', 'stockUsr', 'john@gmail.com', 655485568, 'kirqsf', 'mdps', 'MAGAZINIER', '', '2023/07/11'),
(3, 'user', 'directorUser', 'director@gmail.com', 6584525, 'kitsf', 'mot', 'DIRECTOR', '', '2023/07/11'),
(8, 'Franz', 'Deussom', 'franz@gmail.com', 698403201, 'kitid300', 'mdps', 'developper', '', '2023/07/11'),
(10, 'admin', 'kaleb', 'admin@gmail.com', 695258965, 'KITID5236', 'mdps', 'ADMINISTRATOR', '', '2023/07/11'),
(11, 'caissiere', 'caisse', 'caissiere@gmail.com', 658523552, 'KIT2358', 'mdps', 'CASHIER', '', '2023/07/11'),
(12, 'noname', 'nosurname', 'noname@gmail.com', 698025568, 'KITID546', 'j7KqGL6G4iFmwKg9DD', 'CASHIER', 'user directorUser', '2023/07/11'),
(15, 'Bruno', 'mars', 'bruno@gmail.com', 654223656, 'jsdss5s6dlslds', 'iyiT8LlYcfzOUnsXDF', 'MAGAZINIER', 'userdirectorUser', '2023/07/11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`idArticle`),
  ADD KEY `fk_refType` (`idRefType`);

--
-- Indexes for table `articlevendue`
--
ALTER TABLE `articlevendue`
  ADD PRIMARY KEY (`idVente`),
  ADD KEY `idArticle` (`idArticle`),
  ADD KEY `idEmploye` (`idUser`) USING BTREE;

--
-- Indexes for table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`idCommande`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `conge`
--
ALTER TABLE `conge`
  ADD PRIMARY KEY (`idConge`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `employe`
--
ALTER TABLE `employe`
  ADD PRIMARY KEY (`id_employe`),
  ADD KEY `idUser` (`id_user`);

--
-- Indexes for table `emprunt`
--
ALTER TABLE `emprunt`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idArticle` (`idArticle`),
  ADD KEY `idRefArticle` (`idRefArticle`),
  ADD KEY `id_employe` (`id_employe`);

--
-- Indexes for table `fiche_pre_abs`
--
ALTER TABLE `fiche_pre_abs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idEmploye` (`idEmploye`);

--
-- Indexes for table `perte`
--
ALTER TABLE `perte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_idArticle_perte` (`idArticle`);

--
-- Indexes for table `sanction`
--
ALTER TABLE `sanction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `id_employe` (`id_employe`);

--
-- Indexes for table `type_article`
--
ALTER TABLE `type_article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `idArticle` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `articlevendue`
--
ALTER TABLE `articlevendue`
  MODIFY `idVente` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `commande`
--
ALTER TABLE `commande`
  MODIFY `idCommande` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `conge`
--
ALTER TABLE `conge`
  MODIFY `idConge` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employe`
--
ALTER TABLE `employe`
  MODIFY `id_employe` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `emprunt`
--
ALTER TABLE `emprunt`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fiche_pre_abs`
--
ALTER TABLE `fiche_pre_abs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `perte`
--
ALTER TABLE `perte`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sanction`
--
ALTER TABLE `sanction`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `type_article`
--
ALTER TABLE `type_article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `fk_refType` FOREIGN KEY (`idRefType`) REFERENCES `type_article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `articlevendue`
--
ALTER TABLE `articlevendue`
  ADD CONSTRAINT `articlevendue_ibfk_3` FOREIGN KEY (`idArticle`) REFERENCES `articles` (`idArticle`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articlevendue_ibfk_4` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`),
  ADD CONSTRAINT `commande_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `conge`
--
ALTER TABLE `conge`
  ADD CONSTRAINT `conge_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `employe`
--
ALTER TABLE `employe`
  ADD CONSTRAINT `employe_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;

--
-- Constraints for table `emprunt`
--
ALTER TABLE `emprunt`
  ADD CONSTRAINT `emprunt_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `emprunt_ibfk_2` FOREIGN KEY (`idArticle`) REFERENCES `articles` (`idArticle`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `emprunt_ibfk_3` FOREIGN KEY (`idRefArticle`) REFERENCES `type_article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `emprunt_ibfk_4` FOREIGN KEY (`id_employe`) REFERENCES `employe` (`id_employe`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fiche_pre_abs`
--
ALTER TABLE `fiche_pre_abs`
  ADD CONSTRAINT `fiche_pre_abs_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`),
  ADD CONSTRAINT `fiche_pre_abs_ibfk_3` FOREIGN KEY (`idEmploye`) REFERENCES `employe` (`id_employe`) ON DELETE CASCADE;

--
-- Constraints for table `perte`
--
ALTER TABLE `perte`
  ADD CONSTRAINT `fk_idArticle_perte` FOREIGN KEY (`idArticle`) REFERENCES `articles` (`idArticle`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sanction`
--
ALTER TABLE `sanction`
  ADD CONSTRAINT `sanction_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sanction_ibfk_2` FOREIGN KEY (`id_employe`) REFERENCES `employe` (`id_employe`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
