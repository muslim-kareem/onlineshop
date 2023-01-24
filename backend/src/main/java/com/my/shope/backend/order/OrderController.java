package com.my.shope.backend.order;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderController {


    private final OrderService service;



    @PutMapping("/{id}")
    public Order addToCart(@PathVariable String productId){
        return service.addToCart(productId);
    }


}
