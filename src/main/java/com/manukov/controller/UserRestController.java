package com.manukov.controller;

import com.manukov.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user/api")
public class UserRestController {

    @GetMapping("/authUser")
    public ResponseEntity<User> getAuthUser(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return ResponseEntity.ok(user);
    }
}
