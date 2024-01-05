package com.ph.service;


import com.ph.aboutexcel.ExcelWriteService;
import com.ph.domain.entities.Advert;
import com.ph.domain.entities.TourRequest;
import com.ph.domain.entities.User;
import com.ph.domain.enums.Status;
import com.ph.domain.enums.StatusForAdvert;
import com.ph.exception.customs.ValuesNotMatchException;
import com.ph.payload.mapper.ReportMapper;
import com.ph.payload.resource.AdvertResource;
import com.ph.payload.resource.TourRequestResource;
import com.ph.payload.resource.UserResource;
import com.ph.repository.*;
import com.ph.security.role.Role;
import com.ph.utils.MessageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ExcelWriteService excelWriteService;
    private final AdvertRepository advertRepository;
    private final UserRepository userRepository;
    private final AdvertTypeRepository advertTypeRepository;
    private final TourRequestsRepository tourRequestsRepository;
    private final CategoryRepository categoryRepository;
    private final ReportMapper reportMapper;
    private final MessageUtil messageUtil;


    // Not: get most popular properties
    public ResponseEntity<?> getMostPopularProperties(Integer amount) {

        List<Advert> popularAdverts = advertRepository.findPopularAdverts(amount);

        List<AdvertResource> advertResources = popularAdverts.stream().map(reportMapper::mapToResource).toList();

        excelWriteService.writeToExcel(advertResources, "MostPopularProperties", "MostPopularProperties");

        return ResponseEntity.ok(advertResources);

    }

    // Not: get  advert
    public ResponseEntity<?> getAdverts(LocalDate startDate, LocalDate endDate,
                                        Integer status,
                                        Long typeId, Long categoryId) {
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new ValuesNotMatchException(String.format(messageUtil.getMessage("error.report.date")));
        }
        LocalDateTime startDateTime;
        LocalDateTime endDateTime;
        if (startDate != null) {
            startDateTime = startDate.atTime(LocalTime.MIN);
        } else {

            startDateTime = LocalDateTime.of(1900, 1, 1, 0, 0);
        }
        if (endDate != null) {
            endDateTime = endDate.atTime(LocalTime.MIN);
        } else {
            endDateTime = LocalDateTime.of(2400, 1, 1, 0, 0);
        }

        StatusForAdvert statusForAdvert = null;
        if (status != null) {
            switch (status) {
                case 0 -> statusForAdvert = StatusForAdvert.PENDING;
                case 1 -> statusForAdvert = StatusForAdvert.ACTIVATED;
                case 2 -> statusForAdvert = StatusForAdvert.REJECTED;
            }
        }


        // List<Advert> adverts = advertRepository.findForExcel( startDateTime, endDateTime, statusForAdvert, typeId, categoryId);
        List<Advert> adverts =
                advertRepository.
                        findForExcel(
                                startDateTime,
                                endDateTime,
                                categoryId,
                                typeId,
                                statusForAdvert
                        );

        List<AdvertResource> advertResources = adverts.stream().map(reportMapper::mapToResource).toList();
        excelWriteService.writeToExcel(advertResources, "Adverts", "Adverts");

        return ResponseEntity.ok(Map.of("advertCount", adverts.size()));
    }


    // Not: get all
    public ResponseEntity<?> getStatistics() {
        Long totalAdverts = advertRepository.count();
        Long totalUsers = userRepository.count();
        Long totalAdvertTypes = advertTypeRepository.count();
        Long totalTourRequests = tourRequestsRepository.count();
        Long totalCategories = categoryRepository.count();
        return ResponseEntity
                .ok(reportMapper.toStatisticsResponse(totalAdverts, totalUsers, totalAdvertTypes, totalTourRequests, totalCategories));
    }


    // Not: get all users
    public ResponseEntity<?> getUsersByRole(String role) {
        List<User> users = userRepository.findByRole(Role.valueOf(role.toUpperCase(Locale.US)));

        List<UserResource> userResources = users.stream().map(reportMapper::toUserResource).toList();

        excelWriteService.writeToExcel(userResources, "Users", role);
        return ResponseEntity.ok(Map.of("userCount", users.size()));
    }


    // Not: get all tour request
    public ResponseEntity<?> getTourRequests(LocalDate startDate, LocalDate endDate, Status status) {
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new ValuesNotMatchException(String.format(messageUtil.getMessage("error.report.date")));
        }
        List<TourRequest> tourRequests = tourRequestsRepository.findForExcel(startDate, endDate, status);
        List<TourRequestResource> tourRequestsResource = tourRequests
                .stream()
                .map(reportMapper::toTourRequestResource)
                .toList();

        excelWriteService.writeToExcel(tourRequestsResource, "TourRequests", "TourRequests");

        return ResponseEntity.ok(Map.of("tourRequestCount", tourRequests.size()));
    }

}
