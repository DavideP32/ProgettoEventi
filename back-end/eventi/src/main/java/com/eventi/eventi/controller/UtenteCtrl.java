
package com.eventi.eventi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.eventi.eventi.dtos.UtenteDto;
import com.eventi.eventi.services.UtenteService;



@Controller
@RequestMapping("/api/utente")
public class UtenteCtrl {

    @Autowired
    UtenteService utenteService;

    @GetMapping()
    public ResponseEntity<List<UtenteDto>> getAllUtenti() {
        try {
            List<UtenteDto> utentiDto = utenteService.getAllDto();

            return ResponseEntity.ok(utentiDto);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ArrayList<>());
        }
    }
    

}
