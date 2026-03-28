package com.flavio.api;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        // Dotenv solo busca .env en el directorio de trabajo (user.dir). Si ejecutas desde la raíz
        // del repo y el .env está en backend/, no se encontraba y Spring acababa usando valores
        // literales como "${DB_USERNAME}" si el IDE inyectaba ese texto como variable de entorno.
        loadDotenvIntoSystemProperties();

        SpringApplication.run(BackendApplication.class, args);
    }

    private static void loadDotenvIntoSystemProperties() {
        Path cwd = Paths.get(System.getProperty("user.dir")).toAbsolutePath().normalize();
        List<Path> dirsToTry = new ArrayList<>();
        dirsToTry.add(cwd);
        dirsToTry.add(cwd.resolve("backend"));
        Path parent = cwd.getParent();
        if (parent != null) {
            dirsToTry.add(parent.resolve("backend"));
        }

        for (Path dir : dirsToTry) {
            if (!Files.isDirectory(dir)) {
                continue;
            }
            Path envFile = dir.resolve(".env");
            if (!Files.isRegularFile(envFile)) {
                continue;
            }
            Dotenv dotenv = Dotenv.configure()
                    .directory(dir.toString())
                    .ignoreIfMalformed()
                    .load();
            dotenv.entries().forEach(entry ->
                    System.setProperty(entry.getKey(), entry.getValue())
            );
            return;
        }
        // Sin .env en disco: solo variables del SO / IDE (ignoreIfMissing implícito)
    }

}
