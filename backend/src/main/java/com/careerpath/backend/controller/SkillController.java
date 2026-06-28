package com.careerpath.backend.controller;

import com.careerpath.backend.entity.Skill;
import com.careerpath.backend.repository.SkillRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    private final SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @PostMapping
    public Skill saveSkill(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }
}