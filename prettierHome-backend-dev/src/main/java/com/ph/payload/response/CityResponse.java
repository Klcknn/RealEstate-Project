package com.ph.payload.response;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class CityResponse implements Serializable {

    private Long id;
    private String name;

//    private List<AdvertResponseForTourRequest> advertsResponse;
//    private CountryResponse countryResponse;
//    private List<DistrictResponse> districtsResponse;
}
