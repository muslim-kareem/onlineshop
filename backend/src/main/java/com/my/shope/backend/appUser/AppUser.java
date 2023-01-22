package com.my.shope.backend.appUser;



import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AppUser {
    private String id;
    private String username;
    private String password;
    private String role;
}
