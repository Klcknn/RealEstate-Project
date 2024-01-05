package com.ph.repository;

import com.ph.domain.entities.AdvertType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvertTypeRepository extends JpaRepository<AdvertType, Long> {
    boolean existsBy();

}
