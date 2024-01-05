package com.ph.builtin;

import com.ph.domain.entities.AdvertType;
import com.ph.domain.entities.Category;
import com.ph.domain.entities.CategoryPropertyKey;
import com.ph.domain.entities.User;
import com.ph.domain.enums.KeyType;
import com.ph.repository.AdvertTypeRepository;
import com.ph.repository.CategoryPropertyKeyRepository;
import com.ph.repository.CategoryRepository;
import com.ph.repository.UserRepository;
import com.ph.security.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@RequiredArgsConstructor
@Component
public class BuiltInInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdvertTypeRepository advertTypeRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryPropertyKeyRepository propertyKeyRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize built-in data
        initializeUsers();
        initializeAdvertTypes();
        initializeCategories();
        initializePropertyKeys();
    }

    private void initializeUsers() {
        if (!userRepository.existsBy()) {
            User admin = User.builder()
                    .firstName("John")
                    .lastName("Doe")
                    .email("admin@gmail.com")
                    .phone("(123) 456-7890")
                    .passwordHash(passwordEncoder.encode("admin123!"))
                    .role(Role.ADMIN)
                    .builtIn(true)
                    .build();
            userRepository.save(admin);

            User manager = User.builder()
                    .firstName("Jane")
                    .lastName("Doe")
                    .email("manager@gmail.com")
                    .phone("(123) 456-7891")
                    .passwordHash(passwordEncoder.encode("manager123!"))
                    .role(Role.MANAGER)
                    .builtIn(true)
                    .build();
            userRepository.save(manager);

            User customer = User.builder()
                    .firstName("Adam")
                    .lastName("Born")
                    .email("adamd.born@gmail.com")
                    .phone("(123) 456-7892")
                    .passwordHash(passwordEncoder.encode("customer123!"))
                    .role(Role.CUSTOMER)
                    .builtIn(true)
                    .build();
            userRepository.save(customer);


        }
    }

    private void initializeAdvertTypes() {
        if (!advertTypeRepository.existsBy()) {
            advertTypeRepository.save(AdvertType.builder().title("Rent").builtIn(true).build());
            advertTypeRepository.save(AdvertType.builder().title("Sale").builtIn(true).build());
        }
    }

    private void initializeCategories() {
        if (!categoryRepository.existsBy()) {
            List<Category> categories = List.of(
                    Category.builder().title("House").icon("fa-solid fa-house").slug("house" + "-" + System.currentTimeMillis()).seq(1).active(true).builtIn(true).build(),
                    Category.builder().title("Apartment").icon("fa-solid fa-building").slug("apartment" + "-" + System.currentTimeMillis()).seq(2).active(true).builtIn(true).build(),
                    Category.builder().title("Office").icon("fa-solid fa-house-laptop").slug("office" + "-" + System.currentTimeMillis()).seq(3).active(true).builtIn(true).build(),
                    Category.builder().title("Villa").icon("fa-solid fa-place-of-worship").slug("villa" + "-" + System.currentTimeMillis()).seq(4).active(true).builtIn(true).build(),
                    Category.builder().title("Land").icon("fa-solid fa-mountain-sun").slug("land" + "-" + System.currentTimeMillis()).seq(5).active(true).builtIn(true).build(),
                    Category.builder().title("Shop").icon("fa-solid fa-store").slug("shop" + "-" + System.currentTimeMillis()).seq(6).active(true).builtIn(true).build()
            );
            categoryRepository.saveAll(categories);
        }
    }

    private void initializePropertyKeys() {
        if (!propertyKeyRepository.existsBy()) {
            //For House
            List<CategoryPropertyKey> houseProperties = List.of(
                    CategoryPropertyKey.builder().category(categoryRepository.findById(1L).get()).name("Size").keyType(KeyType.NUMBER).prefix(null).suffix("m²").builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(1L).get()).name("Bedrooms").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(1L).get()).name("Bathrooms").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(1L).get()).name("Garage").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(1L).get()).name("Year of Build").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(1L).get()).name("Furniture").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(1L).get()).name("Maintenance Fee").keyType(KeyType.NUMBER).prefix("$").suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(1L).get()).name("Terrace").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build());

            propertyKeyRepository.saveAll(houseProperties);

            //For Apartment
            List<CategoryPropertyKey> apartmentProperties = List.of(
                    CategoryPropertyKey.builder().category(categoryRepository.findById(2L).get()).name("Size").keyType(KeyType.NUMBER).prefix(null).suffix("m²").builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(2L).get()).name("Bedrooms").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(2L).get()).name("Bathrooms").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(2L).get()).name("Parking Space").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(2L).get()).name("Year of Build").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(2L).get()).name("Furniture").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(2L).get()).name("Maintenance Fee").keyType(KeyType.NUMBER).prefix("$").suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(2L).get()).name("Balcony").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(2L).get()).name("Elevator").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build());

            propertyKeyRepository.saveAll(apartmentProperties);


            //For Office
            List<CategoryPropertyKey> officeProperties = List.of(
                    CategoryPropertyKey.builder().category(categoryRepository.findById(3L).get()).name("Size").keyType(KeyType.NUMBER).prefix(null).suffix("m²").builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(3L).get()).name("Parking Space").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(3L).get()).name("Year of Build").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(3L).get()).name("Furniture").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(3L).get()).name("Maintenance Fee").keyType(KeyType.NUMBER).prefix("$").suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(3L).get()).name("Elevator").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build());

            propertyKeyRepository.saveAll(officeProperties);

            //For Villa
            List<CategoryPropertyKey> villaProperties = List.of(
                    CategoryPropertyKey.builder().category(categoryRepository.findById(4L).get()).name("Size").keyType(KeyType.NUMBER).prefix(null).suffix("m²").builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(4L).get()).name("Bedrooms").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(4L).get()).name("Bathrooms").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(4L).get()).name("Garage").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(4L).get()).name("Land Area").keyType(KeyType.NUMBER).prefix(null).suffix("m²").builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(4L).get()).name("Year of Build").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(4L).get()).name("Furniture").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(4L).get()).name("Swimming Pool").keyType(KeyType.TEXT).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(4L).get()).name("View").keyType(KeyType.TEXT).prefix(null).suffix(null).builtIn(true).build());

            propertyKeyRepository.saveAll(villaProperties);

            //For Land
            List<CategoryPropertyKey> landProperties = List.of(
                    CategoryPropertyKey.builder().category(categoryRepository.findById(5L).get()).name("Size").keyType(KeyType.NUMBER).prefix(null).suffix("m²").builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(5L).get()).name("Zoning").keyType(KeyType.TEXT).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(5L).get()).name("Access Road").keyType(KeyType.TEXT).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(5L).get()).name("Legal Status").keyType(KeyType.TEXT).prefix(null).suffix(null).builtIn(true).build());

            propertyKeyRepository.saveAll(landProperties);

            //For Shop
            List<CategoryPropertyKey> shopProperties = List.of(
                    CategoryPropertyKey.builder().category(categoryRepository.findById(6L).get()).name("Size").builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(6L).get()).name("Parking Space").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(6L).get()).name("Year of Build").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(6L).get()).name("Furniture").keyType(KeyType.BOOLEAN).prefix(null).suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(6L).get()).name("Maintenance Fee").keyType(KeyType.NUMBER).prefix("$").suffix(null).builtIn(true).build(),
                    CategoryPropertyKey.builder().category(categoryRepository.findById(6L).get()).name("Elevator").keyType(KeyType.NUMBER).prefix(null).suffix(null).builtIn(true).build());

            propertyKeyRepository.saveAll(shopProperties);
        }
    }


}
