package com.example.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class LoginController {
	private final LoginRepository loginRepos;

	LoginController(LoginRepository repository) {
		this.loginRepos = repository;
	}

	@GetMapping({"/login/{username}/{password}"})
	Login getLogin(@PathVariable String username, @PathVariable String password) {
		try {
			return this.loginRepos.getLogin(username, password);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
}
