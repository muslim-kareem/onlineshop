package com.my.shope.backend.order;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;


    public Optional<Order> getOrderByAppUserIdAndIsExcuted(String userId, boolean isExcuted) {
        return orderRepo.getOrderByAppUserIdAndIsExecuted(userId, isExcuted);
    }


    public void createOrder(Order order) {
        order.setId(null);
        orderRepo.save(order);
    }
    public void updateOrder(Order order) {
        orderRepo.save(order);
    }


    public void save(Order newOrder) {
        orderRepo.save(newOrder);
    }
}
