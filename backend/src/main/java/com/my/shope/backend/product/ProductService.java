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
    public Product createProduct(MultipartFile[] file) throws IOException {
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
        List<Product> allProduct = productRepo.findAll();
        productRepo.findAll().sort(Collections.reverseOrder()); // in case  doesn't work
        return allProduct;
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
        removeFromShoppingCart(productId);

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
        removeProductFromOrder(productId,optionalOrder);
    }
    public void removeFromExecutedOrder(String productId) {
        String authorizedUserId = userService.getAuthorizedUserId();
        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExcuted(authorizedUserId, true);
        removeProductFromOrder(productId,optionalOrder);
    }

    public void removeProductFromOrder(String productId, Optional<Order> order) {

        if (order.isPresent() && order.get().getProductsIds().size() > 0) {
            for (String pId : order.get().getProductsIds()) {
                if (productId.equals(pId)) {
                    order.get().getProductsIds().remove(productId);
                    orderService.updateOrder(order.get());
                    break;
                }
            }
        }
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

    public void deleteProduct(String productId){
        //remove from shopping cart and ordered when product is bought
        removeFromShoppingCart(productId);
        removeFromExecutedOrder(productId);

        //delete product and all photos
        Product product = getProductById(productId);
        fileService.deleteImagesByIds(product.getImageIDs());
        productRepo.delete(product);

    }


    public List<Product> updateProduct(String productId, MultipartFile[] multipartFile) throws IOException {
        Product productToUpdate = getProductById(productId);

        // if only product_details in the multipartFile then update only the details
        if(multipartFile.length == 1 && Objects.requireNonNull(multipartFile[0].getOriginalFilename()).startsWith("product_details")){
            fileService.saveProductDetailsFile(multipartFile[0]);
            setProductDetails(productToUpdate, DETAILS_PATH);
             productRepo.save(productToUpdate);
             return getAll();
        }

        // case contains the product_details file and photos
        for (MultipartFile file : multipartFile) {
            if (Objects.requireNonNull(file.getOriginalFilename()).startsWith("product_details")) {
                fileService.saveProductDetailsFile(file);
                setProductDetails(productToUpdate, DETAILS_PATH);
            } else {
                fileService.deleteImagesByIds(productToUpdate.getImageIDs());
            }

        }

        //just to delete old photos and sett the new photos to mey productToUpdate
        productToUpdate.setImageIDs(new ArrayList<>());
        for (MultipartFile file : multipartFile) {
            if (!Objects.requireNonNull(file.getOriginalFilename()).startsWith("product_details")) {
                productToUpdate.getImageIDs().add(fileService.saveFile(file).getId());
            }
        }
        System.out.println(productToUpdate);
         productRepo.save(productToUpdate);
         return getAll();

    }


    public List<Product> getAllByProductName(String productName){
        List<Product> theList = new ArrayList<>();

        for (Product product: getAll()) {
            if(product.getName().toLowerCase().contains(productName.toLowerCase())){
                theList.add(product);
            }
        }
        return theList;
    }
}