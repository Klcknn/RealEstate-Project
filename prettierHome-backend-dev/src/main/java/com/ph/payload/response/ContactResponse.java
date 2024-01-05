package com.ph.payload.response;

import lombok.*;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ContactResponse {

    private String firstName;
    private String lastName;
    private String email;
    private String message;
    private LocalDateTime createdAt;


}
