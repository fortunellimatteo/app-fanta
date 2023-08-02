package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoginRepository extends CrudRepository<Login, String>{
	
	@Query("SELECT new com.example.demo.Login(l.username, l.password) FROM Login l WHERE l.username = :username AND l.password = :password")
	Login getLogin(String username,String password);
}
