package com.my.shope.backend.appUser;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserControllerTest {



    @Autowired
    private MockMvc mvc;

    @Autowired
    private AppUserRepo appUserRepo;


    @Test
    void getAll_product_wHenNotLoggiedIn_shouldReturn401() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/app-users/me" ))
                .andExpectAll(
                        result -> Assertions.assertEquals(
                                HttpStatus.OK.value(),
                                result.getResponse().getStatus()
                        )
                );
    }





    @Test
    void create_whenSignUp_shouldCreateUser() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "id": "1",
                            "username": "user",
                            "password": "password",
                            "role": "BASIC"
                        }
                        """)
        ).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                                  {
                            "username": "user",
                            "password": "",
                            "role": "BASIC"
                        }
                                """,
                        false
                )
        );

    }

}