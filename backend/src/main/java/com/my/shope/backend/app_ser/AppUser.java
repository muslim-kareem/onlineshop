package com.my.shope.backend.app_ser;



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
