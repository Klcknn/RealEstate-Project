package com.ph.service;

import com.ph.domain.entities.Contact;
import com.ph.payload.mapper.UserMapper;
import com.ph.payload.request.ContactRequest;
import com.ph.payload.response.ContactResponse;
import com.ph.repository.ContactRepository;
import com.ph.utils.MessageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository contactRepository;
    private final MessageUtil messageUtil;
    private final UserMapper userMapper;

    // Not :J02 - Save() *************************************************************************
    // Save the contact and return a response entity with a success message
    public ResponseEntity<String> save(ContactRequest request) {
        Contact contact = request.get();
        contactRepository.save(contact);
        return ResponseEntity.ok(messageUtil.getMessage("success.contact.saved"));
    }

    // Not :J01 - GetAll() *************************************************************************

    /**
     * Retrieves all contacts with pagination, sorting, and filtering options.
     *
     * @param page The page number to retrieve.
     * @param size The number of contacts per page.
     * @param sort The sorting criteria for the contacts.
     * @param type The sorting type (ascending or descending).
     * @return A ResponseEntity containing a Page of ContactResponse objects.
     */
    public ResponseEntity<Page<ContactResponse>> getAllContact(String query, int page, int size, String sort, String type) {
        // Create a Pageable object with the provided page, size, and sort criteria
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).ascending());
        // If the sorting type is "desc", create a new Pageable object with descending sort
        if (Objects.equals(type, "desc")) {
            pageable = PageRequest.of(page, size, Sort.by(sort).descending());
        }

        if (query != null) {
            // Find users based on search query
            Page<ContactResponse> contactMessagesBySearch = contactRepository
                    .findContactsPageableBySearch(query, pageable).map(userMapper::toContactResponse);
            return ResponseEntity.ok(contactMessagesBySearch);
        }
        // Find All ContactMessages
        Page<ContactResponse> all = contactRepository.findAll(pageable).map(userMapper::toContactResponse);

        // Return a ResponseEntity containing the contact responses
        return ResponseEntity.ok(all);
    }


}
