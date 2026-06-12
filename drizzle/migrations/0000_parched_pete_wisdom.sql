CREATE TABLE `empresarios` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36) NOT NULL,
	`nome_projeto` varchar(255) NOT NULL,
	`caracteristicas` text,
	`valor_necessario` int,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `empresarios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parceiros` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36) NOT NULL,
	`carteira_projetos` int DEFAULT 0,
	`clientes_captados` int DEFAULT 0,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `parceiros_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `proprietarios` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36) NOT NULL,
	`matricula` varchar(50) NOT NULL,
	`valor_sugerido` int,
	`descricao_imovel` text,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `proprietarios_id` PRIMARY KEY(`id`),
	CONSTRAINT `proprietarios_matricula_unique` UNIQUE(`matricula`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_id` varchar(36) NOT NULL,
	`token` text NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`email` varchar(255) NOT NULL,
	`phone` varchar(20),
	`password` varchar(255) NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100),
	`profession` varchar(100),
	`user_type` enum('parceiro','proprietario','empresario') NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
