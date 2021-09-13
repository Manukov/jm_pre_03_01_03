package com.manukov.service;

import com.manukov.dto.UserDto;
import com.manukov.entity.User;
import java.util.List;

public interface UserService {
    List<User> getUsers();
    boolean addUser(User user, String[] rolesId);
    boolean addUser(UserDto userDto);
    User findById(long id);
    User findByEmail(String email);
    boolean updateUser(User user, String[] rolesId);
    boolean updateUser(UserDto userDto);
    boolean deleteUser(long id);
}
