package com.eventi.eventi.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventi.eventi.entities.Prenotazione;
import com.eventi.eventi.repositories.PrenotazioniRepository;

@Service
public class PrenotazioniServiceImpl implements PrenotazioniService{

    @Autowired
    PrenotazioniRepository prenotazioniRepository;

    @Override
    public List<Prenotazione> getAllPreno(){
        List<Prenotazione> prenotazioni = prenotazioniRepository.findAll();
        return prenotazioni;
    }

    @Override
    public Prenotazione prendiPerId(long id){
        Optional <Prenotazione> p = prenotazioniRepository.findById(id);
        
        if(p.isPresent()){
            Prenotazione prenotazione = p.get();
            return prenotazione;
        }else{
            return null;
        }
    }

    @Override
     public Prenotazione aggiungiPrenotazione(Prenotazione prenotazione){
        prenotazione.setId(0L);

        EventoService eventoService = new EventoServiceImpl();
        eventoService.aggiornaPostiEvento(prenotazione.getEvento(), prenotazione.getNumeroPersone());

        prenotazioniRepository.save(prenotazione);
        return prenotazione;
    }

    @Override
    public Prenotazione aggiornaPrenotazione(Prenotazione prenotazione, Prenotazione trovata){
        trovata.setNumeroPersone(prenotazione.getNumeroPersone());
        prenotazioniRepository.save(trovata);
        
        return trovata;
    }
    
    @Override
    public void cancellaPrenotazione(long id){
        prenotazioniRepository.deleteById(id);

    }
        
     




}

