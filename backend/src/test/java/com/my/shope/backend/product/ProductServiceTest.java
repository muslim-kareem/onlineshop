package com.my.shope.backend.product;

import com.my.shope.backend.app_ser.AppUserService;
import com.my.shope.backend.gridfs.FileMetadata;
import com.my.shope.backend.gridfs.FileService;
import com.my.shope.backend.order.Order;
import com.my.shope.backend.order.OrderService;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static com.my.shope.backend.TestData.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    ProductRepo productRepo;
    @Mock
    OrderService orderService;
    @Mock
    FileService fileService;
    @Mock
    AppUserService appUserService;

    @InjectMocks
    ProductService productService ;


    

    public FileMetadata createdFileMetaData(){
        return new FileMetadata(
                "1","some name","content type", 99L,"x user" );
    }
    @Test
    void createProduct_then_return_product() throws IOException {

        //given
        MultipartFile[] files = new MockMultipartFile[]{SOME_IMAGE_FILE, PRODUCT_FILE_1};
        when(fileService.saveFile(SOME_IMAGE_FILE)).thenReturn(createdFileMetaData());
        when(productRepo.save(PRODUCT1)).thenReturn(PRODUCT1);

        //when
        Product actual = productService.createProduct(files);

        //then
        assertEquals(PRODUCT1, actual);
        verify(fileService,  atLeast(1)).saveFile(SOME_IMAGE_FILE);
        verify(productRepo).save(PRODUCT1);

    }

    @Test
    void getAll_products_then_return_array_with_one_product() throws IOException {
        //given
        MultipartFile[] files = new MockMultipartFile[]{SOME_IMAGE_FILE, PRODUCT_FILE_1};

        when(fileService.saveFile(SOME_IMAGE_FILE)).thenReturn(createdFileMetaData());
        when(productRepo.findAllByOrderByIdAsc()).thenReturn(List.of(PRODUCT1));
        productService.createProduct(files);

        // when
        List<Product> actual = productService.getAll();

        //then
        assertEquals(List.of(PRODUCT1), actual);
        verify(fileService).saveFile(SOME_IMAGE_FILE);
        verify(productRepo).findAllByOrderByIdAsc();
    }

    @Test
    void getProductById_then_return_the_product() throws IOException {
        //given
        MultipartFile[] files = new MockMultipartFile[]{SOME_IMAGE_FILE, PRODUCT_FILE_1};
        String productId = "1";

        when(productRepo.findById(productId)).thenReturn(Optional.of(PRODUCT1));
        when(fileService.saveFile(SOME_IMAGE_FILE)).thenReturn(createdFileMetaData());
        productService.createProduct(files);

        // when
        Product actual = productService.getProductById(productId);

        //then
        assertEquals(PRODUCT1,actual);
        verify(productRepo).findById(productId);
    }

    @Test
    void getProductById_then_return_NoSuchElementException_and_prove_the_message() {
        //given
        String productId = "1";

        when(productRepo.findById(productId)).thenReturn(Optional.empty());

        // when and then
        Throwable actual = assertThrows(NoSuchElementException.class, () -> productService.getProductById(productId));

        assertEquals("No Product found with this id: " + productId, actual.getMessage());
        verify(productRepo).findById(productId);
        verifyNoMoreInteractions(productRepo);


    }


    @Test
    void addToCart_when_no_order_exist_when_then_return_order_with_isExecuted_false() {
        //given
        String productId = "1";

        when(appUserService.getAuthenticatedUser()).thenReturn(APP_USER1);
        when(orderService.getOrderByAppUserIdAndIsExecuted(
                APP_USER1.getId(),false))
                      .thenReturn(Optional.empty());


        //when
        Order actual = productService.addToCart(productId);


        //then
        assertEquals(new Order(null,"1",List.of("1"),false),actual);
        verify(appUserService).getAuthenticatedUser();
        verify(orderService).getOrderByAppUserIdAndIsExecuted(APP_USER1.getId(),false);

    }



    @Test
    void addToCart_when_already_order_exist_then_return_order_with_tow_products() {
        //given
        String productId = "2";

        when(appUserService.getAuthenticatedUser()).thenReturn(APP_USER1);
        when(orderService.getOrderByAppUserIdAndIsExecuted(
                APP_USER1.getId(),false))
                .thenReturn(Optional.of(SHOPPING_CART_ORDER));


        //when
        Order actual = productService.addToCart(productId);


        //then
        assertEquals(new Order("1","1",new ArrayList<>(List.of("1","2")),false),actual);
        verify(appUserService).getAuthenticatedUser();
        verify(orderService).getOrderByAppUserIdAndIsExecuted(APP_USER1.getId(),false);
    }

    @Test
    void buyProduct_then_return_the_product() {
        //given
        String productId = "1";

        when(appUserService.getAuthorizedUserId()).thenReturn(APP_USER1.getId());
        when(appUserService.getAuthenticatedUser()).thenReturn(APP_USER1);
        when(productRepo.findById(productId)).thenReturn(Optional.of(PRODUCT1));
//        when(orderService.getOrderByAppUserIdAndIsExecuted(APP_USER1.getId(),true))
//                                                         .thenReturn(Optional.of(ORDERED_CARD_ORDER));


        //when
        Product actual = productService.buyProduct(productId);


        //then
        assertEquals(PRODUCT1,actual);
        verify(appUserService).getAuthenticatedUser();
        verify(orderService).getOrderByAppUserIdAndIsExecuted(APP_USER1.getId(),true);
    }


    @Test
    void getShoppingCart_return_list_with_one_product() {
        //given
        when(appUserService.getAuthenticatedUser()).thenReturn(APP_USER1);
        when(orderService.getOrderByAppUserIdAndIsExecuted(
                APP_USER1.getId(),false))
                .thenReturn(Optional.of(SHOPPING_CART_ORDER));
        when(productRepo.findById(any())).thenReturn(Optional.of(PRODUCT1));

        //when
        List<Product> actual = productService.getShoppingCart();
        System.out.println(actual);

        assertEquals(new ArrayList<>(List.of(PRODUCT1)),actual);
    }

    @Test
    void getOrdered() {
        //given
        when(appUserService.getAuthenticatedUser()).thenReturn(APP_USER1);
        when(orderService.getOrderByAppUserIdAndIsExecuted(
                APP_USER1.getId(),true))
                       .thenReturn(Optional.of(ORDERED_CARD_ORDER));
        when(productRepo.findById(any())).thenReturn(Optional.of(PRODUCT1));

        //when
        List<Product> actual = productService.getOrdered();
        System.out.println(actual);


        assertEquals(new ArrayList<>(List.of(PRODUCT1)),actual);
    }

    @Test
    @Disabled
    void removeFromShoppingCart() {

}


}