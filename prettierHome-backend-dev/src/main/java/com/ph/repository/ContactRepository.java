package com.ph.repository;

import com.ph.domain.entities.Contact;
import com.ph.payload.response.ContactResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {


    @Query("""
            select c from Contact c
            where c.firstName ilike concat('%', ?1, '%') or c.lastName ilike concat('%', ?1, '%') or c.email ilike concat('%', ?1, '%') or c.message ilike concat('%', ?1, '%')""")
    Page<Contact> findContactsPageableBySearch(String query, Pageable pageable);
}
