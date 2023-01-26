package com.my.shope.backend.order;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OrderRepo extends MongoRepository<Order,String> {

    Optional<Order> getOrderByAppUserIdAndIsExecuted(String userId,boolean isExecuted);

}
