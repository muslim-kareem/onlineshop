package com.my.shope.backend.order;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {


    private final OrderService service;



    @PutMapping("/{id}")
    public Order addToCart(@PathVariable String id){
        System.out.println("======> " + id);
        return service.addToCart(id);
    }


}
