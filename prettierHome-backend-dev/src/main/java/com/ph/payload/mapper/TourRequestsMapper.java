package com.ph.payload.mapper;

import com.ph.domain.entities.TourRequest;
import com.ph.payload.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TourRequestsMapper {

    private final UserMapper userMapper;
    private final AdvertMapper advertMapper;
    private final ImageMapper imageMapper;

    public TourRequestsStatusResponse toTourRequestsResponse(TourRequest tourRequest) {
        return TourRequestsStatusResponse.builder()
                .id(tourRequest.getId())
                .tourDate(tourRequest.getTourDate())
                .tourTime(tourRequest.getTourTime())
                .advert(advertMapper.toAdvertResponseForTourRequest(tourRequest.getAdvert()))
                .ownerUser(userMapper.toUserResponse(tourRequest.getOwnerUser()))
                .status(tourRequest.getStatus())
                .images(tourRequest.getAdvert().getImages().stream().map(imageMapper::toImageResponse).collect(Collectors.toList()))
                .build();
    }

    public TourRequestsFullResponse toTourRequestsFullResponse(TourRequest tourRequest) {
        return TourRequestsFullResponse.builder()
                .id(tourRequest.getId())
                .tourDate(tourRequest.getTourDate())
                .tourTime(tourRequest.getTourTime())
                .advert(advertMapper.toAdvertResponseForTourRequest(tourRequest.getAdvert()))
                .ownerUser(userMapper.toUserResponse(tourRequest.getOwnerUser()))
                .guestUser(userMapper.toUserResponse(tourRequest.getGuestUser()))
                .status(tourRequest.getStatus())
                .images(tourRequest.getAdvert().getImages().stream().map(imageMapper::toImageResponse).collect(Collectors.toList()))
                .build();
    }

    public TourRequestsResponse toTourRequestsSaveResponse(TourRequest tourRequest) {
        return TourRequestsResponse.builder()
                .id(tourRequest.getId())
                .tourDate(tourRequest.getTourDate())
                .tourTime(tourRequest.getTourTime())
                .status(tourRequest.getStatus())
                .build();
    }


    public TourRequestResponseSimple toResponseSimple(TourRequest tourRequest) {
        return TourRequestResponseSimple.builder()
                .id(tourRequest.getId())
                .tourDate(tourRequest.getTourDate())
                .tourTime(tourRequest.getTourTime())
                .guestUserFullName( getFullName(tourRequest))
                .status(tourRequest.getStatus())
                .build();
    }


    private String getFullName(TourRequest tourRequest) {
        return tourRequest.getGuestUser().getFirstName() + " " + tourRequest.getGuestUser().getLastName();
    }
    }