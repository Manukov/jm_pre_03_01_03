package com.manukov.service;

import com.manukov.dao.RoleDao;
import com.manukov.dao.UserDao;
import com.manukov.dto.UserDto;
import com.manukov.entity.Role;
import com.manukov.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;
    private final RoleDao roleDao;
    private final RoleService roleService;

    public UserServiceImpl(UserDao userDao, RoleDao roleDao, RoleService roleService) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        this.roleService = roleService;
    }

    @Transactional
    @Override
    public List<User> getUsers() {
        List<User> users = userDao.getUsers();
        return users;
    }

    @Transactional
    @Override
    public User findByEmail(String email) {
        return userDao.findByEmail(email);
    }

    @Transactional
    @Override
    public boolean addUser(User user, String[] rolesId) {
        user.setRoles(getRolesByArrayId(rolesId));
        return userDao.addUser(user);
    }

    @Transactional
    @Override
    public boolean addUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setAge(userDto.getAge());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setRoles(getRolesByArrayId(userDto.getRoles()));
        return userDao.addUser(user);
    }

    @Transactional
    @Override
    public User findById(long id) {
        return userDao.findById(id);
    }

    @Transactional
    @Override
    public boolean updateUser(User user, String[] rolesId) {
        User newUser = new User();
        newUser.setId(user.getId());
        newUser.setFirstname(user.getFirstname());
        newUser.setLastname(user.getLastname());
        newUser.setAge(user.getAge());
        newUser.setEmail(user.getUsername());
        newUser.setPassword(user.getPassword());
        newUser.setRoles(getRolesByArrayId(rolesId));
        return userDao.updateUser(newUser);
    }

    @Transactional
    @Override
    public boolean updateUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setAge(userDto.getAge());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setRoles(getRolesByArrayId(userDto.getRoles()));
        return userDao.updateUser(user);
    }

    @Transactional
    @Override
    public boolean deleteUser(long id) {
        return userDao.deleteUser(id);
    }

    private Set<Role> getRolesByArrayId(String[] rolesId) {
        Set<Role> roles = new HashSet<>();
        for(String id: rolesId){
            System.out.println(id);
            roles.add(roleService.getRoleById(Long.parseLong(id)));
        }
        return roles;
    }
}
