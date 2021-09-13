package com.manukov.controller;

import com.manukov.dto.UserDto;
import com.manukov.entity.Role;
import com.manukov.entity.User;
import com.manukov.service.RoleService;
import com.manukov.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/admin/api")
public class AdminRestController {

    private final UserService userService;
    private final RoleService roleService;

    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public ResponseEntity <List<User>> listUsers() {
        List<User> users = userService.getUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    @ResponseBody
    public User getUserById(@PathVariable long id) {
        return userService.findById(id);
    }

    @GetMapping("/authUser")
    public ResponseEntity<User> getAuthUser(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/roles")
    public ResponseEntity <List<Role>> listRoles() {
        List<Role> roles = roleService.getRoles();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @PostMapping(value = "/addUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> addUser(@RequestBody UserDto userDto) {
        boolean result = userService.addUser(userDto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PutMapping(value ="/updateUser")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@RequestBody UserDto userDto) {
        boolean resulr = userService.updateUser(userDto);
    }

    @DeleteMapping("/deleteUser/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long id) {
        userService.deleteUser(id);
    }
}
