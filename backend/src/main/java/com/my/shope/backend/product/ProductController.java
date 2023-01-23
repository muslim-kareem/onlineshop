package com.my.shope.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    @PostMapping
    public Product createProduct(@RequestBody Product theProduct){
        theProduct.setId(null);
        return service.createProduct(theProduct);
    }

    @GetMapping
    public List<Product> getAll(){
        return service.getAll();
    }
}
