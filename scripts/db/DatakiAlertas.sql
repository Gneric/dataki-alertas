CREATE TABLE `events` (
  `event_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `type` int,
  `trigger` int,
  `recipients` int,
  `data_package` int,
  `creator` int,
  `created_At` datetime,
  `updated_At` datetime
);

CREATE TABLE `types` (
  `types_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `triggers` (
  `trigger_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `condition` int
);

CREATE TABLE `conditions` (
  `conditions_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `doMonth` int,
  `doWeek` int,
  `hour` int,
  `minute` int,
  `second` int
);

CREATE TABLE `mediums` (
  `medium_id` int PRIMARY KEY AUTO_INCREMENT,
  `event_id` int,
  `descripcion` varchar(255),
  `format` int
);

CREATE TABLE `blocks` (
  `block_id` int PRIMARY KEY AUTO_INCREMENT,
  `block_name` varchar(100),
  `package_id` int,
  `block_query` varchar(max)
);

CREATE TABLE `block_tables` (
  `block_tables_id` int PRIMARY KEY AUTO_INCREMENT,
  `table_id` int,
  `block_id` int
);

CREATE TABLE `block_attr` (
  `block_attr_id` int PRIMARY KEY AUTO_INCREMENT,
  `block_id` int,
  `tbl_attr_id` int
);

CREATE TABLE `block_calculations` (
  `block_calc_id` int PRIMARY KEY AUTO_INCREMENT,
  `block_id` int,
  `calc_id` int
);

CREATE TABLE `tables` (
  `table_id` int PRIMARY KEY AUTO_INCREMENT,
  `table_name` varchar(200)
);

CREATE TABLE `tbl_attr` (
  `table_attr_id` int PRIMARY KEY AUTO_INCREMENT,
  `table_id` int,
  `table_attr_name` varchar(100),
  `table_attr_type` varchar(30)
);

CREATE TABLE `calculations` (
  `calc_id` int PRIMARY KEY AUTO_INCREMENT,
  `calc_query` varchar(100)
);

CREATE TABLE `formats` (
  `format_id` int PRIMARY KEY AUTO_INCREMENT,
  `format` varchar(255)
);

CREATE TABLE `packages` (
  `package_id` int PRIMARY KEY AUTO_INCREMENT,
  `package_data` json
);

ALTER TABLE `events` ADD FOREIGN KEY (`type`) REFERENCES `types` (`types_id`);
ALTER TABLE `events` ADD FOREIGN KEY (`trigger`) REFERENCES `triggers` (`trigger_id`);
ALTER TABLE `events` ADD FOREIGN KEY (`data_package`) REFERENCES `packages` (`package_id`);
ALTER TABLE `triggers` ADD FOREIGN KEY (`condition`) REFERENCES `conditions` (`conditions_id`);
ALTER TABLE `mediums` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`);
ALTER TABLE `mediums` ADD FOREIGN KEY (`format`) REFERENCES `formats` (`format_id`);
ALTER TABLE `blocks` ADD FOREIGN KEY (`package_id`) REFERENCES `packages` (`package_id`);
ALTER TABLE `block_tables` ADD FOREIGN KEY (`table_id`) REFERENCES `tables` (`table_id`);
ALTER TABLE `block_tables` ADD FOREIGN KEY (`block_id`) REFERENCES `blocks` (`block_id`);
ALTER TABLE `block_attr` ADD FOREIGN KEY (`block_id`) REFERENCES `blocks` (`block_id`);
ALTER TABLE `block_attr` ADD FOREIGN KEY (`tbl_attr_id`) REFERENCES `tbl_attr` (`table_attr_id`);
ALTER TABLE `block_calculations` ADD FOREIGN KEY (`block_id`) REFERENCES `blocks` (`block_id`);
ALTER TABLE `block_calculations` ADD FOREIGN KEY (`calc_id`) REFERENCES `calculations` (`calc_id`);
ALTER TABLE `tbl_attr` ADD FOREIGN KEY (`table_id`) REFERENCES `tables` (`table_id`);
