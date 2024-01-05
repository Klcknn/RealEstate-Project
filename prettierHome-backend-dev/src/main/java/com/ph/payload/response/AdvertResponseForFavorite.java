package com.ph.payload.response;

import com.ph.domain.entities.Image;
import com.ph.domain.entities.Location;
import com.ph.domain.entities.User;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdvertResponseForFavorite implements Serializable {
    //TODO RESPONSE DA İMAGE DÖNÜNCE 4.5 MB'LİK BİR RESPONSE OLUYOR

    private Long id;
    private String title;
    private Double price;
    private Location location;
    private AdvertTypeResponse advertType;
    private CountryResponse country;
    private CityResponse city;
    private DistrictResponse district;
    private CategoryResponseForFavorite category;
    private List<ImageResponse> images;
    private Long userId;
    private String slug;

}
