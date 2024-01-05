package com.ph.controller;

import com.ph.payload.response.AdvertResponseForFavorite;
import com.ph.payload.response.LogResponse;
import com.ph.service.FavoritesService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/favorites")
public class FavoritesController {

    private final FavoritesService favoritesService;

    // Not :K01 - GetFavoritesByCustomer() ***************************************************
    @PreAuthorize("hasAnyAuthority('CUSTOMER','MANAGER','ADMIN')")//http://localhost:8080/favorites/auth
    @GetMapping("/auth")
    public ResponseEntity<List<AdvertResponseForFavorite>> getFavoritesByCustomer(@AuthenticationPrincipal UserDetails userDetails) {
        return favoritesService.getFavoritesByCustomer(userDetails);
    }

    // Not :K02 - GetByUserIdFavoritesByManagerAndAdmin() ***************************************************
    @PreAuthorize("hasAnyAuthority('MANAGER','ADMIN')")//http://localhost:8080/favorites/admin/1
    @GetMapping("/admin/{id}")
    public ResponseEntity<List<AdvertResponseForFavorite>> getByUserIdFavoritesForManagerAndAdmin(@PathVariable(name = "id") Long id) {
        return favoritesService.getByUserIdFavoritesForManagerAndAdmin(id);
    }

    // Not :K03 - FavoriteSave() ***************************************************************************
    @PreAuthorize("hasAnyAuthority('CUSTOMER','MANAGER','ADMIN')")//http://localhost:8080/favorites/1/auth
    @GetMapping("{id}/auth")
    @Transactional
    public ResponseEntity<AdvertResponseForFavorite> addToFavorites(
            @PathVariable(name = "id") Long advertId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return favoritesService.addToFavorites(advertId, userDetails);
    }

    // Not :K04 - DeleteFavoriteByCustomer() *****************************************************************
    @PreAuthorize("hasAnyAuthority('CUSTOMER','MANAGER','ADMIN')")//http://localhost:8080/favorites/auth
    @DeleteMapping("/auth")
    public ResponseEntity<String> deleteFavoriteByCustomer(@AuthenticationPrincipal UserDetails userDetails) {
        return favoritesService.deleteFavoriteByCustomer(userDetails);
    }

    // Not :K05 - DeleteFavoriteIdByAdminAndManager() *********************************************************
    @PreAuthorize("hasAnyAuthority('MANAGER','ADMIN')")
    //http://localhost:8080/favorites/1/admin
    @DeleteMapping("/{id}/admin")
    public ResponseEntity<String> deleteFavoritesByAdminAndManager(@PathVariable(name = "id") Long userId) {
        return favoritesService.deleteFavoritesByAdminAndManager(userId);
    }

    // Not :K06 - DeleteFavoriteIdByAdminAndManager() *********************************************************
    @PreAuthorize("hasAnyAuthority('MANAGER','ADMIN')")//http://localhost:8080/favorites/1/admin/favorite
    @DeleteMapping("/{id}/admin/favorite")
    public ResponseEntity<String> deleteFavoriteIdByAdminAndManager(@PathVariable(name = "id") Long favoriteId) {
        return favoritesService.deleteFavoriteIdByAdminAndManager(favoriteId);
    }


    // Not: getFavCountForAdvert for specific advert
    @PreAuthorize("hasAnyAuthority('CUSTOMER','MANAGER','ADMIN')")
    @GetMapping("/auth/countFav/{advertId}") // http://localhost:8080/favorites/auth/countFav/1
    public ResponseEntity<?> getFavCountForAdvert(@PathVariable(name = "advertId") Long advertId,@AuthenticationPrincipal UserDetails userDetails) {
        return favoritesService.getFavCountForAdvert(advertId, userDetails);
    }


    // Not: deleteFavorite
    @PreAuthorize("hasAnyAuthority('CUSTOMER','MANAGER','ADMIN')")//http://localhost:8080/favorites/1
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFavorite(
            @PathVariable(name = "id") Long advertId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return favoritesService.deleteFavorite(advertId, userDetails);
    }
    // Not: getAllFavoritesByUserId
    @GetMapping("/getAll/{id}")
    @PreAuthorize("hasAnyAuthority('MANAGER','ADMIN')")
    public ResponseEntity<Page<AdvertResponseForFavorite>> getAllFavorites(@PathVariable Long id,
                                                     @RequestParam(value = "page", defaultValue = "0", required = false) int page,
                                                     @RequestParam(value = "size", defaultValue = "20", required = false) int size,
                                                     @RequestParam(value = "sort", defaultValue = "id", required = false) String sort,
                                                     @RequestParam(value = "type", defaultValue = "asc", required = false) String type

    ) {

        return favoritesService.getAllFavorites(id,page,sort,size,type);
    }
}