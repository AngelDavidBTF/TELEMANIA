-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.19-log - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para telemania
CREATE DATABASE IF NOT EXISTS `telemania` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `telemania`;

-- Volcando estructura para tabla telemania.agenciaenvio
CREATE TABLE IF NOT EXISTS `agenciaenvio` (
  `idFactAgenciaEnv` int(11) NOT NULL,
  `idAgenciaEnvio` int(11) DEFAULT NULL,
  `dniFactAgenciaEnvio` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idFactAgenciaEnv`),
  KEY `Relacion Agencia - AgenciaEnvio` (`idAgenciaEnvio`),
  CONSTRAINT `Relacion Agencia - AgenciaEnvio` FOREIGN KEY (`idAgenciaEnvio`) REFERENCES `agencias` (`idAgencia`),
  CONSTRAINT `Relacion Factura - AgenciaEnvio` FOREIGN KEY (`idFactAgenciaEnv`) REFERENCES `factura` (`idFactura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla telemania.agenciaenvio: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `agenciaenvio` DISABLE KEYS */;
/*!40000 ALTER TABLE `agenciaenvio` ENABLE KEYS */;

-- Volcando estructura para tabla telemania.agencias
CREATE TABLE IF NOT EXISTS `agencias` (
  `idAgencia` int(11) NOT NULL AUTO_INCREMENT,
  `nombreAgencia` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idAgencia`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla telemania.agencias: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `agencias` DISABLE KEYS */;
INSERT INTO `agencias` (`idAgencia`, `nombreAgencia`) VALUES
	(1, 'Nacex'),
	(2, 'Seur'),
	(3, 'Correos');
/*!40000 ALTER TABLE `agencias` ENABLE KEYS */;

-- Volcando estructura para tabla telemania.almacen
CREATE TABLE IF NOT EXISTS `almacen` (
  `idArtAlmacen` int(11) NOT NULL AUTO_INCREMENT,
  `stockArtAlmacen` int(11) DEFAULT NULL,
  `precioArtAlmacen` double DEFAULT NULL,
  PRIMARY KEY (`idArtAlmacen`),
  CONSTRAINT `Relacion Articulo - Almacen` FOREIGN KEY (`idArtAlmacen`) REFERENCES `articulos` (`idArticulo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla telemania.almacen: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `almacen` DISABLE KEYS */;
INSERT INTO `almacen` (`idArtAlmacen`, `stockArtAlmacen`, `precioArtAlmacen`) VALUES
	(1, 15, 400.95),
	(2, 8, 599),
	(3, 7, 339.95),
	(4, 5, 114),
	(7, 4, 559),
	(8, 12, 669),
	(9, 6, 100),
	(10, 5, 214),
	(11, 6, 89.5),
	(12, 8, 120.5);
/*!40000 ALTER TABLE `almacen` ENABLE KEYS */;

-- Volcando estructura para tabla telemania.articulos
CREATE TABLE IF NOT EXISTS `articulos` (
  `idArticulo` int(11) NOT NULL AUTO_INCREMENT,
  `idCatArticulo` int(11) NOT NULL,
  `denomArticulo` varchar(100) DEFAULT NULL,
  `descripcionArticulo` text,
  `descripcionLarga` text,
  `pulgadas` varchar(50) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `resolucion` varchar(50) DEFAULT NULL,
  `tipoPanel` varchar(50) DEFAULT NULL,
  `SmartTV` varchar(50) DEFAULT NULL,
  `fotoArticulo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idArticulo`),
  KEY `Relacion Categoria - Articulo` (`idCatArticulo`),
  CONSTRAINT `Relacion Categoria - Articulo` FOREIGN KEY (`idCatArticulo`) REFERENCES `categorias` (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla telemania.articulos: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
INSERT INTO `articulos` (`idArticulo`, `idCatArticulo`, `denomArticulo`, `descripcionArticulo`, `descripcionLarga`, `pulgadas`, `marca`, `resolucion`, `tipoPanel`, `SmartTV`, `fotoArticulo`) VALUES
	(1, 1, 'Televisor LG 43LJ500V 43" Full HD Negro LED TV', 'CARACTERISTICAS GENERALES\r\nDefinición (HD): Full HD\r\nPulgadas: 43\r\nColor: Negro\r\n', 'Un televisor completo con muchísimas prestaciones y tecnologías de imagen de calidad, así es el 43LJ500V de LG. Disfruta de 43 pulgadas de calidad de imagen Full HD, con una nitidez tan elevada que parece que mires por una ventana. Acomódate en el sofá, prepara unas palomitas y… ¡silencio, empieza la película! La resolución de imagen de 1920 x 1080 consigue un color y unas imágenes más detallas y brillantes. El panel con resolución Full HD hará que vibres en tu sofá con las escenas de acción.', '43', 'LG', 'Full HD', 'LED', 'NO', 'img/TelevisorLG.jpg'),
	(2, 1, 'SAMSUNG 50MU6172 Smart TV LED WIFI Ultra HD 4K HDR', 'Distribución: Europa\r\nColor: Negro\r\nPeso (gr) 12.200\r\n\r\n', 'Ahora podrás disfrutar de tus películas favoritas con el televisor Samsung UE50MU6192 de 50 pulgadas y resolución 4K de alta definición. Además incorpora smart TV.\r\nEl televisor Samsung UE50MU6192 negro de 50 pulgadas, resolución de 3840 x 2160 4K Ultra HD, Smart TV, formato 16:9, formatos de señal digital DVB-C, DVB-S2 y DVB-T2, wifi, conexión LAN ethernet te permitirá ver tus series, programas y películas favoritos siempre que quieras. Electrocosto tiene la solución que necesitas.', '50', 'Samsung', '4K', 'LED', 'SI', 'img/TelevisorSamsung.jpg'),
	(3, 2, 'Dell UltraSharp U2415 - Monitor de 24.1" (6 ms, 300 cd/m², 3.5 mm) ', 'Marca: Dell\r\nSeries: U2415\r\nNúmero de modelo del producto: U2415\r\n\r\n', 'Especificaciones técnicas\r\n- El monitor es de 24" (61,1 cm de imagen visible) \r\n- La panorámica es de 16:10\r\n- El tipo de pantalla es In Plane Switching: brillante y con una opacidad baja alcanza los 3H\r\n- La resolución del monitor FHD: 1920 x 1200 \r\n- Contraste de 1000:1 \r\n- El brillo es de 300 cd/m2\r\n- El tiempo de respuesta es de 6ms\r\n- Tiene un ángulo de visión de 178º\r\n- Se puede ajustar la inclinación \r\n- La separación entre píxeles es de 0,27mm \r\n- Retroiluminación LED \r\n', '24', 'Dell', 'Full HD', 'LCD', 'NO', 'img/MonitorDell.jpg'),
	(4, 2, 'Monitor Gaming Keep-Out Xgm22 21,5\'\'', 'Especificaciones Keep Out XGM32:\r\nÁngulo de visión 178°\r\nBrillo 250 cd / m²  \r\nContraste: 1000:1 ', 'Ángulo de visión 178°\r\n\r\n· Brillo 250 cd / m²\r\n\r\n· Contraste: 1000:1\r\n\r\n· Formato 16:9\r\n\r\n· Pantalla de 21.5?\r\n\r\n· Resolución 1920 × 1080 Pixeles\r\n\r\n· Tiempo de respuesta 5 ms\r\n\r\n· Colores: 16.7M\r\n\r\n· Calidad de imagen Full HD\r\n\r\n· Conexiones HDMI, DVI, VGA y Audio Jack 3.5mm\r\n\r\n· VESA 75mm dos agujeros\r\n\r\n· Dos Altavoces traseros de 3W\r\n\r\n· Dimensiones con base: 489否.3*288mm', '21', 'Keep-Out', '4K', 'LED', 'NO', 'img/MonitorKeppOut.jpg'),
	(7, 1, 'LG 43UJ620V 43" LED UltraHD 4K', 'Resolución:4K UHD\r\nTamaño en cm (cm):108 cm\r\nTecnología de frecuencia:1500Hz PMI\r\n', 'Diagonal de la pantalla: 109,2 cm (43")\r\nTipo HD: 4K Ultra HD\r\n3D: No\r\nResolución de la pantalla: 3840 x 2160 Pixeles\r\nTecnología de visualización: LED\r\nRelación de aspecto: 16:9\r\nFormatos gráficos soportados: 3840 x 2160\r\nAudio\r\nAltavoces incorporados: Si\r\nNúmero de altavoces: 2\r\nPotencia estimada RMS: 20 W\r\nDecodificadores incorporados: DTS\r\nPuertos e Interfaces\r\nNúmero de puertos HDMI: 3\r\nPC (D-Sub): No\r\nPuerto DVI: No\r\nEthernet LAN (RJ-45) cantidad de puertos: 1\r\nCantidad de puertos USB 2.0: 2\r\nVideo componente (YPbPr/YCbCr) entrada: 1\r\nInterfaz común: Si\r\nEnlace de alta definición móvil (MHL): Si\r\nAudio digital, salida optica: 1\r\nWireless Display de Intel® (Intel® WiDi): Si\r\nPeso y dimensiones\r\nAncho: 975 mm\r\nProfundidad: 95,9 mm\r\nAltura: 576 mm\r\nPeso: 9,5 kg\r\nAncho del dispositivo (con soporte): 975 mm\r\nProfundidad dispositivo (con soporte): 241,4 mm\r\nAltura del dispositivo (con soporte): 634 mm\r\n\r\n', '43', 'LG', '4K', 'LED', 'SI', 'img/TelevisorLG2.jpg'),
	(8, 1, 'TV 55" LG 55UJ620V LED Ultra HD 4k SmartTV', '- Resolución de la pantalla: 3840 x 2160 Pixeles\r\n- Tipo HD: 4K Ultra HD\r\n- Forma de la pantalla: Plana.', 'Diagonal de la pantalla: 139,7 cm (55")\r\nTipo HD: 4K Ultra HD\r\n3D: No\r\nResolución de la pantalla: 3840 x 2160 Pixeles\r\nTecnología de visualización: LED\r\nTecnología de interpolación de movimiento: TruMotion\r\nForma de la pantalla: Plana\r\nFormato de pantalla, ajustes: Acercar\r\nTipo de retroiluminación LED: Direct-LED\r\nFrecuencia de interpolación de movimiento: 50 Hz\r\nDiagonal de pantalla: 139 cm\r\nAudio\r\nAltavoces incorporados: Si\r\nNúmero de altavoces: 2\r\nPotencia estimada RMS: 40 W\r\nDecodificadores incorporados: DTS\r\nPuertos e Interfaces\r\nNúmero de puertos HDMI: 3\r\nEthernet LAN (RJ-45) cantidad de puertos: 1\r\nCantidad de puertos USB 2.0: 2\r\nVideo componente (YPbPr/YCbCr) entrada: 1\r\nVersión HDMI: 2.0\r\nAudio digital, salida optica: 1\r\nWireless Display de Intel® (Intel® WiDi): Si\r\n', '55', 'LG', '4K', 'LED', 'SI', 'img/TelevisorLG3.jpg'),
	(9, 2, 'Acer V196HQLAb 18.5" LED', 'El monitor Acer V196, EcoDisplay, es de alta calidad con la tecnología TN, un rendimiento de imagen excelente', 'Diagonal de la pantalla: 47 cm (18.5")\r\nBrillo de pantalla: 200 cd / m²\r\nResolución de la pantalla: 1366 x 768 Pixeles\r\nTiempo de respuesta: 5 ms\r\nPantalla: LED\r\nTipo HD: HD\r\nTecnología de visualización: TN+Film\r\nFormatos gráficos soportados: 1366 x 768\r\nÁngulo de visión, horizontal: 90°\r\nÁngulo de visión, vertical: 65°\r\nNúmero de colores de la pantalla: 16,78 millones de colores\r\nRelación de aspecto nativa: 16:9\r\n3D: No\r\nRelación de contraste (dinámico): 100000000:1\r\nRelación de aspecto: 16:9\r\nDiagonal de pantalla: 47 cm\r\nMáxima velocidad de actualización: 60 Hz\r\nPuertos e Interfaces\r\nCantidad de puertos VGA (D-Sub): 1\r\nPeso y dimensiones\r\nAncho: 447 mm\r\nProfundidad: 191 mm\r\nAltura: 353,1 mm\r\nPeso: 2,32 kg\r\nPeso con stand: 2,72 kg\r\n', '18', 'Acer', 'Full HD', 'LCD', 'NO', 'img/MonitorAcer.jpg'),
	(10, 2, 'MONITOR HP 24" ULTRAFINA', 'Pantalla sin borde\r\nSin bisel que rodee la pantalla, una experiencia de visualización ultra amplia que permite la instalación de varios monitores sin problemas.', 'Comparte la vista panorámica\r\nDetalles vibrantes desde prácticamente cualquier posición con color uniforme y claridad de imagen a lo largo de los ángulos de visión verticales y horizontales de 178º ultra anchos.\r\nPantalla Full HD/pantalla de 1080p\r\nPrepárate para elementos visuales brillantes e imágenes nítidas con la calidad inolvidable de esta impresionante pantalla FHD.\r\nEfectos visuales mejorados\r\nLa resolución HP Enhance + mejora la calidad de imagen con reducción de ruido avanzada para obtener imágenes más nítidas y claras. Al reducir la sobreexposición, este filtro de ruido avanzado amplifica tus imágenes para ofrecer fotos, vídeos y juegos más nítidos.\r\nConfiguración OSD del control del usuario\r\n', '24', 'HP', '4K', 'LED', 'NO', 'img/MonitorHP.jpg'),
	(11, 2, 'Samsung S22F350FHU', 'Te presentamos el monitor S22F350FHU de 22" de Samsung. Un monitor Full HD de tan sólo 10mm de grosor, "Modo Juego" para disfrutar de una experiencia gaming única', 'Diagonal de la pantalla: 55,9 cm (22")\r\nBrillo de pantalla: 200 cd / m²\r\nResolución de la pantalla: 1920 x 1080 Pixeles\r\nTiempo de respuesta: 5 ms\r\nPantalla: LED\r\nTipo HD: Full HD\r\nTecnología de visualización: TN\r\nFormatos gráficos soportados: 1920 x 1080 (HD 1080)\r\nRazón de contraste (típica): 1000:1\r\nNombre comercial de la relación de contraste dinámico: Mega Contrast\r\nÁngulo de visión, horizontal: 170°\r\nÁngulo de visión, vertical: 160°\r\nNúmero de colores de la pantalla: 16,78 millones de colores\r\nRelación de aspecto nativa: 16:9\r\n3D: No\r\nTamaño visible, horizontal: 47,7 cm\r\nTamaño visible, vertical: 26,8 cm\r\nMáxima velocidad de actualización: 60 Hz\r\nGama de colores: 72%\r\nForma de la pantalla: Plana\r\nBrillo de la pantalla (mín.): 150 cd / m²\r\nPuertos e Interfaces\r\nConector USB incorporado: No\r\nCantidad de puertos VGA (D-Sub): 1\r\nPuerto DVI: No\r\nNúmero de puertos HDMI: 1\r\nEntrada de audio: No\r\n\r\n\r\n\r\n', '22', 'Samsung', 'Full HD', 'LED', 'NO', 'img/MonitorSamsumng.jpg'),
	(12, 1, 'TV LED 32" - Thomson 32HB5426, HD', '¡Prepara unas palomitas y que empiece la película! Disfruta del cine y de tus series favoritas con el TV LED 32" Thomson 32HB5426. El panel con resolución HD hará que vibres en tu sofá con las escenas de acción.', 'Imágenes muy reales\r\nLas imágenes reales de la televisión son producto de la alta resolución y la combinación de un procesador Quad Core. No te sobresaltes con las escenas. Además, integra para el procesamiento de la imagen la tecnología Pure Image Ultra que logra gran nitidez, detallismo y brillo en los colores.\r\n\r\nSolo tu televisor, no necesitas más\r\nNo necesitarás instalar una barra de sonido ni altavoces externos para lograr un audio potente con la TV LED 32" Thomson 32HB5426; los altavoces integrados en la tele son más que suficiente. Sube el volumen bien alto, ya verás que bien suena. La tecnología de sonido Dolby Digital Plus consigue un efecto envolvente y muy definido.\r\n\r\nTu ventana al mundo\r\nConecta tu televisor a tu red doméstica vía WiFi o por cable y disfruta de un sinfín de posibilidades que te ofrece internet. Asimismo, podrás conectar tu tablet o Smartphone al TV LED 32" Thomson 32HB5426 y reproducir el contenido en este.', '32', 'Thomson', 'HD', 'LCD', 'SI', 'img/TVthomson.png');
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;

-- Volcando estructura para tabla telemania.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `denomCategoria` varchar(50) NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla telemania.categorias: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` (`idCategoria`, `denomCategoria`) VALUES
	(1, 'TV'),
	(2, 'Monitor');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;

-- Volcando estructura para tabla telemania.detfactura
CREATE TABLE IF NOT EXISTS `detfactura` (
  `idDetFact` int(11) NOT NULL AUTO_INCREMENT,
  `idFactDetalle` int(11) NOT NULL,
  `idArtDetalle` int(11) NOT NULL,
  `precioDetalle` double NOT NULL,
  `uniDetalle` int(11) NOT NULL,
  PRIMARY KEY (`idDetFact`),
  UNIQUE KEY `idArtDetalle` (`idArtDetalle`,`idFactDetalle`),
  KEY `Relacion Factura - Detalle` (`idFactDetalle`),
  CONSTRAINT `Relacion Articulo -Detalle` FOREIGN KEY (`idArtDetalle`) REFERENCES `articulos` (`idArticulo`),
  CONSTRAINT `Relacion Factura - Detalle` FOREIGN KEY (`idFactDetalle`) REFERENCES `factura` (`idFactura`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla telemania.detfactura: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `detfactura` DISABLE KEYS */;
/*!40000 ALTER TABLE `detfactura` ENABLE KEYS */;

-- Volcando estructura para tabla telemania.factura
CREATE TABLE IF NOT EXISTS `factura` (
  `idFactura` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuFactura` int(11) NOT NULL,
  `fechFactura` date NOT NULL,
  `formEnvioFact` enum('0','1','2') NOT NULL,
  PRIMARY KEY (`idFactura`),
  KEY `Relacion Usuario - Factura` (`idUsuFactura`),
  CONSTRAINT `Relacion Usuario - Factura` FOREIGN KEY (`idUsuFactura`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla telemania.factura: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;

-- Volcando estructura para tabla telemania.otrosenvio
CREATE TABLE IF NOT EXISTS `otrosenvio` (
  `idFactEnvio` int(11) NOT NULL,
  `dirFactEnvio` varchar(50) NOT NULL,
  PRIMARY KEY (`idFactEnvio`),
  CONSTRAINT `Relacion Factura -Envio` FOREIGN KEY (`idFactEnvio`) REFERENCES `factura` (`idFactura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla telemania.otrosenvio: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `otrosenvio` DISABLE KEYS */;
/*!40000 ALTER TABLE `otrosenvio` ENABLE KEYS */;

-- Volcando estructura para tabla telemania.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `DNI` varchar(9) NOT NULL,
  `nombreUsuario` varchar(50) NOT NULL,
  `claveUsuario` blob NOT NULL,
  `correoUsuario` varchar(50) DEFAULT NULL,
  `direccionUsuario` varchar(50) DEFAULT NULL,
  `poblacionUsuario` varchar(50) DEFAULT NULL,
  `ciudadUsuario` varchar(50) DEFAULT NULL,
  `paisUsuario` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `DNI` (`DNI`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla telemania.usuarios: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`idUsuario`, `DNI`, `nombreUsuario`, `claveUsuario`, `correoUsuario`, `direccionUsuario`, `poblacionUsuario`, `ciudadUsuario`, `paisUsuario`) VALUES
	(18, '78542155F', 'Pepe Habichuela', _binary 0x2F4831FA57D2229120D167B42D298A5F, 'pepito@gmail.com', 'Calle San Juan, 12', 'Lechina', 'Albacete', 'España'),
	(19, '49314652F', 'Angel David', _binary 0x2F4831FA57D2229120D167B42D298A5F, '4ngeeldavid@gmail.com', 'Calle Castilla Leon, 4', 'Munera', 'Albacete', 'España'),
	(20, '49313855S', 'Irina María Hernández Lorente', _binary 0xEEA3BEA8102E45F623DF0D938F35B4FF, 'irinamaria008@gmail.com', 'Calle San Mateo, 17 A', 'Munera ', 'Albecete', 'España');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
