package com.my.shope.backend;

import com.my.shope.backend.app_ser.AppUser;
import com.my.shope.backend.order.Order;
import com.my.shope.backend.product.Product;
import org.assertj.core.util.Lists;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.util.List;

public  class TestData {


    public final static  MockMultipartFile SOME_IMAGE_FILE = new MockMultipartFile(
            "file", "image.jpg", MediaType.IMAGE_JPEG_VALUE, "some image".getBytes());

    public final static String NEW_USER_ADMIN = """
            {
                
                "username":"admin",
                "password":"ps",
                "role":"ADMIN"
            }
            """;
//    public final static String NEW_USER_BASIC = """
//            {
//                "username":"basic",
//                "password":"ps",
//                "role":"BASIC:
//            }
//            """;

    public final static String PRODUCT_EXPECTED_1= """
            {
                "id" : "1",
                "name":"product1",
                "description":"description",
                "price":20.00,
                "category": "CLOSING"
            }
            """;


    public final static String PRODUCT_EXPECTED_2= """
            {
                "id" : "2",
                "name":"product2",
                "description":"description",
                "price":20.00,
                "category": "CLOSING"
            }
            """;
    public final static String PRODUCT_EXPECTED_2_ARRAY= """
            [{
                "id" : "2",
                "name":"product2",
                "description":"description",
                "price":20.00,
                "category": "CLOSING"
            }]
            """;

   public static AppUser APP_USER1 = new AppUser("1","user1", "pw","ADMIN");
   public static Product PRODUCT1 = new Product("1","product1",
            "description",20.00, List.of("1"),
            "CLOSING");
   public static Order SHOPPING_CART_ORDER = new Order("1","1", Lists.newArrayList("1"),false);
   public static Order ORDERED_CARD_ORDER = new Order("1","1", Lists.newArrayList("1"),true);

   public static MockMultipartFile PRODUCT_FILE_1 = new MockMultipartFile(
            "file[]",
            "product_details.txt",
            MediaType.TEXT_PLAIN.toString(),
            ("""
                        id:1
                        name:product1
                        description:description
                        price:20.00
                        category:CLOSING""").getBytes()
    );

   public static MockMultipartFile PRODUCT_FILE_2 = new MockMultipartFile(
            "file[]",
            "product_details.txt",
            MediaType.TEXT_PLAIN.toString(),
            ("""
                        id:2
                        name:product2
                        description:description
                        price:20.00
                        category:CLOSING""").getBytes()
    );


}
