package com.my.shope.backend.appUser;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepo appUserRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    public Optional<AppUser> findByUserName(String userName){
        return appUserRepo.findUserAppByUsername(userName);
    }
    public AppUser create(AppUser appUser){
        Optional<AppUser> existingAppUser = appUserRepo.findUserAppByUsername(appUser.getUsername());

        if(existingAppUser.isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));

        if (
                SecurityContextHolder.getContext().getAuthentication() == null ||
                        !SecurityContextHolder.getContext().getAuthentication().isAuthenticated() ||
                        SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                                .noneMatch(ga -> ga.getAuthority().equals("ROLE_ADMIN"))
        ){
            appUser.setRole("BASIC");
        }


        appUserRepo.save(appUser);

        appUser.setPassword("");

        return appUser;
    }



    public Optional<AppUser> findByUsernameWithoutPassword(String username){
        Optional<AppUser> appUser = appUserRepo.findUserAppByUsername(username);
        appUser.ifPresent(user -> user.setPassword(""));

        return appUser;
    }

    public AppUser getAuthenticatedUser () {
        return findByUsernameWithoutPassword(
                SecurityContextHolder.getContext().getAuthentication().getName()
        ).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.FORBIDDEN)
        );
    }

}
