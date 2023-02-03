package com.my.shope.backend.product;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ProductControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ProductRepo productRepo;

    @Test
        void create_whenNotLoggedIn_returnUnauthorized() throws Exception {
            MockMultipartFile file = new MockMultipartFile(
                    "file[]",
                    "product_details.txt",
                    MediaType.TEXT_PLAIN.toString(),
                    ("""
                            name:Jack & Jones Mantelshelf
                            description:Eleganter Mantel
                            price:59.90
                            category:CLOSING""").getBytes()
            );
            MockMultipartFile file2 = new MockMultipartFile("file[]", "image.jpg", "image/jpeg", "some image".getBytes());

                this.mvc.perform(multipart("/api/products")
                                .file(file).file(file2)
                        )
                        .andExpect(status().isUnauthorized());
        }

    @Test
    @WithMockUser(username = "muslim",password = "passowrd", roles = {"ADMIN"})
    void crate_product_Without_photos_when_only_txtFile_sanded() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file[]",
                "product_details.txt",
                MediaType.TEXT_PLAIN.toString(),
                ("""
                        name:Jack & Jones Wollmantel
                        description:Eleganter Mantel
                        price:59.90
                        category:CLOSING""").getBytes()
                 );
        MockMultipartFile file2 = new MockMultipartFile("file[]", "image.jpg", "image/jpeg", "some image".getBytes());

        this.mvc.perform(multipart("/api/products")
                        .file(file).file(file2)
                )
                .andExpect(status().isOk()).andExpect(content().json("""
            {

            "name": "Jack & Jones Wollmantel",
            "description": "Eleganter Mantel",
            "price": 59.90,
            "category": "CLOSING"
}
"""
                ));
    }
    @Test
    @WithMockUser(username = "muslim",password = "passowrd", roles = {"BASIC"})
    void crate_product_should_returnUnauthorized_for_BASIC() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file[]",
                "product_details.txt",
                MediaType.TEXT_PLAIN.toString(),
                ("""
                        name:Jack & Jones Wollmantel
                        description:Eleganter Mantel
                        price:59.90
                        category:CLOSING""").getBytes()
        );
        MockMultipartFile file2 = new MockMultipartFile("file[]", "image.jpg", "image/jpeg", "some image".getBytes());

        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                        .file(file).file(file2)
                )
                .andExpect(status().isForbidden());
    }



    @Test
    @WithMockUser(username = "user", password = "pw",roles = "BASIC")
    void getAll_should_return_all_products() throws Exception {
            // given
        Product product = new Product("2","name","description",2.88,new ArrayList<>(List.of("1","2")),"CLOSING");
        productRepo.save(product);

        String expected = """
               [ {
                   "name":"name",
                    "description": "description",
                    "price": 2.88,
                    "imageIDs": ["1","2"],
                    "category":"CLOSING"
                }]
                """;

        //when and then
        mvc.perform(multipart(HttpMethod.GET,"/api/products")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                        status().isOk()).andExpect(content().json(expected));
    }
    @Test
    @WithMockUser(username = "user",password = "ps" ,roles = "ADMIN")
    void delete_product_then_return_minus_the_deleted_product() throws Exception {
        // given
        Product product = new Product("2", "name", "description", 2.88, new ArrayList<>(List.of("1", "2")), "CLOSING");
        productRepo.save(product);


        mvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                                                                {
                                                                
                                                                "username": "user",
                                                                "password": "ps",
                                                                "role": "ADMIN"
                                                                }
      """));


        String expected = """
                []
               """;
        //when and then
        mvc.perform(delete("/api/products/"+product.getId()))
                .andExpectAll(
                        status().isOk()).andExpect(content().json(expected));
        }

    @Test
    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
    void getProductById_should_return_product() throws Exception {
        // given
        Product product = new Product("2","name","description",2.88,new ArrayList<>(List.of("1","2")),"CLOSING");
        productRepo.save(product);


        String expected = """
                {
                   "name":"name",
                    "description": "description",
                    "price": 2.88,
                    "imageIDs": ["1","2"],
                    "category":"CLOSING"
                }
                """;

        //when and then
        mvc.perform(multipart(HttpMethod.GET,"/api/products/"+product.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                        status().isOk()).andExpect(content().json(expected));
    }

    @Test
    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
    void getProductsByName_should_return_products_with_the_this_specific_name() throws Exception {
        // given
        Product product = new Product("2","key","description",2.88,new ArrayList<>(List.of("1","2")),"CLOSING");
        Product product2 = new Product("1","name","description",2.88,new ArrayList<>(List.of("1","2")),"CLOSING");
        productRepo.save(product);
        productRepo.save(product2);


        String expected = """
                [{
                   "name":"key",
                    "description": "description",
                    "price": 2.88,
                    "imageIDs": ["1","2"],
                    "category":"CLOSING"
                }]
                """;

        //when and then
        mvc.perform(multipart(HttpMethod.GET,"/api/products/search-by-name/"+product.getName())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                            status().isOk()).andExpect(content().json(expected));
    }    @Test
    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
    void getProductsByName_should_return_empty() throws Exception {
        // given
        Product product = new Product("2","key","description",2.88,new ArrayList<>(List.of("1","2")),"CLOSING");
        Product product2 = new Product("1","name","description",2.88,new ArrayList<>(List.of("1","2")),"CLOSING");
        productRepo.save(product);
        productRepo.save(product2);


        String expected = """
                []
                """;

        //when and then
        mvc.perform(multipart(HttpMethod.GET,"/api/products/search-by-name/"+"empty")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                            status().isOk()).andExpect(content().json(expected));
    }



    @Test
    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
    void when_only_txtFile_then_uploaded_then_does_not_set_the_photos() throws Exception {
            //given
        Product product = new Product("1","name Of Product","description",2.88,new ArrayList<>(List.of("1","2")),"CLO");
        productRepo.save(product);

        MockMultipartFile file = new MockMultipartFile(
                "file[]",
                "product_details.txt",
                MediaType.TEXT_PLAIN.toString(),
                ("""
                        name:Jack & Jones Wollmantel
                        description:Eleganter Mantel
                        price:59.90
                        category:CLOSING""").getBytes()
        );

        // when and actual

        this.mvc.perform(multipart(HttpMethod.POST,"/api/products/update/"+product.getId())
                        .file(file)
                )
                .andExpect(status().isOk()).andExpect(content().json("""
                                    [
                                    {

                                    "name": "Jack & Jones Wollmantel",
                                    "description": "Eleganter Mantel",
                                    "price": 59.90,
                                    "category": "CLOSING",
                                    "imageIDs":["1","2"]
                        }]
                        """
                ));




    }
}