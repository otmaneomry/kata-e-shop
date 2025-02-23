package com.carrefour.kata.controller;

import com.carrefour.kata.model.Product;
import com.carrefour.kata.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepo;

    public ProductController(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    // [GET] /api/products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    // [GET] /api/products/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // [POST] /api/products
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        product.setCreatedAt(Instant.now().toEpochMilli());
        product.setUpdatedAt(Instant.now().toEpochMilli());
        Product saved = productRepo.save(product);
        return ResponseEntity.status(201).body(saved);
    }

    // [PUT or PATCH] /api/products/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updates) {
        return productRepo.findById(id)
                .map(existing -> {
                    existing.setName(updates.getName());
                    existing.setDescription(updates.getDescription());
                    existing.setPrice(updates.getPrice());
                    // etc. pour les autres champs
                    existing.setUpdatedAt(Instant.now().toEpochMilli());
                    productRepo.save(existing);
                    return ResponseEntity.ok(existing);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // [DELETE] /api/products/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return productRepo.findById(id)
                .map(existing -> {
                    productRepo.delete(existing);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
