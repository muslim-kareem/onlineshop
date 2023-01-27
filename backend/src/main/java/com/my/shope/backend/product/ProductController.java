package com.my.shope.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public Product createProduct(@RequestBody Product theProduct){
        return productService.createProduct(theProduct);
    }
    @PutMapping
    public Product updateProduct(@RequestBody Product theProduct){
        return productService.updateProduct(theProduct);
    }

    @GetMapping
    public List<Product> getAll(){
        return productService.getAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id){
        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public Product buyProduct(@PathVariable String id){
       return productService.buyProduct(id);
    }

    @GetMapping("/shopping-carts")
    public List<Product> shoppingCart(){
        return productService.getShoppingCart();
    }

    @DeleteMapping("/shopping-carts/{id}")
    public List<Product> removeFromShoppingCart(@PathVariable String id){
        System.out.println("==========>  "+ id);
        productService.removeFromShoppingCart(id);
        return productService.getShoppingCart();
    }


}
