package com.my.shope.backend.appUser;

import com.my.shope.backend.app_ser.AppUser;
import com.my.shope.backend.app_ser.AppUserRepo;
import com.my.shope.backend.app_ser.AppUserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;


@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserServiceTest {


    @Autowired
    private PasswordEncoder passwordEncoder;


    @Test
    void create_appUser_when_successful_return_new_user() {

        // given
        AppUser userInput = new AppUser("1", "UserName", "password", "BASIC");
        AppUser createdUser = new AppUser("1", "UserName", "","BASIC");
        AppUserRepo repository = Mockito.mock(AppUserRepo.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findUserAppByUsername(userInput.getUsername())).thenReturn(Optional.empty());

        // when
        AppUser actual = appUserService.create(userInput);

        // then
        Assertions.assertEquals(actual, createdUser);
    }
    @Test
    void create_whenUserAlreadyExists_thenReturnException() {

        // given
        AppUser userInput = new AppUser(null, "UserName", "password" ,"BASIC");
        AppUser createdUser = new AppUser( "1", "UserName", "password", "BASIC");
        AppUserRepo repository = Mockito.mock(AppUserRepo.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findUserAppByUsername(userInput.getUsername())).thenReturn(Optional.of(createdUser));

        // when
        try {
            appUserService.create(userInput);
            Assertions.fail();
        } catch (ResponseStatusException e) {
            Assertions.assertEquals(HttpStatus.CONFLICT, e.getStatus());
        }
    }


    @Test
    void findByUsernameWithoutPassword_should_be_successful() {
        // given
        AppUser appUser = new AppUser("1", "UserName", "password","BASIC");
        AppUser userWithoutPassword = new AppUser("", "UserName", "","BASIC");
        AppUserRepo repository = Mockito.mock(AppUserRepo.class);
        AppUserService appUserService = new AppUserService(repository, passwordEncoder);


        // when
        Optional<AppUser> actual =  appUserService.findByUsernameWithoutPassword(appUser.getUsername());
        if(actual.isEmpty()){
            return;
        }
        // then
        Assertions.assertEquals(actual.get(), userWithoutPassword);
    }



    @Test
    void findByUsernameWithoutPassword_should_be_empty_thenReturnNull() {

        // given
        AppUserRepo repository = Mockito.mock(AppUserRepo.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findUserAppByUsername("Name")).thenReturn(Optional.empty());

        // when
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword("Name");

        // then
        Assertions.assertEquals(actual, Optional.empty());
        Mockito.verify(repository).findUserAppByUsername("Name");
    }




    @Test
    void findByUsername_whenUserExists_thenReturnUser() {

        // given
        AppUser user = new AppUser("1", "UserName", "Password", "BASIC");
        AppUserRepo repository = Mockito.mock(AppUserRepo.class);

        AppUserService appUserService = new AppUserService(repository, passwordEncoder);
        Mockito.when(repository.findUserAppByUsername(user.getUsername())).thenReturn(Optional.of(user));

        // when
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword(user.getUsername());

        // then
        Assertions.assertEquals(actual, Optional.of(user));
    }
}










