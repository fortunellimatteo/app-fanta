package it.gwaysrl.springbootmongo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.gwaysrl.springbootmongo.model.Login;
import it.gwaysrl.springbootmongo.repository.LoginRepository;

@RestController
@RequestMapping("/api")
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
