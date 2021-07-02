-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-07-2021 a las 15:21:36
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `workchat_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participants`
--

CREATE TABLE `participants` (
  `id` int(11) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL,
  `roomId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relations`
--

CREATE TABLE `relations` (
  `id` int(11) NOT NULL,
  `user_a` varchar(50) NOT NULL,
  `user_b` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `relations`
--

INSERT INTO `relations` (`id`, `user_a`, `user_b`, `status`) VALUES
(1, '1002495808', '1002495101', 'connected');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `ownerId` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rooms`
--

INSERT INTO `rooms` (`id`, `title`, `description`, `ownerId`) VALUES
(1, 'TESTING ROOM', 'ROOM FOR MEETING ABOUT TEST OF PROYECT', '1002495808'),
(2, 'DEVELOPER ROOM', 'ROOM FOR MEETING ABOUT DEVELOP OF PROYECTS', '1002495808');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastName`, `email`, `password`) VALUES
('1002495101', 'ZHOAR ALBERTO', 'DE LA ROSA SAMPAYO', 'zhoar@gmail.com', 'clave123'),
('1002495102', 'NAASON MANUEL', 'DE LA ROSA SAMPAYO', 'naason@gmail.com', 'clave123'),
('1002495103', 'ANAMARIA', 'DE LA ROSA SAMPAYO', 'anamaria@gmail.com', 'clave123'),
('1002495104', 'MAGALIS VICTORIA', 'SAMPAYO CAMARGO', 'magalis@gmail.com', 'clave123'),
('1002495105', 'JULIO MANUEL', 'DE LA ROSA TOVAR', 'julio@gmail.com', 'clave123'),
('1002495201', 'CARLOS RAFAEL', 'TORRES GUTIERREZ', 'carlos@gmail.com', 'clave123'),
('1002495202', 'JUAN', 'PIÑA MURILLO', 'juan@gmail.com', 'clave123'),
('1002495203', 'PEDRO', 'DUQUE SANTOS', 'pedro@gmail.com', 'clave123'),
('1002495204', 'FELIPE JACOBO', 'URIBE BLANCO', 'felipe@gmail.com', 'clave123'),
('1002495205', 'JAVIER ADOLFO', 'CORDOBA HUESO', 'javier@gmail.com', 'clave123'),
('1002495808', 'ASAEL ENRIQUE', 'DE LA ROSA SAMPAYO', 'asaelrs20@gmail.com', 'clave123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_participant` (`userId`),
  ADD KEY `fk_room_participant` (`roomId`);

--
-- Indices de la tabla `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_relation_a` (`user_a`),
  ADD KEY `fk_user_relation_b` (`user_b`);

--
-- Indices de la tabla `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_owner_room` (`ownerId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `relations`
--
ALTER TABLE `relations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `fk_room_participant` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`),
  ADD CONSTRAINT `fk_user_participant` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `relations`
--
ALTER TABLE `relations`
  ADD CONSTRAINT `fk_user_relation_a` FOREIGN KEY (`user_a`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_user_relation_b` FOREIGN KEY (`user_b`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fk_user_owner_room` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
