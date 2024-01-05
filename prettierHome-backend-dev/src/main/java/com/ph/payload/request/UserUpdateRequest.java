package com.ph.payload.request;

import com.ph.domain.entities.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.util.function.Consumer;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest implements Consumer<User>, Serializable {

    @Size(min = 1, max = 50, message = "{validation.firstName.size}")
    private String firstName;

    @Size(min = 1, max = 50, message = "{validation.lastName.size}")
    private String lastName;

    @Pattern(regexp = "\\(\\d{3}\\) \\d{3}-\\d{4}", message = "{validation.phone.pattern}")
    private String phone;

    @Size(min = 8, max = 30, message = "{validation.password.size}")
    @Pattern(
            regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\",.<>/?]).*$",
            message = "{validation.password.pattern}"
    )
    private String password;

    @Email(message = "{validation.email.pattern}")
    private String email;

    @Override
    public void accept(User user) {
        if (firstName != null) user.setFirstName(firstName);
        if (lastName != null) user.setLastName(lastName);
        if (phone != null) user.setPhone(phone);
        if (email != null) user.setEmail(email);
    }

}
