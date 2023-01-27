package com.my.shope.backend.product;

import com.my.shope.backend.appUser.AppUser;
import com.my.shope.backend.appUser.AppUserService;
import com.my.shope.backend.order.Order;
import com.my.shope.backend.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepo productRepo;
    private final OrderService orderService;
    private final AppUserService userService;

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

    public Product creatProduct(Product theProduct) {
        theProduct.setId(null);
       return productRepo.save(theProduct);
    }

    public Product buyProduct(String productId) {
        AppUser appUser = userService.getAuthenticatedUser();
        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExcuted(appUser.getId(), true);

        if (optionalOrder.isEmpty()) {
            Order newOrder = new Order(null, appUser.getId(), List.of(productId), true);
            orderService.createOrder(newOrder);

            return getProductById(productId);
        } else {

            boolean isExist = true;
            for (String pId : optionalOrder.get().getProductsIds()) {

                if (productId.equals(pId)) {
                    isExist = false;
                    break;
                }
            }

            if (isExist) {
                optionalOrder.get().getProductsIds().add(productId);
                orderService.createOrder(optionalOrder.get());
            }
        }

        return getProductById(productId);
    }


    public List<Product> shoppingCart(){
        List<Product> addedToCardProducts = new ArrayList<>();
        AppUser appUser = userService.getAuthenticatedUser();

        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExcuted(appUser.getId(),  false);

        if(optionalOrder.isPresent()){
            for (String productId : optionalOrder.get().getProductsIds()) {
                addedToCardProducts.add(getProductById(productId));
            }
        }

        return addedToCardProducts;

    }


    public Product removeFromShoppingCart(String productId){

        String authorizedUserId = userService.getAuthorizedUserId();
        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExcuted(authorizedUserId, false);

        if(optionalOrder.isPresent() && optionalOrder.get().getProductsIds().size() > 0){
            for (String pId : optionalOrder.get().getProductsIds()) {
                  if(productId.equals(pId)){
                    optionalOrder.get().getProductsIds().remove(productId);
                   orderService.updateOrder(optionalOrder.get());
                   break;
                  }
            }
        }
        return getProductById(productId);
    }


//    public List<String> getShoppingCartIds(String productIds){
//        String authorizedUserId = userService.getAuthorizedUserId();
//        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExcuted(authorizedUserId, false);
//
//        return optionalOrder.map(Order::getProductsIds).orElse(null);
//    }


}
