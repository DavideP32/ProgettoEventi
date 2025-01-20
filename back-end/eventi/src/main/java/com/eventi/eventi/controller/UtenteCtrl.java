package com.eventi.eventi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.eventi.eventi.dtos.UtenteDto;
import com.eventi.eventi.entities.Utente;
import com.eventi.eventi.login.LoginRequest;
import com.eventi.eventi.login.SessioneUtente;
import com.eventi.eventi.services.UtenteService;

import jakarta.servlet.http.HttpSession;

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
            if (utenteDto != null) {
                return ResponseEntity.ok(utenteDto);
            } else {
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
    public ResponseEntity<?> putUtente(@RequestBody Utente utente) {
        try {
            // Utente trovato = utenteService.prendiPerId(utente.getId());
            Utente trovatoEmail = utenteService.prendiUtenteByEmail(utente.getEmail());

            if (trovatoEmail != null) {
                UtenteDto utenteDto = utenteService.aggiornaUtente(utente, trovatoEmail);
                return ResponseEntity.ok(utenteDto);
            } else {
                return ResponseEntity.badRequest().body("Errore, utente non trovato");
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new UtenteDto());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putRuolo(@PathVariable long id) {
        try {
            UtenteDto utente = utenteService.aggiornaRuoloUtente(id);

            if (utente != null) {
                return ResponseEntity.ok(utente);
            } else {
                return ResponseEntity.badRequest().body("Utente non trovato");
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new UtenteDto());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUtenteById(@PathVariable long id) {
        try {
            UtenteDto trovato = utenteService.getUtenteDtoById(id);

            if (trovato != null) {
                utenteService.cancellaUtenteById(id);
                return ResponseEntity.ok("Cancellato l'utente con id: " + id);
            } else {
                return ResponseEntity.badRequest().body("L'utente non esiste");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new UtenteDto());
        }
    }


    /* -------------------------------------------------------------------------- */
 /*                                    LOGIN                                   */
 /* -------------------------------------------------------------------------- */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            Utente utente = utenteService.verificaCredenziali(loginRequest.getEmail(), loginRequest.getPassword());

            if (utente != null) {
                SessioneUtente sessioneUtente = new SessioneUtente(utente.getId(), utente.getNome(), utente.getCognome(), utente.getEmail(), utente.getDataNascita(), utente.getRuolo(), utente.getPrenotazioni());

                session.setAttribute("utente", sessioneUtente);
                return ResponseEntity.ok(sessioneUtente);
            } else {
                return ResponseEntity.status(401).body("Credenziali non valide");
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Errore durante il login: " + e.getMessage());
        }

    }


    /* -------------------------------------------------------------------------- */
 /*                                   LOGOUT                                   */
 /* -------------------------------------------------------------------------- */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.removeAttribute("utente");
        session.invalidate();
        return ResponseEntity.ok("Logout effettuato con successo");
    }


    /* -------------------------------------------------------------------------- */
 /*                            PRENDI UTENTE LOGGATO                           */
 /* -------------------------------------------------------------------------- */
    @GetMapping("/isLogged")
    public ResponseEntity<?> getUtenteLoggato(HttpSession session) {
        SessioneUtente sessioneUtente = (SessioneUtente) session.getAttribute("utente");
        if (sessioneUtente != null) {
            return ResponseEntity.ok(sessioneUtente);
        }
        return ResponseEntity.status(401).body("Utente non autenticato");
    }

}
