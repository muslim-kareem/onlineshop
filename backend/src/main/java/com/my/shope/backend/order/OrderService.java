package com.my.shope.backend.order;

import com.my.shope.backend.appUser.AppUser;
import com.my.shope.backend.appUser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;
    private final AppUserService appUserService;



    public Optional<Order> getOrderByAppUserIdAndIsExcuted(String userId, boolean isExcuted){
        return orderRepo.getOrderByAppUserIdAndIsExecuted(userId,isExcuted);
    }


    public Order addToCart(String productId){
        AppUser appUser =  appUserService.getAuthenticatedUser();

        Optional<Order> optionOrder =  getOrderByAppUserIdAndIsExcuted(appUser.getId(),false);

        if(optionOrder.isEmpty()){
            Order newOrder = new Order(null,appUser.getId(),List.of(productId),false );
            orderRepo.save(newOrder);
            return newOrder;
        }else {

            boolean isExist = true;
            for (String pId : optionOrder.get().getProductsIds()) {

                if(productId.equals(pId)){
                    isExist = false;
                    break;
                }
            }
            if(isExist){
                optionOrder.get().getProductsIds().add(productId);
                orderRepo.save(optionOrder.get());
            }
        }
        return optionOrder.get();
    }



    public void createOrderOrUpdate(Order order) {
        orderRepo.save(order);
    }




}
