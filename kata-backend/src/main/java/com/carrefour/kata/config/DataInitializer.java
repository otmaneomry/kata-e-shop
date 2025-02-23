package com.carrefour.kata.config;

import com.carrefour.kata.model.Product;
import com.carrefour.kata.model.Product.InventoryStatus;
import com.carrefour.kata.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;
import java.util.Random;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(ProductRepository productRepo) {
        return args -> {
            if (productRepo.count() == 0) {
                Random random = new Random();
                for (int i = 1; i <= 15; i++) {
                    int randomId = random.nextInt(100) + 1;
                    Product p = Product.builder()
                            .code("product-" + i)
                            .name("Product " + i)
                            .description("Description for product " + i)
                            .image("https://picsum.photos/id/" + randomId + "/300/200")
                            .category(i % 2 == 0 ? "electronics" : "accessories")
                            .price(100.0 + i * 10)
                            .quantity(5 + i)
                            .internalReference("REF-" + i)
                            .shellId(i)
                            .inventoryStatus((i % 3 == 0) ? InventoryStatus.OUTOFSTOCK
                                    : (i % 2 == 0) ? InventoryStatus.LOWSTOCK
                                    : InventoryStatus.INSTOCK)
                            .rating(3.0 + (i % 3))
                            .createdAt(Instant.now().toEpochMilli())
                            .updatedAt(Instant.now().toEpochMilli())
                            .build();
                    productRepo.save(p);
                }
                System.out.println(">>> Inserted 10 mock products into DB");
            }
        };
    }
}
