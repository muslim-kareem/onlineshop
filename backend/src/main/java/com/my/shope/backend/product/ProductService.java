package com.my.shope.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    public Product getProductById(String id) {
        Optional<Product> theProduct = productRepo.findById(id);

        if(theProduct.isEmpty()){
            throw new NoSuchElementException("No Product found with this id: " + id);
        } else {
            return  theProduct.get();
        }
    }

    public Product updateProduct(Product theProduct) {

       return productRepo.save(theProduct);
    }
}
