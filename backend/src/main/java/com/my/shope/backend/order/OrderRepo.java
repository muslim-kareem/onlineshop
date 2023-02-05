package com.my.shope.backend.order;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepo extends MongoRepository<Order,String> {

    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    List<Optional<Order>> findAllByAppUserId(String userId);

}
