package com.ph.payload.request;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.io.Serializable;
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageUpdateRequest implements Serializable {

    //TODO MESAJLARI SETLENİCEK
    @NotNull
    Long imgId;
    @NotNull
    Long advertId;
}
