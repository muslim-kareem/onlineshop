package com.my.shope.backend;

import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

public  class TestData {


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


//    public final static String EXCUTID_ORDER = """
//            {
//                "id" : "1",
//                "appUserId":"1",
//                "productsIds":["1"],
//                "isExecuted": true
//            }
//            """;


//  public static MockMultipartFile PRODUCT_FILE_PHOTO = new MockMultipartFile("file[]", "image.jpg", "image/jpeg", "some image".getBytes());


}
