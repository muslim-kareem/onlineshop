package com.my.shope.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepo productRepo;

    public Product createProduct(Product theProduct) {
        return  productRepo.save(theProduct);
    }

    public List<Product> getAll() {
        return productRepo.findAll();
    }
}
