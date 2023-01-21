package com.my.shope.backend.appUser;



import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AppUser {
    private String id;
    private String userName;
    private String password;
    private String role;
}
