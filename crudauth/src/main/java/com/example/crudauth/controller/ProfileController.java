package com.example.crudauth.controller;

import com.example.crudauth.entity.User;
import com.example.crudauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private UserService userService;

    @GetMapping
    public String profile(Authentication authentication, Model model) {
        if (authentication != null) {
            String username = authentication.getName();
            User user = userService.getUserByUsername(username);
            model.addAttribute("user", user);
        }
        return "profile";
    }

    @PostMapping("/update")
    public String updateProfile(@RequestParam String username, 
                               @RequestParam(required = false) String password, 
                               Authentication authentication) {
        if (authentication != null) {
            String currentUsername = authentication.getName();
            User currentUser = userService.getUserByUsername(currentUsername);
            if (currentUser != null) {
                User updatedUser = new User();
                updatedUser.setUsername(username);
                if (password != null && !password.isEmpty()) {
                    updatedUser.setPassword(password);
                } else {
                    updatedUser.setPassword(currentUser.getPassword());
                }
                userService.updateUser(currentUser.getId(), updatedUser);
            }
        }
        return "redirect:/profile";
    }
}

