package com.manukov.entity;

import com.fasterxml.jackson.annotation.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements UserDetails, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "age")
    private int age;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    //transient private String confirmPassword;

    @ManyToMany(targetEntity = Role.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @JsonIgnore
    private Set<Role> roles;

    public User() {
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User(String firstname, String lastname, int age, String email, String password, Set<Role> roles) {
        this.email = email;
        this.password = password;
    }
    
    //----------------------реализация UserDetails

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() { return password; }

    @Override
    public String getUsername() { return email; }           //возвращаем email в качестве username

    //Указывает, истек ли срок действия учетной записи пользователя
    @Override
    public boolean isAccountNonExpired() { return true; }            //true - учетная запись пользователя действительна

    //Указывает, заблокирован пользователь или разблокирован.
    @Override
    public boolean isAccountNonLocked() {
        return true;    //пользователь не заблокирован
    }

    //Указывает, истек ли срок действия учетных данных (пароля) пользователя. Просроченные учетные данные препятствуют аутентификации.
    @Override
    public boolean isCredentialsNonExpired() {
        return true;        //учетные данные пользователя действительны
    }

    //Указывает, включен или отключен пользователь. Отключенный пользователь не может быть аутентифицирован.
    @Override
    public boolean isEnabled() {
        return true;            //пользователь включен
    }



    //----------------------getter/setter

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public void setPassword(String password) {this.password = password; }

    public Set<Role> getRoles() { return roles; }

    public void setRoles(Set<Role> roles) { this.roles = roles; }

}
