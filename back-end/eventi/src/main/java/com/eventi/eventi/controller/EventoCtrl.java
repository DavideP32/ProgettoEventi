package com.eventi.eventi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.eventi.eventi.entities.Evento;
import com.eventi.eventi.services.EventoService;

@Controller
@RequestMapping("/api/eventi")
public class EventoCtrl {

    @Autowired
    EventoService eventoService;

    @GetMapping()
    public ResponseEntity<List<Evento>> getAll() {
        try {
            List<Evento> eventi = eventoService.getAllEventi();

            return ResponseEntity.ok(eventi);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ArrayList<>());
        }
    }

    @GetMapping("/id={id}")
    public ResponseEntity<Evento> getById(@PathVariable("id") long id) {
        try {
            Evento evento = eventoService.getEventoById(id);

            if (evento != null) {
                return ResponseEntity.ok(evento);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Evento());
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Evento());
        }
    }

    @GetMapping("/nome={nome}")
    public ResponseEntity<?> getByName(@PathVariable("nome") String nome) {
        try {
            List<Evento> eventi = eventoService.getEventiByNome(nome);

            if (!eventi.isEmpty()) {
                return ResponseEntity.ok(eventi);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<Evento>());
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ArrayList<Evento>());
        }
    }

    @PostMapping
    public ResponseEntity<?> postEvento(Evento evento) {
        try {
            Evento e = eventoService.aggiungiEvento(evento);

            return ResponseEntity.ok(e);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("Errore nell'inserimento di dati. Controllare le proprietà dell'oggetto");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Evento());
        }
    }


    @PutMapping
    public ResponseEntity<?> putEvento(Evento evento){
        try {
            Evento trovato = eventoService.getEventoById(evento.getId());
            if(trovato != null){
                Evento e = eventoService.aggiornaEvento(evento, trovato);
                return ResponseEntity.ok(e);
            }else{
                return ResponseEntity.badRequest().body("Errore! Evento non trovato");
            }
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Evento());
        }
    }

}
