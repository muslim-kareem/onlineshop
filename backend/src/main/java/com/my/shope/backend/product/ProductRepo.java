package com.my.shope.backend.product;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface ProductRepo extends MongoRepository<Product,String> {
     List<Product> findAllByOrderByIdAsc();

}
