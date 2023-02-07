package com.my.shope.backend.app_ser;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AppUserRepo extends MongoRepository<AppUser,String> {
    Optional<AppUser> findUserAppByUsername(String userName);
}
