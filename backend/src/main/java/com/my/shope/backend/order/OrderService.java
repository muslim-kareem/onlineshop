package com.my.shope.backend.order;

import com.my.shope.backend.appUser.AppUser;
import com.my.shope.backend.appUser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.OpenOption;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;
    private final AppUserService appUserService;


    public Order addToCart(String productId){
        AppUser appUser =  appUserService.getAuthenticatedUser();

        Optional<Order> optionOrder = orderRepo.getOrderByAppUserId(appUser.getId());

        if(optionOrder.isEmpty()){
            Order newOrder = new Order(null,appUser.getId(),List.of(productId),false );
            orderRepo.save(newOrder);
            return newOrder;
        }else {

            boolean isExist = true;
            for (String pId : optionOrder.get().getProductsIds()) {

                if(pId.equals(productId)){
                    isExist = false;
                }
            }

            if(isExist){
                optionOrder.get().getProductsIds().add(productId);
            }
        }



        return optionOrder.get();
    }

}
