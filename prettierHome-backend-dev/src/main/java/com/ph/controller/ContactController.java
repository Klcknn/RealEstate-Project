package com.ph.controller;

import com.ph.payload.request.ContactRequest;
import com.ph.payload.response.ContactResponse;
import com.ph.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contact-messages")
public class ContactController {
    private final ContactService contactService;


    // Not :J02 - Save() *************************************************************************
    @PostMapping()
    public ResponseEntity<String> save(@RequestBody @Valid ContactRequest request) {
        return contactService.save(request);
    }

    // Not :J01 - GetAll() *************************************************************************
    @PreAuthorize("hasAnyAuthority('MANAGER','ADMIN')")
    @GetMapping()
    public ResponseEntity<Page<ContactResponse>> getAllContact(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "20", required = false) int size,
            @RequestParam(value = "sort", defaultValue = "id", required = false) String sort,
            @RequestParam(value = "type", defaultValue = "asc", required = false) String type

    ) {
        return contactService.getAllContact(query, page, size, sort, type);
    }


}
