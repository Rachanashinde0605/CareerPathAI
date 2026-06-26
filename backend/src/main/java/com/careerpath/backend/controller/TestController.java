package com.careerpath.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {
    "https://your-frontend.onrender.com"
})
public class TestController {

    @GetMapping("/api/test")
    public String test() {
        return "Backend Connected Successfully!";
    }
}