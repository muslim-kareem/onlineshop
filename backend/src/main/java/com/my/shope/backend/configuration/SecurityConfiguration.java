package com.my.shope.backend.configuration;


import com.my.shope.backend.appUser.AppUser;
import com.my.shope.backend.appUser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final AppUserService appUserService;

    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .httpBasic().and()
                .authorizeHttpRequests()
                .antMatchers(HttpMethod.POST,"/api/app-users/login").permitAll()
                .antMatchers(HttpMethod.PUT,"/api/products/update/").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/api/products").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET,"/api/products").hasAnyRole("BASIC","ADMIN")
                .and()
                .build();
    }


    @Bean
    public UserDetailsService userDetailsService(){
        return username -> {
            Optional<AppUser> myUser  = appUserService.findByUserName(username);
            if(myUser.isEmpty()){
                throw new UsernameNotFoundException(username);
            }
            AppUser appUser = myUser.get();

            return User.builder()
                    .username(appUser.getUsername())
                    .password(appUser.getPassword())
                    .roles(appUser.getRole())
                    .build();

        };
    }

}
