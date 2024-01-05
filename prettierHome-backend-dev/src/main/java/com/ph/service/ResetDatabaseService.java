package com.ph.service;

import com.ph.domain.entities.Advert;
import com.ph.domain.entities.Category;
import com.ph.domain.entities.User;
import com.ph.repository.AdvertRepository;
import com.ph.repository.CategoryRepository;
import com.ph.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResetDatabaseService {

    private final AdvertRepository advertRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public ResponseEntity<String> resetDatabase() {

        // Not: Constraint: Can not delete  builtIn objects
        // delete all not builtIn User and related objects
        List<User> users = userRepository.findAllByBuiltIn(false);
        userRepository.deleteAll(users);

        // delete all not builtIn Category and related objects
        List<Category> categories = categoryRepository.findAllByBuiltIn(false);
        categoryRepository.deleteAll(categories);

        // delete all not builtIn Advert and related objects
        List<Advert> adverts = advertRepository.findAllByBuiltIn(false);
        advertRepository.deleteAll(adverts);

        return ResponseEntity.ok("The database has successfully been reset.");
    }

}
