package com.my.shope.backend.product;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface ProductRepo extends MongoRepository<Product,String> {

//    List<Product> findAllByAppUserId(String userId);
}
