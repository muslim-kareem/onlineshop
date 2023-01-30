package com.my.shope.backend.gridfs;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.client.gridfs.model.GridFSFile;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileService {
    private final GridFsTemplate gridFsTemplate;

    public FileMetadata saveFile( MultipartFile multipartFile ) throws IOException {
        if (multipartFile.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "File is empty"
            );
        }

        ObjectId objectId = gridFsTemplate.store(
            multipartFile.getInputStream(),
            multipartFile.getOriginalFilename(),
            multipartFile.getContentType(),
            BasicDBObjectBuilder.start()
                .add("createdBy", "user-x")
                .get()
        );

        return getFileMetadata(objectId.toString());
    }

    public GridFsResource getResource(String id) {
        return gridFsTemplate.getResource(getFile(id));
    }

    public FileMetadata getFileMetadata (String id) {
        GridFSFile gridFSFile = getFile(id);
        Document metadata = Optional
            .ofNullable(gridFSFile.getMetadata())
            .orElse(new Document(Map.of(
                "_contentType", "",
                "createdBy", ""
            )));

        return new FileMetadata(
            id,
            gridFSFile.getFilename(),
            metadata.getString("_contentType"),
            gridFSFile.getLength(),
            metadata.getString("createdBy")
        );
    }

    public GridFSFile getFile(String id) {
//       gridFsTemplate.delete(new Query().addCriteria(
//               Criteria.where("_id").in(new ArrayList<>())));
//       gridFsTemplate.
        return Optional.ofNullable(
            gridFsTemplate.findOne(new Query().addCriteria(
                Criteria.where("_id").is(id)

            ))
        ).orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "File not found"
        ));
    }


   public void saveProductDetailsFile(MultipartFile file) throws IOException {
       String path_directory ="/Users/kareem89/IdeaProjects/simple-onlineshope-my-capstone-project/backend";
       Files.copy(file.getInputStream(),
               Paths.get(path_directory + File.separator + file.getOriginalFilename()),
               StandardCopyOption.REPLACE_EXISTING);
   }
}
