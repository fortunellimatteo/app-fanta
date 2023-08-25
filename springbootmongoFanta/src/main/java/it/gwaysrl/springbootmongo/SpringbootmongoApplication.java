package it.gwaysrl.springbootmongo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
//public class SpringbootmongoApplication implements CommandLineRunner{
public class SpringbootmongoApplication {


	public static void main(String[] args) {
		SpringApplication.run(SpringbootmongoApplication.class, args);
	}

}