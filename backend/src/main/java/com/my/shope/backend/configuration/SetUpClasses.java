package com.my.shope.backend.configuration;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;


import javax.servlet.MultipartConfigElement;


@Configuration
public class SetUpClasses {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(DataSize.ofBytes(100000000L));
        factory.setMaxRequestSize(DataSize.ofBytes(100000000L));
        return factory.createMultipartConfig();
    }

//    @PostMapping
//    public  String uploadImages(@RequestParam("file") MultipartFile file ) throws IOException {
//
//        System.out.println(file.getOriginalFilename());
//        System.out.println(file.getName());
//        System.out.println(file.getContentType());
//        System.out.println(file.getName());
//
//        String path_directory ="/Users/kareem89/IdeaProjects/chat-project/src/main/resources/static/images/";
//        Files.copy(file.getInputStream(),
//                Paths.get(path_directory + File.separator+file.getOriginalFilename()),
//                StandardCopyOption.REPLACE_EXISTING);
//
//        return "Successful";
//    }
}
