-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Jun 2023 pada 07.29
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dokumen`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `documents`
--

CREATE TABLE `documents` (
  `document_id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `documents`
--

INSERT INTO `documents` (`document_id`, `user_id`, `name`, `filename`, `description`, `created_at`, `updated_at`) VALUES
('1f1cb2e3-ec36-4b6f-93b2-b6e753ddf8d8', '1808216e-050c-4b12-8e65-a460775bac2b', 'surat magang', '1687487348567-Surat Keterangang.pdf', 'multi polar', '2023-06-23 02:29:08', '2023-06-23 02:29:08'),
('f57f88a0-2699-4b2c-9de2-5d1676eed1d1', '5151bebf-6e51-41cc-86f8-e6793e1c48cd', 'Surat Pengajuan Magang', '1687336173781-Surat Keterangang.pdf', 'gilang', '2023-06-21 08:29:33', '2023-06-21 08:29:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `signature`
--

CREATE TABLE `signature` (
  `user_id` varchar(255) NOT NULL,
  `document_id` varchar(255) NOT NULL,
  `jabatan` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `signed_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `signature`
--

INSERT INTO `signature` (`user_id`, `document_id`, `jabatan`, `status`, `signed_at`, `created_at`, `updated_at`) VALUES
('1808216e-050c-4b12-8e65-a460775bac2b', 'f57f88a0-2699-4b2c-9de2-5d1676eed1d1', 'sad', 'ditolak', '2023-06-22 07:00:22', '2023-06-22 07:00:22', '2023-06-22 07:00:22'),
('5151bebf-6e51-41cc-86f8-e6793e1c48cd', '1f1cb2e3-ec36-4b6f-93b2-b6e753ddf8d8', 'asd', 'diajukan', '1999-12-31 17:00:00', '2023-06-23 03:51:21', '2023-06-23 03:51:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` int(11) NOT NULL,
  `sign_img` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `active`, `sign_img`, `created_at`, `updated_at`) VALUES
('1808216e-050c-4b12-8e65-a460775bac2b', 'user', 'user@gmail.com', '$2b$10$leLERUH.iTh4U7nYhBJseerI0UZpOvMebpKh/WFINVAZBM9XSZOiS', 1, '1687100333812-WhatsApp_icon.png', '2023-06-18 14:58:53', '2023-06-18 14:58:53'),
('5151bebf-6e51-41cc-86f8-e6793e1c48cd', 'gilang', 'gilang@gmail.com', '$2b$10$.tY.QitjE4/vyDwS.A3H1.ecpR5fc42CuN7CWTI43Z/YJSArq2Bxq', 1, '1687090821421-WhatsApp_icon.png', '2023-06-18 12:20:21', '2023-06-18 12:20:21'),
('b9dd3e95-b6e4-433a-b934-32e4489d430d', 'admin', 'admin@gmail.com', '$2b$10$oV8j.vd69eveChfytqJm5OkmFZMZn9frwtPp/W5NIG2wkloF6O6Ci', 1, '1687095122476-WhatsApp_icon.png', '2023-06-18 13:32:02', '2023-06-18 13:32:02');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `fk_document_user` (`user_id`);

--
-- Indeks untuk tabel `signature`
--
ALTER TABLE `signature`
  ADD PRIMARY KEY (`user_id`,`document_id`),
  ADD KEY `document_id` (`document_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `fk_document_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Ketidakleluasaan untuk tabel `signature`
--
ALTER TABLE `signature`
  ADD CONSTRAINT `signature_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `signature_ibfk_2` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
