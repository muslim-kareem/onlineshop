package com.my.shope.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public Product createProduct( @RequestParam("file[]") MultipartFile[] file) throws IOException {
        return productService.createProduct(file);
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

    @DeleteMapping("/{id}")
    public List<Product> deleteProduct(@PathVariable String id){
        return productService.deleteProduct(id);
    }

    @DeleteMapping("/shopping-carts/{id}")
    public List<Product> removeFromShoppingCart(@PathVariable String id){
        productService.removeFromShoppingCart(id);
        return productService.getShoppingCart();
    }


    @PostMapping("/update/{id}")
    public List<Product> updateProduct(@PathVariable String id, @RequestParam("file[]") MultipartFile[] file) throws IOException {
     return productService.updateProduct(id,file);
    }

    @GetMapping("/search-by-name/{name}")
    public List<Product> getTitle(@PathVariable String name){
       return productService.getAllByProductName(name);
    }

}
