package com.my.shope.backend.product;

import com.my.shope.backend.appUser.AppUser;
import com.my.shope.backend.appUser.AppUserService;
import com.my.shope.backend.gridfs.FileService;
import com.my.shope.backend.order.Order;
import com.my.shope.backend.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepo productRepo;
    private final OrderService orderService;
    private final AppUserService userService;
    private final FileService fileService;
    public String DETAILS_PATH = "/Users/kareem89/IdeaProjects/simple-onlineshope-my-capstone-project/backend/product_details.txt";
//string with id
    public Product creatProduct(MultipartFile[] file) throws IOException {
        Product product = new Product();
        List<String> imagesIds = new ArrayList<>();

        for (MultipartFile multipartFile : file) {
            if (Objects.requireNonNull(multipartFile.getOriginalFilename()).startsWith("product_details")) {

                fileService.saveProductDetailsFile(multipartFile);
                setProductDetails(product, DETAILS_PATH);

            } else {
                imagesIds.add(fileService.saveFile(multipartFile).getId());
            }
        }
        product.setImageIDs(imagesIds);

        System.out.println(product);
//        product.setId();
        return productRepo.save(product);
    }

    public List<Product> getAll() {
        return productRepo.findAll();
    }
    public Product getProductById(String id) {
        Optional<Product> optionalProduct = productRepo.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new NoSuchElementException("No Product found with this id: " + id);
        } else {
            return optionalProduct.get();
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


    public List<Product> getShoppingCart() {
        List<Product> addedToCardProducts = new ArrayList<>();
        AppUser appUser = userService.getAuthenticatedUser();
        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExcuted(appUser.getId(), false);

        if (optionalOrder.isPresent()) {
            for (String productId : optionalOrder.get().getProductsIds()) {
                addedToCardProducts.add(getProductById(productId));
            }
        }

        return addedToCardProducts;
    }


    public void removeFromShoppingCart(String productId) {

        String authorizedUserId = userService.getAuthorizedUserId();
        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExcuted(authorizedUserId, false);

        if (optionalOrder.isPresent() && optionalOrder.get().getProductsIds().size() > 0) {
            for (String pId : optionalOrder.get().getProductsIds()) {
                if (productId.equals(pId)) {
                    optionalOrder.get().getProductsIds().remove(productId);
                    orderService.updateOrder(optionalOrder.get());
                    break;
                }
            }
        }
        getProductById(productId);
    }


    public void setProductDetails(Product product,String textFilePath) throws IOException {

        File file = new File(textFilePath) ;
        BufferedReader br  = new BufferedReader(new FileReader(file));
        String st;

        while ((st = br.readLine()) != null){
            int index = st.indexOf(":");
            String fieldName = st.substring(0,index);
            String value = st.substring(index+1);

            switch (fieldName) {
                case "name" -> product.setName(value);
                case "description" -> product.setDescription(value);
                case "price" -> product.setPrice(Double.parseDouble(value));
                case "category" -> product.setCategory(value);
            }
        }
        //noinspection ResultOfMethodCallIgnored
        file.delete();

    }


}
