package com.my.shope.backend.appUser;
import com.my.shope.backend.TestData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserControllerTest {



    @Autowired
    private MockMvc mockMvc;



//    @Test
//    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
//    void createUser_whenAlreadyExists_ThrowConflict() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(TestData.NEW_USER_ADMIN)
//                .andExpectAll(MockMvcResultMatchers.status().isConflict());
//    }

    @Test
    void meWithoutLogin_Forbidden() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me")
                        .with(httpBasic("user1","password")))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
    void logout() throws Exception {
        // given
        this.mockMvc.perform(post("/api/app-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestData.NEW_USER_ADMIN)).andExpect( MockMvcResultMatchers.status().isOk()
        );

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/logout")
                        .with(httpBasic("user","ps")))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    void logout_Unautorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/logout")
                        .with(httpBasic("user1","password")))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }



}