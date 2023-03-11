package com.my.shope.backend.product;

import com.my.shope.backend.app_ser.AppUser;
import com.my.shope.backend.app_ser.AppUserService;
import com.my.shope.backend.gridfs.FileService;
import com.my.shope.backend.order.Order;
import com.my.shope.backend.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepo productRepo;
    private final OrderService orderService;
    private final FileService fileService;
    private final AppUserService appUserService;
    private static final String PRODUCT_DETAILS = "product_details";

    public Product createProduct(MultipartFile[] files) throws IOException{
        Product product = new Product();
        List<String> imagesIds = new ArrayList<>();

        for (MultipartFile multipartFile : files) {
            if (Objects.requireNonNull(multipartFile.getOriginalFilename()).startsWith(PRODUCT_DETAILS)) {

                setProductDetails(product,new String(multipartFile.getBytes()));
            } else {
                imagesIds.add(fileService.saveFile(multipartFile).getId());
            }
        }
        product.setImageIDs(imagesIds);

        return productRepo.save(product);
    }

    public List<Product> getAll() {
       return productRepo.findAllByOrderByIdAsc();
    }
    public Product getProductById(String id) {
        Optional<Product> optionalProduct = productRepo.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new NoSuchElementException ("No Product found with this id: " + id);
        } else {
            return optionalProduct.get();
        }
    }
    public Order addToCart(String productId) {
        AppUser appUser = appUserService.getAuthenticatedUser();

        Optional<Order> optionOrder = orderService.getOrderByAppUserIdAndIsExecuted(appUser.getId(), false);

        if (optionOrder.isEmpty()) {
            Order newOrder = new Order(null, appUser.getId(), List.of(productId), false);
            orderService.save(newOrder);
            return newOrder;
        } else {

            boolean isExist = true;
            for (String pId : optionOrder.get().getProductsIds()) {

                if (productId.equals(pId)) {
                    isExist = false;
                    break;
                }
            }
            if (isExist) {
                optionOrder.get().getProductsIds().add(productId);
                orderService.save(optionOrder.get());
            }
        }
        return optionOrder.get();
    }

    public Product buyProduct(String productId) {
        removeFromShoppingCart(productId);
        AppUser appUser = appUserService.getAuthenticatedUser();

        Optional<Order> optionOrder = orderService.getOrderByAppUserIdAndIsExecuted(appUser.getId(), true);

        if (optionOrder.isEmpty()) {
            Order newOrder = new Order(null, appUser.getId(), List.of(productId), true);
            orderService.save(newOrder);
            return getProductById(productId);
        } else {

            boolean isExist = true;
            for (String pId : optionOrder.get().getProductsIds()) {

                if (productId.equals(pId)) {
                    isExist = false;
                    break;
                }
            }
            if (isExist) {
                optionOrder.get().getProductsIds().add(productId);
                orderService.save(optionOrder.get());
            }
        }
        return getProductById(productId);
    }


    public List<Product> getShoppingCart() {
        List<Product> addedToCardProducts = new ArrayList<>();
        AppUser appUser = appUserService.getAuthenticatedUser();
        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExecuted(appUser.getId(), false);

        if (optionalOrder.isPresent()) {
            for (String productId : optionalOrder.get().getProductsIds()) {
                addedToCardProducts.add(getProductById(productId));
            }
        }

        return addedToCardProducts;
    }
    public List<Product> getOrdered() {
        List<Product> orderedProducts = new ArrayList<>();
        AppUser appUser = appUserService.getAuthenticatedUser();
        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExecuted(appUser.getId(), true);

        if (optionalOrder.isPresent()) {
            for (String productId : optionalOrder.get().getProductsIds()) {
                orderedProducts.add(getProductById(productId));
            }
        }

        return orderedProducts;
    }





    public void removeFromShoppingCart(String productId) {
        String authorizedUserId = appUserService.getAuthorizedUserId();
        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExecuted(authorizedUserId, false);
        removeProductFromOrder(productId,optionalOrder);
    }
    public void removeFromOrdered(String productId) {
        String authorizedUserId = appUserService.getAuthorizedUserId();
        Optional<Order> optionalOrder = orderService.getOrderByAppUserIdAndIsExecuted(authorizedUserId, true);
        removeProductFromOrder(productId,optionalOrder);
    }

    public void removeProductFromOrder(String productId, Optional<Order> order) {

        if (order.isPresent() && !order.get().getProductsIds().isEmpty()) {
            for (String pId : order.get().getProductsIds()) {
                if (productId.equals(pId)) {
                    order.get().getProductsIds().remove(productId);
                    orderService.updateOrder(order.get());
                    break;
                }
            }
        }
    }


    public void setProductDetails(Product product, String  file)  {

            file.lines().forEach(st -> {
                int index = st.indexOf(":");
                String fieldName = st.substring(0, index);
                String value = st.substring(index + 1);

                switch (fieldName) {
                    case "name" -> product.setName(value);
                    case "description" -> product.setDescription(value);
                    case "price" -> product.setPrice(Double.parseDouble(value));
                    case "category" -> product.setCategory(value);
                    case "id" -> product.setId(value);
                    default ->  product.setDescription(value);
            }

            });

    }

    public List<Product> deleteProduct(String productId){
        //remove from shopping cart and ordered when product is bought
        removeFromShoppingCart(productId);
        removeFromOrdered(productId);

        //delete product and all photos
        Product product = getProductById(productId);
        fileService.deleteImagesByIds(product.getImageIDs());
        productRepo.delete(product);
        return productRepo.findAll();

    }




    public List<Product> getAllByProductName(String productName){
        List<Product> products = new ArrayList<>();

        for (Product product: getAll()) {
            if(product.getName().toLowerCase().contains(productName.toLowerCase())){
                products.add(product);
            }
        }
        return products;
    }

    public List<Product> getAllByProductCategory(String category){
        List<Product> theList = new ArrayList<>();

        for (Product product: getAll()) {
            if(product.getCategory().equals(category)){
                theList.add(product);
            }
        }
        return theList;
    }

    public void orderAll(){
        for (Product product : getShoppingCart()) {
            buyProduct(product.getId());
        }
    }

    public void updateProduct(Product product) {
        productRepo.save(product);
    }

    public void addPhotosToProduct(MultipartFile[] files, String productId) throws IOException {
        Product product = getProductById(productId);
        for (MultipartFile file : files) {
            product.getImageIDs().add(fileService.saveFile(file).getId());
        }
          updateProduct(product);
    }


    public void updateImageIds(Product theNewProduct){
        Product oldProduct = getProductById(theNewProduct.getId());

        for (int i = 0; i < oldProduct.getImageIDs().size(); i++) {
                if(!theNewProduct.getImageIDs().contains(oldProduct.getImageIDs().get(i))){
                    fileService.deleteImagesByIds(new ArrayList<>( List.of(oldProduct.getImageIDs().get(i))));
                }
        }
        updateProduct(theNewProduct);
    }

}