package com.careerpath.backend.controller;

import com.careerpath.backend.entity.User;
import com.careerpath.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail())
                .orElse(null);

        if (existingUser != null &&
                existingUser.getPassword().equals(user.getPassword())) {
            return "Login Successful";
        }

        return "Invalid Email or Password";
    }
    @GetMapping("/recommend")
    public String recommend(
            @RequestParam String skills,
            @RequestParam String interests) {

        skills = skills.toLowerCase();
        interests = interests.toLowerCase();

        if (skills.contains("java") &&
                interests.contains("backend")) {
            return "Backend Developer";
        }

        if (skills.contains("python") &&
                interests.contains("ai")) {
            return "AI Engineer";
        }

        if (skills.contains("aws") ||
                interests.contains("cloud")) {
            return "Cloud Engineer";
        }

        if (skills.contains("sql")) {
            return "Data Analyst";
        }

        return "Software Engineer";
    }
}