package com.eventi.eventi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.eventi.eventi.entities.Prenotazione;
import com.eventi.eventi.services.PrenotazioniService;

@Controller
@RequestMapping("/api/prenotazioni")
public class PrenotazioneCtrl {

    @Autowired
    PrenotazioniService prenotazioneService;

    @GetMapping()
    public ResponseEntity<List<Prenotazione>> getAllPrenotazioni() {
        try {
            List<Prenotazione> prenotazioni = prenotazioneService.getAllPreno();
            return ResponseEntity.ok(prenotazioni);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ArrayList<>());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPrenotazioniById(@PathVariable long id) {
        try {
            List<Prenotazione> prenotazioni = prenotazioneService.prendiPerUtenteId(id);
            return ResponseEntity.ok(prenotazioni);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ArrayList<>());
        }

    }

    @PostMapping()
    public ResponseEntity<?> postPrenotazione(@RequestBody Prenotazione prenotazione) {
        try {
            Prenotazione p = prenotazioneService.aggiungiPrenotazione(prenotazione);
            return ResponseEntity.ok(p);

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("Errore nell'inserimento dei dati controllare le proprietà dell'oggetto: " + e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Prenotazione());

        }

    }

    @PutMapping()
    public ResponseEntity<?> putPrenotazione(@RequestBody Prenotazione prenotazione) {

        try {
            Prenotazione trovata = prenotazioneService.prendiPerId(prenotazione.getId());
            if (trovata != null) {
                Prenotazione p = prenotazioneService.aggiornaPrenotazione(prenotazione, trovata);
                return ResponseEntity.ok(p);
            } else {
                return ResponseEntity.badRequest().body("Errore, prenotazione inesistente");
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Prenotazione());

        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePrenotazione(@PathVariable long id) {
        try {
            Prenotazione trovata = prenotazioneService.prendiPerId(id);
            if (trovata != null) {
                prenotazioneService.cancellaPrenotazione(id);
                return ResponseEntity.ok("prenotazione cancellata");
            } else {
                return ResponseEntity.badRequest().body("Errore, prenotazione inesistente");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Prenotazione());

        }
    }

}
