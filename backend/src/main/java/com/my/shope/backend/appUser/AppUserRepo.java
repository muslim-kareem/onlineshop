package com.my.shope.backend.appUser;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AppUserRepo extends MongoRepository<AppUser,String> {
    Optional<AppUser> findUserAppByUserName(String userName);
}
