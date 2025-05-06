-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Úte 06. kvě 2025, 21:44
-- Verze serveru: 10.4.28-MariaDB
-- Verze PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `zat`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `dilo`
--

CREATE TABLE `dilo` (
  `dilo_id` int(6) NOT NULL,
  `nosic_id` int(6) NOT NULL,
  `nazev` varchar(50) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `dat_porizeni` date NOT NULL,
  `delka` varchar(10) NOT NULL,
  `popis` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Vypisuji data pro tabulku `dilo`
--

INSERT INTO `dilo` (`dilo_id`, `nosic_id`, `nazev`, `autor`, `dat_porizeni`, `delka`, `popis`) VALUES
(1, 1, '1984', 'George Orwell', '2023-06-15', '328', 'Dystopický román o totalitním režimu a ztrátě osobních svobod.'),
(2, 2, 'Random Access Memories', 'Daft Punk', '2023-04-05', '74', 'Elektronická hudba, která kombinuje house, disco a pop.'),
(3, 3, 'Počátek', 'Christopher Nolan', '2023-02-23', '148', 'Sci-fi thriller o snech a realitě, který zkoumá hranice mezi nimi.'),
(4, 1, 'Na větrné hůrce', 'Emily Brontë', '2023-01-12', '415', 'Román o tragické lásce mezi Heathcliffem a Catherine v anglické vysočině.'),
(5, 2, 'The Dark Side of the Moon', 'Pink Floyd', '2022-12-10', '43', 'Konceptuální album o lidském životě, známé pro svou experimentální zvukovou podobu.'),
(6, 3, 'Matrix', 'Lilly a Lana Wachowski', '2022-11-05', '136', 'Sci-fi film o hackerovi, který odhaluje pravdu za realitou.'),
(7, 1, 'Pýcha a předsudek', 'Jane Austen', '2022-10-01', '432', 'Romantický příběh o manželských vztazích a třídních rozdílech v Anglii 19. století.'),
(8, 2, 'Abbey Road', 'The Beatles', '2022-09-15', '47', 'Jedno z nejslavnějších alb v historii rocku, které spojuje různé hudební styly.'),
(9, 3, 'Kmotr', 'Francis Ford Coppola', '2022-08-20', '175', 'Kriminální drama o mafii Corleone v Americe.'),
(10, 1, 'Bratři Karamazovi', 'Fyodor Dostoevsky', '2022-07-30', '736', 'Psychologický román o osudu tří bratrů a jejich otce v 19. století.'),
(11, 2, 'A Night at the Opera', 'Queen', '2022-06-18', '43', 'Přelomové rockové album, které zahrnuje ikonickou skladbu \"Bohemian Rhapsody\".'),
(12, 3, 'Vykoupení z věznice Shawshank', 'Frank Darabont', '2022-05-10', '142', 'Vězeňské drama o naději a přátelství uprostřed těžkostí.'),
(13, 1, 'Fahrenheit 451', 'Ray Bradbury', '2022-04-12', '158', 'Román o budoucí společnosti, kde jsou knihy zakázány a spalovány.'),
(14, 2, 'Hotel California', 'Eagles', '2022-03-25', '46', 'Album, které spojuje rock, country a pop a představuje ikonickou skladbu.'),
(15, 3, 'Interstellar', 'Christopher Nolan', '2022-02-16', '169', 'Vizionářský sci-fi film o vesmírné expedici a lásce.'),
(16, 1, 'Babička', 'Božena Němcová', '2022-01-28', '288', 'Klasický český román, který zobrazuje život na venkově v 19. století.'),
(17, 2, 'Led Zeppelin IV', 'Led Zeppelin', '2021-12-03', '42', 'Klasické rockové album, které spojuje folk, hard rock a mystiku.'),
(18, 3, 'Pulp Fiction', 'Quentin Tarantino', '2021-11-22', '154', 'Nelineární film, který propojuje několik příběhů o zločinu a vykoupení.'),
(19, 1, 'Hlava XXII', 'Joseph Heller', '2021-10-13', '453', 'Satirický román o absurditě války a vojenské byrokracie.'),
(20, 2, 'The Wall', 'Pink Floyd', '2021-09-07', '81', 'Rocková opera, která zkoumá témata izolace, války a duševního zhroucení.'),
(21, 3, 'Lví král', 'Roger Allers', '2021-08-25', '88', 'Animovaný film Disney o lvíčeti, které je určeno stát se králem.'),
(22, 1, 'Cikán a generál', 'Ladislav Mňačko', '2021-07-18', '280', 'Román o etnických a politických problémech během druhé světové války.'),
(23, 2, 'Back in Black', 'AC/DC', '2021-06-29', '42', 'Hard rockové album, známé pro energické riffy a ikonickou titulní skladbu.'),
(24, 3, 'Avengers: Endgame', 'Anthony a Joe Russo', '2021-05-21', '181', 'Superhrdinský film, který uzavírá ságu o Avengers a jejich boji proti Thanosovi.'),
(25, 1, 'Zločin a trest', 'Fyodor Dostoevsky', '2021-04-16', '430', 'Psychologický román o vině a vykoupení v Rusku 19. století.'),
(26, 2, 'The Beatles (White Album)', 'The Beatles', '2021-03-10', '93', 'Dvojalbum s širokou škálou hudebních stylů, které ukazuje rozmanitost kapely.'),
(27, 3, 'Klub rváčů', 'David Fincher', '2021-02-07', '139', 'Kultovní film, který zkoumá identitu, konzumerismus a společenské normy.'),
(28, 1, 'Obsluhoval jsem anglického krále', 'Bohumil Hrabal', '2021-01-20', '215', 'Román o malém českém chlapci, který se stává velkým podnikatelem.'),
(29, 2, 'Dark Side of the Moon', 'Pink Floyd', '2020-12-12', '43', 'Jedno z nejvlivnějších alb všech dob, spojující rock, jazz a klasiku.'),
(30, 3, 'Temný rytíř', 'Christopher Nolan', '2020-11-23', '152', 'Superhrdinský film, který redefinoval žánr, soustředí se na Jokerovu postavu.'),
(31, 1, 'Velký Gatsby', 'F. Scott Fitzgerald', '2020-10-29', '180', 'Román z období jazzového věku, zkoumá témata bohatství, lásky a amerického snu.'),
(32, 2, 'Sticky Fingers', 'The Rolling Stones', '2020-09-18', '45', 'Album známé svým bluesovým rockovým zvukem a ikonálním obalem s zipem.'),
(33, 3, 'Gladiátor', 'Ridley Scott', '2020-08-14', '155', 'Historické drama o zrazeném římském generálovi, který hledá pomstu.'),
(34, 1, 'Jsem vinen', 'Karel Čapek', '2020-07-01', '310', 'Psychologické drama o člověku, který se cítí vinný z vlastního života.'),
(35, 2, 'Rumours', 'Fleetwood Mac', '2020-06-21', '39', 'Klasické album, které zachycuje emocionální rozpad a kreativitu kapely.'),
(36, 3, 'Kmotr II', 'Francis Ford Coppola', '2020-05-12', '202', 'Pokračování mafiánské ságy, která se zaměřuje na moc a zrazení.'),
(37, 1, 'Ullysses', 'James Joyce', '2020-04-15', '730', 'Modernistický román sledující jeden den v životě Leopolda Blooma v Dublinu.'),
(38, 2, 'Abbey Road', 'The Beatles', '2020-03-10', '47', 'Klasické album, které spojuje rock, pop a klasiku.'),
(39, 3, 'Star Wars: Nová naděje', 'George Lucas', '2020-02-25', '121', 'Přelomový sci-fi film, který odstartoval legendární franšízu Star Wars.'),
(40, 1, 'Don Quijote', 'Miguel de Cervantes', '2020-01-05', '940', 'Román o bláznivém rytíři, který prožívá dobrodružství napříč Španělskem.'),
(41, 2, 'Joshua Tree', 'U2', '2019-12-20', '50', 'Album, které zachycuje pracovní třídu a aspirace amerického srdce.'),
(42, 3, 'Matrix Reloaded', 'Lilly a Lana Wachowski', '2019-11-17', '138', 'Druhý díl trilogie Matrix, pokračující v boji proti strojům.'),
(43, 1, 'Frankenstein', 'Mary Shelley', '2019-10-25', '280', 'Gothický román o vytvoření monstra a jeho následcích.'),
(44, 2, 'Born to Run', 'Bruce Springsteen', '2019-09-18', '44', 'Album, které zachycuje životní příběh a aspirace obyčejného člověka.'),
(45, 2, 'From Zero', 'Linkin Park', '2024-11-16', '31:54', 'Osmé studiové album americké rockové skupiny Linkin Park.'),
(50, 2, 'Meteora', 'Linkin Park', '2022-07-13', '36:35', 'Druhé studiové album americké nu metalové skupiny Linkin Park a bylo vydáno 25. března 2003.');

-- --------------------------------------------------------

--
-- Struktura tabulky `nosic`
--

CREATE TABLE `nosic` (
  `nosic_id` int(6) NOT NULL,
  `nazev_nosice` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Vypisuji data pro tabulku `nosic`
--

INSERT INTO `nosic` (`nosic_id`, `nazev_nosice`) VALUES
(1, 'Kniha'),
(2, 'CD'),
(3, 'DVD');

-- --------------------------------------------------------

--
-- Struktura tabulky `pujcujici`
--

CREATE TABLE `pujcujici` (
  `pujcujici_id` int(11) NOT NULL,
  `prezdivka` varchar(50) NOT NULL,
  `jmeno` varchar(50) NOT NULL,
  `prijmeni` varchar(50) NOT NULL,
  `telefon` int(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Vypisuji data pro tabulku `pujcujici`
--

INSERT INTO `pujcujici` (`pujcujici_id`, `prezdivka`, `jmeno`, `prijmeni`, `telefon`, `email`) VALUES
(1, 'kreativec01', 'Jan', 'Novák', 602123456, 'jan.novak@email.cz'),
(2, 'fotograf_98', 'Petra', 'Svobodová', 603654321, 'petra.svobodova@email.cz'),
(3, 'milos123', 'Miloslav', 'Dvořák', 604987654, 'milos.dvorak@email.cz'),
(4, 'lucy_happy', 'Lucie', 'Kovářová', 605876543, 'lucie.kovarova@email.cz'),
(5, 'simona_89', 'Simona', 'Horáková', 606345678, 'simona.horakova@email.cz'),
(6, 'tommy_007', 'Tomáš', 'Bartoš', 607234567, 'tomas.bartos@email.cz'),
(7, 'andrea.queen', 'Andrea', 'Pavlíková', 608123456, 'andrea.pavlikova@email.cz'),
(8, 'marek.zrout', 'Marek', 'Černý', 609876543, 'marek.cerny@email.cz'),
(9, 'jana_fox', 'Jana', 'Malá', 601234567, 'jana.mala@email.cz'),
(10, 'radek_king', 'Radek', 'Novotný', 602987654, 'radek.novotny@email.cz');

-- --------------------------------------------------------

--
-- Struktura tabulky `stav`
--

CREATE TABLE `stav` (
  `stav_id` int(11) NOT NULL,
  `nazev_stavu` varchar(20) NOT NULL,
  `popis_stavu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Vypisuji data pro tabulku `stav`
--

INSERT INTO `stav` (`stav_id`, `nazev_stavu`, `popis_stavu`) VALUES
(1, 'Půjčeno', 'Dílo je aktuálně půjčeno'),
(2, 'Uzavřeno', 'Vypůjčka byla vrácena a archivovaná.'),
(3, 'V knihovně', 'Dílo se aktuálně nachází v knihovně a není půjčené');

-- --------------------------------------------------------

--
-- Struktura tabulky `vypujcka`
--

CREATE TABLE `vypujcka` (
  `vypujcka_id` int(6) NOT NULL,
  `dilo_id` int(6) NOT NULL,
  `pujcujici_id` int(6) NOT NULL,
  `stav_id` int(6) NOT NULL,
  `dat_zapujceni` date NOT NULL,
  `dat_vraceni_plan` date NOT NULL,
  `dat_vraceni` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Vypisuji data pro tabulku `vypujcka`
--

INSERT INTO `vypujcka` (`vypujcka_id`, `dilo_id`, `pujcujici_id`, `stav_id`, `dat_zapujceni`, `dat_vraceni_plan`, `dat_vraceni`) VALUES
(1, 3, 1, 2, '2025-04-04', '2025-05-05', '2025-05-07'),
(2, 1, 4, 1, '2025-05-06', '2025-05-13', NULL),
(3, 45, 6, 1, '2025-05-03', '2025-05-10', NULL),
(4, 6, 9, 1, '2025-05-06', '2025-05-13', NULL);

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `dilo`
--
ALTER TABLE `dilo`
  ADD PRIMARY KEY (`dilo_id`);

--
-- Indexy pro tabulku `nosic`
--
ALTER TABLE `nosic`
  ADD PRIMARY KEY (`nosic_id`);

--
-- Indexy pro tabulku `pujcujici`
--
ALTER TABLE `pujcujici`
  ADD PRIMARY KEY (`pujcujici_id`);

--
-- Indexy pro tabulku `stav`
--
ALTER TABLE `stav`
  ADD PRIMARY KEY (`stav_id`);

--
-- Indexy pro tabulku `vypujcka`
--
ALTER TABLE `vypujcka`
  ADD PRIMARY KEY (`vypujcka_id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `dilo`
--
ALTER TABLE `dilo`
  MODIFY `dilo_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pro tabulku `nosic`
--
ALTER TABLE `nosic`
  MODIFY `nosic_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pro tabulku `pujcujici`
--
ALTER TABLE `pujcujici`
  MODIFY `pujcujici_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pro tabulku `stav`
--
ALTER TABLE `stav`
  MODIFY `stav_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pro tabulku `vypujcka`
--
ALTER TABLE `vypujcka`
  MODIFY `vypujcka_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
