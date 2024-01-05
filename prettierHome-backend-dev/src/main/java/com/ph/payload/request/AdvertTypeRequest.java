package com.ph.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdvertTypeRequest {

    @NotNull(message = "{validation.advert.notnull}")
    private String title;

}
