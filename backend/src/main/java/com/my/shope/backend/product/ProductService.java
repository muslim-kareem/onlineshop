package com.my.shope.backend.product;

import com.my.shope.backend.appUser.AppUser;
import com.my.shope.backend.appUser.AppUserService;
import com.my.shope.backend.order.Order;
import com.my.shope.backend.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public Product buyProduct(String productId) {
        AppUser appUser = userService.getAuthenticatedUser();
        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExcuted(appUser.getId(), true);

        if (optionalOrder.isEmpty()) {
            Order newOrder = new Order(null, appUser.getId(), List.of(productId), true);
            orderService.createOrderOrUpdate(newOrder);

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
                orderService.createOrderOrUpdate(optionalOrder.get());
            }
        }


        return getProductById(productId);
    }
}
