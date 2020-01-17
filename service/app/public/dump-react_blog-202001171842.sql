-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: react_blog
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_user`
--

DROP TABLE IF EXISTS `admin_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_user`
--

LOCK TABLES `admin_user` WRITE;
/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `article_content` text NOT NULL,
  `introduce_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `view_count` int(11) DEFAULT '0',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,1,'React实战标题','# Dillinger\r\n\r\nDillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.\r\n\r\n  - Type some Markdown on the left\r\n  - See HTML in the right\r\n  - Magic\r\n\r\n# New Features!\r\n\r\n  - Import a HTML file and watch it magically convert to Markdown\r\n  - Drag and drop images (requires your Dropbox account be linked)\r\n\r\n\r\nYou can also:\r\n  - Import and save files from GitHub, Dropbox, Google Drive and One Drive\r\n  - Drag and drop markdown and HTML files into Dillinger\r\n  - Export documents as Markdown, HTML and PDF\r\n\r\nMarkdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]\r\n\r\n> The overriding design goal for Markdown\'s\r\n> formatting syntax is to make it as readable\r\n> as possible. The idea is that a\r\n> Markdown-formatted document should be\r\n> publishable as-is, as plain text, without\r\n> looking like it\'s been marked up with tags\r\n> or formatting instructions.\r\n\r\nThis text you see here is *actually* written in Markdown! To get a feel for Markdown\'s syntax, type some text into the left window and watch the results in the right.\r\n\r\n### Tech\r\n\r\nDillinger uses a number of open source projects to work properly:\r\n\r\n* [AngularJS] - HTML enhanced for web apps!\r\n* [Ace Editor] - awesome web-based text editor\r\n* [markdown-it] - Markdown parser done right. Fast and easy to extend.\r\n* [Twitter Bootstrap] - great UI boilerplate for modern web apps\r\n* [node.js] - evented I/O for the backend\r\n* [Express] - fast node.js network app framework [@tjholowaychuk]\r\n* [Gulp] - the streaming build system\r\n* [Breakdance](https://breakdance.github.io/breakdance/) - HTML to Markdown converter\r\n* [jQuery] - duh\r\n\r\nAnd of course Dillinger itself is open source with a [public repository][dill]\r\n on GitHub.\r\n\r\n### Installation\r\n\r\nDillinger requires [Node.js](https://nodejs.org/) v4+ to run.\r\n\r\nInstall the dependencies and devDependencies and start the server.\r\n\r\n```sh\r\n$ cd dillinger\r\n$ npm install -d\r\n$ node app\r\n```\r\n\r\nFor production environments...\r\n\r\n```sh\r\n$ npm install --production\r\n$ NODE_ENV=production node app\r\n```\r\n\r\n### Plugins\r\n\r\nDillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.\r\n\r\n| Plugin | README |\r\n| ------ | ------ |\r\n| Dropbox | [plugins/dropbox/README.md][PlDb] |\r\n| GitHub | [plugins/github/README.md][PlGh] |\r\n| Google Drive | [plugins/googledrive/README.md][PlGd] |\r\n| OneDrive | [plugins/onedrive/README.md][PlOd] |\r\n| Medium | [plugins/medium/README.md][PlMe] |\r\n| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |\r\n\r\n\r\n### Development\r\n\r\nWant to contribute? Great!\r\n\r\nDillinger uses Gulp + Webpack for fast developing.\r\nMake a change in your file and instantaneously see your updates!\r\n\r\nOpen your favorite Terminal and run these commands.\r\n\r\nFirst Tab:\r\n```sh\r\n$ node app\r\n```\r\n\r\nSecond Tab:\r\n```sh\r\n$ gulp watch\r\n```\r\n\r\n(optional) Third:\r\n```sh\r\n$ karma test\r\n```\r\n#### Building for source\r\nFor production release:\r\n```sh\r\n$ gulp build --prod\r\n```\r\nGenerating pre-built zip archives for distribution:\r\n```sh\r\n$ gulp build dist --prod\r\n```\r\n### Docker\r\nDillinger is very easy to install and deploy in a Docker container.\r\n\r\nBy default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.\r\n\r\n```sh\r\ncd dillinger\r\ndocker build -t joemccann/dillinger:${package.json.version} .\r\n```\r\nThis will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.\r\n\r\nOnce done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):\r\n\r\n```sh\r\ndocker run -d -p 8000:8080 --restart=\"always\" <youruser>/dillinger:${package.json.version}\r\n```\r\n\r\nVerify the deployment by navigating to your server address in your preferred browser.\r\n\r\n```sh\r\n127.0.0.1:8000\r\n```\r\n\r\n#### Kubernetes + Google Cloud\r\n\r\nSee [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)\r\n\r\n\r\n### Todos\r\n\r\n - Write MORE Tests\r\n - Add Night Mode\r\n\r\nLicense\r\n----\r\n\r\nMIT\r\n\r\n\r\n**Free Software, Hell Yeah!**\r\n\r\n[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn\'t be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)\r\n\r\n\r\n   [dill]: <https://github.com/joemccann/dillinger>\r\n   [git-repo-url]: <https://github.com/joemccann/dillinger.git>\r\n   [john gruber]: <http://daringfireball.net>\r\n   [df1]: <http://daringfireball.net/projects/markdown/>\r\n   [markdown-it]: <https://github.com/markdown-it/markdown-it>\r\n   [Ace Editor]: <http://ace.ajax.org>\r\n   [node.js]: <http://nodejs.org>\r\n   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>\r\n   [jQuery]: <http://jquery.com>\r\n   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>\r\n   [express]: <http://expressjs.com>\r\n   [AngularJS]: <http://angularjs.org>\r\n   [Gulp]: <http://gulpjs.com>\r\n\r\n   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>\r\n   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>\r\n   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>\r\n   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>\r\n   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>\r\n   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>','介绍',0,'2020-01-17 18:04:48','2020-01-17 18:04:48'),(2,2,'图片教程测试','***这是斜体加粗的文字***\\n\\n\\`console.log(111)\\` \\n\\n``` var a=11; ```','介绍内容',0,'2020-01-17 18:04:48','2020-01-17 18:04:48'),(3,1,'测试测试','***这是斜体加粗的文字***\\n\\n\\`console.log(111)\\` \\n\\n``` var a=11; ```','介绍',0,'2020-01-17 18:04:48','2020-01-17 18:04:48'),(4,2,'123123','# 测试标题','123123213',0,'2020-01-17 18:04:48','2020-01-17 18:10:41'),(5,1,'123','123123123','123123213',0,'2020-01-17 18:20:21','2020-01-17 18:21:02'),(6,1,'123','123123123222','123123213',0,'2020-01-17 18:20:21','2020-01-17 18:21:30'),(7,1,'123123','1231232223','12312312',0,'2020-01-17 18:22:07','2020-01-17 18:22:23'),(8,1,'123','213aa223123','123',0,'2020-01-17 18:27:03','2020-01-17 18:27:47'),(9,1,'2','2','2',2,'2020-01-17 18:41:06','2020-01-17 18:41:06');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `order_num` int(11) NOT NULL,
  `icon` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'图文教程',1,'message'),(2,'视频教程',2,'youtube'),(3,'分享',3,'smile');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'react_blog'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-17 18:42:36
