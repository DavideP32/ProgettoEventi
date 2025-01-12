
package com.eventi.eventi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.eventi.eventi.dtos.UtenteDto;
import com.eventi.eventi.entities.Utente;
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

    @GetMapping("/{id}")
    public ResponseEntity<UtenteDto> getUtenteById(@RequestParam int id) {
        try {
            UtenteDto utenteDto = utenteService.getUtenteDtoById(id);
            if(utenteDto != null){
                return ResponseEntity.ok(utenteDto);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new UtenteDto());
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new UtenteDto());
        }
    
    }

    @PostMapping()
    public ResponseEntity<?> postMethodName(@RequestBody Utente utente) {
        try {
            UtenteDto utenteDto = utenteService.aggiungiUtente(utente);
            return ResponseEntity.ok(utenteDto);
        } catch (DataIntegrityViolationException e) {
			return ResponseEntity.badRequest().body("Errore nell'inserimento di dati. Controllare le proprietà dell'oggetto");
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body(new Utente());
		}
    }
    
	
	@PutMapping
	public ResponseEntity<?> putUtente(@RequestBody Utente utente){
		try {
			Utente trovato = utenteService.prendiPerId(utente.getUtente_id());
			UtenteDto trovatoEmail = utenteService.prendiUtenteByEmail(utente.getEmail());
			
			if(trovato != null && trovatoEmail.getId() == trovato.getUtente_id()) {
				UtenteDto utenteDto = utenteService.aggiornaUtente(utente, trovato);
				return ResponseEntity.ok(utenteDto);
			}else if (trovatoEmail.getId() != trovato.getUtente_id()){
				return ResponseEntity.badRequest().body("Email non corretta!");
			}else {
				return ResponseEntity.badRequest().body("Errore, utente non trovato");
			}
			
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body(new UtenteDto());
		}
	}
    
    

}
