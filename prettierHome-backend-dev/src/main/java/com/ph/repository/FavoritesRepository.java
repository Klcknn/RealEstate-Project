package com.ph.repository;

import com.ph.domain.entities.Favorite;
import com.ph.domain.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorite, Long> {

    long deleteByUser(User user);

    Optional<Favorite> findByUser_IdAndAdvert_Id(Long id, Long id1);

    List<Favorite> findByUser_Id(Long id);
    Page<Favorite> findByUser_Id(Long id, Pageable pageable);

    // Not: getFavCountForAdvertOfTheUser
    Long countByUser_IdAndAdvert_Id(Long id, Long id1);

}
