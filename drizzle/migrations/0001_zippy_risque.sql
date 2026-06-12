CREATE TABLE `leads` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('proprietario','empresario') NOT NULL,
	`phone` varchar(20),
	`email` varchar(255),
	`city` varchar(100),
	`observations` text,
	`status` enum('novo','andamento','convertido','arquivado') DEFAULT 'novo',
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text,
	`type` varchar(50),
	`read` int DEFAULT 0,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `platform_logs` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36),
	`action` varchar(100) NOT NULL,
	`details` text,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `platform_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`segment` varchar(100),
	`required_value` int,
	`captured_value` int DEFAULT 0,
	`deadline` varchar(100),
	`description` text,
	`status` enum('planejamento','captacao','execucao','concluido') DEFAULT 'planejamento',
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`matricula` varchar(50) NOT NULL,
	`city` varchar(100) NOT NULL,
	`state` varchar(2) NOT NULL,
	`area` int,
	`value` int,
	`description` text,
	`status` enum('disponivel','negociacao','comercializado') DEFAULT 'disponivel',
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
